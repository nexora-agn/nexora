import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useTheme } from "@template-truck-repair/contexts/ThemeContext";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function navActive(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

const TruckLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
    <rect x="4" y="18" width="28" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M32 22h8l4 6v6h-12V22z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="14" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 18V14h16v4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logoUrl } = useTheme();
  const { navLinks, company: COMPANY } = useSiteContent();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;
  const emergencyHref = `tel:${(COMPANY.emergencyPhone || COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
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
      <div className="fixed top-0 left-0 right-0 z-[61] bg-[hsl(var(--secondary))] text-white text-center py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] hidden sm:block">
        24/7 Emergency Dispatch — {COMPANY.emergencyPhone}
      </div>
      <header
        className={cn(
          "fixed top-0 sm:top-7 left-0 right-0 z-[60] transition-all duration-300",
          transparent ? "truck-header-transparent text-white" : "truck-header-solid",
        )}
      >
        <div className="container-custom container-inset">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-9 w-auto object-contain" />
              ) : (
                <>
                  <TruckLogo className={cn("h-9 w-9", transparent ? "text-white" : "text-[hsl(var(--secondary))]")} />
                  <div className="leading-tight">
                    <span className={cn("block font-display text-base sm:text-lg font-semibold", transparent ? "text-white" : "text-white")}>
                      NEXORA
                    </span>
                    <span className="block text-[9px] font-sans-brand uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
                      Heavy Duty
                    </span>
                  </div>
                </>
              )}
            </Link>

            <nav className="hidden xl:flex items-center gap-0.5">
              {navLinks.map(link => {
                const active = navActive(location.pathname, link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "px-3 py-2 font-sans-brand text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                      active
                        ? "text-[hsl(var(--secondary))]"
                        : transparent ? "text-white/85 hover:text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href={emergencyHref} className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--secondary))] hover:brightness-110">
                <Phone className="h-3.5 w-3.5" />
                Emergency
              </a>
              <Button asChild className="rounded-none h-10 px-5 bg-[hsl(var(--secondary))] hover:brightness-110 text-white font-sans-brand text-[11px] uppercase tracking-[0.14em]">
                <Link to="/request-service">Request Service</Link>
              </Button>
            </div>

            <button
              type="button"
              className={cn(
                "xl:hidden flex h-10 w-10 items-center justify-center",
                transparent ? "text-white" : "text-white",
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className={cn("xl:hidden fixed inset-0 z-[55] transition-all", mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none")}>
        <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
        <nav className={cn("absolute top-0 right-0 h-full w-full max-w-sm bg-[hsl(var(--primary))] text-white shadow-2xl transition-transform", mobileOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <span className="font-display text-lg">Menu</span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close"><X className="h-6 w-6" /></button>
          </div>
          <ul className="px-6 py-4">
            {navLinks.map(link => (
              <li key={link.path} className="border-b border-white/10">
                <Link to={link.path} onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-4 font-display text-lg">
                  {link.label}
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 py-6 border-t border-white/10 space-y-3 mt-auto">
            <a href={emergencyHref} className="flex items-center justify-center gap-2 w-full h-12 border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] text-sm font-bold uppercase">
              <Phone className="h-4 w-4" /> Emergency Call
            </a>
            <Link to="/request-service" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full h-12 bg-[hsl(var(--secondary))] text-sm font-bold uppercase">
              Request Service
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
