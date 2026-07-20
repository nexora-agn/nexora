import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { PROPERTY_CATEGORIES } from "@template-mobile-store/data/siteData";

const PropertyCategories = () => (
  <section className="luxury-section bg-white">
    <div className="container-custom container-inset">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="dealer-eyebrow mb-3">Shop by Style</p>
        <h2 className="luxury-heading">Browse Our Inventory</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {PROPERTY_CATEGORIES.map((cat, i) => {
          const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] || LucideIcons.Home;
          return (
            <Link
              key={cat.id}
              to={cat.to}
              className="card-luxury group p-6 lg:p-8 text-center hover:border-[hsl(var(--secondary))]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-border group-hover:border-[hsl(var(--secondary))] group-hover:bg-[hsl(var(--re-champagne-light))] transition-all">
                <Icon className="h-6 w-6 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="font-display text-lg lg:text-xl text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-muted-foreground hidden sm:block">{cat.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default PropertyCategories;
