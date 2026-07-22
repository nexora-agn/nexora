import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import HarborPageHero from "@template-dealership/components/sections/HarborPageHero";
import LeadContactSection from "@template-dealership/components/home/LeadContactSection";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { FINANCING_CONTENT, HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";
import Reveal from "@template-dealership/components/animations/Reveal";

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
        image={content.image || HOME_BUILDER_IMAGES.financing}
        imageAlt="Customer reviewing vehicle financing options"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
                Make Payments Clear and Flexible
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed font-sans-brand">
                New, used, and certified vehicles shouldn&apos;t wait because of budget questions.
                Our finance partners offer competitive rates and flexible plans for qualified buyers
                across Austin and Central Texas.
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
                src={HOME_BUILDER_IMAGES.financing}
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
