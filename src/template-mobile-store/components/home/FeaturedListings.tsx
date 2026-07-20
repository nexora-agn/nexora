import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, GitCompare, Star, ShoppingCart } from "lucide-react";
import { useTheme } from "@template-mobile-store/contexts/ThemeContext";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { toggleFavorite, isFavorite } from "@template-mobile-store/lib/favorites";
import { toggleCompare, isInCompare } from "@template-mobile-store/lib/propertyCompare";
import { addToCart } from "@template-mobile-store/lib/cart";
import type { PhoneProduct } from "@template-mobile-store/data/products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Listing = PhoneProduct;

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Pre-owned",
  refurbished: "Refurbished",
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

  return (
    <article className={cn("card-luxury group", className)}>
      <div className="relative image-zoom aspect-square bg-[hsl(var(--muted))]">
        <img src={img} alt={listing.title} className="w-full h-full object-contain p-4" loading="lazy" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map(b => (
            <span key={b} className="px-3 py-1 bg-[hsl(var(--secondary))] text-white text-[10px] font-medium uppercase tracking-wider">
              {badgeLabel[b] || b}
            </span>
          ))}
          {listing.listingType && (
            <span className="px-3 py-1 bg-black/70 text-white text-[10px] font-medium uppercase tracking-wider">
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
        <Link to={detailPath} className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2 bg-white text-[hsl(var(--primary))] text-xs uppercase tracking-wider">
            <Eye className="h-4 w-4" /> Quick View
          </span>
        </Link>
      </div>

      <div className="p-6">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{listing.brand}</p>
        <div className="flex justify-between items-start gap-4 mb-1">
          <p className="font-display text-2xl text-[hsl(var(--primary))]">{listing.priceLabel}</p>
          {listing.monthlyEstimate ? (
            <p className="text-xs text-muted-foreground text-right">From ${listing.monthlyEstimate}/mo</p>
          ) : null}
        </div>
        <Link to={detailPath}>
          <h3 className="font-sans-brand text-lg font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors mb-2">
            {listing.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">
          {listing.storage} · {listing.color}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Stars rating={listing.rating} />
          <span>{listing.rating.toFixed(1)}</span>
          <span>({listing.reviewCount.toLocaleString()} reviews)</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={detailPath}
            className="flex-1 text-center py-2 bg-[hsl(var(--primary))] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[hsl(var(--secondary))]"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={onAddToCart}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2 border border-border text-[10px] font-bold uppercase tracking-wider hover:border-[hsl(var(--secondary))]"
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
            <p className="tech-eyebrow mb-3">Featured</p>
            <h2 className="luxury-heading">Top Devices</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
            Shop all →
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
