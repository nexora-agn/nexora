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
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) are between you and{" "}
          <span className="font-semibold text-foreground">{COMPANY_LEGAL.legalName}</span>, a{" "}
          {COMPANY_LEGAL.legalForm}, CR no. {COMPANY_LEGAL.commercialRegistration}, registered in the{" "}
          {COMPANY_LEGAL.registeredJurisdiction} (doing business as &quot;{COMPANY_LEGAL.brand}&quot;).
          They govern your access to {COMPANY_LEGAL.brand}&apos;s website and any services we agree
          to provide. By submitting a request, using our site, or engaging us for work, you agree
          to these Terms.
        </p>
        <p className="mt-3">
          Our operating office is located at{" "}
          <span className="whitespace-pre-line text-foreground">
            {COMPANY_LEGAL.operatingOffice.addressLines.join(", ")}
          </span>
          .
        </p>
      </>
    ),
  },
  {
    title: "Services",
    body: (
      <>
        <p>
          {COMPANY_LEGAL.brand} provides digital services for businesses, including:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Design and development of business websites (new builds and migrations).</li>
          <li>
            AI-powered website assistants that answer visitor questions and capture leads on behalf
            of our clients.
          </li>
          <li>SEO, marketing setup, and AI infrastructure as part of the subscription plans.</li>
          <li>Custom software, mobile app, and integration work where scoped separately.</li>
        </ul>
        <p className="mt-3">
          Specific deliverables, timelines, and any custom-scope fees are defined in your proposal,
          statement of work, or order confirmation, which are incorporated into these Terms by
          reference.
        </p>
      </>
    ),
  },
  {
    title: "Subscriptions and billing",
    body: (
      <>
        <p>
          Most {COMPANY_LEGAL.brand} services are sold as recurring subscriptions. When you start a
          subscription you agree to pay the price shown at checkout, plus any applicable taxes, on
          a recurring basis (typically monthly) until the subscription is cancelled.
        </p>
        <p className="mt-3">
          Online checkout and recurring billing are processed by{" "}
          <span className="font-semibold text-foreground">Paddle</span>, which acts as the merchant
          of record for these transactions. Paddle handles payment processing, invoicing, sales tax
          and VAT collection where applicable, and refunds in accordance with our policy. By
          completing a purchase you also agree to Paddle&apos;s buyer terms presented at checkout.
        </p>
        <p className="mt-3">
          Subscriptions automatically renew at the end of each billing period at the then-current
          price. We will charge the payment method on file. If a payment fails, we may retry the
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
          or use any self-service cancellation option provided by our payment partner Paddle.
        </p>
        <p className="mt-3">
          Cancellation stops future renewals. It does not entitle you to a refund of fees already
          charged for the current billing period unless required by law or by our{" "}
          <Link
            to="/refund-policy"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Refund policy
          </Link>
          . After cancellation, your access to subscription features (including the live website,
          AI assistant, and any hosting we provide) will end at the close of the current billing
          period.
        </p>
      </>
    ),
  },
  {
    title: "Refunds",
    body: (
      <p>
        Refunds and exceptions are governed by our{" "}
        <Link
          to="/refund-policy"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Refund policy
        </Link>
        . Our{" "}
        <Link
          to="/privacy"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Privacy notice
        </Link>{" "}
        explains how we handle personal data, including payment-related information processed by
        Paddle on our behalf.
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
