import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@template-summit/components/layout/Layout";
import PageHeader from "@template-summit/components/sections/PageHeader";
import PaginationControls from "@template-summit/components/layout/PaginationControls";
import CTASection from "@template-summit/components/sections/CTASection";
import Reveal from "@template-summit/components/animations/Reveal";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import {
  SIGNATURE_PROJECT_COUNT,
  PROJECTS_LATEST_PAGE_SIZE,
} from "@template-summit/data/siteData";
import { clampPage, parsePageParam, slicePage, totalPages as totalPagesCount } from "@template-summit/lib/pagination";

const Projects = () => {
  const { projects, sectionVisibility, company: COMPANY, projectsPageStats: PROJECTS_PAGE_STATS } = useSiteContent();
  const [searchParams, setSearchParams] = useSearchParams();

  const signature = projects.slice(0, SIGNATURE_PROJECT_COUNT);
  const [main, ...restSig] = signature;
  const [top, bottom] = restSig;

  const gridSource = projects.slice(SIGNATURE_PROJECT_COUNT);
  const latestPageCount = totalPagesCount(gridSource.length, PROJECTS_LATEST_PAGE_SIZE);
  const rawPage = parsePageParam(searchParams.get("page"));
  const latestPage = clampPage(rawPage, latestPageCount);
  const latest = slicePage(gridSource, latestPage, PROJECTS_LATEST_PAGE_SIZE);

  useEffect(() => {
    if (rawPage === latestPage) return;
    setSearchParams(prev => {
      const n = new URLSearchParams(prev);
      if (latestPage <= 1) n.delete("page");
      else n.set("page", String(latestPage));
      return n;
    }, { replace: true });
  }, [rawPage, latestPage, setSearchParams]);

  const titleBase = `Signature Projects | ${COMPANY.name}`;
  const docTitle = latestPage > 1 ? `${titleBase} | Page ${latestPage}` : titleBase;

  return (
    <Layout>
      <Helmet>
        <title>{docTitle}</title>
        <meta name="description" content={`Explore the ${COMPANY.name} portfolio: residential, commercial, and infrastructure projects.`} />
      </Helmet>

      <Reveal direction="zoom" duration={650}>
        <PageHeader
          variant="dark"
          eyebrow="OUR PROJECTS"
          title="Recent Construction Projects"
          subtitle="Explore our recent commercial, residential, and industrial builds across Texas, delivered with precision and transparency."
        />
      </Reveal>

      {sectionVisibility["projects.stats"] && <Reveal delay={70}>
        <section className="bg-secondary py-10 md:py-12 border-y border-border text-secondary-foreground">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {PROJECTS_PAGE_STATS.map(s => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-black">{s.value}</p>
                <p className="mt-1 text-xs md:text-sm font-semibold opacity-95">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>}

      {sectionVisibility["projects.list"] && <Reveal delay={100}>
        <section className="section-padding bg-background">
        <div className="container-custom px-4 md:px-8">
          {main && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-16">
              <Link
                to={`/projects/${main.id}`}
                className="group relative block overflow-hidden rounded-2xl min-h-[340px] lg:min-h-[540px]"
              >
                <img
                  src={main.image}
                  alt={main.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-[10px] font-black tracking-widest px-3 py-1.5">
                  {main.category.toUpperCase()}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-primary-foreground">
                  <h2 className="text-2xl md:text-3xl font-bold">{main.title}</h2>
                  <p className="text-sm opacity-90 mt-2 max-w-lg">{main.description}</p>
                  <span className="mt-4 inline-block text-sm font-bold border-b-2 border-secondary pb-0.5">View Project</span>
                </div>
              </Link>

              <div className="flex flex-col gap-4 lg:gap-6">
                {[top, bottom].filter(Boolean).map(project => (
                  <Link
                    key={project!.id}
                    to={`/projects/${project!.id}`}
                    className="group relative block overflow-hidden rounded-2xl flex-1 min-h-[200px] lg:min-h-0"
                  >
                    <img
                      src={project!.image}
                      alt={project!.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 z-10 bg-secondary/95 text-secondary-foreground text-[10px] font-black tracking-widest px-3 py-1.5">
                      {project!.category === "Industrial" ? "LEED PLATINUM" : project!.category.toUpperCase()}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                      <h3 className="text-xl font-bold">{project!.title}</h3>
                      <p className="text-sm opacity-90">{project!.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10">Latest Deliveries</h2>
          {latest.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">More projects coming soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map(p => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-primary/85 text-primary-foreground text-[9px] font-bold tracking-wider px-2 py-1 rounded">
                      {p.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <PaginationControls page={latestPage} totalPages={latestPageCount} searchParams={searchParams} />
        </div>
        </section>
      </Reveal>}

      {sectionVisibility["projects.cta"] && <Reveal delay={140}>
        <CTASection />
      </Reveal>}
    </Layout>
  );
};

export default Projects;
