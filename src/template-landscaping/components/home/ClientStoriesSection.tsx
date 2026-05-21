import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const ClientStoriesSection = () => {
  const { testimonials } = useSiteContent();

  return (
    <section className="vf-section-pad bg-[hsl(var(--vf-cream))]">
      <div className="container-custom container-inset">
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans-brand font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-2">
            Client Reviews
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))]">
            What Homeowners Say
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map(t => (
            <article
              key={t.name}
              className="rounded-xl bg-white border border-border p-6 md:p-7 vf-card-hover flex flex-col"
            >
              <Quote className="h-8 w-8 text-[hsl(var(--secondary))]/40 mb-4" />
              <p className="text-sm text-foreground font-sans-brand leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="font-display font-bold text-[hsl(var(--primary))]">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-sans-brand">{t.role}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesSection;
