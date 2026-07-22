import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";

const SERVICE_WARNING_SIGNS = [
  "Check-engine light or unusual dashboard warnings",
  "Grinding brakes, vibration, or pulling while stopping",
  "Overheating, coolant smells, or sudden fluid leaks",
  "Battery issues, slow starts, or electrical glitches",
  "Uneven tire wear or steering that feels loose",
  "Strange noises from the engine, transmission, or undercarriage",
];

const TroubleshootingSection = () => {
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-y border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--secondary))]/10 px-3 py-1 text-xs font-display font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))]">
              <AlertTriangle className="h-3.5 w-3.5" />
              When to visit service
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] leading-tight">
              Warning signs you shouldn&apos;t ignore
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans-brand">
              Small issues become expensive fast. If you notice any of the symptoms below,
              schedule factory-trained service with {COMPANY.name}.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-sm font-display font-bold uppercase tracking-wider bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90"
              >
                <a href={phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Service
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-sm font-display font-bold uppercase tracking-wider border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--flow-surface))]"
              >
                <Link to="/contact">
                  Request service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_WARNING_SIGNS.map((sign, index) => (
                <li
                  key={sign}
                  className="flex gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--flow-surface))] p-4 sm:p-5"
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] font-display text-sm font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm sm:text-[15px] text-[hsl(var(--primary))]/90 leading-relaxed pt-1.5">
                    {sign}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              Smoke, fire risk, or a vehicle that feels unsafe to drive — pull over when you can,
              call for roadside help if needed, then contact our service team for follow-up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TroubleshootingSection;
