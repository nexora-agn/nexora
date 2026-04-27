import type { Plugin } from "vite";
import { loadEnv } from "vite";

/**
 * Serves POST /api/send-form-emails in dev using the same handler as Vercel.
 */
export function formEmailApiPlugin(): Plugin {
  return {
    name: "form-email-api",
    configureServer(server) {
      const mode = server.config.mode;
      const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };

      server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith("/api/send-form-emails")) {
            return next();
          }
          if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.statusCode = 204;
            res.end();
            return;
          }
          if (req.method !== "POST") {
            return next();
          }

          const chunks: Buffer[] = [];
          for await (const ch of req) {
            chunks.push(ch as Buffer);
          }
          const raw = Buffer.concat(chunks).toString("utf8");
          let body: unknown;
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: "Invalid JSON" }));
            return;
          }

          const { handleSendFormEmails } = await import("./server/form-email-resend.mjs");
          const result = await handleSendFormEmails(body, env);
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.statusCode = result.ok ? 200 : 500;
          res.end(JSON.stringify(result));
        });
    },
  };
}
