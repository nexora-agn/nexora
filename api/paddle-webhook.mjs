// POST /api/paddle-webhook — Paddle Billing notifications (raw JSON body required for signature).
import { handlePaddleWebhook } from "../server/paddle-webhook.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");
  if (req.body && typeof req.body === "object") {
    return JSON.stringify(req.body);
  }
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const rawBody = await readRawBody(req);
  const signatureHeader =
    typeof req.headers["paddle-signature"] === "string"
      ? req.headers["paddle-signature"]
      : typeof req.headers["Paddle-Signature"] === "string"
        ? req.headers["Paddle-Signature"]
        : undefined;

  const result = await handlePaddleWebhook({
    rawBody,
    signatureHeader,
    env: process.env,
  });

  return res.status(result.status).json(result.body);
}
