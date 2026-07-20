import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template-dealership/components/layout/Layout";
import LuxuryCTA from "@template-dealership/components/home/LuxuryCTA";
import { NEW_DEVELOPMENTS } from "@template-dealership/data/siteData";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Developments = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>New Developments | {COMPANY.name}</title>
        <meta name="description" content="Explore pre-construction and new-build luxury developments." />
      </Helmet>

      <section className="bg-[hsl(var(--primary))] text-white pt-32 pb-16">
        <div className="container-custom container-inset">
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-3">Pre-Construction</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium">New Developments</h1>
        </div>
      </section>

      <section className="container-custom container-inset py-16 space-y-16">
        {NEW_DEVELOPMENTS.map(dev => (
          <article key={dev.id} className="grid lg:grid-cols-2 gap-10 items-center border-b border-border pb-16 last:border-0">
            <div className="image-zoom aspect-[16/10]">
              <img src={dev.image} alt={dev.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--secondary))]">{dev.status}</span>
              <h2 className="font-display text-3xl md:text-4xl mt-2 mb-2">{dev.title}</h2>
              <p className="text-muted-foreground mb-6">{dev.location}</p>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Construction Progress</span>
                  <span>{dev.progress}%</span>
                </div>
                <Progress value={dev.progress} className="h-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div><span className="text-muted-foreground">Completion</span><p className="font-medium">{dev.completion}</p></div>
                <div><span className="text-muted-foreground">Starting From</span><p className="font-medium text-[hsl(var(--secondary))]">{dev.priceFrom}</p></div>
                <div><span className="text-muted-foreground">Available</span><p className="font-medium">{dev.unitsAvailable} of {dev.unitsTotal}</p></div>
              </div>
              <Button asChild className="rounded-none bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] uppercase text-xs tracking-wider">
                <Link to="/contact">Request Information</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>

      <LuxuryCTA />
    </Layout>
  );
};

export default Developments;
