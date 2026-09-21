import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MarketingFaq } from "@/data/marketingFaqs";

type PageFaqProps = {
  items: MarketingFaq[];
  title?: string;
};

const PageFaq = ({ items, title = "Common questions" }: PageFaqProps) => {
  return (
    <section aria-labelledby="page-faq-heading">
      <h2 id="page-faq-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <Accordion type="single" collapsible className="mt-6 w-full">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base font-semibold text-foreground">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default PageFaq;
