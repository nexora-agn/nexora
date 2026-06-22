import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@template-luxury-real-estate/components/layout/Layout";
import LeadContactSection from "@template-luxury-real-estate/components/home/LeadContactSection";
import { useSiteContent } from "@template-luxury-real-estate/contexts/SiteContentContext";
import { useTheme } from "@template-luxury-real-estate/contexts/ThemeContext";
import { getServiceIcon } from "@template-luxury-real-estate/lib/serviceIcons";
import { HOME_BUILDER_IMAGES } from "@template-luxury-real-estate/data/siteData";

const Services = () => {
  const { services, servicesPageIntro, company: COMPANY, commercialFitoutCards } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Design-Build Custom Home Services | {COMPANY.name}</title>
        <meta name="description" content={servicesPageIntro} />
      </Helmet>

      <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-[hsl(var(--primary))]">
        <img
          src={HOME_BUILDER_IMAGES.crewWorking}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative container-custom container-inset py-16 lg:py-20 text-[hsl(var(--primary-foreground))]">
          <p className="text-[11px] font-sans-brand font-bold tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
            Design-Build Services
          </p>
          <h1 className="font-display text-4xl sm:text-5xl max-w-3xl leading-tight mb-4">
            Design-Build Custom Home Services
          </h1>
          <p className="max-w-2xl text-[hsl(var(--primary-foreground)/0.88)] font-sans-brand leading-relaxed">
            {servicesPageIntro}
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[hsl(var(--flow-cream))]">
        <div className="container-custom container-inset">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, index) => {
              const Icon = getServiceIcon(svc.icon);
              const img = resolveServiceImage(svc.id, svc.image);
              return (
                <Link
                  key={svc.id}
                  to={`/services/${svc.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white card-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img}
                      alt={svc.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-display text-xl text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans-brand mt-2 leading-relaxed flex-1">
                      {svc.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-sans-brand font-bold text-[hsl(var(--secondary))]">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[hsl(var(--flow-sage))]/50 border-y border-border">
        <div className="container-custom container-inset">
          <h2 className="font-display text-2xl sm:text-3xl text-[hsl(var(--primary))] text-center mb-10">
            Common Property Concerns We Solve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {commercialFitoutCards.map(card => {
              const Icon = getServiceIcon(card.icon);
              return (
                <article key={card.id} className="rounded-xl bg-white border border-border p-5 text-center card-lift">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] mb-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-sans-brand font-bold text-sm text-[hsl(var(--primary))]">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default Services;
