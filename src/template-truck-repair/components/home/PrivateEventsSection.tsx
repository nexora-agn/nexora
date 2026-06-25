import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRIVATE_EVENT_TYPES } from "@template-truck-repair/data/siteData";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const PrivateEventsSection = () => (
  <section className="luxury-section">
    <div className="container-custom container-inset">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-14">
        <Reveal>
          <div>
            <p className="luxury-eyebrow mb-4">Private Dining</p>
            <h2 className="luxury-heading">
              Celebrate <span className="italic text-[hsl(var(--secondary))]">In Style</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-muted-foreground leading-relaxed lg:pb-2">
            From intimate gatherings to grand celebrations, our private dining spaces offer
            bespoke menus, dedicated service, and an atmosphere of refined elegance.
          </p>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRIVATE_EVENT_TYPES.map((event, i) => (
          <Reveal key={event.id} delay={i * 60}>
            <article className="card-luxury group overflow-hidden">
              <div className="image-zoom aspect-[16/10]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{event.description}</p>
                <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--secondary))]">
                  Up to {event.capacity} guests
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/private-events" className="btn-luxury-primary inline-flex items-center gap-2">
          Plan Your Event <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default PrivateEventsSection;
