import { useState, FormEvent } from "react";
import { ArrowRight, Phone, Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";

const LeadContactSection = () => {
  const { leadForm: LEAD_FORM, services, company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll be in touch within 24 hours.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="bg-[hsl(var(--volt-surface))]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        {/* Dark left — bullets */}
        <div className="bg-[hsl(var(--primary))] text-white px-4 sm:px-6 lg:px-10 xl:px-14 py-12 lg:py-16 flex flex-col justify-center">
          <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
            Get Started
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold uppercase leading-tight">
            {LEAD_FORM.title}
          </h2>
          <p className="mt-3 text-[hsl(var(--secondary))] font-display font-bold uppercase tracking-wider text-sm">
            {LEAD_FORM.description}
          </p>
          <ul className="space-y-3 mt-8">
            {LEAD_FORM.bullets.map(b => (
              <li key={b} className="flex items-start gap-3 text-sm sm:text-[15px] text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/15 border border-[hsl(var(--secondary))]/35 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" strokeWidth={2.5} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-2 font-display">
              Prefer to talk now?
            </p>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 font-display text-2xl font-bold text-[hsl(var(--secondary))] hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
              {COMPANY.phone}
            </a>
          </div>
        </div>

        {/* Form right */}
        <div className="bg-white px-4 sm:px-6 lg:px-10 xl:px-14 py-12 lg:py-16 flex flex-col justify-center">
          <form onSubmit={onSubmit} className="space-y-3 max-w-lg w-full mx-auto lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Full Name"
                className="rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--volt-surface))] text-[hsl(var(--primary))] placeholder:text-muted-foreground px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--volt-surface))] text-[hsl(var(--primary))] placeholder:text-muted-foreground px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
              />
            </div>
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--volt-surface))] text-[hsl(var(--primary))] placeholder:text-muted-foreground px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Property Address"
              className="w-full rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--volt-surface))] text-[hsl(var(--primary))] placeholder:text-muted-foreground px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
            />
            <select
              defaultValue=""
              className="w-full rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--volt-surface))] text-[hsl(var(--primary))] px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
            >
              <option value="" disabled>
                Service Needed
              </option>
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Describe your electrical issue (optional)"
              rows={4}
              className="w-full rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--volt-surface))] text-[hsl(var(--primary))] placeholder:text-muted-foreground px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent resize-none"
            />
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wider rounded-sm py-6"
            >
              {submitting ? "Sending…" : "Request Free Estimate"}
              {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
              <Lock className="h-3 w-3" />
              <span>We respect your privacy. Your information is safe with us.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
