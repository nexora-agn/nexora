import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Paintbrush } from "lucide-react";
import Layout from "@template-painting/components/layout/Layout";
import LeadContactSection from "@template-painting/components/home/LeadContactSection";
import { useSiteContent } from "@template-painting/contexts/SiteContentContext";
import { useTheme } from "@template-painting/contexts/ThemeContext";
import { getServiceIcon } from "@template-painting/lib/serviceIcons";
import { PAINTING_IMAGES } from "@template-painting/data/siteData";

const CORE_SERVICE_IDS = [
  "interior-painting",
  "exterior-painting",
  "cabinet-painting",
  "commercial-painting",
  "color-consultation",
] as const;

const Services = () => {
  const { services, servicesPageIntro, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const displayServices = CORE_SERVICE_IDS.map(id => services.find(s => s.id === id)).filter(
    (s): s is (typeof services)[number] => Boolean(s),
  );

  return (
    <Layout>
      <Helmet>
        <title>Painting Services | {COMPANY.name}</title>
        <meta name="description" content={servicesPageIntro} />
      </Helmet>

      <section className="relative min-h-[42vh] lg:min-h-[48vh] flex items-end overflow-hidden bg-[hsl(var(--flow-panel))]">
        <img
          src={PAINTING_IMAGES.painterWorking}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))] via-[hsl(var(--flow-panel))]/70 to-[hsl(var(--flow-panel))]/20" />
        <div className="relative z-10 w-full container-custom container-inset pb-10 md:pb-12 pt-24 md:pt-28">
          <nav className="flex items-center gap-2 text-xs text-[hsl(var(--primary-foreground)/0.6)] mb-6 font-sans-brand">
            <Link to="/" className="hover:text-[hsl(var(--secondary))]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--primary-foreground))]">Services</span>
          </nav>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-4">
              <Paintbrush className="h-4 w-4" />
              5 Core Services
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--primary-foreground))] leading-tight mb-5">
              Painting Craft,
              <span className="block italic text-[hsl(var(--secondary))]">Specified for Every Surface</span>
            </h1>
            <p className="text-base text-[hsl(var(--primary-foreground)/0.8)] font-sans-brand leading-relaxed">
              {servicesPageIntro}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {displayServices.map((s, i) => {
              const Icon = getServiceIcon(s.icon);
              const offset = i === 2;
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className={`group flex flex-col rounded-sm border border-border overflow-hidden bg-card hover:border-[hsl(var(--secondary)/0.45)] transition-all paint-shadow-soft hover:paint-shadow-card ${
                    offset ? "lg:col-span-1" : ""
                  }`}
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={resolveServiceImage(s.id, s.image)}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-2xl text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans-brand leading-relaxed flex-1">
                      {s.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-sans-brand font-semibold text-[hsl(var(--primary))] group-hover:gap-2 transition-all">
                      View service <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default Services;
