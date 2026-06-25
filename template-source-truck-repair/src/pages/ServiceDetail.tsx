import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import LuxuryCTA from "@template-truck-repair/components/home/LuxuryCTA";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { useTheme } from "@template-truck-repair/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const ServiceDetail = () => {
  const { services, serviceSections, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const { id } = useParams();
  const service = services.find(s => s.id === id);
  const section = serviceSections.find(s => s.id === id);

  if (!service) {
    return (
      <Layout>
        <div className="py-32 text-center container-custom">
          <h1 className="font-display text-2xl">Service not found</h1>
          <Link to="/services" className="text-[hsl(var(--secondary))] mt-4 inline-block">Back to Services</Link>
        </div>
      </Layout>
    );
  }

  const inclusions = section?.inclusions || ["Dedicated advisor", "Market analysis", "Private viewings", "Negotiation support"];

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {COMPANY.name}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <section className="relative pt-32 pb-20 bg-[hsl(var(--primary))] text-white">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-4">Luxury Advisory</p>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-6">{service.title}</h1>
            <p className="text-white/75 text-lg font-light leading-relaxed mb-8">{service.description}</p>
            <Button asChild className="rounded-none bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 uppercase text-xs tracking-wider h-12 px-8">
              <Link to="/contact">Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="image-zoom aspect-[4/3]">
            <img src={resolveServiceImage(service.id, service.image)} alt={service.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="luxury-subheading mb-6">What We Offer</h2>
            {section ? (
              <>
                <p className="text-muted-foreground leading-relaxed mb-4">{section.body[0]}</p>
                <p className="text-muted-foreground leading-relaxed">{section.body[1]}</p>
              </>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            )}
          </div>
          <div>
            <h3 className="font-display text-xl mb-6">Included Services</h3>
            <ul className="space-y-4">
              {inclusions.map(item => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <LuxuryCTA />
    </Layout>
  );
};

export default ServiceDetail;
