import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { FLEET_PROGRAM } from "@template-truck-repair/data/siteData";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const FleetProgramSection = () => (
  <section className="industrial-section bg-[hsl(var(--muted))]">
    <div className="container-custom container-inset">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <img src={FLEET_PROGRAM.image} alt="" className="w-full aspect-[4/3] object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={80}>
          <p className="industrial-eyebrow mb-3">B2B Fleet Programs</p>
          <h2 className="industrial-heading mb-4">{FLEET_PROGRAM.title}</h2>
          <p className="text-muted-foreground mb-8">{FLEET_PROGRAM.subtitle}</p>
          <ul className="space-y-3 mb-8">
            {FLEET_PROGRAM.benefits.map(b => (
              <li key={b} className="flex gap-3 text-sm">
                <Check className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
          <Link to={FLEET_PROGRAM.cta.to} className="btn-industrial-primary">{FLEET_PROGRAM.cta.label}</Link>
        </Reveal>
      </div>
    </div>
  </section>
);

export default FleetProgramSection;
