import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Building,
  Home,
  Factory,
  Wrench,
  Camera,
  FileText,
  PenSquare,
  ClipboardList,
  ChevronDown,
  Lock,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/** Summit Contact. Distinct from Constructo (no shared form-on-the-right card,
 *  no centered "Headquarters" / "Office Hours" muted box, no shared CTASection).
 *  Archetypes:
 *  1. Split hero with response-pledge counter
 *  2. Departments accordion — pick the right desk
 *  3. SLA timeline graphic (one business day, hour by hour)
 *  4. "What to attach" clipboard checklist
 *  5. Inline message form sized to clipboard
 *  6. Map strip + closing line */

interface DepartmentDef {
  id: string;
  label: string;
  icon: typeof Building;
  blurb: string;
  who: string;
  fastest: string;
}

const DEPARTMENTS: DepartmentDef[] = [
  {
    id: "commercial",
    label: "Commercial estimating",
    icon: Building,
    blurb:
      "Office buildings, retail strips, medical, and tenant improvements. RFPs welcome — drawings, narratives, or napkin sketches all fine.",
    who: "PM lead + senior estimator",
    fastest: "Email with site address & rough sqft → response same business day.",
  },
  {
    id: "residential",
    label: "Residential estimating",
    icon: Home,
    blurb:
      "Custom homes, additions, whole-home remodels, estate work. Best for owners with land in hand or a renovation scoped by an architect.",
    who: "Residential PM + design-build lead",
    fastest: "Phone call with budget band → on-site walk inside one week.",
  },
  {
    id: "industrial",
    label: "Industrial / distribution",
    icon: Factory,
    blurb:
      "Tilt-wall, pre-engineered metal, light manufacturing, and dock-loaded distribution facilities. Civil-heavy sites welcome.",
    who: "Industrial PM + civil estimator",
    fastest: "Drop a survey + program → conceptual ROM inside three days.",
  },
  {
    id: "aftercare",
    label: "Aftercare & warranty",
    icon: Wrench,
    blurb:
      "If we built it, we still own it. Warranty claims, post-occupancy issues, or year-two checkups go to a named technician — not a call center.",
    who: "Aftercare lead",
    fastest: "Phone or email — no portal logins.",
  },
];

const SLA_STEPS = [
  {
    when: "Within 2 hours",
    label: "Acknowledgment",
    body: "A real human replies that we received your note and names the desk picking it up.",
  },
  {
    when: "Same business day",
    label: "Routing",
    body: "Your inquiry is matched to a senior estimator or PM with experience in your sector.",
  },
  {
    when: "Next business day",
    label: "Direct outreach",
    body: "That person calls or emails you — not generic intake — and proposes the next concrete step.",
  },
  {
    when: "Within five days",
    label: "Working session",
    body: "Either a site walk, a drawings review, or a written feasibility note. No vapor.",
  },
];

