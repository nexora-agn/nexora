/**
 * Stripe Checkout Session helpers (server-only).
 *
 * Env:
 * - STRIPE_SECRET_KEY        — sk_live_… or sk_test_…
 * - STRIPE_PRICE_ID_STARTER    — recurring price for Starter plan ($99/mo)
 * - STRIPE_PRICE_ID_GROWTH     — recurring price for Growth plan ($199/mo)
 * - STRIPE_PRICE_ID_ENTERPRISE — recurring price for Enterprise plan ($399/mo)
 * - NEXORA_PUBLIC_URL        — canonical site origin (https://nexora-agn.com)
 */
import Stripe from "stripe";

function normalizeEnv(raw) {
  let s = String(raw ?? "").trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

export function getStripeConfig(env) {
  const secretKey = normalizeEnv(env.STRIPE_SECRET_KEY);
  const priceStarter = normalizeEnv(env.STRIPE_PRICE_ID_STARTER);
  const priceGrowth = normalizeEnv(env.STRIPE_PRICE_ID_GROWTH);
  const priceEnterprise = normalizeEnv(env.STRIPE_PRICE_ID_ENTERPRISE);
  // Configured canonical origin (set NEXORA_PUBLIC_URL in production). Empty in
  // local dev so we can fall back to the request origin instead.
  const configuredOrigin = normalizeEnv(env.NEXORA_PUBLIC_URL || env.VITE_PUBLIC_SITE_URL || "");
  return { secretKey, priceStarter, priceGrowth, priceEnterprise, configuredOrigin };
}

/** Only http(s) origins are accepted as a redirect base. */
function sanitizeOrigin(raw) {
  const s = String(raw ?? "").trim().replace(/\/$/, "");
  return /^https?:\/\/[^\s]+$/i.test(s) ? s : "";
}

/**
 * Resolve the site origin used to build Stripe success/cancel URLs.
 * Priority: configured env (canonical, prod) → request origin (dev) → prod default.
 */
export function resolveSiteOrigin(env, requestOrigin) {
  const { configuredOrigin } = getStripeConfig(env);
  return (
    sanitizeOrigin(configuredOrigin) ||
    sanitizeOrigin(requestOrigin) ||
    "https://nexora-agn.com"
  );
}

/**
 * Resolve the Stripe Price ID for a given plan slug.
 */
export function resolveStripePriceId(planId, env) {
  const { priceStarter, priceGrowth, priceEnterprise } = getStripeConfig(env);
  if (planId === "starter") return priceStarter || null;
  if (planId === "growth") return priceGrowth || null;
  if (planId === "custom") return priceEnterprise || null;
  return null;
}

/**
 * Create a Stripe Checkout Session for a subscription plan.
 *
 * @param {NodeJS.ProcessEnv} env
 * @param {{
 *   orderId: string;
 *   planId: string;
 *   email?: string;
 *   origin?: string;
 * }} opts
 */
export async function buildStripeCheckoutUrl(env, opts) {
  const { secretKey } = getStripeConfig(env);
  const siteOrigin = resolveSiteOrigin(env, opts.origin);

  if (!secretKey) {
    return { ok: false, status: 500, error: "Stripe is not configured — set STRIPE_SECRET_KEY and restart." };
  }

  const priceId = resolveStripePriceId(opts.planId, env);
  if (!priceId) {
    return {
      ok: false,
      status: 400,
      error: `No Stripe price configured for plan "${opts.planId}". Set STRIPE_PRICE_ID_STARTER / STRIPE_PRICE_ID_GROWTH / STRIPE_PRICE_ID_ENTERPRISE.`,
    };
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-04-30.basil" });

  /** @type {Stripe.Checkout.SessionCreateParams} */
  const params = {
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteOrigin}/payment/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteOrigin}/payment/cancelled`,
    metadata: { order_id: opts.orderId },
  };

  if (opts.email) {
    params.customer_email = opts.email;
  }

  try {
    const session = await stripe.checkout.sessions.create(params);
    return { ok: true, checkout_url: session.url, session_id: session.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 500, error: `Stripe error: ${message}` };
  }
}
