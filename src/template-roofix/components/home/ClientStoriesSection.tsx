import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 3;

const ClientStoriesSection = () => {
  const { testimonials: TESTIMONIALS } = useSiteContent();
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(TESTIMONIALS.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = TESTIMONIALS.slice(start, start + PAGE_SIZE);

  if (!visible.length) return null;

  return (
    <section className="bg-muted/40 section-padding">
      <div className="container-custom px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-primary uppercase tracking-tight leading-[1.05]">
            What Our Clients Say
          </h2>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary hover:text-secondary transition-colors uppercase"
          >
            View All Reviews on
            <span className="font-black">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-secondary">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-600">l</span>
              <span className="text-red-500">e</span>
            </span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visible.map(t => {
              const rating = (t as { rating?: number }).rating ?? 5;
              return (
                <article
                  key={t.name}
                  className="rounded-lg border border-border bg-card p-6 md:p-7 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < rating
                            ? "fill-secondary text-secondary"
                            : "fill-muted text-muted",
                        )}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="text-[15px] md:text-base text-foreground leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t border-border">
                    <img
                      src={t.avatar}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        – {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:text-secondary hover:border-secondary disabled:opacity-30 transition-colors shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:text-secondary hover:border-secondary disabled:opacity-30 transition-colors shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Page ${i + 1}`}
                    onClick={() => setPage(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === page
                        ? "w-6 bg-secondary"
                        : "w-2 bg-muted hover:bg-muted-foreground/40",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesSection;
