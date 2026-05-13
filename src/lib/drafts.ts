import { supabase, type Draft } from "@/lib/supabase";
import {
  THEME_DEFAULTS as CONSTRUCTO_THEME,
  type ThemeConfig,
} from "@template/contexts/ThemeContext";
import {
  SITE_CONTENT_DEFAULTS as CONSTRUCTO_SITE_CONTENT,
  type SiteContentState,
} from "@template/contexts/SiteContentContext";
import { THEME_DEFAULTS as NEXORA_THEME } from "@template-nexora/contexts/ThemeContext";
import { SITE_CONTENT_DEFAULTS as NEXORA_SITE_CONTENT } from "@template-nexora/contexts/SiteContentContext";
import {
  THEME_DEFAULTS as ROOFIX_THEME,
  migrateRoofixThemeConfig,
} from "@template-roofix/contexts/ThemeContext";
import { SITE_CONTENT_DEFAULTS as ROOFIX_SITE_CONTENT } from "@template-roofix/contexts/SiteContentContext";
import { THEME_DEFAULTS as SUMMIT_THEME } from "@template-summit/contexts/ThemeContext";
import { SITE_CONTENT_DEFAULTS as SUMMIT_SITE_CONTENT } from "@template-summit/contexts/SiteContentContext";
import { canonicalTemplateId } from "@/lib/templates";
import { withCanonicalRoofixHeroImage } from "@/lib/roofixHeroImage";

export interface DraftState {
  theme: ThemeConfig;
  content: SiteContentState;
  /** Sales-agent notes for the dev team (extra client requests, follow-ups, etc.). */
  notes: string;
}

export const DEFAULT_DRAFT_STATE: DraftState = {
  theme: CONSTRUCTO_THEME,
  content: CONSTRUCTO_SITE_CONTENT,
  notes: "",
};

function themeDefaultsForClientTemplate(templateId: string | null | undefined): ThemeConfig {
  switch (canonicalTemplateId(templateId)) {
    case "nexora":
      return NEXORA_THEME;
    case "roofix":
      return ROOFIX_THEME;
    case "summit":
      return SUMMIT_THEME;
    default:
      return CONSTRUCTO_THEME;
  }
}

/**
 * Full site content defaults for a client row's `template_id`.
 * Cast to Constructo's `SiteContentState` because all templates share the same persisted JSON shape.
 */
export function siteDefaultsForClientTemplate(templateId: string | null | undefined): SiteContentState {
  switch (canonicalTemplateId(templateId)) {
    case "nexora":
      return NEXORA_SITE_CONTENT as unknown as SiteContentState;
    case "roofix":
      return ROOFIX_SITE_CONTENT as unknown as SiteContentState;
    case "summit":
      return SUMMIT_SITE_CONTENT as unknown as SiteContentState;
    default:
      return CONSTRUCTO_SITE_CONTENT;
  }
}

const STALE_SITE_CONTENT = CONSTRUCTO_SITE_CONTENT as unknown as Record<string, unknown>;

const MERGE_MANAGED_CONTENT_KEYS = new Set([
  "company",
  "siteTop",
  "homeHero",
  "leadForm",
  "sectionVisibility",
  "services",
  "serviceSections",
  "team",
  "projects",
  "servicesRibbon",
  "capabilities",
  "processSteps",
  "homeStats",
  "whyBenefits",
  "testimonials",
  "stats",
  "projectsPageStats",
  "aboutStats",
  "coreValues",
  "certifications",
  "commercialFitoutCards",
  "faqItems",
  "navLinks",
  "footerServiceLinks",
  "footerCompanyLinks",
  "officeHours",
  "blogTags",
  "mapEmbedUrl",
  "servicesPageIntro",
  "serviceAreas",
]);

const USER_CONTENT_ID_PREFIXES = ["service-", "section-", "member-", "project-"];

let cachedConstructoLinkTargets: Set<string> | null = null;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function omitKeys(obj: Record<string, unknown>, omit: Set<string>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (!omit.has(k)) out[k] = v;
  }
  return out;
}

