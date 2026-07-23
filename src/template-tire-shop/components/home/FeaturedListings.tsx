import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, GitCompare, Star, ShoppingCart } from "lucide-react";
import { useTheme } from "@template-tire-shop/contexts/ThemeContext";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { toggleFavorite, isFavorite } from "@template-tire-shop/lib/favorites";
import { toggleCompare, isInCompare } from "@template-tire-shop/lib/propertyCompare";
import { addToCart } from "@template-tire-shop/lib/cart";
import type { PhoneProduct } from "@template-tire-shop/data/products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Listing = PhoneProduct;

const conditionLabel: Record<string, string> = {
  new: "In Stock",
  used: "Closeout",
  refurbished: "Open Box",
};

const badgeLabel: Record<string, string> = {
  featured: "Featured",
  new: "New",
  bestseller: "Bestseller",
  sale: "Sale",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[hsl(var(--secondary))]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(rating) ? "fill-current" : "opacity-25")} />
      ))}
    </span>
  );
}

export const ProductCard = ({ listing, className }: { listing: Listing; className?: string }) => {
  const { resolveProjectImage } = useTheme();
  const [fav, setFav] = useState(() => isFavorite(listing.id));
  const [compared, setCompared] = useState(() => isInCompare(listing.id));
  const badges = listing.badges || [];
  const img = resolveProjectImage(listing.id, listing.image);
  const detailPath = `/shop/${listing.id}`;

  const onFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFav(toggleFavorite(listing.id).includes(listing.id));
  };

  const onCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    const r = toggleCompare(listing.id);
    setCompared(r.list.includes(listing.id));
    if (r.full) toast.message("Compare list full (3 max)");
  };

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(listing.id, { color: listing.color, storage: listing.storage });
    toast.success("Added to cart");
  };

  const size = listing.storage;
  const season = listing.trim;
  const installNote = listing.amenities?.includes("Install available") ? "Install available" : listing.warranty?.split("·")[0]?.trim() || "Mount & balance";

  return (
    <article className={cn("card-luxury group", className)}>
      <div className="relative image-zoom aspect-[4/3] bg-[hsl(var(--muted))]">
        <img src={img} alt={listing.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map(b => (
            <span key={b} className="px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] text-[10px] font-semibold uppercase tracking-wider">
              {badgeLabel[b] || b}
            </span>
          ))}
          {listing.listingType && (
            <span className="px-3 py-1 bg-black/80 text-white text-[10px] font-medium uppercase tracking-wider">
              {conditionLabel[listing.listingType] || listing.listingType}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={onFavorite} className="p-2 bg-white/90 hover:bg-white transition-colors" aria-label="Favorite">
            <Heart className={cn("h-4 w-4", fav ? "fill-red-500 text-red-500" : "text-[hsl(var(--primary))]")} />
          </button>
          <button type="button" onClick={onCompare} className="p-2 bg-white/90 hover:bg-white transition-colors" aria-label="Compare">
            <GitCompare className={cn("h-4 w-4", compared ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--primary))]")} />
          </button>
        </div>
        <Link to={detailPath} className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] text-xs uppercase tracking-wider font-semibold">
            <Eye className="h-4 w-4" /> Spec Sheet
          </span>
        </Link>
      </div>

      <div className="p-5 border-t-2 border-[hsl(var(--secondary))]/40">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-brand">{listing.brand}</p>
          <p className="font-display text-xl text-[hsl(var(--primary))] font-semibold">{listing.priceLabel}</p>
        </div>
        <Link to={detailPath}>
          <h3 className="font-sans-brand text-base font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors mb-3 leading-snug">
            {listing.model}
          </h3>
        </Link>
        <div className="grid grid-cols-3 gap-2 text-[11px] font-sans-brand mb-3 border border-border p-2.5 bg-[hsl(var(--muted))]/40">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Size</p>
            <p className="font-semibold text-[hsl(var(--primary))]">{size}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Season</p>
            <p className="font-semibold text-[hsl(var(--primary))]">{season}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Service</p>
            <p className="font-semibold text-[hsl(var(--primary))] truncate">{installNote}</p>
          </div>
        </div>
        {listing.colors?.length ? (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.colors.slice(0, 4).map(c => (
              <span key={c} className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-border text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Stars rating={listing.rating} />
          <span>{listing.rating.toFixed(1)}</span>
          <span>({listing.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={detailPath}
            className="flex-1 text-center py-2.5 bg-[hsl(var(--primary))] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]"
          >
            View Specs
          </Link>
          <button
            type="button"
            onClick={onAddToCart}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 border-2 border-[hsl(var(--primary))] text-[10px] font-bold uppercase tracking-wider hover:border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
};

/** @deprecated use ProductCard */
export const PropertyCard = ProductCard;

const FeaturedListings = () => {
  const { projects } = useSiteContent();
  const featured = (projects as PhoneProduct[]).filter(p => p.featured).slice(0, 6);
  const display = featured.length ? featured : (projects as PhoneProduct[]).slice(0, 6);

  return (
    <section className="luxury-section bg-[hsl(var(--re-warm-white))]">
      <div className="container-custom container-inset">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="tire-eyebrow mb-3">Featured</p>
            <h2 className="tire-heading">Featured Tires</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
            Shop all tires →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {display.map((listing, i) => (
            <div key={listing.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <ProductCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
