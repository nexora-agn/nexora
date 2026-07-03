import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { PACKAGES } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const PackagesGrid = () => {
  return (
    <section className="luxury-section bg-[hsl(var(--primary))] text-white">
      <div className="container-custom container-inset">
        <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
          <p className="luxury-eyebrow mb-4">Curated Experiences</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase text-white">Featured Grooming Packages</h2>
          <p className="mt-5 text-white/60">Multi-service rituals built for the gentleman who wants it all done right, in one visit.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} direction="up" delay={(i % 3) * 100}>
              <div
                className={cn(
                  "relative flex flex-col h-full border p-7",
                  pkg.popular ? "border-[hsl(var(--secondary))] bg-white/[0.04]" : "border-white/15",
                )}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-7 bg-[hsl(var(--secondary))] text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl uppercase text-white">{pkg.title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{pkg.description}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-[hsl(var(--secondary))]">{pkg.priceLabel}</span>
                  <span className="text-xs text-white/40">/ {pkg.duration}</span>
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className="mt-7 inline-flex items-center justify-center h-12 border border-white/30 text-xs font-bold uppercase tracking-[0.16em] hover:bg-white hover:text-[hsl(var(--primary))] transition-all"
                >
                  Book This Package
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesGrid;
