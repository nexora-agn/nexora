import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Phone,
  Car,
  Users,
  ShieldCheck,
  Coffee,
  Wrench,
  GraduationCap,
  Briefcase,
  Mail,
  Award,
  CalendarRange,
} from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Mail,
    label: "Apply",
    body: "Email a short note about your experience. Resume optional — we care more about how you help customers.",
  },
  {
    icon: Phone,
    label: "Phone screen",
    body: "Twenty minutes with hiring managers or a department lead. Two-way conversation, not an interrogation.",
  },
  {
    icon: Car,
    label: "Shadow day",
    body: "Half a day on the floor or in the shop with the team you'd join. Learn the tools and the culture.",
  },
  {
    icon: ClipboardCheck,
    label: "Offer",
    body: "Written offer within 48 hours. Published pay bands — no surprise negotiations.",
  },
];

type BenefitTabId = "sales" | "service" | "apprentice";

interface BenefitTab {
  id: BenefitTabId;
  label: string;
  who: string;
  perks: { icon: typeof Coffee; title: string; body: string }[];
}

const BENEFIT_TABS: BenefitTab[] = [
  {
    id: "sales",
    label: "Sales team",
    who: "Product specialists, finance, BDC",
    perks: [
      {
        icon: Wrench,
        title: "Product training",
        body: "Paid manufacturer and EV product training so you can advise with confidence.",
      },
      {
        icon: ShieldCheck,
        title: "Health, dental, vision",
        body: "Same plan as service and office teams. No two-tier benefits.",
      },
      {
        icon: Car,
        title: "Demo & inventory access",
        body: "Know the cars you sell — structured demo drives and inventory walkthroughs.",
      },
      {
        icon: Users,
        title: "Team selling culture",
        body: "Shared goals and transparent deals — not cutthroat floor politics.",
      },
    ],
  },
  {
    id: "service",
    label: "Service & parts",
    who: "Technicians, advisors, parts",
    perks: [
      {
        icon: Wrench,
        title: "Factory certifications",
        body: "OEM training courses paid and scheduled for the brands we service.",
      },
      {
        icon: ShieldCheck,
        title: "Full benefits",
        body: "100% employee premium covered. Family covered at 75%.",
      },
      {
        icon: GraduationCap,
        title: "Continuing education",
        body: "Up to $4,000/year for ASE, manufacturer credentials, or EV high-voltage training.",
      },
      {
        icon: Award,
        title: "Quality bonus pool",
        body: "Techs with clean CSI and low comebacks share a published bonus pool.",
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
        body: "Paired with a senior technician for a documented two-year safety + repair curriculum.",
      },
      {
        icon: CalendarRange,
        title: "Predictable hours",
        body: "Day-shift schedule with clear overtime policies when volume requires coverage.",
      },
      {
        icon: ShieldCheck,
        title: "Benefits from day one",
        body: "Health, dental, and vision available immediately — same plan as everyone else.",
      },
      {
        icon: Award,
        title: "Promotion ladder",
        body: "Written milestones to journeyman tech with reviews every six months.",
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
    id: "sales-consultant",
    role: "Sales Consultant — New Vehicles",
    type: "Full-time / floor",
    location: "Austin Main",
    level: "2–5 yrs",
    summary:
      "Help buyers match the right new model, explain incentives clearly, and guide digital retail steps from browse to delivery.",
  },
  {
    id: "ev-specialist",
    role: "EV Product Specialist",
    type: "Full-time / floor",
    location: "Cedar Park EV Center",
    level: "3+ yrs",
    summary:
      "Own EV conversations — charging, range, incentives, and model comparisons for Central Texas drivers.",
  },
  {
    id: "service-advisor",
    role: "Service Advisor",
    type: "Full-time / shop",
    location: "Austin Main · Round Rock",
    level: "3–7 yrs",
    summary:
      "Write honest estimates, set expectations, and keep CSI high for maintenance and repair customers.",
  },
  {
    id: "service-tech",
    role: "Factory-Trained Technician",
    type: "Full-time / shop",
    location: "All locations",
    level: "3–5 yrs",
    summary:
      "Diagnostics, maintenance, and warranty work with OEM parts — ASE or manufacturer certs preferred.",
  },
  {
    id: "apprentice-tech",
    role: "Service Apprentice",
    type: "Apprentice",
    location: "Central Texas shops",
    level: "Entry / trade school",
    summary:
      "Two-year mentored program: safety, maintenance basics, and pathway to journeyman technician.",
  },
];

const Careers = () => {
  const { company: COMPANY } = useSiteContent();
  const [tab, setTab] = useState<BenefitTabId>("sales");
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const activeTab = BENEFIT_TABS.find(t => t.id === tab) ?? BENEFIT_TABS[0];

  return (
    <Layout>
      <Helmet>
        <title>Careers | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Join ${COMPANY.name}: sales consultants, EV specialists, service advisors, and technicians across Austin and Central Texas.`}
        />
      </Helmet>

      <section className="bg-[hsl(var(--primary))] text-white border-b border-[hsl(var(--secondary))]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-display font-bold tracking-[0.28em] text-[hsl(var(--secondary))] mb-4">
              HIRING AUTOMOTIVE PROS
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold uppercase tracking-wide leading-[1.02]">
              We hire people
              <br />
              <span className="text-[hsl(var(--secondary))]">who love cars.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
              Long tenure, written offers, and published pay bands for every role. We&apos;d rather find one teammate we&apos;ll keep than fill a slot every six months.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-5 col-span-2">
              <span className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--secondary))] leading-none">
                88%
              </span>
              <p className="mt-2 text-[10px] font-display font-bold tracking-widest uppercase text-white/75">
                Team members returning year-on-year
              </p>
            </div>
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-5">
              <div className="font-display text-2xl md:text-3xl font-bold text-white leading-none">14 yrs</div>
              <div className="mt-2 text-[10px] font-display font-bold tracking-widest uppercase text-white/70">
                Avg. senior tenure
              </div>
            </div>
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-5">
              <div className="font-display text-2xl md:text-3xl font-bold text-white leading-none">$0</div>
              <div className="mt-2 text-[10px] font-display font-bold tracking-widest uppercase text-white/70">
                Health premium for staff
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-[hsl(var(--primary))] text-white py-14 md:py-20 border-y border-[hsl(var(--secondary))]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <p className="text-xs font-display font-bold tracking-[0.28em] text-[hsl(var(--secondary))] mb-3 uppercase">
              Safety · Not Negotiable
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
              The numbers we work to keep.
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-md">
              Every Nexora Motors shop runs under proper safety protocols and OEM service standards. Every employee has stop-work authority. We publish these metrics because customers and insurers ask for them.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "4.9", l: "Dealer CSI score" },
              { v: "0", l: "Lost-time incidents (24 mo)" },
              { v: "100%", l: "Techs on safety training" },
              { v: "Daily", l: "Shop briefings logged" },
            ].map(s => (
              <div key={s.l} className="rounded-lg bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--secondary))] leading-none tabular-nums">
                  {s.v}
                </div>
                <div className="mt-3 text-[10px] font-display font-bold tracking-widest uppercase text-white/75 leading-tight">
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
              Send us a paragraph about how you&apos;d help drivers with us.
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
