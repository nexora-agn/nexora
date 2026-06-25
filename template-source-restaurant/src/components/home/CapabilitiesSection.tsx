import { Link } from "react-router-dom";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { getServiceIcon } from "@template-restaurant/lib/serviceIcons";
import { HOME_BUILDER_IMAGES } from "@template-restaurant/data/siteData";

/** Outdoor transformations — masonry gallery + capability list. */
const CapabilitiesSection = () => {
  const { capabilities: CAPABILITIES } = useSiteContent();

  return (
    <section className="py-16 lg:py-24 bg-[hsl(var(--flow-cream))]">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-[11px] font-sans-brand font-bold tracking-[0.24em] uppercase text-[hsl(var(--flow-moss))] mb-4">
              <span className="verde-editorial-rule" aria-hidden />
              Outdoor Transformations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[hsl(var(--primary))] leading-tight mb-5">
              From Concept to
              <span className="block italic text-[hsl(var(--secondary))]">Finished Landscape</span>
            </h2>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">
              Design-build teams coordinate grading, hardscape, planting, and lighting so every element works together
              — not piecemeal weekend projects.
            </p>
            <ul className="space-y-5">
              {CAPABILITIES.map(cap => {
                const Icon = getServiceIcon(cap.icon);
                return (
                  <li key={cap.id}>
                    <Link
                      to={cap.to || "/services"}
                      className="group flex gap-4 items-start rounded-lg border border-border bg-white p-4 card-lift"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-display text-lg text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
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

          <div className="lg:col-span-7 grid grid-cols-6 grid-rows-4 gap-3 min-h-[420px]">
            <img
              src={HOME_BUILDER_IMAGES.luxuryBackyard}
              alt="Luxury backyard landscape"
              className="col-span-4 row-span-3 rounded-xl object-cover w-full h-full shadow-md"
            />
            <img
              src={HOME_BUILDER_IMAGES.hardscapePatio}
              alt="Stone patio hardscape"
              className="col-span-2 row-span-2 rounded-xl object-cover w-full h-full"
            />
            <img
              src={HOME_BUILDER_IMAGES.gardenDesign}
              alt="Garden design planting"
              className="col-span-2 row-span-2 rounded-xl object-cover w-full h-full mt-2"
            />
            <img
              src={HOME_BUILDER_IMAGES.outdoorLighting}
              alt="Outdoor landscape lighting"
              className="col-span-4 row-span-1 rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
