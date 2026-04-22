import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/supabase";
import { PREFERRED_FEATURE_OPTIONS } from "@/lib/projectOnboardingConstants";
import { submitProjectRequest } from "@/lib/projectRequests";
import type { ProjectRequestType } from "@/lib/supabase";
import { toast } from "sonner";

type Step = 1 | 2 | 3;

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

function YesNoField({
  label,
  value,
  onChange,
  namePrefix,
}: {
  label: string;
  value: boolean | null;
  onChange: (next: boolean) => void;
  namePrefix: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <RadioGroup
        value={value === null ? undefined : value ? "yes" : "no"}
        onValueChange={v => onChange(v === "yes")}
        className="flex flex-wrap gap-6"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="yes" id={`${namePrefix}-yes`} />
          <Label htmlFor={`${namePrefix}-yes`} className="font-normal cursor-pointer">
            Yes
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="no" id={`${namePrefix}-no`} />
          <Label htmlFor={`${namePrefix}-no`} className="font-normal cursor-pointer">
            No
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

const ProjectOnboardingWizard = () => {
  const [step, setStep] = useState<Step>(1);
  const [choice, setChoice] = useState<ProjectRequestType | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [newContactEmail, setNewContactEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [erpIntegration, setErpIntegration] = useState<boolean | null>(null);
  const [newAiChatbot, setNewAiChatbot] = useState<boolean | null>(null);
  const [preferredFeatures, setPreferredFeatures] = useState<string[]>([]);
  const [newNotes, setNewNotes] = useState("");

  const [migrateContactEmail, setMigrateContactEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [erpSystem, setErpSystem] = useState("");
  const [erpHasApi, setErpHasApi] = useState<boolean | null>(null);
  const [buildApi, setBuildApi] = useState<boolean | null>(null);
  const [migrateAiChatbot, setMigrateAiChatbot] = useState<boolean | null>(null);
  const [migrationRequirements, setMigrationRequirements] = useState("");
  const [migrateNotes, setMigrateNotes] = useState("");

  const resetForms = () => {
    setNewContactEmail("");
    setBusinessName("");
    setIndustry("");
    setErpIntegration(null);
    setNewAiChatbot(null);
    setPreferredFeatures([]);
    setNewNotes("");
    setMigrateContactEmail("");
    setWebsiteUrl("");
    setErpSystem("");
    setErpHasApi(null);
    setBuildApi(null);
    setMigrateAiChatbot(null);
    setMigrationRequirements("");
    setMigrateNotes("");
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setChoice(null);
    }
  };

  const pickChoice = (type: ProjectRequestType) => {
    setChoice(type);
    setStep(2);
  };

  const toggleFeature = (id: string) => {
    setPreferredFeatures(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const validateNew = (): string | null => {
    if (!newContactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContactEmail.trim())) {
      return "Please enter a valid work email.";
    }
    if (!businessName.trim()) return "Business name is required.";
    if (!industry.trim()) return "Industry is required.";
    if (erpIntegration === null) return "Please indicate whether you need ERP integration.";
    if (newAiChatbot === null) return "Please indicate whether you need an AI chatbot.";
    return null;
  };

  const validateMigrate = (): string | null => {
    if (!migrateContactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(migrateContactEmail.trim())) {
      return "Please enter a valid work email.";
    }
    if (!websiteUrl.trim()) return "Current website URL is required.";
    if (!erpSystem.trim()) return "Please tell us which ERP system you use.";
    if (erpHasApi === null) return "Please indicate whether your ERP has an API.";
    if (erpHasApi === false && buildApi === null) {
      return "Please let us know if you need us to build an API.";
    }
    if (migrateAiChatbot === null) return "Please indicate whether you need an AI chatbot.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!choice) return;
    if (!isSupabaseConfigured) {
      toast.error("This form is not connected yet. Please try again later.");
      return;
    }

    if (choice === "new_website") {
      const err = validateNew();
      if (err) {
        toast.error(err);
        return;
      }
      setSubmitting(true);
      try {
        await submitProjectRequest({
          request_type: "new_website",
          payload: {
            contact_email: newContactEmail.trim(),
            business_name: businessName.trim(),
            industry: industry.trim(),
            erp_integration: erpIntegration!,
            ai_chatbot: newAiChatbot!,
            preferred_features: [...preferredFeatures],
            additional_notes: newNotes.trim(),
          },
        });
        setStep(3);
        resetForms();
        setChoice(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const err = validateMigrate();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      await submitProjectRequest({
        request_type: "migrate",
        payload: {
          contact_email: migrateContactEmail.trim(),
          website_url: websiteUrl.trim(),
          erp_system: erpSystem.trim(),
          erp_has_api: erpHasApi!,
          build_api: erpHasApi === false ? buildApi! : null,
          ai_chatbot: migrateAiChatbot!,
          migration_requirements: migrationRequirements.trim(),
          additional_notes: migrateNotes.trim(),
        },
      });
      setStep(3);
      resetForms();
      setChoice(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setStep(1);
    setChoice(null);
    resetForms();
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 flex items-center gap-3" aria-hidden>
        {[1, 2].map(n => (
          <div key={n} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                step >= n ? "bg-foreground text-background" : "bg-muted text-muted-foreground",
              )}
            >
              {n}
            </div>
            {n < 2 && <div className={cn("h-px w-8 sm:w-14", step > n ? "bg-foreground/40" : "bg-border")} />}
          </div>
        ))}
        <span className="ml-1 text-sm text-muted-foreground">
          {step === 1 ? "Choose a path" : step === 2 ? "Project details" : "Done"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pick the option that best matches where you are today. You can share specifics on the next step—we will
              route your request to our team right away.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
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
                    <span
                      className={cn(
                        "mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background/80",
                      )}
                    >
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

        {step === 2 && choice === "new_website" && (
          <motion.form
            key="new"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">New website</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us about your business and what you need.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nw-email">Work email</Label>
                <Input
                  id="nw-email"
                  type="email"
                  autoComplete="email"
                  value={newContactEmail}
                  onChange={e => setNewContactEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nw-business">Business name</Label>
                <Input
                  id="nw-business"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  className="h-11 rounded-lg"
                  placeholder="Acme Builders"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nw-industry">Industry</Label>
                <Input
                  id="nw-industry"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="h-11 rounded-lg"
                  placeholder="e.g. Commercial construction"
                  required
                />
              </div>

              <YesNoField label="Do you need an ERP integration?" value={erpIntegration} onChange={setErpIntegration} namePrefix="nw-erp" />
              <YesNoField label="Do you need an AI chatbot?" value={newAiChatbot} onChange={setNewAiChatbot} namePrefix="nw-ai" />

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
              </div>

              <div className="space-y-2">
                <Label htmlFor="nw-notes">Additional notes</Label>
                <Textarea
                  id="nw-notes"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  placeholder="Timeline, stakeholders, or anything else we should know."
                  className="min-h-[100px] rounded-lg resize-y"
                />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit request"}
            </Button>
          </motion.form>
        )}

        {step === 2 && choice === "migrate" && (
          <motion.form
            key="migrate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Migration</h2>
                <p className="mt-1 text-sm text-muted-foreground">Help us understand your current stack and goals.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mg-email">Work email</Label>
                <Input
                  id="mg-email"
                  type="email"
                  autoComplete="email"
                  value={migrateContactEmail}
                  onChange={e => setMigrateContactEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mg-url">Current website URL</Label>
                <Input
                  id="mg-url"
                  type="url"
                  value={websiteUrl}
                  onChange={e => setWebsiteUrl(e.target.value)}
                  className="h-11 rounded-lg"
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mg-erp">What ERP system are you using?</Label>
                <Input
                  id="mg-erp"
                  value={erpSystem}
                  onChange={e => setErpSystem(e.target.value)}
                  className="h-11 rounded-lg"
                  placeholder="e.g. NetSuite, SAP, custom"
                  required
                />
              </div>

              <YesNoField
                label="Does your ERP have an existing API?"
                value={erpHasApi}
                onChange={v => {
                  setErpHasApi(v);
                  if (v) setBuildApi(null);
                }}
                namePrefix="mg-api"
              />

              {erpHasApi === false && (
                <YesNoField label="Do you need us to build the API?" value={buildApi} onChange={setBuildApi} namePrefix="mg-build-api" />
              )}

              <YesNoField label="Do you need an AI chatbot?" value={migrateAiChatbot} onChange={setMigrateAiChatbot} namePrefix="mg-ai" />

              <div className="space-y-2">
                <Label htmlFor="mg-req">Any specific migration requirements</Label>
                <Textarea
                  id="mg-req"
                  value={migrationRequirements}
                  onChange={e => setMigrationRequirements(e.target.value)}
                  placeholder="URLs to preserve, integrations, content, SEO concerns…"
                  className="min-h-[100px] rounded-lg resize-y"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mg-notes">Additional notes</Label>
                <Textarea
                  id="mg-notes"
                  value={migrateNotes}
                  onChange={e => setMigrateNotes(e.target.value)}
                  placeholder="Anything else we should know."
                  className="min-h-[88px] rounded-lg resize-y"
                />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit request"}
            </Button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center rounded-2xl border border-border/70 bg-card/40 px-6 py-14 text-center shadow-sm"
            role="status"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden />
            </div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">Request received</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Thank you. Our team will review your details and follow up shortly at the email you provided.
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
