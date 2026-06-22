import { useSiteContent } from "@template-luxury-real-estate/contexts/SiteContentContext";
import { getServiceIcon } from "@template-luxury-real-estate/lib/serviceIcons";
import { HOME_BUILDER_IMAGES } from "@template-luxury-real-estate/data/siteData";

/** Editorial why-choose layout — not a card grid. */
const WhyTeamSection = () => {
  const { whyBenefits: WHY_BENEFITS } = useSiteContent();

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <p className="flex items-center justify-center gap-4 text-[11px] font-sans-brand font-semibold tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-4">
            <span className="paint-editorial-rule" aria-hidden />
            Why Homeowners Choose Us
            <span className="paint-editorial-rule" aria-hidden />
          </p>
          <h2 className="font-display text-4xl md:text-[3.25rem] text-foreground leading-tight">
            Painting Is an Art —
            <span className="block italic text-[hsl(var(--secondary))]">Prep Is the Science</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden paint-shadow-card">
          <div className="relative min-h-[360px] md:min-h-full">
            <img
              src={HOME_BUILDER_IMAGES.crewWorking}
              alt="Professional painter at work"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 md:to-background/0" />
          </div>
          <div className="bg-card divide-y divide-border">
            {WHY_BENEFITS.map((benefit, i) => {
              const Icon = getServiceIcon(benefit.icon);
              return (
                <div key={benefit.title} className="p-8 md:p-10 flex gap-6 group hover:bg-[hsl(var(--flow-warm))] transition-colors">
                  <span className="font-display text-3xl text-[hsl(var(--secondary)/0.5)] leading-none w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--secondary)/0.4)] text-[hsl(var(--secondary))] mb-4">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-2xl text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground font-sans-brand leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTeamSection;
