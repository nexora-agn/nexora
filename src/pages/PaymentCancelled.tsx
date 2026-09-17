import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import PageSeo from "@/components/seo/PageSeo";
import { NOINDEX_ROBOTS } from "@/lib/seo/site";

const PaymentCancelled = () => (
  <SiteLayout>
    <PageSeo
      title="Payment cancelled | Nexora"
      description="Checkout was cancelled. No charge was completed. Return to start your Nexora project when you are ready."
      path="/payment/cancelled"
      robots={NOINDEX_ROBOTS}
    />
    <PageHeader
      breadcrumb={[{ label: "Home", to: "/" }, { label: "Payment" }]}
      title="Payment cancelled"
      description="No charge was completed. Return to checkout and try again when you're ready."
    />
    <div className="mx-auto w-full max-w-lg px-6 py-16 text-center">
      <p className="text-sm leading-relaxed text-muted-foreground">
        If something looked wrong, return to{" "}
        <Link to="/start" className="font-medium text-foreground underline-offset-4 hover:underline">
          checkout
        </Link>{" "}
        or contact{" "}
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
