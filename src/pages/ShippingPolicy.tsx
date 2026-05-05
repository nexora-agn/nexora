import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const ShippingPolicy = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Shipping policy" }]}
        title="Shipping policy"
        description="How Nexora delivers its digital products and services."
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border/70 bg-muted/15 px-8 py-10 shadow-sm md:px-10 md:py-12">
          <p className="text-sm font-medium text-muted-foreground">
            Last updated: <time dateTime={new Date().toISOString().slice(0, 10)}>{effectiveDate}</time>
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
            <p>
              <span className="font-semibold text-foreground">Nexora</span> provides digital
              products and services only. No physical items are shipped.
            </p>

            <section aria-labelledby="shipping-delivery">
              <h2
                id="shipping-delivery"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                1. Electronic delivery
              </h2>
              <p className="mt-3">All services are delivered electronically via:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Email</li>
                <li>Online platforms</li>
                <li>Client dashboards</li>
              </ul>
            </section>

            <section aria-labelledby="shipping-timelines">
              <h2
                id="shipping-timelines"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                2. Delivery timelines
              </h2>
              <p className="mt-3">
                Delivery timelines depend on the selected service and will be communicated during
                the project agreement phase.
              </p>
            </section>

            <section aria-labelledby="shipping-contact">
              <h2
                id="shipping-contact"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                3. Contact
              </h2>
              <p className="mt-3">
                If you have questions, contact us at:{" "}
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

export default ShippingPolicy;
