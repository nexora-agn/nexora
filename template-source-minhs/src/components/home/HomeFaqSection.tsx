import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
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
    <section className="section-padding bg-[hsl(var(--minhs-surface))]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-display font-bold uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-tight">
              Common Questions
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Straight answers about European service, warranties, appointments, and what makes us Brooklyn&apos;s premier dealer alternative.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 rounded-sm border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-display font-bold uppercase tracking-wider"
            >
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
                  className="minhs-card px-4 border border-border bg-white shadow-sm"
                >
                  <AccordionTrigger className="font-display font-semibold text-left text-[hsl(var(--primary))] hover:no-underline py-4 uppercase tracking-wide text-sm">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-sm text-muted-foreground">
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
