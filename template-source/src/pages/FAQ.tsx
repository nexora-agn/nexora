import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/animations/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { COMPANY, FAQ_BY_CATEGORY, FAQ_TABS, type FaqTabId } from "@/data/siteData";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const { sectionVisibility } = useSiteContent();
  const [tab, setTab] = useState<FaqTabId>("projects");
  const items = FAQ_BY_CATEGORY[tab];

  return (
    <Layout>
      <Helmet>
        <title>FAQ — {COMPANY.name}</title>
        <meta
          name="description"
          content={`Answers about ${COMPANY.name} services, pricing, timelines, process, and warranty.`}
        />
      </Helmet>

      <Reveal direction="zoom" duration={650}>
        <PageHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our premium construction services, processes, and standards."
        />
      </Reveal>

      {sectionVisibility["faq.main"] && <Reveal delay={70}>
        <section className="section-padding bg-background">
        <div className="container-custom px-4 md:px-8 max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-border pb-4 mb-8">
            {FAQ_TABS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "text-xs md:text-sm font-bold tracking-widest pb-2 -mb-px border-b-2 transition-colors",
                  tab === t.id ? "text-secondary border-secondary" : "text-muted-foreground border-transparent hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Accordion key={tab} type="single" collapsible defaultValue="0" className="w-full">
            {items.map((faq, i) => (
              <AccordionItem key={faq.question} value={String(i)} className="border-border">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-secondary hover:no-underline py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-[15px]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        </section>
      </Reveal>}

      {sectionVisibility["faq.cta"] && <Reveal delay={110}>
        <section className="section-padding bg-muted/50 border-t border-border">
        <div className="container-custom px-4 md:px-8 max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Can&apos;t find the answer you&apos;re looking for? Please reach out to our team — we&apos;re happy to discuss your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-sm px-8 font-bold border-primary text-primary bg-background">
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}>BOOK A CALL</a>
            </Button>
            <Button asChild size="lg" className="rounded-sm px-8 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/contact">REQUEST ESTIMATE</Link>
            </Button>
          </div>
        </div>
        </section>
      </Reveal>}

    </Layout>
  );
};

export default FAQ;
