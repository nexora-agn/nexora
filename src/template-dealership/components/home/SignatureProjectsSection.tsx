import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { useTheme } from "@template-dealership/contexts/ThemeContext";

/** Editorial portfolio grid on light background — not dark masonry like landscaping */
const SignatureProjectsSection = () => {
  const { projects } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const featured = projects.slice(0, 6);
  const [lead, ...rest] = featured;

  return (
    <section className="hb-section-pad bg-[hsl(var(--hb-warm-white))]">
      <div className="container-custom container-inset">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-2">
              Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase">
              Featured Vehicles
            </h2>
            <p className="mt-3 text-muted-foreground font-sans-brand max-w-lg">
              Austin, Round Rock, Cedar Park, and San Marcos — new, used, and certified inventory worth a closer look.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 h-11 px-6 border-2 border-[hsl(var(--primary))] font-display text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors shrink-0"
          >
            View Showcase
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {lead && (
          <Link
            to={`/projects/${lead.id}`}
            className="group grid md:grid-cols-2 gap-0 border border-border bg-white mb-4 hb-card-hover overflow-hidden"
          >
            <div className="aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden">
              <img
                src={resolveProjectImage(lead.id, lead.image)}
                alt={lead.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))]">
                {lead.category}
              </span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[hsl(var(--primary))]">
                {lead.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-sans-brand">{lead.location}</p>
              <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">{lead.description}</p>
            </div>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map(p => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="group border border-border bg-white overflow-hidden hb-card-hover"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={resolveProjectImage(p.id, p.image)}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-display font-semibold uppercase tracking-wider text-[hsl(var(--secondary))]">
                  {p.category}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-[hsl(var(--primary))]">{p.title}</h3>
                <p className="text-xs text-muted-foreground font-sans-brand mt-1">{p.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
