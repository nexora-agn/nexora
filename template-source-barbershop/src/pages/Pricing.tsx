import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { SERVICE_CATEGORIES, BARBERSHOP_IMAGES, PACKAGES, COMPANY } from "@template-barbershop/data/siteData";

const Pricing = () => {
  const { services } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Pricing | {COMPANY.name}</title>
        <meta name="description" content="Transparent pricing for every haircut, beard service, and grooming package." />
      </Helmet>

      <PageHeader eyebrow="Transparent Pricing" title="Services & Pricing" subtitle="No surprises — every price is listed up front, organized by category." image={BARBERSHOP_IMAGES.pricingHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset max-w-4xl space-y-14">
          {SERVICE_CATEGORIES.map((cat, catIndex) => {
            const items = services.filter(s => s.categoryId === cat.id);
            if (items.length === 0) return null;
            return (
              <Reveal key={cat.id} direction="up" delay={(catIndex % 4) * 60}>
                <div>
                  <h2 className="font-display text-2xl uppercase text-foreground border-b border-[hsl(var(--secondary))] pb-3 mb-2">
                    {cat.title}
                  </h2>
                  <div className="divide-y divide-border">
                    {items.map(service => (
                      <div key={service.id} className="flex items-center justify-between gap-4 py-4">
                        <div>
                          <p className="font-medium text-foreground">{service.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{service.duration}</p>
                        </div>
                        <div className="flex items-center gap-5 shrink-0">
                          <span className="font-display text-lg text-[hsl(var(--secondary))]">{service.priceLabel}</span>
                          <Link
                            to="/booking"
                            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-foreground/70 hover:text-[hsl(var(--secondary))] transition-colors"
                          >
                            Book Now <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="luxury-section bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset max-w-4xl">
          <Reveal direction="up" className="text-center mb-10">
            <p className="luxury-eyebrow mb-4">Bundle & Save</p>
            <h2 className="luxury-heading">Grooming Packages</h2>
          </Reveal>
          <div className="divide-y divide-border bg-white border border-border">
            {PACKAGES.map(pkg => (
              <div key={pkg.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-display text-lg uppercase text-foreground">{pkg.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pkg.duration} · {pkg.includes.length} services included</p>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <span className="font-display text-xl text-[hsl(var(--secondary))]">{pkg.priceLabel}</span>
                  <Link to="/booking" className="btn-luxury-outline !h-10 !px-5 !text-[11px]">Book</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Pricing;
