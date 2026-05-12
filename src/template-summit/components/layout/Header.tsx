import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { useTheme } from "@template-summit/contexts/ThemeContext";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

function navItemActive(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  if (path === "/blog") return pathname.startsWith("/blog");
  if (path === "/services") return pathname.startsWith("/services");
  if (path === "/projects") return pathname.startsWith("/projects");
  return pathname === path;
}

/**
 * Summit (editorial luxury) — centered serif wordmark with a thin
 * uppercase split nav left/right, slim utility strip above. No buttons in
 * the header bar (CTA lives in the page body). Very different grammar from
 * Constructo / Nexora / Roofix.
 */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logoUrl } = useTheme();
  const {
    navLinks: NAV_LINKS,
    company: COMPANY,
    siteTop: SITE_TOP,
  } = useSiteContent();
  const location = useLocation();

  const tagline = (SITE_TOP as { tagline?: string }).tagline || SITE_TOP.line;
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  // Split nav around centered wordmark
  const mid = Math.ceil(NAV_LINKS.length / 2);
  const leftLinks = NAV_LINKS.slice(0, mid);
  const rightLinks = NAV_LINKS.slice(mid);

  return (
    <header className="bg-background text-foreground sticky top-0 z-50">
      {/* Slim utility strip */}
      <div className="hidden md:block border-b border-foreground/10">
        <div className="container-custom flex items-center justify-between py-2.5 px-4 md:px-10 text-[11px] tracking-[0.18em] uppercase">
          <span className="text-foreground/70 italic font-normal" style={{ fontFamily: "var(--tpl-font-display)" }}>
            {tagline}
          </span>
          <div className="flex items-center gap-6 text-foreground/70 font-medium">
            {COMPANY.address && (
              <span className="hidden lg:inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {COMPANY.address.split(",")[0]}
              </span>
            )}
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors"
              >
                <Phone className="h-3 w-3" />
                {COMPANY.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main bar with centered wordmark */}
      <div className="border-b border-foreground/10 bg-background/95 backdrop-blur">
        <div className="container-custom relative grid grid-cols-3 items-center px-4 md:px-10 py-5 md:py-7">
          {/* Left nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.24em] uppercase font-semibold">
            {leftLinks.map(link => {
              const active = navItemActive(location.pathname, link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "tpl-link-underline transition-colors",
                    active ? "text-secondary" : "text-foreground/85 hover:text-secondary",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Centered serif wordmark */}
          <div className="flex justify-start lg:justify-center">
            <Link
              to="/"
              aria-label={COMPANY.name}
              className="inline-flex flex-col items-start lg:items-center leading-none"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={COMPANY.name}
                  className="h-10 md:h-12 object-contain max-w-[260px]"
                />
              ) : (
                <>
                  <span
                    className="text-2xl md:text-4xl font-medium tracking-[-0.01em] text-foreground"
                    style={{ fontFamily: "var(--tpl-font-display)" }}
                  >
                    {COMPANY.name || "Summit"}
                  </span>
                  <span className="mt-1 text-[10px] tracking-[0.42em] uppercase text-foreground/60 font-semibold">
                    Est. {new Date().getFullYear() - 20}
                  </span>
                </>
              )}
            </Link>
          </div>

          {/* Right nav (desktop) */}
          <nav className="hidden lg:flex items-center justify-end gap-8 text-[11px] tracking-[0.24em] uppercase font-semibold">
            {rightLinks.map(link => {
              const active = navItemActive(location.pathname, link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "tpl-link-underline transition-colors",
                    active ? "text-secondary" : "text-foreground/85 hover:text-secondary",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden justify-self-end p-2 -mr-2 text-foreground"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-b border-foreground/10 bg-background">
          <div className="container-custom px-4 py-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-3.5 text-base tracking-[0.22em] uppercase font-semibold border-b border-foreground/10 last:border-0",
                  navItemActive(location.pathname, link.path)
                    ? "text-secondary"
                    : "text-foreground",
                )}
                style={{ fontFamily: "var(--tpl-font-body)" }}
              >
                {link.label}
              </Link>
            ))}
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="mt-4 flex items-center gap-2 text-sm font-semibold tracking-wide"
              >
                <Phone className="h-4 w-4 text-secondary" />
                {COMPANY.phone}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