function mergeScalarPreferStaleConstruct(defaultVal: unknown, partialVal: unknown, staleVal: unknown): unknown {
  if (partialVal === undefined) return defaultVal;
  if (staleVal !== undefined && partialVal === staleVal && staleVal !== defaultVal) return defaultVal;
  return partialVal;
}

/**
 * Deep-merge `partial` onto `defaults`, keeping template-only keys from `defaults`.
 * When a field still matches vanilla Constructo (`staleRef`), prefer `defaults` so template switches don't drag GC branding.
 */
function mergeOntoDefaultsWithStalePrimitives(
  defaults: Record<string, unknown>,
  partial: Record<string, unknown> | undefined,
  staleRef: Record<string, unknown>,
): Record<string, unknown> {
  const out = { ...defaults };
  if (!partial) return out;
  for (const key of Object.keys(partial)) {
    const pv = partial[key];
    if (pv === undefined || pv === null) continue;
    const dv = defaults[key];
    const cv = staleRef[key];

    if (Array.isArray(pv)) {
      const defArr = Array.isArray(dv) ? dv : [];
      const first = defArr[0];
      const canIdMerge =
        defArr.length > 0 &&
        isPlainObject(first) &&
        typeof (first as Record<string, unknown>).id === "string";
      if (canIdMerge) {
        out[key] = mergeIdKeyedRows(defArr as Record<string, unknown>[], pv, {
          allowPrefixExtras: false,
        }) as (typeof out)[typeof key];
        continue;
      }
      if (Array.isArray(cv) && partialValEquivalentToStale(pv as unknown[], cv) && cv !== dv) {
        out[key] = dv as (typeof out)[typeof key];
      } else {
        out[key] = pv as (typeof out)[typeof key];
      }
      continue;
    }

    if (isPlainObject(pv) && isPlainObject(dv)) {
      const childStale = isPlainObject(cv) ? (cv as Record<string, unknown>) : {};
      out[key] = mergeOntoDefaultsWithStalePrimitives(
        dv as Record<string, unknown>,
        pv as Record<string, unknown>,
        childStale,
      ) as (typeof out)[typeof key];
      continue;
    }

    out[key] = mergeScalarPreferStaleConstruct(dv, pv, cv) as (typeof out)[typeof key];
  }
  return out;
}

function partialValEquivalentToStale(partialArr: unknown[], staleVal: unknown): boolean {
  if (!Array.isArray(staleVal) || staleVal.length !== partialArr.length) return false;
  const s = staleVal as unknown[];
  return partialArr.every((cell, i) => cell === s[i]);
}

function isLikelyUserGeneratedRowId(id: string): boolean {
  return USER_CONTENT_ID_PREFIXES.some(p => id.startsWith(p));
}

function mergeIdKeyedRows(
  defaults: Record<string, unknown>[],
  partial: unknown,
  opts: { allowPrefixExtras: boolean },
): Record<string, unknown>[] {
  if (!Array.isArray(partial) || partial.length === 0) return defaults;
  const pmap = new Map<string, Record<string, unknown>>();
  for (const raw of partial) {
    if (isPlainObject(raw) && typeof raw.id === "string") pmap.set(raw.id, raw);
  }
  const defaultIds = new Set(defaults.map(r => String((r as Record<string, unknown>).id)));
  const merged = defaults.map(row => {
    const idStr = String((row as Record<string, unknown>).id);
    const patch = pmap.get(idStr);
    return patch ? { ...row, ...patch } : row;
  });
  if (!opts.allowPrefixExtras) return merged;
  for (const raw of partial) {
    if (!isPlainObject(raw) || typeof raw.id !== "string") continue;
    if (defaultIds.has(raw.id) || !isLikelyUserGeneratedRowId(raw.id)) continue;
    merged.push(raw);
  }
  return merged;
}

