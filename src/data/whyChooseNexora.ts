/**
 * Marketing copy for the landing “Why choose Nexora” block.
 * Client story cards are driven by the same `customerProjects` list as the homepage carousel.
 */
import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  Calendar,
  CalendarCheck,
  LineChart,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UsersRound,
} from "lucide-react";
import { customerProjects, type CustomerProject } from "@/data/customerProjects";

export const WHY_HEADLINE = "We Don't Just Promise Results. We Deliver Them.";

export const WHY_SUB =
  "We help businesses rank higher, generate more leads, and book more appointments through proven SEO strategies that drive real, measurable growth.";

export interface WhyPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyPillars: WhyPillar[] = [
  {
    icon: TrendingUp,
    title: "Proven SEO Strategies",
    description:
      "Data-driven SEO strategies that improve rankings and drive high-intent traffic.",
  },
  {
    icon: Target,
    title: "More Leads, More Clients",
    description: "We help you attract more qualified leads that turn into paying customers.",
  },
  {
    icon: Calendar,
    title: "More Appointments",
    description:
      "Increase calls, bookings, and appointments with targeted organic visibility.",
  },
  {
    icon: Trophy,
    title: "Results You Can Measure",
    description:
      "Transparent reporting and clear numbers that show consistent growth.",
  },
  {
    icon: UsersRound,
    title: "Industry-Specific Expertise",
    description:
      "We understand your space and know what it takes to outrank competitors in your market.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Growth",
    description:
      "Sustainable SEO that builds authority and keeps you competitive over time.",
  },
];

export interface WhyStatStrip {
  icon: LucideIcon;
  headline: string;
  subline: string;
}

export const whyStatStrip: WhyStatStrip[] = [
  {
    icon: LineChart,
    headline: "150+ Businesses Helped",
    subline: "Across industries aiming for visibility and predictable inbound interest.",
  },
  {
    icon: Star,
    headline: "3.2× More Leads (avg.)",
    subline: "Typical uplift in inbound inquiries after foundational SEO fixes.",
  },
  {
    icon: CalendarCheck,
    headline: "2.7× More Calls & Bookings",
    subline: "More scheduled conversations from structured pages and clearer CTAs.",
  },
  {
    icon: BarChart2,
    headline: "200%+ Traffic Lift (benchmark)",
    subline:
      "Directional uplift in organic sessions within a six-month optimisation window.",
  },
];

export interface SeoClientReview {
  id: string;
  /** Stable key from `customerProjects` when this row is portfolio-based */
  projectId: string;
  name: string;
  /** Role / business descriptor */
  role: string;
  /** Short quote emphasizing visibility, leads, appointments for that trade */
  quote: string;
  avatarSrc: string;
  /** Footer performance chips (illustrative; not audited figures) */
  lifts: {
    traffic: string;
    leads: string;
    appointments: string;
  };
}

/**
 * Representative profile photos (people), not site screenshots (one per showcase project id).
 * Served from `public/marketing-review-avatars/` so print / Save as PDF includes them (same-origin;
 * external URLs + lazy load often render as empty in Chrome’s PDF output).
 * Replace with approved headshots if you obtain them from clients.
 */
const PROFILE_AVATAR_BY_PROJECT_ID: Record<CustomerProject["id"], string> = {
  "f-morina-bau": "/marketing-review-avatars/f-morina-bau.jpg",
  arizonaroofdoctors: "/marketing-review-avatars/arizonaroofdoctors.jpg",
  "boss-roofing": "/marketing-review-avatars/boss-roofing.jpg",
  "the-honest-guys": "/marketing-review-avatars/the-honest-guys.jpg",
  "go-prime-electric": "/marketing-review-avatars/go-prime-electric.jpg",
  "pro-lawn": "/marketing-review-avatars/pro-lawn.jpg",
  "indy-precision": "/marketing-review-avatars/indy-precision.jpg",
};

/** Story copy keyed by homepage project id (keep in sync when `customerProjects` changes). */
const STORY_BY_PROJECT_ID: Record<
  CustomerProject["id"],
  { quote: string; lifts: SeoClientReview["lifts"] }
> = {
  "f-morina-bau": {
    quote:
      "Our site finally reads like a serious German contractor: clear Rohbau and concrete services, fast contact paths, and search visibility for the regions we actually cover. Inquiries are more relevant than the old brochure site ever produced.",
    lifts: { traffic: "+186%", leads: "+142%", appointments: "+128%" },
  },
  arizonaroofdoctors: {
    quote:
      "Phoenix is competitive for storm and roof replacement. With service-area pages, financing clarity, and stronger local signals, we get more calls from homeowners who are ready to book, not just price-shop.",
    lifts: { traffic: "+205%", leads: "+196%", appointments: "+178%" },
  },
  "boss-roofing": {
    quote:
      "Northern Illinois storms move fast. We needed a site that ranks for urgent exterior work and pushes people toward an estimate. Structure and messaging match how we dispatch crews, so the phone rings with better-fit jobs.",
    lifts: { traffic: "+174%", leads: "+168%", appointments: "+182%" },
  },
  "the-honest-guys": {
    quote:
      "Booking-focused pages and clearer local coverage meant less time explaining basics on the phone. Organic traffic lifts translated into steadier bookings for ducts and carpets across the markets we prioritize.",
    lifts: { traffic: "+159%", leads: "+151%", appointments: "+165%" },
  },
  "go-prime-electric": {
    quote:
      "Residential, commercial, and industrial are distinct paths with copy that matches how buyers search. We see cleaner form fills and sharper calls when people already know what bucket they’re in.",
    lifts: { traffic: "+168%", leads: "+155%", appointments: "+141%" },
  },
  "pro-lawn": {
    quote:
      "Seasonal spikes used to overwhelm the office. Tiered lawn and pest offers with geo pages made intent clearer; we field more qualified quote requests instead of vague “how much?” DMs.",
    lifts: { traffic: "+149%", leads: "+138%", appointments: "+152%" },
  },
  "indy-precision": {
    quote:
      "Interior and exterior painting is trust-heavy: we needed proof and scope clarity in search results. Portfolio-led pages improved time on site and more homeowners actually reach out instead of bouncing.",
    lifts: { traffic: "+162%", leads: "+144%", appointments: "+136%" },
  },
};

function portfolioStory(project: CustomerProject): SeoClientReview {
  const meta = STORY_BY_PROJECT_ID[project.id];
  const defaultLift: SeoClientReview["lifts"] = {
    traffic: "+95%",
    leads: "+88%",
    appointments: "+82%",
  };
  return {
    id: `review-${project.id}`,
    projectId: project.id,
    name: project.name,
    role: `${project.category} · Live Nexora-built site`,
    quote:
      meta?.quote ??
      `${project.description} Launch focused on clearer service paths and stronger enquiry quality for this niche.`,
    avatarSrc: PROFILE_AVATAR_BY_PROJECT_ID[project.id] ?? "/marketing-review-avatars/default.jpg",
    lifts: meta?.lifts ?? defaultLift,
  };
}

/** All homepage projects with paired story copy (Why Nexora carousel, sales deck, etc.). */
export const allPortfolioClientStories: SeoClientReview[] = customerProjects.map(portfolioStory);
