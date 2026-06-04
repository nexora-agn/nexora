import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WARRANTY_SECTION } from "@/data/siteData";

const WarrantySection = () => {
  const w = WARRANTY_SECTION;

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${w.image})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/95 via-[hsl(var(--primary))]/88 to-[hsl(var(--primary))]/75" />
      <div className="relative container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-white">
            <p className="text-xs font-display font-bold uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
              {w.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-wide">
              {w.headline}
              <span className="block mt-2 text-[hsl(var(--secondary))]">{w.highlight}</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">{w.body}</p>
            <ul className="mt-8 space-y-3">
              {w.bullets.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/90">
                  <ShieldCheck className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="mt-10 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wider rounded-sm"
            >
              <Link to={w.cta.to}>
                {w.cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="minhs-warranty-stats w-full max-w-md">
              <div className="flex items-center gap-4 border-b border-white/15 pb-6 mb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-[hsl(var(--secondary))]/40 bg-[hsl(var(--secondary))]/15">
                  <ShieldCheck className="h-8 w-8 text-[hsl(var(--secondary))]" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-display uppercase tracking-[0.22em] text-white/60">Peace of mind</p>
                  <p className="font-display text-lg font-bold uppercase tracking-wide text-white">Nationwide coverage</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-sm border border-white/15 bg-white/10 p-5 sm:p-6 text-center">
                  <p className="font-display text-5xl sm:text-6xl font-bold text-[hsl(var(--secondary))] leading-none">5</p>
                  <p className="mt-2 font-display text-sm uppercase tracking-widest text-white">Years</p>
                </div>
                <div className="rounded-sm border border-white/15 bg-white/10 p-5 sm:p-6 text-center">
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">50K</p>
                  <p className="mt-2 font-display text-sm uppercase tracking-widest text-white/80">Miles</p>
                </div>
              </div>
              <p className="mt-5 text-center text-xs uppercase tracking-[0.18em] text-white/55">
                Qualifying repairs · Written documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantySection;
