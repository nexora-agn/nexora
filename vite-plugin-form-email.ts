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
 * Serves dev-only APIs mirrored from Vercel: send-form-emails, start-project+paysera redirect, Paysera payment link, callback.
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
        const isStartProjectPaysera = pathOnly.startsWith("/api/start-project-paysera");
        const isPayseraLink = pathOnly.startsWith("/api/paysera-payment-link");
        const isPayseraCallback = pathOnly.startsWith("/api/paysera-callback");

        if (!isForms && !isStartProjectPaysera && !isPayseraLink && !isPayseraCallback) {
          return next();
        }

        if (req.method === "OPTIONS") {
          setDevApiCors(res);
          res.statusCode = 204;
          res.end();
          return;
        }

        const auth = getAuthorization(req);

        if (isPayseraCallback && (req.method === "GET" || req.method === "POST")) {
          const query = parseQuery(req.url || "") as Record<string, string | undefined>;
          /** @type {Record<string, string>} */
          let form: Record<string, string> = {};
          if (req.method === "POST") {
            const raw = await readRawTextBody(req);
            const ct = String(req.headers["content-type"] || "").toLowerCase();
            if (ct.includes("application/x-www-form-urlencoded") && raw.trim()) {
              form = Object.fromEntries(new URLSearchParams(raw));
            }
          }
          const qFlat: Record<string, string | undefined> = {};
          for (const [k, v] of Object.entries(query)) {
            if (v != null) qFlat[k] = v;
          }
          const { handlePayseraCallback } = await import("./server/paysera-callback.mjs");
          const result = await handlePayseraCallback({
            query: qFlat,
            form,
            env: env as NodeJS.ProcessEnv,
          });
          setDevApiCors(res);
          res.statusCode = result.status;
          res.setHeader("Content-Type", result.contentType || "text/plain; charset=utf-8");
          res.end(result.body);
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

        if (isStartProjectPaysera) {
          const { handlePublicStartProjectPayseraRedirect } = await import(
            "./server/public-start-project-paysera.mjs"
          );
          result = (await handlePublicStartProjectPayseraRedirect(body as Record<string, unknown>, env)) as typeof result;
          const httpStatus = typeof result.status === "number" ? result.status : result.ok ? 200 : 500;
          writeJson(res, httpStatus, result);
          return;
        }

        const { handleCreatePayseraPaymentLink } = await import("./server/paysera-payment-link.mjs");
        result = (await handleCreatePayseraPaymentLink(body as Record<string, unknown>, auth, env)) as typeof result;
        const httpStatus = typeof result.status === "number" ? result.status : result.ok ? 200 : 500;
        writeJson(res, httpStatus, result);
      });
    },
  };
}
