import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import HarborPageHero from "@template-dealership/components/sections/HarborPageHero";
import CTASection from "@template-dealership/components/sections/CTASection";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";

const Process = () => {
  const { company: COMPANY, processSteps: STEPS } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Buying Process | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} buying process — browse inventory, compare, test drive, finance, and take delivery in Austin and Central Texas.`}
        />
      </Helmet>

      <HarborPageHero
        eyebrow="How It Works"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Process" }]}
        title="Our Buying Process"
        body="From first search to keys in hand — a clear path for new, used, and certified vehicles with transparent pricing and digital retail tools."
        image={HOME_BUILDER_IMAGES.processHero}
        imageAlt="Customer browsing vehicles at Nexora Motors"
        dark
      />

      <section className="hb-section-pad section-padding bg-background">
        <div className="container-custom container-inset">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl font-bold text-[hsl(var(--primary))]">
              From Browse to Delivery
            </h2>
            <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">
              Whether you start online, already know the model you want, or need help comparing options, Nexora Motors
              meets you where you are — with clear pricing, same-day test drives, and finance support at every step.
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
        title="Ready to find your next vehicle?"
        subtitle="Schedule a visit or test drive — we'll outline inventory matches, payments, and next steps."
        primaryLabel="CONTACT SALES"
        secondaryLabel="BOOK A CALL"
      />
    </Layout>
  );
};

export default Process;
