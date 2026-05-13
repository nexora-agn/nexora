import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Home,
  Phone,
  Mail,
  Compass,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

/** Roofix NotFound. Distinct from Constructo's giant outlined "404" + numbered link cards.
 *  Archetypes:
 *  1. Compact wedge hero with current-path chip
 *  2. Prominent site search input that routes to the closest matching page
 *  3. Last-published projects filmstrip
 *  4. Sitemap-style grouped link directory (replaces "popular destinations" cards) */

interface SiteMapLink {
  to: string;
  label: string;
  description: string;
}

interface SiteMapGroup {
  heading: string;
  links: SiteMapLink[];
}

const SITEMAP: SiteMapGroup[] = [
  {
    heading: "About the firm",
    links: [
      { to: "/about", label: "Story & eras", description: "Two decades, four chapters." },
      { to: "/team", label: "The crew", description: "Partners, PMs, supers, and field." },
      { to: "/careers", label: "Careers", description: "Open roles and how we hire." },
    ],
  },
  {
    heading: "What we do",
    links: [
      {
        to: "/services",
        label: "Roofing services",
        description: "Replacements, storm repair, flat roofs, gutters, skylights.",
      },
      { to: "/projects", label: "Project gallery", description: "Recent roofs by neighborhood and type." },
      { to: "/service-areas", label: "Where we work", description: "North Texas counties served." },
    ],
  },
  {
    heading: "Talk to us",
    links: [
      { to: "/contact", label: "Request an estimate", description: "Pick a lane, describe your roof." },
      { to: "/reviews", label: "Reviews", description: "Owner words, by platform." },
      { to: "/faq", label: "What people ask", description: "Pricing, timing, contracts, warranty." },
    ],
  },
];

const KEYWORD_ROUTES: { keywords: string[]; to: string }[] = [
  { keywords: ["service", "build", "what", "scope"], to: "/services" },
  { keywords: ["project", "portfolio", "case", "work"], to: "/projects" },
  { keywords: ["team", "crew", "people", "staff"], to: "/team" },
  { keywords: ["about", "story", "history"], to: "/about" },
  { keywords: ["contact", "estimate", "quote", "call"], to: "/contact" },
  { keywords: ["job", "career", "hire", "apply"], to: "/careers" },
  { keywords: ["review", "testimonial"], to: "/reviews" },
  { keywords: ["area", "city", "location", "where"], to: "/service-areas" },
  { keywords: ["faq", "question", "ask"], to: "/faq" },
  { keywords: ["blog", "journal", "article"], to: "/blog" },
];

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { resolveProjectImage } = useTheme();
  const { projects, company: COMPANY } = useSiteContent();
  const [query, setQuery] = useState("");

  const recent = projects.slice(0, 4);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = KEYWORD_ROUTES.find(r =>
      r.keywords.some(kw => q.includes(kw)),
    );
    if (match) {
      navigate(match.to);
    } else {
      navigate(`/projects`);
    }
  };

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  return (
    <Layout>
      <Helmet>
        <title>Wrong turn | {COMPANY.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* 1 — Wedge hero with path chip */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container-custom px-4 md:px-8 py-16 md:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[10px] font-black tracking-widest uppercase mb-5">
              <Compass className="h-3 w-3" /> 404 · Wrong turn on site
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02]">
              That URL isn't on
              <br />
              <span className="text-secondary">our jobsite.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
              Type what you were looking for in the box below and we'll point
              you at the right page. Or jump straight to one of the rooms in
              the directory underneath.
            </p>

            <form onSubmit={onSearch} className="mt-7 relative max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="services, projects, careers, contact…"
                className="h-14 pl-14 pr-32 rounded-md text-base font-medium bg-white text-primary border-0 placeholder:text-muted-foreground focus-visible:ring-secondary"
              />
              <Button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-11 rounded-md px-5 text-xs font-extrabold tracking-widest uppercase bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                FIND IT
              </Button>
            </form>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6 max-w-xs w-full">
              <p className="text-[10px] font-black tracking-widest uppercase text-secondary mb-3">
                Address requested
              </p>
              <code className="block text-sm font-mono text-white break-all">
                {pathname}
              </code>
              <div className="mt-5 pt-5 border-t border-white/10 space-y-2 text-xs text-white/75">
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  Not on file
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  All other rooms still open
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Recent projects filmstrip */}
      {recent.length > 0 && (
        <section className="bg-background py-12 md:py-16 border-b border-border">
          <div className="container-custom px-4 md:px-8 mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-2">
                JUST PUBLISHED
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
                The latest in the delivery log
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary"
            >
              ALL PROJECTS
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="container-custom px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recent.map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5"
              >
                <img
                  src={resolveProjectImage(p.id, p.image)}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-primary px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                  {p.category}
                </span>
                <div className="absolute left-3 right-3 bottom-3 text-white">
                  <h3 className="text-sm font-black uppercase tracking-tight leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-[10px] text-white/80 mt-0.5">
                    {p.location} · {p.year}
                  </p>
                </div>
                <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3 — Sitemap directory (replaces "popular destinations") */}
      <section className="bg-muted/40 section-padding">
        <div className="container-custom px-4 md:px-8">
          <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
            FULL SITE DIRECTORY
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-10">
            Pick the room you meant.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {SITEMAP.map(group => (
              <div key={group.heading}>
                <p className="text-[11px] font-black tracking-widest uppercase text-muted-foreground border-b border-border pb-2 mb-3">
                  {group.heading}
                </p>
                <ul className="space-y-1">
                  {group.links.map(link => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group block py-2.5 -mx-2 px-2 rounded-md hover:bg-card transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-base font-bold uppercase tracking-tight text-primary group-hover:text-secondary transition-colors">
                            {link.label}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {link.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Footer minimum CTA */}
      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase text-primary hover:text-secondary"
          >
            <Home className="h-4 w-4" /> Back to the front page
          </Link>
          <div className="flex items-center gap-3">
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/20 hover:border-secondary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {COMPANY.phone}
              </a>
            )}
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/20 hover:border-secondary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
