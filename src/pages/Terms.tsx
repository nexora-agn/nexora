import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const sections = [
  {
    title: "Agreement",
    body: (
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to Nexora Solution&apos;s website
        and any services we agree to provide in writing. By submitting a request, using our site, or
        engaging us for work, you agree to these Terms.
      </p>
    ),
  },
  {
    title: "Services and engagement",
    body: (
      <>
        <p>
          We provide website design and development services as described in your proposal, statement
          of work, or order confirmation. Timelines, deliverables, and fees are defined in that
          documentation and incorporated into these Terms by reference.
        </p>
        <p className="mt-3">
          Work begins after scope, schedule, and any deposit or approval requirements are satisfied.
          Client delays in providing assets, feedback, or approvals may affect delivery dates.
        </p>
      </>
    ),
  },
  {
    title: "Client responsibilities",
    body: (
      <p>
        You agree to provide accurate information, timely feedback, and lawful content (including
        text, images, and trademarks) for use in your project. You represent that you have the
        rights necessary for us to incorporate such materials.
      </p>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        Unless otherwise agreed in writing, upon receipt of full payment for the applicable
        engagement, we assign to you the deliverables created specifically for your project under that
        engagement, excluding our pre-existing tools, libraries, and know-how. Third-party
        components may remain subject to their respective licenses.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, Nexora Solution shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or for loss of profits, data, or
        goodwill. Our aggregate liability arising out of these Terms or the services shall not
        exceed the fees paid to Nexora Solution for the services giving rise to the claim during the six
        (6) months preceding the event.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        We may update these Terms periodically. We will post the revised Terms on this page and
        update the &quot;Last updated&quot; date. Material changes may require additional notice or
        consent where required by law. Continued use of our services after changes become effective
        constitutes acceptance of the revised Terms.
      </p>
    ),
  },
];

const Terms = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Terms of service" }]}
        title="Terms of service"
        description="The terms that apply when you use our website and engage Nexora Solution for services."
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border/70 bg-muted/15 px-8 py-10 shadow-sm md:px-10 md:py-12">
          <p className="text-sm font-medium text-muted-foreground">
            Last updated:{" "}
            <time dateTime={new Date().toISOString().slice(0, 10)}>{effectiveDate}</time>
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`terms-section-${index}`}>
                <h2
                  id={`terms-section-${index}`}
                  className="text-lg font-semibold tracking-tight text-foreground"
                >
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default Terms;
