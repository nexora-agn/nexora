/**
 * Paddle Billing webhooks — verify Paddle-Signature and update project_requests on payment.
 *
 * Env:
 * - PADDLE_WEBHOOK_SECRET — endpoint secret from Paddle dashboard
 * - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 */
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { resolveSupabaseEnv } from "./payment-staff.mjs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PAID_STATUSES = new Set(["completed", "paid", "billed"]);

function isUuid(s) {
  return typeof s === "string" && UUID_RE.test(s.trim());
}

function parsePaddleSignatureHeader(header) {
  if (!header || typeof header !== "string") return null;
  let ts = "";
  /** @type {string[]} */
  const h1 = [];
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    const v = rest.join("=").trim();
    if (k === "ts") ts = v;
    if (k === "h1" && v) h1.push(v);
  }
  if (!ts || h1.length === 0) return null;
  return { ts, h1 };
}

/**
 * @param {string} rawBody
 * @param {string | undefined} signatureHeader
 * @param {string} secret
 */
export function verifyPaddleWebhookSignature(rawBody, signatureHeader, secret) {
  const parsed = parsePaddleSignatureHeader(signatureHeader);
  if (!parsed || !secret) return { ok: false, error: "missing_signature_or_secret" };

  const tsNum = Number.parseInt(parsed.ts, 10);
  if (!Number.isFinite(tsNum)) return { ok: false, error: "bad_timestamp" };
  const ageSec = Math.abs(Date.now() / 1000 - tsNum);
  if (ageSec > 300) return { ok: false, error: "timestamp_stale" };

  const signedPayload = `${parsed.ts}:${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  const matched = parsed.h1.some(sig => {
    try {
      const sigBuf = Buffer.from(sig, "hex");
      return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);
    } catch {
      return false;
    }
  });
  if (!matched) return { ok: false, error: "signature_mismatch" };
  return { ok: true };
}

function extractProjectRequestId(event) {
  const data = event?.data;
  const custom = data?.custom_data;
  if (custom && typeof custom === "object" && !Array.isArray(custom)) {
    const id = custom.project_request_id ?? custom.projectRequestId;
    if (isUuid(String(id || ""))) return String(id).trim();
  }
  return null;
}

function isPaidTransactionEvent(event) {
  const type = String(event?.event_type || "");
  if (!type.startsWith("transaction.")) return false;
  const status = String(event?.data?.status || "").toLowerCase();
  return PAID_STATUSES.has(status);
}

/**
 * @param {{ rawBody: string; signatureHeader?: string; env: NodeJS.ProcessEnv }}
 */
export async function handlePaddleWebhook({ rawBody, signatureHeader, env }) {
  const secret = String(env.PADDLE_WEBHOOK_SECRET || "").trim();
  if (!secret) {
    console.error("[paddle-webhook] Missing PADDLE_WEBHOOK_SECRET");
    return { status: 500, body: { error: "not_configured" } };
  }

  const verified = verifyPaddleWebhookSignature(rawBody, signatureHeader, secret);
  if (!verified.ok) {
    console.warn("[paddle-webhook] Signature failed:", verified.error);
    return { status: 401, body: { error: "invalid_signature" } };
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return { status: 400, body: { error: "invalid_json" } };
  }

  if (!isPaidTransactionEvent(event)) {
    return { status: 200, body: { received: true, ignored: true } };
  }

  const orderId = extractProjectRequestId(event);
  if (!orderId) {
    console.warn("[paddle-webhook] No project_request_id in custom_data");
    return { status: 200, body: { received: true, ignored: true } };
  }

  const notification = {
    received_at: new Date().toISOString(),
    event_type: event.event_type,
    transaction_id: event?.data?.id ?? null,
    status: event?.data?.status ?? null,
  };

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[paddle-webhook] Supabase service role not configured");
    return { status: 500, body: { error: "db_not_configured" } };
  }

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: row, error: loadErr } = await adminSb
    .from("project_requests")
    .select("id, payload, status")
    .eq("id", orderId)
    .maybeSingle();

  if (loadErr) {
    console.error("[paddle-webhook] DB load:", loadErr.message);
    return { status: 500, body: { error: "db_load_failed" } };
  }
  if (!row) {
    console.warn("[paddle-webhook] Unknown project_request:", orderId);
    return { status: 404, body: { error: "unknown_order" } };
  }

  const prevPayload =
    row.payload && typeof row.payload === "object" && !Array.isArray(row.payload) ? { ...row.payload } : {};
  const prevNotes = Array.isArray(prevPayload.paddle_webhooks) ? [...prevPayload.paddle_webhooks] : [];
  prevNotes.push(notification);

  const nextPayload = {
    ...prevPayload,
    paddle_webhooks: prevNotes,
    paddle_last_webhook: notification,
    paddle_paid_at: notification.received_at,
    paddle_payment_status: "paid",
    paddle_transaction_id: notification.transaction_id,
  };

  const nextRowStatus = row.status === "new" ? "in_progress" : row.status;

  const { error: upErr } = await adminSb
    .from("project_requests")
    .update({
      status: nextRowStatus,
      payload: nextPayload,
    })
    .eq("id", orderId);

  if (upErr) {
    console.error("[paddle-webhook] DB update:", upErr.message);
    return { status: 500, body: { error: "db_update_failed" } };
  }

  return { status: 200, body: { received: true } };
}
