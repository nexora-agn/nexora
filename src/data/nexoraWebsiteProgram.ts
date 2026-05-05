/**
 * Structured copy for the print / “Save as PDF” Website Program collateral.
 * Mirrors the section flow of Contractor Gorilla–style program PDFs — adapted to Nexora offers.
 */
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Cloud,
  Cpu,
  Database,
  FileText,
  Globe2,
  Image as ImageIcon,
  Layers3,
  LineChart,
  MessageCircle,
  MonitorPlay,
  MonitorSmartphone,
  Palette,
  Plug2,
  Rocket,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { MARKETING_PLANS } from "@/lib/pricingPlans";
import { WHY_HEADLINE, WHY_SUB, whyStatStrip } from "@/data/whyChooseNexora";

export const WEBSITE_PROGRAM_PAGES = 9;

export const websiteProgramBrand = {
  programName: "Nexora website program",
  siteUrl: "nexora-agn.com",
  email: "info@nexora-agn.com",
  phoneDisplay: "+1 (888) 535-9177",
  telHref: "tel:+18885359177",
} as const;

export const websiteProgramCover = {
  titleLine1: "Thank you for your interest",
  titleLine2: "in our website services.",
  lede:
    "We build high-performing sites you can preview before you commit—paired with structured SEO thinking, integrations when you grow, and care plans that match how you operate.",
};

export const websiteProgramWhySection = {
  eyebrow: "Why Nexora AGN?",
  headline: WHY_HEADLINE,
  sub: WHY_SUB,
  /** Three proof-style stats ( Contractor Gorilla used three pillars on page 2). */
  pillars: whyStatStrip.slice(0, 3).map(s => ({
    headline: s.headline,
    body: s.subline,
  })),
};

/** One-line blurbs + icons for scannable program pages (print + screen). */
export type ProgramFeature = {
  title: string;
  tagline: string;
  icon: LucideIcon;
};

export type ProgramPartSection = {
  partLabel: string;
  title: string;
  features: ProgramFeature[];
};

export const websiteProgramPart1: ProgramPartSection = {
  partLabel: "Part 1",
  title: "Design, creation, and build",
  features: [
    {
      icon: Layers3,
      title: "Custom website",
      tagline: "Built around how you sell and where you operate—not a generic swap-in theme.",
    },
    {
      icon: Palette,
      title: "Design you approve",
      tagline: "We iterate on layout, nav, and hero pages until stakeholders sign off.",
    },
    {
      icon: Search,
      title: "SEO foundations",
      tagline: "IA, markup, and messaging aligned to how people actually search.",
    },
    {
      icon: MonitorSmartphone,
      title: "Fully responsive",
      tagline: "Phone, tablet, desktop—tested for clarity, speed, and solid CTAs.",
    },
    {
      icon: ImageIcon,
      title: "Imagery that fits",
      tagline: "Your shots plus curated stock placed where they build trust.",
    },
    {
      icon: Plug2,
      title: "Integrations path",
      tagline: "Forms, assistants, catalog—tighter ERP fit as you scale into Growth.",
    },
    {
      icon: FileText,
      title: "Your words, supported",
      tagline: "You supply copy or we collaborate on tight, production-ready drafts.",
    },
    {
      icon: Cpu,
      title: "Modern Nexora stack",
      tagline: "Maintainable tooling—no bloated plugin maze to babysit.",
    },
    {
      icon: LineChart,
      title: "Analytics-ready",
      tagline: "Events and attribution hooks so leads tie back to acquisition.",
    },
  ],
};

export const websiteProgramPart2: ProgramPartSection = {
  partLabel: "Part 2",
  title: "Hosting, reliability, updates, and guidance",
  features: [
    {
      icon: Cloud,
      title: "Hosting & SSL",
      tagline: "Starter/Growth bundle the baseline prospects expect before they enquire.",
    },
    {
      icon: Settings2,
      title: "Scoped upkeep",
      tagline: "Tiered monthly updates—predictable rhythm, fewer surprise invoices.",
    },
    {
      icon: Database,
      title: "Backups & hardening",
      tagline: "Recoverability and security posture wired in—not neglected hosting.",
    },
    {
      icon: Globe2,
      title: "DNS & migrations",
      tagline: "Clean handoffs—domains, redirects, tracking—without nuking mail.",
    },
    {
      icon: TrendingUp,
      title: "Growth rhythm",
      tagline: "SEO/ads setup and richer AI capacity when you graduate plans.",
    },
    {
      icon: MessageCircle,
      title: "Direct guidance",
      tagline: "Practical answers from the team shipping your stack—not a black-hole ticket desk.",
    },
  ],
};

