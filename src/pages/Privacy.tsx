import { Link } from "react-router-dom";
import PolicyPageFooter from "@/components/legal/PolicyPageFooter";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import { COMPANY_LEGAL, companyAddressDisplay } from "@/lib/companyLegal";

const effectiveDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const sections = [
  {
    title: "Data controller",
    body: (
      <>
        <p>
          The operator of this website, and the controller of your personal data described in this
          policy, is <span className="font-semibold text-foreground">{COMPANY_LEGAL.legalName}</span>, a{" "}
          {COMPANY_LEGAL.legalForm}. Commercial registration (CR) no.{" "}
          <span className="whitespace-nowrap">{COMPANY_LEGAL.commercialRegistration}</span>, registered
          in the {COMPANY_LEGAL.registeredJurisdiction}.
        </p>
        <p className="mt-3">
          {COMPANY_LEGAL.operatingOffice.label}:{" "}
          <span className="whitespace-pre-line text-foreground">{companyAddressDisplay()}</span>.
        </p>
        <p className="mt-3">
          For any privacy-related request, contact us at{" "}
          <a
            href={`mailto:${COMPANY_LEGAL.contactEmail}`}
            className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            {COMPANY_LEGAL.contactEmail}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>
          We collect information you choose to provide, such as your name, work email, company name,
          phone number, and project details, when you request a consultation, submit a form on our
          site, start a project, or otherwise communicate with us about our services.
        </p>
        <p className="mt-3">
          We may also collect limited technical data automatically (for example, browser type and
          general usage signals) as needed to operate and secure our website.
        </p>
        <p className="mt-3">
          When you interact with the AI assistant on our website or on websites we build for our
          clients, the conversation messages you send are processed in order to generate a response.
          We do not require you to share sensitive personal data with the assistant.
        </p>
      </>
    ),
  },
  {
    title: "How we use information",
    body: (
      <p>
        We use personal information to respond to inquiries, deliver and improve our services,
        communicate about your project or account, and, where you have opted in, send relevant updates.
        We do not use your data for unrelated profiling beyond what is necessary to operate our
        business.
      </p>
    ),
  },
  {
    title: "Sharing and processors",
    body: (
      <>
        <p>
          We do not sell your personal information. We share data only with trusted subprocessors
          that perform services on our behalf under appropriate confidentiality and security
          obligations. The categories of subprocessors we currently rely on are:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <span className="font-medium text-foreground">Payment processing:</span> Paddle (our
            merchant of record for checkout, subscriptions, billing, and refunds).
          </li>
          <li>
            <span className="font-medium text-foreground">AI conversation providers:</span> third
            parties that power the AI assistant features on our site and on websites we build for
            our clients. Messages you send to the assistant are transmitted to these providers to
            generate a response.
          </li>
          <li>
            <span className="font-medium text-foreground">Hosting and infrastructure:</span>{" "}
            cloud hosting, content delivery, and storage providers used to operate the website and
            the project workspace.
          </li>
          <li>
            <span className="font-medium text-foreground">Email and notifications:</span> email
            delivery and transactional notification providers used to send updates about your
            project, account, and lead notifications.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Payment processing",
    body: (
      <p>
        Online payments for our services are processed by{" "}
        <span className="font-semibold text-foreground">Paddle</span>, which acts as the merchant of
        record. Card data and payment credentials are handled directly by Paddle on its own
        infrastructure; we do not store full payment card numbers on our servers. Paddle&apos;s use of
        your data is governed by its own privacy notice.
      </p>
    ),
  },
  {
    title: "International transfers",
    body: (
      <p>
        We are registered in the {COMPANY_LEGAL.registeredJurisdiction} and operate from{" "}
        {COMPANY_LEGAL.operatingOffice.addressLines[COMPANY_LEGAL.operatingOffice.addressLines.length - 1] ?? "our operating office"}.
        Some of our subprocessors may store or process personal data outside your country of
        residence. Where required by law, we put appropriate safeguards in place for those
        transfers.
      </p>
    ),
  },
  {
    title: "Retention",
    body: (
      <p>
        We retain personal information for as long as needed to provide the services, comply with
        our legal obligations (including accounting and tax requirements), resolve disputes, and
        enforce our agreements. When personal data is no longer required for these purposes, we
        delete or anonymize it.
      </p>
    ),
  },
  {
    title: "Security",
    body: (
      <p>
        We implement reasonable administrative, technical, and organizational measures designed to
        protect personal information against unauthorized access, loss, or misuse. No method of
        transmission over the internet is completely secure; we encourage you to use strong
        credentials and to contact us if you suspect unauthorized access.
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        Depending on your location, you may have rights to access, correct, delete, or restrict
        certain processing of your personal information. To exercise these rights, contact us using
        the details on our{" "}
        <Link to="/contact" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
          contact page
        </Link>
        .
      </p>
    ),
  },
  {
    title: "Updates",
    body: (
      <p>
        We may revise this policy from time to time. The &quot;Last updated&quot; date at the top
        reflects the latest version. Continued use of our site after changes constitutes acceptance
        of the updated policy where permitted by law.
      </p>
    ),
  },
];

const Privacy = () => {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Privacy notice" }]}
        title="Privacy notice"
        description={`How ${COMPANY_LEGAL.legalName} collects, uses, and protects personal information when you use ${COMPANY_LEGAL.brand}.`}
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border/70 bg-muted/15 px-8 py-10 shadow-sm md:px-10 md:py-12">
          <p className="text-sm font-medium text-muted-foreground">
            Last updated: <time dateTime={new Date().toISOString().slice(0, 10)}>{effectiveDate}</time>
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`privacy-section-${index}`}>
                <h2
                  id={`privacy-section-${index}`}
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

export default Privacy;
