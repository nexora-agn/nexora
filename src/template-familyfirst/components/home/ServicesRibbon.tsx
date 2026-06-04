import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { getServiceIcon } from "@template-familyfirst/lib/serviceIcons";

const ServicesRibbon = () => {
  const { servicesRibbon: SERVICES_RIBBON } = useSiteContent();

  return (
    <section className="section-padding bg-[hsl(var(--flow-cream))]">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-sans-brand font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))]">
            What We Handle
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] tracking-tight">
            Plumbing Services You Can Trust
          </h2>
          <p className="mt-3 text-muted-foreground font-sans-brand">
            We take care of the problems homeowners don&apos;t want to deal with — and we do it right
            the first time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_RIBBON.map(item => {
            const Icon = getServiceIcon(item.icon);
            return (
              <Link
                key={item.id}
                to={item.to}
                className="ff-card group flex flex-col p-6 hover:border-[hsl(var(--secondary))]/50"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-white mb-5 shadow-md">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 font-sans-brand">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-[hsl(var(--secondary))] font-sans-brand">
                  Learn more{" "}
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
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
