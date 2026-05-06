/**
 * Production server for Hostinger Node.js hosting.
 * Serves the Vite build from dist/ and handles API routes in one process.
 *
 * Start command: node server/hostinger.mjs
 * Build command: npm run build
 */
import http from "node:http";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { handleSendFormEmails } from "./form-email-resend.mjs";
import {
  resolveEnv,
  authenticateRequest,
  verifyClientAccess,
  loadDraft,
  buildSiteZip,
  resolveTemplatePaths,
} from "./export-logic.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const PORT = Number(process.env.PORT || 8080);

// ---------------------------------------------------------------------------
// MIME types
// ---------------------------------------------------------------------------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME[ext] || "application/octet-stream";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sendJson(res, code, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => { raw += chunk; });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { reject(new Error("Invalid JSON payload")); }
    });
    req.on("error", reject);
  });
}

// ---------------------------------------------------------------------------
// Template root resolution (mirrors export-api.mjs)
// ---------------------------------------------------------------------------
async function resolveTemplateRootFor(templateId) {
  const { scaffoldDir } = resolveTemplatePaths(templateId);
  const candidates = [
    path.resolve(projectRoot, scaffoldDir),
    path.resolve(projectRoot, "tmp/construction-template"),
  ];
  for (const p of candidates) {
    try { await fs.access(p); return p; } catch { /* try next */ }
  }
  throw new Error(`Template source not found for template "${templateId}". Expected: ${candidates.join(", ")}`);
}

async function resolveLiveTemplateRootFor(templateId) {
  const { liveTemplateDir } = resolveTemplatePaths(templateId);
  const p = path.resolve(projectRoot, liveTemplateDir);
  try { await fs.access(p); return p; } catch { return null; }
}

// ---------------------------------------------------------------------------
// Static file handler
// ---------------------------------------------------------------------------
async function serveStatic(res, urlPath) {
  // Strip query string
  const clean = urlPath.split("?")[0];
  let filePath = path.join(distDir, clean);

  // Security: prevent path traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath, "index.html");
    const data = await fs.readFile(filePath);
    const mime = getMime(filePath);
    // Long cache for hashed assets, short for HTML
    const isHtml = mime.startsWith("text/html");
    res.writeHead(200, {
      "Content-Type": mime,
      "Content-Length": data.length,
      "Cache-Control": isHtml ? "no-cache" : "public, max-age=31536000, immutable",
    });
    res.end(data);
  } catch {
    // SPA fallback — serve index.html for any unknown path
    try {
      const index = await fs.readFile(path.join(distDir, "index.html"));
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      });
      res.end(index);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

// ---------------------------------------------------------------------------
// Verify dist/ exists
// ---------------------------------------------------------------------------
if (!fsSync.existsSync(distDir)) {
  console.error(`[hostinger] dist/ not found at ${distDir}. Run "npm run build" first.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Env check
// ---------------------------------------------------------------------------
const env = resolveEnv();
if (!env.SUPABASE_URL) console.warn("[hostinger] VITE_SUPABASE_URL is not set.");
if (!env.SUPABASE_SERVICE_ROLE_KEY) console.warn("[hostinger] SUPABASE_SERVICE_ROLE_KEY is not set.");
if (!process.env.RESEND_API_KEY) console.warn("[hostinger] RESEND_API_KEY is not set — form emails will fail.");

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = req.url || "/";
  const method = req.method || "GET";

  // CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  // ── POST /api/send-form-emails ──────────────────────────────────────────
  if (url === "/api/send-form-emails" && method === "POST") {
    try {
      const body = await parseBody(req);
      const result = await handleSendFormEmails(body, process.env);
      return sendJson(res, result.ok ? 200 : 500, result);
    } catch (err) {
      console.error("[hostinger] send-form-emails error:", err);
      return sendJson(res, 500, { ok: false, error: err instanceof Error ? err.message : "Failed" });
    }
  }

  // ── POST /api/export-site ───────────────────────────────────────────────
  if (url === "/api/export-site" && method === "POST") {
    let cleanup;
    try {
      const body = await parseBody(req);
      const clientId = String(body.clientId || "").trim();
      if (!clientId) return sendJson(res, 400, { error: "Missing clientId" });

      const { userSb } = await authenticateRequest(req.headers.authorization, env);
      const client = await verifyClientAccess(userSb, clientId);
      const draft = await loadDraft(clientId, env);
      const templateRoot = await resolveTemplateRootFor(client.template_id);
      const liveTemplateRoot = await resolveLiveTemplateRootFor(client.template_id);

      const built = await buildSiteZip({ templateRoot, liveTemplateRoot, clientId, clientName: client.name, draft });
      cleanup = built.cleanup;

      const data = await fs.readFile(built.zipPath);
      res.writeHead(200, {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${built.filename}"`,
        "Content-Length": data.length,
      });
      res.end(data);
    } catch (err) {
      console.error("[hostinger] export-site error:", err);
      sendJson(res, 500, { error: err instanceof Error ? err.message : "Export failed" });
    } finally {
      if (cleanup) cleanup();
    }
    return;
  }

  // ── Static files / SPA fallback ─────────────────────────────────────────
  await serveStatic(res, url);
});

server.on("error", err => {
  if (err.code === "EADDRINUSE") {
    console.error(`[hostinger] Port ${PORT} already in use.`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`[hostinger] Server running on port ${PORT}`);
});
