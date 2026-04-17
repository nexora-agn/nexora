import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const featuredProjects = projects.slice(0, 3);
  const [main, ...rest] = featuredProjects;
  const [top, bottom] = rest;

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom px-4 md:px-8">
        <p className="text-sm font-bold tracking-[0.2em] text-secondary mb-2">PORTFOLIO</p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 md:mb-12">Signature Projects</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Link
            to={`/projects/${main.id}`}
            className="group relative block overflow-hidden rounded-2xl min-h-[320px] lg:min-h-[520px]"
          >
            <img
              src={main.image}
              alt={main.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-primary-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{main.category}</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-1">{main.title}</h3>
              <p className="text-sm opacity-90 mt-1">{main.location}</p>
              <span className="mt-4 inline-block text-sm font-semibold border-b-2 border-secondary pb-0.5 group-hover:text-secondary transition-colors">
                View Project
              </span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-primary-foreground">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{project!.category}</span>
                  <h3 className="text-xl font-bold mt-1">{project!.title}</h3>
                  <p className="text-sm opacity-90">{project!.location}</p>
                  <span className="mt-3 inline-block text-sm font-semibold border-b-2 border-secondary pb-0.5">
                    View Project
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg" className="rounded-sm px-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/projects">VIEW ALL PROJECTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
