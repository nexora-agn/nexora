import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, User, ArrowLeft } from "lucide-react";
import Layout from "@template-minhs/components/layout/Layout";
import CTASection from "@template-minhs/components/sections/CTASection";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";
import { useTheme } from "@template-minhs/contexts/ThemeContext";

const ProjectDetail = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <Layout>
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-2xl font-bold text-[hsl(var(--primary))]">Project not found</h1>
          <Link to="/projects" className="text-[hsl(var(--secondary))] hover:underline mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  const gallery = project.gallery?.length ? project.gallery : [project.image];

  return (
    <Layout>
      <Helmet>
        <title>{project.title} | {COMPANY.name}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <section className="relative h-[380px] md:h-[480px] overflow-hidden">
        <img
          src={resolveProjectImage(project.id, project.image)}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/95 via-[hsl(var(--primary))]/50 to-[hsl(var(--primary))]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-10 text-white">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-[hsl(var(--secondary))] mb-4 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <span className="inline-flex w-fit rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] px-3 py-1 text-[10px] font-display font-bold uppercase tracking-wider mb-3">
            {project.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wide">{project.title}</h1>
        </div>
      </section>

      <section className="bg-[hsl(var(--minhs-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-4">
              Project Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">{project.description}</p>

            {gallery.length > 0 ? (
              <div className="mt-10">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-4">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((src, idx) => (
                    <div key={src + idx} className="rounded-lg overflow-hidden aspect-[4/3] ring-1 ring-slate-200">
                      <img
                        src={resolveProjectImage(project.id, src)}
                        alt={`${project.title} — photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="bg-[hsl(var(--primary))] text-white rounded-lg p-6 h-fit space-y-5">
            <h3 className="font-display font-bold uppercase tracking-wide text-[hsl(var(--secondary))]">Project Specs</h3>
            {"serviceId" in project && project.serviceId ? (
              <Link
                to={`/services/${project.serviceId}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--secondary))] hover:underline"
              >
                View related service →
              </Link>
            ) : null}
            {[
              { icon: MapPin, label: "Location", value: project.location },
              { icon: Calendar, label: "Year", value: project.year },
              { icon: User, label: "Client", value: project.client },
            ].map(d => (
              <div key={d.label} className="flex items-start gap-3">
                <d.icon className="h-5 w-5 text-[hsl(var(--secondary))] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-display font-bold uppercase tracking-wider text-white/60">{d.label}</p>
                  <p className="text-sm font-semibold mt-0.5">{d.value}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <CTASection
        title="Need similar service for your vehicle?"
        subtitle="Schedule an appointment for European auto repair with transparent estimates in Brooklyn."
      />
    </Layout>
  );
};

export default ProjectDetail;
