import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProjectOnboardingWizard from "@/components/onboarding/ProjectOnboardingWizard";
import PageSeo from "@/components/seo/PageSeo";
import { NOINDEX_FOLLOW_ROBOTS } from "@/lib/seo/site";

const StartProject = () => {
  return (
    <SiteLayout>
      <PageSeo
        title="Start your project | Nexora"
        description="Choose a Nexora plan, share your brand details, and complete secure checkout for a hosted website subscription."
        path="/start"
        robots={NOINDEX_FOLLOW_ROBOTS}
      />
      <PageHeader
        compact
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Start your project" }]}
        title="Start your project"
        description="Choose a plan, share your brand colours and kickoff details, and complete secure checkout. No payment links or manual invoicing for Starter and Growth."
      />
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-8 md:pb-16">
        <ProjectOnboardingWizard />
      </div>
    </SiteLayout>
  );
};

export default StartProject;
