import type { DraftState } from "@/lib/drafts";

/** Parent admin editor → preview iframe live sync (no full reload). */
export const PREVIEW_DRAFT_MESSAGE_TYPE = "nexora:preview-draft-update" as const;

export type PreviewDraftMessage = {
  type: typeof PREVIEW_DRAFT_MESSAGE_TYPE;
  clientId: string;
  theme: DraftState["theme"];
  content: DraftState["content"];
};

export function postDraftToPreview(
  target: Window | null | undefined,
  clientId: string,
  state: Pick<DraftState, "theme" | "content">,
) {
  if (!target || typeof window === "undefined") return;
  const message: PreviewDraftMessage = {
    type: PREVIEW_DRAFT_MESSAGE_TYPE,
    clientId,
    theme: state.theme,
    content: state.content,
  };
  target.postMessage(message, window.location.origin);
}

export function getClientIdFromPreviewUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("c");
}

export function isPreviewDraftMessage(data: unknown): data is PreviewDraftMessage {
  if (!data || typeof data !== "object") return false;
  const msg = data as PreviewDraftMessage;
  return msg.type === PREVIEW_DRAFT_MESSAGE_TYPE && typeof msg.clientId === "string";
}
