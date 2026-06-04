/**
 * Thin wrapper around the chatbot HTTP API.
 *
 * Endpoint resolution (in order):
 *   1. `VITE_CHAT_API_URL` at build time (explicit override for hosted templates)
 *   2. `window.__CHATBOT_API_URL__` at runtime (allows overriding per deployment
 *      without rebuilding the bundle; set it in index.html or Vercel edge config)
 *   3. Default to `/api/chat` (works under Vercel + the bundled dev-api.mjs)
 *
 * Response contract (server should return one of):
 *   { message: string, action?: { id, args }, suggestions?: string[] }
 *   or { reply: string } (legacy Flowise-style responses also work)
 */

import type { ChatbotSiteData } from "./siteData";
import { localReply } from "./localBrain";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatApiResponse {
  message: string;
  action?: { id: string; args?: Record<string, string> };
  suggestions?: string[];
  source: "remote" | "local-fallback";
}

declare global {
  interface Window {
    __CHATBOT_API_URL__?: string;
  }
}

function resolveEndpoint(): string | null {
  if (typeof window !== "undefined") {
    if (typeof window.__CHATBOT_API_URL__ === "string" && window.__CHATBOT_API_URL__.trim()) {
      return window.__CHATBOT_API_URL__.trim();
    }
  }
  const envUrl =
    typeof import.meta !== "undefined" && (import.meta as unknown as { env?: Record<string, string> }).env
      ? (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_CHAT_API_URL
      : undefined;
  if (envUrl && envUrl.trim()) return envUrl.trim();
  return "/api/chat";
}

function parseStructured(raw: string): { message: string; action?: ChatApiResponse["action"] } {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("{")) return { message: trimmed };
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && typeof parsed.message === "string") {
      return { message: parsed.message, action: parsed.action };
    }
  } catch {
    /* fall through: treat as plain text */
  }
  return { message: trimmed };
}

export async function sendChatMessage(options: {
  message: string;
  history: ChatMessage[];
  siteData: ChatbotSiteData;
  signal?: AbortSignal;
}): Promise<ChatApiResponse> {
  const endpoint = resolveEndpoint();

  if (!endpoint) {
    const local = localReply(options.message, options.siteData);
    return { ...local, source: "local-fallback" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: options.signal,
      body: JSON.stringify({
        message: options.message,
        history: options.history,
        siteData: options.siteData,
      }),
    });

    if (!res.ok) {
      const local = localReply(options.message, options.siteData);
      return { ...local, source: "local-fallback" };
    }

    const data = (await res.json().catch(() => null)) as
      | {
          message?: string;
          action?: ChatApiResponse["action"];
          suggestions?: string[];
          reply?: string;
          text?: string;
          answer?: string;
        }
      | null;

    if (!data) {
      const local = localReply(options.message, options.siteData);
      return { ...local, source: "local-fallback" };
    }

    const raw = data.message ?? data.reply ?? data.text ?? data.answer ?? "";
    if (!raw) {
      const local = localReply(options.message, options.siteData);
      return { ...local, source: "local-fallback" };
    }

    const parsed = parseStructured(String(raw));
    return {
      message: parsed.message,
      action: parsed.action ?? data.action,
      suggestions: data.suggestions,
      source: "remote",
    };
  } catch (err) {
    if ((err as { name?: string })?.name === "AbortError") throw err;
    const local = localReply(options.message, options.siteData);
    return { ...local, source: "local-fallback" };
  }
}
