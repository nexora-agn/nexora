/**
 * Build the signed Paysera classic redirect URL (https://www.paysera.com/pay/?data=…&sign=…).
 * No HTTP call to Paysera — only local encoding per their custom integration spec.
 */
import { buildPayseraClassicPaymentUrl, encodePayseraPayDataSign } from "./paysera-classic.mjs";

const DEFAULT_SITE_ORIGIN = "https://nexora-agn.com";

export function getPayseraPublicSiteOrigin(env) {
  const explicit = String(env.NEXORA_PUBLIC_URL || env.VITE_PUBLIC_SITE_URL || "")
    .trim()
    .replace(/\/$/, "");
  if (explicit) return explicit;
  return DEFAULT_SITE_ORIGIN.replace(/\/$/, "");
}

function coerceAmountminor(v, fallback) {
  if (v == null || v === "") return fallback;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n < 1 || n > Number.MAX_SAFE_INTEGER) return null;
  return Math.round(n);
}

function splitName(fullName) {
  const t = fullName.trim();
  if (!t) return { first: "", last: "" };
  const sp = t.indexOf(" ");
  if (sp < 0) return { first: t.slice(0, 100), last: "" };
  return { first: t.slice(0, sp).slice(0, 100), last: t.slice(sp + 1).trim().slice(0, 100) };
}

function normalizeEnvRaw(raw) {
  let s = String(raw ?? "").trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/**
 * Accept PAYSERA_PROJECT_ID or VITE_PAYSERA_PROJECT_ID (common in .env.local next to other VITE_ keys).
 * @param {NodeJS.ProcessEnv} env
 */
function resolvePayseraProjectId(env) {
  const candidates = [normalizeEnvRaw(env.PAYSERA_PROJECT_ID), normalizeEnvRaw(env.VITE_PAYSERA_PROJECT_ID)].filter(
    Boolean,
  );
  for (const s of candidates) {
    const n = Number.parseInt(s, 10);
    if (Number.isFinite(n) && n >= 1) return { ok: true, projectId: n };
    return { ok: false, kind: "invalid", hint: s };
  }
  const hasLegacyOAuth = Boolean(normalizeEnvRaw(env.PAYSERA_ACCESS_TOKEN));
  return { ok: false, kind: "missing", hasLegacyOAuth };
}

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {{
 *   orderId: string;
 *   payload: Record<string, unknown>;
 *   amount?: unknown;
 *   currency?: string;
 *   payment?: string;
 *   lang?: string;
 * }} opts
 * @returns { { ok: true; payment_URL: string; purchase: { amount: number; currency: string } } | { ok: false; status: number; error: string } }
 */
export function buildPayseraPaymentRedirectUrl(env, opts) {
  const idRes = resolvePayseraProjectId(env);
  const signPassword = normalizeEnvRaw(String(env.PAYSERA_SIGN_PASSWORD || env.PAYSERA_PROJECT_PASSWORD || ""));
  const defaultMinor = coerceAmountminor(env.PAYSERA_PAYMENT_AMOUNT_MINOR, undefined);
  const defaultCurrency = String(env.PAYSERA_CURRENCY || "EUR")
    .trim()
    .toUpperCase()
    .slice(0, 3);
  const testMode = String(env.PAYSERA_TEST || "").trim();
  const includeTest = testMode === "1" || /^true$/i.test(testMode);

  if (!idRes.ok) {
    const msg =
      idRes.kind === "invalid"
        ? `Paysera: project id must be a positive integer (got "${idRes.hint}").`
        : idRes.hasLegacyOAuth
          ? "Paysera: set PAYSERA_PROJECT_ID to your numeric project id (Paysera dashboard → Project settings). Classic checkout does not use PAYSERA_ACCESS_TOKEN — use PAYSERA_SIGN_PASSWORD (project sign password) and restart the dev server."
          : "Paysera: missing project id — set PAYSERA_PROJECT_ID (or VITE_PAYSERA_PROJECT_ID) to your numeric Paysera project id in .env.local, then restart the dev server (or redeploy).";
    return { ok: false, status: 500, error: msg };
  }
  const projectId = idRes.projectId;

  if (!signPassword) {
    const hasLegacyOAuth = Boolean(normalizeEnvRaw(env.PAYSERA_ACCESS_TOKEN));
    return {
      ok: false,
      status: 500,
      error: hasLegacyOAuth
        ? "Paysera: set PAYSERA_SIGN_PASSWORD (or PAYSERA_PROJECT_PASSWORD) to your project’s sign password from the Paysera dashboard — not the OAuth bearer token."
        : "Paysera is not configured (missing PAYSERA_SIGN_PASSWORD or PAYSERA_PROJECT_PASSWORD).",
    };
  }

  const payload = opts.payload && typeof opts.payload === "object" ? opts.payload : {};
  const email =
    typeof payload.contact_email === "string" ? payload.contact_email.trim().slice(0, 254) : "";
  const fullName =
    typeof payload.full_name === "string" ? payload.full_name.trim().slice(0, 200) : "";
  const company = typeof payload.company === "string" ? payload.company.trim().slice(0, 200) : "";

  const amountMinor = coerceAmountminor(opts.amount ?? undefined, defaultMinor ?? null);
  if (amountMinor == null) {
    return {
      ok: false,
      status: 500,
      error:
        "Missing payment amount: set PAYSERA_PAYMENT_AMOUNT_MINOR on the server or pass amount when building the redirect.",
    };
  }

  const currency =
    typeof opts.currency === "string" && opts.currency.trim().length >= 3
      ? opts.currency.trim().toUpperCase().slice(0, 3)
      : defaultCurrency;

  const lang =
    typeof opts.lang === "string" && opts.lang.trim() ? opts.lang.trim().slice(0, 8) : "en";

  const paymentMethod =
    typeof opts.payment === "string" && opts.payment.trim() ? opts.payment.trim().slice(0, 64) : undefined;

  const siteOrigin = getPayseraPublicSiteOrigin(env);
  const accepturl = `${siteOrigin}/payment/complete`;
  const cancelurl = `${siteOrigin}/payment/cancelled`;
  const callbackurl = `${siteOrigin}/api/paysera-callback`;

  const { first: pFirst, last: pLast } = splitName(fullName);

  /** Matches Paysera samples: projectid as string in the query bundle. */
  const payseraParams = {
    projectid: String(projectId),
    orderid: opts.orderId,
    amount: amountMinor,
    currency,
    accepturl,
    cancelurl,
    callbackurl,
    version: "1.8",
    lang,
  };

  if (includeTest) payseraParams.test = 1;
  if (email) payseraParams.p_email = email;
  if (pFirst) payseraParams.p_firstname = pFirst;
  if (pLast) payseraParams.p_lastname = pLast;

  const paytextBase =
    company ? `Nexora — ${company}`.slice(0, 255) : `Nexora project ${opts.orderId}`.slice(0, 255);
  payseraParams.paytext = paytextBase;

  if (paymentMethod) payseraParams.payment = paymentMethod;

  const { data: encodedData, sign } = encodePayseraPayDataSign(payseraParams, signPassword);
  const payment_URL = buildPayseraClassicPaymentUrl(encodedData, sign);

  return { ok: true, payment_URL, purchase: { amount: amountMinor, currency } };
}
