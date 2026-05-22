import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  Phone,
  Cloud,
  Wind,
  CloudLightning,
  TreePine,
  Droplets,
  Snowflake,
  ShieldCheck,
  Clock,
  Home as HomeIcon,
  FileCheck,
  ArrowRight,
  Check,
  Search,
  Hammer,
  Flame,
  DollarSign,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import HarborPageHero from "@/components/sections/HarborPageHero";
import ClientStoriesSection from "@/components/home/ClientStoriesSection";
import LeadContactSection from "@/components/home/LeadContactSection";
import CTASection from "@/components/sections/CTASection";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  STORM_CHECKLIST,
  INSPECTION_BENEFITS,
  INSPECTION_TYPES,
  INSPECTION_CHECKLIST,
  REMODELER_IMAGES,
} from "@/data/siteData";
import { Button } from "@/components/ui/button";

const scenarioIconMap = { Cloud, Wind, CloudLightning, TreePine, Droplets, Snowflake } as const;
const benefitIconMap = { ShieldCheck, Clock, HomeIcon, FileCheck, DollarSign, Home: HomeIcon } as const;

const EmergencyTreeLayout = () => {
  const { processSteps, commercialFitoutCards: scenarios, company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <>
      <HarborPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Emergency Tree Service" }]}
        title="24/7 Emergency Tree Service"
        eyebrowAfter="ISA Arborists · Rapid Dispatch"
        body="When storms bring down limbs or trees threaten your home, you need certified arborists — not untrained crews. HarborStone dispatches rigging teams across North Jersey to secure hazards and restore safety."
        image={REMODELER_IMAGES.emergencyTree}
        imageAlt="Emergency tree removal"
        badges={
          <div className="flex flex-wrap gap-3">
            {[
              { id: "dispatch", t: "24/7 Dispatch", I: Flame },
              { id: "master", t: "ISA Arborists", I: ShieldCheck },
              { id: "fast", t: "2–4 Hour Response", I: Clock },
            ].map(({ id, t, I }) => (
              <span key={id} className="badge-pill inline-flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                  <I className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                </span>
                {t}
              </span>
            ))}
          </div>
        }
      />

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-10">
            Storm & Hazard Scenarios We Handle
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {scenarios.map(c => {
              const Icon = scenarioIconMap[(c.icon as keyof typeof scenarioIconMap)] || Cloud;
              return (
                <article key={c.id} className="bg-white rounded-lg border border-slate-100 p-4 text-center hover:border-[hsl(var(--secondary))]/40 transition-colors">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white mb-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mb-1">{c.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">{c.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-10">
            Our Emergency Process
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.slice(0, 5).map((s, i) => {
              const stepIcons = [Phone, Search, FileCheck, Hammer, ShieldCheck];
              const Icon = stepIcons[i] || Hammer;
              return (
                <div key={s.id} className="text-center relative">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-[hsl(var(--primary))] text-white text-xs font-bold mb-3">
                    {i + 1}
                  </span>
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mt-3">{s.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--primary))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-block text-[hsl(var(--secondary))] text-xs font-display font-bold tracking-[0.18em] uppercase">
              When Power Fails
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight">
              What To Do Before We Arrive
            </h2>
            <p className="text-white/80 leading-relaxed text-sm">
              Stay clear of downed lines and damaged trees, then call HarborStone. We triage urgency and dispatch certified crews — often within 2–4 hours across North Jersey.
            </p>
            <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase">
              <a href={phoneHref}>
                <Phone className="mr-1.5 h-4 w-4" /> Call Emergency: {COMPANY.phone}
              </a>
            </Button>
          </div>
          <div className="lg:col-span-4 bg-white text-[hsl(var(--primary))] rounded-lg p-6 shadow-2xl">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] mb-4">Storm & Outage Checklist</h3>
            <ol className="space-y-3">
              {STORM_CHECKLIST.map((s, i) => (
                <li key={s.id} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-display font-bold">{s.title}</h4>
                    <p className="text-xs text-slate-600 leading-snug">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden lg:block lg:col-span-3">
            <img
              src={REMODELER_IMAGES.crewWorking}
              alt="Storm-damaged tree service"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <ClientStoriesSection />
      <LeadContactSection />
    </>
  );
};

const paintingInspectionsLayout = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <>
      <HarborPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Design Consultation" }]}
        title="Design Consultation"
        eyebrowAfter="Know Your Panel. Protect Your Home."
        body="Pre-purchase, insurance, and safety inspections with detailed photo reports — catch hazards before they fail and know your home meets NEC standards."
        image={REMODELER_IMAGES.heroHome}
        imageAlt="painting inspection"
        badges={
          <div className="flex flex-wrap gap-3">
            {[
              { id: "photo", t: "Photo Reports", I: FileCheck },
              { id: "nec", t: "NEC Compliance", I: ShieldCheck },
              { id: "honest", t: "Honest Recommendations", I: HomeIcon },
            ].map(({ id, t, I }) => (
              <span key={id} className="badge-pill inline-flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                  <I className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                </span>
                {t}
              </span>
            ))}
          </div>
        }
      />

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-10">
            Benefits of Design Consultation
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {INSPECTION_BENEFITS.map(b => {
              const Icon = benefitIconMap[(b.icon as keyof typeof benefitIconMap)] || ShieldCheck;
              return (
                <div key={b.id} className="text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full text-[hsl(var(--secondary))] mb-3">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mb-2">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-10">
            Types of Inspections We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSPECTION_TYPES.map(t => (
              <article key={t.id} className="bg-white rounded-lg overflow-hidden border border-slate-100 hover:border-[hsl(var(--secondary))]/40 transition-colors">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <img src={t.image} alt={t.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">{t.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-4">
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
          <div className="relative rounded-lg overflow-hidden min-h-[280px] bg-[hsl(var(--primary))]">
            <img
              src={REMODELER_IMAGES.luxuryBackyard}
              alt="architectural plans inspection"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white max-w-sm">
              <h3 className="font-display text-xl font-bold uppercase mb-2">Detailed Reports. Honest Answers.</h3>
              <p className="text-white/85 text-sm mb-4">
                Photo-documented findings with clear recommendations — no jargon, no scare tactics.
              </p>
              <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase">
                <Link to="/contact">
                  Schedule Inspection
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

const GenericServiceLayout = ({ id }: { id: string }) => {
  const { services, serviceSections, processSteps, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const svc = services.find(s => s.id === id);
  const detail = serviceSections.find(s => s.id === id);

  if (!svc) {
    return (
      <HarborPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Not found" }]}
        title="Service Not Found"
        body="That service doesn't exist. Browse our full custom home design-build service catalog."
        image={REMODELER_IMAGES.heroHome}
      />
    );
  }

  return (
    <>
      <HarborPageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: svc.title },
        ]}
        title={svc.title}
        eyebrowAfter={`${COMPANY.name} · Licensed Crews`}
        body={svc.description}
        image={resolveServiceImage(svc.id, svc.image)}
        imageAlt={svc.title}
      />

      {detail ? (
        <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-display font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))]">{detail.category}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))]">{detail.title}</h2>
              <p className="text-sm text-slate-600 font-display font-bold uppercase tracking-wider">{detail.subtitle}</p>
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
            <div className="rounded-lg overflow-hidden ring-1 ring-slate-200">
              <img src={detail.image} alt={detail.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.slice(0, 5).map((s, i) => {
              const stepIcons = [Phone, Search, FileCheck, Hammer, ShieldCheck];
              const Icon = stepIcons[i] || Hammer;
              return (
                <div key={s.id} className="text-center">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-[hsl(var(--primary))] text-white text-xs font-bold mb-3">
                    {i + 1}
                  </span>
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mt-3">{s.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title={`Ready for ${svc.title.toLowerCase()}?`}
        subtitle="Free property walkthroughs from licensed custom home design-build care crews across North Jersey."
      />
      <LeadContactSection />
    </>
  );
};

const ServiceDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { company: COMPANY, services } = useSiteContent();
  const svc = services.find(s => s.id === id);

  const title = svc ? `${svc.title} | ${COMPANY.name}` : `Design-Build Services | ${COMPANY.name}`;
  const desc = svc?.description || `Landscaping and tree services from ${COMPANY.name} across North Jersey.`;

  const layout =
    id === "emergency-tree-service" ? (
      <EmergencyTreeLayout />
    ) : (
      <GenericServiceLayout id={id} />
    );

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>

      {layout}
    </Layout>
  );
};

export default ServiceDetail;
