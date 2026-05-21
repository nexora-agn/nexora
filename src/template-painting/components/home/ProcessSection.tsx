import { useSiteContent } from "@template-painting/contexts/SiteContentContext";

/** Horizontal stepped timeline — distinct from vertical painting process. */
const ProcessSection = () => {
  const { processSteps: PROCESS_STEPS } = useSiteContent();

  return (
    <section className="section-padding-tight border-y border-border bg-[hsl(var(--flow-cream))]">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
            Our Process
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">From Consultation to Walkthrough</h2>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="hidden lg:block absolute top-[2.75rem] left-[8%] right-[8%] h-px bg-[hsl(var(--secondary)/0.35)]"
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.id} className="relative text-center lg:text-left lg:px-2">
                <div className="inline-flex lg:flex h-11 w-11 items-center justify-center rounded-full border-2 border-[hsl(var(--secondary))] bg-background text-sm font-sans-brand font-bold text-[hsl(var(--primary))] mb-5 mx-auto lg:mx-0">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{step.label}</h3>
                <p className="text-sm text-muted-foreground font-sans-brand leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
