import { Link } from "react-router-dom";
import { SIGNATURE_DISHES } from "@template-truck-repair/data/siteData";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { cn } from "@/lib/utils";

const SignatureDishes = () => (
  <section className="luxury-section bg-[hsl(var(--muted))]">
    <div className="container-custom container-inset">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="luxury-eyebrow mb-4">Signature Collection</p>
          <h2 className="luxury-heading">
            Dishes That <span className="italic text-[hsl(var(--secondary))]">Define Us</span>
          </h2>
        </div>
      </Reveal>

      <div className="space-y-20 lg:space-y-28">
        {SIGNATURE_DISHES.map((dish, i) => (
          <Reveal key={dish.id} delay={i * 80}>
            <div
              className={cn(
                "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                dish.align === "right" && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="image-zoom">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="luxury-eyebrow mb-3">Signature Dish</p>
                <h3 className="font-display text-3xl md:text-4xl text-[hsl(var(--primary))] mb-4">
                  {dish.title}
                </h3>
                <p className="text-[hsl(var(--secondary))] font-sans-brand text-sm font-medium mb-4">
                  {dish.priceLabel}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">{dish.description}</p>
                <Link to="/menu" className="btn-luxury-outline">
                  Explore Menu
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SignatureDishes;
