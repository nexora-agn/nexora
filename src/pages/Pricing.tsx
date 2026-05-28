import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PricingSection from "@/components/landing/PricingSection";

const Pricing = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
        title="Pricing"
        description="Monthly subscriptions from $199. Preview your staged website, then subscribe through secure Paddle checkout."
      />
      <PricingSection embedded={false} />
    </SiteLayout>
  );
};

export default Pricing;
