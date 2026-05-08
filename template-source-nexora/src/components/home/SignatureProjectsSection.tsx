import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { BEFORE_AFTER_PROJECTS } from "@/data/siteData";

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();

  // Prefer projects (which carry beforeImage/afterImage if cloned from defaults).
  // Fall back to the static defaults so the section always shows visuals.
  const items = (projects.length > 0 ? projects : BEFORE_AFTER_PROJECTS).slice(0, 4).map(p => ({
    id: p.id,
    title: p.title,
    location: (p as any).location,
    beforeImage: (p as any).beforeImage || (p as any).gallery?.[0] || (p as any).image,
    afterImage: (p as any).afterImage || (p as any).image,
  }));

  if (!items.length) return null;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[hsl(var(--primary))]">
            Before & After
          </h2>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
          >
            View More Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(p => (
            <article key={p.id} className="group">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                <div className="grid grid-cols-2 h-full">
                  <div className="relative">
                    <img
                      src={p.beforeImage}
                      alt={`${p.title} before`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white px-2 py-1 rounded">
                      Before
                    </span>
                  </div>
                  <div className="relative border-l-2 border-white">
                    <img
                      src={p.afterImage}
                      alt={`${p.title} after`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] px-2 py-1 rounded">
                      After
                    </span>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center"
                >
                  <span className="block h-3 w-3 rounded-full bg-slate-300" />
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                {p.title}{p.location ? ` — ${p.location}` : ""}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
