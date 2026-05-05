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
  resolveTemplatePaths,
} from "./export-logic.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

/**
 * Resolve the scaffold (template-source*) directory for the given client
 * template id. Falls back to a legacy tmp/ clone path so devs with older
 * checkouts keep working when the registered scaffold is missing.
 */
async function resolveTemplateRootFor(templateId) {
  const { scaffoldDir } = resolveTemplatePaths(templateId);
  const candidates = [
    path.resolve(projectRoot, scaffoldDir),
    path.resolve(projectRoot, "tmp/construction-template"),
  ];
  for (const p of candidates) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `Template source not found for template "${templateId}". Expected one of: ${candidates.join(", ")}`,
  );
}

async function resolveLiveTemplateRootFor(templateId) {
  const { liveTemplateDir } = resolveTemplatePaths(templateId);
  const p = path.resolve(projectRoot, liveTemplateDir);
  try {
    await fs.access(p);
    return p;
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
      const templateRoot = await resolveTemplateRootFor(client.template_id);
      const liveTemplateRoot = await resolveLiveTemplateRootFor(client.template_id);

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
