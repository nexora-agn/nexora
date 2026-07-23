import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import CTASection from "@template-tire-shop/components/sections/CTASection";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import { Button } from "@/components/ui/button";

const Process = () => {
  const { company: COMPANY, processSteps: STEPS } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>How It Works | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} — browse, compare, checkout, and get ongoing support for phones, tablets, and watches.`}
        />
      </Helmet>

      <HarborPageHero
        eyebrow="How it works"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Process" }]}
        title="From Browse to Setup"
        body="Whether you shop online or in store, our specialists guide you from comparison to data transfer and beyond."
        image={HOME_BUILDER_IMAGES.processHero}
        imageAlt="Tire service bay"
        dark
      />

      <section className="hb-section-pad section-padding bg-background">
        <div className="container-custom container-inset">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl font-bold text-[hsl(var(--primary))]">
              Your upgrade, step by step
            </h2>
            <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">
              Compare models side by side, stack trade-in credit, choose pickup or delivery, and leave with your apps
              and photos moved to your new device.
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
        title="Ready for your next device?"
        subtitle="Shop the lineup or book an in-store demo with a specialist."
        primaryLabel="SHOP PHONES"
        secondaryLabel="BOOK A DEMO"
      />
    </Layout>
  );
};

export default Process;
