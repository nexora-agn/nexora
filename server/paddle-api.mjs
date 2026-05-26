/**
 * Paddle Billing API helpers (server-only).
 *
 * Env:
 * - PADDLE_API_KEY — `pdl_live_apikey_…` or `pdl_sdbx_apikey_…`
 * - PADDLE_PRICE_ID — default catalog price (optional)
 * - PADDLE_PRICE_ID_STARTER | _GROWTH | _CUSTOM — per-plan catalog prices (optional)
 * - PADDLE_PAYMENT_AMOUNT_MINOR — fallback one-time amount in minor units (e.g. cents)
 * - PADDLE_CURRENCY — default USD
 */

function normalizeEnv(raw) {
  let s = String(raw ?? "").trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

export function getPaddleConfig(env) {
  const apiKey = normalizeEnv(env.PADDLE_API_KEY);
  const explicitSandbox = normalizeEnv(env.PADDLE_SANDBOX);
  const useSandbox =
    explicitSandbox === "1" ||
    /^true$/i.test(explicitSandbox) ||
    (apiKey.includes("sdbx") && !apiKey.includes("live"));
  const baseUrl = useSandbox ? "https://sandbox-api.paddle.com" : "https://api.paddle.com";
  const currency = normalizeEnv(env.PADDLE_CURRENCY || "USD").toUpperCase().slice(0, 3) || "USD";
  return { apiKey, baseUrl, currency, useSandbox };
}

function coerceAmountMinor(v, fallback) {
  if (v == null || v === "") return fallback;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n < 1 || n > Number.MAX_SAFE_INTEGER) return null;
  return Math.round(n);
}

function planDefaultAmountMinor(plan) {
  if (plan === "starter") return 19900;
  if (plan === "growth") return 39900;
  return null;
}

function planLabel(plan) {
  if (plan === "starter") return "Starter";
  if (plan === "growth") return "Growth";
  if (plan === "custom") return "Custom";
  return "Nexora package";
}

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {{ plan?: string; amountOverride?: unknown }} opts
 */
export function resolvePaddlePriceId(env, { plan, amountOverride }) {
  const planKey = typeof plan === "string" ? plan.trim().toLowerCase() : "";
  const perPlan =
    planKey === "starter"
      ? normalizeEnv(env.PADDLE_PRICE_ID_STARTER)
      : planKey === "growth"
        ? normalizeEnv(env.PADDLE_PRICE_ID_GROWTH)
        : planKey === "custom"
          ? normalizeEnv(env.PADDLE_PRICE_ID_CUSTOM)
          : "";
  if (perPlan) return perPlan;
  return normalizeEnv(env.PADDLE_PRICE_ID);
}

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {{ plan?: string; amountOverride?: unknown }} opts
 */
export function resolvePaddleTransactionItems(env, opts = {}) {
  const { currency } = getPaddleConfig(env);
  const plan = typeof opts.plan === "string" ? opts.plan.trim().toLowerCase() : "";
  const priceId = resolvePaddlePriceId(env, opts);
  if (priceId) {
    return { ok: true, items: [{ quantity: 1, price_id: priceId }], purchase: { mode: "catalog", currency } };
  }

  const defaultMinor = coerceAmountMinor(env.PADDLE_PAYMENT_AMOUNT_MINOR, undefined);
  const amountMinor =
    coerceAmountMinor(opts.amountOverride, undefined) ??
    planDefaultAmountMinor(plan) ??
    defaultMinor;

  if (amountMinor == null) {
    const hint =
      plan === "custom"
        ? "Custom plans need PADDLE_PRICE_ID_CUSTOM or contact us for a quote."
        : "Set PADDLE_PRICE_ID (or per-plan PADDLE_PRICE_ID_STARTER / _GROWTH) or PADDLE_PAYMENT_AMOUNT_MINOR on the server.";
    return { ok: false, status: 500, error: `Paddle: missing price configuration. ${hint}` };
  }

  const label = planLabel(plan);
  return {
    ok: true,
    items: [
      {
        quantity: 1,
        price: {
          description: `Nexora ${label} package`,
          name: label,
          billing_cycle: null,
          tax_category: "standard",
          unit_price: {
            amount: String(amountMinor),
            currency_code: currency,
          },
          product: {
            name: "Nexora website package",
            tax_category: "standard",
          },
        },
      },
    ],
    purchase: { mode: "custom", amount: amountMinor, currency },
  };
}

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {string} path — e.g. `/transactions`
 * @param {{ method?: string; body?: unknown }} options
 */
export async function paddleApiRequest(env, path, options = {}) {
  const { apiKey, baseUrl } = getPaddleConfig(env);
  if (!apiKey) {
    return { ok: false, status: 500, error: "Paddle is not configured (missing PADDLE_API_KEY)." };
  }

  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  let res;
  try {
    res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: options.body != null ? JSON.stringify(options.body) : undefined,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, status: 502, error: `Paddle API unreachable: ${msg}` };
  }

  let data = null;
  const text = await res.text();
  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      return { ok: false, status: 502, error: "Paddle API returned invalid JSON." };
    }
  }

  if (!res.ok) {
    const detail =
      data?.error?.detail ||
      data?.error?.message ||
      (typeof data?.error === "string" ? data.error : null) ||
      text.slice(0, 300) ||
      `HTTP ${res.status}`;
    return { ok: false, status: res.status >= 400 && res.status < 600 ? res.status : 502, error: String(detail) };
  }

  return { ok: true, data };
}
