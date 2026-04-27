import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getWorkEmailError, WORK_EMAIL_MAX_LENGTH } from "@/lib/validateWorkEmail";
import { sendNexoraFormEmail } from "@/lib/sendFormEmails";
import { toast } from "sonner";

const benefits = [
  "Custom site + preview before you commit",
  "We ship. You don’t manage devs",
  "Ongoing support on your plan",
];

const industries = [
  { value: "", label: "Industry *" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "saas", label: "SaaS" },
  { value: "agency", label: "Agency" },
  { value: "restaurant", label: "Restaurant" },
  { value: "real-estate", label: "Real estate" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
] as const;

interface RequestDemoModalProps {
  open: boolean;
  onClose: () => void;
}

const RequestDemoModal = ({ open, onClose }: RequestDemoModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [hasWebsite, setHasWebsite] = useState<"yes" | "no" | "">("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [sending, setSending] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) return;
    setSubmitted(false);
    setName("");
    setEmail("");
    setCompany("");
    setIndustry("");
    setPhone("");
    setHasWebsite("");
    setMarketingOptIn(false);
    setSending(false);
    setErrors({});
  }, [open]);

  const clear = (k: string) => {
    setErrors(prev => {
      if (!prev[k]) return prev;
      const n = { ...prev };
      delete n[k];
      return n;
    });
  };

  const setDemoError = (key: string, message: string | undefined) => {
    setErrors(prev => {
      const n = { ...prev };
      if (message) n[key] = message;
      else delete n[key];
      return n;
    });
  };

  const onFieldGroupBlur = (e: React.FocusEvent, run: () => void) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    run();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Add your name.";
    const emailErr = getWorkEmailError(email, "Add your work email.");
    if (emailErr) next.email = emailErr;
    if (!phone.trim()) next.phone = "Add a phone number we can call.";
    if (!industry) next.industry = "Select an industry.";
    if (hasWebsite !== "yes" && hasWebsite !== "no") {
      next.hasWebsite = "Let us know if you already have a website (yes or no).";
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    try {
      await sendNexoraFormEmail({
        formType: "demo",
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim() || undefined,
        industry,
        phone: phone.trim(),
        hasWebsite: hasWebsite as "yes" | "no",
        marketingOptIn,
      });
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your request.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative grid w-full max-w-4xl max-h-[90vh] grid-cols-1 overflow-y-auto rounded-2xl bg-background shadow-2xl md:max-h-[90vh] md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col justify-center p-8 md:p-10">
              <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                Book a demo
                <br />
                <span className="text-neutral-600">See it in 15 minutes.</span>
              </h2>

              <div className="mb-8 space-y-3">
                {benefits.map(b => (
                  <div key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-neutral-950" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>

              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Typical verticals</p>
              <div className="flex flex-wrap gap-2">
                {["Construction", "Real estate", "Field services", "Distribution"].map(n => (
                  <span
                    key={n}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-b-2xl bg-secondary/30 p-8 md:rounded-b-none md:rounded-r-2xl md:p-10">
              {submitted ? (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                  <CheckCircle2 size={48} className="mb-4 text-foreground" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">Thank you!</h3>
                  <p className="text-sm text-muted-foreground">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => void handleSubmit(e)} className="space-y-4" noValidate>
                  <div>
                    <Label htmlFor="demo-name" className="text-foreground">
                      Full name
                    </Label>
                    <Input
                      id="demo-name"
                      placeholder="Your name *"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        clear("name");
                      }}
                      onBlur={() => setDemoError("name", !name.trim() ? "Add your name." : undefined)}
                      className={cn("mt-1.5 h-12 rounded-xl bg-background", errors.name && "border-destructive")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "e-name" : undefined}
                      disabled={sending}
                    />
                    {errors.name && (
                      <p id="e-name" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="demo-email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="demo-email"
                      type="email"
                      autoComplete="email"
                      maxLength={WORK_EMAIL_MAX_LENGTH}
                      placeholder="name@company.com *"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        clear("email");
                      }}
                      onBlur={() => setDemoError("email", getWorkEmailError(email, "Add your work email.") ?? undefined)}
                      className={cn("mt-1.5 h-12 rounded-xl bg-background", errors.email && "border-destructive")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "e-email" : undefined}
                      disabled={sending}
                    />
                    {errors.email && (
                      <p id="e-email" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="demo-company">Company</Label>
                      <Input
                        id="demo-company"
                        placeholder="Company name"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="mt-1.5 h-12 rounded-xl bg-background"
                        disabled={sending}
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-industry">Industry</Label>
                      <select
                        id="demo-industry"
                        value={industry}
                      onChange={e => {
                        setIndustry(e.target.value);
                        clear("industry");
                      }}
                      onBlur={() => setDemoError("industry", !industry ? "Select an industry." : undefined)}
                      className={cn(
                        "mt-1.5 h-12 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                        !industry && "text-muted-foreground",
                        errors.industry && "border-destructive",
                      )}
                      aria-invalid={!!errors.industry}
                      aria-describedby={errors.industry ? "e-ind" : undefined}
                      disabled={sending}
                    >
                        {industries.map(o => (
                          <option key={o.value || "empty"} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p id="e-ind" className="mt-1 text-sm text-destructive" role="alert">
                          {errors.industry}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="demo-phone" className="text-foreground">
                      Phone
                    </Label>
                    <Input
                      id="demo-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        clear("phone");
                      }}
                      onBlur={() => setDemoError("phone", !phone.trim() ? "Add a phone number we can call." : undefined)}
                      className={cn("mt-1.5 h-12 rounded-xl bg-background", errors.phone && "border-destructive")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "e-phone" : undefined}
                      disabled={sending}
                    />
                    {errors.phone && (
                      <p id="e-phone" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <fieldset
                    onBlur={e =>
                      onFieldGroupBlur(e, () => {
                        setDemoError(
                          "hasWebsite",
                          hasWebsite !== "yes" && hasWebsite !== "no"
                            ? "Let us know if you already have a website (yes or no)."
                            : undefined,
                        );
                      })
                    }
                  >
                    <legend className="text-sm text-foreground">Do you already have a website? *</legend>
                    <div
                      className={cn("mt-2 flex flex-wrap gap-6", errors.hasWebsite && "rounded-md p-1 ring-1 ring-destructive/50")}
                    >
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="hasWebsite"
                          checked={hasWebsite === "yes"}
                          onChange={() => {
                            setHasWebsite("yes");
                            clear("hasWebsite");
                          }}
                          className="accent-foreground"
                        />
                        <span className="text-sm text-foreground">Yes</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="hasWebsite"
                          checked={hasWebsite === "no"}
                          onChange={() => {
                            setHasWebsite("no");
                            clear("hasWebsite");
                          }}
                          className="accent-foreground"
                        />
                        <span className="text-sm text-foreground">No</span>
                      </label>
                    </div>
                    {errors.hasWebsite && (
                      <p className="mt-1 text-sm text-destructive" role="alert">
                        {errors.hasWebsite}
                      </p>
                    )}
                  </fieldset>

                  <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      className="mt-1 accent-foreground"
                      checked={marketingOptIn}
                      onChange={e => setMarketingOptIn(e.target.checked)}
                      disabled={sending}
                    />
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      I&apos;d like to receive updates and tips about building a great website.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl border-0 bg-brand text-base font-semibold text-brand-foreground hover:bg-brand-muted"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Request demo"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestDemoModal;
