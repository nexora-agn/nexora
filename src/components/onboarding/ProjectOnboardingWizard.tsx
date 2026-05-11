import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Globe, Landmark, Palette, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { applyHexColor, extractLogoColors, isValidHex } from "@/lib/extractLogoBrandColors";
import { PACKAGE_LOGO_MAX_BYTES, PACKAGE_ONBOARD_LIMITS } from "@/lib/projectOnboardingConstants";
import { submitStartProjectAndGetPayseraRedirect } from "@/lib/submitStartProjectPaysera";
import { getWorkEmailError, WORK_EMAIL_MAX_LENGTH } from "@/lib/validateWorkEmail";
import type { MarketingPlanId } from "@/lib/pricingPlans";
import type { PackageOnboardingPayload, ProjectRequestType } from "@/lib/supabase";
import { PlanCardBody, PlanPopularBadge } from "@/components/landing/PlanCardBody";
import { MARKETING_PLANS, PLAN_IDS } from "@/lib/pricingPlans";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4;

/** Same defaults as homepage `CustomizationPreview` live panel. */
const DEFAULT_PRIMARY = "#0a0a0a";
const DEFAULT_SECONDARY = "#f5c517";

const PROJECT_TYPE_OPTIONS: {
  type: ProjectRequestType;
  title: string;
  description: string;
  icon: typeof Sparkles;
}[] = [
  {
    type: "new_website",
    title: "Create a new website",
    description: "Launch a tailored site with your brand, content, and the package you choose.",
    icon: Sparkles,
  },
  {
    type: "migrate",
    title: "Migrate an existing website",
    description: "Move from your current site into a fresh Nexora build—we’ll capture what you send in the kickoff.",
    icon: Globe,
  },
];

function readInitialPlanFromLocation(): MarketingPlanId | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("plan");
  if (raw && (PLAN_IDS as readonly string[]).includes(raw)) {
    return raw as MarketingPlanId;
  }
  return null;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

