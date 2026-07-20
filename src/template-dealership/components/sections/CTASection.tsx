import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryTo?: string;
  /** Defaults to tel: company phone. Use a path like `/projects` for a second link. */
  secondaryTo?: string;
  tone?: "muted" | "plain";
}

const CTASection = ({
  title = "Ready to build your dream home?",
  subtitle = "Tell us about your lot, timeline, and vision — we'll respond with clear design-build next steps.",
  primaryLabel = "REQUEST CONSULTATION",
  secondaryLabel = "BOOK A CALL",
  primaryTo = "/contact",
  secondaryTo,
  tone = "plain",
}: CTASectionProps) => {
  const { company: COMPANY } = useSiteContent();
  const resolvedSecondary = secondaryTo ?? `tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`;
  const secondaryIsTel = resolvedSecondary.startsWith("tel:");

  return (
    <section
      className={
        tone === "muted"
          ? "hb-section-pad section-padding bg-[hsl(var(--hb-linen))] border-t border-border"
          : "hb-section-pad section-padding bg-white border-t-2 border-[hsl(var(--secondary))]"
      }
    >
      <div className="container-custom px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-none px-8 font-display font-semibold uppercase tracking-widest text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link to={primaryTo}>{primaryLabel}</Link>
          </Button>
          {secondaryIsTel ? (
            <Button asChild size="lg" variant="outline" className="rounded-none px-8 font-display font-semibold uppercase tracking-widest text-xs border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href={resolvedSecondary}>{secondaryLabel}</a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="outline" className="rounded-none px-8 font-display font-semibold uppercase tracking-widest text-xs border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to={resolvedSecondary}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
