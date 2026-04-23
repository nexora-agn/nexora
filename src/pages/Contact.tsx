import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { companyAddressDisplay, COMPANY_LEGAL } from "@/lib/companyLegal";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        title="Contact"
        description="Questions or demos. We reply within one business day."
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:items-start">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Direct lines
              </p>
              <ul className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background text-foreground">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <a
                      href="mailto:hello@nexora.com"
                      className="mt-0.5 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      hello@nexora.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background text-foreground">
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    <a
                      href="tel:+15550000000"
                      className="mt-0.5 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      +1 (555) 000-0000
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background text-foreground">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Registered office</p>
                    <p className="mt-0.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {companyAddressDisplay()}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {COMPANY_LEGAL.legalName} · CR {COMPANY_LEGAL.commercialRegistration}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              For privacy-related requests, please reference our{" "}
              <Link
                to="/privacy"
                className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
              >
                Privacy policy
              </Link>
              .
            </p>
          </aside>

          <div className="rounded-2xl border border-border/70 bg-card/40 p-8 shadow-sm md:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center py-10 text-center md:min-h-[320px]"
                role="status"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                  <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden />
                </div>
                <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  Message received
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thank you for reaching out. A member of our team will follow up shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Jordan Smith"
                    required
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Work email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="Project inquiry"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us briefly about your goals, timeline, and how we can help."
                    required
                    className="min-h-[140px] resize-y rounded-lg"
                  />
                </div>
                <Button type="submit" className="h-11 w-full rounded-lg text-base font-semibold md:w-auto md:px-10">
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Contact;
