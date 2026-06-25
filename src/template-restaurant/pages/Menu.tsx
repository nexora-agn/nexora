import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Layout from "@template-restaurant/components/layout/Layout";
import Reveal from "@template-restaurant/components/animations/Reveal";
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_IMAGES } from "@template-restaurant/data/siteData";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const badgeLabel: Record<string, string> = {
  popular: "Popular",
  "chef-recommendation": "Chef's Pick",
  seasonal: "Seasonal",
};

const Menu = () => {
  const { company: COMPANY } = useSiteContent();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) setActiveCategory(fromUrl);
  }, [searchParams]);

  const visibleItems = useMemo(
    () => MENU_ITEMS.filter(i => !i.hidden && i.available !== false),
    [],
  );

  const filtered = useMemo(
    () => activeCategory === "all"
      ? visibleItems
      : visibleItems.filter(i => i.categoryId === activeCategory),
    [activeCategory, visibleItems],
  );

  const grouped = useMemo(() => {
    if (activeCategory !== "all") return [{ id: activeCategory, items: filtered }];
    return MENU_CATEGORIES.map(cat => ({
      id: cat.id,
      title: cat.title,
      items: visibleItems.filter(i => i.categoryId === cat.id),
    })).filter(g => g.items.length > 0);
  }, [activeCategory, filtered, visibleItems]);

  return (
    <Layout>
      <Helmet>
        <title>Menu | {COMPANY.name}</title>
        <meta name="description" content={`Explore the menu at ${COMPANY.name}. Seasonal cuisine, signature dishes, and curated wine selection.`} />
      </Helmet>

      <section className="relative h-[50vh] min-h-[360px] flex items-end">
        <img src={RESTAURANT_IMAGES.menuHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="container-custom container-inset relative pb-12 pt-32">
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-3">Culinary Arts</p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-medium">Our Menu</h1>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container-custom container-inset py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                activeCategory === "all"
                  ? "bg-[hsl(var(--primary))] text-white"
                  : "text-muted-foreground hover:text-[hsl(var(--primary))]",
              )}
            >
              All
            </button>
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors whitespace-nowrap",
                  activeCategory === cat.id
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset space-y-20">
          {grouped.map((group, gi) => (
            <div key={group.id}>
              {activeCategory === "all" && "title" in group && (
                <Reveal>
                  <h2 className="font-display text-3xl text-[hsl(var(--primary))] mb-10 pb-4 border-b border-border">
                    {(group as { title: string }).title}
                  </h2>
                </Reveal>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                {group.items.map((item, i) => (
                  <Reveal key={item.id} delay={i * 40}>
                    <article className="flex gap-5 group">
                      <div className="image-zoom w-28 h-28 shrink-0 hidden sm:block">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 border-b border-border pb-6">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <div>
                            <h3 className="font-display text-xl text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                              {item.name}
                            </h3>
                            {item.badges?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.badges.map(b => (
                                  <span key={b} className="text-[9px] uppercase tracking-wider text-[hsl(var(--secondary))]">
                                    {badgeLabel[b] || b}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="font-sans-brand text-sm font-medium text-[hsl(var(--secondary))] shrink-0">
                            {item.priceLabel}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        {item.allergens?.length > 0 && (
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mt-2">
                            Allergens: {item.allergens.join(", ")}
                          </p>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
