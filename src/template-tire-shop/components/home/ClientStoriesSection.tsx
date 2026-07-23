import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";

/** Featured quote + supporting cards — not uniform 3-col landscaping grid */
const ClientStoriesSection = () => {
  const { testimonials } = useSiteContent();
  const [featured, ...others] = testimonials.slice(0, 6);

  if (!featured) return null;

  return (
    <section className="hb-section-pad bg-white border-t border-border">
      <div className="container-custom container-inset">
        <div className="text-center mb-12">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-2">
            Client Reviews
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase">
            What Our Clients Think
          </h2>
        </div>

        <article className="border-2 border-[hsl(var(--primary))] bg-[hsl(var(--hb-linen))] p-8 md:p-12 mb-8 relative">
          <Quote className="h-10 w-10 text-[hsl(var(--secondary))]/40 absolute top-6 left-6 md:top-8 md:left-8" />
          <blockquote className="relative z-10 max-w-4xl mx-auto text-center pt-6">
            <p className="font-display text-xl md:text-2xl text-[hsl(var(--primary))] leading-relaxed italic">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-8 flex flex-col items-center gap-2">
              <img src={featured.avatar} alt="" className="h-14 w-14 object-cover border-2 border-[hsl(var(--secondary))]" />
              <cite className="not-italic font-display font-bold text-[hsl(var(--primary))]">{featured.name}</cite>
              <span className="text-sm text-muted-foreground font-sans-brand">{featured.role}</span>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: featured.rating ?? 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                ))}
              </div>
            </footer>
          </blockquote>
        </article>

        <div className="grid md:grid-cols-3 gap-4">
          {others.map(t => (
            <article key={t.name} className="border border-border bg-white p-6">
              <p className="text-sm text-muted-foreground font-sans-brand leading-relaxed italic line-clamp-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-10 w-10 object-cover" />
                <div>
                  <p className="font-display text-sm font-bold text-[hsl(var(--primary))]">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
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
