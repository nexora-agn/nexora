import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@template-painting/contexts/SiteContentContext";

/** Quote wall testimonials — not a carousel. */
const ClientStoriesSection = () => {
  const { testimonials: TESTIMONIALS } = useSiteContent();
  const featured = TESTIMONIALS.slice(0, 3);
  const secondary = TESTIMONIALS.slice(3, 6);

  return (
    <section className="section-padding bg-[hsl(var(--flow-warm))]">
      <div className="container-custom">
        <div className="mb-14">
          <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
            Reviews
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Homeowners Who Trusted BrushHouse</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {featured[0] && (
            <article className="lg:col-span-7 rounded-sm bg-card border border-border p-10 md:p-12 paint-shadow-card relative">
              <Quote className="h-10 w-10 text-[hsl(var(--secondary)/0.35)] mb-6" />
              <p className="font-display text-2xl md:text-3xl text-foreground leading-snug mb-8">
                "{featured[0].quote}"
              </p>
              <div className="flex items-center gap-4">
                {featured[0].avatar && (
                  <img src={featured[0].avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-sans-brand font-semibold text-foreground">{featured[0].name}</p>
                  <p className="text-sm text-muted-foreground font-sans-brand">{featured[0].role}</p>
                  <div className="flex gap-0.5 mt-1 text-[hsl(var(--secondary))]">
                    {Array.from({ length: featured[0].rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          <div className="lg:col-span-5 grid gap-6">
            {featured.slice(1).map(t => (
              <article key={t.name} className="rounded-sm bg-card border border-border p-6 paint-shadow-soft">
                <p className="text-sm text-foreground font-sans-brand leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-xs font-sans-brand font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </article>
            ))}
          </div>
        </div>

        {secondary.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {secondary.map(t => (
              <article key={t.name} className="rounded-sm border border-border bg-background/60 p-5">
                <p className="text-xs text-muted-foreground font-sans-brand leading-relaxed line-clamp-4 mb-3">
                  "{t.quote}"
                </p>
                <p className="text-[11px] font-sans-brand font-semibold">{t.name}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientStoriesSection;
