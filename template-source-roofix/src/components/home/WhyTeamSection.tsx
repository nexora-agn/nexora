import {
  ShieldCheck,
  Award,
  Building2,
  Smile,
  Lock,
  BadgeCheck,
  Hammer,
  Star,
  Users,
  Home,
} from "lucide-react";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

const iconMap = {
  ShieldCheck,
  Award,
  Building2,
  Smile,
  Lock,
  BadgeCheck,
  Hammer,
  Star,
  Users,
  Home,
} as const;

const WHY_SIDE_IMAGE =
  "https://images.unsplash.com/photo-1760544137552-b225c3379c76?auto=format&fit=crop&w=1200&h=900&q=85";

const WhyTeamSection = () => {
  const {
    homeStats: HOME_STATS,
    certifications: CERTIFICATIONS,
  } = useSiteContent();

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-4 md:px-8 lg:pl-[max(theme(spacing.8),calc((100vw-80rem)/2+2rem))] lg:pr-12 py-14 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-4">
            WHY CHOOSE US
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.05]">
            Strong roofs.
            <br />
            <span className="text-secondary">Safe homes.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/85 max-w-md leading-relaxed">
            Inspection-first crews, photo documentation adjuster reviewers expect,
            and magnets in the mulch before we leave — the same playbook on every slope.
          </p>

          {HOME_STATS?.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 max-w-lg">
              {HOME_STATS.slice(0, 6).map(stat => {
                const Icon =
                  iconMap[stat.icon as keyof typeof iconMap] || Award;
                return (
                  <div key={stat.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary ring-1 ring-secondary/25">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-2xl md:text-3xl font-black leading-none">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-white/75">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {CERTIFICATIONS.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-6 lg:gap-8 pt-8 border-t border-white/10">
              {CERTIFICATIONS.slice(0, 4).map(cert => (
                <div
                  key={cert.id}
                  className="flex flex-col items-start gap-1 group"
                >
                  <span className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wider text-white/95 group-hover:border-secondary/40 transition-colors">
                    {cert.label}
                  </span>
                  <span className="text-[10px] text-white/50 tracking-wide">
                    {cert.sub}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative min-h-[340px] lg:min-h-[480px]">
          <img
            src={WHY_SIDE_IMAGE}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-primary to-transparent lg:from-primary/50 lg:to-transparent"
          />
          <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-8 lg:max-w-xs rounded-xl bg-white text-foreground p-5 shadow-2xl shadow-black/40 border border-border flex gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary ring-1 ring-secondary/25">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-primary">
                Licensed · insured · bonded
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Harness plans, OSHA-30 field leads, and a workmanship warranty backed by real callbacks — not voicemail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTeamSection;
