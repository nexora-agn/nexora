import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PricingSection from "@/components/landing/PricingSection";
import PageSeo from "@/components/seo/PageSeo";
import { INDEX_ROBOTS } from "@/lib/seo/site";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  serviceSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/seo/schema";

const Pricing = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Website Pricing | $99–$399/month | Nexora"
        description="Nexora website subscriptions: Starter $99, Growth $199, Enterprise $399 per month. Preview your staged site, then subscribe. Hosting, SSL, and an AI assistant included."
        path="/pricing"
        robots={INDEX_ROBOTS}
        jsonLd={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/pricing",
            title: "Nexora pricing",
            description: "Monthly website subscriptions from $99.",
          }),
          serviceSchema({
            name: "Nexora website subscriptions",
            description: "Hosted websites for local businesses on monthly plans.",
            path: "/pricing",
            includeOffers: true,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
        title="Pricing"
        description="Monthly subscriptions from $99. Preview your staged website, then subscribe when you're ready."
      />
      <PricingSection embedded={false} />
    </SiteLayout>
  );
};

export default Pricing;
