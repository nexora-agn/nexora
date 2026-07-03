import { Helmet } from "react-helmet-async";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import FAQAccordion from "@template-barbershop/components/sections/FAQAccordion";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";

const FAQ = () => {
  const { faqItems } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>FAQ | {COMPANY.name}</title>
        <meta name="description" content="Answers to common questions about booking, walk-ins, payment, and more." />
      </Helmet>

      <PageHeader eyebrow="Good to Know" title="Frequently Asked Questions" subtitle="Everything you need to know before your visit." image={BARBERSHOP_IMAGES.chairs} variant="compact" />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset max-w-3xl">
          <Reveal direction="up">
            <FAQAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default FAQ;
