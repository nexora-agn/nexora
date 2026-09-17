import { Link, useParams } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import TemplateThumbCard from "@/components/marketing/TemplateThumbCard";
import NotFound from "@/pages/NotFound";
import { getIndustryBySlug, liveClientsForIndustry, templatesForIndustry } from "@/data/industries";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  serviceSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/seo/schema";

const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug);
  if (!industry) return <NotFound />;

  const live = liveClientsForIndustry(industry);
  const templates = templatesForIndustry(industry);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  return (
    <SiteLayout>
      <PageSeo
        title={industry.metaTitle}
        description={industry.metaDescription}
        path={`/industries/${industry.slug}`}
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: `/industries/${industry.slug}`,
            title: industry.title,
            description: industry.metaDescription,
          }),
          serviceSchema({
            name: industry.title,
            description: industry.metaDescription,
            path: `/industries/${industry.slug}`,
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industries" },
          { label: industry.name },
        ]}
        title={industry.h1}
        description={industry.lede}
      />

      <div className="mx-auto w-full max-w-6xl space-y-14 px-6 py-12 md:py-16">
        {templates.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Templates we have built</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              These are branded examples, not live customer businesses. Open a demo to see the
              layout we can apply to your company.
            </p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map(template => (
                <li key={template.id}>
                  <TemplateThumbCard template={template} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">The problem we solve</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{industry.problem}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">What you get</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {industry.whatYouGet.map(item => (
              <li key={item} className="rounded-xl border border-border/70 px-5 py-4 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">How we start</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{industry.processNote}</p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Related:{" "}
            <Link to={industry.relatedServicePath} className="font-medium text-foreground underline-offset-4 hover:underline">
              hosted websites
            </Link>
            ,{" "}
            <Link to="/ai" className="font-medium text-foreground underline-offset-4 hover:underline">
              AI assistant
            </Link>
            , and{" "}
            <Link to="/pricing" className="font-medium text-foreground underline-offset-4 hover:underline">
              pricing
            </Link>
            .
          </p>
        </section>

        {live.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Live sites in this trade</h2>
            <ul className="mt-5 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {live.map(project => (
                <li key={project.id} className="min-w-0">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-background transition-colors hover:border-foreground/20"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={400}
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-4 py-3.5">
                      <h3 className="text-[15px] font-semibold leading-snug tracking-tight">{project.name}</h3>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <span className="mt-3 text-xs font-semibold underline-offset-4 group-hover:underline">
                        Open live site
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
      <PageCta
        title={`Preview a ${industry.name.toLowerCase()} website`}
        body="Share your logo and services. Subscribe only if you want the staged site to go live."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/contact", label: "Talk to Nexora" }}
      />
    </SiteLayout>
  );
};

export default IndustryPage;
