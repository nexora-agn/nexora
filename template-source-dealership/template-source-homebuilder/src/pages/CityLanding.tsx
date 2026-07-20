import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import LeadContactSection from "@template-dealership/components/home/LeadContactSection";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { getSeoCity } from "@template-dealership/data/seoCities";
import { HOME_BUILDER_IMAGES, SERVICES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";
import NotFound from "@template-dealership/pages/NotFound";

const CityLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? getSeoCity(slug) : undefined;
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  if (!city) return <NotFound />;

  const heroImage = HOME_BUILDER_IMAGES[city.imageKey] ?? HOME_BUILDER_IMAGES.customHome;
  const featuredServices = SERVICES.filter(s =>
    city.services.some(label => s.title.toLowerCase().includes(label.split(" ")[0].toLowerCase())),
  ).slice(0, 6);
  const servicesToShow = featuredServices.length > 0 ? featuredServices : SERVICES.slice(0, 6);

  return (
    <Layout>
      <Helmet>
        <title>
          {city.headline} | {COMPANY.name}
        </title>
        <meta name="description" content={city.intro} />
      </Helmet>

      <section className="relative bg-[hsl(var(--hb-cream))] overflow-hidden">
        <div className="container-custom section-padding grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-sans-brand font-semibold tracking-[0.2em] uppercase text-[hsl(var(--secondary))]">
              {city.county}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] leading-tight">
              {city.headline}
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed font-sans-brand text-lg">
              {city.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[hsl(var(--primary))] rounded-sm font-sans-brand">
                <Link to="/contact">
                  Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-sm font-sans-brand">
                <a href={phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden border border-border aspect-[4/3]">
            <img
              src={heroImage}
              alt={`Custom home builder in ${city.name}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-y border-border">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-[hsl(var(--primary))]">
            Popular Services in {city.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {city.services.map(s => (
              <li
                key={s}
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-[hsl(var(--hb-cream))] px-4 py-2 text-sm font-sans-brand"
              >
                <MapPin className="h-4 w-4 text-[hsl(var(--secondary))]" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-[hsl(var(--hb-cream))]">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] text-center">
            Design-Build Services in {city.name}
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesToShow.map(s => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className="group rounded-sm border border-border bg-white p-6 hover:border-[hsl(var(--secondary))]/40 transition-colors"
              >
                <h3 className="font-display text-lg font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground font-sans-brand">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default CityLanding;
