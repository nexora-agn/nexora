// Shared export logic for both the local Node dev server (server/export-api.mjs)
// and the Vercel serverless function (api/export-site.mjs). Both environments use
// Node's filesystem API + `archiver` so the logic is portable.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { Buffer } from "node:buffer";
import { createWriteStream } from "node:fs";
import archiver from "archiver";
import { createClient } from "@supabase/supabase-js";

const IGNORED_DIRS = new Set(["node_modules", ".git", "dist", ".vite", ".cursor", ".idea"]);
const IGNORED_FILES = new Set(["site-builder-export.json", "bun.lockb"]);

// Files we never want to overlay from src/template (admin-only scaffolding).
const LIVE_TEMPLATE_SKIP_FILES = new Set([
  "PreviewApp.tsx",
  "main.tsx",
  "_tailwind-reference.ts",
  "template.css",
  "template-app.css",
  // The settings gear button should never ship with the client ZIP.
  "CustomizationPanel.tsx",
]);

// Directories relative to src/template that we overlay into the exported site.
// These are the only places that diverge between admin preview and ZIP output.
const LIVE_TEMPLATE_OVERLAY_DIRS = ["components", "contexts", "data", "pages", "lib"];

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
    .select("id, name, template_id")
    .eq("id", clientId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Client not found or access denied");
  return data;
}

/**
 * Server-side mirror of `src/lib/templates.ts`. Keeping a small registry here
 * avoids cross-importing TS into the .mjs export endpoints. New templates need
 * to be added in BOTH places (TS for the admin UI + this list for the export
 * server). `paths.scaffoldDir` and `paths.liveTemplateDir` MUST match the
 * directories committed at the repo root.
 */
export const TEMPLATE_REGISTRY = [
  {
    id: "constructo",
    paths: { scaffoldDir: "template-source", liveTemplateDir: "src/template" },
  },
  {
    id: "summit",
    paths: { scaffoldDir: "template-source-summit", liveTemplateDir: "src/template-summit" },
  },
];

/**
 * Maps legacy / pre-registry `template_id` values onto the canonical registry
 * ids. The DB schema's historical default was `summit-construction`, which
 * matches NEITHER current id and would otherwise resolve to Constructo via
 * the fallback below. Keep this aligned with `getTemplate` in the TS registry.
 */
const LEGACY_TEMPLATE_ALIASES = {
  "summit-construction": "summit",
  "summit construction": "summit",
  "summit_construction": "summit",
  "constructo-classic": "constructo",
  "construction": "constructo",
};

function canonicalTemplateId(rawId) {
  if (!rawId) return null;
  const normalized = String(rawId).trim().toLowerCase();
  if (TEMPLATE_REGISTRY.some(t => t.id === normalized)) return normalized;
  return LEGACY_TEMPLATE_ALIASES[normalized] || null;
}

/**
 * Pick scaffold + live template directory names for the given client template
 * id. Unknown / legacy ids fall back to the first registered template (which
 * is the historical default — matches `getTemplate` in the TS registry).
 */
export function resolveTemplatePaths(templateId) {
  const canonical = canonicalTemplateId(templateId);
  const match = canonical
    ? TEMPLATE_REGISTRY.find(t => t.id === canonical)
    : null;
  if (!match) {
    console.warn(
      `[export] Unknown template_id "${templateId}", falling back to "${TEMPLATE_REGISTRY[0].id}".`,
    );
  } else {
    console.log(`[export] Resolved template_id "${templateId}" → "${match.id}"`);
  }
  return (match || TEMPLATE_REGISTRY[0]).paths;
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
      .replace(/import\s+CustomizationPanel\s+from\s+"@\/components\/CustomizationPanel";\s*\n/g, "")
      .replace(/\s*<CustomizationPanel\s*\/>\s*\n?/g, "\n");
    await fs.writeFile(appPath, updated, "utf8");
  } catch (e) {
    console.warn("[export] Could not strip CustomizationPanel:", e.message);
  }

  // Also delete the file itself so the settings panel code never ships.
  const panelPath = path.join(tempProject, "src/components/CustomizationPanel.tsx");
  try {
    await fs.rm(panelPath, { force: true });
  } catch (e) {
    console.warn("[export] Could not remove CustomizationPanel.tsx:", e.message);
  }
}

/**
 * Walk `dir` recursively, yielding every file path (absolute).
 */
