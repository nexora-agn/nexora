import { Link } from "react-router-dom";
import PolicyPageFooter from "@/components/legal/PolicyPageFooter";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { COMPANY_LEGAL } from "@/lib/companyLegal";

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
        These Terms of Service (&quot;Terms&quot;) are between you and{" "}
        <span className="font-semibold text-foreground">{COMPANY_LEGAL.legalName}</span>, a{" "}
        {COMPANY_LEGAL.legalForm} registered in the {COMPANY_LEGAL.registeredJurisdiction} (EIN{" "}
        {COMPANY_LEGAL.ein}), doing business as &quot;{COMPANY_LEGAL.brand}&quot;. They govern your
        access to {COMPANY_LEGAL.brand}&apos;s website and any services we agree to provide. By
        submitting a request, using our site, or engaging us for work, you agree to these Terms.
      </p>
    ),
  },
  {
    title: "Services",
    body: (
      <>
        <p>
          {COMPANY_LEGAL.brand} sells recurring software subscriptions for hosted business websites
          and related digital features to customers in the United States. Our primary products are
          the Starter and Growth plans sold through our website checkout. Enterprise plans are
          custom-quoted software subscriptions sold under a written quote.
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Hosted business websites with preview-before-subscribe onboarding.</li>
          <li>
            AI-powered website assistants that answer visitor questions and capture leads on your
            site.
          </li>
          <li>SEO tools, marketing setup, hosting, SSL, and plan-based product updates.</li>
          <li>ERP catalog and pricing sync on eligible Growth subscriptions.</li>
        </ul>
        <p className="mt-3">
          Our offering is software delivered electronically. We do not sell human-driven services
          such as call-center operations, outbound telemarketing, managed IT helpdesk, device
          repair, malware removal, or on-site technical support. Any account or onboarding
          communication supports delivery of your subscription features and is not a standalone
          professional service.
        </p>
        <p className="mt-3">
          Plan features, onboarding timelines, and any separately quoted enterprise add-ons are
          described on our pricing page and in your checkout or order confirmation, which are
          incorporated into these Terms by reference.
        </p>
      </>
    ),
  },
  {
    title: "Subscriptions and billing",
    body: (
      <>
        <p>
          Fees for plans are shown on our pricing page or in your written quote. Most{" "}
          {COMPANY_LEGAL.brand} services are sold as recurring subscriptions. When you start a
          subscription you agree to pay the price shown at checkout, plus any applicable taxes, on a
          recurring basis (monthly unless stated otherwise) until the subscription is cancelled.
        </p>
        <p className="mt-3">
          Online checkout and recurring billing are processed by{" "}
          <span className="font-semibold text-foreground">Stripe, Inc.</span>, our third-party
          payment processor, on behalf of {COMPANY_LEGAL.legalName}. Card details are entered
          directly into Stripe&apos;s secure systems; we do not store full payment card numbers. By
          completing checkout you also agree to any payment terms Stripe presents during your
          transaction.
        </p>
        <p className="mt-3">
          <span className="font-medium text-foreground">When billing starts.</span> For new
          websites, you can preview your site before activating a subscription. Billing begins only
          after you approve your website and activate your plan, starting with your first monthly
          subscription payment.
        </p>
        <p className="mt-3">
          Subscriptions automatically renew at the end of each billing period at the then-current
          price, and we charge the payment method on file. If a payment fails, we may retry the
          charge, pause the service, or suspend access until the balance is paid.
        </p>
      </>
    ),
  },
  {
    title: "Cancellation",
    body: (
      <>
        <p>
          You may cancel your subscription at any time. To cancel, contact us at{" "}
          <a
            href={`mailto:${COMPANY_LEGAL.contactEmail}`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {COMPANY_LEGAL.contactEmail}
          </a>{" "}
          or use the self-service cancellation options in your transaction confirmation email or
          receipt.
        </p>
        <p className="mt-3">
          Cancellation stops future renewals and takes effect at the end of your current billing
          period. Refunds are governed by our{" "}
          <Link
            to="/refund-policy"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Refund policy
          </Link>
          . After cancellation, your access to subscription features (including the live website,
          AI assistant, and hosting) ends at the close of the current billing period.
        </p>
      </>
    ),
  },
  {
    title: "Refunds",
    body: (
      <p>
        Refunds are governed by our{" "}
        <Link
          to="/refund-policy"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Refund policy
        </Link>
        . Unless required by applicable law, transactions are non-refundable. Discretionary refund
        requests must be submitted within 14 days of the transaction date. Our{" "}
        <Link
          to="/privacy"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Privacy notice
        </Link>{" "}
        explains how we handle personal data, including payment-related information processed by
        Stripe on our behalf.
      </p>
    ),
  },
  {
    title: "AI assistant features",
    body: (
      <>
        <p>
          Our services include AI-powered assistants that converse with visitors, answer questions
          from a knowledge base you provide, and capture lead details. These assistants use
          third-party AI conversation providers. Responses are generated automatically and may
          occasionally be inaccurate, incomplete, or out of date.
        </p>
        <p className="mt-3">
          You are responsible for the information you upload as the assistant&apos;s knowledge base
          and for reviewing important responses (such as pricing, availability, scope of work, or
          safety-critical statements) before relying on them. The AI assistant does not provide
          legal, medical, financial, or other professional advice.
        </p>
      </>
    ),
  },
  {
    title: "Client responsibilities",
    body: (
      <p>
        You agree to provide accurate information, timely feedback, and lawful content (including
        text, images, logos, and trademarks) for use in your project. You represent that you have
        the rights necessary for us to incorporate such materials into the deliverables. You will
        not use our services to publish content that is illegal, infringing, defamatory, or that
        violates the rights of third parties.
      </p>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        Unless otherwise agreed in writing, upon receipt of full payment for the applicable
        engagement we assign to you the deliverables created specifically for your project under
        that engagement, excluding our pre-existing tools, libraries, templates, and know-how.
        Third-party components remain subject to their respective licenses. While a subscription is
        active, we grant you a non-exclusive licence to use our hosted features (including the AI
        assistant) for your business.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, {COMPANY_LEGAL.brand} shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or for loss of profits,
        data, revenue, or goodwill. Our aggregate liability arising out of these Terms or the
        services shall not exceed the fees paid to {COMPANY_LEGAL.brand} for the services giving
        rise to the claim during the six (6) months preceding the event.
      </p>
    ),
  },
  {
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the {COMPANY_LEGAL.governingLaw}, without regard to
        conflict-of-law principles. Subject to any mandatory consumer rights in your jurisdiction,
        the competent courts of the {COMPANY_LEGAL.governingLaw} have exclusive jurisdiction over
        any dispute arising out of or in connection with these Terms.
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
  {
    title: "Contact",
    body: (
      <p>
        Questions about these Terms can be sent to{" "}
        <a
          href={`mailto:${COMPANY_LEGAL.contactEmail}`}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {COMPANY_LEGAL.contactEmail}
        </a>
        .
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
        description="The terms that apply when you use our website and engage Nexora for services."
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
          <PolicyPageFooter />
        </div>
      </article>
    </SiteLayout>
  );
};

export default Terms;
