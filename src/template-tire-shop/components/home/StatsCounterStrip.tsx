import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { getServiceIcon } from "@template-tire-shop/lib/serviceIcons";

const StatsCounterStrip = () => {
  const { homeStats } = useSiteContent();

  return (
    <section className="py-12 md:py-14 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
      <div className="container-custom container-inset">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {homeStats.map(stat => {
            const Icon = getServiceIcon(stat.icon);
            return (
              <div key={stat.label}>
                <Icon className="h-6 w-6 mx-auto mb-3 opacity-80" />
                <p className="font-display text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="mt-2 font-display text-xs uppercase tracking-[0.2em] opacity-90">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounterStrip;
