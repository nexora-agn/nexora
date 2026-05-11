import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";

const PaymentCancelled = () => (
  <SiteLayout>
    <PageHeader
      breadcrumb={[{ label: "Home", to: "/" }, { label: "Payment" }]}
      title="Payment cancelled"
      description="No charge was completed. You can try again from the link we emailed you."
    />
    <div className="mx-auto w-full max-w-lg px-6 py-16 text-center">
      <p className="text-sm leading-relaxed text-muted-foreground">
        If something looked wrong or you need a new link, contact{" "}
        <a href="mailto:info@nexora-agn.com" className="font-medium text-foreground underline-offset-4 hover:underline">
          info@nexora-agn.com
        </a>
        .
      </p>
      <Button asChild variant="outline" className="mt-10 h-11 rounded-lg px-8 font-semibold">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  </SiteLayout>
);

export default PaymentCancelled;
