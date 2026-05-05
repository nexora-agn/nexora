import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  Home,
  Factory,
  Hammer,
  ArrowRight,
  ArrowUpRight,
  Check,
  Minus,
  Calendar,
  Truck,
  HardHat,
  ClipboardCheck,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Reveal from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit Services — distinct from both the homepage ribbon and Constructo Services.
 *  1. Custom split hero (not PageHeader) with sector counter
 *  2. Tabbed pillar interface (Commercial / Residential / Industrial / Renovation)
 *  3. Day-in-the-life phased strip
 *  4. Scope comparator matrix (Starter / Build / Build+Aftercare)
 *  5. Mini-spotlight rotation
 *  6. Page-unique CTA */

type PillarId = "commercial" | "residential" | "industrial" | "renovation";

interface Pillar {
  id: PillarId;
  label: string;
  short: string;
  icon: typeof Building2;
  blurb: string;
  bullets: string[];
  image: string;
  serviceLink: string;
  signature: string;
}

const PILLARS: Pillar[] = [
  {
    id: "commercial",
    label: "Commercial",
    short: "Office · Retail · Medical",
    icon: Building2,
    blurb:
      "Class-A buildouts, ground-up commercial, and tenant improvements. We sequence trades around your business hours so the doors stay open while the floor plan changes.",
    bullets: [
      "After-hours phasing for occupied buildings",
      "Tenant lease-coordination support",
      "MEP commissioning + envelope testing",
      "Permit-runner on payroll, not on retainer",
    ],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1100&h=900&fit=crop",
    serviceLink: "/services/commercial-construction",
    signature: "$5M – $40M typical · 6–18 month delivery",
  },
  {
    id: "residential",
    label: "Residential",
    short: "Custom Homes · Additions · Estates",
    icon: Home,
    blurb:
      "Architect-led custom homes and substantial additions. We protect the parts of your house you love while we change the parts you don't. Dust control and a working kitchen are non-negotiable.",
    bullets: [
      "Existing-conditions survey before demo",
      "Daily cleanup standard, not optional",
      "Smart-home and pre-wire packages",
      "Owner walk every Friday at 4pm",
    ],
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1100&h=900&fit=crop",
    serviceLink: "/services/residential-construction",
    signature: "$500K – $6M typical · 4–14 month delivery",
  },
  {
    id: "industrial",
    label: "Industrial",
    short: "Warehouse · Distribution · Light Manufacturing",
    icon: Factory,
    blurb:
      "Tilt-wall, pre-engineered metal, and concrete-tilt distribution facilities. We pour slabs flat enough to forklift on day one and design dock heights around the trucks you actually run.",
    bullets: [
      "FF/FL flatness specs to your equipment",
      "Dock door + leveler procurement",
      "Site civil + stormwater coordination",
      "Crane-runway-ready bays available",
    ],
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1100&h=900&fit=crop",
    serviceLink: "/services/construction-management",
    signature: "$8M – $60M typical · 8–20 month delivery",
  },
  {
    id: "renovation",
    label: "Renovation",
    short: "Adaptive Reuse · Historic · Hospitality",
    icon: Hammer,
    blurb:
      "We work inside walls that were standing before any of us were born. Surgical demolition, structural cataloguing, and a respect for what shouldn't be touched.",
    bullets: [
      "Historic-tax-credit qualified work",
      "Selective demo with archival photos",
      "Structural reinforcement engineered in-house",
      "Owner-occupied phasing available",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1100&h=900&fit=crop",
    serviceLink: "/services/renovation",
    signature: "$300K – $20M typical · 3–18 month delivery",
  },
];

const DAY_PHASES = [
  {
    time: "06:30",
    label: "Site walk",
    description:
      "Super walks the perimeter alone before crews arrive. Looks at yesterday's punch and tomorrow's deliveries.",
    icon: HardHat,
  },
  {
    time: "07:30",
    label: "Toolbox + sign-in",
    description:
      "Pre-task talk on the day's lifts and overhead work. Every visitor signs in. No exceptions, including the owner.",
    icon: ClipboardCheck,
  },
  {
    time: "10:00",
    label: "Material verification",
    description:
      "Receiver checks every delivery against the submittal. Wrong color goes back on the truck.",
    icon: Truck,
  },
  {
    time: "16:00",
    label: "Photo log + tomorrow",
    description:
      "Closing photos uploaded. Three-day look-ahead refreshed. Owner's email goes out at 4:30 sharp.",
    icon: Calendar,
  },
];

interface MatrixRow {
  label: string;
  starter: boolean;
  build: boolean;
  full: boolean;
}

const MATRIX_ROWS: MatrixRow[] = [
  { label: "Conceptual estimate (no obligation)", starter: true, build: true, full: true },
  { label: "Permit coordination + city liaison", starter: false, build: true, full: true },
  { label: "Senior superintendent on payroll", starter: false, build: true, full: true },
  { label: "Weekly photo report + 3-day look-ahead", starter: false, build: true, full: true },
  { label: "Subcontractor pre-qualification audit", starter: false, build: true, full: true },
  { label: "10-year workmanship warranty", starter: false, build: true, full: true },
  { label: "Annual systems checkup (HVAC / envelope)", starter: false, build: false, full: true },
  { label: "Aftercare line, owner-named technician", starter: false, build: false, full: true },
  { label: "Capital plan refresh every 24 months", starter: false, build: false, full: true },
];

const SPOTLIGHTS = [
  {
    metric: "14 weeks",
    headline: "Shell to opening night for a chef-led restaurant.",
    detail:
      "Bespoke millwork bar, exhibition kitchen, outdoor patio. Health permit cleared on first inspection.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=700&fit=crop",
  },
  {
    metric: "Zero LTI",
    headline: "180,000 sqft tilt-wall, hands-clean delivery.",
    detail:
      "32-foot clear heights, 22 dock doors, slab poured to FF55/FL40. Forklift-ready day one.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&h=700&fit=crop",
  },
  {
    metric: "2x referral",
    headline: "Custom estate that became a second home next door.",
    detail:
      "8,500 sqft, infinity pool, mature oak protection plan. Neighbor hired us before move-in.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&h=700&fit=crop",
  },
];

const Services = () => {
  const { company: COMPANY } = useSiteContent();
  const [active, setActive] = useState<PillarId>("commercial");
  const activePillar = PILLARS.find(p => p.id === active) ?? PILLARS[0];
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  return (
    <Layout>
      <Helmet>
        <title>What we build | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} delivers commercial, residential, industrial, and renovation construction across North Texas.`}
        />
      </Helmet>

      {/* 1 — Custom split hero (not PageHeader) */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              FOUR PILLARS · ONE BUILDER
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              We don't do everything.
              <br />
              <span className="text-secondary">We do four things well.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-foreground/80 max-w-2xl leading-relaxed">
              Pick the pillar that fits your project. Each one is run by a
              dedicated PM and superintendent who built their last twelve jobs
              in the same lane.
            </p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 self-end">
            {PILLARS.map(p => (
              <div
                key={p.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p.icon className="h-6 w-6 text-secondary mb-2" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {p.label}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                  {p.short}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Tabbed pillar interface */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          {/* Tab strip */}
          <div className="flex flex-wrap gap-2 border-b border-border mb-10">
            {PILLARS.map(p => {
              const isActive = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-5 py-3 text-sm md:text-base font-extrabold tracking-wider uppercase transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <p.icon className="h-4 w-4" />
                  {p.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-secondary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-secondary mb-3">
                {activePillar.short}
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-5">
                {activePillar.label} construction
              </h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-7">
                {activePillar.blurb}
              </p>
              <ul className="space-y-3 mb-8">
                {activePillar.bullets.map(b => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm md:text-base text-foreground/90"
                  >
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <Link to={activePillar.serviceLink}>
                    SEE THE FULL SCOPE
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {activePillar.signature}
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 aspect-[4/5] lg:aspect-[4/5]">
                <img
                  src={activePillar.image}
                  alt={activePillar.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  key={activePillar.id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                <div className="absolute left-5 right-5 bottom-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-foreground" />
                    Active book
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Day-in-the-life phased strip */}
      <Reveal>
        <section className="bg-primary text-primary-foreground py-16 md:py-24 border-y border-secondary/20">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-12 gap-10 mb-12">
              <div className="lg:col-span-6">
                <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
                  ONE DAY ON SITE
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[1.02]">
                  What "well run" looks like
                  <br />
                  on a Tuesday.
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                  Every Summit job runs on the same daily rhythm whether it's a
                  six-week kitchen or a twenty-month distribution facility. The
                  cadence below is what an owner can expect to see, every day,
                  from kickoff through punch.
                </p>
              </div>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {DAY_PHASES.map((phase, i) => {
                const Icon = phase.icon;
                return (
                  <li
                    key={phase.time}
                    className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm"
                  >
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black tracking-widest uppercase px-2.5 py-1">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-secondary tabular-nums">
                      {phase.time}
                    </span>
                    <div className="mt-3 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-secondary" />
                      <p className="text-sm font-bold uppercase tracking-wider">
                        {phase.label}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      {phase.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* 4 — Scope comparator matrix */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              ENGAGEMENT PACKAGES
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              Pick the pour line.
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Every relationship starts with a conceptual estimate. From there,
              you choose how deep we go — and you can move up at any time.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-muted/60 text-left">
                  <th className="py-4 px-5 md:px-7 font-extrabold tracking-wide uppercase text-primary text-xs md:text-sm w-[44%]">
                    Inclusion
                  </th>
                  <th className="py-4 px-3 md:px-5 font-extrabold tracking-wide uppercase text-muted-foreground text-xs md:text-sm text-center">
                    Starter Estimate
                  </th>
                  <th className="py-4 px-3 md:px-5 font-extrabold tracking-wide uppercase text-primary text-xs md:text-sm text-center bg-secondary/10">
                    Build
                  </th>
                  <th className="py-4 px-3 md:px-5 font-extrabold tracking-wide uppercase text-primary text-xs md:text-sm text-center">
                    Build + Aftercare
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-t border-border",
                      i % 2 === 1 && "bg-background",
                    )}
                  >
                    <td className="py-3.5 px-5 md:px-7 text-foreground/90 font-medium">
                      {row.label}
                    </td>
                    {[row.starter, row.build, row.full].map((on, idx) => (
                      <td
                        key={idx}
                        className={cn(
                          "py-3.5 px-3 md:px-5 text-center",
                          idx === 1 && "bg-secondary/10",
                        )}
                      >
                        {on ? (
                          <Check className="h-5 w-5 text-secondary mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5 — Mini-spotlight rotation */}
      <section className="bg-muted/40 section-padding border-y border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                FROM THE DELIVERY LOG
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                Three jobs we'd do again tomorrow.
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-extrabold tracking-widest uppercase text-primary hover:text-secondary transition-colors inline-flex items-center gap-2 self-start md:self-end"
            >
              FULL DELIVERY LOG
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPOTLIGHTS.map((s, i) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {s.metric}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base md:text-lg font-black uppercase text-primary leading-tight tracking-tight">
                    {s.headline}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.detail}
                  </p>
                </div>
                <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Page-unique CTA — short ribbon, not full band */}
      <section className="bg-secondary text-secondary-foreground border-y border-secondary">
        <div className="container-custom px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase opacity-70 mb-2">
              No commitment · One business day
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Tell us the pillar. We'll send you a real number.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact">REQUEST CONCEPTUAL ESTIMATE</Link>
            </Button>
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="text-sm font-extrabold tracking-widest uppercase border-b-2 border-primary/40 hover:border-primary transition-colors"
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

export default Services;
