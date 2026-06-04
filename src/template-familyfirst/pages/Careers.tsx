import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Phone,
  HardHat,
  Users,
  ShieldCheck,
  Coffee,
  Wrench,
  GraduationCap,
  Briefcase,
  Mail,
  Award,
  CalendarRange,
  Wrench,
} from "lucide-react";
import Layout from "@template-familyfirst/components/layout/Layout";
import PlumbingPageHero from "@template-familyfirst/components/sections/PlumbingPageHero";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Mail,
    label: "Apply",
    body: "Email a short note about your experience. Resume optional — we care more about your craft.",
  },
  {
    icon: Phone,
    label: "Phone screen",
    body: "Twenty minutes with operations or a lead plumber. Two-way conversation, not an interrogation.",
  },
  {
    icon: HardHat,
    label: "Ride-along",
    body: "Half a day on an active job with the crew you'd join. Safety gear provided.",
  },
  {
    icon: ClipboardCheck,
    label: "Offer",
    body: "Written offer within 48 hours. Published pay bands — no surprise negotiations.",
  },
];

type BenefitTabId = "field" | "specialist" | "apprentice";

interface BenefitTab {
  id: BenefitTabId;
  label: string;
  who: string;
  perks: { icon: typeof Coffee; title: string; body: string }[];
}

const BENEFIT_TABS: BenefitTab[] = [
  {
    id: "field",
    label: "Field plumbers",
    who: "Journeyman, commercial, service techs",
    perks: [
      {
        icon: Wrench,
        title: "Tool stipend",
        body: "Annual stipend for the tools you actually use — replaced when they break on the job.",
      },
      {
        icon: ShieldCheck,
        title: "Health, dental, vision",
        body: "Same plan as the office team. No two-tier benefits for field crews.",
      },
      {
        icon: HardHat,
        title: "OSHA-30 paid",
        body: "Paid hours during certification. Renewal cycles on the company.",
      },
      {
        icon: Users,
        title: "Steady crew pairings",
        body: "Crews stay together on jobs — not split mid-project to chase another dispatch.",
      },
    ],
  },
  {
    id: "specialist",
    label: "Specialists",
    who: "EV, smart home, commercial leads",
    perks: [
      {
        icon: Wrench,
        title: "Manufacturer training",
        body: "Generac, ChargePoint, Lutron, and NEC update courses paid and scheduled.",
      },
      {
        icon: ShieldCheck,
        title: "Full benefits",
        body: "100% employee premium covered. Family covered at 75%.",
      },
      {
        icon: GraduationCap,
        title: "Continuing education",
        body: "Up to $4,000/year for licensure, CE credits, or master plumber prep.",
      },
      {
        icon: Award,
        title: "Quality bonus pool",
        body: "Crews with zero callbacks and clean inspections split a published bonus pool.",
      },
    ],
  },
  {
    id: "apprentice",
    label: "Apprentice",
    who: "Trade-school grads, career changers",
    perks: [
      {
        icon: GraduationCap,
        title: "Mentor pairing",
        body: "Paired with a master plumber for a documented two-year safety + install curriculum.",
      },
      {
        icon: CalendarRange,
        title: "Predictable hours",
        body: "Day-shift schedule, weekends free unless emergency dispatch requires coverage.",
      },
      {
        icon: ShieldCheck,
        title: "Benefits from day one",
        body: "Health, dental, and vision available immediately — same plan as everyone else.",
      },
      {
        icon: Award,
        title: "Promotion ladder",
        body: "Written milestones to journeyman with reviews every six months.",
      },
    ],
  },
];

interface JobOpening {
  id: string;
  role: string;
  type: string;
  location: string;
  level: string;
  summary: string;
}

const OPENINGS: JobOpening[] = [
  {
    id: "journeyman-residential",
    role: "Journeyman Plumber — Residential",
    type: "Full-time / field",
    location: "Central NJ dispatch",
    level: "3–7 yrs",
    summary:
      "Panel upgrades, rewires, water heaters, and service calls — NEC-compliant work with clean job sites and labeled panels.",
  },
  {
    id: "ev-specialist",
    role: "EV & Smart Home Specialist",
    type: "Full-time / field",
    location: "North Texas",
    level: "4+ yrs",
    summary:
      "Level 2 charger installs, load calculations, Lutron and smart panel wiring — manufacturer certifications a plus.",
  },
  {
    id: "commercial-plumber",
    role: "Commercial Plumber",
    type: "Full-time / field",
    location: "Central NJ commercial routes",
    level: "5+ yrs",
    summary:
      "Tenant improvements, three-phase distribution, and after-hours scheduling — coordinate with GCs, document as-builts.",
  },
  {
    id: "service-tech",
    role: "Service & Repair Technician",
    type: "Full-time / field",
    location: "Dispatch, Central NJ",
    level: "3–5 yrs",
    summary:
      "Tripping breakers, dead outlets, emergency calls — stocked truck, master-level diagnostics, honest estimates.",
  },
  {
    id: "apprentice-plumber",
    role: "Apprentice Plumber",
    type: "Apprentice",
    location: "Field, Central NJ",
    level: "Entry / trade school",
    summary:
      "Two-year mentored program: conduit bending, panel etiquette, lockout/tagout, and Texas licensure prep.",
  },
];

