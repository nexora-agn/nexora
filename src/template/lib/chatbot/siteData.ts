/**
 * Chatbot site-data layer.
 *
 * The widget never reads the raw SiteContentContext directly — it reads from a
 * single structured snapshot so the same code works in three environments:
 *
 *   1. Admin preview — built live from SiteContentContext on every render.
 *   2. Exported ZIP (dev)  — same shape, hydrated from /chatbot/site-data.json
 *      during the first fetch; falls back to the in-memory snapshot until then.
 *   3. Exported ZIP (production) — /chatbot/site-data.json is written at export
 *      time by server/export-logic.mjs so the chatbot answers with the client's
 *      content the moment the site boots, with zero backend dependency.
 */

export interface ChatbotSiteData {
  generatedAt: string;
  site: {
    name: string;
    legalName: string;
    tagline: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
    officeHours: { days: string; hours: string }[];
    locations: string;
    mapEmbedUrl: string;
  };
  pages: {
    id: string;
    label: string;
    path: string;
    description: string;
  }[];
  about: {
    intro: string;
    stats: { label: string; value: string }[];
    values: { title: string; description: string }[];
    certifications: { label: string; sub?: string }[];
  };
  services: {
    id: string;
    title: string;
    description: string;
    detailPath: string;
  }[];
  serviceSections: {
    id: string;
    title: string;
    subtitle: string;
    body: string;
    inclusions: string[];
  }[];
  capabilities: {
    id: string;
    title: string;
    description: string;
    to?: string;
  }[];
  projects: {
    id: string;
    title: string;
    category: string;
    location: string;
    year: string | number;
    client: string;
    value: string;
    description: string;
    detailPath: string;
  }[];
  team: {
    id: string;
    name: string;
    role: string;
    bio: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  pricing: {
    summary: string;
    bullets: string[];
  };
  process: { label: string; description: string }[];
  hero: {
    headline: string;
    body: string;
    primaryCta?: { label: string; to: string };
    secondaryCta?: { label: string; to: string };
  };
  actions: {
    id: string;
    description: string;
    args?: Record<string, string>;
  }[];
}

export const AVAILABLE_ACTIONS: ChatbotSiteData["actions"] = [
  {
    id: "open_contact_form",
    description:
      "Open the contact form so the visitor can leave their details. Use when they want to reach out, request a quote, or schedule a call.",
  },
  {
    id: "open_demo_modal",
    description:
      "Open the demo / consultation modal. Use when the visitor wants a product demo or a guided walkthrough.",
  },
  {
    id: "scroll_to_section",
    description:
      "Scroll to a specific section of the current page. Prefer this over 'navigate' when the section is on the page the user is viewing.",
    args: {
      target:
        "hero | services | projects | pricing | testimonials | team | about | contact | faq | process",
    },
  },
  {
    id: "navigate",
    description:
      "Route the visitor to a different page of the website. Use this when the requested content lives on another page.",
    args: {
      path: "Any internal path from the `pages` array, e.g. /services, /contact, /projects",
    },
  },
  {
    id: "open_url",
    description:
      "Open an external URL in a new tab (only for links the site already exposes, e.g. social, phone, mailto).",
    args: {
      url: "Fully qualified URL",
    },
  },
];

// ---------------------------------------------------------------------------
// Builder — takes the live SiteContentState and collapses it into the shape
// the chatbot consumes. Keep this pure & defensive so it also works against
// raw JSON from /chatbot/site-data.json at runtime.
// ---------------------------------------------------------------------------

type LooseRecord = Record<string, unknown>;

function str(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function arr<T = LooseRecord>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function pick<T>(obj: unknown, key: string, fallback: T): T {
  if (!obj || typeof obj !== "object") return fallback;
  const v = (obj as LooseRecord)[key];
  return (v === undefined || v === null ? fallback : (v as T));
}

interface BuilderInput {
  company?: LooseRecord;
  siteTop?: LooseRecord;
  officeHours?: LooseRecord[];
  mapEmbedUrl?: string;
  navLinks?: LooseRecord[];
  services?: LooseRecord[];
  serviceSections?: LooseRecord[];
  capabilities?: LooseRecord[];
  projects?: LooseRecord[];
  team?: LooseRecord[];
  testimonials?: LooseRecord[];
  faqItems?: LooseRecord[];
  aboutStats?: LooseRecord[];
  coreValues?: LooseRecord[];
  certifications?: LooseRecord[];
  leadForm?: LooseRecord;
  processSteps?: LooseRecord[];
  homeHero?: LooseRecord;
  servicesPageIntro?: string;
}

export function buildChatbotSiteData(state: BuilderInput): ChatbotSiteData {
  const company = state.company ?? {};
  const siteTop = state.siteTop ?? {};
  const lead = state.leadForm ?? {};
  const hero = state.homeHero ?? {};

  const navLinks = arr<LooseRecord>(state.navLinks).map(link => ({
    id: str(link.path, "/").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "home",
    label: str(link.label),
    path: str(link.path, "/"),
    description: "",
  }));

  const services = arr<LooseRecord>(state.services).map(s => ({
    id: str(s.id),
    title: str(s.title),
    description: str(s.description),
    detailPath: `/services/${str(s.id)}`,
  }));

  const serviceSections = arr<LooseRecord>(state.serviceSections).map(s => ({
    id: str(s.id),
    title: str(s.title),
    subtitle: str(s.subtitle),
    body: Array.isArray(s.body) ? (s.body as unknown[]).map(v => str(v)).join("\n\n") : str(s.body),
    inclusions: arr<string>(s.inclusions).map(v => str(v)),
  }));

  const capabilities = arr<LooseRecord>(state.capabilities).map(c => ({
    id: str(c.id),
    title: str(c.title),
    description: str(c.description),
    to: str(c.to, "") || undefined,
  }));

  const projects = arr<LooseRecord>(state.projects).map(p => ({
    id: str(p.id),
    title: str(p.title),
    category: str(p.category),
    location: str(p.location),
    year: str(p.year),
    client: str(p.client),
    value: str(p.value),
    description: str(p.description),
    detailPath: `/projects/${str(p.id)}`,
  }));

  const team = arr<LooseRecord>(state.team).map(m => ({
    id: str(m.id),
    name: str(m.name),
    role: str(m.role),
    bio: str(m.bio),
  }));

  const testimonials = arr<LooseRecord>(state.testimonials).map(t => ({
    name: str(t.name),
    role: str(t.role),
    quote: str(t.quote),
  }));

  const faq = arr<LooseRecord>(state.faqItems).map(q => ({
    question: str(q.question),
    answer: str(q.answer),
  }));

  const about = {
    intro: str(company.tagline),
    stats: arr<LooseRecord>(state.aboutStats).map(s => ({
      label: str(s.label),
      value: str(s.value),
    })),
    values: arr<LooseRecord>(state.coreValues).map(v => ({
      title: str(v.title),
      description: str(v.description),
    })),
    certifications: arr<LooseRecord>(state.certifications).map(c => ({
      label: str(c.label),
      sub: str(c.sub, "") || undefined,
    })),
  };

  const pricing = {
    summary:
      "Every quote is project-specific. The team replies within one business day with next steps once you share your scope.",
    bullets: arr<string>(pick<string[]>(lead, "bullets", [])).map(v => str(v)),
  };

  const process = arr<LooseRecord>(state.processSteps).map(step => ({
    label: str(step.label),
    description: str(step.description),
  }));

  const heroObj = {
    headline: [str(hero.headlineBefore), str(hero.headlineHighlight), str(hero.headlineAfter)]
      .filter(Boolean)
      .join(" "),
    body: str(hero.body),
    primaryCta: hero.primaryCta
      ? { label: str((hero.primaryCta as LooseRecord).label), to: str((hero.primaryCta as LooseRecord).to) }
      : undefined,
    secondaryCta: hero.secondaryCta
      ? { label: str((hero.secondaryCta as LooseRecord).label), to: str((hero.secondaryCta as LooseRecord).to) }
      : undefined,
  };

  return {
    generatedAt: new Date().toISOString(),
    site: {
      name: str(company.name, "Our Company"),
      legalName: str(company.legalName, str(company.name, "Our Company")),
      tagline: str(company.tagline),
    },
    contact: {
      phone: str(company.phone),
      email: str(company.email),
      address: str(company.address),
      hours: str(company.hours),
      officeHours: arr<LooseRecord>(state.officeHours).map(h => ({
        days: str(h.days),
        hours: str(h.hours),
      })),
      locations: str(siteTop.locations),
      mapEmbedUrl: str(state.mapEmbedUrl),
    },
    pages: navLinks.length
      ? navLinks
      : [
          { id: "home", label: "Home", path: "/", description: "" },
          { id: "contact", label: "Contact", path: "/contact", description: "" },
        ],
    about,
    services,
    serviceSections,
    capabilities,
    projects,
    team,
    testimonials,
    faq,
    pricing,
    process,
    hero: heroObj,
    actions: AVAILABLE_ACTIONS,
  };
}
