/**
 * Tiny rule-based fallback "AI" used when the remote /api/chat endpoint is
 * unreachable. Keeps the widget useful in the preview + in ZIP exports that
 * haven't wired up an OpenAI/Claude key yet, so clients always see a working
 * chatbot the moment they open the site.
 *
 * The brain parses the question, searches the ChatbotSiteData snapshot for
 * the best-matching content, and optionally suggests a structured action.
 */

import type { ChatbotSiteData } from "./siteData";

export interface ChatReply {
  message: string;
  action?: {
    id: string;
    args?: Record<string, string>;
  };
  suggestions?: string[];
}

const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s$]/g, " ").replace(/\s+/g, " ").trim();

const containsAny = (haystack: string, needles: string[]) =>
  needles.some(n => haystack.includes(n));

const scrollTargetAlias: Record<string, string> = {
  pricing: "pricing",
  price: "pricing",
  prices: "pricing",
  cost: "pricing",
  quote: "pricing",
  services: "services",
  service: "services",
  offer: "services",
  offers: "services",
  projects: "projects",
  portfolio: "projects",
  work: "projects",
  cases: "projects",
  team: "team",
  staff: "team",
  people: "team",
  about: "about",
  company: "about",
  who: "about",
  contact: "contact",
  reach: "contact",
  email: "contact",
  phone: "contact",
  call: "contact",
  hero: "hero",
  top: "hero",
  faq: "faq",
  question: "faq",
  questions: "faq",
  process: "process",
  how: "process",
};

function detectScrollTarget(text: string): string | null {
  const words = normalize(text).split(" ");
  for (const w of words) {
    if (scrollTargetAlias[w]) return scrollTargetAlias[w];
  }
  return null;
}

function bulletList(items: string[], max = 4) {
  return items.slice(0, max).map(i => `• ${i}`).join("\n");
}

/**
 * Given a user question + the chatbot site-data snapshot, produce a reply and
 * (optionally) a UI action. Pure / deterministic so it's safe to run on every
 * keystroke if needed.
 */
