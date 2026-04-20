import { supabase, type Draft } from "@/lib/supabase";
import { THEME_DEFAULTS, type ThemeConfig } from "@template/contexts/ThemeContext";
import { SITE_CONTENT_DEFAULTS, type SiteContentState } from "@template/contexts/SiteContentContext";

export interface DraftState {
  theme: ThemeConfig;
  content: SiteContentState;
  /** Sales-agent notes for the dev team (extra client requests, follow-ups, etc.). */
  notes: string;
}

export const DEFAULT_DRAFT_STATE: DraftState = {
  theme: THEME_DEFAULTS,
  content: SITE_CONTENT_DEFAULTS,
  notes: "",
};

/** Deep-merge saved content over current defaults so older drafts missing
 *  newer fields still hydrate correctly when the schema grows. */
export function mergeContent(partial: Partial<SiteContentState> | null | undefined): SiteContentState {
  const p = partial ?? {};
  return {
    ...SITE_CONTENT_DEFAULTS,
    ...p,
    company: { ...SITE_CONTENT_DEFAULTS.company, ...(p.company ?? {}) },
    siteTop: { ...SITE_CONTENT_DEFAULTS.siteTop, ...(p.siteTop ?? {}) },
    homeHero: {
      ...SITE_CONTENT_DEFAULTS.homeHero,
      ...(p.homeHero ?? {}),
      primaryCta: {
        ...SITE_CONTENT_DEFAULTS.homeHero.primaryCta,
        ...(p.homeHero?.primaryCta ?? {}),
      },
      secondaryCta: {
        ...SITE_CONTENT_DEFAULTS.homeHero.secondaryCta,
        ...(p.homeHero?.secondaryCta ?? {}),
      },
    },
    leadForm: { ...SITE_CONTENT_DEFAULTS.leadForm, ...(p.leadForm ?? {}) },
    sectionVisibility: {
      ...SITE_CONTENT_DEFAULTS.sectionVisibility,
      ...(p.sectionVisibility ?? {}),
    },
  };
}

export async function getDraft(clientId: string): Promise<DraftState> {
  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) throw error;
  const row = data as Draft | null;
  return {
    theme: { ...THEME_DEFAULTS, ...((row?.theme as Partial<ThemeConfig>) ?? {}) },
    content: mergeContent(row?.content as Partial<SiteContentState> | null),
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
