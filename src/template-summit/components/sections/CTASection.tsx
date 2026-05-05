import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

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
  title = "Ready to start your project?",
  subtitle = "Tell us about your timeline and goals, and we’ll respond with clear next steps.",
  primaryLabel = "REQUEST ESTIMATE",
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
        tone === "muted" ? "section-padding bg-muted/60 border-t border-border" : "section-padding bg-background border-t border-border"
      }
    >
      <div className="container-custom px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-sm px-8 font-bold tracking-wide bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link to={primaryTo}>{primaryLabel}</Link>
          </Button>
          {secondaryIsTel ? (
            <Button asChild size="lg" variant="outline" className="rounded-sm px-8 font-bold border-primary text-primary hover:bg-muted">
              <a href={resolvedSecondary}>{secondaryLabel}</a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="outline" className="rounded-sm px-8 font-bold border-primary text-primary hover:bg-muted">
              <Link to={resolvedSecondary}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
