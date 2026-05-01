/**
 * Paysera Checkout — list payment methods (server-side).
 * GET https://api.paysera.com/checkout-project/integration/v1/methods
 *
 * Filtering: pass both `amount` (minor units) and `currency` (ISO 4217) query params together.
 *
 * Uses the same OAuth token env as payment links (`PAYSERA_ACCESS_TOKEN`).
 */
import { authenticateStaff, payseraStaffAuthHttpError } from "./paysera-staff.mjs";

function firstQueryValue(val) {
  if (val == null) return undefined;
  if (Array.isArray(val)) {
    const v = val[0];
    return v == null ? undefined : typeof v === "string" ? v : String(v);
  }
  return typeof val === "string" ? val : String(val);
}

function parseOptionalFilter(query) {
  if (!query || typeof query !== "object") return {};
  const rawAmt = firstQueryValue(query.amount) ?? firstQueryValue(query["amount[]"]);
  const rawCur = firstQueryValue(query.currency) ?? firstQueryValue(query["currency[]"]);
  const cur = typeof rawCur === "string" ? rawCur.trim().toUpperCase() : "";
  const amtRaw = rawAmt === undefined ? "" : typeof rawAmt === "string" ? rawAmt.trim() : String(rawAmt);
  if (!cur || amtRaw === "") return {};

  const n = typeof rawAmt === "number" ? rawAmt : Number.parseInt(amtRaw, 10);
  if (!Number.isFinite(n) || n < 1 || n > Number.MAX_SAFE_INTEGER) return {};
  if (!/^[A-Z]{3}$/.test(cur)) return {};

  return { amount: Math.round(n), currency: cur };
}

/**
 * @param {Record<string, string | undefined> | { amount?: string; currency?: string }} query — URL query parsed
 * @param {string | undefined} authorization
 * @param {NodeJS.ProcessEnv} env
 */
export async function handleListPayseraPaymentMethods(query, authorization, env) {
  try {
    const payseraToken = env.PAYSERA_ACCESS_TOKEN?.trim();
    const apiOrigin = (env.PAYSERA_API_ORIGIN || "https://api.paysera.com").replace(/\/$/, "");

    if (!payseraToken) {
      return { ok: false, status: 500, error: "Paysera is not configured (missing PAYSERA_ACCESS_TOKEN)." };
    }

    try {
      await authenticateStaff(authorization, env);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const mapped = payseraStaffAuthHttpError(msg);
      if (mapped) return mapped;
      return { ok: false, status: 500, error: msg };
    }

    const filter = parseOptionalFilter(query || {});
    const params = new URLSearchParams();
    if (filter.amount != null && filter.currency) {
      params.set("amount", String(filter.amount));
      params.set("currency", filter.currency);
    }
    const qs = params.toString();
    const url = `${apiOrigin}/checkout-project/integration/v1/methods${qs ? `?${qs}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payseraToken}`,
        Accept: "application/json",
      },
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

    const items = Array.isArray(json.items) ? json.items : [];

    return { ok: true, status: 200, items };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, status: 500, error: msg };
  }
}
