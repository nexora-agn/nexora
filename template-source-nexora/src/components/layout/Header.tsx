import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight, ChevronDown, Star, AlertCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Pick the nav path that best matches the URL (longest wins — e.g. `/services/storm-damage` over `/services`). */
function navItemActive(pathname: string, path: string, navPaths: string[]) {
  if (path === "/") return pathname === "/";
  const candidates = navPaths.filter(p => pathname === p || pathname.startsWith(`${p}/`));
  if (!candidates.length) return false;
  const best = candidates.reduce((a, b) => (b.length > a.length ? b : a));
  return best === path;
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logoUrl } = useTheme();
  const { navLinks: NAV_LINKS, company: COMPANY, siteTop: SITE_TOP, services } = useSiteContent();
  const location = useLocation();
  const navPaths = NAV_LINKS.map(l => l.path);

  const ctaTo = "/contact";
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <header className="bg-white shadow-sm">
      {/* Emergency announcement bar */}
      <div className="bg-[hsl(var(--primary))] text-white text-xs sm:text-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold">
              <AlertCircle className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
              {SITE_TOP.line || "24/7 Emergency Roofing Service"}
            </span>
            {(SITE_TOP as any).badges?.length > 0 && (
              <span className="hidden md:flex items-center gap-3 text-white/80">
                {((SITE_TOP as any).badges as string[]).map((b, i) => (
                  <span key={b} className="flex items-center gap-1.5">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-white/40" />}
                    <span>{b}</span>
                  </span>
                ))}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold">
              <span className="text-[hsl(var(--primary))]">G</span>
            </span>
            <span className="font-bold">{(SITE_TOP as any).ratingValue || "4.9"}</span>
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
              ))}
            </span>
            <span className="text-white/80 hidden sm:inline">
              ({(SITE_TOP as any).ratingCount || "250+"} {(SITE_TOP as any).ratingLabel || "Reviews"})
            </span>
          </div>
        </div>
      </div>

      {/* Main header strip */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={COMPANY.name} className="h-10 sm:h-12 w-auto object-contain" />
            ) : (
              <>
                <span className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center">
                  <svg viewBox="0 0 48 48" className="h-full w-full">
                    <path
                      d="M6 36 L24 12 L42 36 Z"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 36 L24 24 L32 36"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="leading-none">
                  <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-[hsl(var(--primary))]">
                    {(COMPANY.name || "RIDGEPEAK ROOFING").split(" ")[0] || "RIDGEPEAK"}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-slate-600">
                    {(COMPANY.name || "RIDGEPEAK ROOFING").split(" ").slice(1).join(" ") || "ROOFING"}
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Right side: phone + CTA */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a href={phoneHref} className="text-right leading-tight group">
              <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                Call Now — We Answer 24/7!
              </span>
              <span className="flex items-center justify-end gap-1.5 text-base lg:text-lg font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                <Phone className="h-4 w-4 text-[hsl(var(--secondary))]" />
                {COMPANY.phone}
              </span>
            </a>
            <Button asChild size="lg" className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase tracking-wide rounded-md shadow-sm">
              <Link to={ctaTo}>
                Get Free Estimate
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-slate-100"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Nav strip — overflow must stay visible so the Services mega-menu is not clipped */}
      <nav className="hidden md:block relative z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex flex-wrap items-stretch gap-1 lg:gap-2">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <li key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 lg:px-4 py-3.5 text-[12px] lg:text-[13px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative",
                      active
                        ? "text-[hsl(var(--primary))]"
                        : "text-slate-700 hover:text-[hsl(var(--primary))]",
                    )}
                  >
                    {link.label}
                    {isServices && <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />}
                    {active && (
                      <span className="absolute inset-x-2 lg:inset-x-3 -bottom-px h-0.5 bg-[hsl(var(--primary))]" />
                    )}
                  </Link>
                  {isServices && services.length > 0 && (
                    <div
                      className={cn(
                        "absolute left-0 top-full z-50 min-w-[260px] max-h-[min(70vh,420px)] opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-150",
                        "pt-2 -mt-1",
                        "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                        "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto",
                      )}
                    >
                      <div className="max-h-[min(70vh,400px)] overflow-y-auto rounded-md border border-slate-200 bg-white py-2 shadow-lg">
                        <Link
                          to="/services"
                          className="block px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--primary))] border-b border-slate-100 hover:bg-slate-50"
                        >
                          All services overview →
                        </Link>
                        {services.map(s => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[hsl(var(--primary))]"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path, navPaths);
              const isServices = link.path.replace(/\/$/, "") === "/services";
              return (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between gap-2 px-3 py-2.5 text-sm font-bold uppercase tracking-wider rounded-md",
                      active && !isServices
                        ? "bg-[hsl(var(--primary))] text-white"
                        : active && isServices
                          ? "bg-slate-100 text-[hsl(var(--primary))]"
                          : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    {link.label}
                    {isServices && (
                      <ChevronDown className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
                    )}
                  </Link>
                  {isServices && services.length > 0 && (
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
                              "block py-2 pr-3 text-[13px] font-semibold tracking-wide rounded-md",
                              childActive
                                ? "text-[hsl(var(--primary))] bg-slate-50"
                                : "text-slate-600 hover:text-[hsl(var(--primary))]",
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
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a href={phoneHref} className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[hsl(var(--primary))]">
                <Phone className="h-4 w-4 text-[hsl(var(--secondary))]" />
                {COMPANY.phone}
              </a>
              <Button asChild className="w-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-bold uppercase">
                <Link to={ctaTo} onClick={() => setMobileOpen(false)}>
                  Get Free Estimate
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
