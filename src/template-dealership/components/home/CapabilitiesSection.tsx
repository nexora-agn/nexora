import { Link } from "react-router-dom";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { getServiceIcon } from "@template-dealership/lib/serviceIcons";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";

/** Capability gallery + list for dealership offerings */
const CapabilitiesSection = () => {
  const { capabilities: CAPABILITIES } = useSiteContent();

  return (
    <section className="py-16 lg:py-24 bg-[hsl(var(--flow-cream))]">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-[11px] font-sans-brand font-bold tracking-[0.24em] uppercase text-[hsl(var(--flow-moss))] mb-4">
              <span className="verde-editorial-rule" aria-hidden />
              Full Ownership Support
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[hsl(var(--primary))] leading-tight mb-5">
              From First Browse to
              <span className="block italic text-[hsl(var(--secondary))]">Factory Service</span>
            </h2>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">
              Sales, finance, trade-in, and service work together so every step feels connected —
              not a handoff between separate vendors.
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
              src={HOME_BUILDER_IMAGES.showroom}
              alt="Nexora Motors showroom"
              className="col-span-4 row-span-3 rounded-xl object-cover w-full h-full shadow-md"
            />
            <img
              src={HOME_BUILDER_IMAGES.lot}
              alt="Vehicles on the dealership lot"
              className="col-span-2 row-span-2 rounded-xl object-cover w-full h-full"
            />
            <img
              src={HOME_BUILDER_IMAGES.evCharge}
              alt="Electric vehicle charging"
              className="col-span-2 row-span-2 rounded-xl object-cover w-full h-full mt-2"
            />
            <img
              src={HOME_BUILDER_IMAGES.crewWorking}
              alt="Factory-trained service technicians"
              className="col-span-4 row-span-1 rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
