import { useEffect } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProjectOnboardingWizard from "@/components/onboarding/ProjectOnboardingWizard";

const StartProject = () => {
  useEffect(() => {
    document.title = "Start a project — Nexora";
  }, []);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Start a project" }]}
        title="Start a project"
        description="A short, guided flow to capture what you need—whether you are launching fresh or migrating an existing site."
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <ProjectOnboardingWizard />
      </div>
    </SiteLayout>
  );
};

export default StartProject;
