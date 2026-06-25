import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { useTheme } from "@template-truck-repair/contexts/ThemeContext";
import { getServiceIcon } from "@template-truck-repair/lib/serviceIcons";
import { TRUCK_IMAGES } from "@template-truck-repair/data/siteData";

const Services = () => {
  const { services, servicesPageIntro, company: COMPANY, whyBenefits } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Heavy-Duty Repair Services | {COMPANY.name}</title>
        <meta name="description" content={servicesPageIntro} />
      </Helmet>

      <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-[hsl(var(--primary))]">
        <img src={TRUCK_IMAGES.servicesHero} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative container-custom container-inset py-16 lg:py-20 text-white">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">Our Services</p>
          <h1 className="font-display text-4xl sm:text-5xl max-w-3xl leading-tight mb-4">Heavy-Duty Repair Services</h1>
          <p className="max-w-2xl text-white/80 leading-relaxed">{servicesPageIntro}</p>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => {
              const Icon = getServiceIcon(svc.icon);
              const img = resolveServiceImage(svc.id, svc.image);
              return (
                <Link key={svc.id} to={`/services/${svc.id}`} className="card-industrial group overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={img} alt={svc.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-display text-lg text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">{svc.title}</h2>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{svc.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--secondary))]">
                      Request Service <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="industrial-section bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset text-center">
          <h2 className="industrial-heading mb-8">Why Fleets Choose Nexora</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {whyBenefits.slice(0, 4).map(b => (
              <div key={b.title} className="bg-white p-5 border border-border text-left">
                <h3 className="font-display text-sm text-[hsl(var(--primary))] mb-2">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
          <Link to="/request-service" className="btn-industrial-primary mt-10 inline-flex">Request Service</Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
