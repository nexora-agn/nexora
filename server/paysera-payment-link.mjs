/**
 * Staff-only: resolve signed Paysera classic redirect URL for an existing project request.
 *
 * Env: same as `paysera-redirect-url.mjs` (PAYSERA_PROJECT_ID, PAYSERA_SIGN_PASSWORD, …)
 */
import { authenticateStaff, payseraStaffAuthHttpError } from "./paysera-staff.mjs";
import { buildPayseraPaymentRedirectUrl } from "./paysera-redirect-url.mjs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(s) {
  return typeof s === "string" && UUID_RE.test(s.trim());
}

/**
 * POST body from admin UI:
 * - projectRequestId (required) — UUID, becomes Paysera orderid
 * - amount, currency, payment, lang — optional overrides
 *
 * @param {Record<string, unknown>} body
 * @param {string | undefined} authorization
 * @param {NodeJS.ProcessEnv} env
 */
export async function handleCreatePayseraPaymentLink(body, authorization, env) {
  try {
    const projectRequestId = String(body?.projectRequestId || "").trim();
    if (!isUuid(projectRequestId)) {
      return { ok: false, status: 400, error: "Invalid or missing projectRequestId (must be a UUID)." };
    }

    let adminSb;
    try {
      const staff = await authenticateStaff(authorization, env);
      adminSb = staff.adminSb;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const mapped = payseraStaffAuthHttpError(msg);
      if (mapped) return mapped;
      return { ok: false, status: 500, error: msg };
    }

    const { data: reqRow, error: reqErr } = await adminSb
      .from("project_requests")
      .select("id, payload")
      .eq("id", projectRequestId)
      .maybeSingle();

    if (reqErr) {
      return { ok: false, status: 500, error: reqErr.message || "Failed to load project request." };
    }
    if (!reqRow) {
      return { ok: false, status: 404, error: "Project request not found." };
    }

    const payload = reqRow.payload && typeof reqRow.payload === "object" ? reqRow.payload : {};

    const redirect = buildPayseraPaymentRedirectUrl(env, {
      orderId: projectRequestId,
      payload,
      amount: body.amount ?? body?.purchase?.amount,
      currency: typeof body.currency === "string" ? body.currency : undefined,
      payment: typeof body.payment === "string" ? body.payment : undefined,
      lang: typeof body.lang === "string" ? body.lang : undefined,
    });

    if (!redirect.ok) {
      return { ok: false, status: redirect.status, error: redirect.error };
    }

    return {
      ok: true,
      status: 200,
      payment_URL: redirect.payment_URL,
      order_id: projectRequestId,
      link_id: null,
      expired_at: null,
      created_at: null,
      purchase: redirect.purchase,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, status: 500, error: msg };
  }
}
