export const PREFERRED_FEATURE_OPTIONS = [
  { id: "catalog", label: "Product catalog & ERP sync" },
  { id: "blog", label: "Blog or news" },
  { id: "lead_forms", label: "Lead forms & CRM handoff" },
  { id: "multilingual", label: "Multi-language" },
  { id: "portal", label: "Customer / member portal" },
  { id: "analytics", label: "Analytics & dashboards" },
] as const;

/** Max lengths for onboarding form fields (enforced in UI + validation). */
export const ONBOARDING_FIELD_LIMITS = {
  fullName: 100,
  company: 120,
  phone: 40,
  industry: 100,
  erpInUse: 200,
  aiChatbotRequirements: 2000,
  otherPreferredFeatures: 1000,
  notes: 5000,
  websiteUrl: 2000,
  migrationRequirements: 5000,
} as const;

export const ONBOARDING_TIMELINE_OPTIONS = [
  { id: "asap", label: "ASAP / rush" },
  { id: "2_4_weeks", label: "2-4 weeks" },
  { id: "1_2_months", label: "1-2 months" },
  { id: "2_3_months", label: "2-3 months" },
  { id: "flexible", label: "Flexible / no set date" },
] as const;

export function onboardingTimelineLabel(id: string): string {
  return ONBOARDING_TIMELINE_OPTIONS.find(o => o.id === id)?.label ?? id;
}

export const ONBOARDING_AI_CHATBOT_MIN = 20;
