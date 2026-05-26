/**
 * Create a Paddle Billing transaction and return checkout.url for browser redirect.
 */
import { getPaddleConfig, paddleApiRequest, resolvePaddleTransactionItems } from "./paddle-api.mjs";

const DEFAULT_SITE_ORIGIN = "https://nexora-agn.com";

export function getPaddlePublicSiteOrigin(env) {
  const explicit = String(env.NEXORA_PUBLIC_URL || env.VITE_PUBLIC_SITE_URL || "")
    .trim()
    .replace(/\/$/, "");
  if (explicit) return explicit;
  return DEFAULT_SITE_ORIGIN.replace(/\/$/, "");
}

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {{
 *   orderId: string;
 *   payload: Record<string, unknown>;
 *   amount?: unknown;
 *   currency?: string;
 * }} opts
 */
export async function buildPaddlePaymentRedirectUrl(env, opts) {
  const { apiKey } = getPaddleConfig(env);
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: "Paddle is not configured — set PADDLE_API_KEY on the server and restart.",
    };
  }

  const payload = opts.payload && typeof opts.payload === "object" ? opts.payload : {};
  const email =
    typeof payload.contact_email === "string" ? payload.contact_email.trim().slice(0, 320) : "";
  const plan = typeof payload.selected_plan === "string" ? payload.selected_plan : "";

  const itemsRes = resolvePaddleTransactionItems(env, {
    plan,
    amountOverride: opts.amount,
  });
  if (!itemsRes.ok) {
    return { ok: false, status: itemsRes.status ?? 500, error: itemsRes.error };
  }

  const siteOrigin = getPaddlePublicSiteOrigin(env);
  const checkoutReturnUrl = `${siteOrigin}/payment/complete`;

  /** @type {Record<string, unknown>} */
  const body = {
    items: itemsRes.items,
    collection_mode: "automatic",
    custom_data: {
      project_request_id: opts.orderId,
      selected_plan: plan || null,
    },
    checkout: {
      url: checkoutReturnUrl,
    },
  };

  if (email) {
    body.customer = { email };
  }

  const created = await paddleApiRequest(env, "/transactions", { method: "POST", body });
  if (!created.ok) {
    return { ok: false, status: created.status ?? 502, error: created.error };
  }

  const txn = created.data?.data;
  const payment_URL = txn?.checkout?.url;
  if (!payment_URL || typeof payment_URL !== "string") {
    return {
      ok: false,
      status: 502,
      error:
        "Paddle did not return a checkout URL. Confirm your default payment link is approved in Paddle → Checkout settings.",
    };
  }

  return {
    ok: true,
    payment_URL,
    transaction_id: typeof txn?.id === "string" ? txn.id : null,
    purchase: itemsRes.purchase,
  };
}
