import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { getServiceIcon } from "@template-familyfirst/lib/serviceIcons";

const WhyTeamSection = () => {
  const { whyBenefits } = useSiteContent();
  const items = whyBenefits ?? [];
  if (!items.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-sans-brand">
              Why Choose Us
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[hsl(var(--primary))] leading-tight">
              Family-First Plumbing,
              <span className="block text-[hsl(var(--secondary))]">Done Properly.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans-brand">
              When you hire a plumber at the Jersey Shore, you want licensed pros who show up,
              explain your options, and stand behind the work — especially for boilers and hydronic
              heat.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {items.map((item, index) => {
              const Icon = getServiceIcon(item.icon);
              return (
                <article
                  key={item.title}
                  className="ff-card p-6 hover:border-[hsl(var(--secondary))]/40"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--flow-soft))] text-[hsl(var(--primary))] mb-4">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[10px] font-sans-brand font-bold uppercase tracking-widest text-[hsl(var(--secondary))]/80 mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[hsl(var(--primary))]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-sans-brand">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTeamSection;
