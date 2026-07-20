import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import HarborStoneLogo from "./HarborStoneLogo";
import { useTheme } from "@template-mobile-store/contexts/ThemeContext";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CORE_SERVICE_IDS = [
  "custom-homes",
  "home-additions",
  "adu-detached-garages",
  "whole-home-remodeling",
  "kitchen-bath-remodeling",
] as const;

function navItemActive(pathname: string, path: string, navPaths: string[]) {
  if (path === "/") return pathname === "/";
  const candidates = navPaths.filter(p => pathname === p || pathname.startsWith(`${p}/`));
  if (!candidates.length) return false;
  const best = candidates.reduce((a, b) => (b.length > a.length ? b : a));
  return best === path;
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { logoUrl } = useTheme();
  const { navLinks: NAV_LINKS, company: COMPANY, services } = useSiteContent();
  const location = useLocation();
  const navPaths = NAV_LINKS.map(l => l.path);
  const coreServices = CORE_SERVICE_IDS.map(id => services.find(s => s.id === id)).filter(
    (s): s is (typeof services)[number] => Boolean(s),
  );
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) setMobileServicesOpen(false);
  }, [mobileOpen]);

  const brandFirst = (COMPANY.name || "HARBORSTONE").split(" ")[0];
  const brandRest = (COMPANY.name || "HARBORSTONE DESIGN-BUILD").split(" ").slice(1).join(" ");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="bg-[hsl(var(--hb-linen))] border-b border-border">
        <div className="container-custom container-inset py-2 flex items-center justify-between text-xs font-sans-brand text-muted-foreground">
          <span className="hidden md:inline">{COMPANY.hours}</span>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
          >
            <Phone className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
            {COMPANY.phone}
          </a>
        </div>
      </div>

      <div className="container-custom container-inset py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          {logoUrl ? (
            <img src={logoUrl} alt={COMPANY.name} className="h-12 w-auto object-contain" />
          ) : (
            <>
              <span className="flex h-12 w-12">
                <HarborStoneLogo className="h-full w-full" />
              </span>
              <div className="leading-none hidden sm:block">
                <span className="block font-display text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {brandFirst}
                </span>
                <span className="block text-[10px] font-sans-brand font-medium uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mt-1">
                  {brandRest || "Design-Build"}
                </span>
              </div>
            </>
          )}
        </Link>

        <nav className="hidden xl:flex items-center gap-0">
          {NAV_LINKS.filter(l => l.path !== "/").map(link => {
            const active = navItemActive(location.pathname, link.path, navPaths);
            const isServices = link.path.replace(/\/$/, "") === "/services";
            return (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={cn(
                    "inline-flex items-center gap-1 px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "text-[hsl(var(--primary))] hb-nav-active"
                      : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                  )}
                >
                  {link.label}
                  {isServices && coreServices.length > 0 && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" aria-hidden />
                  )}
                </Link>
                {isServices && coreServices.length > 0 && (
                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 min-w-[300px] opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-150",
                      "pt-0",
                      "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                      "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto",
                    )}
                  >
                    <div className="border border-border bg-white shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] py-2 mt-0">
                      <Link
                        to="/services"
                        className="block px-5 py-3 text-xs font-display font-semibold uppercase tracking-wider text-[hsl(var(--secondary))] border-b border-border hover:bg-[hsl(var(--hb-linen))]"
                      >
                        All services →
                      </Link>
                      {coreServices.map(s => (
                        <Link
                          key={s.id}
                          to={`/services/${s.id}`}
                          className="block px-5 py-3 text-sm font-sans-brand text-muted-foreground hover:bg-[hsl(var(--hb-linen))] hover:text-[hsl(var(--primary))]"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            className="rounded-none h-11 px-6 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary-foreground))] font-display text-xs font-semibold uppercase tracking-[0.16em]"
          >
            <Link to="/contact">Free Consultation</Link>
          </Button>
        </div>

        <button
          type="button"
          className="xl:hidden p-2 text-[hsl(var(--primary))]"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-border bg-white px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {NAV_LINKS.map(link => {
            const active = navItemActive(location.pathname, link.path, navPaths);
            const isServices = link.path.replace(/\/$/, "") === "/services";
            return (
              <div key={link.path}>
                {isServices && coreServices.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen(o => !o)}
                      className={cn(
                        "w-full flex items-center justify-between py-3 font-display text-sm font-semibold uppercase tracking-wide",
                        active ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--primary))]",
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4", mobileServicesOpen && "rotate-180")} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-3 border-l-2 border-[hsl(var(--secondary))] mb-2 space-y-1">
                        <Link to="/services" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-[hsl(var(--secondary))]">
                          All services →
                        </Link>
                        {coreServices.map(s => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-muted-foreground"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-3 font-display text-sm font-semibold uppercase tracking-wide",
                      active ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--primary))]",
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
          <Button asChild className="w-full mt-4 rounded-none bg-[hsl(var(--secondary))] font-display uppercase tracking-wider text-xs">
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              Free Consultation
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
