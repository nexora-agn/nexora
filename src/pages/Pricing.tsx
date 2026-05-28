import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PricingSection from "@/components/landing/PricingSection";

const Pricing = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
        title="Pick your lane"
        description="Starter to get live. Growth when you need depth. Custom for anything else."
      />
      <PricingSection embedded={false} />
    </SiteLayout>
  );
};

export default Pricing;
