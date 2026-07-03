import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";

const ServicesGrid = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const featured = services.slice(0, 9);

  return (
    <section className="luxury-section bg-background">
      <div className="container-custom container-inset">
        <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
          <p className="luxury-eyebrow mb-4">What We Offer</p>
          <h2 className="luxury-heading">Signature Services</h2>
          <p className="mt-5 text-muted-foreground">
            Precision haircuts, beard work, and grooming rituals — every service starts with a real consultation.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <Reveal key={service.id} direction="up" delay={(i % 3) * 100}>
              <div className="card-luxury group flex flex-col h-full">
                <div className="image-zoom relative h-56">
                  <img src={resolveServiceImage(service.id, service.image)} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute top-3 right-3 bg-[hsl(var(--primary))] text-white text-xs font-bold px-3 py-1.5">
                    {service.priceLabel}
                  </div>
                  {service.popular && (
                    <div className="absolute top-3 left-3 bg-[hsl(var(--secondary))] text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg uppercase text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1 line-clamp-2">{service.description}</p>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {service.duration}
                    </span>
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--secondary))] hover:gap-2 transition-all"
                    >
                      Book Now <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services" className="btn-luxury-outline">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