async function* walkFiles(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      yield* walkFiles(full);
    } else if (entry.isFile()) {
      if (IGNORED_FILES.has(entry.name)) continue;
      yield full;
    }
  }
}

/**
 * Replace `@template/...` imports with `@/...` so the file works inside the
 * exported standalone project (where only `@ -> src` is aliased).
 */
function rewriteTemplateImports(source) {
  return source
    .replace(/(["'])@template\//g, "$1@/")
    .replace(/(["'])@template(["'])/g, "$1@$2");
}

/**
 * Overlay the live admin template (src/template) on top of the scaffold copy
 * that was just dropped into tempProject. This is how all customizable
 * components (hero, capabilities, testimonials, company info, etc.) flow
 * from the preview into the downloaded ZIP.
 *
 * Only `components/contexts/data/pages/lib` get overlaid; everything else
 * (package.json, vite.config.ts, index.html, App.tsx, main.tsx, ui
 * primitives, hooks, etc.) stays as shipped in template-source.
 */
async function overlayLiveTemplate(tempProject, liveTemplateRoot) {
  if (!liveTemplateRoot) return { overlaid: 0 };
  try {
    await fs.access(liveTemplateRoot);
  } catch {
    console.warn(`[export] liveTemplateRoot missing, skipping overlay: ${liveTemplateRoot}`);
    return { overlaid: 0 };
  }

  let overlaid = 0;
  for (const subdir of LIVE_TEMPLATE_OVERLAY_DIRS) {
    const sourceDir = path.join(liveTemplateRoot, subdir);
    const targetDir = path.join(tempProject, "src", subdir);
    for await (const srcFile of walkFiles(sourceDir)) {
      const rel = path.relative(sourceDir, srcFile);
      const base = path.basename(srcFile);
      if (LIVE_TEMPLATE_SKIP_FILES.has(base)) continue;

      const destFile = path.join(targetDir, rel);
      await fs.mkdir(path.dirname(destFile), { recursive: true });

      // Code files get their `@template/` imports rewritten; everything else
      // (css, svg, etc.) is copied byte-for-byte.
      if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(base)) {
        const source = await fs.readFile(srcFile, "utf8");
        await fs.writeFile(destFile, rewriteTemplateImports(source), "utf8");
      } else {
        await fs.copyFile(srcFile, destFile);
      }
      overlaid += 1;
    }
  }
  console.log(`[export] Overlaid ${overlaid} live template file(s) from src/template`);
  return { overlaid };
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
    SERVICE_AREAS: content.serviceAreas,
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

/* --------------------------------------------------------------------------
 * Asset download + theme baking (so `npm run build` ships a fully branded dist)
 * ------------------------------------------------------------------------ */

const MIME_TO_EXT = {
  "image/svg+xml": "svg",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
  "image/gif": "gif",
};

const EXT_TO_MIME = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
  gif: "image/gif",
};

function extFromUrl(url, fallback = "png") {
  try {
    const u = new URL(url);
    const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(u.pathname);
    if (m) return m[1].toLowerCase();
  } catch {
    const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url);
    if (m) return m[1].toLowerCase();
  }
  return fallback;
}

async function downloadAsset(url) {
  if (!url) return null;

  if (url.startsWith("data:")) {
    const header = url.slice(5, url.indexOf(","));
    const body = url.slice(url.indexOf(",") + 1);
    const mime = header.split(";")[0] || "image/png";
    const isBase64 = /;base64/i.test(header);
    const buffer = isBase64
      ? Buffer.from(body, "base64")
      : Buffer.from(decodeURIComponent(body), "utf8");
    return { buffer, ext: MIME_TO_EXT[mime] || "png", mime };
  }

  if (url.startsWith("/")) return null; // already local

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[export] Asset fetch ${res.status} for ${url}`);
      return null;
    }
    const ab = await res.arrayBuffer();
    const ct = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    const ext = MIME_TO_EXT[ct] || extFromUrl(url, "png");
    return { buffer: Buffer.from(ab), ext, mime: ct || EXT_TO_MIME[ext] || "application/octet-stream" };
  } catch (e) {
    console.warn("[export] Failed to download asset:", url, e.message);
    return null;
  }
}

/**
 * Download logo + favicon into public/ and rewrite their URLs to local paths.
 * Returns a NEW theme object with updated URLs — the original is not mutated.
 */
async function downloadClientAssets(tempProject, theme) {
  const publicDir = path.join(tempProject, "public");
  await fs.mkdir(publicDir, { recursive: true });
  const updated = { ...theme };

  if (theme.logoUrl) {
    const asset = await downloadAsset(theme.logoUrl);
    if (asset) {
      const filename = `client-logo.${asset.ext}`;
      await fs.writeFile(path.join(publicDir, filename), asset.buffer);
      updated.logoUrl = `/${filename}`;
      console.log(`[export] Saved logo -> public/${filename}`);
    }
  }

  if (theme.faviconUrl) {
    const asset = await downloadAsset(theme.faviconUrl);
    if (asset) {
      const filename = `favicon.${asset.ext}`;
      await fs.writeFile(path.join(publicDir, filename), asset.buffer);
      updated.faviconUrl = `/${filename}`;
      console.log(`[export] Saved favicon -> public/${filename}`);
    }
  }

  return updated;
}

function hexToHSL(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function relativeLuminanceFromHex(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function secondaryForegroundHex(secondaryHex, primaryHex) {
  return relativeLuminanceFromHex(secondaryHex) > 0.45 ? primaryHex : "#ffffff";
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function faviconMimeFor(href) {
  const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(href || "");
  const ext = m ? m[1].toLowerCase() : "svg";
  return EXT_TO_MIME[ext] || "image/svg+xml";
}

/**
 * Rewrite index.html so the static shell (before JS boots) already carries the
 * client's title, favicon, OG tags, and first-paint colors via inline CSS vars.
 */
async function patchIndexHtml(tempProject, { clientName, theme, company }) {
  const indexPath = path.join(tempProject, "index.html");
  let html;
  try {
    html = await fs.readFile(indexPath, "utf8");
  } catch (e) {
    console.warn("[export] Could not read index.html:", e.message);
    return;
  }

  const displayName = company?.name || clientName || "Website";
  const tagline = (company?.tagline || "").split(".")[0].trim();
  const title = escapeHtml(tagline ? `${displayName} — ${tagline}` : displayName);
  const description = escapeHtml(company?.tagline || `Official website for ${displayName}.`);

  const faviconHref = theme.faviconUrl || "/favicon.svg";
  const faviconType = faviconMimeFor(faviconHref);

  const primary = theme.primaryColor || "#0a1628";
  const secondary = theme.secondaryColor || "#e4b012";
  const onSecondary = secondaryForegroundHex(secondary, primary);
  const primaryHsl = hexToHSL(primary);
  const secondaryHsl = hexToHSL(secondary);
  const onSecondaryHsl = hexToHSL(onSecondary);

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/\s*<link\s+rel="icon"[^>]*\/?>\s*/gi, "\n    ");

  if (/<meta\s+name="description"/i.test(html)) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`,
    );
  }
  if (/<meta\s+property="og:title"/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`,
    );
  }
  if (/<meta\s+property="og:description"/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`,
    );
  }

  const inject = [
    `<link rel="icon" href="${faviconHref}" type="${faviconType}" />`,
    `<style id="client-theme">`,
    `      :root {`,
    `        --primary: ${primaryHsl};`,
    `        --secondary: ${secondaryHsl};`,
    `        --ring: ${primaryHsl};`,
    `        --accent: ${secondaryHsl};`,
    `        --secondary-foreground: ${onSecondaryHsl};`,
    `        --accent-foreground: ${onSecondaryHsl};`,
    `      }`,
    `    </style>`,
    `  `,
  ].join("\n    ");

  html = html.replace(/<\/head>/, `${inject}</head>`);
  await fs.writeFile(indexPath, html, "utf8");
  console.log("[export] Patched index.html (title, favicon, inline theme)");
}

/**
 * Bake the client's theme config directly into ThemeContext's defaults so the
 * initial React render already has the right colors/logo/favicon — no flash
 * while the runtime hydration effect runs.
 */
async function patchThemeDefaults(tempProject, theme) {
  const themePath = path.join(tempProject, "src/contexts/ThemeContext.tsx");
  let source;
  try {
    source = await fs.readFile(themePath, "utf8");
  } catch (e) {
    console.warn("[export] Could not read ThemeContext.tsx:", e.message);
    return;
  }

  const defaults = {
    primaryColor: theme.primaryColor || "#0a1628",
    secondaryColor: theme.secondaryColor || "#e4b012",
    logoUrl: theme.logoUrl || null,
    faviconUrl: theme.faviconUrl || null,
    serviceImages: theme.serviceImages || {},
    serviceSectionImages: theme.serviceSectionImages || {},
    teamImages: theme.teamImages || {},
    projectImages: theme.projectImages || {},
  };
  const literal = JSON.stringify(defaults, null, 2);

  const patterns = [
    { re: /export const THEME_DEFAULTS[^=]*=\s*\{[\s\S]*?\n\};/m, prefix: "export const", name: "THEME_DEFAULTS" },
    { re: /const THEME_DEFAULTS[^=]*=\s*\{[\s\S]*?\n\};/m, prefix: "const", name: "THEME_DEFAULTS" },
    { re: /export const DEFAULT_THEME[^=]*=\s*\{[\s\S]*?\n\};/m, prefix: "export const", name: "DEFAULT_THEME" },
    { re: /const DEFAULT_THEME[^=]*=\s*\{[\s\S]*?\n\};/m, prefix: "const", name: "DEFAULT_THEME" },
  ];
  for (const { re, prefix, name } of patterns) {
    if (!re.test(source)) continue;
    source = source.replace(re, `${prefix} ${name}: ThemeConfig = ${literal};`);
    await fs.writeFile(themePath, source, "utf8");
    console.log(`[export] Baked theme defaults into ThemeContext.tsx (${name})`);
    return;
  }
  console.warn("[export] Could not locate THEME_DEFAULTS/DEFAULT_THEME in ThemeContext.tsx");
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
 * @param {string} opts.templateRoot - absolute path to the construction-template scaffold
 * @param {string} [opts.liveTemplateRoot] - absolute path to the live src/template
 *   directory used by the admin preview. When provided, its components,
 *   contexts, data, pages and lib files are overlaid on top of the scaffold
 *   so the ZIP renders exactly like the preview.
 * @param {string} opts.clientId
 * @param {string} opts.clientName
 * @param {object} opts.draft - { theme, content }
 * @returns {Promise<{ zipPath: string, cleanup: () => Promise<void>, filename: string, exportPayload: object }>}
 */
export async function buildSiteZip({ templateRoot, liveTemplateRoot, clientId, clientName, draft }) {
  await fs.access(templateRoot); // will throw if missing

  const exportPayload = {
    generatedAt: new Date().toISOString(),
    clientId,
    clientName,
    theme: draft.theme || {},
    content: draft.content || {},
    notes: typeof draft.notes === "string" ? draft.notes : "",
  };

  const tempBase = await fs.mkdtemp(path.join(os.tmpdir(), "webready-export-"));
  const tempProject = path.join(tempBase, "site");
  const outputZip = path.join(tempBase, "website.zip");

  await copyFiltered(templateRoot, tempProject);

  // Overlay the live admin template so every edit visible in the preview
  // (hero copy, capabilities, testimonials, company info, etc.) is baked
  // into the ZIP. Without this, only logo/colors/services/team reach the
  // downloaded site because the scaffold's old components hardcode strings.
  await overlayLiveTemplate(tempProject, liveTemplateRoot);

  // Download the client's logo + favicon from Supabase into public/ so the
  // exported project is self-contained (no runtime dependency on Supabase)
  // and rewrite their URLs to local paths for the rest of the baking steps.
  const bakedTheme = await downloadClientAssets(tempProject, draft.theme || {});
  exportPayload.theme = bakedTheme;

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
  // Bake the theme (colors, logo, favicon) into ThemeContext.tsx defaults +
  // into index.html so `npm run build` produces a dist/ that is fully branded
  // on first paint, no flash of the default CONSTRUCTO shell.
  await patchThemeDefaults(tempProject, bakedTheme);
  await patchIndexHtml(tempProject, {
    clientName,
    theme: bakedTheme,
    company: draft.content?.company,
  });

  const notesBlock = exportPayload.notes.trim()
    ? [
        "## Notes from the sales team",
        "",
        "The sales agent captured the following notes while working with this client.",
        "These cover feature requests and details the template editor couldn't capture directly.",
        "",
        "```",
        exportPayload.notes.trim(),
        "```",
        "",
      ]
    : [];

  await fs.writeFile(
    path.join(tempProject, "EXPORT_README.md"),
    [
      `# ${clientName} — website export`,
      "",
      `Generated: ${exportPayload.generatedAt}`,
      "",
      "This ZIP contains the website customized for this client.",
      "`public/site-builder-export.json` is loaded automatically on first run.",
      "The editor sidebar has been removed for client delivery.",
      "",
      ...notesBlock,
      "## Run locally",
      "```bash",
      "npm install",
      "npm run dev        # website",
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
