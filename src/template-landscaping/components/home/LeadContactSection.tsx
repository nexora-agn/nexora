import { useState, FormEvent } from "react";
import { ArrowRight, Phone, Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const LeadContactSection = () => {
  const { leadForm: LEAD_FORM, services, company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll be in touch within one business day.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <section id="estimate" className="vf-section-pad bg-[hsl(var(--vf-sage))]/40">
      <div className="container-custom container-inset">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] rounded-2xl overflow-hidden border border-border shadow-xl">
          <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
            <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
              Get Started
            </p>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-4">{LEAD_FORM.title}</h2>
            <p className="text-sm text-[hsl(40_15%_95%/0.75)] font-sans-brand">{LEAD_FORM.description}</p>
            <ul className="space-y-3 mt-8">
              {LEAD_FORM.bullets.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm text-[hsl(40_15%_95%/0.9)] font-sans-brand">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--secondary)/0.45)] text-[hsl(var(--secondary))]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-[hsl(40_20%_98%/0.12)]">
              <p className="text-xs uppercase tracking-wider text-[hsl(40_15%_95%/0.55)] mb-2 font-sans-brand">
                Prefer to talk now?
              </p>
              <a href={phoneHref} className="inline-flex items-center gap-2 font-display text-2xl text-[hsl(var(--secondary))] hover:opacity-90">
                <Phone className="h-5 w-5" />
                {COMPANY.phone}
              </a>
            </div>
          </div>

          <div className="bg-card px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
            <form onSubmit={onSubmit} className="space-y-4 max-w-md w-full mx-auto lg:mx-0">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans-brand font-semibold text-muted-foreground mb-1.5">First name</label>
                  <input required name="firstName" className="w-full h-11 px-3 border border-input rounded-sm bg-background text-sm font-sans-brand" />
                </div>
                <div>
                  <label className="block text-xs font-sans-brand font-semibold text-muted-foreground mb-1.5">Last name</label>
                  <input required name="lastName" className="w-full h-11 px-3 border border-input rounded-sm bg-background text-sm font-sans-brand" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-sans-brand font-semibold text-muted-foreground mb-1.5">Email</label>
                <input required type="email" name="email" className="w-full h-11 px-3 border border-input rounded-sm bg-background text-sm font-sans-brand" />
              </div>
              <div>
                <label className="block text-xs font-sans-brand font-semibold text-muted-foreground mb-1.5">Phone</label>
                <input required type="tel" name="phone" className="w-full h-11 px-3 border border-input rounded-sm bg-background text-sm font-sans-brand" />
              </div>
              <div>
                <label className="block text-xs font-sans-brand font-semibold text-muted-foreground mb-1.5">Service</label>
                <select name="service" className="w-full h-11 px-3 border border-input rounded-sm bg-background text-sm font-sans-brand">
                  <option value="">Select a service</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-sans-brand font-semibold text-muted-foreground mb-1.5">Project details</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your property and project goals (optional)"
                  className="w-full px-3 py-2 border border-input rounded-sm bg-background text-sm font-sans-brand resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 font-sans-brand font-semibold rounded-sm"
              >
                {submitting ? "Sending…" : "Request Free Estimate"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-sans-brand">
                <Lock className="h-3 w-3" />
                Your information is secure and never shared.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
