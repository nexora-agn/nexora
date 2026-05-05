import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";

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
        description="Our policy on refunds and cancellations for Nexora services."
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border/70 bg-muted/15 px-8 py-10 shadow-sm md:px-10 md:py-12">
          <p className="text-sm font-medium text-muted-foreground">
            Last updated: <time dateTime={new Date().toISOString().slice(0, 10)}>{effectiveDate}</time>
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
            <p>
              At <span className="font-semibold text-foreground">Nexora</span>, we provide digital
              services and custom-built websites.
            </p>

            <section aria-labelledby="refund-general">
              <h2
                id="refund-general"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                1. General policy
              </h2>
              <p className="mt-3">
                Due to the nature of our services, all payments are generally{" "}
                <span className="font-semibold text-foreground">non-refundable</span> once the
                project has started.
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
                <li>The project has not been started</li>
                <li>There is a failure to deliver the agreed service</li>
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
                Clients may cancel at any time, but no refunds will be issued for already billed
                periods.
              </p>
            </section>

            <section aria-labelledby="refund-contact">
              <h2
                id="refund-contact"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                4. Contact
              </h2>
              <p className="mt-3">
                If you have any questions, contact us at:{" "}
                <a
                  href="mailto:info@nexora-agn.com"
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  info@nexora-agn.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default RefundPolicy;