function fileToBase64Payload(file: File): Promise<{ fileName: string; mimeType: string; base64: string } | { error: string }> {
  return new Promise(resolve => {
    if (!file.type.startsWith("image/")) {
      resolve({ error: "Please upload an image file (PNG, JPG, SVG, WebP)." });
      return;
    }
    if (file.size > PACKAGE_LOGO_MAX_BYTES) {
      resolve({
        error: `Logo must be ${Math.round(PACKAGE_LOGO_MAX_BYTES / 1e6)}MB or smaller.`,
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r !== "string") {
        resolve({ error: "Could not read file." });
        return;
      }
      const comma = r.indexOf(",");
      const rawB64 = comma >= 0 ? r.slice(comma + 1) : r;
      resolve({ fileName: file.name, mimeType: file.type || "application/octet-stream", base64: rawB64 });
    };
    reader.onerror = () => resolve({ error: "Could not read file." });
    reader.readAsDataURL(file);
  });
}

const ProjectOnboardingWizard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [requestType, setRequestType] = useState<ProjectRequestType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<MarketingPlanId | null>(() => readInitialPlanFromLocation());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [workEmail, setWorkEmail] = useState("");
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY);
  const [primaryHex, setPrimaryHex] = useState(DEFAULT_PRIMARY);
  const [secondaryColor, setSecondaryColor] = useState(DEFAULT_SECONDARY);
  const [secondaryHex, setSecondaryHex] = useState(DEFAULT_SECONDARY);
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [domainHostingInfo, setDomainHostingInfo] = useState("");
  const [contentText, setContentText] = useState("");
  const [contentHelpRequested, setContentHelpRequested] = useState(false);
  const [preferredDomain, setPreferredDomain] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [logoPayload, setLogoPayload] = useState<{ fileName: string; mimeType: string; base64: string } | null>(null);
  const [logoFileLabel, setLogoFileLabel] = useState("");
  const [logoBusy, setLogoBusy] = useState(false);

  useEffect(() => {
    const raw = searchParams.get("plan");
    if (raw && (PLAN_IDS as readonly string[]).includes(raw)) {
      setSelectedPlan(raw as MarketingPlanId);
    }
  }, [searchParams]);

  const setPlanWithUrl = (id: MarketingPlanId) => {
    setSelectedPlan(id);
    setSearchParams({ plan: id }, { replace: true });
  };

  const selectPackageAndAdvance = (id: MarketingPlanId) => {
    setPlanWithUrl(id);
    setStep(3);
  };

  const clearError = (key: string) => {
    setFieldErrors(prev => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const setMergedFieldError = (key: string, message: string | undefined) => {
    setFieldErrors(prev => {
      const next = { ...prev };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  };

  const buildBrandColorsPayload = (): string =>
    `Primary ${primaryColor} · Secondary ${secondaryColor}`;

  const resetFormFields = () => {
    setWorkEmail("");
    setPrimaryColor(DEFAULT_PRIMARY);
    setPrimaryHex(DEFAULT_PRIMARY);
    setSecondaryColor(DEFAULT_SECONDARY);
    setSecondaryHex(DEFAULT_SECONDARY);
    setCurrentWebsite("");
    setDomainHostingInfo("");
    setContentText("");
    setContentHelpRequested(false);
    setPreferredDomain("");
    setAdditionalNotes("");
    setLogoPayload(null);
    setLogoFileLabel("");
    setFieldErrors({});
    setSelectedPlan(null);
    setRequestType(null);
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  // ---- Per-flow validation -------------------------------------------------
  // The two project types share email + notes, but otherwise diverge:
  //   • new_website  → logo, palette, content, optional preferred domain
  //   • migrate      → current website URL (the only thing we really need)
  // `getActiveDetailKeys()` is the source of truth for what step 3 validates,
  // and it’s mirrored by the JSX below so both stay in sync.
  type DetailKey =
    | "pk-email"
    | "pk-logo"
    | "pk-palette"
    | "pk-site"
    | "pk-content"
    | "pk-preferred-domain"
    | "pk-notes";

  const getActiveDetailKeys = (): DetailKey[] => {
    if (requestType === "migrate") {
      return ["pk-email", "pk-site", "pk-notes"];
    }
    // Default to new_website (also covers null while step 3 isn't yet visible).
    return ["pk-email", "pk-logo", "pk-palette", "pk-content", "pk-preferred-domain", "pk-notes"];
  };

  const isValidUrlish = (raw: string): boolean => {
    const v = raw.trim();
    if (!v) return false;
    try {
      const withProto = /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`;
      const u = new URL(withProto);
      return /\./.test(u.hostname);
    } catch {
      return false;
    }
  };

  const isPreferredDomainValid = (raw: string): boolean => {
    const v = raw.trim().toLowerCase();
    if (!v) return true;
    const stripped = v.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(stripped);
  };

  const getDetailError = (key: DetailKey): string | undefined => {
    switch (key) {
      case "pk-email":
        return getWorkEmailError(workEmail) ?? undefined;
      case "pk-logo":
        if (!logoPayload) return "Upload your logo (PNG or JPG recommended).";
        return;
      case "pk-palette":
        if (!isValidHex(primaryHex.trim()) || !isValidHex(secondaryHex.trim())) {
          return "Use two valid 6-digit hex colours (#0a0a0a)—same rules as on the homepage customisation panel.";
        }
        return;
      case "pk-site":
        if (requestType === "migrate") {
          if (!currentWebsite.trim()) return "Paste the URL of your existing website.";
          if (!isValidUrlish(currentWebsite)) {
            return "Enter a valid URL — e.g. acme.com or https://acme.com.";
          }
        }
        if (currentWebsite.length > PACKAGE_ONBOARD_LIMITS.currentWebsite) {
          return `Use at most ${PACKAGE_ONBOARD_LIMITS.currentWebsite} characters.`;
        }
        return;
      case "pk-content":
        // Optional for the new-website flow — clients can ask us to write copy.
        if (contentText.length > PACKAGE_ONBOARD_LIMITS.contentText) {
          return `Use at most ${PACKAGE_ONBOARD_LIMITS.contentText} characters.`;
        }
        return;
      case "pk-preferred-domain":
        if (preferredDomain.length > PACKAGE_ONBOARD_LIMITS.preferredDomain) {
          return `Use at most ${PACKAGE_ONBOARD_LIMITS.preferredDomain} characters.`;
        }
        if (!isPreferredDomainValid(preferredDomain)) {
          return "Use a domain like acme.com (no spaces or paths).";
        }
        return;
      case "pk-notes":
        if (additionalNotes.length > PACKAGE_ONBOARD_LIMITS.additionalNotes) {
          return `Use at most ${PACKAGE_ONBOARD_LIMITS.additionalNotes} characters.`;
        }
        return;
      default:
        return;
    }
  };

  const runValidatePlan = (): boolean => {
    if (!selectedPlan) {
      toast.error("Select a package to continue.");
      return false;
    }
    return true;
  };

  const runValidateDetails = (): boolean => {
    const activeKeys = getActiveDetailKeys();
    const e: Record<string, string> = {};
    for (const key of activeKeys) {
      const err = getDetailError(key);
      if (err) e[key] = err;
    }
    setFieldErrors(prev => {
      const next = { ...prev };
      // Only touch the keys this flow actually rendered, leave others alone.
      for (const key of activeKeys) {
        if (e[key]) next[key] = e[key];
        else delete next[key];
      }
      return next;
    });
    return Object.keys(e).length === 0;
  };

  const goToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!runValidatePlan()) return;
    if (!runValidateDetails()) return;
    setStep(4);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestType) {
      toast.error("Choose whether this is a new website or a migration.");
      return;
    }
    if (!selectedPlan) {
      toast.error("Pick a package first.");
      return;
    }
    // Logo is only required for the new-website flow — migrations let us
    // extract the logo from the live site after submission.
    if (requestType === "new_website" && !logoPayload) {
      toast.error("Upload your logo before continuing.");
      return;
    }
    const isMigration = requestType === "migrate";

    // For migrations, the URL is the source of truth; brand assets and copy
    // are auto-extracted post-submit, so we send empty strings (the email +
    // admin views render a dash in that case).
    const contentForPayload = isMigration
      ? ""
      : contentHelpRequested && !contentText.trim()
        ? "[client requested help creating content]"
        : contentText.trim();

    const payload: PackageOnboardingPayload = {
      onboarding_version: 2,
      contact_email: workEmail.trim().toLowerCase(),
      logo_file_name: logoPayload?.fileName ?? "",
      logo_mime_type: logoPayload?.mimeType ?? "",
      logo_base64: logoPayload?.base64 ?? "",
      brand_colors: isMigration ? "" : buildBrandColorsPayload(),
      current_website: isMigration ? currentWebsite.trim() : "",
      domain_hosting_info: "",
      content_text: contentForPayload,
      preferred_domain: isMigration ? undefined : preferredDomain.trim() || undefined,
      additional_notes: additionalNotes.trim(),
      selected_plan: selectedPlan,
      payment_preference: "paysera",
    };

    setSubmitting(true);
    try {
      const { payment_URL } = await submitStartProjectAndGetPayseraRedirect({
        requestType,
        payload,
      });
      window.location.assign(payment_URL);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setSearchParams({}, { replace: true });
    setStep(1);
    resetFormFields();
  };

  const planMeta = selectedPlan ? MARKETING_PLANS.find(p => p.id === selectedPlan) : null;

  const onLogoPick = async (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    setLogoBusy(true);
    clearError("pk-logo");
    const got = await fileToBase64Payload(f);
    setLogoBusy(false);
    if ("error" in got) {
      setLogoPayload(null);
      setLogoFileLabel("");
      setMergedFieldError("pk-logo", got.error);
      return;
    }
    setLogoPayload(got);
    setLogoFileLabel(f.name);
    clearError("pk-logo");

    const blobUrl = URL.createObjectURL(f);
    try {
      const sampled = await extractLogoColors(blobUrl);
      if (sampled) {
        setPrimaryColor(sampled.primary);
        setPrimaryHex(sampled.primary);
        setSecondaryColor(sampled.secondary);
        setSecondaryHex(sampled.secondary);
        clearError("pk-palette");
      }
    } catch {
      /* optional sampling */
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  };

  const detailBlur = (key: DetailKey) => setMergedFieldError(key, getDetailError(key));

  const PROGRESS_LABELS = ["Project type", "Package", "Brand & content", "Payment"];
  const milestoneComplete = (n: number) => step > n;

  return (
    <div className="w-full min-w-0">
      <div className="mb-8 flex flex-wrap items-center gap-2" aria-hidden>
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="flex items-center gap-2 sm:gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  milestoneComplete(n) || step === n
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {milestoneComplete(n) ? "✓" : n}
              </div>
              {n < 4 && (
                <div className={cn("h-px w-6 sm:w-12", milestoneComplete(n) ? "bg-foreground/40" : "bg-border")} />
              )}
            </div>
          ))}
          <span className="ml-0.5 min-w-0 text-sm text-muted-foreground sm:ml-1">
            {PROGRESS_LABELS[step - 1]}
          </span>
        </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-request-type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full min-w-0 space-y-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              Tell us if you’re starting fresh or migrating an existing site. You’ll choose your package next, then branding and payment.
            </p>
            <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
              {PROJECT_TYPE_OPTIONS.map(({ type, title, description, icon: Icon }) => {
                const active = requestType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setRequestType(type);
                      setStep(2);
                    }}
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border p-6 text-left shadow-sm transition-all sm:p-8",
                      "border-neutral-200 bg-white hover:border-neutral-300",
                      active &&
                        "z-[1] ring-2 ring-brand/90 ring-offset-2 ring-offset-background hover:border-neutral-200",
                    )}
                  >
                    <Icon className="mb-4 h-8 w-8 text-muted-foreground" aria-hidden />
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                    <div className="mt-6 flex min-h-[2.75rem] items-end">
                      <span
                        className={cn(
                          "flex min-h-[1.25rem] items-center gap-2 text-sm font-semibold text-foreground",
                          !active && "invisible",
                        )}
                        aria-hidden={!active}
                      >
                        <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
                        Selected
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-plan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full min-w-0 space-y-6"
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Choose your package—we’ll upload your logo, capture your palette, and gather domain and copy next.
            </p>
            <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MARKETING_PLANS.map(plan => {
                const active = selectedPlan === plan.id;
                const inverted = plan.highlight;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => selectPackageAndAdvance(plan.id)}
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
                        Selected
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.form
            key="step-details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-2xl space-y-6"
            onSubmit={goToPayment}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm">
              <span className="text-muted-foreground">
                {requestType === "migrate" ? "Migration" : "New website"}
                {" · "}
              </span>
              Selected package:{" "}
              <span className="font-semibold text-foreground">{planMeta?.name ?? "—"}</span>
              {planMeta?.price ? (
                <span className="text-muted-foreground">
                  {" "}
                  ({planMeta.price}
                  {planMeta.period})
                </span>
              ) : null}
            </div>

            <div className="space-y-6 rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {requestType === "migrate" ? "Migration kickoff" : "Brand & kickoff assets"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {requestType === "migrate"
                    ? "Just paste the URL of your existing site — we’ll extract your logo, brand colours, and copy from there. Domain & hosting are already in place, nothing else needed."
                    : "ERP and AI scope are finalised on your call — nothing to answer about them here. Domain & hosting are handled internally after kickoff."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pkg-email">Business email</Label>
                <Input
                  id="pkg-email"
                  type="email"
                  autoComplete="email"
                  className={cn(fieldErrors["pk-email"] && "border-destructive")}
                  maxLength={WORK_EMAIL_MAX_LENGTH}
                  placeholder="you@company.com"
                  value={workEmail}
                  onChange={e => {
                    setWorkEmail(e.target.value);
                    clearError("pk-email");
                  }}
                  onBlur={() => detailBlur("pk-email")}
                  aria-invalid={fieldErrors["pk-email"] ? "true" : undefined}
                />
                <FieldError message={fieldErrors["pk-email"]} />
              </div>

              {requestType === "migrate" ? (
                <div className="space-y-2">
                  <Label htmlFor="pkg-site">Current website URL</Label>
                  <Input
                    id="pkg-site"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="https://your-current-site.com"
                    maxLength={PACKAGE_ONBOARD_LIMITS.currentWebsite}
                    value={currentWebsite}
                    onChange={e => {
                      setCurrentWebsite(e.target.value);
                      clearError("pk-site");
                    }}
                    onBlur={() => detailBlur("pk-site")}
                    className={cn(fieldErrors["pk-site"] && "border-destructive")}
                    aria-invalid={fieldErrors["pk-site"] ? "true" : undefined}
                  />
                  <p className="text-xs text-muted-foreground">
                    We’ll automatically pull your logo, brand colours, and copy from this address — you don’t need to upload anything else.
                  </p>
                  <FieldError message={fieldErrors["pk-site"]} />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="gap-2">
                      <Upload className="inline h-4 w-4" aria-hidden />
                      Logo upload
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Raster or vector image. Max {Math.round(PACKAGE_LOGO_MAX_BYTES / 1e6)}MB.
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={logoBusy}
                      className={cn(fieldErrors["pk-logo"] && "border-destructive")}
                      onChange={e => void onLogoPick(e.target.files)}
                    />
                    {logoFileLabel ? (
                      <p className="text-xs text-muted-foreground">
                        Attached: <span className="font-medium text-foreground">{logoFileLabel}</span>
                      </p>
                    ) : null}
                    <FieldError message={fieldErrors["pk-logo"]} />
                  </div>

                  <fieldset
                    className={cn(
                      "space-y-0 rounded-xl border bg-muted/15 p-4",
                      fieldErrors["pk-palette"] ? "border-destructive/60" : "border-border/60",
                    )}
                  >
                    <legend className="mb-3 flex items-center gap-2 px-1 text-sm font-semibold text-foreground">
                      <Palette className="h-4 w-4 text-muted-foreground" aria-hidden />
                      Brand colours
                    </legend>
                    <p className="mb-3 px-1 text-xs text-muted-foreground">
                      Tweak by hand or after logo upload (6-digit hex).
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 sm:items-stretch">
                      <label className="flex min-h-0 flex-col rounded-xl border border-border/60 bg-background/60 p-3">
                        <span className="mb-2 block text-xs font-medium text-muted-foreground">Primary</span>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            aria-label="Primary colour"
                            value={primaryColor}
                            onChange={e => {
                              setPrimaryColor(e.target.value);
                              setPrimaryHex(e.target.value);
                              clearError("pk-palette");
                            }}
                            className="h-10 w-12 cursor-pointer overflow-hidden rounded-lg border border-border bg-background p-0.5 [color-scheme:light]"
                          />
                          <Input
                            type="text"
                            value={primaryHex}
                            placeholder="#0a0a0a"
                            spellCheck={false}
                            className={cn(
                              "h-10 flex-1 font-mono text-sm",
                              fieldErrors["pk-palette"] && "border-destructive",
                            )}
                            onChange={e => {
                              setPrimaryHex(e.target.value);
                              clearError("pk-palette");
                            }}
                            onBlur={() =>
                              applyHexColor(primaryHex.trim(), primaryColor, setPrimaryColor, setPrimaryHex)
                            }
                          />
                        </div>
                      </label>
                      <label className="flex min-h-0 flex-col rounded-xl border border-border/60 bg-background/60 p-3">
                        <span className="mb-2 block text-xs font-medium text-muted-foreground">Secondary</span>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            aria-label="Secondary colour"
                            value={secondaryColor}
                            onChange={e => {
                              setSecondaryColor(e.target.value);
                              setSecondaryHex(e.target.value);
                              clearError("pk-palette");
                            }}
                            className="h-10 w-12 cursor-pointer overflow-hidden rounded-lg border border-border bg-background p-0.5 [color-scheme:light]"
                          />
                          <Input
                            type="text"
                            value={secondaryHex}
                            placeholder="#f5c517"
                            spellCheck={false}
                            className={cn(
                              "h-10 flex-1 font-mono text-sm",
                              fieldErrors["pk-palette"] && "border-destructive",
                            )}
                            onChange={e => {
                              setSecondaryHex(e.target.value);
                              clearError("pk-palette");
                            }}
                            onBlur={() =>
                              applyHexColor(secondaryHex.trim(), secondaryColor, setSecondaryColor, setSecondaryHex)
                            }
                          />
                        </div>
                      </label>
                    </div>
                    <p className="mt-3 px-1 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Primary</span> = main button.{" "}
                      <span className="font-medium text-foreground">Secondary</span> = small chip.
                    </p>
                    <FieldError message={fieldErrors["pk-palette"]} />
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="pkg-preferred-domain">
                      Preferred domain name <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="pkg-preferred-domain"
                      type="text"
                      inputMode="url"
                      placeholder="acme.com"
                      autoComplete="off"
                      spellCheck={false}
                      maxLength={PACKAGE_ONBOARD_LIMITS.preferredDomain}
                      value={preferredDomain}
                      onChange={e => {
                        setPreferredDomain(e.target.value);
                        clearError("pk-preferred-domain");
                      }}
                      onBlur={() => detailBlur("pk-preferred-domain")}
                      className={cn(fieldErrors["pk-preferred-domain"] && "border-destructive")}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tell us what you’d like the new site’s address to be — we’ll handle registration & hosting on our side.
                    </p>
                    <FieldError message={fieldErrors["pk-preferred-domain"]} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Label htmlFor="pkg-content">
                        Content <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border accent-foreground"
                          checked={contentHelpRequested}
                          onChange={e => {
                            setContentHelpRequested(e.target.checked);
                            if (e.target.checked) clearError("pk-content");
                          }}
                        />
                        We can help create content
                      </label>
                    </div>
                    <Textarea
                      id="pkg-content"
                      placeholder={
                        contentHelpRequested
                          ? "Optional — drop any reference points, brand voice notes, or examples."
                          : "Paste page text, bullet points, or what each section should convey."
                      }
                      rows={6}
                      maxLength={PACKAGE_ONBOARD_LIMITS.contentText}
                      value={contentText}
                      onChange={e => {
                        setContentText(e.target.value);
                        clearError("pk-content");
                      }}
                      onBlur={() => detailBlur("pk-content")}
                      className={cn(fieldErrors["pk-content"] && "border-destructive")}
                    />
                    <FieldError message={fieldErrors["pk-content"]} />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="pkg-notes">
                  Anything else? <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="pkg-notes"
                  placeholder={
                    requestType === "migrate"
                      ? "Anything specific about the migration — pages to keep, sections to drop, integrations, references."
                      : "Anything else before we kick off — timing, integrations to research later, references."
                  }
                  rows={3}
                  maxLength={PACKAGE_ONBOARD_LIMITS.additionalNotes}
                  value={additionalNotes}
                  onChange={e => {
                    setAdditionalNotes(e.target.value);
                    clearError("pk-notes");
                  }}
                  onBlur={() => detailBlur("pk-notes")}
                  className={cn(fieldErrors["pk-notes"] && "border-destructive")}
                />
                <FieldError message={fieldErrors["pk-notes"]} />
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold">
              Continue to payment
            </Button>
          </motion.form>
        )}

        {step === 4 && selectedPlan && (
          <motion.form
            key="step-pay"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full min-w-0 max-w-2xl space-y-6"
            onSubmit={handleFinalSubmit}
          >
            <Button type="button" variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="space-y-3 rounded-xl border border-border/70 bg-muted/25 p-4 text-sm">
              <p className="font-medium text-foreground">Summary</p>
              <dl className="grid gap-2 text-muted-foreground sm:grid-cols-2">
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt>Project</dt>
                  <dd className="text-right font-medium text-foreground sm:text-left">
                    {requestType === "migrate" ? "Site migration" : "New website"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt>Package</dt>
                  <dd className="text-right font-medium text-foreground sm:text-left">{planMeta?.name}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:flex-col">
                  <dt>Email</dt>
                  <dd className="break-all text-right font-medium text-foreground sm:text-left">{workEmail.trim()}</dd>
                </div>
                {requestType === "migrate" ? (
                  <div className="flex justify-between gap-2 sm:flex-col">
                    <dt>Existing site</dt>
                    <dd className="break-all text-right font-medium text-foreground sm:text-left">
                      {currentWebsite.trim() || "—"}
                    </dd>
                  </div>
                ) : preferredDomain.trim() ? (
                  <div className="flex justify-between gap-2 sm:flex-col">
                    <dt>Preferred domain</dt>
                    <dd className="break-all text-right font-medium text-foreground sm:text-left">
                      {preferredDomain.trim()}
                    </dd>
                  </div>
                ) : null}
              </dl>
              {requestType !== "migrate" ? (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {[primaryColor, secondaryColor].map((hex, hi) => (
                    <span
                      key={`${hi}-${hex}`}
                      className="inline-flex h-7 w-7 rounded border border-border/80 shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                  <span className="text-xs font-mono text-muted-foreground">{buildBrandColorsPayload()}</span>
                </div>
              ) : (
                <p className="pt-2 text-xs text-muted-foreground">
                  Logo, brand colours, and copy will be extracted from the URL above.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm sm:p-8 space-y-3">
              <Label className="text-foreground">Payment</Label>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Checkout is handled on{" "}
                <span className="font-medium text-foreground inline-flex items-center gap-1.5">
                  <Landmark className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  Paysera
                </span>
                . When you submit, your browser will go straight to the secure Paysera payment page. After payment is confirmed we move ahead with
                production.
              </p>
            </div>

            <Button type="submit" className="h-11 rounded-lg px-8 font-semibold" disabled={submitting}>
              {submitting ? "Redirecting to Paysera…" : "Submit & continue to payment"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectOnboardingWizard;
