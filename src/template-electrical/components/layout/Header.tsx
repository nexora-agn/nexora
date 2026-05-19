import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight, ChevronDown, Zap } from "lucide-react";
import { useTheme } from "@template-electrical/contexts/ThemeContext";
import { useSiteContent } from "@template-electrical/contexts/SiteContentContext";
import ContactInfoStrip from "@template-electrical/components/home/ContactInfoStrip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function navItemActive(pathname: string, path: string, navPaths: string[]) {
  if (path === "/") return pathname === "/";
  const candidates = navPaths.filter(p => pathname === p || pathname.startsWith(`${p}/`));
  if (!candidates.length) return false;
  const best = candidates.reduce((a, b) => (b.length > a.length ? b : a));
  return best === path;
}

const BoltLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <rect x="4" y="4" width="40" height="40" rx="4" fill="hsl(var(--secondary))" opacity="0.15" />
    <path
      d="M26 8 L14 26 L22 26 L20 40 L34 20 L25 20 Z"
      fill="hsl(var(--secondary))"
      stroke="hsl(var(--secondary))"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

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

  const ctaTo = "/contact";
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const showContactStrip = sectionVisibility["home.contactStrip"] !== false;

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) setMobileServicesOpen(false);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--primary))] text-white shadow-lg shadow-black/20">
      {/* Emergency top bar — electric blue accent */}
      <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-xs sm:text-[13px]">
          <span className="flex items-center gap-2 font-display font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5 fill-current" />
            {SITE_TOP.line || "24/7 Emergency Electrical Service"}
          </span>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-1.5 font-display font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Call Now:</span>
            {COMPANY.phone}
          </a>
        </div>
      </div>

      {showContactStrip && <ContactInfoStrip />}

      {/* Main nav */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 lg:py-5 flex items-center justify-between gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            {logoUrl ? (
              <img src={logoUrl} alt={COMPANY.name} className="h-10 sm:h-11 w-auto object-contain" />
            ) : (
              <>
                <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center">
                  <BoltLogo className="h-full w-full" />
                </span>
                <div className="leading-none">
                  <span className="block font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-[hsl(var(--secondary))] transition-colors">
                    {(COMPANY.name || "VOLTCURRENT").split(" ")[0]}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">
                    {(COMPANY.name || "VOLTCURRENT ELECTRIC").split(" ").slice(1).join(" ") || "Electric"}
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
                      "inline-flex items-center gap-1.5 px-4 py-2.5 text-sm xl:text-[15px] font-display font-bold uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm",
                      active
                        ? "text-[hsl(var(--secondary))] bg-white/5"
                        : "text-white/80 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {link.label}
                    {isServices && <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />}
                  </Link>
                  {isServices && services.length > 0 && (
                    <div
                      className={cn(
                        "absolute left-0 top-full z-50 min-w-[280px] max-h-[min(70vh,420px)] opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-150",
                        "pt-2 -mt-1",
                        "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                        "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto",
                      )}
                    >
                      <div className="max-h-[min(70vh,400px)] overflow-y-auto rounded-sm border border-white/10 bg-[hsl(var(--volt-dark-panel))] py-2 shadow-xl">
                        <Link
                          to="/services"
                          className="block px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-[hsl(var(--secondary))] border-b border-white/10 hover:bg-white/5"
                        >
                          All services →
                        </Link>
                        {services.map(s => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            className="block px-5 py-3 text-[15px] text-white/75 hover:bg-white/5 hover:text-[hsl(var(--secondary))]"
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
              className="h-12 px-6 text-sm xl:text-base bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wider rounded-sm shadow-md"
            >
              <Link to={ctaTo}>
                Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-sm hover:bg-white/10 text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[hsl(var(--volt-dark-panel))]">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <div key={link.path}>
                  {isServices && services.length > 0 ? (
                    <div className="flex items-stretch rounded-sm overflow-hidden">
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex-1 flex items-center px-3 py-2.5 text-sm font-display font-bold uppercase tracking-wider",
                          active
                            ? "bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))]"
                            : "text-white/85 hover:bg-white/5",
                        )}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(o => !o)}
                        className={cn(
                          "px-3 py-2.5 border-l border-white/10 hover:bg-white/5",
                          mobileServicesOpen ? "text-[hsl(var(--secondary))]" : "text-white/60",
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
                        "flex items-center justify-between gap-2 px-3 py-2.5 text-sm font-display font-bold uppercase tracking-wider rounded-sm",
                        active
                          ? "bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))]"
                          : "text-white/85 hover:bg-white/5",
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                  {isServices && services.length > 0 && mobileServicesOpen && (
                    <div className="mt-1 mb-2 ml-2 pl-3 border-l-2 border-[hsl(var(--secondary))]/40 space-y-0.5">
                      {services.map(s => {
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
                                : "text-white/65 hover:text-[hsl(var(--secondary))]",
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
            <div className="pt-3 border-t border-white/10 space-y-2">
              <a
                href={phoneHref}
                className="flex items-center gap-2 px-3 py-2 text-sm font-display font-bold text-[hsl(var(--secondary))]"
              >
                <Phone className="h-4 w-4" />
                {COMPANY.phone}
              </a>
              <Button
                asChild
                className="w-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-display font-bold uppercase rounded-sm"
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
