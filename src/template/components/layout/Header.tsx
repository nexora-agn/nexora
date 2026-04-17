import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Facebook, Twitter, Instagram, Linkedin, Search, ChevronDown } from "lucide-react";
import { useTheme } from "@template/contexts/ThemeContext";
import { NAV_LINKS, COMPANY, SITE_TOP } from "@template/data/siteData";
import { useSiteContent } from "@template/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const social = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

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
  const { services } = useSiteContent();
  const location = useLocation();

  return (
    <>
      <div className="bg-primary text-primary-foreground text-xs hidden md:block">
        <div className="container-custom flex justify-between items-center py-2.5 px-4 md:px-8 gap-4">
          <div className="flex items-center gap-3 min-w-0 opacity-90">
            <span className="shrink-0 font-medium">{SITE_TOP.line}</span>
            <span className="opacity-40 shrink-0">|</span>
            <span className="truncate">{SITE_TOP.locations}</span>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <div className="hidden lg:flex items-center gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <button type="button" aria-label="Search" className="opacity-80 hover:text-secondary transition-colors hidden sm:block">
              <Search className="h-4 w-4" />
            </button>
            <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 font-medium hover:text-secondary transition-colors">
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phone}
            </a>
            <Link to="/contact" className="font-semibold hover:text-secondary transition-colors whitespace-nowrap">
              Request Estimate
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container-custom flex items-center justify-between min-h-[72px] md:min-h-[88px] py-2 md:py-0 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3.5 shrink-0 min-w-0">
            {logoUrl ? (
              <img src={logoUrl} alt={COMPANY.name} className="h-11 md:h-[52px] max-w-[240px] object-contain" />
            ) : (
              <>
                <span className="flex h-11 w-11 md:h-[52px] md:w-[52px] items-center justify-center rounded-md bg-secondary text-secondary-foreground text-2xl font-black shrink-0 shadow-sm">
                  C
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-base md:text-lg font-extrabold tracking-tight text-primary leading-tight truncate">
                    CONSTRUCTO
                  </span>
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase truncate">
                    Premium Builders
                  </span>
                </div>
              </>
            )}
          </Link>

          <nav className="hidden xl:flex items-center justify-center flex-1 gap-0.5 px-6 min-w-0">
            {NAV_LINKS.map(link => {
              const active = navItemActive(location.pathname, link.path);
              if (link.path === "/services") {
                return (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className={cn(
                        "px-4 py-2.5 text-[15px] font-semibold tracking-wide transition-colors whitespace-nowrap rounded-lg inline-flex items-center gap-1.5",
                        active
                          ? "text-secondary bg-secondary/10"
                          : "text-foreground/85 hover:text-primary hover:bg-muted/70",
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                    <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                      <div className="min-w-[260px] rounded-xl border border-border bg-card shadow-xl p-2">
                        {services.map(service => (
                          <Link
                            key={service.id}
                            to={`/services/${service.id}`}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-muted hover:text-secondary transition-colors"
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
                    "px-4 py-2.5 text-[15px] font-semibold tracking-wide transition-colors whitespace-nowrap rounded-lg",
                    active
                      ? "text-secondary bg-secondary/10"
                      : "text-foreground/85 hover:text-primary hover:bg-muted/70",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center shrink-0">
            <Button
              asChild
              size="default"
              className="rounded-md px-7 h-11 text-[15px] font-semibold tracking-wide bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm"
            >
              <Link to="/contact">Get quote</Link>
            </Button>
          </div>

          <button className="xl:hidden p-2 -mr-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="xl:hidden border-t bg-card px-4 pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {NAV_LINKS.map(link => {
              if (link.path === "/services") {
                return (
                  <div key={link.path} className="border-b border-border">
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-3 py-3.5 text-base font-semibold tracking-wide",
                        navItemActive(location.pathname, link.path) ? "text-secondary bg-secondary/5" : "text-foreground",
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
                    "block px-3 py-3.5 text-base font-semibold tracking-wide border-b border-border last:border-0",
                    navItemActive(location.pathname, link.path) ? "text-secondary bg-secondary/5" : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="w-full mt-4 h-12 text-base font-semibold rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Get quote
              </Link>
            </Button>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
