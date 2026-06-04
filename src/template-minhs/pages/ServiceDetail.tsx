import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Phone, FileCheck, Check, Search, Hammer, ShieldCheck, Calendar } from "lucide-react";
import Layout from "@template-minhs/components/layout/Layout";
import ElectricalPageHero from "@template-minhs/components/sections/ElectricalPageHero";
import LeadContactSection from "@template-minhs/components/home/LeadContactSection";
import CTASection from "@template-minhs/components/sections/CTASection";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";
import { useTheme } from "@template-minhs/contexts/ThemeContext";
import { MINHS_IMAGES } from "@template-minhs/data/siteData";
import { resolveMinhsServiceImage, resolveMinhsServiceSectionImage } from "@template-minhs/lib/media";
import { getServiceIcon } from "@template-minhs/lib/serviceIcons";
import { Button } from "@/components/ui/button";

const PROCESS_STEP_ICONS = [Calendar, Search, FileCheck, Hammer, ShieldCheck] as const;

const ServiceDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { company: COMPANY, services, serviceSections, processSteps } = useSiteContent();
  const { resolveServiceImage, resolveServiceSectionImage } = useTheme();
  const svc = services.find(s => s.id === id);
  const detail = serviceSections.find(s => s.id === id);

  const title = svc ? `${svc.title} | ${COMPANY.name}` : `Automotive Services | ${COMPANY.name}`;
  const desc = svc?.description || `European auto repair from ${COMPANY.name} in Brooklyn, NY.`;

  const heroImage = svc
    ? resolveMinhsServiceImage(svc.id, resolveServiceImage(svc.id, svc.image))
    : MINHS_IMAGES.serviceBay;

  const sectionImage = detail
    ? resolveMinhsServiceSectionImage(
        detail.id,
        resolveServiceSectionImage(detail.id, detail.image),
      )
    : null;

  const ServiceIcon = svc ? getServiceIcon(svc.icon) : ShieldCheck;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>

      {!svc ? (
        <ElectricalPageHero
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Not found" }]}
          title="Service Not Found"
          body="That service doesn't exist. Browse our full European automotive service catalog."
          image={MINHS_IMAGES.serviceBay}
        />
      ) : (
        <>
          <ElectricalPageHero
            breadcrumb={[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: svc.title },
            ]}
            title={svc.title}
            eyebrowAfter={`${COMPANY.name} · European Specialists`}
            body={svc.description}
            image={heroImage}
            imageAlt={svc.title}
            badges={
              <span className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-2 text-xs font-display font-bold uppercase tracking-wider">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                  <ServiceIcon className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" strokeWidth={1.75} />
                </span>
                {svc.title}
              </span>
            }
          />

          {detail ? (
            <section className="bg-[hsl(var(--minhs-surface))] py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-display font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))]">
                    {detail.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                    {detail.title}
                  </h2>
                  <p className="text-sm text-slate-600 font-display font-bold uppercase tracking-wider">{detail.subtitle}</p>
                  {detail.body.map((p, i) => (
                    <p key={i} className="text-sm text-slate-700 leading-relaxed">
                      {p}
                    </p>
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
                <div className="rounded-lg overflow-hidden ring-1 ring-slate-200 min-h-[280px]">
                  <img
                    src={sectionImage ?? heroImage}
                    alt={`${svc.title} — workshop`}
                    className="w-full h-full min-h-[280px] object-cover"
                    loading="lazy"
                  />
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
                  const Icon = PROCESS_STEP_ICONS[i] ?? Hammer;
                  return (
                    <div key={s.id} className="text-center">
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-[hsl(var(--primary))] text-white text-xs font-bold mb-3">
                        {i + 1}
                      </span>
                      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mt-3">
                        {s.label}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{s.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-[hsl(var(--primary))] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase">Schedule {svc.title}</h2>
                <p className="mt-2 text-sm text-white/75 max-w-lg">
                  Call our Brooklyn shop or request an appointment online — transparent estimates on every European
                  vehicle.
                </p>
              </div>
              <Button
                asChild
                className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase shrink-0"
              >
                <a href={`tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`}>
                  <Phone className="mr-1.5 h-4 w-4" />
                  {COMPANY.phone}
                </a>
              </Button>
            </div>
          </section>

          <CTASection
            title={`Ready for ${svc.title.toLowerCase()}?`}
            subtitle="Schedule your appointment or call our Brooklyn shop for transparent estimates on European vehicle repair."
          />
          <LeadContactSection />
        </>
      )}
    </Layout>
  );
};

export default ServiceDetail;
