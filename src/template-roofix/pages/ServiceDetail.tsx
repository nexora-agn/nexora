import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  CalendarRange,
  DollarSign,
  Layers,
  ShieldCheck,
  Sparkles,
  Hammer,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit ServiceDetail. New archetypes (not on home, not on Constructo):
 *  1. Diagonal-wedge image hero with metadata tape
 *  2. Vertical scope→deliverables accordion with thumbnail preview pane
 *  3. Duration + budget table styled as a permit slab
 *  4. "Add-ons" bento tiles (compatible adjacent services)
 *  5. Page-unique closing strip */

interface ScopePhase {
  id: string;
  label: string;
  summary: string;
  deliverables: string[];
  thumb: string;
}

const SCOPE_PHASES: ScopePhase[] = [
  {
    id: "discovery",
    label: "Discovery & feasibility",
    summary:
      "Site walk, existing-conditions review, and a written feasibility note before any pricing happens.",
    deliverables: [
      "Site walk + photo log",
      "Zoning & code memo",
      "Order-of-magnitude cost band",
      "Schedule sketch with critical path",
    ],
    thumb:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=700&fit=crop",
  },
  {
    id: "design",
    label: "Design alignment",
    summary:
      "We coordinate with your architect (or bring our own), test trade-offs, and lock the program.",
    deliverables: [
      "Architectural narrative",
      "MEP basis-of-design",
      "Allowance schedule",
      "Long-lead procurement plan",
    ],
    thumb:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&h=700&fit=crop",
  },
  {
    id: "preconstruction",
    label: "Preconstruction & permits",
    summary:
      "Drawings priced, subs pre-qualified, permits filed. Nothing leaves the office without a sub on it.",
    deliverables: [
      "Permit set + city liaison",
      "Subcontractor leveling matrix",
      "Insurance & bonding stack",
      "GMP or fixed-price proposal",
    ],
    thumb:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=700&fit=crop",
  },
  {
    id: "build",
    label: "Build phase",
    summary:
      "Senior super on site daily. Weekly photo log, three-day look-ahead, and an owner walk every Friday.",
    deliverables: [
      "Daily safety + sign-in log",
      "Weekly photo + schedule update",
      "Friday owner walk + minutes",
      "Change-order discipline (priced first)",
    ],
    thumb:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=700&fit=crop",
  },
  {
    id: "closeout",
    label: "Closeout & aftercare",
    summary:
      "Punch closed before final pay. O&M binder, warranty stack, and a real phone number that picks up.",
    deliverables: [
      "Punch list with photos, signed",
      "As-builts + O&M manuals (digital)",
      "Warranty stack delivered to owner",
      "10-year workmanship pledge",
    ],
    thumb:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
  },
];

interface BudgetBand {
  scale: string;
  value: string;
  duration: string;
  contract: string;
}

const BUDGET_BANDS: BudgetBand[] = [
  {
    scale: "Compact (single-trade focus)",
    value: "$50K – $250K",
    duration: "4 – 10 weeks",
    contract: "Fixed price",
  },
  {
    scale: "Mid (renovation + addition / TI)",
    value: "$250K – $2M",
    duration: "3 – 8 months",
    contract: "Fixed-price milestones",
  },
  {
    scale: "Major (ground-up / large reno)",
    value: "$2M – $15M",
    duration: "6 – 14 months",
    contract: "GMP with allowances",
  },
  {
    scale: "Anchor (multi-phase / campus)",
    value: "$15M+",
    duration: "12 – 24 months",
    contract: "Negotiated GMP / IPD",
  },
];

const ADDONS = [
  {
    icon: Sparkles,
    title: "Owner-furniture procurement",
    body: "We'll receive, inspect, and stage everything before move-in day so you don't unpack a damaged piece.",
  },
  {
    icon: ShieldCheck,
    title: "Building-systems commissioning",
    body: "Independent commissioning of HVAC, controls, and envelope before you accept the building.",
  },
  {
    icon: CalendarRange,
    title: "Annual building checkup",
    body: "We come back in year one and year two — caulk, sealants, mechanicals — and write a one-page report.",
  },
  {
    icon: Hammer,
    title: "Aftercare retainer",
    body: "A named technician on standby for small fixes so you're not chasing your original GC.",
  },
];

