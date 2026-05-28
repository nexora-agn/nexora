import PolicyPageFooter from "@/components/legal/PolicyPageFooter";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { COMPANY_LEGAL } from "@/lib/companyLegal";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const RefundPolicy = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Refund policy" }]}
        title="Refund policy"
        description="Refunds and cancellations for Nexora software subscriptions."
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border/70 bg-muted/15 px-8 py-10 shadow-sm md:px-10 md:py-12">
          <p className="text-sm font-medium text-muted-foreground">
            Last updated: <time dateTime={new Date().toISOString().slice(0, 10)}>{effectiveDate}</time>
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
            <p>
              This Refund policy applies to services sold by{" "}
              <span className="font-semibold text-foreground">{COMPANY_LEGAL.legalName}</span>{" "}
              (doing business as{" "}
              <span className="font-semibold text-foreground">{COMPANY_LEGAL.brand}</span>),
              registered in the {COMPANY_LEGAL.registeredJurisdiction} (EIN{" "}
              {COMPANY_LEGAL.ein}). We sell recurring software subscriptions for hosted business
              websites, AI website assistants, SEO tools, hosting, and related features. Online
              checkout and recurring billing are handled by our payment partner{" "}
              <span className="font-semibold text-foreground">Paddle</span>, which acts as the
              merchant of record.
            </p>

            <section aria-labelledby="refund-general">
              <h2 id="refund-general" className="text-lg font-semibold tracking-tight text-foreground">
                1. General policy
              </h2>
              <p className="mt-3">
                Subscription fees are billed in advance for digital software services. You may cancel
                at any time; access continues through the current billing period. Refund eligibility
                depends on the circumstances below, our subscription terms, Paddle&apos;s buyer terms,
                and applicable consumer protection law.
              </p>
            </section>

            <section aria-labelledby="refund-exceptions">
              <h2
                id="refund-exceptions"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                2. Exceptions
              </h2>
              <p className="mt-3">Refunds may be considered in the following cases:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>You cancel within any applicable cooling-off period before substantial service delivery begins.</li>
                <li>We fail to deliver the subscribed service or product features.</li>
                <li>A duplicate charge or billing error attributable to us or to Paddle.</li>
                <li>Where required by applicable consumer protection law.</li>
              </ul>
            </section>

            <section aria-labelledby="refund-subscriptions">
              <h2
                id="refund-subscriptions"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                3. Subscription-based services
              </h2>
              <p className="mt-3">
                You can cancel your subscription at any time. To cancel, email us at{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>{" "}
                or use any self-service cancellation option provided by Paddle.
              </p>
              <p className="mt-3">
                Cancellation stops future renewals. Partial-period refunds are generally not provided
                after service delivery for that billing period has begun, except where required by
                law or Paddle policy. After cancellation, your access to subscription features ends
                at the close of the current billing period.
              </p>
            </section>

            <section aria-labelledby="refund-process">
              <h2
                id="refund-process"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                4. How to request a refund
              </h2>
              <p className="mt-3">
                Send a refund request to{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>{" "}
                with the email address used at checkout, the order or invoice reference, and a
                short description of the reason. We aim to respond within five (5) business days.
                Approved refunds are processed through Paddle to the original payment method.
              </p>
            </section>

            <section aria-labelledby="refund-contact">
              <h2
                id="refund-contact"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                5. Contact
              </h2>
              <p className="mt-3">
                If you have any questions, contact us at:{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>
              </p>
            </section>
          </div>
          <PolicyPageFooter />
        </div>
      </article>
    </SiteLayout>
  );
};

export default RefundPolicy;
