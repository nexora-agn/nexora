import { useEffect } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProjectOnboardingWizard from "@/components/onboarding/ProjectOnboardingWizard";

const StartProject = () => {
  useEffect(() => {
    document.title = "Start a project | Nexora";
  }, []);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Start a project" }]}
        title="Start a project"
        description="Pick a package, upload your logo and brand details, then choose how you’d like to pay. We’ll send a secure payment link right after you submit."
      />
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <ProjectOnboardingWizard />
      </div>
    </SiteLayout>
  );
};

export default StartProject;
