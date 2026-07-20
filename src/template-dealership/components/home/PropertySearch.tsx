import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Car, DollarSign, Gauge } from "lucide-react";

const MAKES = ["Any Make", "BMW", "Mercedes-Benz", "Tesla", "Ford", "Porsche", "Audi", "Chevrolet", "Hyundai", "Jeep"];
const BODY_STYLES = ["Any Style", "SUV", "Sedan", "Truck", "Coupe", "Electric", "Performance"];
const PRICE_RANGES = ["Any Price", "Under $30k", "$30k – $50k", "$50k – $75k", "$75k – $100k", "$100k+"];

const PropertySearch = () => {
  const navigate = useNavigate();
  const [condition, setCondition] = useState<"all" | "new" | "used" | "cpo">("all");
  const [make, setMake] = useState("Any Make");
  const [body, setBody] = useState("Any Style");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (condition !== "all") params.set("condition", condition);
    if (make !== "Any Make") params.set("make", make);
    if (body !== "Any Style") params.set("body", body.toLowerCase());
    if (priceRange !== "Any Price") params.set("price", priceRange);
    if (keyword.trim()) params.set("q", keyword.trim());
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div className="relative -mt-16 lg:-mt-20 z-40 container-custom container-inset">
      <div className="bg-white border border-border shadow-[0_24px_80px_-20px_rgba(0,0,0,0.18)] p-4 lg:p-6 rounded-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            ["all", "All Inventory"],
            ["new", "New"],
            ["used", "Used"],
            ["cpo", "Certified"],
          ] as const).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setCondition(val)}
              className={
                condition === val
                  ? "px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--primary))] text-white"
                  : "px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--muted))] text-muted-foreground hover:text-[hsl(var(--primary))]"
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search make, model, stock #..."
              className="w-full h-11 pl-10 pr-3 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            />
          </div>
          <select value={make} onChange={e => setMake(e.target.value)} className="h-11 px-3 border border-border text-sm bg-white">
            {MAKES.map(m => <option key={m}>{m}</option>)}
          </select>
          <select value={body} onChange={e => setBody(e.target.value)} className="h-11 px-3 border border-border text-sm bg-white">
            {BODY_STYLES.map(b => <option key={b}>{b}</option>)}
          </select>
          <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="h-11 px-3 border border-border text-sm bg-white">
            {PRICE_RANGES.map(p => <option key={p}>{p}</option>)}
          </select>
          <button
            type="button"
            onClick={handleSearch}
            className="h-11 bg-[hsl(var(--secondary))] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2"
          >
            <Car className="h-4 w-4" /> Search Inventory
          </button>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground flex items-center gap-4">
          <span className="flex items-center gap-1"><Gauge className="h-3 w-3" /> Advanced filters on results</span>
          <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> Payment estimates available</span>
        </p>
      </div>
    </div>
  );
};

export default PropertySearch;
