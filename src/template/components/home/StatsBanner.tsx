import { useSiteContent } from "@template/contexts/SiteContentContext";

const StatsBanner = () => {
  const { homeStats: HOME_STATS } = useSiteContent();
  return (
    <section className="bg-secondary py-12 md:py-14 text-secondary-foreground">
      <div className="container-custom px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
          {HOME_STATS.map(stat => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-black tracking-tight">{stat.value}</p>
              <p className="mt-2 text-sm md:text-base font-medium opacity-95">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
