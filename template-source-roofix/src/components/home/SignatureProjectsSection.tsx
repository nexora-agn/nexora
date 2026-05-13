import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { BEFORE_AFTER_PROJECTS } from "@template-roofix/data/siteData";

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const { resolveProjectImage } = useTheme();

  const source =
    projects.length > 0
      ? projects
      : BEFORE_AFTER_PROJECTS.map(p => ({
          ...p,
          image: (p as { afterImage?: string }).afterImage ?? "",
          gallery: [(p as { beforeImage?: string }).beforeImage, (p as { afterImage?: string }).afterImage].filter(Boolean) as string[],
        }));

  const items = source
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      title: p.title,
      location: (p as { location?: string }).location,
      beforeImage:
        (p as { beforeImage?: string }).beforeImage ||
        ((p as { gallery?: string[] }).gallery?.[0] ?? (p as { image?: string }).image),
      afterImage:
        (p as { afterImage?: string }).afterImage || (p as { image?: string }).image,
    }));

  if (!items.length) return null;

  return (
    <section className="bg-background section-padding border-y border-border">
      <div className="container-custom px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-2">
              SIGNATURE WORK
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
              Before &amp; After
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">
              Real lifts from Texas jobs — swipe the split to see decking clean-up and new systems going down.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary hover:text-secondary transition-colors uppercase shrink-0"
          >
            View project gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(p => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="group block"
            >
              <article>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/10 bg-muted">
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative">
                      <img
                        src={resolveProjectImage(p.id, p.beforeImage)}
                        alt={`${p.title} before`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground px-2 py-1 rounded-sm">
                        Before
                      </span>
                    </div>
                    <div className="relative border-l-2 border-white">
                      <img
                        src={resolveProjectImage(p.id, p.afterImage)}
                        alt={`${p.title} after`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground px-2 py-1 rounded-sm">
                        After
                      </span>
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center ring-2 ring-black/10"
                  >
                    <span className="block h-2 w-2 rounded-full bg-muted-foreground/40" />
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                  {p.title}
                  {p.location ? (
                    <span className="text-muted-foreground font-semibold">{` · ${p.location}`}</span>
                  ) : null}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
