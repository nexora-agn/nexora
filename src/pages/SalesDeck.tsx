import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEXORA_LOGO_SRC } from "@/lib/brandAssets";
import { COMPANY_LEGAL } from "@/lib/companyLegal";
import { customerProjects } from "@/data/customerProjects";
import {
  WHY_HEADLINE,
  WHY_SUB,
  allPortfolioClientStories,
  whyPillars,
  whyStatStrip,
} from "@/data/whyChooseNexora";

const DECK_TITLE = "Client outcomes & portfolio overview";
const CONTACT_EMAIL = "info@nexora-agn.com";

const SalesDeck = () => {
  const generated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    m.setAttribute("data-sales-deck", "true");
    document.head.appendChild(m);

    const tabTitle = "Nexora";
    /** Chrome/Edge inject title + URL into PDF when “Headers and footers” is on; clear title briefly for print only. */
    const onBeforePrint = () => {
      document.title = "\u200B";
    };
    const onAfterPrint = () => {
      document.title = tabTitle;
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
    <div className="min-h-screen bg-[#f4f4f5] text-neutral-950 print:bg-white print:text-black">
      {/* Screen-only toolbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <div className="flex flex-wrap items-center gap-2">
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
        </div>
        <p className="mx-auto max-w-5xl border-t border-neutral-100 px-4 py-2 text-center text-[11px] text-neutral-500 md:px-6">
          <Download className="-mt-0.5 mr-1 inline h-3.5 w-3.5 opacity-70" aria-hidden />
          <strong className="text-neutral-700">Important:</strong> In More settings / Options,{" "}
          <strong className="text-neutral-700">uncheck Headers and footers</strong>. Otherwise Chrome/Edge prints the
          page title and <span className="whitespace-nowrap">URL (e.g. localhost)</span> on every page. Choose{" "}
          <strong>Save as PDF</strong>, margins <strong>Default</strong> or <strong>Minimum</strong>, and enable{" "}
          <strong>Background graphics</strong>.
        </p>
      </header>

      <style>
        {`@media print {
          @page { size: A4; margin: 10mm 12mm; }
        }`}
      </style>

      {/* Document wrapper: A4-ish width on screen, full width in print */}
      <main className="mx-auto max-w-[210mm] px-5 py-10 print:max-w-none print:px-0 print:py-3">
        {/* Cover */}
        <section className="break-after-page rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm print:break-after-auto print:rounded-none print:border-0 print:p-0 print:pb-1 print:shadow-none">
          <div className="border-b-4 border-brand pb-8 print:border-b-2 print:pb-4">
            <img
              src={NEXORA_LOGO_SRC}
              alt="Nexora"
              className="h-10 w-auto max-w-[200px] object-contain object-left md:h-12 print:h-9"
              width={200}
              height={48}
            />
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-brand print:mt-4">
              Sales &amp; marketing
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-neutral-950 md:text-4xl md:leading-[1.15] print:mt-2 print:text-[22pt] print:leading-tight">
              {DECK_TITLE}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 print:mt-2 print:text-[10pt] print:leading-snug">
              Credibility pack for prospects: how we think about growth (visibility, leads, booked work), a live
              project portfolio, and representative client stories aligned to sites you can verify online.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 border-t border-neutral-100 pt-8 text-sm print:mt-4 print:gap-4 print:border-t-neutral-200 print:pt-3 print:text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Prepared for</p>
                <p className="mt-1 font-semibold text-neutral-900">Your prospect / partner</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Date</p>
                <p className="mt-1 font-medium text-neutral-800">{generated}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Contact</p>
                <a className="mt-1 font-medium text-brand underline-offset-2 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Nexora */}
        <section className="mt-14 break-inside-avoid print:mt-0 print:pb-3 print:pt-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand print:text-[9pt]">Why Nexora AGN</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl print:mt-1 print:text-lg">
            {WHY_HEADLINE}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base print:mt-1.5 print:text-[10pt] print:leading-snug">
            {WHY_SUB}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 print:mt-4 print:gap-2">
            {whyPillars.map(p => (
              <div
                key={p.title}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm print:break-inside-avoid print:p-3 print:leading-snug print:shadow-none"
              >
                <p className="font-bold text-neutral-950 print:text-[10pt]">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 print:mt-1 print:text-[9pt] print:leading-snug">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 print:grid-cols-4 print:mt-3 print:gap-2 lg:grid-cols-4">
            {whyStatStrip.map(row => (
              <div
                key={row.headline}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4 print:break-inside-avoid print:px-2.5 print:py-2"
              >
                <p className="text-sm font-bold text-neutral-950 print:text-[9pt] print:leading-tight">{row.headline}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 print:mt-0.5 print:text-[8pt] print:leading-snug">
                  {row.subline}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section className="mt-16 print:mt-0 print:pb-3 print:pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand print:text-[9pt]">Live portfolio</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl print:mt-1 print:text-lg">
            Websites we launched for real businesses
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-base print:mt-1 print:text-[10pt] print:leading-snug">
            Every entry is a live property you can open today. Categories reflect how each business positions in market,
            not a generic template narrative.
          </p>

          <div className="mt-10 space-y-10 print:mt-4 print:space-y-3">
            {customerProjects.map(project => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm print:break-inside-avoid print:rounded-lg print:shadow-none"
              >
                <div className="grid gap-0 md:grid-cols-[220px_1fr] print:grid-cols-[minmax(115px,18%)_1fr]">
                  <div className="aspect-[16/10] bg-neutral-100 md:aspect-auto md:min-h-[160px] print:aspect-auto print:h-[84px] print:min-h-0 print:shrink-0 print:overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-7 print:p-3 print:justify-start">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">{project.category}</p>
                    <h3 className="mt-2 text-lg font-bold text-neutral-950 md:text-xl print:mt-0.5 print:text-[11pt] print:leading-tight">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 print:mt-0.5 print:text-[9pt] print:leading-snug">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs font-medium text-neutral-500 print:mt-1.5 print:text-[8pt] print:leading-tight">
                      Live URL:{" "}
                      <span className="break-all font-mono text-[11px] text-neutral-700">{project.url}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="mt-16 print:mt-0 print:pb-2 print:pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand print:text-[9pt]">
            Representative outcomes
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl print:mt-1 print:text-lg">
            What clients cite after launch &amp; ongoing SEO focus
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 print:mt-1 print:text-[9pt] print:leading-snug">
            Stories correspond to showcase brands above. Names match public sites; contact roles are illustrative.
            Percentages are <strong className="font-semibold text-neutral-900">directional benchmarks for enablement only</strong>,{" "}
            not audited guarantees. Confirm with Analytics / Search Console before external claims.
          </p>

          <div className="mt-10 space-y-8 print:mt-3 print:space-y-3">
            {allPortfolioClientStories.map(s => (
              <article
                key={s.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm print:break-inside-avoid print:rounded-lg print:p-3 print:shadow-none"
              >
                <div className="flex gap-5 print:gap-3">
                  <img
                    src={s.avatarSrc}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-brand/25 print:h-11 print:w-11"
                    width={64}
                    height={64}
                    loading="eager"
                    decoding="sync"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-neutral-950 print:text-[10pt] print:leading-tight">{s.name}</p>
                    <p className="text-xs text-neutral-600 print:text-[8pt] print:leading-tight">{s.role}</p>
                    <blockquote className="mt-4 border-l-2 border-brand pl-4 text-sm italic leading-relaxed text-neutral-800 print:mt-2 print:pl-2.5 print:text-[9pt] print:leading-snug">
                      {s.quote}
                    </blockquote>
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-neutral-100 pt-4 text-xs print:mt-2 print:gap-1.5 print:border-t-neutral-100 print:pt-2">
                      <span className="rounded-md bg-neutral-100 px-2.5 py-1 font-medium text-neutral-800 print:px-1.5 print:py-0.5 print:text-[8pt]">
                        Organic traffic{" "}
                        <strong className="text-brand">{s.lifts.traffic}</strong>
                      </span>
                      <span className="rounded-md bg-neutral-100 px-2.5 py-1 font-medium text-neutral-800 print:px-1.5 print:py-0.5 print:text-[8pt]">
                        Lead quality / volume{" "}
                        <strong className="text-brand">{s.lifts.leads}</strong>
                      </span>
                      <span className="rounded-md bg-neutral-100 px-2.5 py-1 font-medium text-neutral-800 print:px-1.5 print:py-0.5 print:text-[8pt]">
                        Calls / bookings{" "}
                        <strong className="text-brand">{s.lifts.appointments}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer legal */}
        <footer className="mt-16 break-inside-avoid border-t border-neutral-200 pt-8 print:mt-3 print:border-t-neutral-300 print:pt-3">
          <div className="flex flex-wrap items-end justify-between gap-6 print:gap-3">
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
                {CONTACT_EMAIL} · Confidential sales collateral ·{" "}
                <span className="font-medium text-neutral-800">nexora-agn.com</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default SalesDeck;
