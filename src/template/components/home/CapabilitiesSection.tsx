import { Link } from "react-router-dom";
import { ArrowRight, Home, Wrench, Building2, DraftingCompass } from "lucide-react";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const iconMap = {
  Home,
  Wrench,
  Building2,
  DraftingCompass,
} as const;

const CapabilitiesSection = () => {
  const { capabilities: CAPABILITIES } = useSiteContent();
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              CAPABILITIES
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
              Mastery in <span className="text-secondary">every scale.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              From bespoke residences to complex commercial builds, we deliver
              with the same discipline, transparency and craft at every scale.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary hover:text-secondary transition-colors self-start lg:self-end"
          >
            ALL SERVICES
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {CAPABILITIES.map((cap, i) => {
            const Icon = iconMap[cap.icon as keyof typeof iconMap] ?? Building2;
            return (
              <Link
                key={cap.id}
                to={cap.to}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-secondary/50"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full"
                />
                <span className="absolute right-5 top-5 text-xs font-bold tracking-widest text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {cap.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold tracking-widest text-primary group-hover:text-secondary transition-colors">
                  EXPLORE
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
