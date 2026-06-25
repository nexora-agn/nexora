import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const ServicesGrid = () => {
  const { services } = useSiteContent();

  return (
    <section className="industrial-section">
      <div className="container-custom container-inset">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="industrial-eyebrow mb-3">Our Services</p>
            <h2 className="industrial-heading">Heavy-Duty Repair Services</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] || Icons.Wrench;
            return (
              <Reveal key={s.id} delay={i * 40}>
                <article className="card-industrial p-6 h-full flex flex-col group">
                  <div className="w-12 h-12 flex items-center justify-center bg-[hsl(var(--primary))] text-[hsl(var(--secondary))] mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{s.description}</p>
                  <Link to={`/services/${s.id}`} className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
                    Request Service →
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
