import StatsSection from "@template-barbershop/components/sections/StatsSection";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";

const HomeStats = () => {
  const { stats } = useSiteContent();
  return <StatsSection stats={stats} />;
};

export default HomeStats;
