/**
 * ChatbotWidget: floating AI assistant rendered at the template root.
 *
 * Design goals:
 *   • Looks native to the template (uses CSS variables `--primary` / `--secondary`).
 *   • Works without a backend: falls back to a local rule-based brain that
 *     answers from the template's own site-data.
 *   • Streams text visually (typewriter) so the empty bubble never looks dead.
 *   • Dispatches structured actions for the rest of the template to consume.
 *   • Tiny footprint: pure React + Tailwind + lucide-react icons, no extra deps.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Sparkles,
  Minus,
  RefreshCcw,
} from "lucide-react";

import { useSiteContent } from "@template/contexts/SiteContentContext";
import { buildChatbotSiteData, type ChatbotSiteData } from "@template/lib/chatbot/siteData";
import { sendChatMessage, type ChatApiResponse, type ChatMessage } from "@template/lib/chatbot/chatClient";
import { runChatAction } from "@template/lib/chatbot/actions";

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  action?: ChatApiResponse["action"];
  suggestions?: string[];
  pending?: boolean;
}

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const DEFAULT_SUGGESTIONS = [
  "Tell me about your services",
  "Show me your projects",
  "How does pricing work?",
  "How do I contact the team?",
];

const greetingFor = (siteName: string): UiMessage => ({
  id: uid(),
  role: "assistant",
  content: `Hi! I'm the ${siteName || "website"} assistant. Ask me about our services, projects, pricing or anything else. I can also jump you to the right page.`,
  suggestions: DEFAULT_SUGGESTIONS,
});

/**
 * Prefer a live snapshot from the SiteContentContext (the editor/preview + the
 * exported ZIP both wrap the template in the context). When that's not
 * available (unlikely but defensive), we try to hydrate from the baked
 * `public/chatbot/site-data.json` that `server/export-logic.mjs` writes.
 */
function useChatbotSiteData(): ChatbotSiteData {
  const content = useSiteContent();
  const [fallback, setFallback] = useState<ChatbotSiteData | null>(null);

  useEffect(() => {
    if (content) return;
    let cancelled = false;
    fetch("/chatbot/site-data.json")
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!cancelled && data) setFallback(data as ChatbotSiteData);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [content]);

  return useMemo(() => {
    if (content) return buildChatbotSiteData(content);
    return (
      fallback ?? {
        generatedAt: new Date().toISOString(),
        site: { name: "Our Website", legalName: "Our Website", tagline: "" },
        contact: {
          phone: "",
          email: "",
          address: "",
          hours: "",
          officeHours: [],
          locations: "",
          mapEmbedUrl: "",
        },
        pages: [],
        about: { intro: "", stats: [], values: [], certifications: [] },
        services: [],
        serviceSections: [],
        capabilities: [],
        projects: [],
        team: [],
        testimonials: [],
        faq: [],
        pricing: { summary: "", bullets: [] },
        process: [],
        hero: { headline: "", body: "" },
        actions: [],
      }
    );
  }, [content, fallback]);
}

const TypingDots = () => (
  <span className="inline-flex gap-1 items-center px-1 py-2">
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-[chatbot-dot_1s_ease-in-out_infinite]" />
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-[chatbot-dot_1s_ease-in-out_infinite] [animation-delay:150ms]" />
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-[chatbot-dot_1s_ease-in-out_infinite] [animation-delay:300ms]" />
  </span>
);

