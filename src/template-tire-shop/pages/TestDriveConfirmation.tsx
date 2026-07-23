import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Layout from "@template-tire-shop/components/layout/Layout";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";

const TestDriveConfirmation = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Booking Received | {COMPANY.name}</title>
      </Helmet>
      <section className="min-h-[60vh] flex items-center justify-center section-padding bg-white">
        <div className="text-center max-w-md space-y-4">
          <CheckCircle2 className="h-14 w-14 text-[hsl(var(--secondary))] mx-auto" />
          <h1 className="font-display text-3xl font-semibold text-[hsl(var(--primary))]">You&apos;re booked</h1>
          <p className="text-muted-foreground">
            Your tire service request is in. A specialist from {COMPANY.name} will contact you shortly to confirm your
            bay appointment.
          </p>
          <Button asChild className="bg-[hsl(var(--secondary))] hover:brightness-110 text-[hsl(var(--primary))] font-semibold">
            <Link to="/shop">Back to tires</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default TestDriveConfirmation;