const ATTACHMENTS = [
  {
    icon: FileText,
    title: "Drawings or sketches",
    body: "PDFs, DWGs, or even napkin photos. We piece together what we can.",
  },
  {
    icon: PenSquare,
    title: "Program or scope notes",
    body: "Square footages, room counts, must-haves, nice-to-haves.",
  },
  {
    icon: Camera,
    title: "Site or existing-conditions photos",
    body: "Front, back, and any problem spots. Phone photos are fine.",
  },
  {
    icon: ClipboardList,
    title: "Budget band & timing",
    body: "Even a range helps us match you to the right desk faster.",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const {
    company: COMPANY,
    officeHours: OFFICE_HOURS,
    mapEmbedUrl: MAP_EMBED_URL,
  } = useSiteContent();

  const [openDept, setOpenDept] = useState<string>(DEPARTMENTS[0].id);
  const [department, setDepartment] = useState<string>("");

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!department) {
      toast({ title: "Pick a desk", description: "Tell us which department fits your project.", variant: "destructive" });
      return;
    }
    toast({
      title: "Message routed",
      description: "A real person from that desk will reach out before end of next business day.",
    });
    (e.target as HTMLFormElement).reset();
    setDepartment("");
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Reach the right desk at ${COMPANY.name}: commercial, residential, industrial, or aftercare.`}
        />
      </Helmet>

      {/* 1 — Split hero with response pledge */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              ONE BUSINESS-DAY PLEDGE
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              The right desk,
              <br />
              <span className="text-secondary">on the first email.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              We don't run a generic intake form. Pick the desk that fits your
              project below — your message goes straight to the senior person
              who'd run the work.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="rounded-xl bg-primary text-primary-foreground p-5 flex flex-col gap-1 hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-5 w-5 text-secondary mb-2" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">
                Direct line
              </span>
              <span className="text-base md:text-lg font-black tracking-tight">
                {COMPANY.phone}
              </span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="rounded-xl bg-secondary text-secondary-foreground p-5 flex flex-col gap-1 hover:bg-secondary/90 transition-colors"
            >
              <Mail className="h-5 w-5 mb-2" />
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-75">
                Email reception
              </span>
              <span className="text-sm md:text-base font-black tracking-tight break-all">
                {COMPANY.email}
              </span>
            </a>
            <div className="col-span-2 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-secondary">
                <Clock className="h-3.5 w-3.5" /> Office hours
              </div>
              <ul className="mt-2 space-y-0.5 text-sm">
                {OFFICE_HOURS.map(row => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-3 tabular-nums"
                  >
                    <span className="text-foreground/85">{row.days}</span>
                    <span className="font-bold text-primary">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Departments accordion */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              FIND THE RIGHT DESK
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              Four desks. One door.
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
            {DEPARTMENTS.map(dept => {
              const isOpen = dept.id === openDept;
              const Icon = dept.icon;
              return (
                <div key={dept.id}>
                  <button
                    type="button"
                    onClick={() => setOpenDept(dept.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-5 md:px-7 py-5 text-left transition-colors",
                      isOpen ? "bg-secondary/5" : "hover:bg-muted/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors",
                        isOpen
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-secondary/10 text-secondary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-base md:text-lg font-black uppercase tracking-tight text-primary leading-snug">
                        {dept.label}
                      </span>
                      <span
                        className={cn(
                          "block text-xs font-bold tracking-widest uppercase mt-1",
                          isOpen ? "text-secondary" : "text-muted-foreground",
                        )}
                      >
                        {dept.who}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isOpen && "rotate-180 text-secondary",
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-7 pb-6 pl-[5.5rem] grid lg:grid-cols-3 gap-6">
                      <p className="lg:col-span-2 text-sm md:text-base text-foreground/85 leading-relaxed">
                        {dept.blurb}
                      </p>
                      <div className="rounded-xl bg-muted/60 border border-border p-4">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                          Fastest path
                        </p>
                        <p className="mt-1 text-sm text-foreground/85 leading-snug">
                          {dept.fastest}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — SLA timeline */}
      <Reveal>
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
                RESPONSE SLA
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.02]">
                What "next business day" actually looks like.
              </h2>
            </div>

            <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <span
                aria-hidden
                className="hidden md:block absolute left-0 right-0 top-7 h-0.5 bg-white/15"
              />
              {SLA_STEPS.map((step, i) => (
                <li key={step.when} className="relative">
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-black tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[10px] font-bold tracking-widest uppercase text-secondary">
                    {step.when}
                  </p>
                  <h3 className="mt-1 text-base md:text-lg font-black uppercase tracking-tight">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* 4 + 5 — Clipboard: attach checklist + form on a single card */}
      <section className="bg-muted/40 section-padding border-y border-border">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              WHAT TO BRING
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-6">
              The clipboard checklist.
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-7">
              You don't need any of these to reach us — but each one shaves days
              off the response cycle.
            </p>
            <ul className="space-y-3">
              {ATTACHMENTS.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex gap-3 rounded-xl bg-card border border-border p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase tracking-wide text-primary leading-tight">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug mt-1">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div
              id="contact-form"
              className="rounded-2xl border-2 border-primary/10 bg-card shadow-[0_30px_60px_-30px_rgba(10,22,40,0.25)] overflow-hidden"
            >
              <div className="bg-primary text-primary-foreground px-6 md:px-7 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase text-secondary">
                    Project intake form
                  </p>
                  <p className="text-base md:text-lg font-black uppercase tracking-tight">
                    Tell us what you're building
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-white/60">
                  <Lock className="h-3 w-3" /> Encrypted in transit
                </span>
              </div>
              <form
                className="p-6 md:p-7 space-y-5"
                onSubmit={onSubmit}
              >
                <div>
                  <Label className="text-[10px] font-black tracking-widest uppercase text-muted-foreground mb-2 block">
                    Pick a desk
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DEPARTMENTS.map(d => {
                      const Icon = d.icon;
                      const selected = department === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDepartment(d.id)}
                          className={cn(
                            "rounded-md border-2 px-3 py-3 text-xs font-bold tracking-wide uppercase text-left transition-colors",
                            selected
                              ? "border-secondary bg-secondary/10 text-primary"
                              : "border-border bg-background text-foreground/70 hover:border-secondary/50",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 mb-2",
                              selected ? "text-secondary" : "text-muted-foreground",
                            )}
                          />
                          {d.label.split(" ")[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name" className="text-xs font-bold uppercase tracking-wider">
                      Your name
                    </Label>
                    <Input id="full-name" name="name" required placeholder="Owner / GC / Architect" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider">
                      Phone
                    </Label>
                    <Input id="phone" name="phone" placeholder="(817) 555-0198" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
                      Email
                    </Label>
                    <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site" className="text-xs font-bold uppercase tracking-wider">
                      Site address
                    </Label>
                    <Input id="site" name="site" placeholder="Street, city, county" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="msg" className="text-xs font-bold uppercase tracking-wider">
                    Tell us the scope
                  </Label>
                  <Textarea
                    id="msg"
                    name="message"
                    rows={5}
                    required
                    className="resize-none"
                    placeholder="What you're building, where, and any timing or budget signals you have."
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    SEND TO THAT DESK
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    No marketing list. No CRM blast. One human reply.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map strip */}
      <section className="h-[380px] w-full border-y border-border bg-muted">
        <iframe
          title="Map"
          src={MAP_EMBED_URL}
          className="w-full h-full grayscale-[20%] contrast-[0.95]"
          loading="lazy"
        />
      </section>

      {/* Closing line — minimal, NO repeat band */}
      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground">
            Prefer paper? · Mail to {COMPANY.address}
          </p>
          <Link
            to="/service-areas"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/20 hover:border-secondary self-start md:self-auto"
          >
            See where we work
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
