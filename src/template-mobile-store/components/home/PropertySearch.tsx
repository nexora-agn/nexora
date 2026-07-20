import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Smartphone, DollarSign } from "lucide-react";

const BRANDS = ["All brands", "Apple", "Samsung", "Google", "OnePlus", "Nexora"];
const CATEGORIES = [
  ["all", "All categories"],
  ["smartphones", "Smartphones"],
  ["iphone", "iPhones"],
  ["samsung", "Samsung"],
  ["pixel", "Pixel"],
  ["refurbished", "Refurbished"],
  ["tablets", "Tablets"],
  ["smartwatches", "Watches"],
  ["accessories", "Accessories"],
] as const;

const PRICE_RANGES: [string, string][] = [
  ["any", "Any price"],
  ["under-500", "Under $500"],
  ["500-800", "$500 – $800"],
  ["800-1000", "$800 – $1,000"],
  ["1000-plus", "$1,000+"],
];

const PropertySearch = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("All brands");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== "All brands") params.set("brand", brand.toLowerCase());
    if (category !== "all") params.set("category", category);
    if (priceRange !== "any") params.set("price", priceRange);
    if (keyword.trim()) params.set("q", keyword.trim());
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <div className="relative -mt-16 lg:-mt-20 z-40 container-custom container-inset">
      <div className="bg-white border border-border shadow-[0_24px_80px_-20px_rgba(0,0,0,0.18)] p-4 lg:p-6 rounded-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search model, brand, SKU..."
              className="w-full h-11 pl-10 pr-3 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            />
          </div>
          <select value={brand} onChange={e => setBrand(e.target.value)} className="h-11 px-3 border border-border text-sm bg-white">
            {BRANDS.map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select value={category} onChange={e => setCategory(e.target.value)} className="h-11 px-3 border border-border text-sm bg-white">
            {CATEGORIES.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
          <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="h-11 px-3 border border-border text-sm bg-white">
            {PRICE_RANGES.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSearch}
            className="h-11 bg-[hsl(var(--secondary))] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2"
          >
            <Smartphone className="h-4 w-4" /> Search
          </button>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground flex items-center gap-4">
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" /> Monthly payments on every device
          </span>
        </p>
      </div>
    </div>
  );
};

export default PropertySearch;
