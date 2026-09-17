import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageSeo from "@/components/seo/PageSeo";
import { NOINDEX_ROBOTS } from "@/lib/seo/site";

const destinations = [
  { to: "/services", label: "Services", body: "Hosted websites and the on-site AI assistant." },
  { to: "/industries", label: "Industries", body: "Templates for every trade we build for." },
  { to: "/work", label: "Our work", body: "Live client sites you can click through." },
  { to: "/pricing", label: "Pricing", body: "Starter, Growth, and Enterprise plans." },
  { to: "/examples", label: "Examples", body: "Interactive demos of our templates." },
  { to: "/contact", label: "Contact", body: "Reach the team if you cannot find a page." },
];

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <SiteLayout>
      <PageSeo
        title="Page not found | Nexora"
        description="This Nexora page does not exist. Return home or browse services, pricing, and contact."
        path={pathname || "/404"}
        robots={NOINDEX_ROBOTS}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Error 404</p>
        <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          This page is not available
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          The address may be outdated, or the page was moved. Continue from home, or pick a
          destination below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-muted"
          >
            Back to home
          </Link>
          <Link
            to="/start"
            className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-foreground/20"
          >
            Start a project
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map(item => (
            <li key={item.to} className="min-w-0">
              <Link
                to={item.to}
                className="group flex h-full flex-col rounded-xl border border-border/70 bg-background px-4 py-4 transition-colors hover:border-foreground/20"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold tracking-tight">{item.label}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
