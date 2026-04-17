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
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary max-w-3xl mb-12 md:mb-16">
        Mastery in <span className="text-secondary">every scale.</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map(cap => {
          const Icon = iconMap[cap.icon as keyof typeof iconMap] ?? Building2;
          return (
            <article
              key={cap.id}
              className="group rounded-xl border border-border bg-muted/40 p-6 hover:shadow-lg hover:border-secondary/40 transition-all"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{cap.description}</p>
              <Link
                to={cap.to}
                className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-primary hover:text-secondary transition-colors"
              >
                EXPLORE MORE
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default CapabilitiesSection;
