/**
 * Content for the AI Assistant showcase (homepage teaser + /ai page).
 *
 * Voice: short, plain, written for contractors. No long dashes, no buzzwords.
 * Lead with the result. Features are shown as real conversations, not slogans.
 */
import type { LucideIcon } from "lucide-react";
import { Camera, CalendarCheck, Clock, Hand, Mic, RefreshCw, Sparkles, Target } from "lucide-react";
import type { ConversationResult, ConversationTurn } from "@/components/ai/AiMockCards";

// ── Hero ──────────────────────────────────────────────────────────────────────
export const aiHero = {
  eyebrow: "AI assistant",
  title: "Your website should bring you jobs.",
  titleHighlight: "Ours makes sure it does.",
  subtitle:
    "We put a smart assistant on your site. It talks to your visitors, answers their questions, and turns them into booked jobs. Even while you sleep.",
  ctaLabel: "Book a walkthrough",
};

export const aiHeroConversation: {
  business: string;
  turns: ConversationTurn[];
  result: ConversationResult;
  footnote: string;
} = {
  business: "Summit Roofing",
  turns: [
    { role: "user", text: "How much for a roof repair?" },
    { role: "bot", text: "Most run $350 to $900 depending on the damage. Want me to book a free inspection?" },
    { role: "user", text: "Yes please" },
    { role: "bot", text: "Great. What's the best number to confirm?" },
    { role: "user", text: "(201) 555-0148" },
  ],
  result: { type: "lead", name: "(201) 555-0148", detail: "Wants a roof repair inspection", channel: "Sent to your phone" },
  footnote: "Type or talk. Answers in seconds.",
};

// ── How it works ────────────────────────────────────────────────────────────────
export const aiHowItWorks = {
  title: "It knows your business",
  intro: "Before it goes live, we train it on everything a customer might ask.",
  items: [
    "Your services and your prices",
    "Your service area and address",
    "Your hours and your most common questions",
  ],
  closing: "So every answer sounds like you. Not a generic bot.",
};

// ── Core value ────────────────────────────────────────────────────────────────
export const aiCoreValue = {
  title: "Most websites lose visitors. Yours doesn’t.",
  subtitle:
    "People leave a website in seconds, and you never even know they were there. Your assistant talks to them first, and gets their details before they go.",
};

// ── Main features (shown as conversations) ──────────────────────────────────────
export type AiFeatureVisual =
  | { kind: "conversation"; business: string; turns: ConversationTurn[]; result?: ConversationResult }
  | { kind: "channels" };

export interface AiFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  explanation: string;
  points: string[];
  visual: AiFeatureVisual;
}

export const aiFeatures: AiFeature[] = [
  {
    id: "leads",
    icon: Target,
    title: "It captures the lead, not just the click",
    explanation:
      "When someone shows interest, it asks for their name and number the natural way, right in the chat. You get the lead before they ever leave the page.",
    points: [
      "Name, phone, and what they need",
      "Captured while they’re still interested",
      "No more visitors who vanish without a trace",
    ],
    visual: {
      kind: "conversation",
      business: "Summit Roofing",
      turns: [
        { role: "bot", text: "Happy to help with that leak. What’s the best number to reach you?" },
        { role: "user", text: "Sure, it’s (201) 555-0148" },
        { role: "bot", text: "Thanks Maria. Our team will call you within the hour." },
      ],
      result: { type: "lead", name: "Maria K.", detail: "Roof leak, northern NJ", channel: "Sent to your WhatsApp" },
    },
  },
  {
    id: "booking",
    icon: CalendarCheck,
    title: "It books the job into your calendar",
    explanation:
      "Ready customers pick a time inside the chat. The appointment lands on your calendar by itself. No phone tag, no missed callbacks.",
    points: [
      "Customer picks from your real openings",
      "Drops into your calendar automatically",
      "Books jobs while you’re up on a roof",
    ],
    visual: {
      kind: "conversation",
      business: "Summit Roofing",
      turns: [
        { role: "user", text: "Can someone come take a look this week?" },
        { role: "bot", text: "I have Tuesday 10:00 AM or Thursday 2:00 PM open. Which works?" },
        { role: "user", text: "Tuesday 10 is good" },
      ],
      result: { type: "booked", detail: "Tue 10:00 AM, roof inspection", channel: "Added to your calendar" },
    },
  },
  {
    id: "integrations",
    icon: Sparkles,
    title: "It plugs into the apps you already use",
    explanation:
      "Every lead shows up where you already work. No new app to check, no dashboard to learn. Choose email, WhatsApp, or Telegram, and we can connect your other tools too.",
    points: [
      "Leads to Gmail, WhatsApp, or Telegram",
      "Bookings to your calendar",
      "Connects to the other tools you use",
    ],
    visual: { kind: "channels" },
  },
];

// ── More of what it does (compact grid) ─────────────────────────────────────────
export interface AiMiniFeature {
  icon: LucideIcon;
  title: string;
  line: string;
}

export const aiMoreFeatures: AiMiniFeature[] = [
  { icon: Mic, title: "Talks or types", line: "Customers can type, or talk to it out loud like a phone call." },
  { icon: Sparkles, title: "Trained on your business", line: "Answers from your real services and prices, never a guess." },
  { icon: Clock, title: "Always on", line: "Replies in seconds, day or night, weekends included." },
  { icon: Camera, title: "Takes photos", line: "Customers can send a picture of the problem in the chat." },
  { icon: Hand, title: "You stay in control", line: "Step into any conversation whenever you want." },
  { icon: RefreshCw, title: "Stays current", line: "Change a price or service and it keeps up." },
];

// ── Live experience ─────────────────────────────────────────────────────────────
export const aiLive = {
  title: "Don’t take our word for it",
  subtitle: "Ask it something a customer would ask. See how it answers.",
  greeting: "Hi! Ask me anything about the work, pricing, or booking.",
  presets: [
    { q: "How much for a roof repair?", a: "Most repairs run $350 to $900 depending on the damage. Want me to book a free inspection?" },
    { q: "Do you cover my area?", a: "We cover all of northern New Jersey. What’s your town or zip code?" },
    { q: "Can I book an inspection?", a: "Sure. I have Tuesday at 10:00 AM or Thursday at 2:00 PM open. Which works for you?" },
  ],
  note: "This assistant is live on this page. Open the chat in the corner and ask it anything.",
};

// ── Closing ─────────────────────────────────────────────────────────────────────
export const aiClosing = {
  title: "Want this working on your website?",
  subtitle:
    "Book a quick walkthrough. We’ll show you your own assistant answering, booking a job, and capturing a lead.",
  ctaLabel: "Book a walkthrough",
};

// ── Homepage teaser wins ────────────────────────────────────────────────────────
export interface AiTeaserWin {
  icon: LucideIcon;
  title: string;
  line: string;
}

export const aiTeaserWins: AiTeaserWin[] = [
  { icon: Target, title: "Captures every lead", line: "Name and phone, sent to your Gmail, WhatsApp, or Telegram." },
  { icon: CalendarCheck, title: "Books jobs for you", line: "Customers pick a time. It lands in your calendar." },
  { icon: Clock, title: "Answers 24/7", line: "Even at night and on weekends, in seconds." },
  { icon: Sparkles, title: "Knows your business", line: "Your services, prices, and area. Not a generic bot." },
];
