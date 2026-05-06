/**
 * Loads `.env*` into `process.env` when keys are not already set (Hostinger / PM2
 * panel vars win). `npm start` does not use `node --env-file=…`, so secrets on disk
 * in `.env.production` would otherwise be ignored.
 */
import fs from "node:fs";
import path from "node:path";

/**
 * @param {string} projectRoot — absolute path to repo root (where dist/ and package.json live)
 */
export function loadProductionEnv(projectRoot) {
  const files = [
    ".env",
    ".env.local",
    ".env.production",
    ".env.production.local",
  ];
  /** @type {Record<string, string>} */
  const merged = {};
  for (const name of files) {
    const p = path.join(projectRoot, name);
    if (!fs.existsSync(p)) continue;
    let text;
    try {
      text = fs.readFileSync(p, "utf8");
    } catch {
      continue;
    }
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const m = t.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      merged[key] = val;
    }
  }
  for (const [key, val] of Object.entries(merged)) {
    if (process.env[key] === undefined && val !== "") process.env[key] = val;
  }
}
