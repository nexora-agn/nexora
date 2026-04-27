import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, CheckCircle2, CreditCard, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  ONBOARDING_AI_CHATBOT_MIN,
  ONBOARDING_FIELD_LIMITS,
  ONBOARDING_TIMELINE_OPTIONS,
  onboardingTimelineLabel,
  PREFERRED_FEATURE_OPTIONS,
} from "@/lib/projectOnboardingConstants";
import { submitProjectRequest } from "@/lib/projectRequests";
import { getWorkEmailError, WORK_EMAIL_MAX_LENGTH } from "@/lib/validateWorkEmail";
import type { ProjectRequestPayload, ProjectRequestType } from "@/lib/supabase";
import { sendNexoraFormEmail } from "@/lib/sendFormEmails";
import { PlanCardBody, PlanPopularBadge } from "@/components/landing/PlanCardBody";
import { MARKETING_PLANS, PLAN_IDS, type MarketingPlanId } from "@/lib/pricingPlans";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

function isValidHttpUrl(input: string): boolean {
  const raw = input.trim();
  if (!raw) return false;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withScheme);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function getPhoneFieldError(raw: string): string | undefined {
  const s = raw.trim();
  if (!s) return "Add a phone number we can reach you on.";
  if (s.length < 6) return "Add a complete phone number.";
  if (s.length > ONBOARDING_FIELD_LIMITS.phone) {
    return `Use at most ${ONBOARDING_FIELD_LIMITS.phone} characters.`;
  }
  return;
}

const choiceCards: {
  type: ProjectRequestType;
  title: string;
  description: string;
  icon: typeof Sparkles;
  surfaceClass: string;
}[] = [
  {
    type: "new_website",
    title: "Create a Brand New Website",
    description: "Launch a tailored site with your brand, content, and integrations.",
    icon: Sparkles,
    surfaceClass: "bg-muted/15",
  },
  {
    type: "migrate",
    title: "Migrate Existing Website",
    description: "Move your current site and connect ERP, catalog, or AI where you need it.",
    icon: Globe,
    surfaceClass: "bg-card/80",
  },
];

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

