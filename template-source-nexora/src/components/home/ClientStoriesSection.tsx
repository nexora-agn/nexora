import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const PER_PAGE = 3;

const GoogleWordmark = () => (
  <span className="inline-flex items-baseline gap-px font-extrabold tracking-tight">
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

const ClientStoriesSection = () => {
  const { testimonials } = useSiteContent();
  const [page, setPage] = useState(0);

  if (!testimonials?.length) return null;
  const totalPages = Math.max(1, Math.ceil(testimonials.length / PER_PAGE));
  const visible = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const prev = () => setPage(p => (p - 1 + totalPages) % totalPages);
  const next = () => setPage(p => (p + 1) % totalPages);

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[hsl(var(--primary))]">
            What Our Customers Say
          </h2>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[hsl(var(--primary))]"
          >
            View All Reviews on <GoogleWordmark />
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            aria-label="Previous reviews"
            className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next reviews"
            className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((t, i) => {
              const rating = (t as any).rating ?? 5;
              return (
                <article
                  key={t.name + i}
                  className="bg-white rounded-lg border border-slate-100 p-6 shadow-sm flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={cn(
                          "h-4 w-4",
                          idx < rating
                            ? "fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                            : "text-slate-200",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed flex-1">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                      <span className="block text-sm font-extrabold text-[hsl(var(--primary))]">
                        — {t.name}
                      </span>
                      <span className="block text-xs text-slate-500">{t.role}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={prev}
              aria-label="Previous reviews"
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === page ? "w-6 bg-[hsl(var(--primary))]" : "w-2.5 bg-slate-300",
                )}
              />
            ))}
            <button
              onClick={next}
              aria-label="Next reviews"
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientStoriesSection;
