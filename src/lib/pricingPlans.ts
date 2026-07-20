/** Shared marketing plan ids + copy for landing pricing + “Start a project” wizard. */
export const PLAN_IDS = ["starter", "growth", "custom"] as const;
export type MarketingPlanId = (typeof PLAN_IDS)[number];

/** Stripe Payment Links with a 7-day free trial, per plan. */
export const PLAN_TRIAL_LINKS: Record<MarketingPlanId, string> = {
  starter: "https://buy.stripe.com/4gM6oz20eg8L88D9qods404",
  growth: "https://buy.stripe.com/6oU28jdIWf4H9cH9qods405",
  custom: "https://buy.stripe.com/eVq3cnfR47CfagL8mkds406",
};

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
    price: "$99",
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
    price: "$199",
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
    price: "$399",
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
