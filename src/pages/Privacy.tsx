import { Link } from "react-router-dom";
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
    title: "Data controller",
    body: (
      <p>
        The operator of this website, and the controller of your personal data described in this
        policy, is <span className="font-semibold text-foreground">{COMPANY_LEGAL.legalName}</span>, a{" "}
        {COMPANY_LEGAL.legalForm}. Commercial registration (CR) no.{" "}
        <span className="whitespace-nowrap">{COMPANY_LEGAL.commercialRegistration}</span>
        {COMPANY_LEGAL.addressLines.length === 0 ? "." : ""}
        {COMPANY_LEGAL.addressLines.length > 0 ? (
          <>
            . Registered address:{" "}
            <span className="mt-1 block whitespace-pre-line text-foreground">
              {COMPANY_LEGAL.addressLines.join("\n")}
            </span>
            .
          </>
        ) : null}
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>
          We collect information you choose to provide, such as your name, work email, company name,
          and phone number, when you request a consultation, submit a contact form, or otherwise
          communicate with us about our services.
        </p>
        <p className="mt-3">
          We may also collect limited technical data automatically (for example, browser type and
          general usage signals) as needed to operate and secure our website.
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
      <p>
        We do not sell your personal information. We may share data with trusted subprocessors
        (such as hosting, email, or analytics providers) who perform services on our behalf under
        appropriate confidentiality and security obligations.
      </p>
    ),
  },
  {
    title: "Payment processing",
    body: (
      <p>
        We use third-party payment providers such as{" "}
        <span className="font-semibold text-foreground">Paysera</span> to process payments
        securely. We do not store your payment details on our servers.
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
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Privacy policy" }]}
        title="Privacy policy"
        description="How we collect, use, and protect personal information when you use Nexora."
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
        </div>
      </article>
    </SiteLayout>
  );
};

export default Privacy;
