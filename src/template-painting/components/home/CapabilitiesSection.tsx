import { Link } from "react-router-dom";
import { useSiteContent } from "@template-painting/contexts/SiteContentContext";
import { getServiceIcon } from "@template-painting/lib/serviceIcons";
import { PAINTING_IMAGES } from "@template-painting/data/siteData";

/** Premium finishes & materials — unique editorial layout. */
const CapabilitiesSection = () => {
  const { capabilities: CAPABILITIES } = useSiteContent();

  return (
    <section className="section-padding bg-[hsl(var(--flow-warm))]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3">
              <img
                src={PAINTING_IMAGES.finishes}
                alt="Luxury wall finish"
                className="col-span-2 w-full aspect-[16/10] object-cover rounded-sm"
              />
              <img
                src={PAINTING_IMAGES.colorConsult}
                alt="Color consultation"
                className="w-full aspect-square object-cover rounded-sm"
              />
              <img
                src={PAINTING_IMAGES.cabinetPaint}
                alt="Cabinet finish"
                className="w-full aspect-square object-cover rounded-sm mt-8"
              />
            </div>
            <div
              aria-hidden
              className="absolute -z-10 -bottom-6 -left-6 w-2/3 h-2/3 border border-[hsl(var(--secondary)/0.35)] rounded-sm"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="flex items-center gap-4 text-[11px] font-sans-brand font-semibold tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-4">
              <span className="paint-editorial-rule" aria-hidden />
              Premium Finishes
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Coatings & Craft,
              <span className="block italic text-[hsl(var(--secondary))]">Specified for Your Home</span>
            </h2>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-10 max-w-lg">
              From designer-grade interior enamels to weather-ready exterior systems — every product is chosen for
              substrate, exposure, and the finish you expect.
            </p>

            <ul className="space-y-6">
              {CAPABILITIES.map(cap => {
                const Icon = getServiceIcon(cap.icon);
                return (
                  <li key={cap.id}>
                    <Link
                      to={cap.to || "/services"}
                      className="group flex gap-5 items-start rounded-sm border border-transparent hover:border-border hover:bg-card/60 p-4 -mx-4 transition-all"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-display text-xl text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors">
                          {cap.title}
                        </span>
                        <span className="block text-sm text-muted-foreground font-sans-brand mt-1 leading-relaxed">
                          {cap.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
