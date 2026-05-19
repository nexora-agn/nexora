import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@template-plumbing/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const ClientStoriesSection = () => {
  const { testimonials } = useSiteContent();
  if (!testimonials?.length) return null;

  const featured = testimonials[0];
  const gridItems = testimonials.slice(1, 5);

  return (
    <section className="bg-[hsl(var(--flow-surface))] py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
            Client Stories
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))]">
            Trusted by Homeowners & Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured large quote — left */}
          <article className="lg:col-span-5 relative rounded-sm bg-[hsl(var(--primary))] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[360px]">
            <Quote
              className="absolute top-6 right-6 h-16 w-16 text-[hsl(var(--secondary))]/15"
              strokeWidth={1}
              aria-hidden
            />
            <div>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                  />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-white/95">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/15">
              <img
                src={featured.avatar}
                alt={featured.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[hsl(var(--secondary))]/50"
              />
              <div>
                <span className="block font-display text-lg font-bold uppercase tracking-wide">
                  {featured.name}
                </span>
                <span className="block text-sm text-white/60">{featured.role}</span>
              </div>
            </div>
          </article>

          {/* 2×2 review grid — right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {gridItems.map((t, i) => {
              const rating = (t as { rating?: number }).rating ?? 5;
              return (
                <article
                  key={t.name + i}
                  className={cn(
                    "bg-white rounded-sm border border-[hsl(var(--border))] p-5 sm:p-6 flex flex-col",
                    i === 0 && "sm:mt-4",
                    i === 1 && "sm:-mt-2",
                  )}
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={cn(
                          "h-3.5 w-3.5",
                          idx < rating
                            ? "fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                            : "text-[hsl(var(--border))]",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[hsl(var(--border))]">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <span className="block text-sm font-display font-bold uppercase tracking-wide text-[hsl(var(--primary))] truncate">
                        {t.name}
                      </span>
                      <span className="block text-xs text-muted-foreground truncate">{t.role}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesSection;
