import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FaqItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={item.question}
          value={`item-${i}`}
          className="border border-border bg-white px-6 data-[state=open]:border-[hsl(var(--secondary))]"
        >
          <AccordionTrigger className="font-display text-base sm:text-lg uppercase text-left hover:no-underline py-5">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
