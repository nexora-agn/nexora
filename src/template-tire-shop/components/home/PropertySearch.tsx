import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SEASONS = ["All types", "All-Season", "Winter", "Summer", "Performance", "All-Terrain"];
const CATEGORIES = [
  ["all", "All categories"],
  ["all-season", "All-Season"],
  ["winter", "Winter"],
  ["summer", "Summer"],
  ["performance", "Performance"],
  ["all-terrain", "All-Terrain"],
  ["mud-terrain", "Mud-Terrain"],
  ["run-flat", "Run-Flat"],
  ["ev", "EV"],
  ["truck", "Truck"],
] as const;

const PRICE_RANGES: [string, string][] = [
  ["any", "Any price"],
  ["under-150", "Under $150"],
  ["150-250", "$150 – $250"],
  ["250-400", "$250 – $400"],
  ["400-plus", "$400+"],
];

/** Legacy search strip — TireFinder is primary; keep for optional sections. */
const PropertySearch = () => {
  const navigate = useNavigate();
  const [season, setSeason] = useState("All types");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (season !== "All types") params.set("season", season.toLowerCase().replace(/\s+/g, "-"));
    if (category !== "all") params.set("category", category);
    if (priceRange !== "any") params.set("price", priceRange);
    if (keyword.trim()) params.set("q", keyword.trim());
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <div className="relative -mt-10 z-40 container-custom container-inset">
      <div className="bg-[#141414] border border-white/15 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search brand, model, size…"
              className="w-full h-11 pl-10 pr-3 border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
            />
          </div>
          <select value={season} onChange={e => setSeason(e.target.value)} className="h-11 px-3 border border-white/20 bg-white/5 text-white text-sm">
            {SEASONS.map(m => (
              <option key={m} className="text-black">
                {m}
              </option>
            ))}
          </select>
          <select value={category} onChange={e => setCategory(e.target.value)} className="h-11 px-3 border border-white/20 bg-white/5 text-white text-sm">
            {CATEGORIES.map(([v, l]) => (
              <option key={v} value={v} className="text-black">
                {l}
              </option>
            ))}
          </select>
          <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="h-11 px-3 border border-white/20 bg-white/5 text-white text-sm">
            {PRICE_RANGES.map(([v, l]) => (
              <option key={v} value={v} className="text-black">
                {l}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSearch}
            className="h-11 bg-[hsl(var(--secondary))] text-[#0a0a0a] font-sans-brand text-xs font-bold uppercase tracking-wider hover:brightness-110"
          >
            Find Tires
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