function YesNoField({
  label,
  value,
  onChange,
  namePrefix,
  error,
}: {
  label: string;
  value: boolean | null;
  onChange: (next: boolean) => void;
  namePrefix: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <RadioGroup
        value={value === null ? undefined : value ? "yes" : "no"}
        onValueChange={v => onChange(v === "yes")}
        className={cn("flex flex-wrap gap-6", error && "rounded-md ring-1 ring-destructive/50 ring-offset-2")}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${namePrefix}-err` : undefined}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="yes" id={`${namePrefix}-yes`} />
          <Label htmlFor={`${namePrefix}-yes`} className="cursor-pointer font-normal">
            Yes
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="no" id={`${namePrefix}-no`} />
          <Label htmlFor={`${namePrefix}-no`} className="cursor-pointer font-normal">
            No
          </Label>
        </div>
      </RadioGroup>
      {error ? <FieldError id={`${namePrefix}-err`} message={error} /> : null}
    </div>
  );
}

function readInitialPlanFromLocation(): MarketingPlanId | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("plan");
  if (raw && (PLAN_IDS as readonly string[]).includes(raw)) {
    return raw as MarketingPlanId;
  }
  return null;
}

const ProjectOnboardingWizard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  /** When true, user used Back from “Path” to “Plan”. Don’t auto-advance to path again. */
  const skipAutoPathAfterBackFromPathStep = useRef(false);
  const [step, setStep] = useState<Step>(() => (readInitialPlanFromLocation() ? 2 : 1));
  const [choice, setChoice] = useState<ProjectRequestType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<MarketingPlanId | null>(() => readInitialPlanFromLocation());
  const [paymentPreference, setPaymentPreference] = useState<"stripe" | "paypal" | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [timeline, setTimeline] = useState("");
  const [industry, setIndustry] = useState("");
  const [erpIntegration, setErpIntegration] = useState<boolean | null>(null);
  const [newCurrentErpSystem, setNewCurrentErpSystem] = useState("");
  const [newAiChatbot, setNewAiChatbot] = useState<boolean | null>(null);
  const [newAiChatbotRequirements, setNewAiChatbotRequirements] = useState("");
  const [preferredFeatures, setPreferredFeatures] = useState<string[]>([]);
  const [otherPreferredFeatures, setOtherPreferredFeatures] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [erpSystem, setErpSystem] = useState("");
  const [erpHasApi, setErpHasApi] = useState<boolean | null>(null);
  const [buildApi, setBuildApi] = useState<boolean | null>(null);
  const [migrateAiChatbot, setMigrateAiChatbot] = useState<boolean | null>(null);
  const [migrateAiChatbotRequirements, setMigrateAiChatbotRequirements] = useState("");
  const [migrationRequirements, setMigrationRequirements] = useState("");
  const [migrateNotes, setMigrateNotes] = useState("");

  useEffect(() => {
    const raw = searchParams.get("plan");
    if (raw && (PLAN_IDS as readonly string[]).includes(raw)) {
      setSelectedPlan(raw as MarketingPlanId);
      if (step === 1 && !skipAutoPathAfterBackFromPathStep.current) {
        setStep(2);
      }
    }
  }, [searchParams, step]);

  const setPlanWithUrl = (id: MarketingPlanId) => {
    setSelectedPlan(id);
    setSearchParams({ plan: id }, { replace: true });
  };

  const clearError = (key: string) => {
    setFieldErrors(prev => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  /** On blur: validate a single field and merge into `fieldErrors` (so the user sees issues before “Continue”). */
  const setMergedFieldError = (key: string, message: string | undefined) => {
    setFieldErrors(prev => {
      const next = { ...prev };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  };

  const onFieldGroupBlur = (e: React.FocusEvent, commit: () => void) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    commit();
  };

  const resetFormFields = () => {
    setFullName("");
    setWorkEmail("");
    setPhone("");
    setCompany("");
    setTimeline("");
    setIndustry("");
    setErpIntegration(null);
    setNewCurrentErpSystem("");
    setNewAiChatbot(null);
    setNewAiChatbotRequirements("");
    setPreferredFeatures([]);
    setOtherPreferredFeatures("");
    setNewNotes("");
    setWebsiteUrl("");
    setErpSystem("");
    setErpHasApi(null);
    setBuildApi(null);
    setMigrateAiChatbot(null);
    setMigrateAiChatbotRequirements("");
    setMigrationRequirements("");
    setMigrateNotes("");
    setFieldErrors({});
    setPaymentPreference(null);
    setSelectedPlan(null);
  };

  const goBack = () => {
    if (step === 2) {
      skipAutoPathAfterBackFromPathStep.current = true;
      setStep(1);
      setChoice(null);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 5) {
      setStep(4);
    }
  };

  const pickChoice = (type: ProjectRequestType) => {
    setChoice(type);
    setStep(3);
  };

  const toggleFeature = (id: string) => {
    setPreferredFeatures(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const CONTACT_FORM_KEYS = [
    "ct-fullname",
    "ct-email",
    "ct-phone",
    "ct-company",
    "ct-timeline",
  ] as const;

  const getContactFieldError = (key: string): string | undefined => {
    switch (key) {
      case "ct-fullname": {
        const t = fullName.trim();
        if (!t) return "Add your full name.";
        if (t.length > ONBOARDING_FIELD_LIMITS.fullName) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.fullName} characters.`;
        }
        return;
      }
      case "ct-email": {
        return getWorkEmailError(workEmail) ?? undefined;
      }
      case "ct-phone": {
        return getPhoneFieldError(phone);
      }
      case "ct-company": {
        const c = company.trim();
        if (!c) return "Add your company name.";
        if (c.length > ONBOARDING_FIELD_LIMITS.company) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.company} characters.`;
        }
        return;
      }
      case "ct-timeline": {
        if (!timeline) return "Choose when you need the site or project done.";
        return;
      }
      default:
        return;
    }
  };

  const blurContactField = (key: (typeof CONTACT_FORM_KEYS)[number]) => {
    setMergedFieldError(key, getContactFieldError(key));
  };

  const runValidateContact = (): boolean => {
    const e: Record<string, string> = {};
    for (const key of CONTACT_FORM_KEYS) {
      const err = getContactFieldError(key);
      if (err) e[key] = err;
    }
    setFieldErrors(prev => {
      const next = { ...prev };
      for (const key of CONTACT_FORM_KEYS) {
        if (e[key]) next[key] = e[key];
        else delete next[key];
      }
      return next;
    });
    return Object.keys(e).length === 0;
  };

  const goToProjectDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!choice) return;
    if (!runValidateContact()) return;
    setStep(4);
  };

  const getNewFieldError = (key: string): string | undefined => {
    switch (key) {
      case "nw-industry": {
        const ind = industry.trim();
        if (!ind) return "Add your industry (e.g. commercial construction).";
        if (ind.length > ONBOARDING_FIELD_LIMITS.industry) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.industry} characters.`;
        }
        return;
      }
      case "nw-erp": {
        if (erpIntegration === null) return "Choose Yes or No for ERP integration.";
        return;
      }
      case "nw-erp-name": {
        if (erpIntegration !== true) return;
        const cur = newCurrentErpSystem.trim();
        if (!cur) return "Tell us which ERP you’re using (helps us plan the integration).";
        if (cur.length > ONBOARDING_FIELD_LIMITS.erpInUse) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.erpInUse} characters.`;
        }
        return;
      }
      case "nw-ai": {
        if (newAiChatbot === null) return "Choose Yes or No for an AI chatbot.";
        return;
      }
      case "nw-ai-req": {
        if (newAiChatbot !== true) return;
        const t = newAiChatbotRequirements.trim();
        if (!t) {
          return "Describe what the chatbot should do for your visitors (e.g. product Q&A, lead capture).";
        }
        if (t.length < ONBOARDING_AI_CHATBOT_MIN) {
          return `Add a bit more detail (at least ${ONBOARDING_AI_CHATBOT_MIN} characters).`;
        }
        if (t.length > ONBOARDING_FIELD_LIMITS.aiChatbotRequirements) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.aiChatbotRequirements} characters.`;
        }
        return;
      }
      case "nw-other-feat": {
        if (otherPreferredFeatures.length > ONBOARDING_FIELD_LIMITS.otherPreferredFeatures) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.otherPreferredFeatures} characters.`;
        }
        return;
      }
      case "nw-notes": {
        if (newNotes.length > ONBOARDING_FIELD_LIMITS.notes) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.notes} characters.`;
        }
        return;
      }
      default:
        return;
    }
  };

  const NEW_FORM_KEYS = [
    "nw-industry",
    "nw-erp",
    "nw-erp-name",
    "nw-ai",
    "nw-ai-req",
    "nw-other-feat",
    "nw-notes",
  ] as const;

  const blurNewField = (key: (typeof NEW_FORM_KEYS)[number]) => {
    setMergedFieldError(key, getNewFieldError(key));
  };

  const runValidateNew = (): boolean => {
    const e: Record<string, string> = {};
    for (const key of NEW_FORM_KEYS) {
      const err = getNewFieldError(key);
      if (err) e[key] = err;
    }
    setFieldErrors(prev => {
      const next = { ...prev };
      for (const key of NEW_FORM_KEYS) {
        if (e[key]) next[key] = e[key];
        else delete next[key];
      }
      return next;
    });
    return Object.keys(e).length === 0;
  };

  const getMigrateFieldError = (key: string): string | undefined => {
    switch (key) {
      case "mg-url": {
        const url = websiteUrl.trim();
        if (!url) return "Add your current website URL.";
        if (url.length > ONBOARDING_FIELD_LIMITS.websiteUrl) return "That URL is too long.";
        if (!isValidHttpUrl(url)) return "Enter a valid URL (e.g. https://yoursite.com).";
        return;
      }
      case "mg-erp": {
        const es = erpSystem.trim();
        if (!es) return "Tell us which ERP you use.";
        if (es.length > ONBOARDING_FIELD_LIMITS.erpInUse) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.erpInUse} characters.`;
        }
        return;
      }
      case "mg-api": {
        if (erpHasApi === null) return "Let us know if your ERP has an API.";
        return;
      }
      case "mg-build": {
        if (erpHasApi !== false) return;
        if (buildApi === null) return "Let us know if you need us to build an API.";
        return;
      }
      case "mg-ai": {
        if (migrateAiChatbot === null) return "Choose Yes or No for an AI chatbot.";
        return;
      }
      case "mg-ai-req": {
        if (migrateAiChatbot !== true) return;
        const t = migrateAiChatbotRequirements.trim();
        if (!t) return "Describe what the chatbot should do for your visitors.";
        if (t.length < ONBOARDING_AI_CHATBOT_MIN) {
          return `Add a bit more detail (at least ${ONBOARDING_AI_CHATBOT_MIN} characters).`;
        }
        if (t.length > ONBOARDING_FIELD_LIMITS.aiChatbotRequirements) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.aiChatbotRequirements} characters.`;
        }
        return;
      }
      case "mg-req": {
        if (migrationRequirements.length > ONBOARDING_FIELD_LIMITS.migrationRequirements) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.migrationRequirements} characters.`;
        }
        return;
      }
      case "mg-notes": {
        if (migrateNotes.length > ONBOARDING_FIELD_LIMITS.notes) {
          return `Use at most ${ONBOARDING_FIELD_LIMITS.notes} characters.`;
        }
        return;
      }
      default:
        return;
    }
  };

  const MIGRATE_FORM_KEYS = [
    "mg-url",
    "mg-erp",
    "mg-api",
    "mg-build",
    "mg-ai",
    "mg-ai-req",
    "mg-req",
    "mg-notes",
  ] as const;

  const blurMigrateField = (key: (typeof MIGRATE_FORM_KEYS)[number]) => {
    setMergedFieldError(key, getMigrateFieldError(key));
  };

  const runValidateMigrate = (): boolean => {
    const e: Record<string, string> = {};
    for (const key of MIGRATE_FORM_KEYS) {
      const err = getMigrateFieldError(key);
      if (err) e[key] = err;
    }
    setFieldErrors(prev => {
      const next = { ...prev };
      for (const key of MIGRATE_FORM_KEYS) {
        if (e[key]) next[key] = e[key];
        else delete next[key];
      }
      return next;
    });
    return Object.keys(e).length === 0;
  };

  const goToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!choice) return;
    const ok = choice === "new_website" ? runValidateNew() : runValidateMigrate();
    if (ok) setStep(5);
  };

  const runValidateReview = (): boolean => {
    if (!paymentPreference) {
      setFieldErrors(prev => ({ ...prev, payment: "Choose Stripe or PayPal for when we send checkout." }));
      return false;
    }
    setFieldErrors(prev => {
      if (!prev.payment) return prev;
      const next = { ...prev };
      delete next.payment;
      return next;
    });
    return true;
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!choice || !selectedPlan) {
      toast.error("Choose a plan first (use Back to return to the first step).");
      return;
    }
    if (!isSupabaseConfigured) {
      toast.error("This form is not connected yet. Please try again later.");
      return;
    }
    if (!runValidateContact()) {
      setStep(3);
      return;
    }
    if (choice === "new_website") {
      if (!runValidateNew()) {
        setStep(4);
        return;
      }
    } else {
      if (!runValidateMigrate()) {
        setStep(4);
        return;
      }
    }
    if (!runValidateReview()) return;

    setSubmitting(true);
    try {
      let request_type: ProjectRequestType;
      let payload: ProjectRequestPayload;

      if (choice === "new_website") {
        request_type = "new_website";
        payload = {
          full_name: fullName.trim(),
          contact_email: workEmail.trim(),
          contact_phone: phone.trim(),
          company: company.trim(),
          timeline,
          industry: industry.trim(),
          erp_integration: erpIntegration!,
          current_erp_system: erpIntegration! ? newCurrentErpSystem.trim() : null,
          ai_chatbot: newAiChatbot!,
          ai_chatbot_requirements: newAiChatbot! ? newAiChatbotRequirements.trim() : null,
          preferred_features: [...preferredFeatures],
          other_preferred_features: otherPreferredFeatures.trim(),
          additional_notes: newNotes.trim(),
          selected_plan: selectedPlan,
          payment_preference: paymentPreference!,
        };
      } else {
        const rawUrl = websiteUrl.trim();
        const website_url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
        request_type = "migrate";
        payload = {
          full_name: fullName.trim(),
          contact_email: workEmail.trim(),
          contact_phone: phone.trim(),
          company: company.trim(),
          timeline,
          website_url,
          erp_system: erpSystem.trim(),
          erp_has_api: erpHasApi!,
          build_api: erpHasApi === false ? buildApi! : null,
          ai_chatbot: migrateAiChatbot!,
          ai_chatbot_requirements: migrateAiChatbot! ? migrateAiChatbotRequirements.trim() : null,
          migration_requirements: migrationRequirements.trim(),
          additional_notes: migrateNotes.trim(),
          selected_plan: selectedPlan,
          payment_preference: paymentPreference!,
        };
      }

      await submitProjectRequest({ request_type, payload });

      try {
        await sendNexoraFormEmail({
          formType: "start_project",
          requestType: request_type,
          payload,
        });
      } catch (emailErr) {
        console.error(emailErr);
        toast.warning(
          `Your project was saved, but confirmation emails could not be sent. We'll still follow up at ${payload.contact_email}.`,
        );
      }

      setStep(6);
      setChoice(null);
      setSearchParams({}, { replace: true });
      resetFormFields();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setSearchParams({}, { replace: true });
    skipAutoPathAfterBackFromPathStep.current = false;
    setStep(1);
    setChoice(null);
    resetFormFields();
  };

  const planMeta = selectedPlan ? MARKETING_PLANS.find(p => p.id === selectedPlan) : null;
  const stepForRing: number = step > 5 ? 5 : step;

  return (
    <div className="w-full min-w-0">
      {step < 6 && (
        <div className="mb-8 flex flex-wrap items-center gap-2" aria-hidden>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="flex items-center gap-2 sm:gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  stepForRing > n
                    ? "bg-foreground text-background"
                    : stepForRing === n
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {stepForRing > n ? "✓" : n}
              </div>
              {n < 5 && <div className={cn("h-px w-4 sm:w-10", stepForRing > n ? "bg-foreground/40" : "bg-border")} />}
            </div>
          ))}
          <span className="ml-0.5 min-w-0 text-sm text-muted-foreground sm:ml-1">
            {step === 1 && "Plan"}
            {step === 2 && "Path"}
            {step === 3 && "Contact"}
            {step === 4 && "Details"}
            {step === 5 && "Review"}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-plan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full min-w-0 space-y-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              Same plans as the pricing page, full details below. Pick one, then we’ll ask whether this is a new build or a
              migration, and the rest of your project info.
            </p>
            <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MARKETING_PLANS.map(plan => {
                const active = selectedPlan === plan.id;
                const inverted = plan.highlight;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setPlanWithUrl(plan.id)}
                    className={cn(
                      "relative flex h-full min-h-0 w-full min-w-0 flex-col rounded-2xl border p-6 text-left shadow-sm transition-all sm:p-8",
                      inverted
                        ? "border-neutral-950 bg-neutral-950 text-white"
                        : "border-neutral-200 bg-white hover:border-neutral-300",
                      active
                        ? "z-[1] ring-2 ring-brand/90 ring-offset-2 ring-offset-background"
                        : "hover:shadow-sm",
                    )}
                  >
                    {plan.highlight ? <PlanPopularBadge darkBg /> : null}
                    <PlanCardBody plan={plan} inverted={inverted} evenTaglineBlock />
                    <div className="mt-auto flex min-h-[2.75rem] w-full shrink-0 flex-col justify-end pt-6">
                      <span
                        className={cn(
                          "flex min-h-[1.25rem] items-center gap-2 text-sm font-semibold",
                          inverted ? "text-brand" : "text-foreground",
                          !active && "invisible",
                        )}
                        aria-hidden={!active}
                      >
                        <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
                        Selected for this request
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                className="h-11 rounded-lg px-8 font-semibold"
                disabled={!selectedPlan}
                onClick={() => (selectedPlan ? setStep(2) : null)}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-path"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-5xl space-y-6"
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pick the option that best matches where you are today. You can add specifics in the next step.
            </p>
            <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              {choiceCards.map(card => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.type}
                    type="button"
                    onClick={() => pickChoice(card.type)}
                    className={cn(
                      "group relative flex flex-col rounded-2xl border-2 border-border/80 p-6 text-left shadow-sm transition-all",
                      card.surfaceClass,
                      "hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    )}
                  >
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background/80">
                      <Icon className="h-5 w-5 text-foreground" aria-hidden />
                    </span>
                    <span className="text-base font-semibold tracking-tight text-foreground">{card.title}</span>
                    <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</span>
                    <span className="mt-4 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Continue →
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 3 && choice && (
          <motion.form
            key="step-contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-2xl space-y-6"
            onSubmit={goToProjectDetails}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="space-y-6 rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Your contact</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Full name, how to reach you, your company, and when you need this. Then we’ll ask about your project.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="ct-fullname">Full name</Label>
                  <Input
                    id="ct-fullname"
                    autoComplete="name"
                    maxLength={ONBOARDING_FIELD_LIMITS.fullName}
                    value={fullName}
                    onChange={e => {
                      setFullName(e.target.value);
                      clearError("ct-fullname");
                    }}
                    onBlur={() => blurContactField("ct-fullname")}
                    placeholder="Jane Smith"
                    className={cn("h-11 rounded-lg", fieldErrors["ct-fullname"] && "border-destructive")}
                    aria-invalid={!!fieldErrors["ct-fullname"]}
                    aria-describedby={fieldErrors["ct-fullname"] ? "err-ct-fullname" : undefined}
                  />
                  <FieldError id="err-ct-fullname" message={fieldErrors["ct-fullname"]} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="ct-email">Work email</Label>
                  <Input
                    id="ct-email"
                    type="email"
                    autoComplete="email"
                    maxLength={WORK_EMAIL_MAX_LENGTH}
                    value={workEmail}
                    onChange={e => {
                      setWorkEmail(e.target.value);
                      clearError("ct-email");
                    }}
                    onBlur={() => blurContactField("ct-email")}
                    placeholder="you@company.com"
                    className={cn("h-11 rounded-lg", fieldErrors["ct-email"] && "border-destructive focus-visible:ring-destructive")}
                    aria-invalid={!!fieldErrors["ct-email"]}
                    aria-describedby={fieldErrors["ct-email"] ? "err-ct-email" : undefined}
                  />
                  <FieldError id="err-ct-email" message={fieldErrors["ct-email"]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ct-phone">Phone</Label>
                  <Input
                    id="ct-phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={ONBOARDING_FIELD_LIMITS.phone}
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      clearError("ct-phone");
                    }}
                    onBlur={() => blurContactField("ct-phone")}
                    placeholder="+1 …"
                    className={cn("h-11 rounded-lg", fieldErrors["ct-phone"] && "border-destructive")}
                    aria-invalid={!!fieldErrors["ct-phone"]}
                    aria-describedby={fieldErrors["ct-phone"] ? "err-ct-phone" : undefined}
                  />
                  <FieldError id="err-ct-phone" message={fieldErrors["ct-phone"]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ct-company">Company</Label>
                  <Input
                    id="ct-company"
                    autoComplete="organization"
                    maxLength={ONBOARDING_FIELD_LIMITS.company}
                    value={company}
                    onChange={e => {
                      setCompany(e.target.value);
                      clearError("ct-company");
                    }}
                    onBlur={() => blurContactField("ct-company")}
                    placeholder="Your company or organization"
                    className={cn("h-11 rounded-lg", fieldErrors["ct-company"] && "border-destructive")}
                    aria-invalid={!!fieldErrors["ct-company"]}
                    aria-describedby={fieldErrors["ct-company"] ? "err-ct-company" : undefined}
                  />
                  <FieldError id="err-ct-company" message={fieldErrors["ct-company"]} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ct-timeline">When do you need this done?</Label>
                <p className="text-xs text-muted-foreground">Helps us plan capacity and your launch.</p>
                <select
                  id="ct-timeline"
                  value={timeline}
                  onChange={e => {
                    setTimeline(e.target.value);
                    clearError("ct-timeline");
                  }}
                  onBlur={() => blurContactField("ct-timeline")}
                  className={cn(
                    "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    !timeline && "text-muted-foreground",
                    fieldErrors["ct-timeline"] && "border-destructive",
                  )}
                  aria-invalid={!!fieldErrors["ct-timeline"]}
                  aria-describedby={fieldErrors["ct-timeline"] ? "err-ct-timeline" : undefined}
                >
                  <option value="">Select a timeline *</option>
                  {ONBOARDING_TIMELINE_OPTIONS.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <FieldError id="err-ct-timeline" message={fieldErrors["ct-timeline"]} />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold">
              Continue to project details
            </Button>
          </motion.form>
        )}

        {step === 4 && choice === "new_website" && (
          <motion.form
            key="new"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-2xl space-y-6"
            onSubmit={goToReview}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="space-y-6 rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">New website</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us about your business and what you need.</p>
              </div>

              <h3 className="text-sm font-semibold text-foreground">Project details</h3>
              <div className="space-y-2">
                <Label htmlFor="nw-industry">Industry</Label>
                <Input
                  id="nw-industry"
                  value={industry}
                  maxLength={ONBOARDING_FIELD_LIMITS.industry}
                  onChange={e => {
                    setIndustry(e.target.value);
                    clearError("nw-industry");
                  }}
                  onBlur={() => blurNewField("nw-industry")}
                  className={cn("h-11 rounded-lg", fieldErrors["nw-industry"] && "border-destructive")}
                  placeholder="e.g. Commercial construction"
                  aria-invalid={!!fieldErrors["nw-industry"]}
                  aria-describedby={fieldErrors["nw-industry"] ? "err-nw-industry" : undefined}
                />
                <FieldError id="err-nw-industry" message={fieldErrors["nw-industry"]} />
              </div>

              <div
                onBlur={e =>
                  onFieldGroupBlur(e, () => {
                    blurNewField("nw-erp");
                  })
                }
              >
                <YesNoField
                  label="Do you need an ERP integration?"
                  value={erpIntegration}
                  onChange={v => {
                    setErpIntegration(v);
                    if (!v) {
                      setNewCurrentErpSystem("");
                      clearError("nw-erp-name");
                    }
                    clearError("nw-erp");
                  }}
                  namePrefix="nw-erp"
                  error={fieldErrors["nw-erp"]}
                />
              </div>
              {erpIntegration === true && (
                <div className="space-y-2">
                  <Label htmlFor="nw-erp-name">Which ERP are you currently using?</Label>
                  <Input
                    id="nw-erp-name"
                    value={newCurrentErpSystem}
                    maxLength={ONBOARDING_FIELD_LIMITS.erpInUse}
                    onChange={e => {
                      setNewCurrentErpSystem(e.target.value);
                      clearError("nw-erp-name");
                    }}
                    onBlur={() => blurNewField("nw-erp-name")}
                    className={cn("h-11 rounded-lg", fieldErrors["nw-erp-name"] && "border-destructive")}
                    placeholder="e.g. NetSuite, SAP, Microsoft Dynamics"
                    autoComplete="organization"
                    aria-invalid={!!fieldErrors["nw-erp-name"]}
                    aria-describedby={fieldErrors["nw-erp-name"] ? "err-nw-erp-name" : undefined}
                  />
                  <FieldError id="err-nw-erp-name" message={fieldErrors["nw-erp-name"]} />
                </div>
              )}
              <div
                onBlur={e =>
                  onFieldGroupBlur(e, () => {
                    blurNewField("nw-ai");
                  })
                }
              >
                <YesNoField
                  label="Do you need an AI chatbot?"
                  value={newAiChatbot}
                  onChange={v => {
                    setNewAiChatbot(v);
                    if (!v) {
                      setNewAiChatbotRequirements("");
                      clearError("nw-ai-req");
                    }
                    clearError("nw-ai");
                  }}
                  namePrefix="nw-ai"
                  error={fieldErrors["nw-ai"]}
                />
              </div>
              {newAiChatbot === true && (
                <div className="space-y-2">
                  <Label htmlFor="nw-ai-req">What should the chatbot do?</Label>
                  <p className="text-xs text-muted-foreground">
                    e.g. answer product questions, book demos, or capture leads. A few sentences is enough to start.
                  </p>
                  <Textarea
                    id="nw-ai-req"
                    value={newAiChatbotRequirements}
                    maxLength={ONBOARDING_FIELD_LIMITS.aiChatbotRequirements}
                    onChange={e => {
                      setNewAiChatbotRequirements(e.target.value);
                      clearError("nw-ai-req");
                    }}
                    onBlur={() => blurNewField("nw-ai-req")}
                    placeholder="Describe the role you want the chatbot to play on your site."
                    className={cn(
                      "min-h-[120px] resize-y rounded-lg",
                      fieldErrors["nw-ai-req"] && "border-destructive",
                    )}
                    aria-invalid={!!fieldErrors["nw-ai-req"]}
                    aria-describedby={fieldErrors["nw-ai-req"] ? "err-nw-ai-req" : undefined}
                  />
                  <p className="text-xs text-muted-foreground" aria-hidden>
                    {newAiChatbotRequirements.length}/{ONBOARDING_FIELD_LIMITS.aiChatbotRequirements}
                  </p>
                  <FieldError id="err-nw-ai-req" message={fieldErrors["nw-ai-req"]} />
                </div>
              )}

              <div className="space-y-3">
                <Label>Preferred features</Label>
                <p className="text-xs text-muted-foreground">Select any that apply.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PREFERRED_FEATURE_OPTIONS.map(opt => (
                    <label
                      key={opt.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/60 bg-background/50 p-3 text-sm hover:bg-muted/30"
                    >
                      <Checkbox
                        checked={preferredFeatures.includes(opt.id)}
                        onCheckedChange={() => toggleFeature(opt.id)}
                        className="mt-0.5"
                        id={`feat-${opt.id}`}
                      />
                      <span className="leading-snug">{opt.label}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2 pt-1">
                  <Label htmlFor="nw-other-feat">Other features (optional)</Label>
                  <p className="text-xs text-muted-foreground">Add anything not listed above.</p>
                  <Textarea
                    id="nw-other-feat"
                    value={otherPreferredFeatures}
                    maxLength={ONBOARDING_FIELD_LIMITS.otherPreferredFeatures}
                    onChange={e => {
                      setOtherPreferredFeatures(e.target.value);
                      clearError("nw-other-feat");
                    }}
                    onBlur={() => blurNewField("nw-other-feat")}
                    placeholder="e.g. appointment scheduling, custom calculators…"
                    className={cn("min-h-[88px] resize-y rounded-lg", fieldErrors["nw-other-feat"] && "border-destructive")}
                    aria-invalid={!!fieldErrors["nw-other-feat"]}
                    aria-describedby={fieldErrors["nw-other-feat"] ? "err-nw-other-feat" : undefined}
                  />
                  <p className="text-xs text-muted-foreground" aria-hidden>
                    {otherPreferredFeatures.length}/{ONBOARDING_FIELD_LIMITS.otherPreferredFeatures}
                  </p>
                  <FieldError id="err-nw-other-feat" message={fieldErrors["nw-other-feat"]} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nw-notes">Additional notes</Label>
                <Textarea
                  id="nw-notes"
                  value={newNotes}
                  maxLength={ONBOARDING_FIELD_LIMITS.notes}
                  onChange={e => {
                    setNewNotes(e.target.value);
                    clearError("nw-notes");
                  }}
                  onBlur={() => blurNewField("nw-notes")}
                  placeholder="Timeline, stakeholders, or anything else we should know."
                  className={cn("min-h-[100px] resize-y rounded-lg", fieldErrors["nw-notes"] && "border-destructive")}
                  aria-invalid={!!fieldErrors["nw-notes"]}
                  aria-describedby={fieldErrors["nw-notes"] ? "err-nw-notes" : undefined}
                />
                <FieldError id="err-nw-notes" message={fieldErrors["nw-notes"]} />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold">
              Continue to review
            </Button>
          </motion.form>
        )}

        {step === 4 && choice === "migrate" && (
          <motion.form
            key="migrate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-2xl space-y-6"
            onSubmit={goToReview}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="space-y-6 rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Migration</h2>
                <p className="mt-1 text-sm text-muted-foreground">Help us understand your current stack and goals.</p>
              </div>

              <h3 className="text-sm font-semibold text-foreground">Current site &amp; systems</h3>
              <div className="space-y-2">
                <Label htmlFor="mg-url">Current website URL</Label>
                <Input
                  id="mg-url"
                  type="url"
                  value={websiteUrl}
                  maxLength={ONBOARDING_FIELD_LIMITS.websiteUrl}
                  onChange={e => {
                    setWebsiteUrl(e.target.value);
                    clearError("mg-url");
                  }}
                  onBlur={() => blurMigrateField("mg-url")}
                  className={cn("h-11 rounded-lg", fieldErrors["mg-url"] && "border-destructive")}
                  placeholder="https://example.com"
                  aria-invalid={!!fieldErrors["mg-url"]}
                  aria-describedby={fieldErrors["mg-url"] ? "err-mg-url" : undefined}
                />
                <FieldError id="err-mg-url" message={fieldErrors["mg-url"]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mg-erp">What ERP system are you using?</Label>
                <Input
                  id="mg-erp"
                  value={erpSystem}
                  maxLength={ONBOARDING_FIELD_LIMITS.erpInUse}
                  onChange={e => {
                    setErpSystem(e.target.value);
                    clearError("mg-erp");
                  }}
                  onBlur={() => blurMigrateField("mg-erp")}
                  className={cn("h-11 rounded-lg", fieldErrors["mg-erp"] && "border-destructive")}
                  placeholder="e.g. NetSuite, SAP, custom"
                  aria-invalid={!!fieldErrors["mg-erp"]}
                  aria-describedby={fieldErrors["mg-erp"] ? "err-mg-erp" : undefined}
                />
                <FieldError id="err-mg-erp" message={fieldErrors["mg-erp"]} />
              </div>

              <div
                onBlur={e =>
                  onFieldGroupBlur(e, () => {
                    blurMigrateField("mg-api");
                  })
                }
              >
                <YesNoField
                  label="Does your ERP have an existing API?"
                  value={erpHasApi}
                  onChange={v => {
                    setErpHasApi(v);
                    if (v) setBuildApi(null);
                    clearError("mg-api");
                  }}
                  namePrefix="mg-api"
                  error={fieldErrors["mg-api"]}
                />
              </div>

              {erpHasApi === false && (
                <div
                  onBlur={e =>
                    onFieldGroupBlur(e, () => {
                      blurMigrateField("mg-build");
                    })
                  }
                >
                  <YesNoField
                    label="Do you need us to build the API?"
                    value={buildApi}
                    onChange={v => {
                      setBuildApi(v);
                      clearError("mg-build");
                    }}
                    namePrefix="mg-build-api"
                    error={fieldErrors["mg-build"]}
                  />
                </div>
              )}

              <div
                onBlur={e =>
                  onFieldGroupBlur(e, () => {
                    blurMigrateField("mg-ai");
                  })
                }
              >
                <YesNoField
                  label="Do you need an AI chatbot?"
                  value={migrateAiChatbot}
                  onChange={v => {
                    setMigrateAiChatbot(v);
                    if (!v) {
                      setMigrateAiChatbotRequirements("");
                      clearError("mg-ai-req");
                    }
                    clearError("mg-ai");
                  }}
                  namePrefix="mg-ai"
                  error={fieldErrors["mg-ai"]}
                />
              </div>
              {migrateAiChatbot === true && (
                <div className="space-y-2">
                  <Label htmlFor="mg-ai-req">What should the chatbot do?</Label>
                  <p className="text-xs text-muted-foreground">Describe the role and goals so we can scope it with your migration.</p>
                  <Textarea
                    id="mg-ai-req"
                    value={migrateAiChatbotRequirements}
                    maxLength={ONBOARDING_FIELD_LIMITS.aiChatbotRequirements}
                    onChange={e => {
                      setMigrateAiChatbotRequirements(e.target.value);
                      clearError("mg-ai-req");
                    }}
                    onBlur={() => blurMigrateField("mg-ai-req")}
                    placeholder="Describe what the chatbot should do for your visitors."
                    className={cn(
                      "min-h-[120px] resize-y rounded-lg",
                      fieldErrors["mg-ai-req"] && "border-destructive",
                    )}
                    aria-invalid={!!fieldErrors["mg-ai-req"]}
                    aria-describedby={fieldErrors["mg-ai-req"] ? "err-mg-ai-req" : undefined}
                  />
                  <p className="text-xs text-muted-foreground" aria-hidden>
                    {migrateAiChatbotRequirements.length}/{ONBOARDING_FIELD_LIMITS.aiChatbotRequirements}
                  </p>
                  <FieldError id="err-mg-ai-req" message={fieldErrors["mg-ai-req"]} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="mg-req">Any specific migration requirements</Label>
                <Textarea
                  id="mg-req"
                  value={migrationRequirements}
                  maxLength={ONBOARDING_FIELD_LIMITS.migrationRequirements}
                  onChange={e => {
                    setMigrationRequirements(e.target.value);
                    clearError("mg-req");
                  }}
                  onBlur={() => blurMigrateField("mg-req")}
                  placeholder="URLs to preserve, integrations, content, SEO concerns…"
                  className={cn("min-h-[100px] resize-y rounded-lg", fieldErrors["mg-req"] && "border-destructive")}
                  aria-invalid={!!fieldErrors["mg-req"]}
                  aria-describedby={fieldErrors["mg-req"] ? "err-mg-req" : undefined}
                />
                <FieldError id="err-mg-req" message={fieldErrors["mg-req"]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mg-notes">Additional notes</Label>
                <Textarea
                  id="mg-notes"
                  value={migrateNotes}
                  maxLength={ONBOARDING_FIELD_LIMITS.notes}
                  onChange={e => {
                    setMigrateNotes(e.target.value);
                    clearError("mg-notes");
                  }}
                  onBlur={() => blurMigrateField("mg-notes")}
                  placeholder="Anything else we should know."
                  className={cn("min-h-[88px] resize-y rounded-lg", fieldErrors["mg-notes"] && "border-destructive")}
                  aria-invalid={!!fieldErrors["mg-notes"]}
                  aria-describedby={fieldErrors["mg-notes"] ? "err-mg-notes" : undefined}
                />
                <FieldError id="err-mg-notes" message={fieldErrors["mg-notes"]} />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold">
              Continue to review
            </Button>
          </motion.form>
        )}

        {step === 5 && choice && (
          <motion.form
            key="step-review"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-3xl space-y-6"
            onSubmit={handleFinalSubmit}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight">Review &amp; send</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quick summary of what you’re sending. Full details stay in your request for our team. Choose how you’ll pay, then
                submit.
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Plan</dt>
                  <dd className="text-right font-medium text-foreground">{planMeta?.name ?? "N/A"}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Project</dt>
                  <dd className="text-right font-medium text-foreground">
                    {choice === "new_website" ? "New website" : "Migration"}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-3 border-b border-border/60 pb-3">
                  <dt className="shrink-0 text-muted-foreground">Contact</dt>
                  <dd className="max-w-[min(100%,20rem)] text-right text-sm">
                    <div className="font-medium text-foreground">
                      {fullName.trim() || "N/A"}
                      {company.trim() ? <span className="text-muted-foreground"> · {company.trim()}</span> : null}
                    </div>
                    <div className="mt-0.5 break-all text-xs text-muted-foreground">
                      {workEmail}
                      {phone.trim() ? <span> · {phone.trim()}</span> : null}
                    </div>
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Timeline</dt>
                  <dd className="text-right font-medium text-foreground">
                    {timeline ? onboardingTimelineLabel(timeline) : "N/A"}
                  </dd>
                </div>
                {choice === "new_website" && (
                  <>
                    <div className="flex flex-wrap justify-between gap-2 border-b border-border/60 pb-3">
                      <dt className="text-muted-foreground">Industry</dt>
                      <dd className="max-w-[min(100%,18rem)] text-right font-medium text-foreground">{industry.trim() || "N/A"}</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-3 border-b border-border/60 pb-3">
                      <dt className="shrink-0 text-muted-foreground">Scope</dt>
                      <dd className="max-w-[min(100%,20rem)] text-right text-sm font-medium text-foreground">
                        {[
                          erpIntegration
                            ? newCurrentErpSystem.trim()
                              ? `ERP: ${newCurrentErpSystem.trim()}`
                              : "ERP integration"
                            : "No ERP",
                          newAiChatbot ? "AI chatbot" : "No chatbot",
                          (preferredFeatures.length > 0 || otherPreferredFeatures.trim() || newNotes.trim()) && "More in full request",
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </dd>
                    </div>
                  </>
                )}
                {choice === "migrate" && (
                  <>
                    <div className="flex flex-wrap justify-between gap-3 border-b border-border/60 pb-3">
                      <dt className="shrink-0 text-muted-foreground">Current site</dt>
                      <dd className="max-w-[min(100%,20rem)] break-all text-right text-sm font-medium text-foreground">
                        {websiteUrl.trim()
                          ? /^https?:\/\//i.test(websiteUrl.trim())
                            ? websiteUrl.trim()
                            : `https://${websiteUrl.trim()}`
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-3 border-b border-border/60 pb-3">
                      <dt className="shrink-0 text-muted-foreground">Stack</dt>
                      <dd className="max-w-[min(100%,20rem)] text-right text-sm font-medium text-foreground">
                        {[erpSystem.trim() || "N/A", migrateAiChatbot ? "AI chatbot" : "No chatbot"].join(" · ")}
                      </dd>
                    </div>
                  </>
                )}
              </dl>

              <p className="mt-6 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                Your plan activates once the site is finished and you sign off. No charge until then. We only move forward
                when you’re happy.
              </p>

              <div className="mt-6 space-y-3">
                <Label className="text-foreground">Payment (after we review your request)</Label>
                <p className="text-xs text-muted-foreground">
                  Card payments will use Stripe; PayPal is available too. We’ll connect live checkout when your project is ready.
                  This just records your preference.
                </p>
                <div
                  onBlur={e =>
                    onFieldGroupBlur(e, () => {
                      setMergedFieldError(
                        "payment",
                        !paymentPreference ? "Choose Stripe or PayPal for when we send checkout." : undefined,
                      );
                    })
                  }
                >
                  <RadioGroup
                    value={paymentPreference ?? ""}
                    onValueChange={v => {
                      setPaymentPreference(v as "stripe" | "paypal");
                      clearError("payment");
                    }}
                    className={cn("flex flex-col gap-3 sm:gap-4", fieldErrors.payment && "rounded-md p-1 ring-1 ring-destructive/50")}
                  >
                    <label
                      htmlFor="pay-stripe"
                      className="flex w-full max-w-md cursor-pointer items-center gap-3 rounded-lg border border-border/70 bg-background/40 px-3 py-2.5"
                    >
                      <RadioGroupItem value="stripe" id="pay-stripe" className="shrink-0" />
                      <span className="flex min-w-0 flex-1 items-center gap-2 font-medium text-foreground">
                        <CreditCard className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                        Card (Stripe)
                      </span>
                    </label>
                    <label
                      htmlFor="pay-paypal"
                      className="flex w-full max-w-md cursor-pointer items-center gap-3 rounded-lg border border-border/70 bg-background/40 px-3 py-2.5"
                    >
                      <RadioGroupItem value="paypal" id="pay-paypal" className="shrink-0" />
                      <span className="font-normal text-foreground">PayPal</span>
                    </label>
                  </RadioGroup>
                </div>
                <FieldError message={fieldErrors.payment} />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit request"}
            </Button>
          </motion.form>
        )}

        {step === 5 && !choice && (
          <div className="text-sm text-destructive">Session expired.{" "}
            <button type="button" className="underline" onClick={startOver}>
              Start over
            </button>
          </div>
        )}

        {step === 6 && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto flex w-full max-w-lg flex-col items-center rounded-2xl border border-border/70 bg-card/40 px-6 py-14 text-center shadow-sm"
            role="status"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden />
            </div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">Request received</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Thank you. Our team will review your request and follow up at the email you provided.
            </p>
            <Button type="button" variant="outline" className="mt-8 rounded-lg" onClick={startOver}>
              Start another request
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectOnboardingWizard;
