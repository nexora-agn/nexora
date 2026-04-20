// Local Node.js dev server for the ZIP export.
// In production the same logic runs via `api/export-site.mjs` (Vercel serverless).
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  resolveEnv,
  authenticateRequest,
  verifyClientAccess,
  loadDraft,
  buildSiteZip,
} from "./export-logic.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
// Prefer the committed template-source (ships with git) but fall back to tmp/ for
// devs who still have the old clone path.
const TEMPLATE_CANDIDATES = [
  path.resolve(projectRoot, "template-source"),
  path.resolve(projectRoot, "tmp/construction-template"),
];

// Live admin template (src/template) — overlaid on top of template-source so
// the ZIP renders exactly like the admin preview.
const LIVE_TEMPLATE_ROOT = path.resolve(projectRoot, "src/template");

async function resolveTemplateRoot() {
  for (const p of TEMPLATE_CANDIDATES) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `Template source not found. Expected one of: ${TEMPLATE_CANDIDATES.join(", ")}`,
  );
}

async function resolveLiveTemplateRoot() {
  try {
    await fs.access(LIVE_TEMPLATE_ROOT);
    return LIVE_TEMPLATE_ROOT;
  } catch {
    return null;
  }
}

const port = Number(process.env.SITE_API_PORT || 8787);
const allowOrigin = process.env.SITE_ALLOWED_ORIGIN || "http://localhost:8080";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendJson(res, code, payload) {
  res.writeHead(code, { "Content-Type": "application/json", ...corsHeaders });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON payload"));
      }
    });
    req.on("error", reject);
  });
}

const env = resolveEnv();
if (!env.SUPABASE_URL) console.error("[export-api] VITE_SUPABASE_URL is not set. Check .env.local.");
if (!env.SUPABASE_SERVICE_ROLE_KEY)
  console.error("[export-api] SUPABASE_SERVICE_ROLE_KEY is not set. Check .env.local.");

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.url === "/api/export-site" && req.method === "POST") {
    let cleanup;
    try {
      const body = await parseBody(req);
      const clientId = String(body.clientId || "").trim();
      if (!clientId) return sendJson(res, 400, { error: "Missing clientId" });

      const { userSb } = await authenticateRequest(req.headers.authorization, env);
      const client = await verifyClientAccess(userSb, clientId);
      const draft = await loadDraft(clientId, env);
      const templateRoot = await resolveTemplateRoot();
      const liveTemplateRoot = await resolveLiveTemplateRoot();

      const built = await buildSiteZip({
        templateRoot,
        liveTemplateRoot,
        clientId,
        clientName: client.name,
        draft,
      });
      cleanup = built.cleanup;

      const data = await fs.readFile(built.zipPath);
      res.writeHead(200, {
        ...corsHeaders,
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${built.filename}"`,
        "Content-Length": data.length,
      });
      res.end(data);
    } catch (error) {
      console.error("[export-api] Error:", error);
      sendJson(res, 500, { error: error instanceof Error ? error.message : "Export failed" });
    } finally {
      if (cleanup) cleanup();
    }
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.on("error", err => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `[export-api] Port ${port} is already in use. Stop the other process (e.g. \`lsof -i :${port}\`) or set SITE_API_PORT in .env.local.`,
    );
    process.exit(1);
  }
  throw err;
});

server.listen(port, () => {
  console.log(`[export-api] running on http://localhost:${port} (origin: ${allowOrigin})`);
});
