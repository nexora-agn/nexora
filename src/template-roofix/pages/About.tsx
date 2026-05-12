import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Hammer,
  HardHat,
  ClipboardSignature,
  Building,
  TreePine,
  Wrench,
  Quote,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit's About is built around a generational, craft-rooted story.
 *  Section sequence (none of these archetypes appear on the homepage or in Constructo's About):
 *  1. Diagonal split hero with vertical year badge
 *  2. Sticky era-rail with scrolling narrative
 *  3. Bento mosaic of leadership pull-quotes + portrait + KPIs
 *  4. Authority marquee (permitting bodies, insurers, trade orgs)
 *  5. Image-quote collage band
 *  6. Blueprint-styled closing CTA */

const ERAS = [
  {
    id: "founded",
    year: "2004",
    label: "Founded",
    headline: "A pickup truck, a Nextel, and one custom home.",
    body:
      "Summit started as a single residential remodel in East Dallas. The first crew was four people. The first project ran two days late and we made it back by Friday. The handshake then is the same one we offer now.",
  },
  {
    id: "scale",
    year: "2011",
    label: "First commercial book",
    headline: "Trades partners followed us into commercial work.",
    body:
      "Office tenant improvements led to retail strips, then ground-up Class-A. We grew on the back of subs we'd worked with for years — never the other way around. Same standards, larger floor plates.",
  },
  {
    id: "field",
    year: "2017",
    label: "Field-led operating model",
    headline: "Supers and PMs share the desk.",
    body:
      "We rewrote our org chart so superintendents sit in on every preconstruction call. The field signs off before we issue subcontracts. The result: fewer RFIs, faster closeouts, contracts you can read in one sitting.",
  },
  {
    id: "legacy",
    year: "Today",
    label: "Built to outlast",
    headline: "A second generation walks the sites.",
    body:
      "Founder's kids run estimating and field ops now. The crew nicknames stuck. The 10-year workmanship warranty stuck too. Every site walk still ends with the same question: would we live here?",
  },
];

const KPI_TILES = [
  { label: "Years building", value: "20+" },
  { label: "Counties served", value: "11" },
  { label: "Repeat-client rate", value: "85%" },
  { label: "Avg. punch-list items / project", value: "<6" },
];

const AUTHORITIES = [
  "City of Dallas Building Inspection",
  "Texas Department of Licensing",
  "AGC of Texas",
  "Build with Strength",
  "BBB · A+ Accredited",
  "OSHA 30 Certified Field",
  "NRMCA Member",
  "DFW Permitting Coalition",
];

const PULL_QUOTES = [
  {
    quote:
      "We don't sell the lowest bid. We sell the cleanest closeout. There's a difference.",
    author: "Founder",
  },
  {
    quote:
      "Every job site has a sign-out sheet, a broom, and a phone number that always picks up.",
    author: "Field Operations",
  },
  {
    quote:
      "If the schedule is going to slip, you'll hear it from us before you wonder.",
    author: "Project Management",
  },
];

const About = () => {
  const { company: COMPANY } = useSiteContent();
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const [activeEra, setActiveEra] = useState(ERAS[0].id);

  useEffect(() => {
    const sections = ERAS.map(e => document.getElementById(`era-${e.id}`)).filter(
      (n): n is HTMLElement => Boolean(n),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id.replace(/^era-/, "");
          setActiveEra(id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.5, 0.9] },
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>About | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} — a multi-generational, field-led construction firm rooted in North Texas.`}
        />
      </Helmet>

      {/* 1 — Diagonal split hero with vertical year badge */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]"
        />
        <div className="container-custom relative px-4 md:px-8 py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs md:text-sm font-bold tracking-[0.28em] text-secondary mb-5">
              SINCE 2004 · NORTH TEXAS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black uppercase tracking-tight leading-[1.02]">
              Two decades of
              <br />
              quiet sites and
              <br />
              <span className="text-secondary">clean closeouts.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
              We're a family-run general contractor built around long subs, long
              clients, and longer warranties. Most of our work comes back to us
              twice — once as a referral, then again as the next phase.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-end">
            <div className="relative">
              <div className="rotate-[-4deg] origin-bottom-right rounded-2xl border-2 border-secondary/40 bg-white/5 backdrop-blur px-7 py-8 max-w-[280px]">
                <div className="text-[11px] font-bold tracking-[0.28em] text-secondary mb-2">
                  EST.
                </div>
                <div className="text-7xl md:text-8xl font-black leading-none text-white">
                  '04
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-white/70">
                  Same crew. Bigger sites.
                </div>
              </div>
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-bold tracking-[0.4em] text-white/40 hidden md:block whitespace-nowrap">
                CHARTER · LICENSED · BONDED
              </div>
            </div>
          </div>
        </div>
        {/* diagonal cut */}
        <div
          aria-hidden
          className="h-12 md:h-16 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
        />
      </section>

      {/* 2 — Sticky era rail with scrolling narrative */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-custom px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left sticky rail */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                  HOW WE GOT HERE
                </p>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-8">
                  Four eras.
                  <br />
                  One handshake.
                </h2>
                <ol className="border-l-2 border-border space-y-1">
                  {ERAS.map(era => {
                    const active = era.id === activeEra;
                    return (
                      <li key={era.id} className="relative -ml-[2px]">
                        <a
                          href={`#era-${era.id}`}
                          className={cn(
                            "block pl-5 pr-2 py-2 border-l-2 -ml-[2px] transition-all",
                            active
                              ? "border-secondary"
                              : "border-transparent hover:border-secondary/40",
                          )}
                        >
                          <div
                            className={cn(
                              "text-xs font-bold tracking-widest uppercase",
                              active ? "text-secondary" : "text-muted-foreground",
                            )}
                          >
                            {era.year}
                          </div>
                          <div
                            className={cn(
                              "text-sm font-bold leading-snug",
                              active ? "text-primary" : "text-foreground/75",
                            )}
                          >
                            {era.label}
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </aside>

            {/* Right narrative */}
            <div className="lg:col-span-8 space-y-16">
              {ERAS.map((era, idx) => (
                <article
                  key={era.id}
                  id={`era-${era.id}`}
                  className="scroll-mt-32"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl md:text-6xl font-black text-secondary leading-none">
                      {era.year}
                    </span>
                    <span className="text-xs font-bold tracking-[0.22em] uppercase text-muted-foreground">
                      Chapter {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight mb-4">
                    {era.headline}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/85 leading-relaxed max-w-2xl">
                    {era.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Bento: portrait + pull quotes + KPI tiles */}
      <section className="bg-muted/40 py-16 md:py-24 border-y border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              VOICES FROM THE SITE
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              The way we talk on the radio.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-5">
            <div className="md:col-span-3 lg:col-span-5 row-span-2 relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[440px] ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1100&h=1300&fit=crop"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-white">
                <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-1">
                  Field office · Dallas
                </p>
                <p className="text-lg md:text-xl font-bold leading-tight">
                  Sites get walked at 6:30, not 8:30.
                </p>
              </div>
            </div>

            {PULL_QUOTES.map((q, i) => (
              <article
                key={i}
                className={cn(
                  "rounded-2xl bg-card border border-border p-6 md:p-7 shadow-sm relative",
                  i === 0 && "md:col-span-3 lg:col-span-7",
                  i === 1 && "md:col-span-3 lg:col-span-4",
                  i === 2 && "md:col-span-3 lg:col-span-3",
                )}
              >
                <Quote
                  className="absolute top-4 right-4 h-7 w-7 text-secondary/20"
                  aria-hidden
                />
                <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
                  "{q.quote}"
                </p>
                <p className="mt-5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  — {q.author}
                </p>
              </article>
            ))}

            {KPI_TILES.map(k => (
              <div
                key={k.label}
                className="md:col-span-3 lg:col-span-3 rounded-2xl bg-primary text-primary-foreground p-6 md:p-7 flex flex-col justify-between min-h-[140px]"
              >
                <span className="text-3xl md:text-4xl font-black text-secondary leading-none">
                  {k.value}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-white/75">
                  {k.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Authority marquee */}
      <section className="bg-background py-10 border-b border-border overflow-hidden">
        <div className="container-custom px-4 md:px-8 mb-5">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-muted-foreground">
            Inspected, audited, and on-file with —
          </p>
        </div>
        <div
          ref={tickerRef}
          className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex shrink-0 gap-10 px-6 animate-[summit-marquee_42s_linear_infinite]">
            {[...AUTHORITIES, ...AUTHORITIES].map((a, i) => (
              <span
                key={`${a}-${i}`}
                className="text-sm md:text-base font-bold tracking-wider uppercase text-foreground/85 inline-flex items-center gap-3 whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {a}
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes summit-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* 5 — Image-quote collage */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              FIELD MARKERS
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              Things you'll find on a Summit job.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ClipboardSignature, label: "Daily site log, signed in ink" },
              { icon: HardHat, label: "Same super, start to finish" },
              { icon: TreePine, label: "Mature trees protected, not 'managed'" },
              { icon: Hammer, label: "Punch list closed before final pay" },
              { icon: Building, label: "Subs we've used 10+ years" },
              { icon: Wrench, label: "Aftercare line, real number" },
              { icon: ArrowUpRight, label: "Weekly photo updates, no portal logins" },
              { icon: ClipboardSignature, label: "10-year workmanship warranty" },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 hover:border-secondary/60 transition-colors"
              >
                <Icon className="h-7 w-7 text-secondary mb-3" strokeWidth={1.6} />
                <p className="text-sm font-semibold text-foreground leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Blueprint-style closing CTA (NOT shared CTASection) */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden border-t border-secondary/30">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-custom relative px-4 md:px-8 py-16 md:py-20 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              FILE NO. 0001 · DRAFT FOR YOUR PROJECT
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[1.02]">
              Your project deserves
              <br />
              a builder, not a broker.
            </h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/85">
              {[
                "Single point of contact, start to finish",
                "Weekly photo + schedule update by email",
                "Allowances and changes priced in writing",
                "10-year workmanship warranty",
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-md text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/contact" className="inline-flex items-center justify-center gap-2">
                START THE FILE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {COMPANY.phone && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-md text-sm font-extrabold tracking-wider bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-primary"
              >
                <a href={`tel:${cleanPhone}`}>{COMPANY.phone}</a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
