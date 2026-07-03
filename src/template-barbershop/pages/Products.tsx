import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShoppingBag, Info } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { PRODUCTS, BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const Products = () => {
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);
  const filtered = category === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <Layout>
      <Helmet>
        <title>Products | {COMPANY.name}</title>
        <meta name="description" content="Shop the same pomades, oils, and tools our barbers use every day." />
      </Helmet>

      <PageHeader eyebrow="Take It Home" title="Grooming Products" subtitle="The same pomades, oils, and tools our barbers reach for every day." image={BARBERSHOP_IMAGES.productsHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 text-xs font-sans-brand font-semibold uppercase tracking-wide border transition-colors",
                  category === cat ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border text-muted-foreground hover:border-[hsl(var(--primary))]/40",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <Reveal key={product.id} direction="up" delay={(i % 4) * 80}>
                <div className="group card-luxury flex flex-col h-full">
                  <div className="image-zoom aspect-square bg-[hsl(var(--muted))]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[10px] font-sans-brand font-semibold uppercase tracking-[0.16em] text-[hsl(var(--secondary))]">{product.category}</p>
                    <h3 className="mt-1.5 font-display text-base uppercase text-foreground">{product.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-display text-lg text-[hsl(var(--primary))]">{product.priceLabel}</span>
                      <div className="flex items-center gap-2">
                        <button aria-label="Learn more" className="flex h-8 w-8 items-center justify-center border border-border hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors">
                          <Info className="h-3.5 w-3.5" />
                        </button>
                        <button aria-label="Buy now" className="flex h-8 w-8 items-center justify-center bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--secondary))] transition-colors">
                          <ShoppingBag className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Products;
