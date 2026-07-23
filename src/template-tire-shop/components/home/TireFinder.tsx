import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type FinderTab = "vehicle" | "size" | "type";

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const MAKES = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Tesla", "Ram", "Jeep", "Mercedes-Benz", "Subaru"];
const MODELS: Record<string, string[]> = {
  Toyota: ["Camry", "RAV4", "Tacoma", "Highlander"],
  Honda: ["Civic", "CR-V", "Accord", "Pilot"],
  Ford: ["F-150", "Escape", "Explorer", "Mustang"],
  Chevrolet: ["Silverado", "Equinox", "Tahoe", "Camaro"],
  BMW: ["3 Series", "X3", "5 Series", "X5"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  Ram: ["1500", "2500", "ProMaster"],
  Jeep: ["Wrangler", "Grand Cherokee", "Gladiator"],
  "Mercedes-Benz": ["C-Class", "GLC", "E-Class"],
  Subaru: ["Outback", "Forester", "Crosstrek"],
};
const TRIMS = ["Base", "Sport", "Limited", "Premium", "Off-Road", "Performance"];

const WIDTHS = ["195", "205", "215", "225", "235", "245", "255", "265", "275", "285"];
const ASPECTS = ["35", "40", "45", "50", "55", "60", "65", "70", "75"];
const RIMS = ["15", "16", "17", "18", "19", "20", "21", "22"];

const TYPE_CHIPS = [
  { id: "all-season", label: "All-Season" },
  { id: "winter", label: "Winter" },
  { id: "summer", label: "Summer" },
  { id: "performance", label: "Performance" },
  { id: "all-terrain", label: "All-Terrain" },
  { id: "mud-terrain", label: "Mud-Terrain" },
  { id: "run-flat", label: "Run-Flat" },
  { id: "ev", label: "EV" },
  { id: "truck", label: "Truck" },
  { id: "commercial", label: "Commercial" },
];

const selectClass =
  "w-full h-11 bg-white/5 border border-white/20 text-white text-sm font-sans-brand px-3 focus:outline-none focus:border-[hsl(var(--secondary))] appearance-none";

const TireFinder = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<FinderTab>("vehicle");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [width, setWidth] = useState("");
  const [aspect, setAspect] = useState("");
  const [rim, setRim] = useState("");
  const [types, setTypes] = useState<string[]>([]);

  const models = make ? MODELS[make] || [] : [];

  const toggleType = (id: string) => {
    setTypes(prev => (prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]));
  };

  const onSubmit = () => {
    const params = new URLSearchParams();
    if (tab === "vehicle") {
      if (year) params.set("year", year);
      if (make) params.set("make", make);
      if (model) params.set("model", model);
      if (trim) params.set("trim", trim);
    } else if (tab === "size") {
      if (width && aspect && rim) params.set("size", `${width}/${aspect}R${rim}`);
      if (width) params.set("width", width);
      if (aspect) params.set("aspect", aspect);
      if (rim) params.set("rim", rim);
    } else if (types.length === 1) {
      params.set("category", types[0]);
    } else if (types.length > 1) {
      params.set("category", types.join(","));
    }
    navigate(`/shop?${params.toString()}`);
  };

  const tabs: { id: FinderTab; label: string }[] = [
    { id: "vehicle", label: "By Vehicle" },
    { id: "size", label: "By Size" },
    { id: "type", label: "By Type" },
  ];

  return (
    <section className="relative z-10 -mt-16 sm:-mt-20 pb-4">
      <div className="container-custom container-inset">
        <div className="tire-finder-shell p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <p className="tire-eyebrow mb-2">Tire Finder</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Match the Right Rubber
              </h2>
            </div>
            <div className="flex border border-white/20">
              {tabs.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "px-4 sm:px-5 py-2.5 text-[11px] font-sans-brand font-semibold uppercase tracking-[0.14em] transition-colors",
                    tab === t.id
                      ? "bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
                      : "text-white/70 hover:text-white hover:bg-white/5",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {tab === "vehicle" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Year</span>
                <select className={selectClass} value={year} onChange={e => setYear(e.target.value)}>
                  <option value="" className="text-black">Select year</option>
                  {YEARS.map(y => (
                    <option key={y} value={y} className="text-black">{y}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Make</span>
                <select
                  className={selectClass}
                  value={make}
                  onChange={e => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                >
                  <option value="" className="text-black">Select make</option>
                  {MAKES.map(m => (
                    <option key={m} value={m} className="text-black">{m}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Model</span>
                <select
                  className={selectClass}
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  disabled={!make}
                >
                  <option value="" className="text-black">Select model</option>
                  {models.map(m => (
                    <option key={m} value={m} className="text-black">{m}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Trim</span>
                <select className={selectClass} value={trim} onChange={e => setTrim(e.target.value)}>
                  <option value="" className="text-black">Any trim</option>
                  {TRIMS.map(t => (
                    <option key={t} value={t} className="text-black">{t}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {tab === "size" && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 max-w-2xl">
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Width</span>
                <select className={selectClass} value={width} onChange={e => setWidth(e.target.value)}>
                  <option value="" className="text-black">e.g. 225</option>
                  {WIDTHS.map(w => (
                    <option key={w} value={w} className="text-black">{w}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Aspect</span>
                <select className={selectClass} value={aspect} onChange={e => setAspect(e.target.value)}>
                  <option value="" className="text-black">e.g. 45</option>
                  {ASPECTS.map(a => (
                    <option key={a} value={a} className="text-black">{a}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5">Rim</span>
                <select className={selectClass} value={rim} onChange={e => setRim(e.target.value)}>
                  <option value="" className="text-black">e.g. 17</option>
                  {RIMS.map(r => (
                    <option key={r} value={r} className="text-black">{r}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {tab === "type" && (
            <div className="flex flex-wrap gap-2 mb-6">
              {TYPE_CHIPS.map(chip => {
                const on = types.includes(chip.id);
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => toggleType(chip.id)}
                    className={cn(
                      "px-4 py-2 text-[11px] font-sans-brand font-semibold uppercase tracking-[0.12em] border transition-colors",
                      on
                        ? "bg-[hsl(var(--secondary))] border-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
                        : "border-white/25 text-white/80 hover:border-white/50",
                    )}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] font-sans-brand text-xs font-semibold uppercase tracking-[0.16em] hover:brightness-110 transition-all"
            >
              <Search className="h-4 w-4" />
              Show Matching Tires
            </button>
            <p className="text-xs text-white/45 font-sans-brand">
              Specs shown before checkout · Install available at four Austin shops
            </p>
          </div>
        </div>
      </div>
      <div className="road-stripe mt-10 sm:mt-12" aria-hidden />
    </section>
  );
};

export default TireFinder;
