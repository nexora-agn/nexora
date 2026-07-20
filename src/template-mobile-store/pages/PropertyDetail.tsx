import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, GitCompare, Star } from "lucide-react";
import Layout from "@template-mobile-store/components/layout/Layout";
import { ProductCard } from "@template-mobile-store/components/home/FeaturedListings";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { useTheme } from "@template-mobile-store/contexts/ThemeContext";
import { toggleFavorite, isFavorite } from "@template-mobile-store/lib/favorites";
import { toggleCompare } from "@template-mobile-store/lib/propertyCompare";
import { addToCart } from "@template-mobile-store/lib/cart";
import type { PhoneProduct } from "@template-mobile-store/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Pre-owned",
  refurbished: "Certified refurbished",
};

const PropertyDetail = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const { id } = useParams();
  const product = (projects as PhoneProduct[]).find(p => p.id === id);
  const [fav, setFav] = useState(() => (id ? isFavorite(id) : false));
  const [color, setColor] = useState(product?.color ?? "");
  const [storage, setStorage] = useState(product?.storage ?? "");

  if (!product) {
    return (
      <Layout>
        <div className="py-32 text-center container-custom">
          <h1 className="font-display text-2xl">Product not found</h1>
          <Link to="/shop" className="text-[hsl(var(--secondary))] mt-4 inline-block">
            Back to shop
          </Link>
        </div>
      </Layout>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const storageOptions = [...new Set([product.storage, ...(product.options || [])].filter(Boolean))];
  const colorOptions = product.colors?.length ? product.colors : [product.color];
  const similar = (projects as PhoneProduct[])
    .filter(pr => pr.id !== product.id && (pr.category === product.category || pr.brand === product.brand))
    .slice(0, 3);

  const onAddToCart = () => {
    addToCart(product.id, { color, storage });
    toast.success("Added to cart");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    sku: product.stockNumber,
    image: gallery[0],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {product.title} | {COMPANY.name}
        </title>
        <meta name="description" content={product.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="dealer-header-offset pb-12">
        <div className="container-custom container-inset py-10">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--secondary))] mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-[hsl(var(--muted))]/40 border border-border p-8 flex items-center justify-center min-h-[360px]">
              <img src={resolveProjectImage(product.id, gallery[0])} alt={product.title} className="max-h-[420px] w-full object-contain" />
            </div>

            <div>
              <p className="tech-eyebrow mb-2">{product.brand}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[hsl(var(--primary))] text-white text-[10px] uppercase tracking-wider">
                  {conditionLabel[product.listingType] || product.listingType}
                </span>
                {product.badges?.map(b => (
                  <span key={b} className="px-3 py-1 bg-[hsl(var(--secondary))] text-white text-[10px] uppercase tracking-wider">
                    {b}
                  </span>
                ))}
              </div>
              <h1 className="font-sans-brand text-3xl md:text-4xl font-semibold text-[hsl(var(--primary))] mb-4">{product.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" : "opacity-25")} />
                ))}
                <span>
                  {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
              <p className="font-display text-4xl text-[hsl(var(--secondary))] mb-1">{product.priceLabel}</p>
              {product.monthlyEstimate ? (
                <p className="text-sm text-muted-foreground mb-8">Or from ${product.monthlyEstimate}/mo with approved credit</p>
              ) : (
                <div className="mb-8" />
              )}

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={cn(
                          "px-4 py-2 text-sm border",
                          color === c ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/10" : "border-border",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Storage</p>
                  <div className="flex flex-wrap gap-2">
                    {storageOptions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStorage(s)}
                        className={cn(
                          "px-4 py-2 text-sm border",
                          storage === s ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/10" : "border-border",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button type="button" onClick={onAddToCart} className="rounded-none flex-1 h-12 uppercase text-xs tracking-wider bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90">
                  Add to Cart
                </Button>
                <Button asChild className="rounded-none flex-1 h-12 uppercase text-xs tracking-wider bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                  <Link to="/checkout">Buy Now</Link>
                </Button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFav(toggleFavorite(product.id).includes(product.id))}
                  className="flex-1 h-10 border border-border flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:border-[hsl(var(--secondary))]"
                >
                  <Heart className={cn("h-4 w-4", fav && "fill-red-500 text-red-500")} /> Save
                </button>
                <button
                  type="button"
                  onClick={() => toggleCompare(product.id)}
                  className="flex-1 h-10 border border-border flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:border-[hsl(var(--secondary))]"
                >
                  <GitCompare className="h-4 w-4" /> Compare
                </button>
                <button type="button" className="h-10 w-10 border border-border flex items-center justify-center hover:border-[hsl(var(--secondary))]">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="luxury-subheading mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h2 className="luxury-subheading mb-4">Specifications</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Display: {product.screen}</li>
                <li>Processor: {product.processor}</li>
                <li>RAM: {product.ram}</li>
                <li>Storage: {storage || product.storage}</li>
                <li>Camera: {product.camera}</li>
                <li>Battery: {product.battery}</li>
                <li>OS: {product.os}</li>
                <li>Connectivity: {product.connectivity}</li>
                <li>Water resistance: {product.waterResistance}</li>
                <li>Warranty: {product.warranty}</li>
              </ul>
            </div>
          </div>

          {product.features?.length > 0 && (
            <div className="mt-12">
              <h2 className="luxury-subheading mb-4">Highlights</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--secondary))] rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {similar.length > 0 && (
            <div className="mt-20">
              <h2 className="luxury-subheading mb-8">You may also like</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {similar.map(l => (
                  <ProductCard key={l.id} listing={l} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
