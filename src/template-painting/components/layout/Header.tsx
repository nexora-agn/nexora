import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react";
import PaintingLogo from "./PaintingLogo";
import { useTheme } from "@template-painting/contexts/ThemeContext";
import { useSiteContent } from "@template-painting/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CORE_SERVICE_IDS = [
  "interior-painting",
  "exterior-painting",
  "cabinet-painting",
  "commercial-painting",
  "color-consultation",
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
  const {
    navLinks: NAV_LINKS,
    company: COMPANY,
    siteTop: SITE_TOP,
    services,
    sectionVisibility,
  } = useSiteContent();
  const location = useLocation();
  const navPaths = NAV_LINKS.map(l => l.path);
  const coreServices = CORE_SERVICE_IDS.map(id => services.find(s => s.id === id)).filter(
    (s): s is (typeof services)[number] => Boolean(s),
  );

  const ctaTo = "/contact";
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) setMobileServicesOpen(false);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--background))]/95 backdrop-blur-md border-b border-border text-foreground shadow-sm">
      <div className="container-custom container-inset py-4 lg:py-5 flex items-center justify-between gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            {logoUrl ? (
              <img src={logoUrl} alt={COMPANY.name} className="h-10 sm:h-11 w-auto object-contain" />
            ) : (
              <>
                <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center">
                  <PaintingLogo className="h-full w-full" />
                </span>
                <div className="leading-none">
                  <span className="block font-display text-xl sm:text-2xl text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors leading-none">
                    {(COMPANY.name || "BRUSHHOUSE PAINTING").split(" ")[0]}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-sans-brand font-semibold tracking-[0.22em] text-muted-foreground uppercase mt-0.5">
                    {(COMPANY.name || "BRUSHHOUSE PAINTING").split(" ").slice(1).join(" ") || "Painting"}
                  </span>
                </div>
              </>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans-brand font-semibold tracking-wide whitespace-nowrap transition-colors rounded-sm",
                      active
                        ? "text-[hsl(var(--secondary))] bg-[hsl(var(--flow-warm))]"
                        : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--flow-warm))]",
                    )}
                  >
                    {link.label}
                    {isServices && <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />}
                  </Link>
                  {isServices && coreServices.length > 0 && (
                    <div
                      className={cn(
                        "absolute left-0 top-full z-50 min-w-[280px] max-h-[min(70vh,420px)] opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-150",
                        "pt-2 -mt-1",
                        "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                        "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto",
                      )}
                    >
                      <div className="max-h-[min(70vh,400px)] overflow-y-auto rounded-sm border border-border bg-card py-2 paint-shadow-card">
                        <Link
                          to="/services"
                          className="block px-5 py-2.5 text-xs font-sans-brand font-semibold uppercase tracking-wider text-[hsl(var(--secondary))] border-b border-border hover:bg-muted"
                        >
                          All services →
                        </Link>
                        {coreServices.map(s => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            className="block px-5 py-3 text-[15px] text-muted-foreground hover:bg-muted hover:text-foreground"
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
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 px-6 text-sm bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 font-sans-brand font-semibold tracking-wide rounded-sm"
            >
              <Link to={ctaTo}>
                Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-sm hover:bg-muted text-foreground"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="container-custom container-inset py-4 space-y-1">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <div key={link.path}>
                  {isServices && coreServices.length > 0 ? (
                    <div className="flex items-stretch rounded-sm overflow-hidden">
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex-1 flex items-center px-3 py-2.5 text-sm font-sans-brand font-semibold",
                          active
                            ? "bg-[hsl(var(--flow-warm))] text-[hsl(var(--secondary))]"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(o => !o)}
                        className={cn(
                          "px-3 py-2.5 border-l border-border hover:bg-muted",
                          mobileServicesOpen ? "text-[hsl(var(--secondary))]" : "text-muted-foreground",
                        )}
                        aria-expanded={mobileServicesOpen}
                        aria-label={mobileServicesOpen ? "Collapse services" : "Expand services"}
                      >
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between gap-2 px-3 py-2.5 text-sm font-sans-brand font-semibold rounded-sm",
                        active
                          ? "bg-[hsl(var(--flow-warm))] text-[hsl(var(--secondary))]"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                  {isServices && coreServices.length > 0 && mobileServicesOpen && (
                    <div className="mt-1 mb-2 ml-2 pl-3 border-l-2 border-[hsl(var(--secondary))]/40 space-y-0.5">
                      {coreServices.map(s => {
                        const childPath = `/services/${s.id}`;
                        const childActive = location.pathname === childPath;
                        return (
                          <Link
                            key={s.id}
                            to={childPath}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block py-2 pr-3 text-[13px] font-medium tracking-wide rounded-sm",
                              childActive
                                ? "text-[hsl(var(--secondary))]"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {s.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-3 border-t border-border space-y-2">
              <a
                href={phoneHref}
                className="flex items-center gap-2 px-3 py-2 text-sm font-sans-brand font-semibold text-[hsl(var(--primary))]"
              >
                <Phone className="h-4 w-4" />
                {COMPANY.phone}
              </a>
              <Button
                asChild
                className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-sans-brand font-semibold rounded-sm"
              >
                <Link to={ctaTo} onClick={() => setMobileOpen(false)}>
                  Free Estimate
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