const ChatbotWidget = () => {
  const siteData = useChatbotSiteData();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>(() => [greetingFor(siteData.site.name)]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Update greeting if the company name changes (e.g. admin editing in real time).
  useEffect(() => {
    setMessages(prev =>
      prev.map((m, i) =>
        i === 0 && m.role === "assistant" && !m.pending
          ? {
              ...m,
              content: `Hi! I'm the ${siteData.site.name || "website"} assistant. Ask me about our services, projects, pricing or anything else. I can also jump you to the right page.`,
            }
          : m,
      ),
    );
  }, [siteData.site.name]);

  /**
   * Wipe the conversation and drop the user back to a fresh greeting. Also
   * aborts any in-flight request so we don't race a reply into the empty
   * state. Exposed as a header button AND as a window-level event so the host
   * template can reset the chat from its own UI:
   *
   *   window.dispatchEvent(new CustomEvent("chatbot:clear"));
   */
  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsSending(false);
    setInput("");
    setMessages([greetingFor(siteData.site.name)]);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [siteData.site.name]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onClear = () => clearChat();
    window.addEventListener("chatbot:clear", onClear);
    return () => window.removeEventListener("chatbot:clear", onClear);
  }, [clearChat]);

  const handleAction = useCallback(
    (action: ChatApiResponse["action"]) => {
      if (!action) return;
      runChatAction(action, navigate);
    },
    [navigate],
  );

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isSending) return;

      const userMsg: UiMessage = { id: uid(), role: "user", content: text };
      const pendingId = uid();
      setMessages(prev => [...prev, userMsg, { id: pendingId, role: "assistant", content: "", pending: true }]);
      setInput("");
      setIsSending(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const history: ChatMessage[] = messages
          .filter(m => !m.pending)
          .map(m => ({ role: m.role, content: m.content }));
        history.push({ role: "user", content: text });

        const reply = await sendChatMessage({
          message: text,
          history,
          siteData,
          signal: controller.signal,
        });

        setMessages(prev =>
          prev.map(m =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  content: reply.message,
                  action: reply.action,
                  suggestions: reply.suggestions,
                }
              : m,
          ),
        );

        if (reply.action) {
          setTimeout(() => handleAction(reply.action), 500);
        }
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
        setMessages(prev =>
          prev.map(m =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  content:
                    "Sorry, I'm having trouble reaching the server. Please try again in a moment, or use the contact form to reach us directly.",
                  suggestions: ["Open contact form"],
                  action: { id: "open_contact_form" },
                }
              : m,
          ),
        );
      } finally {
        setIsSending(false);
        abortRef.current = null;
      }
    },
    [messages, siteData, isSending, handleAction],
  );

  const onSuggest = (s: string) => {
    if (/contact form/i.test(s)) {
      handleAction({ id: "open_contact_form" });
      return;
    }
    sendMessage(s);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <style>{`
        @keyframes chatbot-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
        @keyframes chatbot-pop {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chatbot-panel { animation: chatbot-pop 220ms ease-out both; }
      `}</style>

      {/* Floating launcher ------------------------------------------------ */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Chat with the ${siteData.site.name} assistant`}
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-200 px-4 py-3 md:px-5 md:py-3.5"
        >
          <span className="relative flex items-center justify-center">
            <MessageCircle className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={2.25} />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
          </span>
          <span className="hidden sm:inline text-sm font-semibold tracking-wide">Ask AI</span>
        </button>
      )}

      {/* Chat panel ------------------------------------------------------- */}
      {isOpen && (
        <div
          className="chatbot-panel fixed bottom-4 right-4 md:bottom-5 md:right-5 z-[100] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl shadow-black/25"
          style={{ height: "min(620px, calc(100vh - 2rem))" }}
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">
                {siteData.site.name || "Website"} Assistant
              </div>
              <div className="flex items-center gap-1.5 text-[11px] opacity-80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Online · answers from this site</span>
              </div>
            </div>
            <button
              type="button"
              onClick={clearChat}
              disabled={messages.length <= 1 && !isSending}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md opacity-80 hover:opacity-100 hover:bg-white/10 transition disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              aria-label="Clear conversation"
              title="Clear conversation"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md opacity-80 hover:opacity-100 hover:bg-white/10 transition"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md opacity-80 hover:opacity-100 hover:bg-white/10 transition"
              aria-label="Close chat"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4"
          >
            {messages.map(m => (
              <MessageRow key={m.id} message={m} onSuggest={onSuggest} />
            ))}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-border bg-card px-3 py-3">
            <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15 transition">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder={`Ask about ${siteData.site.name || "the site"}…`}
                className="max-h-28 min-h-[24px] flex-1 resize-none bg-transparent text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition disabled:opacity-40 hover:opacity-90"
                aria-label="Send message"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" strokeWidth={2.25} />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground text-center">
              AI answers are generated. Double-check anything important.
            </p>
          </form>
        </div>
      )}
    </>
  );
};

const MessageRow = ({
  message,
  onSuggest,
}: {
  message: UiMessage;
  onSuggest: (text: string) => void;
}) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        ].join(" ")}
      >
        {message.pending ? <TypingDots /> : message.content}
        {!message.pending && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.suggestions.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => onSuggest(s)}
                className="rounded-full border border-border bg-card/80 px-2.5 py-1 text-[11.5px] font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotWidget;
