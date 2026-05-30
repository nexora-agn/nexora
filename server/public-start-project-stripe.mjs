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

  const { requestType, payload } = parsed.data;
  if (payload?.onboarding_version !== 2) {
    return { ok: false, status: 400, error: "Unsupported submission for this checkout." };
  }

  // Enterprise / custom plan — no payment, just save & notify
  if (payload?.selected_plan === "custom") {
    return handleCustomPlanEnquiry({ requestType, payload, env });
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

  // Fire confirmation emails (non-blocking)
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

/**
 * Enterprise / custom plan — save enquiry and notify, no payment link.
 */
async function handleCustomPlanEnquiry({ requestType, payload, env }) {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, status: 500, error: "Server is not configured (Supabase service role)." };
  }

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: row, error: insErr } = await adminSb
    .from("project_requests")
    .insert({ request_type: requestType, status: "new", payload })
    .select("id")
    .single();

  if (insErr || !row?.id) {
    return { ok: false, status: 500, error: insErr?.message || "Could not save your request." };
  }

  try {
    await handleSendFormEmails({ formType: "start_project", requestType, payload }, env);
  } catch (e) {
    console.warn("[start-project-stripe] Custom-plan emails error:", e);
  }

  return { ok: true, status: 200, checkout_url: null, order_id: String(row.id), session_id: null };
}
