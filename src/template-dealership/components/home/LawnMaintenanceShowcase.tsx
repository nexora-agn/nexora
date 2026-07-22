import { Link } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
import { useTheme } from "@template-dealership/contexts/ThemeContext";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";

const PROGRAM_ITEMS = [
  "Multipoint inspection on every CPO",
  "Remaining factory warranty reviewed",
  "Transparent dealer pricing online",
  "Trade-in appraisal same day",
  "Extended coverage options available",
];

const LawnMaintenanceShowcase = () => {
  const { resolveServiceImage } = useTheme();
  const image = resolveServiceImage("cpo", HOME_BUILDER_IMAGES.keys);

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-3xl bg-[hsl(var(--flow-sage))] -z-10" />
            <img
              src={image}
              alt="Certified pre-owned vehicles at Nexora Motors"
              className="w-full rounded-2xl object-cover aspect-[5/4] shadow-lg"
            />
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl px-5 py-4 shadow-xl max-w-[200px]">
              <p className="font-display text-3xl font-semibold">4.9</p>
              <p className="text-xs font-sans-brand opacity-90">CPO customer satisfaction</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--flow-sage))] px-3 py-1 text-xs font-sans-brand font-bold uppercase tracking-wider text-[hsl(var(--flow-moss))] mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              Certified Pre-Owned
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[hsl(var(--primary))] mb-4">
              Warranty-Backed Confidence Without the Guesswork
            </h2>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">
              Rigorous inspections, clear pricing, and factory-backed coverage keep Central Texas drivers
              confident — from first browse to years of ownership.
            </p>
            <ul className="space-y-3 mb-8">
              {PROGRAM_ITEMS.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm font-sans-brand text-[hsl(var(--primary))]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 text-[hsl(var(--secondary))]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:opacity-90">
              <Link to="/certified-pre-owned">Explore CPO Inventory</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawnMaintenanceShowcase;
