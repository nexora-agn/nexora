import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Star,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@template-summit/contexts/ThemeContext";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function navItemActive(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  if (path === "/blog") return pathname.startsWith("/blog");
  if (path === "/services") return pathname.startsWith("/services");
  if (path === "/projects") return pathname.startsWith("/projects");
  return pathname === path;
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logoUrl } = useTheme();
  const {
    services,
    navLinks: NAV_LINKS,
    company: COMPANY,
    siteTop: SITE_TOP,
  } = useSiteContent();
  const location = useLocation();

  // SITE_TOP fields are merged with old defaults for backward compat.
  const tagline = (SITE_TOP as { tagline?: string }).tagline || SITE_TOP.line;
  const badges = (SITE_TOP as { badges?: string }).badges || SITE_TOP.locations;
  const ratingValue = (SITE_TOP as { ratingValue?: string }).ratingValue || "4.9";
  const ratingCount =
    (SITE_TOP as { ratingCount?: string }).ratingCount || "260+ Reviews";

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const logoLetter = (COMPANY.name || "S").charAt(0).toUpperCase();

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs hidden md:block border-b border-white/5">
        <div className="container-custom flex items-center justify-between py-2 px-4 md:px-8 gap-6">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span className="font-semibold tracking-wide truncate">
              {tagline}
            </span>
          </div>
          <div className="hidden lg:block flex-1 text-center text-[11px] tracking-wide opacity-90 truncate">
            {badges}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 font-bold text-secondary">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-primary">
                G
              </span>
              <span className="text-white text-[11px] font-bold">
                {ratingValue}
              </span>
            </span>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-secondary text-secondary"
                  aria-hidden
                />
              ))}
            </span>
            <span className="text-[11px] opacity-90 ml-1">({ratingCount})</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container-custom flex items-center justify-between min-h-[72px] md:min-h-[88px] py-3 md:py-2 px-4 md:px-8 gap-6">
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 min-w-0"
            aria-label={COMPANY.name}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={COMPANY.name}
                className="h-11 md:h-[52px] max-w-[260px] object-contain"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Mountain mark */}
                <span className="relative flex h-11 w-11 md:h-[52px] md:w-[52px] items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-secondary shadow-sm">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden
                    className="h-6 w-6 md:h-7 md:w-7"
                  >
                    <path
                      d="M4 52 L20 28 L30 40 L40 22 L60 52 Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded bg-secondary text-[9px] font-black text-primary">
                    {logoLetter}
                  </span>
                </span>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[17px] md:text-xl font-black text-primary tracking-tight">
                    {(COMPANY.name || "Summit").split(" ")[0].toUpperCase()}
                  </span>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                    {(COMPANY.name || "")
                      .split(" ")
                      .slice(1)
                      .join(" ")
                      .toUpperCase() || "CONSTRUCTION"}
                  </span>
                </div>
              </div>
            )}
          </Link>

          {/* Center - phone + CTA */}
          <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 gap-8">
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <span className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Call Now — We Answer 24/7
                  </span>
                  <span className="block text-lg font-extrabold">
                    {COMPANY.phone}
                  </span>
                </div>
              </a>
            )}
          </div>

          <div className="hidden lg:flex items-center shrink-0">
            <Button
              asChild
              className="rounded-md h-12 px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
            >
              <Link to="/contact" className="inline-flex items-center gap-2">
                GET A FREE ESTIMATE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Lower nav strip */}
        <nav className="hidden lg:block border-t border-border bg-card">
          <div className="container-custom flex items-center justify-center px-4 md:px-8">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path);
              if (link.path === "/services") {
                return (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className={cn(
                        "px-5 py-4 text-[13px] font-bold tracking-wider uppercase transition-colors whitespace-nowrap inline-flex items-center gap-1.5 border-b-2",
                        active
                          ? "text-primary border-secondary"
                          : "text-foreground/85 border-transparent hover:text-secondary hover:border-secondary/40",
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Link>
                    <div className="pointer-events-none absolute left-0 top-full opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-40">
                      <div className="min-w-[280px] rounded-lg border border-border bg-card shadow-xl p-2 mt-1">
                        {services.map(service => (
                          <Link
                            key={service.id}
                            to={`/services/${service.id}`}
                            className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-secondary/10 hover:text-secondary transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-5 py-4 text-[13px] font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2",
                    active
                      ? "text-primary border-secondary"
                      : "text-foreground/85 border-transparent hover:text-secondary hover:border-secondary/40",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {mobileOpen && (
          <nav className="lg:hidden border-t bg-card px-4 pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {NAV_LINKS.map(link => {
              if (link.path === "/services") {
                return (
                  <div key={link.path} className="border-b border-border">
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-3 py-3.5 text-base font-bold tracking-wide uppercase",
                        navItemActive(location.pathname, link.path)
                          ? "text-secondary"
                          : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                    <div className="px-3 pb-3 space-y-1">
                      {services.map(service => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-secondary hover:bg-muted/60 transition-colors"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-3.5 text-base font-bold tracking-wide uppercase border-b border-border last:border-0",
                    navItemActive(location.pathname, link.path)
                      ? "text-secondary"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 px-3 py-3.5 text-base font-extrabold border-b border-border"
              >
                <Phone className="h-5 w-5 text-secondary" />
                {COMPANY.phone}
              </a>
            )}
            <Button
              asChild
              className="w-full mt-4 h-12 text-base font-extrabold tracking-wider rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                GET A FREE ESTIMATE
              </Link>
            </Button>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
