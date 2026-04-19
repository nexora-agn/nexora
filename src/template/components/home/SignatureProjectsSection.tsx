import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const featuredProjects = projects.slice(0, 3);
  const [main, ...rest] = featuredProjects;
  const [top, bottom] = rest;

  if (!main) return null;

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              SELECTED WORK
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
              Signature <span className="text-secondary">projects.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md md:text-right">
            A look at recent builds — each delivered on time, on budget, and to
            our clients' exacting standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Main feature */}
          <Link
            to={`/projects/${main.id}`}
            className="group relative block overflow-hidden rounded-2xl min-h-[320px] lg:min-h-[540px] ring-1 ring-black/5"
          >
            <img
              src={main.image}
              alt={main.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

            {/* Top-right arrow */}
            <div className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            {/* Top-left badge */}
            <span className="absolute top-5 left-5 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-secondary-foreground shadow-sm">
              {main.category}
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-primary-foreground">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                {main.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {main.location}
                </span>
                {"year" in main && main.year && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                    <span>{main.year}</span>
                  </>
                )}
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-secondary pb-0.5 group-hover:text-secondary transition-colors">
                View project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-4 lg:gap-6">
            {[top, bottom].filter(Boolean).map(project => (
              <Link
                key={project!.id}
                to={`/projects/${project!.id}`}
                className="group relative block overflow-hidden rounded-2xl flex-1 min-h-[220px] lg:min-h-0 ring-1 ring-black/5"
              >
                <img
                  src={project!.image}
                  alt={project!.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />

                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground shadow-sm">
                  {project!.category}
                </span>
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold leading-tight">
                    {project!.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {project!.location}
                    </span>
                    {"year" in project! && project!.year && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-white/50" />
                        <span>{project!.year}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-sm px-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to="/projects">VIEW ALL PROJECTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
