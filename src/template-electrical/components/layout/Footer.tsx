import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Zap, Facebook, Instagram, Youtube } from "lucide-react";
import { useTheme } from "@template-electrical/contexts/ThemeContext";
import { useSiteContent } from "@template-electrical/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-electrical/data/siteData";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M21.35 11.1H12v3.2h5.35c-.23 1.4-1.7 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.06.78 3.76 1.45l2.57-2.47C16.46 3.95 14.43 3 12 3 6.99 3 3 6.99 3 12s3.99 9 9 9c5.2 0 8.65-3.65 8.65-8.79 0-.6-.07-1.05-.15-1.51z" />
  </svg>
);

const BoltLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <path
      d="M26 8 L14 26 L22 26 L20 40 L34 20 L25 20 Z"
      fill="hsl(var(--secondary))"
      stroke="hsl(var(--secondary))"
      strokeWidth="1"
      strokeLinejoin="round"
    />
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
    <footer className="bg-[hsl(var(--volt-dark-panel))] text-white">
      {/* Accent strip */}
      <div className="h-1 bg-[hsl(var(--secondary))]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/15">
                    <BoltLogo className="h-7 w-7" />
                  </span>
                  <div className="leading-none">
                    <span className="block font-display text-lg font-bold uppercase tracking-wide group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {(COMPANY.name || "VOLTCURRENT").split(" ")[0]}
                    </span>
                    <span className="block text-[10px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                      {(COMPANY.name || "VOLTCURRENT ELECTRIC").split(" ").slice(1).join(" ") || "Electric"}
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mt-4">{COMPANY.tagline}</p>
            <div className="flex items-center gap-2 mt-5">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/15 hover:border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10 transition-colors"
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
            <ul className="space-y-2.5 text-sm text-white/65">
              {footerCompanyLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-[hsl(var(--secondary))] transition-colors">
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
            <ul className="space-y-2.5 text-sm text-white/65">
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
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-4">
              Service Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              {SERVICE_AREAS.slice(0, 5).map(area => (
                <li key={area}>{area}</li>
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
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a href={phoneHref} className="flex items-center gap-2 hover:text-[hsl(var(--secondary))] transition-colors">
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
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2 text-[hsl(var(--secondary))] font-display font-bold uppercase text-xs tracking-wider">
                <Zap className="h-4 w-4 shrink-0 fill-current" />
                <span>{SITE_TOP.line || "24/7 Emergency Service"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/45">
          <span>© {year} {COMPANY.name}. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-[hsl(var(--secondary))] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/terms" className="hover:text-[hsl(var(--secondary))] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
