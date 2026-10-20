// GET /api/stripe-trial?plan=starter|growth|custom — redirect to a 7-day trial checkout.
import { buildStripeTrialCheckoutUrl } from "../server/stripe-checkout.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const reqOrigin =
    typeof req.headers.origin === "string"
      ? req.headers.origin
      : req.headers.host
        ? `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`
        : undefined;
  const planId = typeof req.query?.plan === "string" ? req.query.plan : "";
  const result = await buildStripeTrialCheckoutUrl(process.env, { planId, origin: reqOrigin });
  if (!result.ok || !result.checkout_url) {
    return res.status(result.status ?? 500).json({ ok: false, error: result.error || "Could not start trial checkout." });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.redirect(302, result.checkout_url);
}