function mergeKeyedRows(
  defaults: Record<string, unknown>[],
  partial: unknown,
  keyField: string,
): Record<string, unknown>[] {
  if (!Array.isArray(partial) || partial.length === 0) return defaults;
  const pmap = new Map<string, Record<string, unknown>>();
  for (const raw of partial) {
    if (isPlainObject(raw)) {
      const k = raw[keyField];
      if (typeof k === "string") pmap.set(k, raw);
    }
  }
  return defaults.map(row => {
    const kVal = row[keyField];
    const patch = typeof kVal === "string" ? pmap.get(kVal) : undefined;
    return patch ? { ...row, ...patch } : row;
  });
}

function mergeStringArrayByIndex(defaults: string[], partial: unknown): string[] {
  if (!Array.isArray(partial) || partial.length === 0) return defaults;
  return defaults.map((cell, i) => (typeof partial[i] === "string" ? (partial[i] as string) : cell));
}

function collectConstructoLinkTargets(): Set<string> {
  const c = CONSTRUCTO_SITE_CONTENT;
  const targets = new Set<string>();
  const add = (p: string | undefined) => {
    if (typeof p === "string" && p.startsWith("/")) targets.add(p);
  };
  for (const l of c.navLinks) add(l.path);
  for (const l of c.footerServiceLinks) add(l.to);
  for (const l of c.footerCompanyLinks) add(l.to);
  for (const r of c.servicesRibbon) if ("to" in r && typeof (r as { to?: string }).to === "string") add((r as { to: string }).to);
  for (const cap of c.capabilities) add(cap.to);
  for (const svc of c.services) add(`/services/${svc.id}`);
  return targets;
}

function getConstructoLinkTargets(): Set<string> {
  if (!cachedConstructoLinkTargets) cachedConstructoLinkTargets = collectConstructoLinkTargets();
  return cachedConstructoLinkTargets;
}

function mergeLinkRowList(
  defaults: { label?: string; path?: string; to?: string }[],
  partial: unknown,
  keyField: "path" | "to",
): typeof defaults {
  if (!Array.isArray(partial) || partial.length === 0) return defaults;
  const staleTargets = getConstructoLinkTargets();
  const pmap = new Map<string, Record<string, unknown>>();
  const defaultTargets = new Set<string>();
  for (const row of defaults) {
    const t = row[keyField];
    if (typeof t === "string") defaultTargets.add(t);
    if (typeof t === "string") pmap.set(t, row as Record<string, unknown>);
  }
  for (const raw of partial) {
    if (!isPlainObject(raw)) continue;
    const t = raw[keyField];
    if (typeof t !== "string") continue;
    const existing = pmap.get(t);
    pmap.set(t, existing ? ({ ...existing, ...raw } as Record<string, unknown>) : raw);
  }
  const merged: Record<string, unknown>[] = defaults.map(row => {
    const t = String(row[keyField]);
    const patch = pmap.get(t);
    return patch ?? (row as Record<string, unknown>);
  });
  const appendedExtras = new Set<string>();
  for (const raw of partial) {
    if (!isPlainObject(raw)) continue;
    const t = raw[keyField];
    if (typeof t !== "string") continue;
    if (defaultTargets.has(t) || staleTargets.has(t)) continue;
    if (appendedExtras.has(t)) continue;
    appendedExtras.add(t);
    merged.push((pmap.get(t) ?? raw) as Record<string, unknown>);
  }
  return merged as typeof defaults;
}

/**
 * Deep-merge saved content over the template's defaults (not Constructo).
 * Used by roofing / Summit previews and by `getDraft` so partial drafts never "fall back" to the wrong template.
 */
