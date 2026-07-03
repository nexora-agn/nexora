import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { PRODUCTS } from "@template-barbershop/data/siteData";

const ProductsPreview = () => {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="luxury-section bg-background">
      <div className="container-custom container-inset">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <Reveal direction="up">
            <p className="luxury-eyebrow mb-4">Take It Home</p>
            <h2 className="luxury-heading">Grooming Products</h2>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--secondary))] hover:gap-2.5 transition-all">
              Shop All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <Reveal key={product.id} direction="up" delay={i * 90}>
              <div className="group">
                <div className="image-zoom aspect-square bg-[hsl(var(--muted))] mb-4">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="text-[10px] font-sans-brand font-semibold uppercase tracking-[0.16em] text-[hsl(var(--secondary))]">
                  {product.category}
                </p>
                <h3 className="mt-1 font-display text-base uppercase text-foreground">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold text-foreground">{product.priceLabel}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
