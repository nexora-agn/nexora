/**
 * Shared chat handler used by the local dev server AND the Vercel serverless
 * function (api/chat.mjs). Kept dependency-free so it works out of the box
 * in every deployment target.
 *
 * Configuration (env vars, all optional):
 *   OPENAI_API_KEY       – if set, we call OpenAI's Chat Completions API
 *   OPENAI_MODEL         – defaults to "gpt-4o-mini"
 *   ANTHROPIC_API_KEY    – if set (and no OPENAI_API_KEY), call Claude
 *   ANTHROPIC_MODEL      – defaults to "claude-3-5-haiku-latest"
 *   FLOWISE_API_URL      – legacy Flowise backend
 *   FLOWISE_API_KEY      – bearer token for Flowise
 *
 * Without any of those, the handler falls back to a rule-based brain that
 * answers from the site-data snapshot the client sends. The front-end widget
 * contains the same rule-based brain, so the chatbot stays useful even if
 * this endpoint is misconfigured.
 *
 * Output shape:
 *   { message: string, action?: { id, args? }, suggestions?: string[], source }
 */

const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
const DEFAULT_ANTHROPIC_MODEL = "claude-3-5-haiku-latest";

const ACTION_IDS = [
  "open_contact_form",
  "open_demo_modal",
  "scroll_to_section",
  "navigate",
  "open_url",
];

function safeStr(v, fallback = "") {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return fallback;
}

function buildSystemPrompt(siteData) {
  const site = siteData?.site || {};
  const contact = siteData?.contact || {};
  const pages = Array.isArray(siteData?.pages) ? siteData.pages : [];
  const services = Array.isArray(siteData?.services) ? siteData.services : [];
  const projects = Array.isArray(siteData?.projects) ? siteData.projects : [];
  const team = Array.isArray(siteData?.team) ? siteData.team : [];
  const faq = Array.isArray(siteData?.faq) ? siteData.faq : [];
  const about = siteData?.about || {};
  const pricing = siteData?.pricing || {};
  const hero = siteData?.hero || {};

  const lines = [
    `You are the on-site AI assistant for ${safeStr(site.name, "the website")}.`,
    `Your job is to answer visitor questions using ONLY the information below. If a fact is not present, be honest and suggest the contact form.`,
    `Always stay on-topic about this business — no generic small talk, no unrelated advice.`,
    `Keep replies short (under ~80 words) unless the user explicitly asks for more detail. Use plain prose, no markdown headings.`,
    `When appropriate, suggest a single UI action by emitting a JSON object at the very end of the reply (after the natural-language answer) using this exact shape:`,
    `ACTION_JSON: {"action":{"id":"<one of ${ACTION_IDS.join(", ")}>","args":{...}}}`,
    `Use "scroll_to_section" to jump within the current page (target: hero|services|projects|pricing|testimonials|team|about|contact|faq|process).`,
    `Use "navigate" with args.path to send the user to another page from the pages list.`,
    `Use "open_contact_form" when they want to reach the team, get a quote, or leave details.`,
    `Use "open_demo_modal" when they want a demo / walkthrough / consultation.`,
    `Omit the ACTION_JSON line entirely if no action applies.`,
    ``,
    `### Company`,
    `Name: ${safeStr(site.name)} (${safeStr(site.legalName)})`,
    `Tagline: ${safeStr(site.tagline)}`,
    hero.headline ? `Hero: ${safeStr(hero.headline)} — ${safeStr(hero.body)}` : "",
    ``,
    `### Contact`,
    `Phone: ${safeStr(contact.phone, "—")}`,
    `Email: ${safeStr(contact.email, "—")}`,
    `Address: ${safeStr(contact.address, "—")}`,
    `Hours: ${safeStr(contact.hours, "—")}`,
    contact.locations ? `Locations: ${safeStr(contact.locations)}` : "",
    ``,
    `### Pages (use with navigate action)`,
    ...pages.map(p => `- ${safeStr(p.label)} → ${safeStr(p.path)}`),
    ``,
    `### Services`,
    ...services.map(s => `- ${safeStr(s.title)}: ${safeStr(s.description)} [${safeStr(s.detailPath)}]`),
    ``,
    `### Projects (${projects.length})`,
    ...projects.slice(0, 10).map(p => `- ${safeStr(p.title)} — ${safeStr(p.category)}, ${safeStr(p.location)} (${safeStr(p.year)})`),
    ``,
    `### Team`,
    ...team.slice(0, 8).map(m => `- ${safeStr(m.name)} — ${safeStr(m.role)}`),
    ``,
    `### About`,
    safeStr(about.intro),
    ...(Array.isArray(about.values) ? about.values.map(v => `- ${safeStr(v.title)}: ${safeStr(v.description)}`) : []),
    ``,
    `### Pricing`,
    safeStr(pricing.summary),
    ...(Array.isArray(pricing.bullets) ? pricing.bullets.map(b => `- ${safeStr(b)}`) : []),
    ``,
    `### FAQ`,
    ...faq.slice(0, 10).map(f => `Q: ${safeStr(f.question)}\nA: ${safeStr(f.answer)}`),
  ];

  return lines.filter(Boolean).join("\n");
}

