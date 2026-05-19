import { useSiteContent } from "@template-plumbing/contexts/SiteContentContext";

const WhyTeamSection = () => {
  const { whyBenefits } = useSiteContent();
  const items = whyBenefits ?? [];
  if (!items.length) return null;

  return (
    <section className="bg-[hsl(var(--flow-surface))] py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
              Why Choose Us
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold uppercase text-[hsl(var(--primary))] leading-tight">
              Built on Safety.
              <span className="block">Powered by Expertise.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every wire, panel, and fixture is installed to code — with clear communication from quote
              to final inspection.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ol className="space-y-0 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
              {items.map((item, index) => {
                const num = String(index + 1).padStart(2, "0");
                return (
                  <li
                    key={item.title}
                    className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 py-7 sm:py-8 group"
                  >
                    <span
                      aria-hidden
                      className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none text-[hsl(var(--secondary))]/25 group-hover:text-[hsl(var(--secondary))]/50 transition-colors select-none"
                    >
                      {num}
                    </span>
                    <div className="pt-1 sm:pt-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTeamSection;
