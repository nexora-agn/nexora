/**
 * Self-contained interactive demo chat. Visitors click a sample question and
 * see the assistant answer. No backend, no third-party dependency, always works
 * (good for live sales calls). The real assistant also runs on the page.
 */
import { useState } from "react";
import { Bot } from "lucide-react";
import { aiLive } from "@/data/nexoraAi";

interface Msg {
  role: "user" | "bot";
  text: string;
}

const AiLiveDemo = () => {
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: aiLive.greeting }]);
  const [asked, setAsked] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);

  const remaining = aiLive.presets.filter((p) => !asked.includes(p.q));

  const ask = (q: string, a: string) => {
    if (typing) return;
    setAsked((prev) => [...prev, q]);
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: a }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_48px_-28px_rgba(10,10,10,0.35)]">
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-brand">
          <Bot className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-neutral-950">Summit Roofing</p>
          <p className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online now
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={
                m.role === "user"
                  ? "max-w-[80%] rounded-2xl rounded-br-md bg-neutral-100 px-3.5 py-2 text-sm text-neutral-800"
                  : "max-w-[85%] rounded-2xl rounded-bl-md bg-neutral-950 px-3.5 py-2 text-sm text-neutral-50"
              }
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start">
            <p className="rounded-2xl rounded-bl-md bg-neutral-950 px-4 py-2.5 text-sm text-neutral-50">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
              </span>
            </p>
          </div>
        ) : null}
      </div>

      {remaining.length > 0 ? (
        <div className="flex flex-wrap gap-2 border-t border-neutral-100 px-4 py-3">
          {remaining.map((p) => (
            <button
              key={p.q}
              type="button"
              onClick={() => ask(p.q, p.a)}
              disabled={typing}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
            >
              {p.q}
            </button>
          ))}
        </div>
      ) : (
        <div className="border-t border-neutral-100 px-4 py-3 text-center text-xs font-medium text-neutral-400">
          That’s the idea. The real assistant does this with your business info.
        </div>
      )}
    </div>
  );
};

export default AiLiveDemo;
