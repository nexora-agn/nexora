import { useState, FormEvent } from "react";
import { ArrowRight, Phone, Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { createLead } from "@template-mobile-store/lib/dealerLeads";
import {
  DealerFormGrid,
  DealerFormStack,
  DealerField,
  DealerInput,
  DealerSelect,
  DealerTextarea,
} from "@template-mobile-store/components/forms/DealerForm";

const LeadContactSection = () => {
  const { leadForm: LEAD_FORM, services, company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setSubmitting(true);
    const first = String(fd.get("firstName") || "");
    const last = String(fd.get("lastName") || "");
    createLead({
      type: "contact",
      name: `${first} ${last}`.trim(),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      payload: { service: String(fd.get("service") || "") },
    });
    toast.success(LEAD_FORM.successMessage);
    event.currentTarget.reset();
    setSubmitting(false);
  };

  return (
    <section id="estimate" className="section-padding-inset bg-[hsl(var(--muted))]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-border shadow-[0_12px_48px_-16px_rgba(0,0,0,0.12)]">
        <div className="bg-[hsl(var(--primary))] text-white px-6 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-14 flex flex-col justify-center order-2 lg:order-1">
          <p className="dealer-eyebrow text-[hsl(var(--secondary))] mb-3">Get started</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">{LEAD_FORM.title}</h2>
          <p className="text-sm text-white/75 font-sans-brand leading-relaxed max-w-md">{LEAD_FORM.description}</p>
          <ul className="space-y-3 mt-8">
            {LEAD_FORM.bullets.map(b => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/90 font-sans-brand">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--secondary))]/45 text-[hsl(var(--secondary))]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 pt-8 border-t border-white/15">
            <p className="text-xs uppercase tracking-wider text-white/55 mb-2 font-sans-brand">Prefer to talk now?</p>
            <a href={phoneHref} className="inline-flex items-center gap-2 font-display text-xl sm:text-2xl text-[hsl(var(--secondary))] hover:opacity-90 break-all">
              <Phone className="h-5 w-5 shrink-0" />
              {COMPANY.phone}
            </a>
          </div>
        </div>

        <div className="bg-white px-6 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-14 flex flex-col justify-center order-1 lg:order-2">
          <form onSubmit={onSubmit} className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
            <DealerFormStack>
              <DealerFormGrid cols={2}>
                <DealerField label="First name" htmlFor="lead-first">
                  <DealerInput id="lead-first" name="firstName" required autoComplete="given-name" />
                </DealerField>
                <DealerField label="Last name" htmlFor="lead-last">
                  <DealerInput id="lead-last" name="lastName" required autoComplete="family-name" />
                </DealerField>
              </DealerFormGrid>
              <DealerField label="Email" htmlFor="lead-email">
                <DealerInput id="lead-email" type="email" name="email" required autoComplete="email" />
              </DealerField>
              <DealerField label="Phone" htmlFor="lead-phone">
                <DealerInput id="lead-phone" type="tel" name="phone" required autoComplete="tel" />
              </DealerField>
              <DealerField label="I'm interested in" htmlFor="lead-service">
                <DealerSelect id="lead-service" name="service" defaultValue="">
                  <option value="">Select (optional)</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </DealerSelect>
              </DealerField>
              <DealerField label="Message" htmlFor="lead-message">
                <DealerTextarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  placeholder="Device, budget, or timeline (optional)"
                />
              </DealerField>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[48px] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] font-sans-brand font-semibold rounded-sm"
              >
                {submitting ? "Sending…" : LEAD_FORM.submitLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-sans-brand">
                <Lock className="h-3 w-3 shrink-0" />
                Your information is secure and never shared.
              </p>
            </DealerFormStack>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
