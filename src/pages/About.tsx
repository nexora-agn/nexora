import { Link } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import { COMPANY_LEGAL, COMPANY_OFFICES } from "@/lib/companyLegal";
import { COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL, INDEX_ROBOTS } from "@/lib/seo/site";
import { breadcrumbSchema, graph, organizationSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const About = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="About Nexora | Hosted Websites for Local Businesses"
        description="Nexora is NEXORA AGENCY 029 LLC. We build hosted websites for local businesses: you preview a live staged site, then subscribe. Offices in the United States, Kosovo, and Bahrain."
        path="/about"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/about",
            title: "About Nexora",
            description: "Who Nexora is, what we sell, and how to contact us.",
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
        title="About Nexora"
        description="We build hosted websites for local businesses. You preview the live site, then you decide whether to subscribe."
      />

      <div className="mx-auto w-full max-w-6xl space-y-14 px-6 py-12 md:py-16">
        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What we do</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Nexora sells monthly website subscriptions, not one-off agency retainers with hidden
            quotes. Starter, Growth, and Enterprise plans are published on{" "}
            <Link to="/pricing" className="font-medium text-foreground underline-offset-4 hover:underline">
              pricing
            </Link>
            . The process is the same: we brand a site for your trade, you click through a staged
            preview, and you subscribe if you want it live.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Included in the subscription: hosting, SSL, scoped updates, and an on-site AI assistant
            with a message limit that matches the plan. Growth adds catalog and pricing sync plus SEO
            and Google Ads setup. Read the product pages for{" "}
            <Link to="/services/websites" className="font-medium text-foreground underline-offset-4 hover:underline">
              websites
            </Link>{" "}
            and the{" "}
            <Link to="/ai" className="font-medium text-foreground underline-offset-4 hover:underline">
              AI assistant
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Who we serve</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Owner-operators and small teams in trades and local services: roofing, electrical,
            plumbing, construction, automotive, painting, lawn, and similar businesses. See{" "}
            <Link to="/industries" className="font-medium text-foreground underline-offset-4 hover:underline">
              industries
            </Link>{" "}
            and live launches on{" "}
            <Link to="/work" className="font-medium text-foreground underline-offset-4 hover:underline">
              our work
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">The company</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            The contracting entity is <span className="font-medium text-foreground">{COMPANY_LEGAL.legalName}</span>, a{" "}
            {COMPANY_LEGAL.legalForm} registered in the {COMPANY_LEGAL.registeredJurisdiction}. EIN{" "}
            {COMPANY_LEGAL.ein}. Policies on this site are governed by {COMPANY_LEGAL.governingLaw}.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Kosovo and Bahrain are operating offices listed for contact and locality. They are not
            separate contracting parties for checkout on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Offices and contact</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {COMPANY_OFFICES.map(office => (
              <address key={office.key} className="not-italic rounded-2xl border border-border/70 bg-muted/20 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {office.label}
                </p>
                <div className="mt-3 space-y-1 text-sm leading-relaxed text-foreground">
                  {office.addressLines.map(line => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </address>
            ))}
          </div>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            <li>
              Email:{" "}
              <a className="font-medium text-foreground underline-offset-4 hover:underline" href={`mailto:${COMPANY_LEGAL.contactEmail}`}>
                {COMPANY_LEGAL.contactEmail}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="font-medium text-foreground underline-offset-4 hover:underline" href={`tel:${COMPANY_PHONE_TEL}`}>
                {COMPANY_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <Link to="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
                Contact form
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <PageCta
        title="Preview a site for your business"
        body="Share your brand, pick a plan, and go through checkout when you are ready. Or talk to us first."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/contact", label: "Talk to Nexora" }}
      />
    </SiteLayout>
  );
};

export default About;
