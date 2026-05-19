import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-plumbing/contexts/SiteContentContext";
import { getServiceIcon } from "@template-plumbing/lib/serviceIcons";

const ServicesRibbon = () => {
  const { servicesRibbon: SERVICES_RIBBON } = useSiteContent();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--secondary))]">
            Complete Plumbing Solutions
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] tracking-tight">
            Services You Can Trust
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES_RIBBON.map(item => {
            const Icon = getServiceIcon(item.icon);
            return (
              <Link
                key={item.id}
                to={item.to}
                className="group flex flex-col rounded-sm border border-border bg-[hsl(var(--flow-surface))] p-5 hover:border-[hsl(var(--secondary))]/50 hover:shadow-md transition-all"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[hsl(var(--primary))] text-white mb-4">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))]">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[hsl(var(--secondary))]">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesRibbon;
