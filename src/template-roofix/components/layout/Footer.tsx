import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

/**
 * Roofix (sleek premium metallic) — dark gradient footer with a CTA strip
 * across the top, gradient accent rules, and tight monospace-style nav
 * columns. Intentionally not a 5-column light-bordered layout.
 */
const Footer = () => {
  const { logoUrl } = useTheme();
  const {
    company: COMPANY,
    footerServiceLinks: FOOTER_SERVICE_LINKS,
    footerCompanyLinks: FOOTER_COMPANY_LINKS,
    serviceAreas,
  } = useSiteContent();

  const SERVICE_AREAS =
    serviceAreas && serviceAreas.length
      ? serviceAreas
      : ["Houston, TX", "Austin, TX", "Dallas, TX"];

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative tpl-metallic text-white overflow-hidden">
      {/* CTA strip */}
      <div className="relative border-b border-white/10">
        <div className="container-custom px-4 md:px-8 py-10 md:py-14 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <p className="text-[11px] tracking-[0.32em] uppercase font-bold text-secondary inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Schedule today
            </p>
            <h3
              className="mt-3 text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: "var(--tpl-font-display)" }}
            >
              Ready to{" "}
              <span className="tpl-gradient-text">protect your roof</span>?
            </h3>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-secondary px-6 py-4 text-sm font-bold tracking-[0.18em] uppercase text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-[0_18px_40px_-16px_hsl(217_91%_60%/0.55)]"
            >
              Get free estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="tpl-rule-gradient absolute bottom-0 left-0 right-0" />
      </div>

      <div className="container-custom relative px-4 md:px-8 py-16 grid md:grid-cols-12 gap-10">
        {/* Brand column */}
        <div className="md:col-span-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={COMPANY.name}
              className="h-10 mb-5 brightness-0 invert object-contain max-w-[200px]"
            />
          ) : (
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-secondary/15 text-secondary border border-secondary/30">
                <svg viewBox="0 0 64 64" className="h-6 w-6" fill="currentColor">
                  <path d="M6 36 L32 14 L58 36 L52 36 L52 52 L40 52 L40 40 L24 40 L24 52 L12 52 L12 36 Z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  {(COMPANY.name || "Roofix").toUpperCase()}
                </p>
                <p className="text-[10px] font-bold tracking-[0.32em] uppercase text-white/55">
                  Premium roofing
                </p>
              </div>
            </div>
          )}
          <p className="text-sm text-white/65 leading-relaxed max-w-sm">
            {COMPANY.tagline}
          </p>
          <div className="mt-6 flex gap-2">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="h-9 w-9 flex items-center justify-center rounded-[var(--radius)] tpl-glass text-white/80 hover:text-secondary hover:border-secondary/40 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Tight 3-column nav */}
        <div className="md:col-span-5 grid grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.32em] uppercase text-secondary mb-5">
              · Services
            </p>
            <ul className="space-y-3 text-sm">
              {FOOTER_SERVICE_LINKS.slice(0, 6).map(item => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="text-white/75 hover:text-white inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-secondary/50 transition-all group-hover:w-5 group-hover:bg-secondary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.32em] uppercase text-secondary mb-5">
              · Company
            </p>
            <ul className="space-y-3 text-sm">
              {FOOTER_COMPANY_LINKS.slice(0, 6).map(item => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="text-white/75 hover:text-white inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-secondary/50 transition-all group-hover:w-5 group-hover:bg-secondary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact card */}
        <div className="md:col-span-3">
          <p className="text-[10px] font-bold tracking-[0.32em] uppercase text-secondary mb-5">
            · Contact
          </p>
          <div className="tpl-glass rounded-[var(--radius)] p-5 space-y-4 text-sm">
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-3 text-white/85 hover:text-secondary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <span className="font-bold">{COMPANY.phone}</span>
              </a>
            )}
            {COMPANY.email && (
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 text-white/85 hover:text-secondary transition-colors break-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                {COMPANY.email}
              </a>
            )}
            {COMPANY.address && (
              <p className="flex items-start gap-3 text-white/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                {COMPANY.address}
              </p>
            )}
            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/55 mb-2">
                Service areas
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                {SERVICE_AREAS.slice(0, 6).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center text-[11px] tracking-[0.22em] uppercase text-white/55 font-semibold gap-3">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name} — all rights reserved
          </p>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-[var(--radius)] tpl-glass text-white hover:text-secondary hover:border-secondary/50 flex items-center justify-center transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
