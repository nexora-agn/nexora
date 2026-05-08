import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, AlertCircle, Facebook, Instagram, Youtube } from "lucide-react";
import { useTheme } from "@template-nexora/contexts/ThemeContext";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-nexora/data/siteData";

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
  const { company: COMPANY, footerServiceLinks, footerCompanyLinks } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--primary))] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <span className="relative flex h-10 w-10 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
                      <path d="M6 36 L24 12 L42 36 Z" fill="none" stroke="white" strokeWidth="3.5" strokeLinejoin="round" />
                      <path d="M16 36 L24 24 L32 36" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="leading-none">
                    <span className="block text-lg font-extrabold tracking-tight">
                      {(COMPANY.name || "NEXORA").split(" ")[0] || "NEXORA"}
                    </span>
                    <span className="block text-[10px] font-semibold tracking-[0.18em] text-white/70">
                      {(COMPANY.name || "NEXORA ROOFING").split(" ").slice(1).join(" ") || "ROOFING"}
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mt-4">{COMPANY.tagline}</p>
            <div className="flex items-center gap-2 mt-5">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {footerCompanyLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {footerServiceLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 mb-4">Service Areas</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {SERVICE_AREAS.map(area => (
                <li key={area}>{area}</li>
              ))}
              <li className="pt-1">
                <Link
                  to="/service-areas"
                  className="text-[hsl(var(--secondary))] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  View All Areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={phoneHref} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={mailHref} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                  <span className="truncate">{COMPANY.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2 text-[hsl(var(--secondary))] font-bold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <span>© {year} {COMPANY.name}. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span className="text-white/30">|</span>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
