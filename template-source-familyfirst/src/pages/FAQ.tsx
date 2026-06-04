import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PlumbingPageHero from "@/components/sections/PlumbingPageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ_BY_CATEGORY, FAQ_TABS, FAQ_ITEMS as DEFAULT_FAQ_ITEMS, type FaqTabId } from "@/data/siteData";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const { sectionVisibility, company: COMPANY, faqItems } = useSiteContent();
  const [tab, setTab] = useState<FaqTabId>("general");

  const customized =
    faqItems.length !== DEFAULT_FAQ_ITEMS.length ||
    faqItems.some(
      (it, i) => it.question !== DEFAULT_FAQ_ITEMS[i]?.question || it.answer !== DEFAULT_FAQ_ITEMS[i]?.answer,
    );
  const items = customized ? faqItems : FAQ_BY_CATEGORY[tab];

  return (
    <Layout>
      <Helmet>
        <title>FAQ | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Answers about ${COMPANY.name} plumbing services, emergency dispatch, pricing, permits, and warranties across DFW.`}
        />
      </Helmet>

      <PlumbingPageHero
        eyebrow="FAQ"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        title="Plumbing Questions Answered"
        body="Everything you need to know about our master plumbers, emergency service, panel upgrades, EV chargers, and code-compliant work across Dallas–Fort Worth."
        image="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1400&h=900&q=85"
        imageAlt="Plumbing panel"
      />

      {sectionVisibility["faq.main"] ? (
        <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {!customized ? (
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 border-b border-slate-200 pb-4 mb-8">
                {FAQ_TABS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "font-display text-xs sm:text-sm font-bold tracking-widest pb-2 -mb-px border-b-2 transition-colors uppercase",
                      tab === t.id
                        ? "text-[hsl(var(--secondary))] border-[hsl(var(--secondary))]"
                        : "text-slate-500 border-transparent hover:text-[hsl(var(--primary))]",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            ) : null}

            <Accordion key={tab} type="single" collapsible defaultValue="0" className="w-full">
              {items.map((faq, i) => (
                <AccordionItem key={faq.question} value={String(i)} className="border-slate-200">
                  <AccordionTrigger className="text-left font-display font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] hover:no-underline py-5 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-[15px]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}

      {sectionVisibility["faq.cta"] ? (
        <section className="bg-white py-14 border-t border-slate-200">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-4">
              Still have questions?
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Can&apos;t find what you need? Call our master plumbers or request a free estimate — we&apos;re happy to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-sm px-8 font-display font-bold uppercase border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
              >
                <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}>Call Now</a>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-sm px-8 font-display font-bold uppercase bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90"
              >
                <Link to="/contact">Request Estimate</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
};

export default FAQ;
