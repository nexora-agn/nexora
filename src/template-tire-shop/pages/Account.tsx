import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template-tire-shop/components/layout/Layout";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";

const Account = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Account | {COMPANY.name}</title>
      </Helmet>
      <div className="dealer-header-offset section-padding-inset max-w-lg mx-auto text-center space-y-6">
        <h1 className="font-sans-brand text-3xl font-semibold">Your account</h1>
        <p className="text-muted-foreground">Sign-in and order history are coming soon. For now, track orders via your confirmation email or contact our stores.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-[hsl(var(--secondary))]">
            <Link to="/contact">Contact support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
