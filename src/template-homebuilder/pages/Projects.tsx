import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import Layout from "@template-homebuilder/components/layout/Layout";
import PaginationControls from "@template-homebuilder/components/layout/PaginationControls";
import CTASection from "@template-homebuilder/components/sections/CTASection";
import { useSiteContent } from "@template-homebuilder/contexts/SiteContentContext";
import { useTheme } from "@template-homebuilder/contexts/ThemeContext";
import { PROJECTS_LATEST_PAGE_SIZE } from "@template-homebuilder/data/siteData";
import { clampPage, parsePageParam, slicePage, totalPages as totalPagesCount } from "@template-homebuilder/lib/pagination";
import { cn } from "@/lib/utils";

const Projects = () => {
  const { projects, projectsPageStats, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter(p => p.category === filter)),
    [projects, filter],
  );

  const pageCount = totalPagesCount(filtered.length, PROJECTS_LATEST_PAGE_SIZE);
  const rawPage = parsePageParam(searchParams.get("page"));
  const page = clampPage(rawPage, pageCount);
  const pageProjects = slicePage(filtered, page, PROJECTS_LATEST_PAGE_SIZE);

  useEffect(() => {
    if (rawPage === page) return;
    setSearchParams(
      prev => {
        const n = new URLSearchParams(prev);
        if (page <= 1) n.delete("page");
        else n.set("page", String(page));
        return n;
      },
      { replace: true },
    );
  }, [rawPage, page, setSearchParams]);

  useEffect(() => {
    setSearchParams(
      prev => {
        const n = new URLSearchParams(prev);
        n.delete("page");
        return n;
      },
      { replace: true },
    );
  }, [filter, setSearchParams]);

  return (
    <Layout>
      <Helmet>
        <title>Projects | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Custom home and design-build portfolio by ${COMPANY.name} — homes, additions, and remodels across Central New Jersey.`}
        />
      </Helmet>

      <section className="bg-[hsl(var(--primary))] text-white py-14 lg:py-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-[hsl(var(--secondary))] text-xs font-display font-bold uppercase tracking-[0.22em] mb-3">
              Project Gallery · {projects.length} Jobs
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
              Custom Home Portfolio
            </h1>
            <p className="mt-4 text-white/80 max-w-xl leading-relaxed font-sans-brand">
              Custom homes, additions, ADUs, and whole-home remodeling across Hunterdon, Somerset, Mercer, and surrounding counties.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {projectsPageStats.map(stat => (
              <div key={stat.label} className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--secondary))]">{stat.value}</div>
                <div className="mt-2 text-[10px] font-display font-bold uppercase tracking-wider text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-display font-bold uppercase tracking-wider border-2 transition-colors",
                  filter === c
                    ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
                    : "border-slate-200 bg-white text-[hsl(var(--primary))] hover:border-[hsl(var(--secondary))]/50",
                )}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto text-xs font-display font-bold uppercase tracking-wider text-slate-500">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {pageProjects.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-slate-200 p-16 text-center">
              <p className="text-sm text-slate-500">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 auto-rows-[220px]">
              {pageProjects.map((p, i) => {
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
                    className={cn("group relative rounded-lg overflow-hidden ring-1 ring-black/5", span)}
                  >
                    <img
                      src={resolveProjectImage(p.id, p.image)}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/90 via-[hsl(var(--primary))]/20 to-transparent" />
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] px-2.5 py-1 text-[10px] font-display font-bold tracking-wider uppercase">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[hsl(var(--primary))] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <div className="absolute left-4 right-4 bottom-4 text-white">
                      <h3 className="font-display text-base md:text-lg font-bold uppercase tracking-wide leading-tight">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/80 inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-[hsl(var(--secondary))]" />
                        {p.location} · {p.year}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <PaginationControls page={page} totalPages={pageCount} searchParams={searchParams} className="mt-10" />
        </div>
      </section>

      <CTASection
        title="Ready to transform your outdoor space?"
        subtitle="Free property walkthroughs from licensed custom home design-build care crews across North Jersey."
      />
    </Layout>
  );
};

export default Projects;
