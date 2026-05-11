import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";

const PaymentComplete = () => (
  <SiteLayout>
    <PageHeader
      breadcrumb={[{ label: "Home", to: "/" }, { label: "Payment" }]}
      title="Payment received"
      description="Thank you — Paysera notified us about your payment."
    />
    <div className="mx-auto w-full max-w-lg px-6 py-16 text-center">
      <div className="flex justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden />
        </span>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Our team will pick this up from the project dashboard. If you don&apos;t hear from us within one business day, reply to your
        confirmation email or write to{" "}
        <a href="mailto:info@nexora-agn.com" className="font-medium text-foreground underline-offset-4 hover:underline">
          info@nexora-agn.com
        </a>
        .
      </p>
      <Button asChild className="mt-10 h-11 rounded-lg px-8 font-semibold">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  </SiteLayout>
);

export default PaymentComplete;
