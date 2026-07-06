/**
 * Public start-project + Stripe Checkout redirect.
 */
import { createClient } from "@supabase/supabase-js";
import { parseStartProject, handleSendFormEmails } from "./form-email-resend.mjs";
import { resolveSupabaseEnv } from "./payment-staff.mjs";
import { buildStripeCheckoutUrl } from "./stripe-checkout.mjs";

/**
 * @param {Record<string, unknown>} body — { requestType, payload }
 * @param {NodeJS.ProcessEnv} env
 * @param {string} [requestOrigin] — origin of the incoming request (used for
 *   success/cancel URLs in local dev; the configured NEXORA_PUBLIC_URL wins).
 */
export async function handlePublicStartProjectStripeRedirect(body, env, requestOrigin) {
  const parsed = parseStartProject(body);
  if ("error" in parsed) {
    return { ok: false, status: 400, error: String(parsed.error) };
  }

  // Delivery mode: "email" emails a secure checkout link to the client instead
  // of redirecting the browser. Anything else defaults to the redirect flow.
  const delivery = body?.delivery === "email" ? "email" : "redirect";

  const { requestType, payload } = parsed.data;
  if (payload?.onboarding_version !== 2) {
    return { ok: false, status: 400, error: "Unsupported submission for this checkout." };
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, status: 500, error: "Server is not configured (Supabase service role)." };
  }

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: row, error: insErr } = await adminSb
    .from("project_requests")
    .insert({
      request_type: requestType,
      status: "new",
      payload: payload,
    })
    .select("id")
    .single();

  if (insErr || !row?.id) {
    return {
      ok: false,
      status: 500,
      error: insErr?.message || "Could not save your request.",
    };
  }

  const orderId = String(row.id);
  const email = typeof payload.contact_email === "string" ? payload.contact_email.trim() : undefined;
  const planId = typeof payload.selected_plan === "string" ? payload.selected_plan : "";

  const redirect = await buildStripeCheckoutUrl(env, { orderId, planId, email, origin: requestOrigin });

  if (!redirect.ok) {
    await adminSb.from("project_requests").delete().eq("id", orderId);
    return { ok: false, status: redirect.status ?? 500, error: redirect.error };
  }

  // ── Email-link delivery ──────────────────────────────────────────────────
  // The client asked us to email the payment link instead of redirecting. The
  // email IS the deliverable here, so a send failure is a hard error (the order
  // row is left as 'new' — harmless, admins can re-send). The same Checkout
  // Session carries metadata.order_id, so the webhook still flips the order.
  if (delivery === "email") {
    let emailResult;
    try {
      emailResult = await handleSendFormEmails(
        { formType: "start_project", requestType, payload, paymentLink: redirect.checkout_url },
        env,
      );
    } catch (e) {
      console.error("[start-project-stripe] Payment-link email error:", e);
      return { ok: false, status: 502, error: "Could not send the payment link email. Please try paying now instead." };
    }
    if (!emailResult.ok) {
      console.error("[start-project-stripe] Payment-link email failed:", emailResult.error);
      return { ok: false, status: 502, error: "Could not send the payment link email. Please try paying now instead." };
    }
    return {
      ok: true,
      status: 200,
      checkout_url: null,
      order_id: orderId,
      session_id: redirect.session_id,
      delivery: "email",
    };
  }

  // ── Redirect delivery (default) ──────────────────────────────────────────
  // Fire confirmation emails (non-blocking) and return the URL for redirect.
  try {
    const emailResult = await handleSendFormEmails(
      { formType: "start_project", requestType, payload },
      env,
    );
    if (!emailResult.ok) {
      console.warn("[start-project-stripe] Confirmation emails failed:", emailResult.error);
    }
  } catch (e) {
    console.warn("[start-project-stripe] Confirmation emails error:", e);
  }

  return {
    ok: true,
    status: 200,
    checkout_url: redirect.checkout_url,
    order_id: orderId,
    session_id: redirect.session_id,
  };
}
