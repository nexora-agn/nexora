import { useEffect } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProjectOnboardingWizard from "@/components/onboarding/ProjectOnboardingWizard";

const StartProject = () => {
  useEffect(() => {
    document.title = "Subscribe | Nexora";
  }, []);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Subscribe" }]}
        title="Subscribe"
        description="Choose a plan, upload your brand details, and complete checkout through Paddle. No payment links or manual invoicing for Starter and Growth."
      />
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <ProjectOnboardingWizard />
      </div>
    </SiteLayout>
  );
};

export default StartProject;
