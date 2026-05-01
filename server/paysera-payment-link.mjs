/**
 * Paysera Checkout Payment Link (server-side).
 * Docs: POST https://api.paysera.com/checkout-payment-link/integration/v1/payment-links
 *
 * Env:
 * - PAYSERA_ACCESS_TOKEN — OAuth2 bearer (see Paysera authentication docs)
 * - PAYSERA_API_ORIGIN — optional, default https://api.paysera.com
 * - PAYSERA_PAYMENT_AMOUNT_MINOR — default amount (minor units) when client omits `purchase.amount`
 */
import { authenticateStaff, payseraStaffAuthHttpError } from "./paysera-staff.mjs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(s) {
  return typeof s === "string" && UUID_RE.test(s.trim());
}

function clampLifetime(n, env) {
  const max = Number(env.PAYSERA_LINK_LIFETIME_MAX_SECONDS || 2592000) || 2592000;
  if (n == null || n === "") return undefined;
  const v = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(v) || v < 0) return undefined;
  return Math.min(Math.floor(v), max);
}

function coerceAmountminor(v, fallback) {
  if (v == null || v === "") return fallback;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n < 1 || n > Number.MAX_SAFE_INTEGER) return null;
  return Math.round(n);
}

/**
 * POST body from admin UI:
 * - projectRequestId (required) — used as Paysera order_id (this table row’s UUID)
 * - purchase.amount (optional minor units) — else PAYSERA_PAYMENT_AMOUNT_MINOR
 * - lifetime, experience.language, experience.payment_flow, payment_details.{key,purpose,country_code}, name override
 *
 * @param {Record<string, unknown>} body
 * @param {string | undefined} authorization
 * @param {NodeJS.ProcessEnv} env
 */
export async function handleCreatePayseraPaymentLink(body, authorization, env) {
  try {
    const token = env.PAYSERA_ACCESS_TOKEN?.trim();
    const apiOrigin = (env.PAYSERA_API_ORIGIN || "https://api.paysera.com").replace(/\/$/, "");
    const defaultMinor = coerceAmountminor(env.PAYSERA_PAYMENT_AMOUNT_MINOR, undefined);

    if (!token) {
      return { ok: false, status: 500, error: "Paysera is not configured (missing PAYSERA_ACCESS_TOKEN)." };
    }

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
    const fullName =
      typeof payload.full_name === "string" ? payload.full_name.trim().slice(0, 150) : "";
    const email =
      typeof payload.contact_email === "string" ? payload.contact_email.trim().slice(0, 254) : "";
    const company =
      typeof payload.company === "string" ? payload.company.trim() : "";

    const purchaseBody = body.purchase && typeof body.purchase === "object" ? body.purchase : {};
    const amountMinor = coerceAmountminor(purchaseBody.amount, defaultMinor ?? null);
    if (amountMinor == null) {
      return {
        ok: false,
        status: 400,
        error:
          "Missing purchase amount: set JSON body purchase.amount (minor units) or env PAYSERA_PAYMENT_AMOUNT_MINOR.",
      };
    }

    const experienceBody = body.experience && typeof body.experience === "object" ? body.experience : {};
    const lang =
      typeof experienceBody.language === "string" ? experienceBody.language.trim().slice(0, 8) || "en" : "en";
    const paymentFlow =
      typeof experienceBody.payment_flow === "string"
        ? experienceBody.payment_flow.trim()
        : "paysera_checkout";

    const paymentDetailsBody =
      body.payment_details && typeof body.payment_details === "object" ? body.payment_details : {};
    const payKey =
      typeof paymentDetailsBody.key === "string" && paymentDetailsBody.key.trim()
        ? paymentDetailsBody.key.trim()
        : undefined;
    const purpose =
      typeof paymentDetailsBody.purpose === "string"
        ? paymentDetailsBody.purpose.trim().slice(0, 255)
        : undefined;
    const countryCode =
      typeof paymentDetailsBody.country_code === "string"
        ? paymentDetailsBody.country_code.trim().slice(0, 2).toUpperCase()
        : undefined;

    const defaultPurpose = company
      ? `Nexora project — ${company}`.slice(0, 255)
      : `Nexora project request ${projectRequestId}`.slice(0, 255);
    let linkName =
      typeof body.name === "string" && body.name.trim()
        ? body.name.trim().slice(0, 255)
        : company
          ? `Order — ${company}`.slice(0, 255)
          : `Project request`.slice(0, 255);

    const payseraPayload = {
      order_id: projectRequestId,
      name: linkName,
      experience: {
        language: lang,
        payment_flow: paymentFlow,
      },
      purchase: {
        amount: amountMinor,
      },
    };

    const lifetime = clampLifetime(body.lifetime, env);
    if (lifetime !== undefined) payseraPayload.lifetime = lifetime;

    const pd = {};
    if (payKey) pd.key = payKey;
    pd.purpose = purpose || defaultPurpose;
    if (countryCode) pd.country_code = countryCode;
    if (Object.keys(pd).length) payseraPayload.payment_details = pd;

    const pi = {};
    if (fullName) pi.name = fullName;
    if (email) pi.email = email;
    if (Object.keys(pi).length) payseraPayload.payer_information = pi;

    if (body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)) {
      payseraPayload.metadata = body.metadata;
    }

    const url = `${apiOrigin}/checkout-payment-link/integration/v1/payment-links`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(payseraPayload),
    });

    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      return {
        ok: false,
        status: res.ok ? 500 : res.status,
        error: text?.slice(0, 400) || `Paysera error (HTTP ${res.status})`,
      };
    }

    if (!res.ok) {
      const errMsg =
        json?.message ||
        json?.error ||
        json?.detail ||
        (typeof json?.errors === "string" ? json.errors : JSON.stringify(json)) ||
        `Paysera error (HTTP ${res.status})`;
      return { ok: false, status: res.status, error: String(errMsg).slice(0, 600) };
    }

    const payment_URL = json.payment_URL || json.payment_url;
    if (!payment_URL || typeof payment_URL !== "string") {
      return { ok: false, status: 500, error: "Paysera response missing payment_URL." };
    }

    return {
      ok: true,
      status: 200,
      payment_URL,
      link_id: json.link_id ?? null,
      order_id: json.order_id ?? projectRequestId,
      expired_at: json.expired_at ?? null,
      created_at: json.created_at ?? null,
      purchase: json.purchase ?? null,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, status: 500, error: msg };
  }
}
