/** Shared marketing plan ids + copy for landing pricing + “Start a project” wizard. */
export const PLAN_IDS = ["starter", "growth", "custom"] as const;
export type MarketingPlanId = (typeof PLAN_IDS)[number];

export const MARKETING_PLANS: {
  id: MarketingPlanId;
  name: string;
  tagline: string;
  price: string;
  period: string;
  highlight: boolean;
  cta: string;
  features: string[];
}[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "A trustworthy company site and lead flow. Up fast, not a year-long build.",
    price: "$199",
    period: "/month",
    highlight: false,
    cta: "Book a demo",
    features: [
      "Web & mobile responsive",
      "Essential structure & key sections",
      "Lead capture & forms",
      "Hosting & SSL",
      "Monthly updates (scoped)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Your services, prices, and office systems stay matched to the website.",
    price: "$399",
    period: "/month",
    highlight: true,
    cta: "Book a demo",
    features: [
      "Web & mobile responsive",
      "Unlimited pages",
      "Catalog & pricing sync",
      "AI chatbot",
      "ERP integration",
      "SEO & Google Ads setup",
      "AI Infrastructure",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Site, mobile app, or custom software for your job. We scope it to what you actually run.",
    price: "Custom",
    period: "",
    highlight: false,
    cta: "Talk to us",
    features: [
      "Web & mobile responsive",
      "App Store & Google Play when your scope needs native apps",
      "Admin dashboard & workflows",
      "ERP integration",
      "Dedicated scoping, integrations & handoff",
    ],
  },
];

export type MarketingPlan = (typeof MARKETING_PLANS)[number];

export function planLabelById(id: string | undefined): string {
  if (!id) return "N/A";
  return MARKETING_PLANS.find(p => p.id === id)?.name ?? id;
}
