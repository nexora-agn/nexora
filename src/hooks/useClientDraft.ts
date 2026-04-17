import { useEffect, useRef, useState, useCallback } from "react";
import { DEFAULT_DRAFT_STATE, getDraft, saveDraft, type DraftState } from "@/lib/drafts";

const AUTOSAVE_DEBOUNCE_MS = 700;

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useClientDraft(clientId: string | undefined) {
  const [state, setState] = useState<DraftState>(DEFAULT_DRAFT_STATE);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirtyRef = useRef(false);

  useEffect(() => {
    if (!clientId) return;
    let active = true;
    setLoading(true);
    dirtyRef.current = false;
    getDraft(clientId)
      .then(next => {
        if (!active) return;
        setState(next);
        setLoading(false);
      })
      .catch(err => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load draft");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [clientId]);

  useEffect(() => {
    return () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    };
  }, []);

  const scheduleSave = useCallback(
    (next: DraftState) => {
      if (!clientId) return;
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
      setStatus("saving");
      pendingTimeout.current = setTimeout(async () => {
        try {
          await saveDraft(clientId, next);
          setStatus("saved");
          dirtyRef.current = false;
          setError(null);
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Save failed");
        }
      }, AUTOSAVE_DEBOUNCE_MS);
    },
    [clientId],
  );

  const update = useCallback(
    (updater: (prev: DraftState) => DraftState) => {
      setState(prev => {
        const next = updater(prev);
        dirtyRef.current = true;
        scheduleSave(next);
        return next;
      });
    },
    [scheduleSave],
  );

  const flush = useCallback(async () => {
    if (!clientId || !dirtyRef.current) return;
    if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    setStatus("saving");
    try {
      await saveDraft(clientId, state);
      setStatus("saved");
      dirtyRef.current = false;
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }, [clientId, state]);

  return { state, setState: update, loading, status, error, flush };
}