const Careers = () => {
  const { company: COMPANY } = useSiteContent();
  const [tab, setTab] = useState<BenefitTabId>("field");
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const activeTab = BENEFIT_TABS.find(t => t.id === tab) ?? BENEFIT_TABS[0];

  return (
    <Layout>
      <Helmet>
        <title>Careers | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Join ${COMPANY.name}: journeyman plumbers, water heater specialists, commercial plumbers, and apprentices across Central NJ.`}
        />
      </Helmet>

      <PlumbingPageHero
        eyebrow="Hiring Master Craftsmen"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Careers" }]}
        title="We hire plumbers like family."
        body="Long tenure, written offers, and published pay bands for every role. We'd rather find one plumber we'll keep than fill a slot every six months."
        rightSlot={
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm col-span-2">
              <span className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--secondary))] leading-none">
                88%
              </span>
              <p className="mt-2 text-[10px] font-sans-brand font-semibold tracking-widest uppercase text-muted-foreground">
                Field staff returning year-on-year
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="font-display text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] leading-none">14 yrs</div>
              <div className="mt-2 text-[10px] font-sans-brand font-semibold tracking-widest uppercase text-muted-foreground">
                Avg. senior tenure
              </div>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="font-display text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] leading-none">$0</div>
              <div className="mt-2 text-[10px] font-sans-brand font-semibold tracking-widest uppercase text-muted-foreground">
                Health premium for staff
              </div>
            </div>
          </div>
        }
      />

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-display font-bold tracking-[0.22em] text-[hsl(var(--secondary))] mb-3 uppercase">
              The Journey
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-tight">
              Four steps. One handshake.
            </h2>
          </div>
          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <span aria-hidden className="hidden md:block absolute left-0 right-0 top-7 h-0.5 bg-slate-200" />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className="relative">
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-sm font-display font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-6 w-6 text-[hsl(var(--secondary))] mt-4" strokeWidth={1.6} />
                  <h3 className="mt-3 font-display text-base md:text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-display font-bold tracking-[0.22em] text-[hsl(var(--secondary))] mb-3 uppercase">
              Benefits
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-tight">
              The same plan, three ways in.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-slate-200 mb-10">
            {BENEFIT_TABS.map(t => {
              const isActive = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "relative inline-flex flex-col items-start gap-0.5 px-5 py-3 text-left transition-colors",
                    isActive ? "text-[hsl(var(--primary))]" : "text-slate-500 hover:text-[hsl(var(--primary))]",
                  )}
                >
                  <span className="text-sm md:text-base font-display font-bold tracking-wider uppercase">{t.label}</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{t.who}</span>
                  {isActive ? (
                    <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-[hsl(var(--secondary))]" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeTab.perks.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-lg bg-[hsl(var(--flow-surface))] border border-slate-100 p-6 hover:border-[hsl(var(--secondary))]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))] mb-4">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ff-page-hero border-y border-border py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <p className="text-xs font-sans-brand font-bold tracking-[0.28em] text-[hsl(var(--secondary))] mb-3 uppercase">
              Safety · Not Negotiable
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-[hsl(var(--primary))]">
              The numbers we work to keep.
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              Every Family First Plumbing job site runs under proper safety protocols and code-compliant plumbing. Every employee has stop-work authority. We publish these metrics because insurers and GCs ask for them.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "0.68", l: "EMR · industry avg 1.0" },
              { v: "0", l: "Lost-time incidents (24 mo)" },
              { v: "100%", l: "Field on OSHA-30" },
              { v: "Daily", l: "Toolbox talks logged" },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--secondary))] leading-none tabular-nums">
                  {s.v}
                </div>
                <div className="mt-3 text-[10px] font-sans-brand font-semibold tracking-widest uppercase text-muted-foreground leading-tight">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-display font-bold tracking-[0.22em] text-[hsl(var(--secondary))] mb-3 uppercase">
                Open Roles · {OPENINGS.length}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-tight">
                Pick the one that fits.
              </h2>
            </div>
            <a
              href={`mailto:${COMPANY.email}?subject=General%20application`}
              className="hidden md:inline-flex items-center gap-2 text-xs font-display font-bold tracking-widest uppercase text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
            >
              General Application
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <ul className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-200 overflow-hidden">
            {OPENINGS.map(role => (
              <li key={role.id}>
                <a
                  href={`mailto:${COMPANY.email}?subject=Application%20-%20${encodeURIComponent(role.role)}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-5 md:px-7 py-5 hover:bg-[hsl(var(--flow-surface))] transition-colors items-center"
                >
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))] px-2 py-0.5 text-[10px] font-display font-bold tracking-widest uppercase">
                        <Briefcase className="h-3 w-3" /> {role.type}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{role.level}</span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-snug group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {role.role}
                    </h3>
                  </div>
                  <p className="md:col-span-5 text-sm text-slate-600 leading-relaxed">{role.summary}</p>
                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{role.location}</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/10 text-[hsl(var(--secondary))] group-hover:bg-[hsl(var(--secondary))] group-hover:text-[hsl(var(--secondary-foreground))] transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border-y border-[hsl(var(--secondary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-display font-bold tracking-[0.28em] uppercase opacity-70 mb-2">
              Don&apos;t see your role?
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide leading-tight">
              Send us a paragraph about what you&apos;d build with us.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <Button
              asChild
              className="h-12 rounded-sm px-6 text-sm font-display font-bold tracking-wider uppercase bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90"
            >
              <a href={`mailto:${COMPANY.email}?subject=General%20application`} className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </Button>
            {COMPANY.phone ? (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 self-center text-sm font-display font-bold tracking-widest uppercase border-b-2 border-[hsl(var(--primary))]/40 hover:border-[hsl(var(--primary))] transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                or call {COMPANY.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
