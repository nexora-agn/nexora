import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";
import { COMPANY } from "@template-barbershop/data/siteData";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { serviceSections, services } = useSiteContent();
  const { resolveServiceSectionImage } = useTheme();
  const section = serviceSections.find(s => s.id === id);

  if (!section) return <Navigate to="/services" replace />;

  const related = services.filter(s => s.categoryId === section.id);

  return (
    <Layout>
      <Helmet>
        <title>{section.title} | {COMPANY.name}</title>
        <meta name="description" content={section.subtitle} />
      </Helmet>

      <PageHeader eyebrow={section.category} title={section.title} subtitle={section.subtitle} image={resolveServiceSectionImage(section.id, section.image)} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-14 items-center">
          <Reveal direction="right" className="image-zoom">
            <img src={resolveServiceSectionImage(section.id, section.image)} alt={section.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </Reveal>
          <Reveal direction="left" delay={100}>
            {section.body.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}
            <ul className="mt-6 space-y-3">
              {section.inclusions.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/booking" className="btn-luxury-primary mt-8 inline-flex">
              Book This Service
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="luxury-section bg-[hsl(var(--muted))]">
          <div className="container-custom container-inset">
            <Reveal direction="up" className="mb-10 text-center">
              <p className="luxury-eyebrow mb-4">Related Options</p>
              <h2 className="luxury-heading">Choose Your Exact Service</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((service, i) => (
                <Reveal key={service.id} direction="up" delay={(i % 3) * 90}>
                  <div className="card-luxury p-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-base uppercase text-foreground">{service.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{service.duration} · {service.priceLabel}</p>
                    </div>
                    <Link to="/booking" aria-label={`Book ${service.title}`} className="shrink-0 flex h-9 w-9 items-center justify-center border border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-white transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
};

export default ServiceDetail;
