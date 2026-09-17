import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageSeo from "@/components/seo/PageSeo";
import { COMPANY_LEGAL } from "@/lib/companyLegal";
import { NOINDEX_FOLLOW_ROBOTS } from "@/lib/seo/site";

const nextSteps = [
  "Stripe has confirmed the subscription on their checkout. Nothing else is due on this page.",
  "You will get a confirmation email. Our team starts your website preview from the project details you already shared.",
  "If you used a trial payment link, we will follow up for brand assets (logo, colors, services) within one business day.",
];

const ThankYou = () => {
  const [params] = useSearchParams();
  const paidOnStripe = Boolean(params.get("session_id"));

  return (
    <SiteLayout>
      <PageSeo
        title="Thank you | Subscription confirmed | Nexora"
        description="Thank you for subscribing to Nexora. Your payment was processed by Stripe. We will follow up to stage your website preview."
        path="/thank-you"
        robots={NOINDEX_FOLLOW_ROBOTS}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
            <CheckCircle2 className="h-6 w-6" strokeWidth={2} aria-hidden />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {paidOnStripe ? "Payment confirmed" : "Thank you"}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Thank you for subscribing
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {paidOnStripe
              ? "Your Nexora subscription checkout is complete. Stripe processed the payment on their secure page; this page is your confirmation on nexora-agn.com."
              : "This is the confirmation page customers see after a successful Stripe subscription checkout."}
          </p>
        </div>

        <ol className="mt-10 grid max-w-3xl gap-3">
          {nextSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-xl border border-border/70 bg-background px-4 py-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-3xl rounded-xl border border-border/70 bg-background px-5 py-5">
          <p className="text-sm font-semibold tracking-tight">{COMPANY_LEGAL.legalName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Questions about your subscription? Email{" "}
            <a
              href={`mailto:${COMPANY_LEGAL.contactEmail}`}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {COMPANY_LEGAL.contactEmail}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${COMPANY_LEGAL.phoneTel}`}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {COMPANY_LEGAL.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-muted"
          >
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-foreground/20"
          >
            Contact Nexora
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ThankYou;
