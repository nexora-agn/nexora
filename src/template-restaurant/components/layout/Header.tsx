import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import { useTheme } from "@template-restaurant/contexts/ThemeContext";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { MENU_CATEGORIES } from "@template-restaurant/data/siteData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function navActive(pathname: string, path: string) {
  if (path.includes("?")) return pathname.startsWith(path.split("?")[0]);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

const RestaurantLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 28h16M18 20v8M24 18v10M30 20v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logoUrl } = useTheme();
  const { navLinks, company: COMPANY } = useSiteContent();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
          transparent ? "rest-header-transparent text-white" : "rest-header-solid text-[hsl(var(--primary))]",
        )}
      >
        <div className="container-custom container-inset">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setMobileOpen(false)}>
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <RestaurantLogo className={cn("h-10 w-10", transparent ? "text-white" : "text-[hsl(var(--primary))]")} />
                  <div className="leading-tight">
                    <span className={cn("block font-display text-lg sm:text-xl font-semibold tracking-wide", transparent ? "text-white" : "text-[hsl(var(--primary))]")}>
                      NEXORA
                    </span>
                    <span className="block text-[10px] font-sans-brand uppercase tracking-[0.3em] text-[hsl(var(--secondary))]">
                      Fine Dining
                    </span>
                  </div>
                </>
              )}
            </Link>

            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map(link => {
                const active = navActive(location.pathname, link.path);
                const isMenu = link.path === "/menu";
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => isMenu && setMegaOpen(true)}
                    onMouseLeave={() => isMenu && setMegaOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        "inline-flex items-center gap-1 px-4 py-2 font-sans-brand text-xs font-medium uppercase tracking-[0.14em] transition-colors",
                        active
                          ? "text-[hsl(var(--secondary))]"
                          : transparent ? "text-white/85 hover:text-white" : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                      )}
                    >
                      {link.label}
                      {isMenu && <ChevronDown className="h-3 w-3 opacity-60" />}
                    </Link>
                    {isMenu && megaOpen && (
                      <div className="absolute left-0 top-full pt-2 w-[720px]">
                        <div className="bg-white border border-border shadow-2xl p-6 grid grid-cols-3 gap-2">
                          {MENU_CATEGORIES.map(cat => (
                            <Link
                              key={cat.id}
                              to={cat.to}
                              className="flex gap-3 p-3 hover:bg-[hsl(var(--muted))] transition-colors group"
                            >
                              <img src={cat.image} alt="" className="w-14 h-14 object-cover shrink-0" />
                              <div>
                                <span className="block font-display text-base text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))]">
                                  {cat.title}
                                </span>
                                <span className="text-[10px] text-muted-foreground line-clamp-2">{cat.description}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={phoneHref}
                className={cn(
                  "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors",
                  transparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-[hsl(var(--secondary))]",
                )}
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden 2xl:inline">{COMPANY.phone}</span>
              </a>
              <Button
                asChild
                className="rounded-none h-11 px-6 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white font-sans-brand text-xs uppercase tracking-[0.16em]"
              >
                <Link to="/reservations">Reserve</Link>
              </Button>
            </div>

            <button
              type="button"
              className={cn(
                "xl:hidden relative z-[70] flex h-11 w-11 items-center justify-center rounded-sm transition-colors",
                mobileOpen
                  ? "bg-white/10 text-white"
                  : transparent
                    ? "text-white hover:bg-white/10"
                    : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]",
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "xl:hidden fixed inset-0 z-[55] transition-all duration-300",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-[#141414]/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
        <nav
          className={cn(
            "absolute top-0 right-0 h-full w-full max-w-sm flex flex-col bg-[#141414] text-white shadow-2xl",
            "transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <RestaurantLogo className="h-8 w-8 text-[hsl(var(--secondary))]" />
              <div className="leading-tight">
                <span className="block font-display text-lg font-semibold tracking-wide">NEXORA</span>
                <span className="block text-[9px] font-sans-brand uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">Fine Dining</span>
              </div>
            </div>
            <button type="button" className="flex h-10 w-10 items-center justify-center text-white/80 hover:text-white" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-0">
              {navLinks.map(link => {
                const active = navActive(location.pathname, link.path);
                return (
                  <li key={link.path} className="border-b border-white/10">
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-4 font-display text-xl transition-colors",
                        active ? "text-[hsl(var(--secondary))]" : "text-white hover:text-[hsl(var(--secondary))]",
                      )}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-40" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="text-[10px] font-sans-brand uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mt-8 mb-4">Menu</p>
            <ul className="grid grid-cols-2 gap-2">
              {MENU_CATEGORIES.slice(0, 8).map(cat => (
                <li key={cat.id}>
                  <Link
                    to={cat.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-xs font-medium uppercase tracking-wider bg-white/5 hover:bg-[hsl(var(--secondary))]/20 border border-white/10 transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 px-6 py-6 border-t border-white/10 bg-[#0f0f0f] space-y-3">
            <a href={phoneHref} className="flex items-center justify-center gap-2 w-full h-12 border border-white/20 text-sm font-medium uppercase tracking-wider hover:border-[hsl(var(--secondary))] transition-colors">
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
            <Link
              to="/reservations"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-12 bg-[hsl(var(--secondary))] text-[#141414] text-sm font-semibold uppercase tracking-wider hover:brightness-110 transition-all"
            >
              Reserve a Table
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