export function mergeSiteContentState<T extends Record<string, unknown>>(
  defaults: T,
  partial: Partial<T> | null | undefined,
): T {
  const p = partial ?? {};
  const d = defaults as Record<string, unknown>;
  const ph = p as Record<string, unknown>;

  const phTail = omitKeys(ph, MERGE_MANAGED_CONTENT_KEYS);

  const company = mergeOntoDefaultsWithStalePrimitives(
    (d.company ?? {}) as Record<string, unknown>,
    ph.company as Record<string, unknown> | undefined,
    STALE_SITE_CONTENT.company as Record<string, unknown>,
  );

  const siteTop = mergeOntoDefaultsWithStalePrimitives(
    (d.siteTop ?? {}) as Record<string, unknown>,
    ph.siteTop as Record<string, unknown> | undefined,
    STALE_SITE_CONTENT.siteTop as Record<string, unknown>,
  );

  const homeHero = mergeOntoDefaultsWithStalePrimitives(
    (d.homeHero ?? {}) as Record<string, unknown>,
    ph.homeHero as Record<string, unknown> | undefined,
    STALE_SITE_CONTENT.homeHero as Record<string, unknown>,
  );

  const leadForm = mergeOntoDefaultsWithStalePrimitives(
    (d.leadForm ?? {}) as Record<string, unknown>,
    ph.leadForm as Record<string, unknown> | undefined,
    STALE_SITE_CONTENT.leadForm as Record<string, unknown>,
  );

  const services = mergeIdKeyedRows((d.services as Record<string, unknown>[]) ?? [], ph.services, {
    allowPrefixExtras: true,
  }) as SiteContentState["services"];

  const serviceSections = mergeIdKeyedRows((d.serviceSections as Record<string, unknown>[]) ?? [], ph.serviceSections, {
    allowPrefixExtras: true,
  }) as SiteContentState["serviceSections"];

  const team = mergeIdKeyedRows((d.team as Record<string, unknown>[]) ?? [], ph.team, {
    allowPrefixExtras: true,
  }) as SiteContentState["team"];

  const projects = mergeIdKeyedRows((d.projects as Record<string, unknown>[]) ?? [], ph.projects, {
    allowPrefixExtras: true,
  }) as SiteContentState["projects"];

  const servicesRibbon = mergeIdKeyedRows((d.servicesRibbon as Record<string, unknown>[]) ?? [], ph.servicesRibbon, {
    allowPrefixExtras: false,
  }) as SiteContentState["servicesRibbon"];

  const capabilities = mergeIdKeyedRows((d.capabilities as Record<string, unknown>[]) ?? [], ph.capabilities, {
    allowPrefixExtras: false,
  }) as SiteContentState["capabilities"];

  const processSteps = mergeIdKeyedRows((d.processSteps as Record<string, unknown>[]) ?? [], ph.processSteps, {
    allowPrefixExtras: false,
  }) as SiteContentState["processSteps"];

  const coreValues = mergeIdKeyedRows((d.coreValues as Record<string, unknown>[]) ?? [], ph.coreValues, {
    allowPrefixExtras: false,
  }) as SiteContentState["coreValues"];

  const certifications = mergeIdKeyedRows((d.certifications as Record<string, unknown>[]) ?? [], ph.certifications, {
    allowPrefixExtras: false,
  }) as SiteContentState["certifications"];

  const commercialFitoutCards = mergeIdKeyedRows(
    (d.commercialFitoutCards as Record<string, unknown>[]) ?? [],
    ph.commercialFitoutCards,
    { allowPrefixExtras: false },
  ) as SiteContentState["commercialFitoutCards"];

  const homeStats = mergeKeyedRows((d.homeStats as Record<string, unknown>[]) ?? [], ph.homeStats, "label");
  const stats = mergeKeyedRows((d.stats as Record<string, unknown>[]) ?? [], ph.stats, "label");
  const projectsPageStats = mergeKeyedRows((d.projectsPageStats as Record<string, unknown>[]) ?? [], ph.projectsPageStats, "label");
  const aboutStats = mergeKeyedRows((d.aboutStats as Record<string, unknown>[]) ?? [], ph.aboutStats, "label");

  const whyBenefits = mergeKeyedRows((d.whyBenefits as Record<string, unknown>[]) ?? [], ph.whyBenefits, "title");

  const testimonials = mergeKeyedRows((d.testimonials as Record<string, unknown>[]) ?? [], ph.testimonials, "name");

  const faqItems = mergeKeyedRows((d.faqItems as Record<string, unknown>[]) ?? [], ph.faqItems, "question");

  const officeHours = mergeKeyedRows((d.officeHours as Record<string, unknown>[]) ?? [], ph.officeHours, "days");

  const navLinks = mergeLinkRowList(
    (d.navLinks as SiteContentState["navLinks"]) ?? [],
    ph.navLinks,
    "path",
  );

  const footerServiceLinks = mergeLinkRowList(
    (d.footerServiceLinks as SiteContentState["footerServiceLinks"]) ?? [],
    ph.footerServiceLinks,
    "to",
  );

  const footerCompanyLinks = mergeLinkRowList(
    (d.footerCompanyLinks as SiteContentState["footerCompanyLinks"]) ?? [],
    ph.footerCompanyLinks,
    "to",
  );

  const mapEmbedUrl = mergeScalarPreferStaleConstruct(
    d.mapEmbedUrl,
    ph.mapEmbedUrl,
    STALE_SITE_CONTENT.mapEmbedUrl,
  ) as string;

  const servicesPageIntro = mergeScalarPreferStaleConstruct(
    d.servicesPageIntro,
    ph.servicesPageIntro,
    STALE_SITE_CONTENT.servicesPageIntro,
  ) as string;

  const blogTags = mergeStringArrayByIndex((d.blogTags as string[]) ?? [], ph.blogTags);

  const merged: Record<string, unknown> = {
    ...d,
    ...phTail,
    company,
    siteTop,
    homeHero,
    leadForm,
    sectionVisibility: {
      ...(d.sectionVisibility as object),
      ...((ph.sectionVisibility as object) ?? {}),
    },
    mapEmbedUrl,
    servicesPageIntro,
    blogTags,
    services,
    serviceSections,
    team,
    projects,
    servicesRibbon,
    capabilities,
    processSteps,
    homeStats,
    whyBenefits,
    testimonials,
    stats,
    projectsPageStats,
    aboutStats,
    coreValues,
    certifications,
    commercialFitoutCards,
    faqItems,
    navLinks,
    footerServiceLinks,
    footerCompanyLinks,
    officeHours,
  };

  if ("serviceAreas" in d && Array.isArray(d.serviceAreas)) {
    merged.serviceAreas = mergeStringArrayByIndex(d.serviceAreas as string[], ph.serviceAreas);
  }

  return merged as T;
}

