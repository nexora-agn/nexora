// Shared export logic for both the local Node dev server (server/export-api.mjs)
// and the Vercel serverless function (api/export-site.mjs). Both environments use
// Node's filesystem API + `archiver` so the logic is portable.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createWriteStream } from "node:fs";
import archiver from "archiver";
import { createClient } from "@supabase/supabase-js";

const IGNORED_DIRS = new Set(["node_modules", ".git", "dist", ".vite", ".cursor", ".idea"]);
const IGNORED_FILES = new Set(["site-builder-export.json", "bun.lockb"]);

export function resolveEnv() {
  return {
    SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export async function authenticateRequest(authHeader, env) {
  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;
  if (!token) throw new Error("Missing Authorization bearer token");
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) throw new Error("Server Supabase not configured");

  const userSb = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await userSb.auth.getUser(token);
  if (error || !data.user) throw new Error(error?.message || "Invalid token");
  return { user: data.user, userSb };
}

export async function verifyClientAccess(userSb, clientId) {
  const { data, error } = await userSb
    .from("clients")
    .select("id, name")
    .eq("id", clientId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Client not found or access denied");
  return data;
}

export async function loadDraft(clientId, env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Server cannot access Supabase (service_role key missing)");
  }
  const adminSb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  const { data, error } = await adminSb
    .from("drafts")
    .select("*")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data || { theme: {}, content: {} };
}

async function copyFiltered(source, target) {
  await fs.cp(source, target, {
    recursive: true,
    filter: src => {
      const rel = path.relative(source, src);
      if (!rel) return true;
      const first = rel.split(path.sep)[0];
      if (IGNORED_DIRS.has(first)) return false;
      const base = path.basename(src);
      if (IGNORED_FILES.has(base)) return false;
      return true;
    },
  });
}

async function stripCustomizationPanel(tempProject) {
  const appPath = path.join(tempProject, "src/App.tsx");
  try {
    const appSource = await fs.readFile(appPath, "utf8");
    const updated = appSource
      .replace(/import\s+CustomizationPanel\s+from\s+"@\/components\/CustomizationPanel";\n/, "")
      .replace(/\s*<CustomizationPanel\s*\/>\s*\n/, "\n");
    await fs.writeFile(appPath, updated, "utf8");
  } catch (e) {
    console.warn("[export] Could not strip CustomizationPanel:", e.message);
  }
}

/**
 * Parse the value expression of an `export const NAME = <value>;` block out of
 * the template's siteData.ts source. We strip TypeScript-only `as const`
 * assertions and evaluate the resulting expression in an isolated Function so
 * we get the real default as a JS value. Returns `undefined` if the block
 * cannot be located / parsed (caller will fall back to the draft value).
 */
function readExistingExport(source, name) {
  const patterns = [
    new RegExp(`export const ${name} = (\\{[\\s\\S]*?\\n\\});`, "m"),
    new RegExp(`export const ${name}: [^=\\n]+= (\\{[\\s\\S]*?\\n\\});`, "m"),
    new RegExp(`export const ${name} = (\\[[\\s\\S]*?\\]);`, "m"),
    new RegExp(`export const ${name}: [^=\\n]+= (\\[[\\s\\S]*?\\]);`, "m"),
    new RegExp(`export const ${name} =\\s*\\n?\\s*("[^"]*");`, "m"),
  ];
  for (const re of patterns) {
    const m = re.exec(source);
    if (!m) continue;
    const body = m[1]
      .replace(/\s+as\s+const\b/g, "") // drop TS `as const`
      .replace(/([,{]\s*)(\w+)\s*:/g, '$1"$2":') // quote unquoted keys
      .replace(/,(\s*[\]}])/g, "$1"); // strip trailing commas
    try {
      // eslint-disable-next-line no-new-func
      return new Function(`return (${body});`)();
    } catch (err) {
      console.warn(`[export] Could not parse existing ${name}:`, err.message);
      return undefined;
    }
  }
  return undefined;
}

