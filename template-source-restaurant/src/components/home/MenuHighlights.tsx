import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@template-restaurant/data/siteData";
import Reveal from "@template-restaurant/components/animations/Reveal";
import { cn } from "@/lib/utils";

const badgeLabel: Record<string, string> = {
  popular: "Popular",
  "chef-recommendation": "Chef's Pick",
  seasonal: "Seasonal",
};

const MenuHighlights = () => {
  const featured = MENU_ITEMS.filter(i => !i.hidden && (i.badges?.length || i.categoryId === "signature-dishes")).slice(0, 6);

  return (
    <section className="luxury-section">
      <div className="container-custom container-inset">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="luxury-eyebrow mb-4">Our Menu</p>
            <h2 className="luxury-heading mb-5">Culinary <span className="italic text-[hsl(var(--secondary))]">Masterpieces</span></h2>
            <p className="text-muted-foreground leading-relaxed">
              Seasonal ingredients, refined technique, and flavors that tell a story on every plate.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <article className="card-luxury group">
                <div className="image-zoom aspect-[4/3] relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  {item.badges?.[0] && (
                    <span className="absolute top-4 left-4 bg-[hsl(var(--primary))] text-white text-[10px] uppercase tracking-wider px-3 py-1">
                      {badgeLabel[item.badges[0]] || item.badges[0]}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-display text-xl text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-sans-brand text-sm font-medium text-[hsl(var(--secondary))] shrink-0">
                      {item.priceLabel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                  {item.allergens?.length > 0 && (
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      Contains: {item.allergens.join(", ")}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {MENU_CATEGORIES.slice(0, 8).map(cat => (
            <Link
              key={cat.id}
              to={cat.to}
              className="text-xs font-sans-brand uppercase tracking-[0.14em] px-4 py-2 border border-border hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/menu" className="btn-luxury-primary inline-flex items-center gap-2">
            View Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;
