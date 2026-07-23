import { SHOWCASE_ITEMS } from "@template-tire-shop/data/siteData";
import { cn } from "@/lib/utils";

const PropertyShowcase = () => (
  <section className="luxury-section bg-[hsl(var(--re-warm-white))]">
    <div className="container-custom container-inset space-y-24 lg:space-y-32">
      {SHOWCASE_ITEMS.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            item.align === "right" && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className={cn("image-zoom aspect-[4/5] lg:aspect-auto lg:min-h-[560px]", i % 2 === 1 && "lg:mt-12")}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className={cn("lg:py-8", item.align === "right" ? "lg:pr-8" : "lg:pl-8")}>
            <p className="luxury-eyebrow mb-4">{item.subtitle}</p>
            <h2 className="luxury-subheading lg:text-5xl mb-6">{item.title}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg font-light">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PropertyShowcase;
