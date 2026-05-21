import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import LandscapingLogo from "./LandscapingLogo";
import { useTheme } from "@template-landscaping/contexts/ThemeContext";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CORE_SERVICE_IDS = [
  "landscaping-design",
  "lawn-maintenance",
  "tree-removal",
  "hardscaping",
  "emergency-tree-service",
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

  const brandFirst = (COMPANY.name || "VERDEFIELD").split(" ")[0];
  const brandRest = (COMPANY.name || "VERDEFIELD LANDSCAPING").split(" ").slice(1).join(" ");

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
        <div className="container-custom container-inset py-2 flex items-center justify-between text-xs font-sans-brand">
          <span className="hidden sm:inline text-white/85">{COMPANY.hours}</span>
          <a href={phoneHref} className="inline-flex items-center gap-2 font-bold text-[hsl(var(--secondary))] hover:underline">
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
        </div>
      </div>
      <div className="bg-white border-b border-border">
        <div className="container-custom container-inset py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={COMPANY.name} className="h-11 w-auto object-contain" />
            ) : (
              <>
                <span className="flex h-11 w-11">
                  <LandscapingLogo className="h-full w-full" />
                </span>
                <div className="leading-tight">
                  <span className="block font-display text-xl font-bold text-[hsl(var(--primary))]">{brandFirst}</span>
                  <span className="block text-[10px] font-sans-brand font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))]">
                    {brandRest || "Landscaping"}
                  </span>
                </div>
              </>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-sans-brand font-semibold transition-colors",
                      active
                        ? "bg-[hsl(var(--vf-sage))] text-[hsl(var(--primary))]"
                        : "text-muted-foreground hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]",
                    )}
                  >
                    {link.label}
                    {isServices && coreServices.length > 0 && (
                      <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />
                    )}
                  </Link>
                  {isServices && coreServices.length > 0 && (
                    <div
                      className={cn(
                        "absolute left-0 top-full z-50 min-w-[280px] opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-150",
                        "pt-2 -mt-1",
                        "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                        "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto",
                      )}
                    >
                      <div className="rounded-md border border-border bg-card py-2 shadow-lg">
                        <Link
                          to="/services"
                          className="block px-5 py-2.5 text-xs font-sans-brand font-semibold uppercase tracking-wider text-[hsl(var(--secondary))] border-b border-border hover:bg-[hsl(var(--muted))]"
                        >
                          All services →
                        </Link>
                        {coreServices.map(s => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            className="block px-5 py-3 text-sm text-muted-foreground hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))]"
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
            <Button asChild className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-[hsl(var(--secondary-foreground))] font-display font-bold uppercase tracking-wide text-xs h-10 px-5">
              <Link to="/contact">Free Estimate</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-[hsl(var(--primary))]"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <div key={link.path}>
                  {isServices && coreServices.length > 0 ? (
                    <div className="flex items-stretch rounded-md overflow-hidden">
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex-1 flex items-center px-3 py-2.5 text-sm font-sans-brand font-semibold",
                          active
                            ? "bg-[hsl(var(--vf-sage))] text-[hsl(var(--primary))]"
                            : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]",
                        )}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(o => !o)}
                        className={cn(
                          "px-3 py-2.5 border-l border-border hover:bg-[hsl(var(--muted))]",
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
                        "block py-2.5 px-3 rounded-md font-sans-brand font-semibold",
                        active
                          ? "bg-[hsl(var(--vf-sage))] text-[hsl(var(--primary))]"
                          : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]",
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                  {isServices && coreServices.length > 0 && mobileServicesOpen && (
                    <div className="mt-1 mb-2 ml-2 pl-3 border-l-2 border-[hsl(var(--secondary))]/50 space-y-0.5">
                      <Link
                        to="/services"
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 pr-3 text-[13px] font-semibold text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]"
                      >
                        All services →
                      </Link>
                      {coreServices.map(s => {
                        const childPath = `/services/${s.id}`;
                        const childActive = location.pathname === childPath;
                        return (
                          <Link
                            key={s.id}
                            to={childPath}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block py-2 pr-3 text-[13px] font-medium",
                              childActive
                                ? "text-[hsl(var(--secondary))]"
                                : "text-muted-foreground hover:text-[hsl(var(--primary))]",
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
            <Button asChild className="w-full mt-3 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-display font-bold">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Free Estimate
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
