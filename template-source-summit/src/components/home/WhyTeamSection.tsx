import {
  ShieldCheck,
  Award,
  Building2,
  Smile,
  Lock,
  BadgeCheck,
  Hammer,
  Star,
} from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const iconMap = {
  ShieldCheck,
  Award,
  Building2,
  Smile,
  Lock,
  BadgeCheck,
  Hammer,
  Star,
} as const;

const WhyTeamSection = () => {
  const {
    homeStats: HOME_STATS,
    certifications: CERTIFICATIONS,
  } = useSiteContent();

  return (
    <section className="relative bg-primary text-primary-foreground section-padding overflow-hidden">
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-custom relative px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-4">
              WHY CHOOSE SUMMIT CONSTRUCTION?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[1.05]">
              Built with Integrity.
              <br />
              Delivered with Pride.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
              We're more than builders — we're partners. Our team is committed
              to delivering exceptional results on every project.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
              {HOME_STATS.slice(0, 6).map(stat => {
                const Icon =
                  iconMap[stat.icon as keyof typeof iconMap] || Award;
                return (
                  <div key={stat.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
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

            {/* Accreditation logos */}
            <div className="mt-12 flex flex-wrap items-center gap-6 lg:gap-8 pt-8 border-t border-white/10">
              {CERTIFICATIONS.map(cert => (
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
          </div>

          {/* Right: image with floating "Your Project Is In Good Hands" card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/40">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1100&h=900&fit=crop"
                alt="Modern commercial building completed by Summit Construction"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"
              />
            </div>
            <div className="absolute -bottom-8 right-4 sm:-right-4 max-w-xs rounded-xl bg-white text-foreground p-5 shadow-2xl shadow-black/40 border border-white/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/15 text-secondary mb-3">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h3 className="text-base font-black uppercase tracking-tight text-primary leading-tight">
                Your Project Is
                <br />
                In Good Hands
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                We stand behind our work with strong warranties and a commitment
                to your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTeamSection;
