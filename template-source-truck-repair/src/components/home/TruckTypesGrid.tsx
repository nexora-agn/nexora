import * as Icons from "lucide-react";
import { TRUCK_TYPES } from "@template-truck-repair/data/siteData";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const TruckTypesGrid = () => (
  <section className="industrial-section">
    <div className="container-custom container-inset">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="industrial-eyebrow mb-3">Vehicle Coverage</p>
          <h2 className="industrial-heading">Truck Types We Service</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {TRUCK_TYPES.map((t, i) => {
          const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[t.icon] || Icons.Truck;
          return (
            <Reveal key={t.id} delay={i * 30}>
              <article className="group relative overflow-hidden aspect-[4/3]">
                <img src={t.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/90 via-[hsl(var(--primary))]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
                  <h3 className="font-display text-sm text-white">{t.title}</h3>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default TruckTypesGrid;
