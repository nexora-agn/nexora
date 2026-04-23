import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { COMPANY } from "@/data/siteData";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { CheckCircle2 } from "lucide-react";

const benefits = ["Experienced professionals", "On-time project delivery", "Transparent pricing", "Quality materials", "Safety compliance", "Post-project support"];

const ServiceDetail = () => {
  const { services, projects } = useSiteContent();
  const { id } = useParams();
  const service = services.find(s => s.id === id);
  if (!service) return <Layout><div className="section-padding container-custom px-4 md:px-8 text-center"><h1 className="text-2xl font-bold">Service not found</h1><Link to="/services" className="text-primary hover:underline mt-4 block">Back to Services</Link></div></Layout>;

  const related = projects
    .filter(p => p.category !== "Infrastructure")
    .slice(0, 3);

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {COMPANY.name}</title>
        <meta name="description" content={service.description} />
      </Helmet>
      <PageHeader eyebrow="SERVICES" title={service.title} subtitle={service.description} />

      <section className="section-padding">
        <div className="container-custom px-4 md:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">About This Service</h2>
            <p className="text-muted-foreground mb-6">{service.description} We bring decades of experience and a commitment to excellence to every project. Our team works closely with clients to understand their unique needs and deliver results that exceed expectations.</p>
            <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map(b => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <img src={service.image} alt={service.title} className="rounded-lg w-full h-[350px] object-cover" loading="lazy" />
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding bg-muted">
        <div className="container-custom px-4 md:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="group relative overflow-hidden rounded-lg">
                <img src={p.image} alt={p.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4 text-primary-foreground">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm opacity-80">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default ServiceDetail;