export type WebsiteProgramProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const websiteProgramProcessSteps: WebsiteProgramProcessStep[] = [
  {
    step: 1,
    title: "Kickoff",
    description:
      "Structured brief: goals, timelines, approvals, logos, palettes, integrations, hosting/DNS snapshots.",
    icon: ClipboardList,
  },
  {
    step: 2,
    title: "Design",
    description: "We shape IA, typography, layouts, CTAs—then converge on the experience you approve.",
    icon: Palette,
  },
  {
    step: 3,
    title: "Build & preview",
    description:
      "We assemble the staged site behind your brand system so reviewers see the real UX early.",
    icon: MonitorPlay,
  },
  {
    step: 4,
    title: "Final polish",
    description:
      "Content passes, QA, redirects, instrumentation, accessibility checks—and training if you need edits.",
    icon: Sparkles,
  },
  {
    step: 5,
    title: "Launch day",
    description:
      "Go-live with observability tuned; Growth plans layer ongoing optimisation and integrations.",
    icon: Rocket,
  },
];

export type PricingRowPlan = {
  name: string;
  price: string;
  period: string;
  anchorLine: string;
  highlights: string[];
};

/** Rows for the collateral table — aligned with MARKETING_PLANS. */
export function websiteProgramPricingRows(): PricingRowPlan[] {
  return MARKETING_PLANS.map(p => ({
    name: p.name,
    price: p.price,
    period: p.period || "pricing",
    anchorLine: p.tagline,
    highlights: [...p.features],
  }));
}

export const websiteProgramComparisonIntro =
  "We consolidate strategy, engineering, integrations, hosting, SSL, revisions, analytics wiring, and clear ownership—versus piecing freelancers, generic hosts, ad-hoc tickets, and “SEO add-ons”. One accountable stack.";

export const websiteProgramComparisonRows: { fragmented: string; nexora: string }[] = [
  {
    fragmented: "Hosting, SSL, and DNS guidance purchased separately—or missing.",
    nexora: "Hosting & SSL bundled on Starter/Growth paths; pragmatic migration coaching.",
  },
  {
    fragmented: '"Unlimited edits" disguised upcharges—or no help at all.',
    nexora: "Tiered scoped updates aligned to your plan.",
  },
  {
    fragmented: "Security & backups shrugged onto your IT team.",
    nexora: "Baseline recovery + hardening stance embedded in Nexora delivery.",
  },
  {
    fragmented: "Messy integrations that break when SaaS/APIs drift.",
    nexora: "Purpose-built integrations and AI limits that scale—especially on Growth tier.",
  },
  {
    fragmented: '"SEO audits" dumped as PDF homework.',
    nexora: "SEO foundations coded into IA, markup, messaging, instrumentation—Growth adds deeper setup.",
  },
  {
    fragmented: 'Vanity traffic without attributable leads.',
    nexora: "Measurement hooks + landing discipline focused on actionable enquiries/bookings.",
  },
];

export const websiteProgramFaqs: { question: string; answer: string }[] = [
  {
    question: "Do we own what you build?",
    answer:
      "You own approved creative and content handed over per contract. Hosted subscription plans grant licensed use during an active arrangement; specifics are clarified in paperwork before kickoff.",
  },
  {
    question: "Who updates copy after launch?",
    answer:
      "Either your team—with training—or Nexora under the scoped upkeep aligned to your tier. Larger structural changes bump scope cleanly.",
  },
  {
    question: "How long does launch take?",
    answer:
      "Depends on approvals, integrations, and content readiness. Proposal phase delivers a deterministic schedule—you’re not guessing mid-build.",
  },
  {
    question: "What about AI Assistant limits?",
    answer:
      "Starter includes up to fifty assistant messages/month. Growth bumps to five thousand—with infrastructure suited to inbound volume.",
  },
];
