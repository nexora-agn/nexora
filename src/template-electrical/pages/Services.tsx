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
  Zap,
} from "lucide-react";
import Layout from "@template-electrical/components/layout/Layout";
import LeadContactSection from "@template-electrical/components/home/LeadContactSection";
import { useSiteContent } from "@template-electrical/contexts/SiteContentContext";
import { useTheme } from "@template-electrical/contexts/ThemeContext";

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
        <title>Electrical Services | {COMPANY.name}</title>
        <meta name="description" content={servicesPageIntro} />
      </Helmet>

      <section className="relative bg-[hsl(var(--primary))] text-white overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-4 font-display uppercase tracking-wider">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white/90">Services</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display mb-4">
              <Zap className="h-3.5 w-3.5 fill-current" />
              Full-Service Electrical
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-[0.95]">
              Power Solutions for Every Property
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">{servicesPageIntro}</p>
          </div>
        </div>
        <div className="h-1 bg-[hsl(var(--secondary))]" />
      </section>

      <section className="bg-[hsl(var(--volt-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => {
              const Icon = iconMap[s.icon] || Zap;
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
