import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";

const ContactInfoStrip = () => {
  const { company: COMPANY, siteTop: SITE_TOP, officeHours } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;
  const hoursLine = COMPANY.hours || officeHours[0]?.hours || "Mon–Fri 7AM–6PM";
  const serviceArea = SITE_TOP.locations || "Monmouth · Ocean County";

  return (
    <div className="border-b border-border bg-white/90 backdrop-blur-sm text-[hsl(var(--foreground))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-2.5 text-xs sm:text-[13px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
              {COMPANY.phone}
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[hsl(var(--secondary))] transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
              <span className="truncate max-w-[200px] sm:max-w-none">{COMPANY.email}</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
              {serviceArea}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground sm:shrink-0">
            <Clock className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
            {hoursLine}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStrip;
