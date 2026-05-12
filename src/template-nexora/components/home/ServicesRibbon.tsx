import { Link } from "react-router-dom";
import {
  Flame,
  Home,
  CloudLightning,
  Wrench,
  Hammer,
  ClipboardCheck,
  Droplets,
  Zap,
  PanelTop,
  Building2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

const iconMap = {
  Flame,
  Home,
  CloudLightning,
  Wrench,
  Hammer,
  ClipboardCheck,
  Droplets,
  Zap,
  PanelTop,
  Building2,
} as const;

/**
 * Nexora (bold local contractor) — busy, chunky 2-col grid with thick
 * borders, corner 24/7 badges on emergency-eligible services, "Get quote"
 * pill on each card, and bullet point inclusions inside each card.
 * Intentionally maximalist — opposite of Summit's minimal hairline index
 * and Roofix's dark glass-card grid.
 */
const ServicesRibbon = () => {
  const { services } = useSiteContent();

  // Services that qualify as emergency-eligible
  const emergencyIds = new Set([
    "roof-repair",
    "storm-damage",
    "emergency-repair",
    "storm-damage-repair",
  ]);

  return (
    <section className="bg-muted/40 border-y-[6px] border-secondary relative">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, hsl(var(--primary)) 0 2px, transparent 2px 18px)",
        }}
      />
      <div className="container-custom section-padding relative">
        {/* Loud header */}
        <div className="text-center mb-12">
          <span className="tpl-tag">
            <Flame className="h-3 w-3" /> Trusted by 500+ homeowners
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[0.95]">
            Roofing services{" "}
            <span className="text-secondary">that get it done.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-foreground/75">
            Storm-day emergencies. Full replacements. Insurance claims handled
            start to finish. Tap any service to get a free same-day estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map(service => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
            const isEmergency = emergencyIds.has(service.id);
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group relative bg-card rounded-[var(--radius)] border-2 border-primary/10 hover:border-secondary tpl-raised overflow-hidden transition-all duration-200"
              >
                {/* Corner 24/7 badge for emergency services */}
                {isEmergency && (
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-destructive text-white px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase shadow-md">
                    <Clock className="h-3 w-3" /> 24/7
                  </span>
                )}

                {/* Top color block */}
                <div className="bg-primary text-primary-foreground p-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground shrink-0">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                  <h3 className="text-lg font-bold leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-foreground/80">
                    {[
                      "Free on-site inspection",
                      "Lifetime workmanship warranty",
                      "Insurance claim help",
                    ].map(line => (
                      <li key={line} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 text-secondary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      Get quote
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <ShieldCheck className="h-5 w-5 text-foreground/30" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 rounded-[var(--radius)] bg-primary text-primary-foreground p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 tpl-raised">
          <div>
            <p className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">
              Don't see your service?
            </p>
            <p className="text-xl md:text-2xl font-bold mt-1">
              We do siding, gutters, skylights & more.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-secondary px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-secondary-foreground hover:bg-white hover:text-primary transition-colors"
          >
            See full list
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesRibbon;
