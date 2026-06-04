import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@template-familyfirst/components/layout/Layout";
import PlumbingPageHero from "@template-familyfirst/components/sections/PlumbingPageHero";
import LeadContactSection from "@template-familyfirst/components/home/LeadContactSection";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { useTheme } from "@template-familyfirst/contexts/ThemeContext";
import { getServiceIcon } from "@template-familyfirst/lib/serviceIcons";

const Services = () => {
  const { services, servicesPageIntro, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Plumbing Services | {COMPANY.name}</title>
        <meta name="description" content={servicesPageIntro} />
      </Helmet>

      <PlumbingPageHero
        eyebrow="Full-Service Plumbing"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
        title="Plumbing Solutions for Every Property"
        body={servicesPageIntro}
      />

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => {
              const Icon = getServiceIcon(s.icon);
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="group flex flex-col rounded-sm bg-white border border-[hsl(var(--border))] overflow-hidden hover:border-[hsl(var(--secondary))]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--primary))]">
                    <img
                      src={resolveServiceImage(s.id, s.image)}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-md">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{s.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-display font-bold uppercase tracking-wider text-[hsl(var(--secondary))]">
                      View Service <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
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
