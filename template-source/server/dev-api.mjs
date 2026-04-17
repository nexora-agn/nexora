import http from "node:http";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const port = Number(process.env.SITE_API_PORT || 8787);
const allowOrigin = process.env.SITE_ALLOWED_ORIGIN || "http://localhost:8080";

const flowiseApiUrl = process.env.FLOWISE_API_URL;
const flowiseApiKey = process.env.FLOWISE_API_KEY;

const ignoredDirs = new Set(["node_modules", ".git", "dist", ".vite", ".cursor", ".idea"]);
const ignoredFiles = new Set(["site-builder-export.json"]);

const corsHeaders = {
  "Access-Control-Allow-Origin": allowOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.url === "/api/export-site" && req.method === "POST") {
    try {
      const payload = await parseBody(req);
      const exportPayload = {
        generatedAt: new Date().toISOString(),
        theme: payload.theme || {},
        content: payload.content || {},
      };

      const tempBase = await fs.mkdtemp(path.join(os.tmpdir(), "constructco-export-"));
      const tempProject = path.join(tempBase, "site");
      const outputZip = path.join(tempBase, "website.zip");

      await copyProject(projectRoot, tempProject);
      await fs.mkdir(path.join(tempProject, "public"), { recursive: true });
      await fs.writeFile(
        path.join(tempProject, "public/site-builder-export.json"),
        JSON.stringify(exportPayload, null, 2),
        "utf8",
      );
      const appPath = path.join(tempProject, "src/App.tsx");
      const appSource = await fs.readFile(appPath, "utf8");
      const appWithoutEditor = appSource
        .replace('import CustomizationPanel from "@/components/CustomizationPanel";\n', "")
        .replace("      <CustomizationPanel />\n", "");
      await fs.writeFile(appPath, appWithoutEditor, "utf8");
      await fs.writeFile(
        path.join(tempProject, "EXPORT_README.md"),
        [
          "# Website Export",
          "",
          "This package includes your latest content and branding.",
          "The file `public/site-builder-export.json` is loaded automatically on first run when local storage is empty.",
          "The editor sidebar is removed in this export for client-ready delivery.",
          "",
          "## Run",
          "```bash",
          "npm install",
          "npm run dev",
          "```",
        ].join("\n"),
        "utf8",
      );

      await zipDirectory(tempProject, outputZip);
      const data = await fs.readFile(outputZip);

      res.writeHead(200, {
        ...corsHeaders,
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=\"constructo-website-export.zip\"",
        "Content-Length": data.length,
      });
      res.end(data);
    } catch (error) {
      sendJson(res, 500, { error: error instanceof Error ? error.message : "Export failed" });
    }
    return;
  }

  if (req.url === "/api/chat" && req.method === "POST") {
    if (!flowiseApiUrl) {
      sendJson(res, 501, { error: "FLOWISE_API_URL not configured. Use local chat mode." });
      return;
    }
    try {
      const body = await parseBody(req);
      const message = String(body.message || "").trim();
      const history = Array.isArray(body.history) ? body.history : [];
      const headers = { "Content-Type": "application/json" };
      if (flowiseApiKey) headers.Authorization = `Bearer ${flowiseApiKey}`;
      const flowiseRes = await fetch(flowiseApiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ question: message, history }),
      });
      const data = await flowiseRes.json();
      const reply = typeof data === "string" ? data : data.text || data.answer || "";
      sendJson(res, 200, { reply });
    } catch (error) {
      sendJson(res, 500, { error: error instanceof Error ? error.message : "Chat request failed" });
    }
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(port, () => {
  console.log(`Site API running on http://localhost:${port}`);
});

