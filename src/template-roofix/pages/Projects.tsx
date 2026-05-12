import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit Projects. New archetypes (not on home, not on Constructo):
 *  1. Stat-led split hero with category counter
 *  2. Filter pills + asymmetric bento masonry grid
 *  3. Sector KPI ribbon (different metrics from homepage stats)
 *  4. Sticky year-rail with project list grouped by vintage
 *  5. Closing tape strip CTA */

const SECTOR_KPIS = [
  { label: "Repeat-client work", value: "85%" },
  { label: "On-time vs scheduled", value: "98%" },
  { label: "First-cycle inspections", value: "94%" },
  { label: "Avg. punch items left", value: "<6" },
];

const Projects = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState<string>("All");
  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter(p => p.category === filter),
    [projects, filter],
  );

  // Group filtered projects by year for the year-rail section.
  const grouped = useMemo(() => {
    const map = new Map<string, typeof projects>();
    filtered.forEach(p => {
      const y = p.year || "—";
      if (!map.has(y)) map.set(y, [] as typeof projects);
      map.get(y)!.push(p);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  return (
    <Layout>
      <Helmet>
        <title>Delivery log | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Recent commercial, residential, and industrial work delivered by ${COMPANY.name}.`}
        />
      </Helmet>

      {/* 1 — Stat-led split hero */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              DELIVERY LOG · {projects.length} PROJECTS ON FILE
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              Buildings we'd
              <br />
              <span className="text-secondary">drive past on a Sunday.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              The work below isn't curated for press. It's the actual ledger:
              ground-up, renovations, hospitality, industrial. Filter by sector
              or scroll the year rail to find your kind of project.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {SECTOR_KPIS.map(k => (
              <div
                key={k.label}
                className="rounded-xl bg-primary text-primary-foreground p-5"
              >
                <div className="text-3xl md:text-4xl font-black text-secondary leading-none">
                  {k.value}
                </div>
                <div className="mt-3 text-[11px] font-bold tracking-widest uppercase text-white/75">
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Filter pills + bento masonry */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-extrabold tracking-widest uppercase border-2 transition-colors",
                  filter === c
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-foreground/80 hover:border-secondary/50 hover:text-secondary",
                )}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto text-xs font-bold tracking-widest uppercase text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Bento masonry — repeats a 6-tile pattern that mixes wide/tall/square */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <p className="text-sm text-muted-foreground">
                Nothing in that category yet. Try another filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 auto-rows-[220px]">
              {filtered.map((p, i) => {
                const variant = i % 6;
                const span = cn(
                  variant === 0 && "lg:col-span-3 lg:row-span-2",
                  variant === 1 && "lg:col-span-3",
                  variant === 2 && "lg:col-span-2",
                  variant === 3 && "lg:col-span-2 lg:row-span-2",
                  variant === 4 && "lg:col-span-2",
                  variant === 5 && "lg:col-span-3",
                );
                return (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className={cn(
                      "group relative rounded-2xl overflow-hidden ring-1 ring-black/5",
                      span,
                    )}
                  >
                    <img
                      src={resolveProjectImage(p.id, p.image)}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-primary px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <div className="absolute left-4 right-4 bottom-4 text-white">
                      <h3 className="text-base md:text-lg font-black uppercase tracking-tight leading-tight">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/80 inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-secondary" />
                        {p.location} · {p.year}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3 — Sticky year-rail timeline */}
      <Reveal>
        <section className="bg-muted/40 section-padding border-y border-border">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-2xl mb-10 md:mb-14">
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                BY VINTAGE
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                The same crews, year after year.
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-32 space-y-2">
                  {grouped.map(([year]) => (
                    <a
                      key={year}
                      href={`#year-${year}`}
                      className="group flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 hover:border-secondary hover:bg-secondary/5 transition-colors"
                    >
                      <span className="text-sm font-black tracking-widest tabular-nums text-primary">
                        {year}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </a>
                  ))}
                </div>
              </aside>

              <div className="lg:col-span-9 space-y-12">
                {grouped.map(([year, list]) => (
                  <section key={year} id={`year-${year}`} className="scroll-mt-32">
                    <div className="flex items-baseline gap-4 mb-5 pb-3 border-b border-border">
                      <h3 className="text-3xl md:text-4xl font-black text-secondary tabular-nums leading-none">
                        {year}
                      </h3>
                      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                        {list.length} {list.length === 1 ? "delivery" : "deliveries"}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {list.map(p => (
                        <li key={p.id}>
                          <Link
                            to={`/projects/${p.id}`}
                            className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-xl bg-card border border-border p-4 md:p-5 hover:border-secondary/60 hover:shadow-md transition-all"
                          >
                            <div className="relative h-20 w-full md:w-32 shrink-0 overflow-hidden rounded-md ring-1 ring-black/5">
                              <img
                                src={resolveProjectImage(p.id, p.image)}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                                {p.category}
                              </p>
                              <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-primary leading-snug group-hover:text-secondary transition-colors">
                                {p.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {p.location} · Client: {p.client}
                              </p>
                            </div>
                            <span className="hidden md:block text-xs font-bold tracking-widest uppercase text-secondary tabular-nums">
                              {p.value}
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 4 — Closing tape-strip CTA */}
      <section className="bg-primary text-primary-foreground border-t border-secondary/30">
        <div className="container-custom px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              YOUR PROJECT, NEXT IN THE LOG
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Bring us a site, a sketch, or just a problem.
            </h2>
          </div>
          <div className="flex flex-wrap md:justify-end gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/contact">START THE FILE</Link>
            </Button>
            {COMPANY.phone && (
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-primary"
              >
                <a href={`tel:${cleanPhone}`}>{COMPANY.phone}</a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
