import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  Phone,
  Search,
  Cloud,
  Wind,
  CloudLightning,
  TreePine,
  Droplets,
  Snowflake,
  Hammer,
  ShieldCheck,
  Clock,
  Home as HomeIcon,
  FileCheck,
  DollarSign,
  ArrowRight,
  Check,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import NexoraPageHero from "@/components/sections/NexoraPageHero";
import ClientStoriesSection from "@/components/home/ClientStoriesSection";
import LeadContactSection from "@/components/home/LeadContactSection";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  STORM_CHECKLIST,
  INSPECTION_BENEFITS,
  INSPECTION_TYPES,
  INSPECTION_CHECKLIST,
} from "@/data/siteData";
import { Button } from "@/components/ui/button";

const claimTypeIconMap = { Cloud, Wind, CloudLightning, TreePine, Droplets, Snowflake } as const;
const benefitIconMap = { ShieldCheck, Clock, HomeIcon, FileCheck, DollarSign, Home: HomeIcon } as const;

/* ---------------- INSURANCE CLAIMS LAYOUT ---------------- */
const InsuranceClaimsLayout = () => {
  const { processSteps, commercialFitoutCards: claimTypes, faqItems, company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <>
      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Insurance Claims" }]}
        title="Insurance Claims Made Easy."
        eyebrowAfter="We Advocate for You."
        body="Dealing with insurance can be stressful. Our team has the experience to guide you through the process and maximize your claim so you can get the roof you need."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&h=900&fit=crop"
        badges={
          <div className="flex flex-wrap gap-3">
            {[
              { id: "spec", t: "Insurance Claim Specialists", I: ShieldCheck },
              { id: "max", t: "Maximize Your Coverage", I: FileCheck },
              { id: "fast", t: "Fast, Hassle-Free Process", I: Clock },
            ].map(({ id, t, I }) => (
              <span key={id} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                  <I className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                </span>
                {t}
              </span>
            ))}
          </div>
        }
      />

      {/* Process steps */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-10">
            How We Help With Your Insurance Claim
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.slice(0, 5).map((s, i) => {
              const stepIcons = [Search, FileCheck, ShieldCheck, DollarSign, Hammer];
              const Icon = stepIcons[i] || Hammer;
              return (
                <div key={s.id} className="text-center relative">
                  <div className="flex flex-col items-center gap-3">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center justify-center h-7 w-7 rounded-md bg-[hsl(var(--primary))] text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="mt-3 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mt-1">{s.label}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Types of claims */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-10">
            Types of Claims We Handle
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {claimTypes.map(c => {
              const Icon = claimTypeIconMap[(c.icon as keyof typeof claimTypeIconMap)] || Cloud;
              return (
                <article key={c.id} className="bg-white rounded-md border border-slate-100 overflow-hidden">
                  <div className="relative aspect-square bg-slate-100">
                    <img
                      src={`https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=400&h=400&fit=crop&auto=format&q=80`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                    <span className="absolute bottom-2 left-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mb-1">{c.title}</h3>
                    <p className="text-[11px] text-slate-600 leading-snug">{c.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Side: We're on your side */}
      <section className="bg-[hsl(var(--primary))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-block text-[hsl(var(--secondary))] text-xs font-bold tracking-[0.18em] uppercase">
              We Work With All Insurance Companies
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight">
              We're On Your Side, Not The Insurance Company's.
            </h2>
            <p className="text-white/80 leading-relaxed text-sm">
              We represent you, not the insurance company. Our goal is to make sure you get a fair settlement and a roof that lasts.
            </p>
            <ul className="space-y-2.5">
              {[
                "We know the insurance process",
                "We document everything",
                "We advocate for maximum coverage",
                "You pay your deductible, we handle the rest",
              ].map(b => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20">
                    <Check className="h-3 w-3 text-[hsl(var(--secondary))]" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-lg p-6 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-4">
              What To Do After Storm Damage
            </h3>
            <ol className="space-y-3">
              {STORM_CHECKLIST.map((s, i) => (
                <li key={s.id} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[hsl(var(--primary))]">{s.title}</h4>
                    <p className="text-xs text-slate-600 leading-snug">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden lg:block lg:col-span-3">
            <img
              src="https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=600&h=600&fit=crop"
              alt="Roof inspection"
              className="rounded-md object-cover w-full h-full"
            />
          </div>
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
          <div className="relative rounded-lg overflow-hidden min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=700&fit=crop"
              alt="Beautiful home"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/40 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <span className="block text-[hsl(var(--secondary))] text-xs font-bold tracking-[0.18em] uppercase mb-2">
                We're Here To Help
              </span>
              <h3 className="text-xl font-black uppercase mb-3">Let Us Handle The Insurance Hassle.</h3>
              <p className="text-white/85 text-sm mb-4 leading-relaxed">
                Our experts will guide you every step of the way and make the process simple and stress-free.
              </p>
              <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase">
                <a href={phoneHref}>
                  <Phone className="mr-1.5 h-4 w-4" /> Call Now: {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LeadContactSection />
    </>
  );
};

/* ---------------- ROOF INSPECTIONS LAYOUT ---------------- */
const RoofInspectionsLayout = () => {
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <>
      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Roof Inspections" }]}
        title="Roof Inspections"
        eyebrowAfter="Know Your Roof. Protect Your Home."
        body="Regular roof inspections help catch small issues before they become costly problems. Our detailed inspections give you peace of mind and help extend the life of your roof."
        image="https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=1400&h=900&fit=crop"
        badges={
          <div className="flex flex-wrap gap-3">
            {[
              { id: "twice", t: "Recommended Twice a Year", I: Clock },
              { id: "protect", t: "Protect Your Home & Investment", I: HomeIcon },
              { id: "save", t: "Save Money on Future Repairs", I: DollarSign },
            ].map(({ id, t, I }) => (
              <span key={id} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                  <I className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                </span>
                {t}
              </span>
            ))}
          </div>
        }
      />

      {/* Benefits */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-10">
            The Benefits of Regular Roof Inspections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {INSPECTION_BENEFITS.map(b => {
              const Icon = benefitIconMap[(b.icon as keyof typeof benefitIconMap)] || ShieldCheck;
              return (
                <div key={b.id} className="text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full text-[hsl(var(--primary))] mb-3">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspection types */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-10">
            Types of Roof Inspections We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSPECTION_TYPES.map(t => (
              <article key={t.id} className="bg-white rounded-md overflow-hidden border border-slate-100">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <img src={t.image} alt={t.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">{t.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What we inspect + image */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-4">
              What We Inspect
            </h3>
            <ul className="space-y-2">
              {INSPECTION_CHECKLIST.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/15">
                    <Check className="h-3 w-3 text-[hsl(var(--secondary))]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-lg overflow-hidden min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=700&fit=crop"
              alt="Beautiful home"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white max-w-sm">
              <h3 className="text-xl font-black uppercase mb-2">Detailed Reports. Honest Answers.</h3>
              <p className="text-white/85 text-sm mb-4">
                You'll receive an easy-to-understand report with photos and expert recommendations — no pressure, just honest advice.
              </p>
              <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase">
                <Link to="/contact">
                  Schedule Your Inspection
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ClientStoriesSection />
      <LeadContactSection />
    </>
  );
};

/* ---------------- GENERIC SERVICE LAYOUT ---------------- */
const GenericServiceLayout = ({ id }: { id: string }) => {
  const { services, serviceSections, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const svc = services.find(s => s.id === id);
  const detail = serviceSections.find(s => s.id === id);

  if (!svc) {
    return (
      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Not found" }]}
        title="Service not found"
        body="Looks like that service no longer exists. Browse all of our roofing services below."
        image="https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=1400&h=900&fit=crop"
      />
    );
  }

  return (
    <>
      <NexoraPageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: svc.title },
        ]}
        title={svc.title}
        eyebrowAfter={`${COMPANY.name} — Roofing Done Right.`}
        body={svc.description}
        image={resolveServiceImage(svc.id, svc.image)}
      />

      {detail && (
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))]">{detail.category}</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))]">{detail.title}</h2>
              <p className="text-sm text-slate-600 uppercase font-bold tracking-wider">{detail.subtitle}</p>
              {detail.body.map((p, i) => (
                <p key={i} className="text-sm text-slate-700 leading-relaxed">{p}</p>
              ))}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {detail.inclusions.map(inc => (
                  <li key={inc} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/15">
                      <Check className="h-3 w-3 text-[hsl(var(--secondary))]" />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src={detail.image} alt={detail.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <LeadContactSection />
    </>
  );
};

const ServiceDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { company: COMPANY } = useSiteContent();
  const svc = useSiteContent().services.find(s => s.id === id);

  const title = svc ? `${svc.title} | ${COMPANY.name}` : `Roofing Services | ${COMPANY.name}`;
  const desc = svc?.description || `Roofing services from ${COMPANY.name}.`;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>

      {id === "insurance-claims" && <InsuranceClaimsLayout />}
      {id === "roof-inspections" && <RoofInspectionsLayout />}
      {id !== "insurance-claims" && id !== "roof-inspections" && <GenericServiceLayout id={id} />}
    </Layout>
  );
};

export default ServiceDetail;