/** Deep-merge saved content over Constructo defaults (standalone template preview + legacy callers). */
export function mergeContent(partial: Partial<SiteContentState> | null | undefined): SiteContentState {
  return mergeSiteContentState(CONSTRUCTO_SITE_CONTENT as unknown as Record<string, unknown>, partial) as SiteContentState;
}

export async function getDraft(clientId: string): Promise<DraftState> {
  const [{ data: clientRow, error: clientErr }, { data: draftRow, error: draftErr }] = await Promise.all([
    supabase.from("clients").select("template_id").eq("id", clientId).maybeSingle(),
    supabase.from("drafts").select("*").eq("client_id", clientId).maybeSingle(),
  ]);
  if (clientErr) throw clientErr;
  if (draftErr) throw draftErr;

  const row = draftRow as Draft | null;
  const base = siteDefaultsForClientTemplate(clientRow?.template_id);
  const themeBase = themeDefaultsForClientTemplate(clientRow?.template_id);

  const mergedContent = mergeSiteContentState(
    base as unknown as Record<string, unknown>,
    row?.content as Partial<SiteContentState> | null | undefined,
  ) as SiteContentState;
  const content =
    canonicalTemplateId(clientRow?.template_id) === "roofix"
      ? withCanonicalRoofixHeroImage(mergedContent)
      : mergedContent;

  let theme: ThemeConfig = { ...themeBase, ...((row?.theme as Partial<ThemeConfig>) ?? {}) };
  if (canonicalTemplateId(clientRow?.template_id) === "roofix") {
    theme = migrateRoofixThemeConfig(theme) as ThemeConfig;
  }

  return {
    theme,
    content,
    notes: typeof row?.notes === "string" ? row.notes : "",
  };
}

export async function saveDraft(clientId: string, state: DraftState): Promise<void> {
  const { error } = await supabase
    .from("drafts")
    .upsert(
      {
        client_id: clientId,
        theme: state.theme,
        content: state.content,
        notes: state.notes ?? "",
      },
      { onConflict: "client_id" },
    );
  if (error) throw error;
}
