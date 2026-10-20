/** Shared marketing plan ids + copy for landing pricing + “Start a project” wizard. */
export const PLAN_IDS = ["starter", "growth", "custom"] as const;
export type MarketingPlanId = (typeof PLAN_IDS)[number];

/** Opens a Checkout Session on the current plan price, with a 7-day free trial. */
export function trialCheckoutPath(planId: MarketingPlanId): string {
  return `/api/stripe-trial?plan=${encodeURIComponent(planId)}`;
}

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
    price: "$149",
    period: "/month",
    highlight: false,
    cta: "Subscribe",
    features: [
      "Web & mobile responsive",
      "Essential structure & key sections",
      "Lead capture & forms",
      "Hosting & SSL",
      "AI Chatbot with 500 messages",
      "Monthly updates (scoped)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Your services, prices, and office systems stay matched to the website.",
    price: "$299",
    period: "/month",
    highlight: true,
    cta: "Subscribe",
    features: [
      "Web & mobile responsive",
      "Unlimited pages",
      "Catalog & pricing sync",
      "AI Chatbot with 5,000 messages",
      "SEO & Google Ads setup",
      "AI Infrastructure",
    ],
  },
  {
    id: "custom",
    name: "Enterprise",
    tagline: "Higher limits, multi-location brands, and advanced integrations on a dedicated subscription.",
    price: "$499",
    period: "/month",
    highlight: false,
    cta: "Subscribe",
    features: [
      "Everything in Growth",
      "AI Chatbot with Unlimited messages",
      "Multi-site or multi-brand rollouts",
      "Advanced integrations & workflows",
      "Dedicated account onboarding",
    ],
  },
];

export type MarketingPlan = (typeof MARKETING_PLANS)[number];

export function planLabelById(id: string | undefined): string {
  if (!id) return "N/A";
  return MARKETING_PLANS.find(p => p.id === id)?.name ?? id;
}
