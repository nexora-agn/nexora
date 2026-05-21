import { Star } from "lucide-react";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const StatsCounterStrip = () => {
  const { homeStats, siteTop: TOP } = useSiteContent();

  return (
    <section className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-12 md:py-14">
      <div className="container-custom container-inset">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {homeStats.map(stat => (
            <div key={stat.label}>
              <p className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--secondary))]">{stat.value}</p>
              <p className="mt-2 text-sm font-sans-brand uppercase tracking-wide text-white/85">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
            <span className="font-display text-2xl font-bold">{TOP.ratingValue}</span>
            <span className="text-sm text-white/80 font-sans-brand">out of 5</span>
          </div>
          <p className="text-sm font-sans-brand text-white/75">
            Based on {TOP.ratingCount} {TOP.ratingLabel} · Serving {TOP.locations}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsCounterStrip;
