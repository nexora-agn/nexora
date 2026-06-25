import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Bed, DollarSign } from "lucide-react";

const PROPERTY_TYPES = ["All Types", "Villa", "Apartment", "Penthouse", "Waterfront", "Commercial", "Land"];
const BEDROOMS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const PRICE_RANGES = ["Any Price", "Under $2M", "$2M – $5M", "$5M – $10M", "$10M – $20M", "$20M+"];

const PropertySearch = () => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [priceRange, setPriceRange] = useState("Any Price");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (location) params.set("location", location);
    if (propertyType !== "All Types") params.set("propertyType", propertyType.toLowerCase());
    if (bedrooms !== "Any") params.set("beds", bedrooms.replace("+", ""));
    if (priceRange !== "Any Price") params.set("price", priceRange);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="relative -mt-16 lg:-mt-20 z-40 container-custom container-inset">
      <div className="bg-white border border-border shadow-[0_24px_80px_-20px_rgba(0,0,0,0.15)] p-4 lg:p-6">
        <div className="flex gap-2 mb-4">
          {(["buy", "rent"] as const).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setListingType(type)}
              className={
                listingType === type
                  ? "px-6 py-2 text-xs font-medium uppercase tracking-wider bg-[hsl(var(--primary))] text-white"
                  : "px-6 py-2 text-xs font-medium uppercase tracking-wider bg-[hsl(var(--muted))] text-muted-foreground hover:text-[hsl(var(--primary))]"
              }
            >
              {type === "buy" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-border bg-[hsl(var(--muted))]/50 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--secondary))]"
            />
          </div>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-border bg-[hsl(var(--muted))]/50 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[hsl(var(--secondary))]"
            >
              {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="relative">
            <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-border bg-[hsl(var(--muted))]/50 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[hsl(var(--secondary))]"
            >
              {BEDROOMS.map(b => <option key={b}>{b} Beds</option>)}
            </select>
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-border bg-[hsl(var(--muted))]/50 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[hsl(var(--secondary))]"
            >
              {PRICE_RANGES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="h-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
