import { getServiceIcon } from "@template-landscaping/lib/serviceIcons";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const WhyChooseGrid = () => {
  const { whyBenefits } = useSiteContent();

  return (
    <section className="vf-section-pad bg-[hsl(var(--vf-cream))]">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-sans-brand font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-2">
            Why Choose Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))]">
            Our Commitment to Excellence
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyBenefits.map((item, i) => {
            const Icon = getServiceIcon(item.icon);
            return (
              <article
                key={item.title}
                className="relative rounded-xl bg-white border border-border p-7 vf-card-hover overflow-hidden"
              >
                <span className="absolute top-4 right-4 font-display text-5xl font-bold text-[hsl(var(--primary))]/8 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))] mb-4">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-bold text-[hsl(var(--primary))] mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-sans-brand leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseGrid;
