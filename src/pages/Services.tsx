import { Link } from "react-router-dom";
import { ArrowRight, Globe, MessageSquare } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import TemplateThumbCard from "@/components/marketing/TemplateThumbCard";
import { ConversationCard } from "@/components/ai/AiMockCards";
import { aiHeroConversation } from "@/data/nexoraAi";
import { INDUSTRIES, templatesForIndustry } from "@/data/industries";
import { TEMPLATES } from "@/lib/templates";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import { breadcrumbSchema, graph, organizationSchema, serviceSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const websitePreview = TEMPLATES.filter(template => template.available).slice(0, 6);

const Services = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Website & AI Assistant Services | Nexora"
        description="Nexora services: hosted websites for local businesses and an on-site AI assistant for leads and booking. Preview your site, then subscribe from $99/month."
        path="/services"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/services",
            title: "Nexora services",
            description: "Hosted websites and AI assistants for local businesses.",
          }),
          serviceSchema({
            name: "Nexora website subscriptions",
            description: "Hosted websites and on-site AI assistants for local businesses.",
            path: "/services",
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
        title="Services"
        description="Two things we actually sell: a hosted website you can preview, and an AI assistant on that site that captures leads."
      />

      <div className="mx-auto w-full max-w-6xl space-y-20 px-6 py-12 md:py-16">
        <section className="overflow-hidden rounded-3xl border border-border/70 bg-background">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">
                <Globe className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">Hosted business websites</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                A branded, mobile-ready site with lead capture, hosting, and scoped monthly updates.
                You click through a staged preview before you subscribe.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li>Trade-specific templates, then your logo, colors, and services</li>
                <li>Forms, click-to-call, and an assistant on every plan</li>
                <li>Hosting and SSL included with the subscription</li>
              </ul>
              <Link
                to="/services/websites"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
              >
                How website subscriptions work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-muted/40 p-4 sm:grid-cols-3 sm:p-5">
              {websitePreview.map(template => (
                <a
                  key={template.id}
                  href={`/templates/${template.chirpsSlug}`}
                  className="overflow-hidden rounded-xl border border-border/60 bg-background"
                >
                  <img
                    src={template.thumbnail}
                    alt={`${template.name} template preview`}
                    className="aspect-[16/10] h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={200}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-border/70 bg-background">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-0">
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">
                <MessageSquare className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">AI assistant on your website</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                A chat assistant trained on your services, hours, and area. It can capture name and
                phone and help book jobs, including after hours.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li>Answers common questions instead of sending people to a form</li>
                <li>Captures the lead even when the office is closed</li>
                <li>Included with every Nexora plan, with a monthly message limit</li>
              </ul>
              <Link
                to="/ai"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
              >
                See Nexora AI
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="flex justify-center bg-muted/30 px-6 pb-10 pt-2 lg:py-10">
              <ConversationCard {...aiHeroConversation} />
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Templates we have built</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                These are starting layouts we brand for clients. Open a demo, then start a project
                if the structure fits.
              </p>
            </div>
            <Link to="/examples" className="text-sm font-semibold underline-offset-4 hover:underline">
              View all examples
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEMPLATES.filter(template => template.available).map(template => (
              <li key={template.id}>
                <TemplateThumbCard template={template} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Built for these trades</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Each industry page shows the templates and live sites we have in that trade.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map(industry => {
              const cover = templatesForIndustry(industry)[0];
              return (
                <li key={industry.slug}>
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 p-3 transition-colors hover:border-foreground/20"
                  >
                    {cover ? (
                      <img
                        src={cover.thumbnail}
                        alt=""
                        className="h-14 w-20 shrink-0 rounded-lg object-cover object-top"
                        loading="lazy"
                        decoding="async"
                        width={80}
                        height={56}
                      />
                    ) : null}
                    <span>
                      <span className="block font-semibold tracking-tight">{industry.name}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {industry.relatedTemplateSlugs.length === 1
                          ? "1 template"
                          : `${industry.relatedTemplateSlugs.length} templates`}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <PageCta
        title="Start with a preview"
        body="Pick a plan and share your brand. You will see a staged site before the subscription is what you want to keep."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/pricing", label: "View plans" }}
      />
    </SiteLayout>
  );
};

export default Services;
