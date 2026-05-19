import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import Layout from "@template-plumbing/components/layout/Layout";
import { PLUMBING_IMAGES } from "@template-plumbing/data/siteData";
import { SEO_CITIES } from "@template-plumbing/data/seoCities";
import PlumbingPageHero from "@template-plumbing/components/sections/PlumbingPageHero";
import CTASection from "@template-plumbing/components/sections/CTASection";
import { useSiteContent } from "@template-plumbing/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-plumbing/data/siteData";
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
          content={`${COMPANY.name} serves Somerset, Morris, Hunterdon, Essex, and Union counties with residential and commercial plumbing — 24/7 emergency service.`}
        />
      </Helmet>

      <PlumbingPageHero
        eyebrow="Central New Jersey"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
        title="Plumbing Service Areas"
        eyebrowAfter="Somerset · Morris · Hunterdon · Essex · Union"
        body="ClearCurrent Plumbing dispatches licensed master plumbers throughout Central New Jersey — from emergency repairs and drain cleaning to water heaters, boilers, and leak detection."
        image={PLUMBING_IMAGES.van}
        imageAlt="ClearCurrent Plumbing service van"
        dark={false}
      />

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--primary))] mb-3">
              Cities We Serve
            </h2>
            <p className="text-muted-foreground leading-relaxed font-sans-brand">
              Licensed, insured, and stocked for same-day service across five counties. Select your city for
              local plumbing information.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEO_CITIES.map(city => (
              <Link
                key={city.slug}
                to={`/areas/${city.slug}`}
                className="group flex items-start gap-3 rounded-sm border border-border bg-white p-5 flow-shadow-card hover:border-[hsl(var(--secondary))]/50 transition-colors"
              >
                <MapPin className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span>
                  <span className="block font-display font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))]">
                    {city.name}, NJ
                  </span>
                  <span className="text-sm text-muted-foreground font-sans-brand">{city.county}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {SERVICE_AREAS.map(city => (
              <span
                key={city}
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-2 text-sm font-sans-brand text-[hsl(var(--primary))]"
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
            <h2 className="font-display text-2xl font-bold text-[hsl(var(--primary))]">
              Hillsborough, NJ — Home Base
            </h2>
            <p className="text-muted-foreground leading-relaxed font-sans-brand">
              Family-owned for nearly 30 years, we route crews across Central New Jersey with stocked trucks
              and ID-badged technicians ready for residential, commercial, and emergency calls.
            </p>
            <ul className="space-y-4 text-sm font-sans-brand">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span className="font-semibold text-[hsl(var(--primary))]">{COMPANY.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <a
                  href={phoneHref}
                  className="font-display font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
                >
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
            <Button
              asChild
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 font-sans-brand font-semibold rounded-sm"
            >
              <Link to="/contact">
                Request Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-7 rounded-sm overflow-hidden min-h-[360px] ring-1 ring-border">
            <iframe
              title="ClearCurrent Plumbing service area map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Need a plumber in your area?"
        subtitle="24/7 emergency dispatch and convenient scheduling across Central New Jersey."
        primaryLabel="REQUEST SERVICE"
        secondaryLabel="CALL NOW"
      />
    </Layout>
  );
};

export default ServiceAreas;
