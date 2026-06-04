import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured, type Draft } from "@/lib/supabase";
import { isPreviewDraftMessage } from "@/lib/previewDraftBridge";

export type PreviewDraftPayload = Pick<Draft, "theme" | "content">;

/**
 * Loads a client draft from Supabase, keeps it updated via Realtime, and applies
 * instant updates from the admin editor iframe parent via postMessage.
 */
export function useClientPreviewDraft(
  clientId: string | null,
  onApply: (payload: PreviewDraftPayload | null) => void,
) {
  const [loading, setLoading] = useState(!!clientId);
  const [error, setError] = useState<string | null>(null);
  const onApplyRef = useRef(onApply);
  onApplyRef.current = onApply;

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }
    if (!isSupabaseConfigured) {
      setError("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    let active = true;
    const apply = (draft: Draft | null) => {
      if (!active || !draft) return;
      onApplyRef.current({ theme: draft.theme, content: draft.content });
    };

    (async () => {
      const { data, error: err } = await supabase
        .from("drafts")
        .select("*")
        .eq("client_id", clientId)
        .maybeSingle();
      if (!active) return;
      if (err) setError(err.message);
      else apply(data as Draft | null);
      setLoading(false);
    })();

    const channel = supabase
      .channel(`draft-${clientId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "drafts", filter: `client_id=eq.${clientId}` },
        payload => {
          apply((payload.new as Draft) ?? null);
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [clientId]);

  useEffect(() => {
    if (!clientId) return;

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isPreviewDraftMessage(event.data) || event.data.clientId !== clientId) return;
      setLoading(false);
      setError(null);
      onApplyRef.current({ theme: event.data.theme, content: event.data.content });
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [clientId]);

  return { loading, error };
}
