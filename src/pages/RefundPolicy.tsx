import PolicyPageFooter from "@/components/legal/PolicyPageFooter";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { COMPANY_LEGAL } from "@/lib/companyLegal";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** Discretionary refund request window — aligned with our merchant-of-record refund policy. */
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
              Checkout, invoicing, and recurring billing are handled by our payment partner, which
              acts as the merchant of record for these transactions.
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
                  Unless required by applicable law, all transactions are non-refundable and
                  non-exchangeable.
                </li>
                <li>
                  Our payment partner may issue refunds on a discretionary basis, or where you
                  exercise an applicable statutory refund right.
                </li>
                <li>
                  Refunds will not be issued where there is evidence of fraud, refund abuse, or
                  other manipulative behavior.
                </li>
                <li>
                  This policy does not affect consumer rights in relation to products or services
                  that are not as described, faulty, or not fit for purpose.
                </li>
                <li>
                  Refund requests must be made within the applicable period described in this
                  policy.
                </li>
                <li>
                  If you receive a refund in accordance with this policy, access to the relevant
                  subscription features will cease.
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
                Our payment partner may, at its sole discretion, issue a refund if a request is
                submitted within {REFUND_REQUEST_WINDOW_DAYS} days of your transaction date.
                Submitting a request within this {REFUND_REQUEST_WINDOW_DAYS}-day period does not
                guarantee a refund.
              </p>
              <p className="mt-3">
                All refund requests are reviewed on a case-by-case basis. Relevant factors may
                include the nature of the subscription, the reason for the request, usage or
                consumption during the period, and the terms of your subscription. A refund may be
                approved in full, approved as a partial refund, or declined.
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
                so we can attempt to resolve the issue. If the issue cannot be resolved, contact our
                payment partner using the method described in section 5 below and provide details of
                the issue and any response you received from us. Where there is evidence of a
                material technical or product defect, a refund may be issued in accordance with
                applicable consumer protection laws.
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
                You may cancel through the self-service options in your transaction confirmation
                email or receipt, or by contacting us at{" "}
                <a
                  href={`mailto:${COMPANY_LEGAL.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {COMPANY_LEGAL.contactEmail}
                </a>
                .
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
                  Use the receipt or subscription management options in your transaction
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
                We encourage you to contact us or our payment partner before initiating a chargeback
                or payment dispute with your bank or card issuer. If you initiate a chargeback or
                payment reversal, access to the relevant subscription may be temporarily suspended
                while the matter is reviewed.
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