const ServiceDetail = () => {
  const { id } = useParams();
  const { services, projects, company: COMPANY } = useSiteContent();
  const service = services.find(s => s.id === id);
  const [openPhase, setOpenPhase] = useState<string>(SCOPE_PHASES[0].id);
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  const relatedProjects = useMemo(
    () => projects.slice(0, 3),
    [projects],
  );

  if (!service) {
    return (
      <Layout>
        <div className="section-padding container-custom px-4 md:px-8 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight text-primary">
            That service isn't on file.
          </h1>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 mt-6 text-sm font-extrabold tracking-widest uppercase text-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to services
          </Link>
        </div>
      </Layout>
    );
  }

  const activePhase =
    SCOPE_PHASES.find(p => p.id === openPhase) ?? SCOPE_PHASES[0];

  return (
    <Layout>
      <Helmet>
        <title>
          {service.title} | {COMPANY.name}
        </title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* 1 — Diagonal-wedge image hero with metadata tape */}
      <section className="relative isolate bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt=""
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/35" />
        </div>
        <div className="relative container-custom px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-secondary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All four pillars
          </Link>
          <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
            SERVICE FILE · {service.id.replace(/-/g, " ").toUpperCase()}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] max-w-3xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
            {service.description}
          </p>
        </div>
        {/* Metadata tape strip */}
        <div className="relative bg-secondary text-secondary-foreground">
          <div className="container-custom px-4 md:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] md:text-xs font-bold tracking-widest uppercase">
            <span>License · Bonded</span>
            <span className="opacity-40">·</span>
            <span>OSHA-30 field</span>
            <span className="opacity-40">·</span>
            <span>10-yr workmanship warranty</span>
            <span className="opacity-40">·</span>
            <span>One business-day response</span>
          </div>
        </div>
      </section>

      {/* 2 — Vertical accordion with preview pane */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              SCOPE FILE
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              The five doors we open with every owner.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Accordion */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                {SCOPE_PHASES.map((phase, idx) => {
                  const isOpen = phase.id === openPhase;
                  return (
                    <div key={phase.id}>
                      <button
                        type="button"
                        onClick={() => setOpenPhase(phase.id)}
                        className={cn(
                          "w-full flex items-start gap-4 px-5 md:px-6 py-5 text-left transition-colors",
                          isOpen
                            ? "bg-secondary/5"
                            : "hover:bg-muted/40",
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0 mt-0.5 w-9 text-xs font-black tracking-widest tabular-nums uppercase",
                            isOpen
                              ? "text-secondary"
                              : "text-muted-foreground/70",
                          )}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-base md:text-lg font-black uppercase tracking-tight text-primary leading-snug">
                            {phase.label}
                          </span>
                          <span
                            className={cn(
                              "block text-sm leading-relaxed transition-all",
                              isOpen
                                ? "mt-2 text-foreground/85"
                                : "mt-1 text-muted-foreground line-clamp-1",
                            )}
                          >
                            {phase.summary}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                            isOpen
                              ? "bg-secondary text-secondary-foreground rotate-180"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 md:px-6 pb-6 -mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                          {phase.deliverables.map(d => (
                            <div
                              key={d}
                              className="flex items-start gap-2 text-sm text-foreground/85"
                            >
                              <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" strokeWidth={3} />
                              {d}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview pane */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-black/5">
                  <img
                    key={activePhase.id}
                    src={activePhase.thumb}
                    alt={activePhase.label}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4 text-white">
                    <p className="text-[10px] font-black tracking-[0.28em] uppercase text-secondary">
                      Preview
                    </p>
                    <p className="text-base md:text-lg font-bold">
                      {activePhase.label}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-primary text-primary-foreground p-5 md:p-6">
                  <Layers className="h-6 w-6 text-secondary mb-3" />
                  <p className="text-sm uppercase tracking-widest font-bold text-secondary">
                    Document trail
                  </p>
                  <p className="mt-2 text-sm text-white/85 leading-relaxed">
                    Every phase produces a paper artifact you can hand to a
                    lender, an inspector, or your own kids in twenty years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Budget + duration table styled as permit slab */}
      <section className="bg-muted/40 section-padding border-y border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                ROUGH BANDS
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                Honest numbers.
                <br />
                Posted up front.
              </h2>
            </div>
            <p className="lg:col-span-7 text-base md:text-lg text-foreground/80 leading-relaxed self-end">
              These bands are where most of our work lands. Yours might fall
              outside — that's fine, we'll tell you fast. Schedules assume
              permits issue on the first cycle and long-lead items are reserved
              early.
            </p>
          </div>

          <div className="rounded-2xl bg-card border-2 border-primary/10 overflow-hidden shadow-[0_30px_60px_-30px_rgba(10,22,40,0.25)]">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-primary text-primary-foreground py-3 px-5 md:px-7 text-[10px] md:text-xs font-black tracking-[0.22em] uppercase">
              <span className="md:col-span-5">Project scale</span>
              <span className="md:col-span-3 flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-secondary" /> Value band
              </span>
              <span className="md:col-span-2 flex items-center gap-1.5">
                <CalendarRange className="h-3 w-3 text-secondary" /> Duration
              </span>
              <span className="md:col-span-2 flex items-center gap-1.5">
                <ClipboardList className="h-3 w-3 text-secondary" /> Contract
              </span>
            </div>
            {BUDGET_BANDS.map((band, i) => (
              <div
                key={band.scale}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-12 py-5 px-5 md:px-7 text-sm border-t border-border gap-y-1",
                  i % 2 === 1 && "bg-muted/40",
                )}
              >
                <span className="md:col-span-5 font-bold text-primary">
                  {band.scale}
                </span>
                <span className="md:col-span-3 text-foreground/85 tabular-nums font-semibold">
                  {band.value}
                </span>
                <span className="md:col-span-2 text-foreground/85 tabular-nums">
                  {band.duration}
                </span>
                <span className="md:col-span-2 text-xs font-bold tracking-widest uppercase text-secondary">
                  {band.contract}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Add-ons bento (NOT a generic "Key Benefits" list) */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                BOLT-ONS
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                What you can add on the same contract.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDONS.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-secondary/60 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/15 text-secondary mb-4">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <h3 className="text-base font-black uppercase tracking-tight text-primary leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related delivery log */}
      {relatedProjects.length > 0 && (
        <Reveal>
          <section className="bg-muted/40 section-padding border-t border-border">
            <div className="container-custom px-4 md:px-8">
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight">
                  Built in this lane recently
                </h2>
                <Link
                  to="/projects"
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary"
                >
                  ALL PROJECTS <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedProjects.map(p => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="group block rounded-xl overflow-hidden bg-card border border-border"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                        {p.category}
                      </p>
                      <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-primary mt-1 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {p.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* 5 — Page-unique CTA: minimal split */}
      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              ONE BUSINESS DAY · NO COMMITMENT
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
              Ready to scope the {service.title.toLowerCase()}?
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/contact">START THE FILE</Link>
            </Button>
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="text-sm font-extrabold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/30 hover:border-secondary transition-colors"
              >
                or call {COMPANY.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
