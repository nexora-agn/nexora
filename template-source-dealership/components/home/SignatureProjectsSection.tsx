import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { HOME_BUILDER_IMAGES } from "@/data/siteData";

/** Staggered masonry heights per column position */
const MASONRY_HEIGHTS = ["h-[280px]", "h-[340px]", "h-[300px]", "h-[360px]", "h-[280px]", "h-[320px]"] as const;

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const items = projects.slice(0, 5);
  if (!items.length) return null;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
              Our Work
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))]">
              Signature Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors font-display"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {items.map((project, i) => {
            const img = resolveProjectImage(
              project.id,
              project.image ||
                (project as { afterImage?: string }).afterImage ||
                HOME_BUILDER_IMAGES.workerPlumber,
            );
            const heightClass = MASONRY_HEIGHTS[i % MASONRY_HEIGHTS.length];
            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group block break-inside-avoid"
              >
                <article className="relative overflow-hidden rounded-sm bg-[hsl(var(--flow-surface))]">
                  <div className={cn("relative w-full overflow-hidden", heightClass)}>
                    <img
                      src={img}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/90 via-[hsl(var(--primary))]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))] font-display">
                        {project.category}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold uppercase leading-tight mt-1">
                        {project.title}
                      </h3>
                      {project.location && (
                        <p className="text-xs text-white/70 mt-1">{project.location}</p>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