function extractAction(text) {
  if (!text || typeof text !== "string") return { message: text || "", action: null };

  const actionLine = text.match(/ACTION_JSON:\s*(\{[\s\S]+?\})\s*$/);
  if (actionLine) {
    try {
      const payload = JSON.parse(actionLine[1]);
      const action = payload?.action || null;
      const message = text.slice(0, actionLine.index).trim();
      return { message: message || "", action };
    } catch {
      /* fall through */
    }
  }

  // Also accept a pure JSON reply of the form { "message": "...", "action": {...} }
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === "object" && typeof parsed.message === "string") {
        return { message: parsed.message, action: parsed.action || null };
      }
    } catch {
      /* ignore */
    }
  }

  return { message: text, action: null };
}

async function callOpenAI({ apiKey, model, systemPrompt, history, message }) {
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || ""),
    })),
    { role: "user", content: message },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || DEFAULT_OPENAI_MODEL,
      messages,
      temperature: 0.35,
      max_tokens: 400,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return String(data?.choices?.[0]?.message?.content || "");
}

async function callAnthropic({ apiKey, model, systemPrompt, history, message }) {
  const messages = [
    ...history.slice(-10).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || ""),
    })),
    { role: "user", content: message },
  ];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: model || DEFAULT_ANTHROPIC_MODEL,
      system: systemPrompt,
      max_tokens: 500,
      temperature: 0.35,
      messages,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Anthropic error ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  const chunk = Array.isArray(data?.content) ? data.content[0] : null;
  return String(chunk?.text || "");
}

async function callFlowise({ apiUrl, apiKey, message, history }) {
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ question: message, history }),
  });
  if (!res.ok) throw new Error(`Flowise error ${res.status}`);
  const data = await res.json();
  if (typeof data === "string") return data;
  return String(data?.text || data?.answer || data?.message || "");
}

function normalize(s) {
  return String(s || "").toLowerCase().replace(/[^\w\s$]/g, " ").replace(/\s+/g, " ").trim();
}

