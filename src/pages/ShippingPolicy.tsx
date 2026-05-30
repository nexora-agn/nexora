import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { COMPANY_LEGAL } from "@/lib/companyLegal";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const ShippingPolicy = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service delivery" }]}
        title="Service delivery"
        description="How Nexora delivers its digital subscriptions and services."
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border/70 bg-muted/15 px-8 py-10 shadow-sm md:px-10 md:py-12">
          <p className="text-sm font-medium text-muted-foreground">
            Last updated: <time dateTime={new Date().toISOString().slice(0, 10)}>{effectiveDate}</time>
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
            <p>
              <span className="font-semibold text-foreground">{COMPANY_LEGAL.brand}</span> provides
              digital software subscriptions and services only. Everything is delivered
              electronically — <span className="font-medium text-foreground">no physical goods are
              shipped</span>, and there are no shipping fees.
            </p>

            <section aria-labelledby="delivery-method">
              <h2
                id="delivery-method"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                1. How we deliver
              </h2>
              <p className="mt-3">Your subscription is delivered electronically through:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Your hosted website, published on the internet</li>
                <li>Your online account and onboarding dashboard</li>
                <li>Email for confirmations, updates, and lead notifications</li>
              </ul>
            </section>

            <section aria-labelledby="delivery-timeline">
              <h2
                id="delivery-timeline"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                2. When delivery happens
              </h2>
              <p className="mt-3">
                For new websites, we prepare a preview for you to review before you activate a
                subscription. Once you approve your website and activate your plan, your
                subscription becomes active immediately and your website is published (typically
                within minutes of activation).
              </p>
              <p className="mt-3">
                Ongoing subscription features — hosting, the AI assistant, SEO, and plan-based
                updates — remain available for as long as your subscription is active.
              </p>
            </section>

            <section aria-labelledby="delivery-access">
              <h2
                id="delivery-access"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                3. Access and cancellation
              </h2>
              <p className="mt-3">
                Access to your subscription continues until you cancel. When you cancel, access to
                subscription features continues until the end of your current billing period. See
                our{" "}
                <a
                  href="/refund-policy"
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  Refund policy
                </a>{" "}
                for cancellation and refund details.
              </p>
            </section>

            <section aria-labelledby="delivery-contact">
              <h2
                id="delivery-contact"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                4. Contact
              </h2>
              <p className="mt-3">
                If you have questions about delivery, contact us at:{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default ShippingPolicy;
