import { Helmet } from "react-helmet-async";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import NexoraPageHero from "@/components/sections/NexoraPageHero";
import LeadContactSection from "@/components/home/LeadContactSection";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { CONTACT_TRUST_STRIP } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const trustIconMap = { ShieldCheck, Award, Users, Clock } as const;

const Contact = () => {
  const { company: COMPANY, officeHours, services, faqItems, mapEmbedUrl } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll be in touch within 24 hours.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  const inputCls = "w-full rounded-md bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:bg-white";

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | {COMPANY.name}</title>
        <meta name="description" content={`Get in touch with ${COMPANY.name}.`} />
      </Helmet>

      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
        title="We're Here to Help."
        eyebrowAfter="Let's Talk."
        body="Have a question or need a free estimate? Fill out the form and our team will get back to you as soon as possible."
        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop"
        badges={
          <div className="flex flex-wrap gap-3">
            {[
              { id: "fast", t: "Fast Response", s: "We reply quickly", I: Clock },
              { id: "free", t: "No Obligation", s: "100% free estimates", I: CheckCircle },
              { id: "local", t: "Local & Trusted", s: "Here for our community", I: ShieldCheck },
            ].map(({ id, t, s, I }) => (
              <span key={id} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                  <I className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                </span>
                <span className="leading-tight">
                  <span className="block">{t}</span>
                  <span className="block text-[10px] text-white/60 font-normal">{s}</span>
                </span>
              </span>
            ))}
          </div>
        }
        rightSlot={
          <div className="bg-white text-slate-900 rounded-lg p-5 lg:p-6 shadow-2xl">
            <h3 className="text-base font-extrabold uppercase tracking-wide text-[hsl(var(--primary))] mb-4">
              Request a Free Estimate
            </h3>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required type="text" placeholder="Full Name" className={inputCls} />
              <input required type="tel" placeholder="Phone Number" className={inputCls} />
              <input required type="email" placeholder="Email Address" className={inputCls} />
              <input type="text" placeholder="Address" className={inputCls} />
              <select defaultValue="" className={`${inputCls} sm:col-span-2`}>
                <option value="" disabled>Service Needed</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <textarea
                placeholder="Tell us about your project (optional)"
                rows={3}
                className={`${inputCls} sm:col-span-2 resize-none`}
              />
              <Button
                type="submit"
                disabled={submitting}
                className="sm:col-span-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase tracking-wide py-5"
              >
                {submitting ? "Sending…" : "Send Request"}
                {!submitting && <ArrowRight className="ml-1.5 h-4 w-4" />}
              </Button>
            </form>
            <p className="mt-3 text-[11px] text-slate-500 text-center">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        }
      />

      {/* Get In Touch row */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Call Us 24/7</span>
                  <a href={phoneHref} className="block font-extrabold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Email Us</span>
                  <a href={mailHref} className="block font-semibold text-slate-700 hover:text-[hsl(var(--primary))] truncate">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Visit Our Office</span>
                  <span className="block font-semibold text-slate-700">{COMPANY.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Office Hours</span>
                  {officeHours.map(h => (
                    <span key={h.days} className="block text-sm text-slate-700">
                      <span className="font-semibold">{h.days}:</span> {h.hours}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-4">
              Our Service Area
            </h3>
            <p className="text-sm text-slate-700 mb-4">Proudly serving homeowners across North Texas.</p>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-700">
              {["Frisco, TX", "McKinney, TX", "Plano, TX", "Allen, TX", "Prosper, TX", "Dallas, TX"].map(area => (
                <li key={area} className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">and surrounding areas</p>
          </div>

          <div className="bg-slate-50 rounded-lg overflow-hidden min-h-[280px] lg:min-h-0">
            <iframe
              title="Map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[280px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[hsl(var(--primary))] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_TRUST_STRIP.map(item => {
            const Icon = trustIconMap[(item.icon as keyof typeof trustIconMap)] || ShieldCheck;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                  <Icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </span>
                <div className="leading-tight">
                  <span className="block text-sm font-bold">{item.title}</span>
                  <span className="block text-xs text-white/70">{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ + image */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqItems.slice(0, 5).map((f, i) => (
                <details key={f.question} className="group rounded-md border border-slate-200 bg-white" open={i === 0}>
                  <summary className="flex items-center justify-between gap-3 cursor-pointer px-4 py-3 text-sm font-semibold text-[hsl(var(--primary))]">
                    {f.question}
                    <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="px-4 pb-3 text-sm text-slate-600 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=900&fit=crop"
              alt="Roofer at work"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white max-w-sm">
              <h3 className="text-xl font-black uppercase mb-2">Need Service Now?</h3>
              <p className="text-white/85 text-sm mb-4">Call us any time for emergency roofing assistance.</p>
              <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase">
                <a href={phoneHref}>
                  <Phone className="mr-1.5 h-4 w-4" /> {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default Contact;