function localFallbackReply(message, siteData) {
  const q = normalize(message);
  const name = safeStr(siteData?.site?.name, "this company");

  if (!q) {
    return { message: `Hi! I'm the ${name} assistant. Ask me anything about our services, projects, or pricing.` };
  }

  const services = Array.isArray(siteData?.services) ? siteData.services : [];
  const faq = Array.isArray(siteData?.faq) ? siteData.faq : [];
  const projects = Array.isArray(siteData?.projects) ? siteData.projects : [];
  const contact = siteData?.contact || {};

  if (/(price|cost|quote|estimate|budget)/.test(q)) {
    return {
      message: `Every engagement at ${name} is priced to scope. Share a brief via the contact form and we reply within one business day with milestone pricing.`,
      action: { id: "open_contact_form" },
    };
  }
  if (/(service|offer|do you)/.test(q) && services.length) {
    const list = services.slice(0, 4).map(s => `• ${safeStr(s.title)}`).join("\n");
    return {
      message: `${name} offers:\n${list}\n\nI can take you to the full services page.`,
      action: { id: "navigate", args: { path: "/services" } },
    };
  }
  if (/(project|portfolio|work|case)/.test(q) && projects.length) {
    const list = projects.slice(0, 3).map(p => `• ${safeStr(p.title)} (${safeStr(p.location || p.category)})`).join("\n");
    return {
      message: `Recent projects:\n${list}`,
      action: { id: "navigate", args: { path: "/projects" } },
    };
  }
  if (/(contact|email|phone|call|reach|hours)/.test(q)) {
    return {
      message: [
        `You can reach ${name} at:`,
        contact.phone ? `Phone: ${safeStr(contact.phone)}` : "",
        contact.email ? `Email: ${safeStr(contact.email)}` : "",
        contact.address ? `Address: ${safeStr(contact.address)}` : "",
      ].filter(Boolean).join("\n"),
      action: { id: "open_contact_form" },
    };
  }

  for (const f of faq) {
    const question = normalize(f.question);
    if (question && (question.includes(q) || q.split(" ").some(w => w && question.includes(w)))) {
      return { message: `${safeStr(f.question)}\n\n${safeStr(f.answer)}` };
    }
  }

  return {
    message: `I'll need a bit more detail to answer that well. You can reach the ${name} team via the contact form and they'll follow up directly.`,
    action: { id: "open_contact_form" },
  };
}

export async function handleChatRequest({ message, history, siteData, env }) {
  const safeHistory = Array.isArray(history) ? history : [];
  const safeMessage = String(message || "").trim();
  if (!safeMessage) {
    return { message: "How can I help?", source: "noop" };
  }

  const systemPrompt = buildSystemPrompt(siteData || {});

  // Priority: OpenAI > Anthropic > Flowise > Local
  if (env.OPENAI_API_KEY) {
    try {
      const raw = await callOpenAI({
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL,
        systemPrompt,
        history: safeHistory,
        message: safeMessage,
      });
      const { message: msg, action } = extractAction(raw);
      return { message: msg || raw, action: action || undefined, source: "openai" };
    } catch (err) {
      console.warn("[chat] OpenAI failed, falling back:", err?.message || err);
    }
  }

  if (env.ANTHROPIC_API_KEY) {
    try {
      const raw = await callAnthropic({
        apiKey: env.ANTHROPIC_API_KEY,
        model: env.ANTHROPIC_MODEL,
        systemPrompt,
        history: safeHistory,
        message: safeMessage,
      });
      const { message: msg, action } = extractAction(raw);
      return { message: msg || raw, action: action || undefined, source: "anthropic" };
    } catch (err) {
      console.warn("[chat] Anthropic failed, falling back:", err?.message || err);
    }
  }

  if (env.FLOWISE_API_URL) {
    try {
      const raw = await callFlowise({
        apiUrl: env.FLOWISE_API_URL,
        apiKey: env.FLOWISE_API_KEY,
        message: safeMessage,
        history: safeHistory,
      });
      const { message: msg, action } = extractAction(raw);
      return { message: msg || raw, action: action || undefined, source: "flowise" };
    } catch (err) {
      console.warn("[chat] Flowise failed, falling back:", err?.message || err);
    }
  }

  const local = localFallbackReply(safeMessage, siteData);
  return { ...local, source: "local" };
}

export function resolveChatEnv() {
  return {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
    OPENAI_MODEL: process.env.OPENAI_MODEL || "",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
    ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL || "",
    FLOWISE_API_URL: process.env.FLOWISE_API_URL || "",
    FLOWISE_API_KEY: process.env.FLOWISE_API_KEY || "",
  };
}
