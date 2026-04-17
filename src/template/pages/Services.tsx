import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template/components/layout/Layout";
import PageHeader from "@template/components/sections/PageHeader";
import CTASection from "@template/components/sections/CTASection";
import {
  COMPANY,
  COMMERCIAL_FITOUT_CARDS,
  SERVICES_PAGE_INTRO,
} from "@template/data/siteData";
import { useSiteContent } from "@template/contexts/SiteContentContext";
import Reveal from "@template/components/animations/Reveal";
import { ArrowRight, Building2, Hammer, ClipboardList, Ruler, Paintbrush, Leaf, Check, Zap, Package, FileText } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Hammer,
  ClipboardList,
  Ruler,
  Paintbrush,
  Leaf,
};

const fitoutIcons = { Zap, Package, FileText } as const;

const Services = () => {
  const { services, serviceSections: deepDives, sectionVisibility } = useSiteContent();

  return (
    <Layout>
    <Helmet>
      <title>Our Services — {COMPANY.name}</title>
      <meta name="description" content={`${COMPANY.name} — design-build, renovations, commercial, and advisory services.`} />
    </Helmet>

    <Reveal direction="zoom" duration={650}>
      <PageHeader eyebrow="SERVICES" title="Our Services" subtitle={SERVICES_PAGE_INTRO} />
    </Reveal>

    {sectionVisibility["services.grid"] && <Reveal delay={70}>
      <section className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => {
            const Icon = iconMap[service.icon] || Building2;
            return (
              <article
                key={service.id}
                className="rounded-xl border border-border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["services.deepDives"] && deepDives.map((block, index) => (
      <Reveal key={block.id} delay={100 + index * 40}>
        <section className="section-padding bg-muted/30 border-t border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-secondary mb-2">{block.category}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{block.title}</h2>
              <p className="text-xs font-bold tracking-widest text-foreground/80 mb-6">{block.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{block.body[0]}</p>
              <p className="text-muted-foreground leading-relaxed">{block.body[1]}</p>
            </div>
            <div className="space-y-6">
              <img src={block.image} alt="" className="w-full rounded-2xl object-cover h-[280px] shadow-lg" loading="lazy" />
              <div className="rounded-xl bg-muted border border-border p-6 md:p-8">
                <h3 className="text-sm font-black tracking-[0.2em] text-foreground mb-4">INCLUSION</h3>
                <ul className="space-y-3">
                  {block.inclusions.map(line => (
                    <li key={line} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        </section>
      </Reveal>
    ))}

    {sectionVisibility["services.fitouts"] && <Reveal delay={180}>
      <section className="section-padding bg-background border-t border-border">
      <div className="container-custom px-4 md:px-8">
        <h2 className="text-center text-sm font-black tracking-[0.25em] text-foreground mb-10">COMMERCIAL FIT-OUTS</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {COMMERCIAL_FITOUT_CARDS.map(card => {
            const Icon = fitoutIcons[card.icon as keyof typeof fitoutIcons];
            return (
              <article key={card.id} className="text-center rounded-xl border border-border p-8 bg-card">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </article>
            );
          })}
        </div>
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["services.cta"] && <Reveal delay={220}>
      <CTASection
        title="Planning a new build or renovation?"
        subtitle="Share your goals — we’ll propose a realistic path, budget band, and timeline."
        primaryLabel="REQUEST ESTIMATE"
        secondaryLabel="BOOK A CALL"
      />
    </Reveal>}
    </Layout>
  );
};

export default Services;
