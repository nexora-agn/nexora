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

function getAuthorization(req: IncomingMessage): string | undefined {
  if (typeof req.headers.authorization === "string") return req.headers.authorization;
  const caps = req.headers as { Authorization?: string };
  if (typeof caps.Authorization === "string") return caps.Authorization;
  return undefined;
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
 * Serves dev-only APIs mirrored from Vercel: send-form-emails, start-project+paddle redirect, Paddle payment link, webhook.
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
        const isStartProjectPaddle = pathOnly.startsWith("/api/start-project-paddle");
        const isPaddleLink = pathOnly.startsWith("/api/paddle-payment-link");
        const isPaddleWebhook = pathOnly.startsWith("/api/paddle-webhook");

        if (!isForms && !isStartProjectPaddle && !isPaddleLink && !isPaddleWebhook) {
          return next();
        }

        if (req.method === "OPTIONS") {
          setDevApiCors(res);
          res.statusCode = 204;
          res.end();
          return;
        }

        const auth = getAuthorization(req);

        if (isPaddleWebhook && req.method === "POST") {
          const rawBody = await readRawTextBody(req);
          const signatureHeader =
            typeof req.headers["paddle-signature"] === "string"
              ? req.headers["paddle-signature"]
              : typeof (req.headers as { "Paddle-Signature"?: string })["Paddle-Signature"] === "string"
                ? (req.headers as { "Paddle-Signature": string })["Paddle-Signature"]
                : undefined;
          const { handlePaddleWebhook } = await import("./server/paddle-webhook.mjs");
          const result = await handlePaddleWebhook({
            rawBody,
            signatureHeader,
            env: env as NodeJS.ProcessEnv,
          });
          setDevApiCors(res);
          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
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

        if (isStartProjectPaddle) {
          const { handlePublicStartProjectPaddleRedirect } = await import(
            "./server/public-start-project-paddle.mjs"
          );
          result = (await handlePublicStartProjectPaddleRedirect(body as Record<string, unknown>, env)) as typeof result;
          const httpStatus = typeof result.status === "number" ? result.status : result.ok ? 200 : 500;
          writeJson(res, httpStatus, result);
          return;
        }

        const { handleCreatePaddlePaymentLink } = await import("./server/paddle-payment-link.mjs");
        result = (await handleCreatePaddlePaymentLink(body as Record<string, unknown>, auth, env)) as typeof result;
        const httpStatus = typeof result.status === "number" ? result.status : result.ok ? 200 : 500;
        writeJson(res, httpStatus, result);
      });
    },
  };
}
