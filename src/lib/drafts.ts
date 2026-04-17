import { supabase, type Draft } from "@/lib/supabase";
import { THEME_DEFAULTS, type ThemeConfig } from "@template/contexts/ThemeContext";
import { SITE_CONTENT_DEFAULTS, type SiteContentState } from "@template/contexts/SiteContentContext";

export interface DraftState {
  theme: ThemeConfig;
  content: SiteContentState;
}

export const DEFAULT_DRAFT_STATE: DraftState = {
  theme: THEME_DEFAULTS,
  content: SITE_CONTENT_DEFAULTS,
};

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
    content: { ...SITE_CONTENT_DEFAULTS, ...((row?.content as Partial<SiteContentState>) ?? {}) },
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
      },
      { onConflict: "client_id" },
    );
  if (error) throw error;
}
