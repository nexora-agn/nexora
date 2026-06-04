import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import PlumbingLogo from "./PlumbingLogo";
import { useTheme } from "@template-familyfirst/contexts/ThemeContext";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-familyfirst/data/siteData";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M21.35 11.1H12v3.2h5.35c-.23 1.4-1.7 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.06.78 3.76 1.45l2.57-2.47C16.46 3.95 14.43 3 12 3 6.99 3 3 6.99 3 12s3.99 9 9 9c5.2 0 8.65-3.65 8.65-8.79 0-.6-.07-1.05-.15-1.51z" />
  </svg>
);

const socialIcons = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: GoogleIcon, href: "#", label: "Google" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const { logoUrl } = useTheme();
  const { company: COMPANY, footerServiceLinks, footerCompanyLinks, siteTop: SITE_TOP } =
    useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-white text-[hsl(var(--foreground))]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[hsl(var(--flow-surface))] to-transparent"
      />
      <div className="h-1 bg-gradient-to-r from-transparent via-[hsl(var(--secondary))] to-transparent opacity-60" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={COMPANY.name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <>
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/15">
                    <PlumbingLogo className="h-7 w-7" />
                  </span>
                  <div className="leading-none">
                    <span className="block font-display text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {(COMPANY.name || "Family First Plumbing").split(" ")[0]}
                    </span>
                    <span className="block text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                      {(COMPANY.name || "Family First Plumbing").split(" ").slice(1).join(" ") || "Plumbing"}
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">{COMPANY.tagline}</p>
            <div className="flex items-center gap-2 mt-5">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-[hsl(var(--primary))] hover:border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10 hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {footerCompanyLinks.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {footerServiceLinks.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Service Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {SERVICE_AREAS.slice(0, 5).map(area => (
                <li key={area} className="text-[hsl(var(--primary))]">
                  {area}
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/service-areas"
                  className="text-[hsl(var(--secondary))] hover:underline inline-flex items-center gap-1 font-semibold font-display uppercase text-xs tracking-wider"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[hsl(var(--primary))]">
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 font-semibold hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={mailHref} className="flex items-center gap-2 hover:text-[hsl(var(--secondary))] transition-colors">
                  <Mail className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                  <span className="truncate">{COMPANY.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2 text-[hsl(var(--secondary))] font-display font-bold uppercase text-xs tracking-wider">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{SITE_TOP.line || "24/7 Emergency Service"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-[hsl(var(--flow-surface))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {year} {COMPANY.name}. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/terms"
              className="text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
