/**
 * Presentational "conversation" cards used across the AI showcase. They show
 * the assistant actually talking and capturing a lead / booking a job, which
 * explains the product better than feature copy. No real data or integrations.
 */
import { Bot, Calendar, Check, Mail, MessageCircle, Mic, Send, User } from "lucide-react";

export interface ConversationTurn {
  role: "user" | "bot";
  text: string;
}

export type ConversationResult =
  | { type: "lead"; name: string; detail: string; channel: string }
  | { type: "booked"; detail: string; channel: string };

function ChatHeader({ business }: { business: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-brand">
        <Bot className="h-4 w-4" strokeWidth={2} aria-hidden />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-neutral-950">{business}</p>
        <p className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online now
        </p>
      </div>
    </div>
  );
}

function Bubble({ role, text }: ConversationTurn) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-neutral-100 px-3.5 py-2 text-sm text-neutral-800">
          {text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-neutral-950 px-3.5 py-2 text-sm text-neutral-50">
        {text}
      </p>
    </div>
  );
}

function LeadResult({ name, detail, channel }: { name: string; detail: string; channel: string }) {
  return (
    <div className="mt-1 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
        </span>
        <p className="text-sm font-semibold text-neutral-950">New lead captured</p>
      </div>
      <div className="mt-3 space-y-1.5">
        <p className="flex items-center gap-2 text-sm text-neutral-700">
          <User className="h-3.5 w-3.5 text-neutral-400" aria-hidden /> {name}
        </p>
        <p className="flex items-center gap-2 text-sm text-neutral-700">
          <MessageCircle className="h-3.5 w-3.5 text-neutral-400" aria-hidden /> {detail}
        </p>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm">
        <Send className="h-3 w-3 text-emerald-600" aria-hidden /> {channel}
      </p>
    </div>
  );
}

function BookedResult({ detail, channel }: { detail: string; channel: string }) {
  return (
    <div className="mt-1 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/15 text-neutral-900">
          <Calendar className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
        <p className="text-sm font-semibold text-neutral-950">Appointment booked</p>
      </div>
      <p className="mt-2.5 text-sm font-medium text-neutral-800">{detail}</p>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm">
        <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} aria-hidden /> {channel}
      </p>
    </div>
  );
}

export function ConversationCard({
  business,
  turns,
  result,
  footnote,
}: {
  business: string;
  turns: ConversationTurn[];
  result?: ConversationResult;
  footnote?: string;
}) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_48px_-28px_rgba(10,10,10,0.35)]">
      <ChatHeader business={business} />
      <div className="space-y-3 px-4 py-4">
        {turns.map((t, i) => (
          <Bubble key={i} role={t.role} text={t.text} />
        ))}
        {result?.type === "lead" ? <LeadResult {...result} /> : null}
        {result?.type === "booked" ? <BookedResult {...result} /> : null}
        {footnote ? (
          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-medium text-neutral-400">
            <Mic className="h-3.5 w-3.5" aria-hidden /> {footnote}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Where leads land — used by the "plugs into your apps" block. */
function ChannelRow({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Mail;
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50/70 px-3 py-2.5">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${className}`}>
        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
      </span>
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <Check className="ml-auto h-4 w-4 text-emerald-500" strokeWidth={2.6} aria-hidden />
    </div>
  );
}

export function ChannelsCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(10,10,10,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-950">New lead • Maria K.</p>
        <span className="text-[11px] font-medium text-neutral-400">just now</span>
      </div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-400">Delivered to</p>
      <div className="space-y-2">
        <ChannelRow icon={Mail} label="Email" className="bg-rose-50 text-rose-500" />
        <ChannelRow icon={MessageCircle} label="WhatsApp" className="bg-emerald-50 text-emerald-600" />
        <ChannelRow icon={Send} label="Telegram" className="bg-sky-50 text-sky-500" />
      </div>
    </div>
  );
}

/** Compact dark lead card used by the homepage teaser. */
export function MockLeadCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-neutral-100 shadow-[0_28px_56px_-24px_rgba(10,10,10,0.55)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
          <Check className="h-5 w-5" strokeWidth={2.4} aria-hidden />
        </span>
        <p className="text-sm font-semibold text-white">New lead captured</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-neutral-500" aria-hidden />
          <span className="text-sm font-medium text-neutral-100">Maria K.</span>
        </div>
        <div className="flex items-start gap-3">
          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          <span className="text-sm text-neutral-300">Roof leak, needs it fixed before the weekend</span>
        </div>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-neutral-200">
          <Send className="h-3 w-3 text-brand" aria-hidden /> Sent to your WhatsApp
        </p>
      </div>
    </div>
  );
}
