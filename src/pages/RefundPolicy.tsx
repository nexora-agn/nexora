import PolicyPageFooter from "@/components/legal/PolicyPageFooter";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { COMPANY_LEGAL } from "@/lib/companyLegal";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** Discretionary refund request window. */
const REFUND_REQUEST_WINDOW_DAYS = 14;

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
              This Refund policy applies to software subscriptions sold by{" "}
              <span className="font-semibold text-foreground">{COMPANY_LEGAL.legalName}</span>{" "}
              (doing business as{" "}
              <span className="font-semibold text-foreground">{COMPANY_LEGAL.brand}</span>),
              registered in the {COMPANY_LEGAL.registeredJurisdiction} (EIN {COMPANY_LEGAL.ein}).
              We sell recurring subscriptions for hosted business websites, AI website assistants,
              SEO tools, hosting, and related digital features to customers in the United States.
              Checkout and recurring billing are processed by{" "}
              <span className="font-semibold text-foreground">Stripe, Inc.</span>, our third-party
              payment processor, on our behalf.
            </p>
            <p>
              If mandatory consumer protection laws provide you with additional or non-waivable
              rights, those rights apply. Nothing in this policy limits your mandatory consumer
              rights.
            </p>

            <section aria-labelledby="refund-global">
              <h2 id="refund-global" className="text-lg font-semibold tracking-tight text-foreground">
                1. Refund policy
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  For new websites, you can preview your site before activating a subscription. No
                  charge is taken during the preview stage.
                </li>
                <li>
                  Once you approve your website and your subscription begins, fees for the current
                  and any past billing periods are non-refundable, except where required by
                  applicable law.
                </li>
                <li>
                  You can cancel at any time to stop future billing. Cancellation takes effect at
                  the end of your current billing period (see section 4).
                </li>
                <li>
                  Refunds will not be issued where there is evidence of fraud, refund abuse, or
                  other manipulative behavior.
                </li>
                <li>
                  This policy does not affect your rights in relation to features that are not as
                  described, faulty, or not fit for purpose.
                </li>
              </ul>
            </section>

            <section aria-labelledby="refund-discretionary">
              <h2
                id="refund-discretionary"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                2. Discretionary refund requests
              </h2>
              <p className="mt-3">
                If you believe your situation warrants a refund outside the terms above, you may
                submit a request within {REFUND_REQUEST_WINDOW_DAYS} days of the transaction date.
                Submitting a request within this {REFUND_REQUEST_WINDOW_DAYS}-day period does not
                guarantee a refund.
              </p>
              <p className="mt-3">
                We review each request individually. Relevant factors may include the nature of the
                subscription, the reason for the request, and usage during the period. A request may
                be approved in full, approved as a partial refund, or declined.
              </p>
            </section>

            <section aria-labelledby="refund-defects">
              <h2
                id="refund-defects"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                3. Technical or product defects
              </h2>
              <p className="mt-3">
                If you experience persistent technical issues or a material defect that prevents you
                from accessing subscription features as described, contact us first at{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>{" "}
                so we can attempt to resolve the issue. Where there is evidence of a material
                technical or product defect that we are unable to resolve, a refund may be issued in
                accordance with applicable consumer protection laws.
              </p>
            </section>

            <section aria-labelledby="refund-subscriptions">
              <h2
                id="refund-subscriptions"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                4. Subscriptions and cancellation
              </h2>
              <p className="mt-3">
                You can cancel a subscription at any time with effect from the end of your current
                billing period. Your cancellation takes effect at the end of the current billing
                period, and you will not be charged again after that.
              </p>
              <p className="mt-3">
                To cancel, email us at{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>
                , or use any subscription-management link in your Stripe receipt or customer portal
                if available.
              </p>
              <p className="mt-3">
                If a transaction is not eligible for a refund, you may still cancel the subscription
                at any time to prevent future billing.
              </p>
            </section>

            <section aria-labelledby="refund-process">
              <h2
                id="refund-process"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                5. How to request a refund
              </h2>
              <p className="mt-3">To request a refund, use one of the following methods:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  Use any subscription-management or receipt link Stripe provides in your payment
                  confirmation email.
                </li>
                <li>
                  Email us at{" "}
                  <a
                    href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                    className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                  >
                    {COMPANY_LEGAL.contactEmail}
                  </a>{" "}
                  with the email address used at checkout, your order or invoice reference, and a
                  short description of your request.
                </li>
              </ul>
              <p className="mt-3">
                If eligible, refunds will be processed to the original payment method where
                possible and within {REFUND_REQUEST_WINDOW_DAYS} days of approval of the request.
              </p>
            </section>

            <section aria-labelledby="refund-chargebacks">
              <h2
                id="refund-chargebacks"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                6. Chargebacks and payment disputes
              </h2>
              <p className="mt-3">
                We encourage you to contact us before initiating a chargeback or payment dispute
                with your bank or card issuer, so we can try to resolve the matter directly. If you
                initiate a chargeback or payment reversal, access to the relevant subscription may
                be temporarily suspended while the matter is reviewed.
              </p>
            </section>

            <section aria-labelledby="refund-contact">
              <h2
                id="refund-contact"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                7. Contact
              </h2>
              <p className="mt-3">
                Questions about this policy can be sent to{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>
                .
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