/**
 * Deep-merge `patch` over `base`. Arrays from the patch fully replace arrays
 * from the base (so the sales team can reorder / delete items without the
 * original defaults reappearing). Plain objects are merged key-by-key.
 */
function deepMerge(base, patch) {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(patch)) return patch; // arrays replace wholesale
  if (typeof patch !== "object") return patch;
  if (base === undefined || base === null || typeof base !== "object" || Array.isArray(base)) {
    // Nothing to merge against; just return patch.
    return patch;
  }
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    out[k] = deepMerge(base[k], v);
  }
  return out;
}

/**
 * Replace top-level `export const NAME = { ... };` (or `= [ ... ];`, or `= "...";`)
 * blocks in the template's siteData.ts with values from the customized draft.
 * Values are deep-merged with the existing defaults so partial drafts never
 * wipe required fields. Any section the draft doesn't override is left
 * untouched.
 */
async function patchSiteDataTs(tempProject, content) {
  const siteDataPath = path.join(tempProject, "src/data/siteData.ts");
  let source;
  try {
    source = await fs.readFile(siteDataPath, "utf8");
  } catch (e) {
    console.warn("[export] Could not read siteData.ts:", e.message);
    return;
  }

  const mapping = {
    COMPANY: content.company,
    SITE_TOP: content.siteTop,
    OFFICE_HOURS: content.officeHours,
    MAP_EMBED_URL: content.mapEmbedUrl,
    HOME_HERO: content.homeHero,
    SERVICES_RIBBON: content.servicesRibbon,
    CAPABILITIES: content.capabilities,
    PROCESS_STEPS: content.processSteps,
    HOME_STATS: content.homeStats,
    WHY_BENEFITS: content.whyBenefits,
    SERVICES: content.services,
    PROJECTS: content.projects,
    TEAM: content.team,
    TESTIMONIALS: content.testimonials,
    STATS: content.stats,
    FAQ_ITEMS: content.faqItems,
    NAV_LINKS: content.navLinks,
    FOOTER_SERVICE_LINKS: content.footerServiceLinks,
    FOOTER_COMPANY_LINKS: content.footerCompanyLinks,
    PROJECTS_PAGE_STATS: content.projectsPageStats,
    ABOUT_STATS: content.aboutStats,
    CORE_VALUES: content.coreValues,
    CERTIFICATIONS: content.certifications,
    SERVICES_PAGE_INTRO: content.servicesPageIntro,
    COMMERCIAL_FITOUT_CARDS: content.commercialFitoutCards,
    LEAD_FORM: content.leadForm,
    BLOG_TAGS: content.blogTags,
  };

  let patched = source;
  let patchedCount = 0;
  for (const [name, draftValue] of Object.entries(mapping)) {
    if (draftValue === undefined || draftValue === null) continue;

    const existing = readExistingExport(patched, name);
    const merged = deepMerge(existing, draftValue);
    const literal = JSON.stringify(merged, null, 2);

    const patterns = [
      new RegExp(`export const ${name} = \\{[\\s\\S]*?\\n\\};`, "m"),
      new RegExp(`export const ${name}: [^=\\n]+= \\{[\\s\\S]*?\\n\\};`, "m"),
      new RegExp(`export const ${name} = \\[[\\s\\S]*?\\];`, "m"),
      new RegExp(`export const ${name}: [^=\\n]+= \\[[\\s\\S]*?\\];`, "m"),
      new RegExp(`export const ${name} =\\s*\\n?\\s*"[^"]*";`, "m"),
    ];

    let replaced = false;
    for (const re of patterns) {
      if (re.test(patched)) {
        patched = patched.replace(re, `export const ${name} = ${literal};`);
        replaced = true;
        patchedCount += 1;
        break;
      }
    }
    if (!replaced) {
      console.warn(`[export] Could not patch ${name} in siteData.ts (pattern not found)`);
    }
  }

  console.log(`[export] Patched ${patchedCount} constant(s) in siteData.ts`);
  await fs.writeFile(siteDataPath, patched, "utf8");
}

