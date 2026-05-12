import { Link } from "react-router-dom";
import {
  Home,
  Wrench,
  Hammer,
  ClipboardCheck,
  Droplets,
  CloudLightning,
  Zap,
  PanelTop,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

const iconMap = {
  Home,
  Wrench,
  Hammer,
  ClipboardCheck,
  Droplets,
  CloudLightning,
  Zap,
  PanelTop,
  Building2,
} as const;

/**
 * Roofix (sleek premium metallic) — dark metallic section with glass-card
 * service grid. Each card is a tilted gradient-bordered tile with a small
 * accent number and a hover lift. Intentionally NOT a light-bg card grid.
 */
const ServicesRibbon = () => {
  const { services } = useSiteContent();

  return (
    <section className="tpl-metallic text-white relative overflow-hidden">
      {/* Decorative rule pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px)",
          backgroundSize: "72px 100%",
        }}
      />

      <div className="container-custom relative section-padding">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-bold tracking-[0.32em] uppercase text-secondary">
              [ 01 ] What we offer
            </p>
            <h2
              className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.02]"
              style={{ fontFamily: "var(--tpl-font-display)" }}
            >
              Built for{" "}
              <span className="tpl-gradient-text">every roof</span>.
            </h2>
            <p className="mt-5 max-w-xl text-white/65 leading-relaxed">
              From storm-day emergencies to premium standing-seam metal builds,
              every service is delivered by a senior crew with documented
              workmanship warranties.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.22em] uppercase text-white/85 hover:text-secondary transition-colors self-start md:self-end"
          >
            All services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.slice(0, 6).map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group tpl-glass rounded-[var(--radius)] p-6 md:p-7 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-secondary/40"
              >
                {/* Gradient corner accent */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(217 91% 60% / 0.45), transparent 60%)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-secondary/15 text-secondary border border-secondary/30">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span
                    className="text-3xl font-bold text-white/15"
                    style={{ fontFamily: "var(--tpl-font-display)" }}
                  >
                    {num}
                  </span>
                </div>
                <h3
                  className="relative mt-6 text-xl md:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm text-white/65 leading-relaxed">
                  {service.description}
                </p>
                <div className="relative mt-6 flex items-center justify-between text-xs font-bold tracking-[0.22em] uppercase text-secondary">
                  <span>Learn more</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesRibbon;
