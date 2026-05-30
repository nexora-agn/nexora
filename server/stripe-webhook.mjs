/**
 * Stripe webhook handler — verify Stripe-Signature and update project_requests on payment.
 *
 * Env:
 * - STRIPE_SECRET_KEY        — sk_live_… or sk_test_…
 * - STRIPE_WEBHOOK_SECRET    — whsec_… from Stripe Dashboard → Webhooks
 * - VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *
 * Events handled:
 * - checkout.session.completed → mark project_request as "paid"
 */
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { resolveSupabaseEnv } from "./payment-staff.mjs";

function normalizeEnv(raw) {
  let s = String(raw ?? "").trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/**
 * @param {{
 *   rawBody: string;
 *   signatureHeader: string | undefined;
 *   env: NodeJS.ProcessEnv;
 * }} opts
 */
export async function handleStripeWebhook({ rawBody, signatureHeader, env }) {
  const secretKey = normalizeEnv(env.STRIPE_SECRET_KEY);
  const webhookSecret = normalizeEnv(env.STRIPE_WEBHOOK_SECRET);

  if (!secretKey) {
    return { ok: false, status: 500, error: "Stripe secret key not configured." };
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-04-30.basil" });

  // ── Verify signature ─────────────────────────────────────────────────────
  // SECURITY: when a webhook secret is configured (i.e. production), the
  // signature is MANDATORY. A missing or invalid signature is rejected so a
  // forged "checkout.session.completed" can never mark an order paid. Only when
  // no secret is set at all (local dev convenience) do we skip verification.
  let event;
  if (webhookSecret) {
    if (!signatureHeader) {
      console.error("[stripe-webhook] Missing Stripe-Signature header — rejecting.");
      return { ok: false, status: 400, error: "Missing Stripe-Signature header." };
    }
    try {
      event = stripe.webhooks.constructEvent(rawBody, signatureHeader, webhookSecret);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[stripe-webhook] Signature verification failed:", msg);
      return { ok: false, status: 400, error: `Webhook signature invalid: ${msg}` };
    }
  } else {
    // No webhook secret configured — accept in development only, warn loudly.
    console.warn(
      "[stripe-webhook] STRIPE_WEBHOOK_SECRET not set — skipping signature verification. Set it in production!",
    );
    try {
      event = JSON.parse(rawBody);
    } catch {
      return { ok: false, status: 400, error: "Invalid JSON body." };
    }
  }

  // ── Route events ─────────────────────────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    return handleCheckoutSessionCompleted(event.data.object, env);
  }

  // Ignore all other events
  return { ok: true, status: 200, received: true };
}

/**
 * Mark the matching project_request as paid.
 *
 * IMPORTANT: the project_requests table has a CHECK constraint limiting
 * `status` to ('new', 'in_progress', 'completed') and has no dedicated payment
 * columns. So — exactly like the previous Paddle webhook — we store all payment
 * metadata inside the `payload` jsonb and promote status 'new' → 'in_progress'.
 *
 * @param {Stripe.Checkout.Session} session
 * @param {NodeJS.ProcessEnv} env
 */
async function handleCheckoutSessionCompleted(session, env) {
  const orderId = session.metadata?.order_id;
  if (!orderId) {
    console.warn("[stripe-webhook] checkout.session.completed missing order_id metadata.");
    return { ok: true, status: 200, received: true };
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, status: 500, error: "Supabase not configured." };
  }

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Load existing row so we can merge into payload (don't clobber wizard data).
  const { data: row, error: loadErr } = await adminSb
    .from("project_requests")
    .select("id, payload, status")
    .eq("id", orderId)
    .maybeSingle();

  if (loadErr) {
    console.error("[stripe-webhook] DB load failed:", loadErr.message);
    return { ok: false, status: 500, error: loadErr.message };
  }
  if (!row) {
    console.warn("[stripe-webhook] Unknown project_request:", orderId);
    return { ok: true, status: 200, received: true };
  }

  const notification = {
    received_at: new Date().toISOString(),
    event_type: "checkout.session.completed",
    session_id: session.id,
    subscription_id: typeof session.subscription === "string" ? session.subscription : null,
    customer_id: typeof session.customer === "string" ? session.customer : null,
    amount_total: session.amount_total ?? null,
    currency: session.currency ?? null,
    payment_status: session.payment_status ?? null,
  };

  const prevPayload =
    row.payload && typeof row.payload === "object" && !Array.isArray(row.payload) ? { ...row.payload } : {};
  const prevNotes = Array.isArray(prevPayload.stripe_webhooks) ? [...prevPayload.stripe_webhooks] : [];
  prevNotes.push(notification);

  const nextPayload = {
    ...prevPayload,
    stripe_webhooks: prevNotes,
    stripe_last_webhook: notification,
    stripe_paid_at: notification.received_at,
    stripe_payment_status: "paid",
    stripe_session_id: session.id,
    stripe_subscription_id: notification.subscription_id,
  };

  // Promote 'new' → 'in_progress'; never downgrade an already-advanced order.
  const nextRowStatus = row.status === "new" ? "in_progress" : row.status;

  const { error: upErr } = await adminSb
    .from("project_requests")
    .update({ status: nextRowStatus, payload: nextPayload })
    .eq("id", orderId);

  if (upErr) {
    console.error("[stripe-webhook] DB update failed:", upErr.message);
    return { ok: false, status: 500, error: upErr.message };
  }

  console.log(`[stripe-webhook] order ${orderId} marked paid (session ${session.id})`);
  return { ok: true, status: 200, received: true };
}
