import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { useTheme } from "@template-summit/contexts/ThemeContext";

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const recentProjects = projects.slice(0, 4);

  if (!recentProjects.length) return null;

  return (
    <section className="bg-background section-padding">
      <div className="container-custom px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-primary uppercase tracking-tight leading-[1.05]">
            Recent Construction Projects
          </h2>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary hover:text-secondary transition-colors uppercase"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {recentProjects.map(project => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg ring-1 ring-black/5 mb-4 aspect-[4/3]">
                <img
                  src={resolveProjectImage(project.id, project.image)}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <h3 className="text-base md:text-lg font-extrabold text-primary uppercase tracking-tight group-hover:text-secondary transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.location}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary hover:text-secondary transition-colors uppercase"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
