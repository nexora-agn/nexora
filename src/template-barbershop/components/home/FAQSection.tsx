import Reveal from "@template-barbershop/components/animations/Reveal";
import FAQAccordion from "@template-barbershop/components/sections/FAQAccordion";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";

const FAQSection = () => {
  const { faqItems } = useSiteContent();

  return (
    <section className="luxury-section bg-background">
      <div className="container-custom container-inset max-w-3xl">
        <Reveal direction="up" className="text-center mb-12">
          <p className="luxury-eyebrow mb-4">Good To Know</p>
          <h2 className="luxury-heading">Frequently Asked Questions</h2>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <FAQAccordion items={faqItems.slice(0, 6)} />
        </Reveal>
      </div>
    </section>
  );
};

export default FAQSection;
