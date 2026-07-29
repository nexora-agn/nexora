/**
 * Stripe webhook handler — verify Stripe-Signature and update project_requests on payment.
 *
 * Env:
 * - STRIPE_SECRET_KEY        — sk_live_… or sk_test_…
 * - STRIPE_WEBHOOK_SECRET    — whsec_… from Stripe Dashboard → Webhooks
 * - VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *
 * Events handled:
 * - checkout.session.completed          → mark paid, email "trial started" / "payment confirmed"
 * - customer.subscription.trial_will_end → email "your trial ends soon"
 * - invoice.payment_failed              → email "update your card"
 *
 * The webhook is deliberately the ONLY place customer billing email is sent:
 * every purchase path (wizard checkout, standalone trial Payment Link, a manual
 * invoice raised in the Dashboard) passes through here, so nobody can buy
 * without being emailed.
 */
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { resolveSupabaseEnv } from "./payment-staff.mjs";
import { resolvePlanFromPriceId } from "./stripe-checkout.mjs";
import { handleSendSubscriptionEmails } from "./form-email-resend.mjs";

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
    return handleCheckoutSessionCompleted(event.data.object, env, stripe);
  }
  if (event.type === "customer.subscription.trial_will_end") {
    return handleTrialWillEnd(event.data.object, env, stripe);
  }
  if (event.type === "invoice.payment_failed") {
    return handleInvoicePaymentFailed(event.data.object, env, stripe);
  }

  // Ignore all other events
  return { ok: true, status: 200, received: true };
}

// ── Shared helpers ─────────────────────────────────────────────────────────

/** "$99.00" from Stripe's minor units. */
function formatAmount(minorUnits, currency) {
  const value = (Number(minorUnits ?? 0) / 100).toFixed(2);
  const code = String(currency || "usd").toUpperCase();
  return code === "USD" ? `$${value}` : `${value} ${code}`;
}

/** "August 5, 2026" — spelled out so there is no US/EU date ambiguity. */
function formatDate(unixSeconds) {
  if (!unixSeconds) return "";
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Pull plan, price and billing dates off a subscription in one place, so every
 * event type describes the plan to the customer identically.
 *
 * `fallbackPrice` covers the case where the subscription could not be fetched —
 * quoting the wrong price to a customer is worse than an extra API call.
 */
function describeSubscription(subscription, env, fallbackPrice = null) {
  const item = subscription?.items?.data?.[0];
  const price = item?.price ?? fallbackPrice;
  const { planId, planName } = resolvePlanFromPriceId(price?.id, env);
  return {
    planId,
    planName,
    amountLabel: formatAmount(price?.unit_amount, price?.currency),
    intervalLabel: price?.recurring?.interval || "month",
    // Treat a future trial_end as a trial even if the status string hasn't
    // settled yet — sending "payment confirmed" to someone who was charged $0
    // is the one mistake this email must never make.
    isTrial:
      subscription?.status === "trialing" ||
      Boolean(subscription?.trial_end && subscription.trial_end * 1000 > Date.now()),
    trialEnd: subscription?.trial_end ?? null,
  };
}

/** Never let an email failure make Stripe retry and double-charge our sending. */
async function sendSafely(details, env, tag) {
  try {
    const res = await handleSendSubscriptionEmails(details, env);
    if (!res.ok) console.error(`[stripe-webhook] ${tag} email failed:`, res.error);
  } catch (e) {
    console.error(`[stripe-webhook] ${tag} email threw:`, e);
  }
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
async function handleCheckoutSessionCompleted(session, env, stripe) {
  const orderId = session.metadata?.order_id;
  const email = session.customer_details?.email || session.customer_email || null;

  // Load the subscription so we can tell a trial from an immediate purchase and
  // quote the real price back to the customer.
  let subscription = null;
  if (typeof session.subscription === "string") {
    try {
      subscription = await stripe.subscriptions.retrieve(session.subscription);
    } catch (e) {
      console.error("[stripe-webhook] Could not retrieve subscription:", e?.message || e);
    }
  }

  // If the subscription lookup failed, recover the plan from the session's own
  // line items so the customer is still quoted the right plan and price.
  let fallbackPrice = null;
  if (!subscription) {
    try {
      const items = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 1,
        expand: ["data.price"],
      });
      fallbackPrice = items.data?.[0]?.price ?? null;
    } catch (e) {
      console.error("[stripe-webhook] Could not list line items:", e?.message || e);
    }
  }
  const info = describeSubscription(subscription, env, fallbackPrice);

  // ── 1. Email the customer — unconditionally, on every purchase path ───────
  // This runs before any database work: a missing wizard record must never be
  // the reason someone pays and hears nothing back.
  if (email) {
    const trialDays =
      subscription?.trial_start && subscription?.trial_end
        ? Math.round((subscription.trial_end - subscription.trial_start) / 86400)
        : 7;
    await sendSafely(
      {
        kind: info.isTrial ? "trial_started" : "purchase_confirmed",
        email,
        planName: info.planName,
        amountLabel: info.amountLabel,
        intervalLabel: info.intervalLabel,
        firstChargeLabel: formatDate(info.trialEnd ?? subscription?.current_period_end),
        trialDays,
        subscriptionId: subscription?.id ?? null,
        orderId: orderId ?? null,
      },
      env,
      "checkout.session.completed",
    );
  } else {
    console.warn("[stripe-webhook] checkout.session.completed has no customer email.");
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, status: 500, error: "Supabase not configured." };
  }

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // ── 2a. Direct Payment Link signup (no wizard) ───────────────────────────
  // These carry no order_id because they never touched our server. Create the
  // record here so the subscriber is visible in admin instead of existing only
  // inside Stripe. Brand assets are missing by definition — the flag below tells
  // the team this one needs a manual onboarding follow-up.
  if (!orderId) {
    const { error: insErr } = await adminSb.from("project_requests").insert({
      request_type: "new_website",
      status: "in_progress",
      payload: {
        onboarding_version: 2,
        source: "stripe_payment_link",
        needs_onboarding_followup: true,
        contact_email: email ?? "",
        selected_plan: info.planId,
        payment_preference: "stripe",
        stripe_session_id: session.id,
        stripe_subscription_id: subscription?.id ?? null,
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        stripe_payment_status: info.isTrial ? "trialing" : "paid",
        stripe_paid_at: new Date().toISOString(),
        stripe_trial_end: info.trialEnd ? new Date(info.trialEnd * 1000).toISOString() : null,
      },
    });
    if (insErr) {
      console.error("[stripe-webhook] Could not record payment-link signup:", insErr.message);
      return { ok: false, status: 500, error: insErr.message };
    }
    console.log(`[stripe-webhook] recorded payment-link signup for ${email} (${session.id})`);
    return { ok: true, status: 200, received: true };
  }

  // ── 2b. Wizard checkout — merge payment data into the existing order ──────
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
    // A trial checkout reports payment_status "paid" on a $0 invoice, so record
    // the subscription's real state — the team needs to know no money has
    // actually arrived yet and when the first charge is due.
    stripe_payment_status: info.isTrial ? "trialing" : "paid",
    stripe_trial_end: info.trialEnd ? new Date(info.trialEnd * 1000).toISOString() : null,
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

  console.log(
    `[stripe-webhook] order ${orderId} marked ${info.isTrial ? "trialing" : "paid"} (session ${session.id})`,
  );
  return { ok: true, status: 200, received: true };
}

