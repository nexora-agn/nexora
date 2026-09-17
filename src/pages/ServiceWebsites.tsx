import { Link } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import TemplateThumbCard from "@/components/marketing/TemplateThumbCard";
import { TEMPLATES } from "@/lib/templates";
import { MARKETING_PLANS } from "@/lib/pricingPlans";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  serviceSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/seo/schema";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Websites", path: "/services/websites" },
];

const steps = [
  {
    title: "You bring the brand",
    body: "Logo, colors, services, photos, and the domain you want. If you already have a site, we can plan a migration.",
  },
  {
    title: "We stage a live preview",
    body: "You click through a real site on desktop and mobile — not a static mock. Request changes before you subscribe.",
  },
  {
    title: "You subscribe and we launch",
    body: "Starter and Growth check out online. We point hosting and SSL, and keep scoped updates on the monthly plan.",
  },
];

const ServiceWebsites = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Business Website Design & Hosting Subscriptions | Nexora"
        description="Nexora builds a branded website for your local business, lets you preview it live, then hosts it on a monthly plan from $99. Lead forms, hosting, SSL, and an AI assistant included."
        path="/services/websites"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/services/websites",
            title: "Hosted business websites",
            description: "Preview a branded website, then subscribe for hosting and updates.",
          }),
          serviceSchema({
            name: "Hosted business website",
            description:
              "Branded, mobile-ready website with hosting, SSL, lead capture, and an AI assistant on a monthly subscription.",
            path: "/services/websites",
            includeOffers: true,
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Websites" },
        ]}
        title="Hosted websites for local businesses"
        description="We build the site, you preview it, then you subscribe. No mystery quote, no six-month waterfall."
      />

      <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-12 md:py-16">
        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What you get</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            A responsive website structured for calls and inquiries, hosted with SSL. Lead forms
            are included. An AI assistant is included, with a monthly message limit that matches
            your plan. Growth adds unlimited pages, catalog and pricing sync, and SEO plus Google
            Ads setup. Details live on{" "}
            <Link to="/pricing" className="font-medium text-foreground underline-offset-4 hover:underline">
              pricing
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border/70 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Plans</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {MARKETING_PLANS.map(plan => (
              <li key={plan.id} className="rounded-2xl border border-border/70 p-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-2xl font-bold">
                  {plan.price}
                  <span className="text-sm font-medium text-muted-foreground">{plan.period}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Starting templates</h2>
            <Link to="/examples" className="text-sm font-semibold underline-offset-4 hover:underline">
              Browse all examples
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            We brand one of these for you. Open a demo to see layout and features.
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.filter(template => template.available)
              .slice(0, 8)
              .map(template => (
                <li key={template.id}>
                  <TemplateThumbCard template={template} />
                </li>
              ))}
          </ul>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Who it is for</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Trades and local services that need a trustworthy site without hiring an in-house
            developer. See{" "}
            <Link to="/industries" className="font-medium text-foreground underline-offset-4 hover:underline">
              industry pages
            </Link>
            ,{" "}
            <Link to="/examples" className="font-medium text-foreground underline-offset-4 hover:underline">
              template examples
            </Link>
            , and{" "}
            <Link to="/work" className="font-medium text-foreground underline-offset-4 hover:underline">
              live client sites
            </Link>
            .
          </p>
        </section>
      </div>
      <PageCta
        title="Preview your website"
        body="Start checkout when you have a plan in mind, or contact us if you want a walkthrough first."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/contact", label: "Talk to Nexora" }}
      />
    </SiteLayout>
  );
};

export default ServiceWebsites;
