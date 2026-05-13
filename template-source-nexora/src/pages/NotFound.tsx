import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@template-nexora/components/layout/Layout";
import Reveal from "@template-nexora/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Compass, Phone } from "lucide-react";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

const QUICK_LINKS: Array<{ label: string; to: string; description: string }> = [
  { label: "Services", to: "/services", description: "What we build and how we deliver." },
  { label: "Projects", to: "/projects", description: "Signature work across three continents." },
  { label: "Team", to: "/team", description: "The people behind every build." },
  { label: "Contact", to: "/contact", description: "Start a conversation about your site." },
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
          content="The page you're looking for doesn't exist. Return to the homepage or browse our services and projects."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px), radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)",
            backgroundSize: "36px 36px, 36px 36px",
            backgroundPosition: "0 0, 18px 18px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-secondary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="container-custom relative px-4 md:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
            <Reveal direction="up" duration={700}>
              <div>
                <p className="text-xs md:text-sm font-bold tracking-[0.28em] text-secondary mb-5">
                  ERROR 404 · OFF THE BLUEPRINT
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6">
                  This page isn&apos;t on the site plan.
                </h1>
                <p className="text-base md:text-lg text-primary-foreground/75 leading-relaxed max-w-xl mb-8">
                  The address you followed doesn&apos;t match anything we&apos;ve built yet.
                  It may have moved, been renamed, or never existed. Let&apos;s get you
                  back to solid ground.
                </p>

                {location.pathname && location.pathname !== "/" && (
                  <div className="mb-10 inline-flex items-center gap-2 rounded-sm border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2 text-xs md:text-sm font-mono text-primary-foreground/70 max-w-full">
                    <span className="text-secondary">GET</span>
                    <span className="truncate">{location.pathname}</span>
                    <span className="shrink-0 rounded-sm bg-secondary/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-secondary">
                      404
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-sm font-bold px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    <Link to="/" aria-label="Back to homepage">
                      <Home className="h-4 w-4 mr-2" />
                      BACK TO HOME
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-sm font-bold px-8 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Link to="/contact" aria-label="Contact our team">
                      <Phone className="h-4 w-4 mr-2" />
                      CONTACT US
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal direction="zoom" delay={120} duration={800} className="hidden lg:block">
              <div className="relative select-none text-center">
                <span
                  aria-hidden
                  className="block text-[16rem] xl:text-[19rem] font-black leading-none tracking-tighter text-transparent"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--secondary))",
                  }}
                >
                  404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-[0_20px_60px_-20px_hsl(var(--secondary)/0.6)]">
                    <Compass className="h-9 w-9" strokeWidth={1.75} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal delay={60}>
        <section className="section-padding bg-background border-t border-border">
          <div className="container-custom px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-secondary mb-3">
                  POPULAR DESTINATIONS
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                  Pick up where you meant to go.
                </h2>
              </div>
              <p className="text-muted-foreground md:max-w-sm leading-relaxed">
                A few quick paths back into the site, or call us directly at{" "}
                <a
                  href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                  className="font-semibold text-foreground hover:text-secondary"
                >
                  {COMPANY.phone}
                </a>
                .
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_LINKS.map((link, idx) => (
                <Reveal key={link.to} delay={80 + idx * 60} direction="up">
                  <Link
                    to={link.to}
                    className="group block h-full rounded-xl border border-border bg-muted/40 p-6 transition-colors hover:border-secondary hover:bg-background"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground group-hover:text-secondary">
                        0{idx + 1}
                      </span>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{link.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </Layout>
  );
};

export default NotFound;
