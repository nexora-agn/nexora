import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";

/** Horizontal process timeline — not landscaping's vertical sticky sidebar */
const ProcessSection = () => {
  const { processSteps } = useSiteContent();

  return (
    <section className="hb-section-pad bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-3">
            Our Design-Build Process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">
            From Consultation to Keys
          </h2>
          <p className="mt-4 text-[hsl(var(--primary-foreground)/0.8)] font-sans-brand leading-relaxed">
            A second-generation firm refined for Central New Jersey custom homes — tailored to your lot, architect, and budget.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
          {processSteps.map((step, i) => (
            <div key={step.id} className="relative text-center px-2">
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-[hsl(var(--secondary))]/50"
                />
              )}
              <span className="inline-flex h-12 w-12 items-center justify-center border-2 border-[hsl(var(--secondary))] font-display text-lg font-bold text-[hsl(var(--secondary))] mb-4">
                {i + 1}
              </span>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide leading-snug mb-2">
                {step.label}
              </h3>
              <p className="text-xs text-[hsl(var(--primary-foreground)/0.75)] font-sans-brand leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/process"
            className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] hover:text-white transition-colors"
          >
            View full process
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