/**
 * Stripe fires this 3 days before a trial converts. Warning the customer before
 * we take their money is the difference between a renewal and a chargeback.
 *
 * @param {Stripe.Subscription} subscription
 */
async function handleTrialWillEnd(subscription, env, stripe) {
  const info = describeSubscription(subscription, env);
  const email = await resolveCustomerEmail(subscription.customer, stripe);
  if (!email) {
    console.warn("[stripe-webhook] trial_will_end: no customer email.");
    return { ok: true, status: 200, received: true };
  }

  await sendSafely(
    {
      kind: "trial_ending",
      email,
      planName: info.planName,
      amountLabel: info.amountLabel,
      intervalLabel: info.intervalLabel,
      firstChargeLabel: formatDate(info.trialEnd),
      subscriptionId: subscription.id,
    },
    env,
    "trial_will_end",
  );
  return { ok: true, status: 200, received: true };
}

/**
 * A declined card at trial conversion is silent otherwise — the subscription
 * lapses while we keep building. Tell both sides immediately.
 *
 * @param {Stripe.Invoice} invoice
 */
async function handleInvoicePaymentFailed(invoice, env, stripe) {
  // Ignore the $0 invoice Stripe raises when a trial subscription is created.
  if (!invoice.amount_due) return { ok: true, status: 200, received: true };

  const email = invoice.customer_email || (await resolveCustomerEmail(invoice.customer, stripe));
  if (!email) {
    console.warn("[stripe-webhook] payment_failed: no customer email.");
    return { ok: true, status: 200, received: true };
  }

  const line = invoice.lines?.data?.[0];
  const { planName } = resolvePlanFromPriceId(line?.price?.id, env);

  await sendSafely(
    {
      kind: "payment_failed",
      email,
      planName,
      amountLabel: formatAmount(invoice.amount_due, invoice.currency),
      intervalLabel: line?.price?.recurring?.interval || "month",
      manageUrl: invoice.hosted_invoice_url || null,
      subscriptionId: typeof invoice.subscription === "string" ? invoice.subscription : null,
    },
    env,
    "invoice.payment_failed",
  );
  return { ok: true, status: 200, received: true };
}

/** Customer may arrive as an id or an expanded object, depending on the event. */
async function resolveCustomerEmail(customer, stripe) {
  if (customer && typeof customer === "object") return customer.email ?? null;
  if (typeof customer !== "string") return null;
  try {
    const c = await stripe.customers.retrieve(customer);
    return c && !c.deleted ? (c.email ?? null) : null;
  } catch (e) {
    console.error("[stripe-webhook] Could not retrieve customer:", e);
    return null;
  }
}
