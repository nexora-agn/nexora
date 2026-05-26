/**
 * Public start-project + Paddle checkout redirect URL.
 */
import { createClient } from "@supabase/supabase-js";
import { parseStartProject, handleSendFormEmails } from "./form-email-resend.mjs";
import { resolveSupabaseEnv } from "./payment-staff.mjs";
import { buildPaddlePaymentRedirectUrl } from "./paddle-checkout.mjs";

/**
 * @param {Record<string, unknown>} body — { requestType, payload }
 * @param {NodeJS.ProcessEnv} env
 */
export async function handlePublicStartProjectPaddleRedirect(body, env) {
  const parsed = parseStartProject(body);
  if ("error" in parsed) {
    return { ok: false, status: 400, error: String(parsed.error) };
  }

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

  const redirect = await buildPaddlePaymentRedirectUrl(env, {
    orderId,
    payload,
    amount: body.amount,
    currency: typeof body.currency === "string" ? body.currency : undefined,
  });

  if (!redirect.ok) {
    await adminSb.from("project_requests").delete().eq("id", orderId);
    return { ok: false, status: redirect.status, error: redirect.error };
  }

  try {
    const emailResult = await handleSendFormEmails(
      { formType: "start_project", requestType, payload },
      env,
    );
    if (!emailResult.ok) {
      console.warn("[start-project-paddle] Confirmation emails failed:", emailResult.error);
    }
  } catch (e) {
    console.warn("[start-project-paddle] Confirmation emails error:", e);
  }

  return {
    ok: true,
    status: 200,
    payment_URL: redirect.payment_URL,
    order_id: orderId,
    transaction_id: redirect.transaction_id,
    purchase: redirect.purchase,
  };
}
