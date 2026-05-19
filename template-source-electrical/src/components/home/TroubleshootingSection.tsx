import { Link } from "react-router-dom";
import { Check, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { ELECTRICAL_IMAGES } from "@/data/siteData";

const TROUBLESHOOT_IMAGE = ELECTRICAL_IMAGES.troubleshootSection;

const DEFAULT_CHECKLIST = [
  "Frequent breaker trips or blown fuses",
  "Flickering lights or buzzing outlets",
  "Burning smell from panels or switches",
  "Outlets that feel warm to the touch",
  "GFCI outlets that won't reset",
  "Power loss in part of the home",
];

const TroubleshootingSection = () => {
  const { faqItems, company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  const checklist =
    faqItems?.slice(0, 6).map(f => f.question.replace(/\?$/, "")) ?? DEFAULT_CHECKLIST;

  return (
    <section className="bg-[hsl(var(--primary))] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        <div className="relative min-h-[280px] lg:min-h-full order-2 lg:order-1">
          <img
            src={TROUBLESHOOT_IMAGE}
            alt="Electrician inspecting a residential electrical panel"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/30 to-[hsl(var(--primary))]/90 lg:bg-gradient-to-r from-transparent to-[hsl(var(--primary))]"
          />
        </div>

        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-16 order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display mb-4">
            <AlertTriangle className="h-4 w-4" />
            Troubleshooting Guide
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase leading-tight">
            Signs You Need
            <span className="block text-[hsl(var(--secondary))]">An Electrician Now</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-lg leading-relaxed">
            Electrical issues rarely fix themselves. If you notice any of these warning signs, shut off
            the affected circuit and call a licensed professional.
          </p>

          <ul className="mt-8 space-y-3">
            {checklist.map(item => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-[15px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/15 border border-[hsl(var(--secondary))]/35 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" strokeWidth={2.5} />
                </span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wider rounded-sm"
            >
              <a href={phoneHref}>Call Emergency Line</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 font-display font-bold uppercase tracking-wider rounded-sm"
            >
              <Link to="/contact">
                Schedule Inspection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TroubleshootingSection;
