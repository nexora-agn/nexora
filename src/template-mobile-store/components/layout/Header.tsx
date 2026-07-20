import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight, Search, Heart, MapPin, User, ShoppingCart } from "lucide-react";
import { useTheme } from "@template-mobile-store/contexts/ThemeContext";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { PROPERTY_CATEGORIES, SHOP_MEGA_LINKS } from "@template-mobile-store/data/siteData";
import { cartCount } from "@template-mobile-store/lib/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function navActive(pathname: string, path: string) {
  if (path.includes("?")) return pathname.startsWith(path.split("?")[0]);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

const MobileLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
    <rect x="14" y="6" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="24" cy="36" r="2" fill="currentColor" />
    <rect x="18" y="10" width="12" height="20" rx="1" fill="currentColor" opacity="0.15" />
  </svg>
);

const LOCATIONS = [
  { id: "congress", label: "Congress Ave" },
  { id: "domain", label: "The Domain" },
  { id: "south-lamar", label: "South Lamar" },
  { id: "round-rock", label: "Round Rock" },
];

function shopNavActive(pathname: string) {
  const shopPaths = ["/shop", "/listings", "/products", "/refurbished", "/accessories", "/deals", "/offers"];
  return shopPaths.some(p => pathname === p || pathname.startsWith(`${p}/`));
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [itemsInCart, setItemsInCart] = useState(0);
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
    const refresh = () => setItemsInCart(cartCount());
    refresh();
    window.addEventListener("storage", refresh);
    const t = setInterval(refresh, 1500);
    return () => {
      window.removeEventListener("storage", refresh);
      clearInterval(t);
    };
  }, [location.pathname]);

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
          transparent ? "re-header-transparent text-white" : "re-header-solid text-[hsl(var(--primary))]",
        )}
      >
        <div className="hidden lg:block border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="container-custom container-inset flex items-center justify-between h-9 text-[10px] uppercase tracking-[0.2em] text-white/70">
            <span>{COMPANY.hours}</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-[hsl(var(--secondary))]" />
              <label className="sr-only" htmlFor="store-location">
                Location
              </label>
              <select
                id="store-location"
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="bg-transparent border-none text-white/90 uppercase tracking-wider cursor-pointer focus:outline-none"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id} className="text-black">
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container-custom container-inset">
          <div className="flex items-center justify-between h-20 lg:h-[4.5rem]">
            <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setMobileOpen(false)}>
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <MobileLogo className={cn("h-10 w-10", transparent ? "text-white" : "text-[hsl(var(--primary))]")} />
                  <div className="leading-tight">
                    <span
                      className={cn(
                        "block font-sans-brand text-lg sm:text-xl font-semibold tracking-tight",
                        transparent ? "text-white" : "text-[hsl(var(--primary))]",
                      )}
                    >
                      NEXORA
                    </span>
                    <span className="block text-[10px] font-sans-brand uppercase tracking-[0.3em] text-[hsl(var(--secondary))]">
                      Mobile
                    </span>
                  </div>
                </>
              )}
            </Link>

            <nav className="hidden xl:flex items-center gap-1 relative">
              <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-2 font-sans-brand text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
                    shopNavActive(location.pathname)
                      ? "text-[hsl(var(--secondary))]"
                      : transparent
                        ? "text-white/85 hover:text-white"
                        : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                  )}
                  aria-expanded={megaOpen}
                >
                  Shop
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </button>
                {megaOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[min(520px,calc(100vw-2rem))] z-50">
                    <div className="bg-white border border-border shadow-2xl p-5">
                      <p className="text-[10px] font-sans-brand uppercase tracking-[0.2em] text-muted-foreground mb-3">Shop</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-4">
                        {SHOP_MEGA_LINKS.map(item => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className="block px-3 py-2.5 text-sm font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--secondary))]"
                              onClick={() => setMegaOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] font-sans-brand uppercase tracking-[0.2em] text-muted-foreground mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_CATEGORIES.slice(0, 6).map(cat => (
                          <Link
                            key={cat.id}
                            to={cat.to}
                            className="px-3 py-1.5 text-[10px] uppercase tracking-wider border border-border hover:border-[hsl(var(--secondary))] text-muted-foreground hover:text-[hsl(var(--primary))]"
                            onClick={() => setMegaOpen(false)}
                          >
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {navLinks.map(link => {
                const active = navActive(location.pathname, link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-2 font-sans-brand text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
                      active
                        ? "text-[hsl(var(--secondary))]"
                        : transparent
                          ? "text-white/85 hover:text-white"
                          : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              <Link
                to="/shop"
                aria-label="Search shop"
                className={cn(
                  "flex h-10 w-10 items-center justify-center border transition-colors relative",
                  transparent ? "border-white/30 hover:border-white" : "border-border hover:border-[hsl(var(--secondary))]",
                )}
              >
                <Search className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                aria-label="Saved favorites"
                className={cn(
                  "hidden sm:flex h-10 w-10 items-center justify-center border transition-colors",
                  transparent ? "border-white/30 hover:border-white" : "border-border hover:border-[hsl(var(--secondary))]",
                )}
              >
                <Heart className="h-4 w-4" />
              </Link>
              <Link
                to="/account"
                aria-label="Account"
                className={cn(
                  "hidden sm:flex h-10 w-10 items-center justify-center border transition-colors",
                  transparent ? "border-white/30 hover:border-white" : "border-border hover:border-[hsl(var(--secondary))]",
                )}
              >
                <User className="h-4 w-4" />
              </Link>
              <Link
                to="/cart"
                aria-label="Cart"
                className={cn(
                  "flex h-10 w-10 items-center justify-center border transition-colors relative",
                  transparent ? "border-white/30 hover:border-white" : "border-border hover:border-[hsl(var(--secondary))]",
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                {itemsInCart > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[hsl(var(--secondary))] text-white text-[10px] font-bold flex items-center justify-center">
                    {itemsInCart > 9 ? "9+" : itemsInCart}
                  </span>
                )}
              </Link>
              <Button
                asChild
                className="rounded-none h-10 px-4 xl:px-5 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white font-sans-brand text-[10px] uppercase tracking-[0.16em]"
              >
                <Link to="/shop?category=smartphones">Shop Phones</Link>
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
            "absolute top-0 right-0 h-full w-full max-w-sm flex flex-col",
            "bg-[#141414] text-white shadow-2xl",
            "transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <MobileLogo className="h-8 w-8 text-[hsl(var(--secondary))]" />
              <div className="leading-tight">
                <span className="block font-sans-brand text-lg font-semibold tracking-tight">NEXORA</span>
                <span className="block text-[9px] font-sans-brand uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">Mobile</span>
              </div>
            </div>
            <button type="button" className="flex h-10 w-10 items-center justify-center text-white/80 hover:text-white" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-12 mb-6 bg-[hsl(var(--secondary))] text-white text-sm font-semibold uppercase tracking-wider"
            >
              <Search className="h-4 w-4" />
              Shop Phones
            </Link>
            <ul className="space-y-0 mb-6">
              <li className="border-b border-white/10">
                <p className="py-3 text-[10px] font-sans-brand uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">Shop</p>
              </li>
              {SHOP_MEGA_LINKS.map(item => (
                <li key={item.path} className="border-b border-white/10">
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3.5 pl-2 font-sans-brand text-base text-white/90 hover:text-[hsl(var(--secondary))]"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 opacity-30" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-0">
              {navLinks.map(link => {
                const active = navActive(location.pathname, link.path);
                return (
                  <li key={link.path} className="border-b border-white/10">
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 font-sans-brand text-lg transition-colors",
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
          </div>

          <div className="shrink-0 px-6 py-6 border-t border-white/10 bg-[#0f0f0f] space-y-3">
            <a
              href={phoneHref}
              className="flex items-center justify-center gap-2 w-full h-12 border border-white/20 text-sm font-medium uppercase tracking-wider hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call {COMPANY.phone}
            </a>
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-12 bg-[hsl(var(--secondary))] text-white text-sm font-semibold uppercase tracking-wider hover:brightness-110 transition-all"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart {itemsInCart > 0 ? `(${itemsInCart})` : ""}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
