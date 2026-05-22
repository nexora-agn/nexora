import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import CrestlineLogo from "./CrestlineLogo";
import { useTheme } from "@template-remodeler/contexts/ThemeContext";
import { useSiteContent } from "@template-remodeler/contexts/SiteContentContext";
import { FOOTER_QUICK_LINKS, SERVICE_AREAS } from "@template-remodeler/data/siteData";

const Footer = () => {
  const { logoUrl } = useTheme();
  const { company: COMPANY, footerServiceLinks, footerCompanyLinks } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;
  const year = new Date().getFullYear();
  const brandFirst = (COMPANY.name || "Crestline").split(" ")[0];

  return (
    <footer className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <div className="container-custom container-inset py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto brightness-0 invert" />
              ) : (
                <>
                  <CrestlineLogo className="h-10 w-10 [&_svg]:text-[hsl(var(--secondary))]" />
                  <span className="font-display text-xl font-bold uppercase tracking-wide">{brandFirst}</span>
                </>
              )}
            </Link>
            <p className="mt-4 text-sm text-[hsl(var(--primary-foreground)/0.75)] font-sans-brand leading-relaxed max-w-sm">
              {COMPANY.tagline}
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Facebook" className="h-9 w-9 border border-[hsl(var(--primary-foreground)/0.2)] flex items-center justify-center hover:border-[hsl(var(--secondary))]">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="h-9 w-9 border border-[hsl(var(--primary-foreground)/0.2)] flex items-center justify-center hover:border-[hsl(var(--secondary))]">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Menu
            </h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--primary-foreground)/0.7)]">
              {footerCompanyLinks.slice(0, 6).map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-[hsl(var(--secondary))] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--primary-foreground)/0.7)]">
              {footerServiceLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-[hsl(var(--secondary))] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--primary-foreground)/0.7)] mb-6">
              {FOOTER_QUICK_LINKS.map(l => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="hover:text-[hsl(var(--secondary))] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={phoneHref} className="flex items-center gap-2 hover:text-[hsl(var(--secondary))]">
                  <Phone className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[hsl(var(--primary-foreground)/0.75)]">
                <MapPin className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                {COMPANY.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--primary-foreground)/0.12)]">
        <div className="container-custom container-inset py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[hsl(var(--primary-foreground)/0.5)]">
          <span>© {year} {COMPANY.legalName || COMPANY.name}. All rights reserved.</span>
          <span className="font-sans-brand">{COMPANY.license}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
