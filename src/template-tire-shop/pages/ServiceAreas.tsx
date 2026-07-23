import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import Layout from "@template-tire-shop/components/layout/Layout";
import { HOME_BUILDER_IMAGES, SERVICE_AREA_COUNTIES } from "@template-tire-shop/data/siteData";
import { SEO_CITIES } from "@template-tire-shop/data/seoCities";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import CTASection from "@template-tire-shop/components/sections/CTASection";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-tire-shop/data/siteData";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServiceAreas = () => {
  const { company: COMPANY, mapEmbedUrl } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <Layout>
      <Helmet>
        <title>Store Locations | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} — four Austin-area stores for phones, tablets, watches, trade-in, and repairs.`}
        />
      </Helmet>

      <HarborPageHero
        eyebrow="Locations"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
        title="Austin & Central Texas"
        eyebrowAfter="Congress Ave · The Domain · South Lamar · Round Rock"
        body="Visit any Nexora Tires shop for fitment advice, same-day installs, rotations, and flat repair."
        image={HOME_BUILDER_IMAGES.showroom}
        imageAlt="Tire shop service bay"
        dark={false}
      />

      <section className="hb-section-pad section-padding bg-muted/30">
        <div className="container-custom container-inset">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--primary))] mb-3">
              Our stores
            </h2>
            <p className="text-muted-foreground leading-relaxed font-sans-brand">
              Each location stocks core flagships, accessories, and repair bar services — inventory is shared across
              the network when you order online.
            </p>
          </div>
          <Accordion type="multiple" className="w-full max-w-3xl space-y-2 mb-12">
            {SERVICE_AREA_COUNTIES.map(({ county, towns }) => (
              <AccordionItem key={county} value={county} className="rounded-sm border border-border px-4 bg-white">
                <AccordionTrigger className="font-display font-semibold text-[hsl(var(--primary))] hover:no-underline py-4">
                  {county}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-wrap gap-2 pb-4">
                    {towns.map(town => (
                      <li key={town}>
                        <span className="inline-flex rounded-full border border-border px-3 py-1.5 text-sm font-sans-brand text-[hsl(var(--primary))]">
                          {town}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl font-bold text-[hsl(var(--primary))] mb-3">Featured Cities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEO_CITIES.map(city => (
              <Link
                key={city.slug}
                to={`/areas/${city.slug}`}
                className="group flex items-start gap-3 rounded-sm border border-border bg-white p-5 hover:border-[hsl(var(--secondary))]/50 transition-colors"
              >
                <MapPin className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span>
                  <span className="block font-display font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))]">
                    {city.name}, {city.state ?? "NJ"}
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

      <section className="hb-section-pad section-padding bg-white">
        <div className="container-custom container-inset grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-2xl font-bold text-[hsl(var(--primary))]">
              Flemington, NJ — Home Base
            </h2>
            <p className="text-muted-foreground leading-relaxed font-sans-brand">
              Second-generation design-build firm serving Central New Jersey since 1999. Our team coordinates
              architects, engineers, and trade partners under one accountable contract.
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
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-7 rounded-sm overflow-hidden min-h-[360px] ring-1 ring-border">
            <iframe
              title="Nexora Tires store map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Building in Central New Jersey?"
        subtitle="Complimentary consultations for custom homes, additions, and remodeling — we respond within one business day."
        primaryLabel="REQUEST CONSULTATION"
        secondaryLabel="BOOK A CALL"
      />
    </Layout>
  );
};

export default ServiceAreas;
