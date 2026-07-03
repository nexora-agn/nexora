import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";
import { SERVICE_CATEGORIES, BARBERSHOP_IMAGES, SERVICES_PAGE_INTRO, COMPANY } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const Services = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filtered = useMemo(
    () => (activeCategory === "all" ? services : services.filter(s => s.categoryId === activeCategory)),
    [services, activeCategory],
  );

  const setCategory = (id: string) => {
    if (id === "all") setSearchParams({});
    else setSearchParams({ category: id });
  };

  return (
    <Layout>
      <Helmet>
        <title>Services | {COMPANY.name}</title>
        <meta name="description" content={SERVICES_PAGE_INTRO} />
      </Helmet>

      <PageHeader
        eyebrow="Our Menu"
        title="Services & Pricing"
        subtitle={SERVICES_PAGE_INTRO}
        image={BARBERSHOP_IMAGES.servicesHero}
      />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={cn(
                "px-4 py-2 text-xs font-sans-brand font-semibold uppercase tracking-wide border transition-colors",
                activeCategory === "all" ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border text-muted-foreground hover:border-[hsl(var(--primary))]/40",
              )}
            >
              All Services
            </button>
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-4 py-2 text-xs font-sans-brand font-semibold uppercase tracking-wide border transition-colors",
                  activeCategory === cat.id ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border text-muted-foreground hover:border-[hsl(var(--primary))]/40",
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <Reveal key={service.id} direction="up" delay={(i % 3) * 90}>
                <div className="card-luxury group flex flex-col h-full">
                  <div className="image-zoom relative h-52">
                    <img src={resolveServiceImage(service.id, service.image)} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute top-3 right-3 bg-[hsl(var(--primary))] text-white text-xs font-bold px-3 py-1.5">
                      {service.priceLabel}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg uppercase text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">{service.description}</p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> {service.duration}
                      </span>
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--secondary))] hover:gap-2 transition-all"
                      >
                        Book Now <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
