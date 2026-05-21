import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const ContactInfoStrip = () => {
  const { siteTop: SITE_TOP, company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-b border-[hsl(var(--secondary)/0.25)]">
      <div className="container-custom container-inset py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans-brand">
        <p className="tracking-[0.12em] uppercase font-medium text-[hsl(var(--secondary))] text-center sm:text-left">
          {SITE_TOP.line}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[hsl(var(--primary-foreground)/0.85)]">
          <a href={phoneHref} className="inline-flex items-center gap-1.5 hover:text-[hsl(var(--secondary))] transition-colors">
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
          <span className="hidden sm:inline text-[hsl(var(--primary-foreground)/0.35)]">|</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {SITE_TOP.locations}
          </span>
          <Link
            to="/contact"
            className="hidden md:inline-flex font-semibold text-[hsl(var(--secondary))] hover:underline underline-offset-4"
          >
            Free Estimate →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStrip;
