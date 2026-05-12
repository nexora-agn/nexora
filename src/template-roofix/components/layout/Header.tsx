import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function navItemActive(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  if (path === "/blog") return pathname.startsWith("/blog");
  if (path === "/services") return pathname.startsWith("/services");
  if (path === "/projects") return pathname.startsWith("/projects");
  return pathname === path;
}

const RoofLogoMark = () => (
  <span
    className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/15 text-secondary"
    aria-hidden
  >
    <svg viewBox="0 0 64 64" fill="none" className="h-6 w-6">
      <path
        d="M6 36 L32 14 L58 36 L52 36 L52 52 L40 52 L40 40 L24 40 L24 52 L12 52 L12 36 Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logoUrl } = useTheme();
  const {
    services,
    navLinks: NAV_LINKS,
    company: COMPANY,
  } = useSiteContent();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary text-white border-b border-white/10">
      <div className="container-custom flex items-center justify-between min-h-[72px] md:min-h-[80px] py-3 px-4 md:px-8 gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 min-w-0"
          aria-label={COMPANY.name}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={COMPANY.name}
              className="h-10 md:h-12 max-w-[220px] object-contain"
            />
          ) : (
            <div className="flex items-center gap-2.5">
              <RoofLogoMark />
              <div className="flex flex-col leading-tight">
                <span className="text-[19px] md:text-2xl font-black text-white tracking-tight">
                  {(COMPANY.name || "Roofix").toUpperCase()}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                  Quality Roofs
                </span>
              </div>
            </div>
          )}
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-1 gap-1">
          {NAV_LINKS.map(link => {
            const active = navItemActive(location.pathname, link.path);
            if (link.path === "/services") {
              return (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={cn(
                      "px-3.5 py-2 text-[13px] font-bold tracking-wider uppercase whitespace-nowrap inline-flex items-center gap-1 transition-colors",
                      active ? "text-secondary" : "text-white/85 hover:text-secondary",
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <div className="pointer-events-none absolute left-0 top-full opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-40">
                    <div className="min-w-[280px] rounded-lg border border-white/10 bg-primary shadow-xl p-2 mt-1">
                      {services.map(service => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="block rounded-md px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-secondary/15 hover:text-secondary transition-colors"
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
                  "px-3.5 py-2 text-[13px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors",
                  active ? "text-secondary" : "text-white/85 hover:text-secondary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <Button
            asChild
            className="rounded-md h-11 px-5 text-[13px] font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
          >
            <Link to="/contact" className="inline-flex items-center gap-2">
              GET A FREE QUOTE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-white/10 bg-primary px-4 pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {NAV_LINKS.map(link => {
            if (link.path === "/services") {
              return (
                <div key={link.path} className="border-b border-white/10">
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-3 py-3.5 text-base font-bold tracking-wide uppercase",
                      navItemActive(location.pathname, link.path)
                        ? "text-secondary"
                        : "text-white",
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
                        className="block rounded-md px-2 py-2 text-sm text-white/70 hover:text-secondary hover:bg-white/5 transition-colors"
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
                  "block px-3 py-3.5 text-base font-bold tracking-wide uppercase border-b border-white/10 last:border-0",
                  navItemActive(location.pathname, link.path)
                    ? "text-secondary"
                    : "text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            asChild
            className="w-full mt-4 h-12 text-base font-extrabold tracking-wider rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              GET A FREE QUOTE
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
