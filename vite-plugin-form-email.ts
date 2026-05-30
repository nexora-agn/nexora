import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv } from "vite";

function setDevApiCors(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const ch of req) {
    chunks.push(ch as Buffer);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

async function readRawTextBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const ch of req) {
    chunks.push(ch as Buffer);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function writeJson(res: ServerResponse, status: number, payload: unknown) {
  setDevApiCors(res);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(payload));
}

function parseQuery(urlStr: string | undefined): Record<string, string | undefined> {
  if (!urlStr) return {};
  try {
    const i = urlStr.indexOf("?");
    if (i < 0) return {};
    const u = new URL(urlStr.slice(i), "http://vite.localhost");
    const out: Record<string, string | undefined> = {};
    u.searchParams.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  } catch {
    return {};
  }
}

/**
 * Serves dev-only APIs mirrored from the production server (server/hostinger.mjs):
 * send-form-emails, start-project Stripe Checkout redirect, and the Stripe webhook.
 */
export function formEmailApiPlugin(): Plugin {
  return {
    name: "form-email-api",
    configureServer(server) {
      const mode = server.config.mode;
      const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };

      server.middlewares.use(async (req, res, next) => {
        const pathOnly = req.url?.split("?")[0] || "";
        const isForms = pathOnly.startsWith("/api/send-form-emails");
        const isStartProjectStripe = pathOnly.startsWith("/api/start-project-stripe");
        const isStripeWebhook = pathOnly.startsWith("/api/stripe-webhook");

        if (!isForms && !isStartProjectStripe && !isStripeWebhook) {
          return next();
        }

        if (req.method === "OPTIONS") {
          setDevApiCors(res);
          res.statusCode = 204;
          res.end();
          return;
        }

        if (isStripeWebhook && req.method === "POST") {
          const rawBody = await readRawTextBody(req);
          const signatureHeader =
            typeof req.headers["stripe-signature"] === "string"
              ? req.headers["stripe-signature"]
              : undefined;
          const { handleStripeWebhook } = await import("./server/stripe-webhook.mjs");
          const result = await handleStripeWebhook({
            rawBody,
            signatureHeader,
            env: env as NodeJS.ProcessEnv,
          });
          writeJson(res, result.status ?? 200, result);
          return;
        }

        if (req.method !== "POST") {
          return next();
        }

        let body: unknown;
        try {
          body = await readJsonBody(req);
        } catch {
          writeJson(res, 400, { ok: false, error: "Invalid JSON" });
          return;
        }

        let result: Record<string, unknown> & { ok?: boolean; status?: number };

        if (isForms) {
          const { handleSendFormEmails } = await import("./server/form-email-resend.mjs");
          result = (await handleSendFormEmails(body, env)) as typeof result;
          const httpStatus =
            typeof result.status === "number" ? result.status : result.ok ? 200 : 500;
          writeJson(res, httpStatus, result);
          return;
        }

        // isStartProjectStripe
        const reqOrigin =
          typeof req.headers.origin === "string"
            ? req.headers.origin
            : typeof req.headers.host === "string"
              ? `http://${req.headers.host}`
              : undefined;
        const { handlePublicStartProjectStripeRedirect } = await import(
          "./server/public-start-project-stripe.mjs"
        );
        result = (await handlePublicStartProjectStripeRedirect(
          body as Record<string, unknown>,
          env as NodeJS.ProcessEnv,
          reqOrigin,
        )) as typeof result;
        const httpStatus = typeof result.status === "number" ? result.status : result.ok ? 200 : 500;
        writeJson(res, httpStatus, result);
      });
    },
  };
}
