import { useState } from "react";
import { Link } from "react-router-dom";
import { Bed, Bath, Car, Maximize, Heart, Share2, Eye, Gauge, Fuel, GitCompare } from "lucide-react";
import { useTheme } from "@template-dealership/contexts/ThemeContext";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { toggleFavorite, isFavorite } from "@template-dealership/lib/favorites";
import { toggleCompare, isInCompare } from "@template-dealership/lib/propertyCompare";
import { cn } from "@/lib/utils";

type Listing = ReturnType<typeof useSiteContent>["projects"][number];

const statusLabel: Record<string, string> = {
  available: "Available",
  sold: "Sold",
  pending: "Pending",
  reserved: "Reserved",
  "for-sale": "For Sale",
};

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  cpo: "Certified",
};

const badgeLabel: Record<string, string> = {
  featured: "Featured",
  new: "New",
  cpo: "CPO",
  sale: "Sale",
  "open-house": "Open House",
};

export const PropertyCard = ({ listing, className }: { listing: Listing; className?: string }) => {
  const { resolveProjectImage } = useTheme();
  const { team } = useSiteContent();
  const [fav, setFav] = useState(() => isFavorite(listing.id));
  const [compared, setCompared] = useState(() => isInCompare(listing.id));
  const agent = team.find(a => a.id === (listing as { agentId?: string }).agentId);
  const badges = (listing as { badges?: string[] }).badges || [];
  const img = resolveProjectImage(listing.id, listing.image);
  const veh = listing as Listing & {
    listingType?: string;
    mileage?: number;
    fuelType?: string;
    monthlyEstimate?: number;
    stockNumber?: string;
  };
  const detailPath = `/inventory/${listing.id}`;

  const onFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFav(toggleFavorite(listing.id).includes(listing.id));
  };

  const onCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    const r = toggleCompare(listing.id);
    setCompared(r.list.includes(listing.id));
  };

  return (
    <article className={cn("card-luxury group", className)}>
      <div className="relative image-zoom aspect-[4/3]">
        <img src={img} alt={listing.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map(b => (
            <span key={b} className="px-3 py-1 bg-[hsl(var(--secondary))] text-white text-[10px] font-medium uppercase tracking-wider">
              {badgeLabel[b] || b}
            </span>
          ))}
          {veh.listingType && (
            <span className="px-3 py-1 bg-black/70 text-white text-[10px] font-medium uppercase tracking-wider">
              {conditionLabel[veh.listingType] || veh.listingType}
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
        <Link to={detailPath}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2 bg-white text-[hsl(var(--primary))] text-xs uppercase tracking-wider">
            <Eye className="h-4 w-4" /> Quick View
          </span>
        </Link>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start gap-4 mb-1">
          <p className="font-display text-2xl text-[hsl(var(--primary))]">
            {(listing as { priceLabel?: string }).priceLabel || listing.value}
          </p>
          {veh.monthlyEstimate ? (
            <p className="text-xs text-muted-foreground text-right">Est. ${veh.monthlyEstimate}/mo</p>
          ) : null}
        </div>
        <Link to={detailPath}>
          <h3 className="font-display text-xl text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors mb-1">
            {listing.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4">
          {(listing as { address?: string }).address || listing.location}
          {(listing as { city?: string }).city ? `, ${(listing as { city?: string }).city}` : ""}
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-4">
          {typeof veh.mileage === "number" ? (
            <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{veh.mileage.toLocaleString()} mi</span>
          ) : null}
          {veh.fuelType ? (
            <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{veh.fuelType}</span>
          ) : null}
          {veh.stockNumber ? (
            <span className="flex items-center gap-1"><Car className="h-3.5 w-3.5" />Stock #{veh.stockNumber}</span>
          ) : null}
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={detailPath} className="flex-1 text-center py-2 bg-[hsl(var(--primary))] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[hsl(var(--secondary))]">
            View Details
          </Link>
          <Link to={`/test-drive?vehicle=${listing.id}`} className="flex-1 text-center py-2 border border-border text-[10px] font-bold uppercase tracking-wider hover:border-[hsl(var(--secondary))]">
            Test Drive
          </Link>
        </div>
        {agent && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <img src={agent.image} alt="" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-xs text-muted-foreground">{agent.name}</span>
          </div>
        )}
      </div>
    </article>
  );
};

const FeaturedListings = () => {
  const { projects } = useSiteContent();
  const featured = projects.filter(p => (p as { featured?: boolean }).featured).slice(0, 6);
  const display = featured.length ? featured : projects.slice(0, 6);

  return (
    <section className="luxury-section bg-[hsl(var(--re-warm-white))]">
      <div className="container-custom container-inset">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="dealer-eyebrow mb-3">Featured Inventory</p>
            <h2 className="luxury-heading">Featured Vehicles</h2>
          </div>
          <Link to="/inventory" className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
            View All Inventory →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {display.map((listing, i) => (
            <div key={listing.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <PropertyCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
