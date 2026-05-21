import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";
import { useTheme } from "@template-landscaping/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const featured = projects.slice(0, 6);

  return (
    <section className="vf-section-pad bg-[hsl(var(--vf-forest-dark))] text-white">
      <div className="container-custom container-inset">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-sans-brand font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-2">
              Our Latest Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Outdoor Transformations</h2>
          </div>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 shrink-0">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {featured.map((p, i) => {
            const img = resolveProjectImage(p.id, p.image);
            const tall = i === 0 || i === 3;
            return (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className={`group relative overflow-hidden rounded-lg vf-card-hover ${tall ? "row-span-2 min-h-[280px] md:min-h-[360px]" : "min-h-[160px] md:min-h-[170px]"}`}
              >
                <img
                  src={img}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-[10px] font-sans-brand font-bold uppercase tracking-wider text-[hsl(var(--secondary))]">
                    {p.category}
                  </p>
                  <h3 className="font-display text-lg md:text-xl font-bold leading-snug mt-1">{p.title}</h3>
                  <p className="text-xs text-white/75 mt-1 font-sans-brand">{p.location}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
