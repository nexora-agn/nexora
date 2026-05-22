import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@template-remodeler/components/layout/Layout";
import HarborPageHero from "@template-remodeler/components/sections/HarborPageHero";
import LeadContactSection from "@template-remodeler/components/home/LeadContactSection";
import { useSiteContent } from "@template-remodeler/contexts/SiteContentContext";
import { FINANCING_CONTENT, REMODELER_IMAGES } from "@template-remodeler/data/siteData";
import { Button } from "@/components/ui/button";
import Reveal from "@template-remodeler/components/animations/Reveal";

const Financing = () => {
  const { company: COMPANY } = useSiteContent();
  const content = FINANCING_CONTENT;

  return (
    <Layout>
      <Helmet>
        <title>Financing | {COMPANY.name}</title>
        <meta name="description" content={content.body} />
      </Helmet>

      <HarborPageHero
        dark={false}
        eyebrow={content.eyebrow}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Financing" }]}
        title={content.title}
        eyebrowAfter={content.subtitle}
        body={content.body}
        image={content.image || REMODELER_IMAGES.financing}
        imageAlt="Homeowner reviewing remodeling financing options"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
                Make Essential Repairs Affordable
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed font-sans-brand">
                Water heaters, boilers, and major installations shouldn&apos;t wait because of budget
                concerns. Our financing partners offer flexible plans for qualified homeowners and
                businesses across Central New Jersey.
              </p>
              <ul className="mt-8 space-y-4">
                {content.benefits.map(item => (
                  <li key={item} className="flex items-start gap-3 font-sans-brand">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 rounded-sm font-sans-brand font-semibold"
              >
                <Link to={content.cta.to}>
                  {content.cta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
            <Reveal delay={80}>
              <img
                src={REMODELER_IMAGES.financing}
                alt=""
                className="w-full rounded-sm flow-shadow-card object-cover aspect-[4/3]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default Financing;