export function localReply(question: string, data: ChatbotSiteData): ChatReply {
  const q = normalize(question);

  // Greetings ---------------------------------------------------------------
  if (containsAny(q, ["hi", "hello", "hey", "yo", "hola", "sup"]) && q.length < 20) {
    return {
      message: `Hi! I'm the ${data.site.name} assistant. Ask me about our services, projects, pricing, or how to get in touch.`,
      suggestions: [
        "Tell me about your services",
        "Show me your projects",
        "How do I get a quote?",
        "Where are you located?",
      ],
    };
  }

  // Pricing / quote ---------------------------------------------------------
  if (containsAny(q, ["price", "pricing", "cost", "quote", "estimate", "budget", "how much"])) {
    const lines = [
      `Here's how pricing typically works at ${data.site.name}:`,
      data.pricing.summary,
    ];
    if (data.pricing.bullets.length) {
      lines.push("", bulletList(data.pricing.bullets));
    }
    lines.push("", "Want me to open the contact form so the team can put together a quote?");
    return {
      message: lines.join("\n"),
      action: { id: "open_contact_form" },
      suggestions: ["Open contact form", "Show services", "What projects have you done?"],
    };
  }

  // Services ----------------------------------------------------------------
  if (containsAny(q, ["service", "services", "what do you do", "offer", "capabilities"])) {
    const top = data.services.slice(0, 5).map(s => `• ${s.title}: ${s.description}`).join("\n");
    return {
      message: `${data.site.name} offers:\n${top}\n\nWant me to take you to the services page for the full list?`,
      action: { id: "navigate", args: { path: "/services" } },
      suggestions: ["Go to services page", "Show projects", "Open contact form"],
    };
  }

  // Projects / portfolio ----------------------------------------------------
  if (containsAny(q, ["project", "projects", "portfolio", "case", "work", "built", "delivered"])) {
    const top = data.projects.slice(0, 3).map(p => `• ${p.title} (${p.location || p.category})`).join("\n");
    return {
      message: `A few recent projects:\n${top || "Portfolio is coming soon."}\n\nWant the full portfolio?`,
      action: { id: "navigate", args: { path: "/projects" } },
      suggestions: ["Open portfolio", "Talk to the team", "Show pricing"],
    };
  }

  // Team --------------------------------------------------------------------
  if (containsAny(q, ["team", "staff", "people", "who runs", "founder", "ceo", "leadership"])) {
    const top = data.team.slice(0, 3).map(m => `• ${m.name}: ${m.role}`).join("\n");
    return {
      message: `Meet the team:\n${top}\n\nI can take you to the full team page.`,
      action: { id: "navigate", args: { path: "/team" } },
      suggestions: ["Open team page", "About the company", "Contact us"],
    };
  }

  // About -------------------------------------------------------------------
  if (containsAny(q, ["about", "company", "who are you", "history", "story"])) {
    const lines = [
      `${data.site.legalName}. ${data.site.tagline || data.about.intro}`,
    ];
    if (data.about.stats.length) {
      lines.push("", bulletList(data.about.stats.map(s => `${s.value} ${s.label}`)));
    }
    return {
      message: lines.join("\n"),
      action: { id: "navigate", args: { path: "/about" } },
      suggestions: ["Show values", "Meet the team", "Open contact form"],
    };
  }

  // FAQ ---------------------------------------------------------------------
  if (containsAny(q, ["faq", "question", "frequently asked"])) {
    const top = data.faq.slice(0, 3).map(f => `• ${f.question}`).join("\n");
    return {
      message: `Common questions I can answer:\n${top}\n\nAsk away, or I can open the full FAQ.`,
      action: { id: "navigate", args: { path: "/faq" } },
    };
  }

  // Contact -----------------------------------------------------------------
  if (containsAny(q, ["contact", "email", "phone", "call", "reach", "address", "location", "where"])) {
    const lines = [
      `You can reach ${data.site.name} directly:`,
      data.contact.phone ? `📞 ${data.contact.phone}` : "",
      data.contact.email ? `✉️ ${data.contact.email}` : "",
      data.contact.address ? `📍 ${data.contact.address}` : "",
      data.contact.hours ? `🕒 ${data.contact.hours}` : "",
    ].filter(Boolean);
    lines.push("", "Want me to open the contact form?");
    return {
      message: lines.join("\n"),
      action: { id: "open_contact_form" },
      suggestions: ["Open contact form", "Show services", "Show pricing"],
    };
  }

  // FAQ keyword match (deep search) ----------------------------------------
  const faqHit = data.faq.find(f => q && normalize(f.question).includes(q));
  if (faqHit) {
    return { message: `${faqHit.question}\n\n${faqHit.answer}` };
  }

  // Service keyword match ---------------------------------------------------
  const svcHit = data.services.find(s => q && normalize(s.title).split(" ").some(t => q.includes(t)));
  if (svcHit) {
    return {
      message: `${svcHit.title}. ${svcHit.description}`,
      action: { id: "navigate", args: { path: svcHit.detailPath } },
      suggestions: ["Open details", "Show pricing", "Contact team"],
    };
  }

  // Demo / walkthrough ------------------------------------------------------
  if (containsAny(q, ["demo", "walkthrough", "consultation", "book a call"])) {
    return {
      message: `Let's set up a consultation. Opening the demo booker…`,
      action: { id: "open_demo_modal" },
    };
  }

  // Scroll request ----------------------------------------------------------
  const target = detectScrollTarget(q);
  if (target) {
    return {
      message: `Jumping to the ${target} section.`,
      action: { id: "scroll_to_section", args: { target } },
    };
  }

  // Fallback ---------------------------------------------------------------
  const topLinks = data.pages
    .slice(0, 4)
    .map(p => `• ${p.label}: ${p.path}`)
    .join("\n");
  return {
    message: [
      `I'm not sure I have that exact answer yet, but here's what I can help with:`,
      "",
      topLinks,
      "",
      `Or I can open the contact form and a human will get back to you.`,
    ].join("\n"),
    action: { id: "open_contact_form" },
    suggestions: [
      "Open contact form",
      "Tell me about services",
      "Show pricing",
      "Show projects",
    ],
  };
}
