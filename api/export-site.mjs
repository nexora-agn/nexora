// Vercel serverless function mirror of `server/export-api.mjs`.
// Route: POST /api/export-site
// Produces a client-specific website ZIP using the same shared logic as the Node dev server.

import fs from "node:fs/promises";
import path from "node:path";

import {
  resolveEnv,
  authenticateRequest,
  verifyClientAccess,
  loadDraft,
  buildSiteZip,
} from "../server/export-logic.mjs";

// In the Vercel runtime the project root is the repo root, so the committed
// `template-source/` directory is available on disk.
const templateRootCandidates = [
  path.resolve(process.cwd(), "template-source"),
  path.resolve(process.cwd(), "tmp/construction-template"),
];

// Live admin template (src/template) — overlaid so the ZIP renders
// exactly like the admin preview on Vercel too.
const liveTemplateRootPath = path.resolve(process.cwd(), "src/template");

async function resolveTemplateRoot() {
  for (const p of templateRootCandidates) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `Template source not found on server. Commit the template-source/ directory so Vercel can bundle it.`,
  );
}

async function resolveLiveTemplateRoot() {
  try {
    await fs.access(liveTemplateRootPath);
    return liveTemplateRootPath;
  } catch {
    return null;
  }
}

// Allow preflight + JSON body on Vercel
export const config = {
  api: {
    bodyParser: { sizeLimit: "2mb" },
  },
  maxDuration: 60,
};

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let cleanup;
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const clientId = String(body.clientId || "").trim();
    if (!clientId) return res.status(400).json({ error: "Missing clientId" });

    const env = resolveEnv();
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({
        error: "Server Supabase env vars missing. Set VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.",
      });
    }

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
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${built.filename}"`);
    res.setHeader("Content-Length", String(data.length));
    res.status(200).send(data);
  } catch (error) {
    console.error("[export-site] Error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Export failed" });
  } finally {
    if (cleanup) cleanup();
  }
}
