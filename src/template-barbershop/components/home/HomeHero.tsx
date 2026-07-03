import { Link } from "react-router-dom";
import { ArrowDown, Star } from "lucide-react";
import * as Icons from "lucide-react";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const HomeHero = () => {
  const { homeHero } = useSiteContent();

  const scrollToNext = () => {
    const next = document.getElementById("home-booking");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[hsl(var(--primary))] text-white">
      <img
        src={homeHero.image}
        alt="Forge Barber Co. interior"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "heroZoom 20s ease-out forwards" }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="relative container-custom container-inset w-full pb-24 pt-40 lg:pb-32">
        <div
          className="max-w-3xl"
          style={{ animation: "heroFadeUp 900ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-6" style={{ animationDelay: "80ms" }}>
            {homeHero.eyebrow}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold uppercase leading-[0.98] tracking-tight">
            {homeHero.headlineBefore}
            <br />
            <span className="text-[hsl(var(--secondary))]">{homeHero.headlineHighlight}</span>
          </h1>
          <p className="mt-7 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">{homeHero.body}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to={homeHero.primaryCta.to} className="btn-luxury-hero-primary">
              {homeHero.primaryCta.label}
            </Link>
            <Link to={homeHero.secondaryCta.to} className="btn-luxury-hero-secondary">
              {homeHero.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5">
            {homeHero.trustPills.map(pill => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[pill.icon] ?? Icons.Star;
              return (
                <div key={pill.label} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/25 text-[hsl(var(--secondary))]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide">{pill.label}</p>
                    <p className="text-xs text-white/55">{pill.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex absolute right-10 bottom-32 flex-col items-end gap-3 max-w-[220px]">
          <div className="flex items-center gap-1 text-[hsl(var(--secondary))]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-right text-sm text-white/70 leading-snug italic">"{homeHero.ratingQuote}"</p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {homeHero.ratingCard.avatars.map((src, i) => (
                <img key={i} src={src} alt="" className="h-8 w-8 rounded-full border-2 border-[hsl(var(--primary))] object-cover" />
              ))}
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{homeHero.ratingCard.score} / 5</p>
              <p className="text-[10px] text-white/50">{homeHero.ratingCard.countLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors",
        )}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 scroll-indicator" />
      </button>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default HomeHero;
