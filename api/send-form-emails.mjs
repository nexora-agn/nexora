// POST /api/send-form-emails — Resend: internal + client emails for contact, demo, start project.
import { handleSendFormEmails } from "../server/form-email-resend.mjs";

export const config = {
  api: {
    bodyParser: true,
  },
  maxDuration: 30,
};

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const result = await handleSendFormEmails(body, process.env);
  if (result.ok) {
    return res.status(200).json(result);
  }
  return res.status(500).json(result);
}
