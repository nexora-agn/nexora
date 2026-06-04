import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import Layout from "@template-minhs/components/layout/Layout";
import { MINHS_IMAGES } from "@template-minhs/data/siteData";
import ElectricalPageHero from "@template-minhs/components/sections/ElectricalPageHero";
import CTASection from "@template-minhs/components/sections/CTASection";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-minhs/data/siteData";
import { Button } from "@/components/ui/button";

const ServiceAreas = () => {
  const { company: COMPANY, mapEmbedUrl } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <Layout>
      <Helmet>
        <title>Service Areas | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} serves Dallas, Plano, Frisco, Irving, Arlington, and the full DFW metro with residential and commercial electrical services.`}
        />
      </Helmet>

      <ElectricalPageHero
        eyebrow="DFW Coverage"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
        title="Electricians Across North Texas"
        eyebrowAfter="Same-Day Service · 24/7 Emergency Dispatch"
        body="MINHS dispatches master electricians throughout the Dallas–Fort Worth metro — from panel upgrades and EV chargers in Plano to commercial fit-outs in Irving and emergency repairs anywhere power fails."
        image={MINHS_IMAGES.serviceAreasHero}
        imageAlt="European vehicles at an automotive service facility"
      />

      <section className="bg-[hsl(var(--minhs-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-3">
              Cities We Serve
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Licensed, insured, and stocked for same-day service across the metro. Don&apos;t see your city? Call us — we likely cover your neighborhood.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {SERVICE_AREAS.map(city => (
              <span
                key={city}
                className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[hsl(var(--secondary))] px-4 py-2 text-sm font-display font-bold uppercase tracking-wide text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))]/10 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
              Our DFW Home Base
            </h2>
            <p className="text-slate-600 leading-relaxed">
              From our Dallas office, we route crews across North Texas with stocked trucks and master electricians ready for residential, commercial, and emergency calls.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span className="font-semibold text-[hsl(var(--primary))]">{COMPANY.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <a href={phoneHref} className="font-display font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]">
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
            <Button
              asChild
              className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wide"
            >
              <Link to="/contact">
                Schedule Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-7 rounded-lg overflow-hidden min-h-[360px] ring-1 ring-slate-200">
            <iframe
              title="MINHS service area map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Need an electrician in your area?"
        subtitle="24/7 emergency dispatch and same-day service across the Dallas metro."
        primaryLabel="REQUEST ESTIMATE"
        secondaryLabel="CALL NOW"
      />
    </Layout>
  );
};

export default ServiceAreas;
