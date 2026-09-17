import { Link } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageCta from "@/components/layout/PageCta";
import PageSeo from "@/components/seo/PageSeo";
import { customerProjects } from "@/data/customerProjects";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import { breadcrumbSchema, graph, organizationSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

const Work = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Our Work | Live Client Websites | Nexora"
        description="Live websites Nexora has launched for roofing, construction, electrical, painting, lawn, and home-service companies. Click through real sites, not mockups."
        path="/work"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/work",
            title: "Nexora client websites",
            description: "Live websites launched for local service businesses.",
          }),
          breadcrumbSchema(crumbs),
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Our work" }]}
        title="Live websites we have launched"
        description="These are production sites. Open them. Template demos live separately in examples and are not customer businesses."
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
        <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customerProjects.map(project => (
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {project.category}
                  </p>
                  <h2 className="mt-1 text-[15px] font-semibold leading-snug tracking-tight">{project.name}</h2>
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
        <p className="mt-8 text-sm text-muted-foreground">
          Want a similar structure in your trade? See{" "}
          <Link to="/industries" className="font-medium text-foreground underline-offset-4 hover:underline">
            industries
          </Link>{" "}
          or{" "}
          <Link to="/services/websites" className="font-medium text-foreground underline-offset-4 hover:underline">
            how website subscriptions work
          </Link>
          .
        </p>
      </div>
      <PageCta
        title="Get a staged preview of your brand"
        body="We apply your logo and services to a trade template. You subscribe if you want it live."
        primary={{ to: "/start", label: "Start your project" }}
        secondary={{ to: "/contact", label: "Talk to Nexora" }}
      />
    </SiteLayout>
  );
};

export default Work;
