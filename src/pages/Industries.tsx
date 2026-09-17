import { Link } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import { INDUSTRIES, templatesForIndustry } from "@/data/industries";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import { breadcrumbSchema, graph, organizationSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

const Industries = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Industry Websites for Trades & Local Services | Nexora"
        description="Nexora builds websites for construction, roofing, electrical, plumbing, painting, landscaping, auto, real estate, restaurants, barbershops, and retail. Preview a template, then subscribe."
        path="/industries"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/industries",
            title: "Industries Nexora serves",
            description: "Website subscriptions for trades and local service businesses.",
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Industries" }]}
        title="Websites by industry"
        description="Every trade we have a template for. Open an industry to see the layouts we start from, then preview the live demo."
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
        <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(industry => {
            const templates = templatesForIndustry(industry);
            const cover = templates[0];
            return (
              <li key={industry.slug} className="min-w-0">
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-background transition-colors hover:border-foreground/20"
                >
                  <div
                    className="aspect-[16/10] overflow-hidden bg-muted"
                    style={cover ? { backgroundColor: `${cover.accent}22` } : undefined}
                  >
                    {cover ? (
                      <img
                        src={cover.thumbnail}
                        alt=""
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={400}
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {templates.length === 1 ? "1 template" : `${templates.length} templates`}
                    </p>
                    <h2 className="mt-1 text-[15px] font-semibold leading-snug tracking-tight">{industry.name}</h2>
                    <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {industry.lede}
                    </p>
                    <span className="mt-3 text-xs font-semibold underline-offset-4 group-hover:underline">
                      View {industry.navLabel.toLowerCase()}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Live customer sites are on{" "}
          <Link to="/work" className="font-medium text-foreground underline-offset-4 hover:underline">
            our work
          </Link>
          . Template demos use sample companies and live in each industry page and the{" "}
          <Link to="/examples" className="font-medium text-foreground underline-offset-4 hover:underline">
            full gallery
          </Link>
          .
        </p>
      </div>
      <PageCta
        title="See a site in your trade"
        body="Start a project or browse examples. You only subscribe after you have previewed a staged site."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/examples", label: "Browse examples" }}
      />
    </SiteLayout>
  );
};

export default Industries;
