import http from "node:http";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const templateRoot = path.resolve(__dirname, "../tmp/construction-template");

const port = Number(process.env.SITE_API_PORT || 8787);
const allowOrigin = process.env.SITE_ALLOWED_ORIGIN || "http://localhost:8080";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  console.error("[export-api] VITE_SUPABASE_URL is not set. Check .env.local.");
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("[export-api] SUPABASE_SERVICE_ROLE_KEY is not set. Check .env.local.");
}

// admin client, used to read the draft with service_role (bypasses RLS)
const adminSb = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

const ignoredDirs = new Set(["node_modules", ".git", "dist", ".vite", ".cursor", ".idea"]);
const ignoredFiles = new Set(["site-builder-export.json", "bun.lockb"]);

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

async function copyProject(source, target) {
  await fs.cp(source, target, {
    recursive: true,
    filter: src => {
      const rel = path.relative(source, src);
      if (!rel) return true;
      const first = rel.split(path.sep)[0];
      if (ignoredDirs.has(first)) return false;
      const base = path.basename(src);
      if (ignoredFiles.has(base)) return false;
      return true;
    },
  });
}

function zipDirectory(directory, outputFile) {
  return new Promise((resolve, reject) => {
    const proc = spawn("zip", ["-qr", outputFile, "."], { cwd: directory });
    proc.on("error", reject);
    proc.on("close", code => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`zip failed with exit ${code}`));
    });
  });
}

async function authenticateUser(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;
  if (!token) throw new Error("Missing Authorization bearer token");
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Server Supabase not configured");
  const userSb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await userSb.auth.getUser(token);
  if (error || !data.user) throw new Error(error?.message || "Invalid token");
  return { user: data.user, userSb };
}

async function verifyClientAccess(userSb, clientId) {
  const { data, error } = await userSb
    .from("clients")
    .select("id, name")
    .eq("id", clientId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Client not found or access denied");
  return data;
}

async function loadDraft(clientId) {
  if (!adminSb) throw new Error("Server cannot access Supabase (service_role key missing)");
  const { data, error } = await adminSb
    .from("drafts")
    .select("*")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data || { theme: {}, content: {} };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.url === "/api/export-site" && req.method === "POST") {
    try {
      const body = await parseBody(req);
      const clientId = String(body.clientId || "").trim();
      if (!clientId) {
        sendJson(res, 400, { error: "Missing clientId" });
        return;
      }

      const { userSb } = await authenticateUser(req);
      const client = await verifyClientAccess(userSb, clientId);
      const draft = await loadDraft(clientId);

      // Use the cloned template as the source of truth for the exported ZIP
      try {
        await fs.access(templateRoot);
      } catch {
        throw new Error(
          `Template repo not found at ${templateRoot}. Run: git clone https://github.com/andisbajrami/construction-template tmp/construction-template`,
        );
      }

      const exportPayload = {
        generatedAt: new Date().toISOString(),
        clientId,
        clientName: client.name,
        theme: draft.theme || {},
        content: draft.content || {},
      };

      const tempBase = await fs.mkdtemp(path.join(os.tmpdir(), "webready-export-"));
      const tempProject = path.join(tempBase, "site");
      const outputZip = path.join(tempBase, "website.zip");

      await copyProject(templateRoot, tempProject);
      await fs.mkdir(path.join(tempProject, "public"), { recursive: true });
      await fs.writeFile(
        path.join(tempProject, "public/site-builder-export.json"),
        JSON.stringify(exportPayload, null, 2),
        "utf8",
      );

      // Strip the CustomizationPanel from the template's App.tsx so the exported
      // site ships without the editor sidebar.
      const appPath = path.join(tempProject, "src/App.tsx");
      try {
        const appSource = await fs.readFile(appPath, "utf8");
        const appWithoutEditor = appSource
          .replace(/import\s+CustomizationPanel\s+from\s+"@\/components\/CustomizationPanel";\n/, "")
          .replace(/\s*<CustomizationPanel\s*\/>\s*\n/, "\n");
        await fs.writeFile(appPath, appWithoutEditor, "utf8");
      } catch (e) {
        console.warn("[export-api] Could not strip CustomizationPanel:", e.message);
      }

      await fs.writeFile(
        path.join(tempProject, "EXPORT_README.md"),
        [
          `# ${client.name} — website export`,
          "",
          `Generated: ${exportPayload.generatedAt}`,
          "",
          "This ZIP contains the construction website customized for this client.",
          "`public/site-builder-export.json` is loaded automatically on first run.",
          "The editor sidebar has been removed for client delivery.",
          "",
          "## Run locally",
          "```bash",
          "npm install",
          "npm run dev",
          "```",
          "",
          "## Deploy",
          "Build with `npm run build` and upload the `dist/` folder to any static host",
          "(Hostinger, Netlify, Vercel, Cloudflare Pages, etc.).",
        ].join("\n"),
        "utf8",
      );

      await zipDirectory(tempProject, outputZip);
      const data = await fs.readFile(outputZip);

      res.writeHead(200, {
        ...corsHeaders,
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${sanitizeFilename(client.name)}-website.zip"`,
        "Content-Length": data.length,
      });
      res.end(data);

      // best-effort cleanup
      fs.rm(tempBase, { recursive: true, force: true }).catch(() => undefined);
    } catch (error) {
      console.error("[export-api] Error:", error);
      sendJson(res, 500, { error: error instanceof Error ? error.message : "Export failed" });
    }
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

function sanitizeFilename(name) {
  return String(name || "website")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "website";
}

server.listen(port, () => {
  console.log(`[export-api] running on http://localhost:${port} (origin: ${allowOrigin})`);
});
