import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CTASection from "@/components/sections/CTASection";
import { COMPANY } from "@/data/siteData";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { MapPin, Calendar, User, DollarSign, ArrowLeft } from "lucide-react";

const ProjectDetail = () => {
  const { projects } = useSiteContent();
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  if (!project) return <Layout><div className="section-padding container-custom px-4 md:px-8 text-center"><h1 className="text-2xl font-bold">Project not found</h1><Link to="/projects" className="text-primary hover:underline mt-4 block">Back to Projects</Link></div></Layout>;

  return (
    <Layout>
      <Helmet>
        <title>{project.title} | {COMPANY.name}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Hero image */}
      <section className="relative h-[400px] md:h-[500px]" style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative container-custom px-4 md:px-8 h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <Link to="/projects" className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4"><ArrowLeft className="h-4 w-4" />Back to Projects</Link>
          <span className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded w-fit mb-3">{project.category}</span>
          <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 md:px-8 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
          <div className="bg-muted rounded-lg p-6 space-y-4 h-fit">
            <h3 className="font-semibold text-foreground mb-4">Project Details</h3>
            {[
              { icon: MapPin, label: "Location", value: project.location },
              { icon: Calendar, label: "Year", value: project.year },
              { icon: User, label: "Client", value: project.client },
              { icon: DollarSign, label: "Value", value: project.value },
            ].map(d => (
              <div key={d.label} className="flex items-start gap-3">
                <d.icon className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="text-sm font-medium text-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default ProjectDetail;
