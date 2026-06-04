import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home, Zap, Phone, Flame } from "lucide-react";
import Layout from "@template-minhs/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";

const QUICK_LINKS: Array<{ label: string; to: string; description: string }> = [
  { label: "Services", to: "/services", description: "Panel upgrades, EV chargers, and full electrical contracting." },
  { label: "Contact", to: "/contact", description: "Free estimates and same-day scheduling across DFW." },
  { label: "Emergency Service", to: "/services/emergency-electrical", description: "24/7 dispatch when power fails or something smells wrong." },
];

const NotFound = () => {
  const location = useLocation();
  const { company: COMPANY } = useSiteContent();

  useEffect(() => {
    console.warn("404 | route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Helmet>
        <title>Page not found | {COMPANY.name}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="This page is off the circuit. Return to MINHS Electric for electrical services across DFW."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-[hsl(var(--primary))] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--secondary))]/15 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs md:text-sm font-display font-bold tracking-[0.28em] text-[hsl(var(--secondary))] mb-5">
                ERROR 404 · OFF THE CIRCUIT
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide leading-[1.05] mb-6">
                This page lost power.
              </h1>
              <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-xl mb-8">
                The URL you followed isn&apos;t connected to anything on our site. It may have moved, been renamed, or never existed. Let&apos;s get you back on the grid.
              </p>

              {location.pathname && location.pathname !== "/" ? (
                <div className="mb-10 inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-2 text-xs md:text-sm font-mono text-white/70 max-w-full">
                  <span className="text-[hsl(var(--secondary))]">GET</span>
                  <span className="truncate">{location.pathname}</span>
                  <span className="shrink-0 rounded-sm bg-[hsl(var(--secondary))]/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[hsl(var(--secondary))]">
                    404
                  </span>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-sm font-display font-bold uppercase px-8 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90"
                >
                  <Link to="/" aria-label="Back to homepage">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="minhs-btn-outline-on-dark rounded-sm font-display font-bold uppercase px-8"
                >
                  <Link to="/services/emergency-electrical" aria-label="Emergency electrical service">
                    <Flame className="h-4 w-4 mr-2" />
                    Emergency Service
                  </Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block relative select-none text-center">
              <span
                aria-hidden
                className="block text-[16rem] xl:text-[19rem] font-display font-black leading-none tracking-tighter text-transparent"
                style={{ WebkitTextStroke: "2px hsl(var(--secondary))" }}
              >
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-[0_20px_60px_-20px_hsl(var(--secondary)/0.6)]">
                  <Zap className="h-9 w-9" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--minhs-surface))] py-14 lg:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="text-sm font-display font-bold tracking-[0.2em] text-[hsl(var(--secondary))] mb-3 uppercase">
                Quick Links
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                Reconnect to the right circuit.
              </h2>
            </div>
            <p className="text-slate-600 md:max-w-sm leading-relaxed">
              Or call us directly at{" "}
              <a
                href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                className="font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
              >
                {COMPANY.phone}
              </a>
              .
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                className="group block h-full rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-[hsl(var(--secondary))] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs font-display font-bold tracking-[0.2em] text-slate-400 group-hover:text-[hsl(var(--secondary))]">
                    0{idx + 1}
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[hsl(var(--secondary))]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[hsl(var(--primary))] mb-2">{link.label}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{link.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="minhs-btn-outline-on-light font-display font-bold uppercase"
            >
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call {COMPANY.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
