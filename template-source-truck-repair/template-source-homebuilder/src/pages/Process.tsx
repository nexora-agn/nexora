import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import HarborPageHero from "@template-truck-repair/components/sections/HarborPageHero";
import CTASection from "@template-truck-repair/components/sections/CTASection";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { HOME_BUILDER_IMAGES } from "@template-truck-repair/data/siteData";
import { Button } from "@/components/ui/button";

const Process = () => {
  const { company: COMPANY, processSteps: STEPS } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Design-Build Process | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} design-build process — consultation, design, permits, construction, and walkthrough for custom homes in Central New Jersey.`}
        />
      </Helmet>

      <HarborPageHero
        eyebrow="Design-Build"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Process" }]}
        title="Our Design-Build Process"
        body="As a second-generation firm, we've refined a proven path from first conversation to keys in your hand — tailored to your lot, architect, and budget."
        image={HOME_BUILDER_IMAGES.processHero}
        imageAlt="Architectural plans and custom home design"
        dark
      />

      <section className="hb-section-pad section-padding bg-background">
        <div className="container-custom container-inset">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl font-bold text-[hsl(var(--primary))]">
              From Concept to Completion
            </h2>
            <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">
              Whether you are starting from scratch, already own land, or are working with an architect, HarborStone
              meets you where you are — with one accountable team and transparent communication at every milestone.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.id}
                className="rounded-sm border border-border bg-card p-6 hb-card-hover"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/15 font-display text-lg font-bold text-[hsl(var(--secondary))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-[hsl(var(--primary))]">{step.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-sans-brand leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="font-display font-bold uppercase tracking-wide">
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to start your custom home?"
        subtitle="Schedule a complimentary consultation — we'll outline scope, timeline, and next steps."
        primaryLabel="REQUEST CONSULTATION"
        secondaryLabel="BOOK A CALL"
      />
    </Layout>
  );
};

export default Process;