async function patchTemplateContexts(tempProject) {
  const sitePath = path.join(tempProject, "src/contexts/SiteContentContext.tsx");
  const themePath = path.join(tempProject, "src/contexts/ThemeContext.tsx");

  try {
    let siteSrc = await fs.readFile(sitePath, "utf8");
    siteSrc = siteSrc
      .replace(
        /EXPORT_MARKER_KEY\s*=\s*"constructco-export-applied-at"/,
        'EXPORT_MARKER_KEY = "constructco-site-export-applied-at"',
      )
      .replace(
        /if\s*\(\s*generatedAt\s*&&\s*alreadyApplied\s*===\s*generatedAt\s*\)\s*return;?/,
        "// applied guard removed during export so every page load re-hydrates the content",
      );
    await fs.writeFile(sitePath, siteSrc, "utf8");
  } catch (e) {
    console.warn("[export] Could not patch SiteContentContext:", e.message);
  }

  try {
    let themeSrc = await fs.readFile(themePath, "utf8");
    themeSrc = themeSrc
      .replace(
        /EXPORT_MARKER_KEY\s*=\s*"constructco-export-applied-at"/,
        'EXPORT_MARKER_KEY = "constructco-theme-export-applied-at"',
      )
      .replace(
        /if\s*\(\s*generatedAt\s*&&\s*alreadyApplied\s*===\s*generatedAt\s*\)\s*return;?/,
        "// applied guard removed during export so every page load re-hydrates the theme",
      );
    await fs.writeFile(themePath, themeSrc, "utf8");
  } catch (e) {
    console.warn("[export] Could not patch ThemeContext:", e.message);
  }
}

function zipDirectory(directory, outputFile) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputFile);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => resolve(undefined));
    output.on("error", reject);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(directory, false);
    archive.finalize();
  });
}

export function sanitizeFilename(name) {
  return String(name || "website")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "website";
}

/**
 * Build a customised site ZIP for a given client draft.
 *
 * @param {object} opts
 * @param {string} opts.templateRoot - absolute path to the construction-template source
 * @param {string} opts.clientId
 * @param {string} opts.clientName
 * @param {object} opts.draft - { theme, content }
 * @returns {Promise<{ zipPath: string, cleanup: () => Promise<void>, filename: string, exportPayload: object }>}
 */
export async function buildSiteZip({ templateRoot, clientId, clientName, draft }) {
  await fs.access(templateRoot); // will throw if missing

  const exportPayload = {
    generatedAt: new Date().toISOString(),
    clientId,
    clientName,
    theme: draft.theme || {},
    content: draft.content || {},
  };

  const tempBase = await fs.mkdtemp(path.join(os.tmpdir(), "webready-export-"));
  const tempProject = path.join(tempBase, "site");
  const outputZip = path.join(tempBase, "website.zip");

  await copyFiltered(templateRoot, tempProject);
  await fs.mkdir(path.join(tempProject, "public"), { recursive: true });
  await fs.writeFile(
    path.join(tempProject, "public/site-builder-export.json"),
    JSON.stringify(exportPayload, null, 2),
    "utf8",
  );

  await stripCustomizationPanel(tempProject);
  await patchTemplateContexts(tempProject);
  // Bake customized copy (COMPANY, HOME_HERO, CAPABILITIES, etc.) directly into
  // the template's src/data/siteData.ts so components that import those
  // constants render the client's values without needing runtime context wiring.
  await patchSiteDataTs(tempProject, draft.content || {});

  await fs.writeFile(
    path.join(tempProject, "EXPORT_README.md"),
    [
      `# ${clientName} — website export`,
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

  return {
    zipPath: outputZip,
    filename: `${sanitizeFilename(clientName)}-website.zip`,
    exportPayload,
    cleanup: () => fs.rm(tempBase, { recursive: true, force: true }).catch(() => undefined),
  };
}
