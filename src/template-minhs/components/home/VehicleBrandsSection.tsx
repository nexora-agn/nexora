import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";
import { VEHICLE_BRANDS } from "@template-minhs/data/siteData";

const VehicleBrandsSection = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <section className="section-padding bg-[hsl(var(--minhs-surface))] border-y border-border">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-display font-bold uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
            European Specialists
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
            Vehicles We Service
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Factory-trained technicians and ASE Master Technicians specializing in the manufacturers
            {COMPANY.name ? ` trusted by ${COMPANY.name.replace(" Automotive", "")} customers` : ""} across Brooklyn.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {VEHICLE_BRANDS.map(brand => (
            <div
              key={brand.id}
              className="group minhs-card flex flex-col items-center justify-center text-center px-4 py-8 md:py-10 bg-white hover:border-[hsl(var(--secondary))]/40 transition-colors"
            >
              <span className="font-display text-lg md:text-xl font-bold uppercase tracking-[0.12em] text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                {brand.name}
              </span>
              <span className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                {brand.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleBrandsSection;
