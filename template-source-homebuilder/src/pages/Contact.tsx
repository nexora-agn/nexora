import { Helmet } from "react-helmet-async";
import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Award, Users } from "lucide-react";
import Layout from "@template-homebuilder/components/layout/Layout";
import { HOME_BUILDER_IMAGES } from "@template-homebuilder/data/siteData";
import HarborPageHero from "@template-homebuilder/components/sections/HarborPageHero";
import { useSiteContent } from "@template-homebuilder/contexts/SiteContentContext";
import { CONTACT_TRUST_STRIP } from "@template-homebuilder/data/siteData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const trustIconMap = { ShieldCheck, Award, Users, Clock } as const;

const Contact = () => {
  const { company: COMPANY, officeHours, services } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! A master painter will reach out within one business day.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  const inputCls =
    "w-full rounded-md bg-white border border-slate-200 text-[hsl(var(--primary))] placeholder:text-slate-400 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]";

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | {COMPANY.name}</title>
        <meta name="description" content={`Contact ${COMPANY.name} for free painting estimates and Free estimate emergency service across Central NJ.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Contact"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        title="Let's Power Your Project"
        body="Free estimates, same-day service, and Free estimate emergency dispatch — reach out and a licensed master painter will respond fast."
        image={HOME_BUILDER_IMAGES.contactHero}
        imageAlt="Contact HarborStone Design-Build"
      />

      <section className="bg-[hsl(var(--primary))] text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide mb-2">
                Get In Touch
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Call for emergencies anytime. For project estimates, fill out the form or email us — we respond within one business day.
              </p>
            </div>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                  <Phone className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div>
                  <span className="block text-xs font-display font-bold uppercase tracking-wider text-white/60">Phone · Free estimate Emergency</span>
                  <a href={phoneHref} className="block font-display text-lg font-bold text-[hsl(var(--secondary))] hover:underline mt-0.5">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                  <Mail className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div>
                  <span className="block text-xs font-display font-bold uppercase tracking-wider text-white/60">Email</span>
                  <a href={mailHref} className="block font-semibold text-white hover:text-[hsl(var(--secondary))] mt-0.5">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                  <MapPin className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div>
                  <span className="block text-xs font-display font-bold uppercase tracking-wider text-white/60">Office</span>
                  <span className="block text-sm text-white/90 mt-0.5">{COMPANY.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                  <Clock className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div>
                  <span className="block text-xs font-display font-bold uppercase tracking-wider text-white/60">Hours</span>
                  {officeHours.map(h => (
                    <span key={h.days} className="block text-sm text-white/90 mt-0.5">
                      <span className="font-semibold">{h.days}:</span> {h.hours}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white text-[hsl(var(--primary))] rounded-lg p-6 lg:p-8 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-1">
              Request a Free Estimate
            </h3>
            <p className="text-sm text-slate-500 mb-5">No obligation. Master painter review within one business day.</p>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required type="text" placeholder="Full Name" className={inputCls} />
              <input required type="tel" placeholder="Phone Number" className={inputCls} />
              <input required type="email" placeholder="Email Address" className={`${inputCls} sm:col-span-2`} />
              <input type="text" placeholder="Property Address" className={`${inputCls} sm:col-span-2`} />
              <select defaultValue="" className={`${inputCls} sm:col-span-2`}>
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
                placeholder="Describe your painting issue or project (optional)"
                rows={4}
                className={`${inputCls} sm:col-span-2 resize-none`}
              />
              <Button
                type="submit"
                disabled={submitting}
                className="sm:col-span-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wide py-5"
              >
                {submitting ? "Sending…" : "Send Request"}
                {!submitting && <ArrowRight className="ml-1.5 h-4 w-4" />}
              </Button>
            </form>
            <p className="mt-3 text-[11px] text-slate-500 text-center">
              We respect your privacy. Your information stays with HarborStone Design-Build.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--flow-surface))] py-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_TRUST_STRIP.map(item => {
            const Icon = trustIconMap[(item.icon as keyof typeof trustIconMap)] || ShieldCheck;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/10 ring-1 ring-[hsl(var(--secondary))]/25">
                  <Icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div className="leading-tight">
                  <span className="block text-sm font-display font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                    {item.title}
                  </span>
                  <span className="block text-xs text-slate-600 mt-0.5">{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
