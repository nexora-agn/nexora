import { Helmet } from "react-helmet-async";
import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import Layout from "@template-tire-shop/components/layout/Layout";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { CONTACT_TRUST_STRIP } from "@template-tire-shop/data/siteData";
import { createLead } from "@template-tire-shop/lib/dealerLeads";
import {
  DealerFormCard,
  DealerFormGrid,
  DealerFormSection,
  DealerFormShell,
  DealerFormStack,
  DealerField,
  DealerInput,
  DealerSelect,
  DealerTextarea,
} from "@template-tire-shop/components/forms/DealerForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import * as LucideIcons from "lucide-react";

const Contact = () => {
  const { company: COMPANY, officeHours, services } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setSubmitting(true);
    createLead({
      type: "contact",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      payload: {
        department: String(fd.get("department") || ""),
        interest: String(fd.get("interest") || ""),
      },
    });
    toast.success("Message sent. We'll respond within one business day.");
    event.currentTarget.reset();
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | {COMPANY.name}</title>
        <meta name="description" content={`Contact ${COMPANY.name} — sales, service, parts, and finance.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Contact"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        title="Contact Nexora Motors"
        body="Sales, service, parts, and finance — reach the right department and we will respond quickly."
        image={HOME_BUILDER_IMAGES.contactHero}
        imageAlt="Contact dealership"
      />

      <DealerFormSection variant="muted">
        <DealerFormShell maxWidth="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-[hsl(var(--primary))] mb-2">Visit or call</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prefer to talk now? Call sales or service directly. For detailed requests, use the form — we route it to the right team.
                </p>
              </div>
              <ul className="space-y-4">
                <ContactRow icon={Phone} label="Sales & general" href={phoneHref} value={COMPANY.phone} highlight />
                <ContactRow icon={Mail} label="Email" href={mailHref} value={COMPANY.email} />
                <ContactRow icon={MapPin} label="Main showroom" value={COMPANY.address} />
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white border border-border">
                    <Clock className="h-5 w-5 text-[hsl(var(--secondary))]" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-sans-brand font-semibold uppercase tracking-wider text-muted-foreground">
                      Hours
                    </span>
                    {officeHours.map(h => (
                      <span key={h.days} className="block text-sm text-[hsl(var(--primary))] mt-0.5">
                        <span className="font-medium">{h.days}:</span> {h.hours}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <DealerFormCard
                title="Send a message"
                description="We typically respond within one business day. Required fields are marked."
              >
                <form onSubmit={onSubmit}>
                  <DealerFormStack>
                    <DealerFormGrid cols={2}>
                      <DealerField label="Full name" htmlFor="contact-name">
                        <DealerInput id="contact-name" name="name" required autoComplete="name" placeholder="Jane Doe" />
                      </DealerField>
                      <DealerField label="Phone" htmlFor="contact-phone">
                        <DealerInput id="contact-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(512) 555-0100" />
                      </DealerField>
                    </DealerFormGrid>
                    <DealerField label="Email" htmlFor="contact-email">
                      <DealerInput id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
                    </DealerField>
                    <DealerFormGrid cols={2}>
                      <DealerField label="Department" htmlFor="contact-dept">
                        <DealerSelect id="contact-dept" name="department" defaultValue="sales">
                          <option value="sales">Sales</option>
                          <option value="finance">Finance</option>
                          <option value="service">Service</option>
                          <option value="parts">Parts</option>
                        </DealerSelect>
                      </DealerField>
                      <DealerField label="I'm interested in" htmlFor="contact-interest">
                        <DealerSelect id="contact-interest" name="interest" defaultValue="">
                          <option value="">Select (optional)</option>
                          {services.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                        </DealerSelect>
                      </DealerField>
                    </DealerFormGrid>
                    <DealerField label="Message" htmlFor="contact-message">
                      <DealerTextarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Phone model, repair needs, or questions…"
                      />
                    </DealerField>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto min-h-[48px] px-8 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] font-sans-brand text-xs uppercase tracking-wider"
                    >
                      {submitting ? "Sending…" : "Send message"}
                      {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center sm:text-left">
                      Your information is used only to respond to your inquiry.
                    </p>
                  </DealerFormStack>
                </form>
              </DealerFormCard>
            </div>
          </div>
        </DealerFormShell>
      </DealerFormSection>

      <section className="section-padding-inset bg-white border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CONTACT_TRUST_STRIP.map(item => {
            const Icon =
              (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[item.icon] || ShieldCheck;
            return (
              <div key={item.id} className="flex items-start gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[hsl(var(--muted))] border border-border">
                  <Icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div className="min-w-0">
                  <span className="block text-sm font-display font-semibold text-[hsl(var(--primary))]">{item.title}</span>
                  <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  highlight,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  highlight?: boolean;
}) {
  const inner = highlight ? (
    <a href={href} className="block text-lg font-semibold text-[hsl(var(--secondary))] hover:underline break-all">
      {value}
    </a>
  ) : href ? (
    <a href={href} className="block text-sm font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] break-all">
      {value}
    </a>
  ) : (
    <span className="block text-sm text-[hsl(var(--primary))] leading-relaxed">{value}</span>
  );

  return (
    <li className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white border border-border">
        <Icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
      </span>
      <div className="min-w-0">
        <span className="block text-[10px] font-sans-brand font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="mt-0.5">{inner}</div>
      </div>
    </li>
  );
}

export default Contact;
