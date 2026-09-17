import { Link } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import TemplateThumbCard from "@/components/marketing/TemplateThumbCard";
import { INDUSTRIES, templatesForIndustry } from "@/data/industries";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import { breadcrumbSchema, graph, organizationSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Examples", path: "/examples" },
];

const Examples = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Website Template Examples by Industry | Nexora"
        description="Browse Nexora industry website templates for construction, roofing, plumbing, electrical, auto, restaurants, and more. These are demos, not live customer businesses."
        path="/examples"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/examples",
            title: "Nexora website template examples",
            description: "Industry website templates used as starting points for Nexora subscriptions.",
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Examples" }]}
        title="Industry website examples"
        description="Interactive demos of the templates we brand for clients. They use sample companies. Live customer sites are on the work page."
      />

      <div className="mx-auto w-full max-w-6xl space-y-14 px-6 py-12 md:py-16">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Demos are for evaluating layout and features. They are not indexed as independent
          businesses. For real launches, see{" "}
          <Link to="/work" className="font-medium text-foreground underline-offset-4 hover:underline">
            our work
          </Link>
          .
        </p>
        {INDUSTRIES.map(industry => {
          const templates = templatesForIndustry(industry).filter(template => template.available);
          if (templates.length === 0) return null;
          return (
            <section key={industry.slug}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl font-bold tracking-tight">{industry.name}</h2>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="text-sm font-semibold underline-offset-4 hover:underline"
                >
                  {industry.navLabel} page
                </Link>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map(template => (
                  <li key={template.id}>
                    <TemplateThumbCard template={template} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <PageCta
        title="Use one of these as your starting point"
        body="Tell us your trade and brand. We stage a preview, then you subscribe if you want it live."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/industries", label: "Browse industries" }}
      />
    </SiteLayout>
  );
};

export default Examples;
