/**
 * Chirps (chirps.cc) integration — one assistant per public template route.
 *
 * Public showcase URLs (for Chirps "Website addresses to scan" + Page Visibility):
 *   https://nexora-agn.com/templates/plumber
 *   https://nexora-agn.com/templates/plumber/about
 *
 * Set assistant IDs via env (build time) or public/nexora-runtime-config.js (runtime):
 *   VITE_CHIRPS_MARKETING_ASSISTANT_ID — main marketing site (/)
 *   VITE_CHIRPS_ASSISTANT_<TEMPLATE_ID> — e.g. VITE_CHIRPS_ASSISTANT_PLUMBING
 *
 * @see docs/CHIRPS_TEMPLATE_SETUP.md
 */
import { CHIRPS_TEMPLATE_SLUG_BY_ID, getTemplateByChirpsSlug } from "@/lib/templates";

/** Default marketing-site assistant (override with VITE_CHIRPS_MARKETING_ASSISTANT_ID). */
export const CHIRPS_MARKETING_ASSISTANT_ID_DEFAULT = "8b62b3a8-d8ca-4bae-814d-805577e0a187";

/** Built-in assistant IDs (override with env or runtime config). */
export const CHIRPS_TEMPLATE_ASSISTANT_DEFAULTS: Partial<Record<string, string>> = {
  landscaping: "c5b3831b-7684-4473-bee1-0186a530ed45",
  plumbing: "2ffd60ad-15bc-4967-b712-c2dc2ed22e1b",
  roofix: "4b3d26a5-02a2-46de-8fb1-a712827ecac6",
};

export { CHIRPS_TEMPLATE_SLUG_BY_ID };

export function getChirpsSlugForTemplateId(templateId: string): string | undefined {
  return CHIRPS_TEMPLATE_SLUG_BY_ID[templateId];
}

export function getChirpsScanBaseUrl(origin: string, slug: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/templates/${slug}`;
}

function envAssistantKey(templateId: string): string {
  return `VITE_CHIRPS_ASSISTANT_${templateId.toUpperCase().replace(/-/g, "_")}`;
}

function readRuntimeChirpsAssistants(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const w = window as unknown as { __NEXORA_CHIRPS_ASSISTANTS__?: Record<string, string> };
  return w.__NEXORA_CHIRPS_ASSISTANTS__ ?? {};
}

/** Resolve assistant id for a template slug (showcase routes). */
export function getChirpsAssistantIdForSlug(slug: string): string | undefined {
  const template = getTemplateByChirpsSlug(slug);
  if (!template) return undefined;
  const runtime = readRuntimeChirpsAssistants();
  if (runtime[template.id]?.trim()) return runtime[template.id].trim();
  const envKey = envAssistantKey(template.id);
  const fromEnv = (import.meta.env[envKey] as string | undefined)?.trim();
  if (fromEnv) return fromEnv;
  return CHIRPS_TEMPLATE_ASSISTANT_DEFAULTS[template.id]?.trim() || undefined;
}

/** Resolve assistant id by registry template id (e.g. `landscaping`). */
export function getChirpsAssistantIdForTemplateId(templateId: string): string | undefined {
  const slug = CHIRPS_TEMPLATE_SLUG_BY_ID[templateId];
  if (!slug) return undefined;
  return getChirpsAssistantIdForSlug(slug);
}

/** Resolve assistant id for the marketing site (/). */
export function getChirpsMarketingAssistantId(): string {
  const runtime = readRuntimeChirpsAssistants();
  if (runtime.marketing?.trim()) return runtime.marketing.trim();
  const fromEnv = (import.meta.env.VITE_CHIRPS_MARKETING_ASSISTANT_ID as string | undefined)?.trim();
  if (fromEnv) return fromEnv;
  return CHIRPS_MARKETING_ASSISTANT_ID_DEFAULT;
}

/** Parse /templates/:slug from pathname. */
export function parseChirpsTemplateSlug(pathname: string): string | null {
  const match = pathname.match(/^\/templates\/([^/]+)/i);
  return match ? decodeURIComponent(match[1]).toLowerCase() : null;
}

export function isChirpsTemplateShowcasePath(pathname: string): boolean {
  return parseChirpsTemplateSlug(pathname) !== null;
}
