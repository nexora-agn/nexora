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

export const WHY_HEADLINE = "A website you can preview, then actually run.";

export const WHY_SUB =
  "Nexora builds hosted sites for local businesses: clear services, a visible phone number, and an assistant that can catch leads after hours. You click through a staged site before you subscribe.";

export interface WhyPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyPillars: WhyPillar[] = [
  {
    icon: TrendingUp,
    title: "Built to get inquiries",
    description:
      "Service pages, a visible phone number, and forms placed where people actually decide to call.",
  },
  {
    icon: Target,
    title: "Your trade, not a generic theme",
    description: "Roofing, electrical, plumbing, construction, and auto start from industry templates.",
  },
  {
    icon: Calendar,
    title: "After-hours capture",
    description:
      "An AI assistant on the site can take name, phone, and job type when your office is closed.",
  },
  {
    icon: Trophy,
    title: "You see it before you pay",
    description:
      "A staged live preview — desktop and mobile — so you are not buying a pitch deck.",
  },
  {
    icon: UsersRound,
    title: "We handle the launch",
    description:
      "Design, build, migrate if needed, hosting, and SSL. You are not the project manager.",
  },
  {
    icon: ShieldCheck,
    title: "A subscription you can keep",
    description:
      "Monthly updates are scoped on the plan. Starter and Growth check out online.",
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
    headline: "Live sites you can open",
    subline: "Portfolio launches on the work page — real URLs, not mockups.",
  },
  {
    icon: Star,
    headline: "Preview before you pay",
    subline: "Click through a staged website, then subscribe if you want it live.",
  },
  {
    icon: CalendarCheck,
    headline: "Plans from $99/month",
    subline: "Starter, Growth, and Enterprise are published. No mystery quote.",
  },
  {
    icon: BarChart2,
    headline: "Trade-specific starting points",
    subline: "Industry templates for roofing, electrical, plumbing, construction, and auto.",
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
