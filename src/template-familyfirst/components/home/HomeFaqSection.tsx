import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const HomeFaqSection = () => {
  const { faqItems, company: COMPANY } = useSiteContent();
  const items = faqItems.slice(0, 6);

  return (
    <section className="section-padding bg-[hsl(var(--flow-soft))]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="text-sm font-sans-brand font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))]">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] leading-tight">
              Common Questions
            </h2>
            <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">
              Straight answers about boilers, emergencies, licensing, and service across Monmouth
              and Ocean County.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-xl border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
              <Link to="/faq">
                View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${i}`}
                  className="ff-card px-4 border-none shadow-sm"
                >
                  <AccordionTrigger className="font-sans-brand font-semibold text-left text-[hsl(var(--primary))] hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans-brand leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-sm text-muted-foreground font-sans-brand">
              Still have questions?{" "}
              <Link to="/contact" className="font-semibold text-[hsl(var(--secondary))] hover:underline">
                Contact {COMPANY.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFaqSection;
