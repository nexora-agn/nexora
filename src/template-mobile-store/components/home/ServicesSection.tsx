import { Link } from "react-router-dom";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { useTheme } from "@template-mobile-store/contexts/ThemeContext";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  return (
    <section className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="luxury-eyebrow mb-3">Full-Service Advisory</p>
          <h2 className="luxury-heading">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              className="card-luxury group overflow-hidden"
            >
              <div className="image-zoom aspect-[16/10]">
                <img src={resolveServiceImage(s.id, s.image)} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{s.description}</p>
                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[hsl(var(--secondary))]">
                  Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
