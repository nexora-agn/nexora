// POST /api/stripe-webhook — verify Stripe-Signature, mark project_request paid.
//
// Stripe signature verification requires the RAW request body, so the Vercel
// body parser must be disabled and the stream read manually.
import { handleStripeWebhook } from "../server/stripe-webhook.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 30,
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawBody = await readRawBody(req);
    const signatureHeader =
      typeof req.headers["stripe-signature"] === "string" ? req.headers["stripe-signature"] : undefined;
    const result = await handleStripeWebhook({ rawBody, signatureHeader, env: process.env });
    return res.status(result.status ?? 200).json(result);
  } catch (err) {
    console.error("[api/stripe-webhook] error:", err);
    return res.status(500).json({ error: "webhook_failed" });
  }
}
