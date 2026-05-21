import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const ProcessSection = () => {
  const { processSteps } = useSiteContent();

  return (
    <section className="vf-section-pad bg-white">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-[11px] font-sans-brand font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-2">
              How It Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))]">
              From Walkthrough to Finished Yard
            </h2>
            <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">
              A clear process so you always know what happens next — no surprises, no runaround.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-0">
            {processSteps.map((step, i) => (
              <div key={step.id} className="flex gap-6 pb-10 last:pb-0 relative">
                {i < processSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[1.35rem] top-12 bottom-0 w-0.5 bg-[hsl(var(--border))]"
                  />
                )}
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-display font-bold text-sm">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-bold text-[hsl(var(--primary))]">{step.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-sans-brand leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
