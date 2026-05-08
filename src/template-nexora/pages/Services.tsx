import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  Home as HomeIcon,
  CloudLightning,
  FileCheck,
  Search,
  Wrench,
  Hammer,
} from "lucide-react";
import Layout from "@template-nexora/components/layout/Layout";
import NexoraPageHero from "@template-nexora/components/sections/NexoraPageHero";
import LeadContactSection from "@template-nexora/components/home/LeadContactSection";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";
import { useTheme } from "@template-nexora/contexts/ThemeContext";

const iconMap: Record<string, typeof Flame> = {
  Flame,
  Home: HomeIcon,
  CloudLightning,
  FileCheck,
  Search,
  Wrench,
  Hammer,
};

const Services = () => {
  const { services, servicesPageIntro, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Roofing Services | {COMPANY.name}</title>
        <meta name="description" content={servicesPageIntro} />
      </Helmet>

      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
        title="Our Roofing Services"
        eyebrowAfter="Comprehensive Roofing Solutions"
        body={servicesPageIntro}
        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop"
      />

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => {
              const Icon = iconMap[s.icon] || Flame;
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="group bg-white rounded-lg overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={resolveServiceImage(s.id, s.image)}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-[hsl(var(--primary))] text-white shadow-md">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-extrabold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                      Learn More <ArrowRight className="h-3.5 w-3.5" />
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
