import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEXORA_LOGO_SRC } from "@/lib/brandAssets";
import { COMPANY_LEGAL } from "@/lib/companyLegal";
import {
  WEBSITE_PROGRAM_PAGES,
  type ProgramFeature,
  type WebsiteProgramProcessStep,
  websiteProgramBrand,
  websiteProgramComparisonIntro,
  websiteProgramComparisonRows,
  websiteProgramCover,
  websiteProgramFaqs,
  websiteProgramPart1,
  websiteProgramPart2,
  websiteProgramPricingRows,
  websiteProgramProcessSteps,
  websiteProgramWhySection,
} from "@/data/nexoraWebsiteProgram";

const TAB_TITLE_AFTER_PRINT = "Website program | Nexora";

function ProgramFeaturesGrid({ features }: { features: ProgramFeature[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 print:mt-3 print:grid-cols-3 print:gap-1.5">
      {features.map(({ title, tagline, icon: Icon }) => (
        <div
          key={title}
          className="flex gap-3.5 rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white via-white to-neutral-50/80 p-4 shadow-sm print:break-inside-avoid print:gap-2 print:rounded-lg print:bg-neutral-50/95 print:p-2 print:[print-color-adjust:exact] print:shadow-none"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-neutral-950 ring-1 ring-inset ring-brand/25 print:h-9 print:w-9"
            aria-hidden
          >
            <Icon className="h-6 w-6 print:h-4 print:w-4" strokeWidth={1.85} />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="font-semibold leading-snug text-neutral-950 print:text-[10pt] print:leading-tight">{title}</p>
            <p className="mt-1 text-[13px] leading-snug text-neutral-600 print:text-[8.5pt] print:leading-tight">
              {tagline}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function WebsiteProcessRoadmap({ steps }: { steps: WebsiteProgramProcessStep[] }) {
  const lastIdx = steps.length - 1;
  return (
    <div role="list" className="relative mx-auto mt-10 max-w-3xl print:mt-3">
      <div className="mb-10 flex items-center gap-4 print:hidden">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-neutral-300/30" aria-hidden />
        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">
          Brief → Launch
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-300 to-neutral-300/30" aria-hidden />
      </div>
      {/* Connector rail through icon centers (column w-14 → center 1.75rem) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[calc(1.75rem-1.5px)] top-8 bottom-[4.75rem] hidden w-[3px] rounded-full bg-gradient-to-b from-brand via-brand/65 to-neutral-200 sm:block print:bottom-[0.875rem] print:!block print:left-[calc(1.75rem-0.5px)] print:top-[1.5rem] print:w-px print:bg-neutral-300"
      />
      <div className="relative space-y-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.step} role="listitem" className="group relative flex gap-5 sm:gap-7 print:break-inside-avoid">
              <div className="relative z-[1] flex w-14 shrink-0 justify-center pt-1 sm:w-14 print:w-12">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-white bg-brand text-neutral-950 shadow-[0_8px_30px_-6px_rgb(236_187_54/0.55)] ring-1 ring-neutral-950/15 print:h-[2.75rem] print:w-[2.75rem] print:rounded-xl print:shadow-md">
                  <Icon className="h-7 w-7 print:h-[1.15rem] print:w-[1.15rem]" strokeWidth={1.75} aria-hidden />
                </span>
              </div>
              <div
                className={`min-w-0 flex-1 ${idx === lastIdx ? "pb-2 sm:pb-0" : "pb-8 sm:pb-12"} print:!pb-0.5`}
              >
                <div className="-m-px rounded-2xl border border-neutral-200/95 bg-white/85 p-[1.1rem] shadow-sm backdrop-blur-[2px] transition-[border-color,box-shadow,background-color] duration-300 ease-out group-hover:border-brand/40 group-hover:bg-white group-hover:shadow-[0_12px_40px_-24px_rgb(236_187_54/0.38)] group-hover:[box-shadow:0_14px_40px_-20px_rgb(236_187_54/0.35),0_0_0_1px_rgb(255_212_114/0.25)] print:m-0 print:bg-white print:p-2 print:!shadow-none">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                      Step {step.step}
                    </span>
                    <span className="text-[10px] text-neutral-400 print:hidden">
                      Hover to skim · {!idx ? "Starts here" : idx === lastIdx ? "Ship it" : "Next"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-950 print:mt-0.5 print:text-[10pt] print:leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 print:mt-0.5 print:text-[8.5pt] print:leading-snug">
                    {step.description}
                  </p>
                  <span
                    className="-mx-px mt-4 hidden h-[3px] w-12 rounded-full bg-gradient-to-r from-brand via-amber-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block print:hidden"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PageMarker({ index }: { index: number }) {
  return (
    <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 print:mb-1.5">
      {index} of {WEBSITE_PROGRAM_PAGES}
    </p>
  );
}

export default function WebsiteProgram() {
  const generated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pricingRows = websiteProgramPricingRows();

  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    m.setAttribute("data-website-program", "true");
    document.head.appendChild(m);

    const onBeforePrint = () => {
      document.title = "\u200B";
    };
    const onAfterPrint = () => {
      document.title = TAB_TITLE_AFTER_PRINT;
    };
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      if (document.head.contains(m)) document.head.removeChild(m);
    };
  }, []);

  return (
    <div className="nexora-collateral-print flex min-h-screen flex-col bg-[#f4f4f5] text-neutral-950 print:block print:min-h-0 print:h-auto print:bg-white print:text-black">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl border-neutral-300 bg-white"
            type="button"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" aria-hidden />
            Print or save as PDF
          </Button>
        </div>
        <p className="mx-auto max-w-5xl border-t border-neutral-100 px-4 py-2 text-center text-[11px] text-neutral-500 md:px-6">
          <Download className="-mt-0.5 mr-1 inline h-3.5 w-3.5 opacity-70" aria-hidden />
          <strong className="text-neutral-700">Important:</strong> Uncheck{" "}
          <strong className="text-neutral-700">Headers and footers</strong> in the print dialog. Use{" "}
          <strong>Save as PDF</strong>, <strong>Background graphics</strong> on—margins{" "}
          <strong>Minimum</strong> keeps pages tighter than Default.
        </p>
      </header>

      <style>
        {`@media print {
          @page {
            size: A4;
            margin: 0;
          }
          html {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            min-height: 0 !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
            background: #fff !important;
            background-image: none !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          #root {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            min-height: 0 !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
          .nexora-collateral-print {
            height: auto !important;
            min-height: 0 !important;
            margin: 0 !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
        }`}
      </style>

      <main className="mx-auto flex w-full max-w-[210mm] flex-1 flex-col space-y-10 px-5 py-10 print:box-border print:flex-none print:h-auto print:max-w-none print:space-y-0 print:px-[8mm] print:pb-0 print:pt-[6mm] print:min-h-0">
        {/* 1 Cover */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-4 print:shadow-none print:mb-4">
          <PageMarker index={1} />
          <div className="border-b-4 border-brand pb-8 print:border-b-2 print:pb-5">
            <img
              src={NEXORA_LOGO_SRC}
              alt="Nexora"
              className="h-10 w-auto max-w-[200px] object-contain object-left md:h-12 print:h-9"
              width={200}
              height={48}
            />
            <p className="mt-12 text-3xl font-bold leading-[1.2] tracking-tight text-neutral-950 md:text-4xl print:mt-8 print:text-[24pt]">
              {websiteProgramCover.titleLine1}
              <br />
              {websiteProgramCover.titleLine2}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 print:mt-4 print:text-[11pt] print:leading-snug">
              {websiteProgramCover.lede}
            </p>
            <div className="mt-10 flex flex-wrap gap-8 border-t border-neutral-100 pt-8 text-sm print:mt-6 print:gap-6 print:pt-4 print:text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Program</p>
                <p className="mt-1 font-semibold text-neutral-900">{websiteProgramBrand.programName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Prepared</p>
                <p className="mt-1 font-medium text-neutral-800">{generated}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Contact</p>
                <a
                  className="mt-1 font-medium text-brand underline-offset-2 hover:underline"
                  href={`mailto:${websiteProgramBrand.email}`}
                >
                  {websiteProgramBrand.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2 Why Nexora */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-3 print:shadow-none print:mb-3">
          <PageMarker index={2} />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand print:text-[9pt]">
            {websiteProgramWhySection.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl print:text-xl">
            {websiteProgramWhySection.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base print:mt-2 print:text-[10pt] print:leading-snug">
            {websiteProgramWhySection.sub}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3 print:mt-3 print:gap-2">
            {websiteProgramWhySection.pillars.map(p => (
              <div key={p.headline} className="rounded-xl border border-neutral-100 bg-neutral-50/90 p-5 print:break-inside-avoid print:p-2.5">
                <p className="text-lg font-bold text-neutral-950 print:text-[12pt] print:leading-tight">{p.headline}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 print:mt-1 print:text-[8.5pt] print:leading-snug">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Part 1 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-3 print:shadow-none print:mb-3">
          <PageMarker index={3} />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{websiteProgramBrand.programName}</p>
          <h2 className="mt-2 text-xl font-bold text-neutral-950 md:text-2xl print:text-lg">
            {websiteProgramPart1.partLabel}: {websiteProgramPart1.title}
          </h2>
          <ProgramFeaturesGrid features={websiteProgramPart1.features} />
        </section>

        {/* 4 Part 2 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-3 print:shadow-none print:mb-3">
          <PageMarker index={4} />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{websiteProgramBrand.programName}</p>
          <h2 className="mt-2 text-xl font-bold text-neutral-950 md:text-2xl print:text-lg">
            {websiteProgramPart2.partLabel}: {websiteProgramPart2.title}
          </h2>
          <ProgramFeaturesGrid features={websiteProgramPart2.features} />
        </section>

        {/* 5 Process — Plans sits under the roadmap on the same scroll card */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-3 print:shadow-none print:mb-3">
          <PageMarker index={5} />
          <h2 className="text-xl font-bold text-neutral-950 md:text-2xl print:text-lg">Our website process</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 print:mt-2 print:text-[10pt] print:leading-snug">
            A concise path from approvals to measurable launches—focused on stakeholder clarity instead of ambiguous
            timelines.
          </p>
          <WebsiteProcessRoadmap steps={websiteProgramProcessSteps} />

          <div className="mt-12 border-t border-neutral-200/90 pt-10 print:mt-4 print:border-t print:border-neutral-200 print:pt-3">
            <PageMarker index={6} />
            <h2 className="text-xl font-bold text-neutral-950 md:text-2xl print:text-base print:leading-tight">
              Plans &amp; recurring investment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 print:mt-1.5 print:text-[9pt] print:leading-tight">
              Published rates align with Nexora&apos;s marketing site ({websiteProgramBrand.siteUrl}). Custom scopes are quoted
              when your build exceeds standard packaging.
            </p>
            <div className="mt-8 overflow-x-auto print:mt-2">
              <table className="w-full border-collapse border border-neutral-200 text-left text-xs print:text-[7.5pt]">
                <thead>
                  <tr className="bg-neutral-900 text-neutral-50">
                    <th className="border border-neutral-300 px-3 py-2.5 font-bold print:px-1.5 print:py-0.5">Plan</th>
                    <th className="border border-neutral-300 px-3 py-2.5 font-bold print:px-1.5 print:py-0.5">Price</th>
                    <th className="border border-neutral-300 px-3 py-2.5 font-bold print:px-1.5 print:py-0.5">Fit</th>
                    <th className="border border-neutral-300 px-3 py-2.5 font-bold print:px-1.5 print:py-0.5">Included</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map(row => (
                    <tr key={row.name} className="align-top bg-white">
                      <td className="border border-neutral-200 px-3 py-2 font-bold text-neutral-950 print:px-1.5 print:py-0.5">{row.name}</td>
                      <td className="border border-neutral-200 px-3 py-2 font-semibold text-brand print:px-1.5 print:py-0.5">
                        {row.name === "Custom" ? (
                          row.price
                        ) : (
                          <>
                            {row.price}
                            <span className="font-semibold text-neutral-800">{row.period}</span>
                          </>
                        )}
                      </td>
                      <td className="border border-neutral-200 px-3 py-2 text-neutral-700 print:px-1.5 print:py-0.5 print:leading-tight">{row.anchorLine}</td>
                      <td className="border border-neutral-200 px-3 py-2 text-neutral-700 print:px-1.5 print:py-0.5">
                        <ul className="list-disc space-y-0.5 pl-4 print:space-y-0 print:pl-3 print:leading-[1.2]">
                          {row.highlights.map(h => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-neutral-500 print:mt-1.5 print:text-[7.5pt] print:leading-tight">
              Full portfolio:{" "}
              <span className="font-medium text-neutral-800">{websiteProgramBrand.siteUrl}</span>. Start a packaged project
              from the Start a project flow anytime.
            </p>
          </div>
        </section>

        {/* 7 Comparison */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-3 print:shadow-none print:mb-3">
          <PageMarker index={7} />
          <h2 className="text-xl font-bold text-neutral-950 md:text-2xl print:text-lg">Why consolidate with Nexora</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 print:mt-2 print:text-[10pt] print:leading-snug">
            {websiteProgramComparisonIntro}
          </p>
          <div className="mt-8 overflow-x-auto print:mt-3">
            <table className="w-full border-collapse border border-neutral-200 text-left text-xs print:text-[8pt]">
              <thead>
                <tr className="bg-neutral-900 text-neutral-50">
                  <th className="border border-neutral-300 px-3 py-2.5 font-bold print:px-2 print:py-1">
                    Typical fragmented stack
                  </th>
                  <th className="border border-neutral-300 px-3 py-2.5 font-bold print:px-2 print:py-1">Nexora program</th>
                </tr>
              </thead>
              <tbody>
                {websiteProgramComparisonRows.map((r, idx) => (
                  <tr key={idx}>
                    <td className="border border-neutral-200 bg-white px-3 py-2 align-top text-neutral-700 print:px-2 print:py-1">
                      {r.fragmented}
                    </td>
                    <td className="border border-neutral-200 bg-brand/10 px-3 py-2 align-top text-neutral-900 print:px-2 print:py-1">
                      {r.nexora}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8 FAQ */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:border-b print:border-neutral-200 print:p-0 print:pb-3 print:shadow-none print:mb-3">
          <PageMarker index={8} />
          <h2 className="text-xl font-bold text-neutral-950 md:text-2xl print:text-lg">Frequently asked questions</h2>
          <p className="mt-2 text-sm text-neutral-600 print:text-[10pt]">Straight answers procurement teams routinely ask.</p>
          <div className="mt-8 space-y-8 print:mt-3 print:space-y-2.5">
            {websiteProgramFaqs.map(faq => (
              <div key={faq.question} className="break-inside-avoid border-b border-neutral-100 pb-6 last:border-0 print:pb-2">
                <p className="font-bold text-neutral-950 print:text-[10pt]">{faq.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 print:text-[9.5pt] print:leading-snug">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-none border-t border-neutral-200 bg-white px-5 py-10 shadow-[0_-12px_40px_-28px_rgb(23_23_23/0.12)] print:border-t print:border-neutral-200 print:px-[8mm] print:pb-[10mm] print:pt-6 print:shadow-none">
        <div className="mx-auto max-w-[210mm] print:max-w-none">
          <PageMarker index={9} />
          <h2 className="text-xl font-bold text-neutral-950 md:text-2xl print:text-lg">Ready to start?</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 print:text-[11pt]">
            Email or call us—we reply within one business day and can walk previews, timelines, proposals, or upgrades.
          </p>
          <div className="mt-8 flex flex-wrap gap-8 rounded-xl border border-brand/35 bg-brand/5 p-6 print:mt-3 print:break-inside-avoid print:gap-4 print:p-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Email</p>
              <a
                className="mt-2 block text-base font-semibold text-brand underline-offset-4 hover:underline"
                href={`mailto:${websiteProgramBrand.email}`}
              >
                {websiteProgramBrand.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Phone</p>
              <a className="mt-2 block text-base font-semibold text-neutral-950" href={websiteProgramBrand.telHref}>
                {websiteProgramBrand.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Web</p>
              <p className="mt-2 text-base font-semibold text-neutral-950">{websiteProgramBrand.siteUrl}</p>
            </div>
          </div>

          <div className="mt-12 break-inside-avoid border-t border-neutral-200 pt-8 print:mt-4 print:break-before-avoid print:border-t-neutral-300 print:pb-1 print:pt-3">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <img
                src={NEXORA_LOGO_SRC}
                alt="Nexora"
                className="h-8 w-auto max-w-[140px] opacity-95 print:h-7"
                width={140}
                height={36}
              />
              <div className="text-right text-[11px] leading-relaxed text-neutral-600 print:text-[8pt] print:leading-snug">
                <p className="font-semibold text-neutral-900">
                  {COMPANY_LEGAL.legalName}{" "}
                  <span className="font-normal text-neutral-600">
                    · CR {COMPANY_LEGAL.commercialRegistration}
                  </span>
                </p>
                <p className="mt-2">
                  {websiteProgramBrand.email} · Confidential program overview ·{" "}
                  <span className="font-medium text-neutral-800">{websiteProgramBrand.siteUrl}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
