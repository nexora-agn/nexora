import { ShieldCheck, Award, Home, Tag } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const iconMap = { ShieldCheck, Award, Home, Tag } as const;
type IconKey = keyof typeof iconMap;

const WhyTeamSection = () => {
  const { homeStats, certifications } = useSiteContent();

  return (
    <section className="bg-[hsl(var(--primary))] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-4 sm:px-6 lg:pl-[max(theme(spacing.6),calc((100vw-80rem)/2+1.5rem))] lg:pr-12 py-14 lg:py-20">
          <span className="inline-block text-[hsl(var(--secondary))] text-xs font-bold tracking-[0.18em] uppercase mb-3">
            Why Homeowners Choose Nexora
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5">
            Built on Integrity.
            <br />
            Focused on Quality.
          </h2>
          <p className="text-white/75 leading-relaxed max-w-md mb-8">
            We're not just roofers — we're your neighbors. Our mission is to protect your home like it's our own.
          </p>

          {homeStats?.length > 0 && (
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-md mb-8">
              {homeStats.map(stat => {
                const Icon = iconMap[(stat as any).icon as IconKey] || Award;
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                      <Icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
                    </span>
                    <div className="leading-tight">
                      <span className="block text-xl sm:text-2xl font-black">{stat.value}</span>
                      <span className="block text-xs text-white/70 font-medium">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {certifications?.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {certifications.slice(0, 3).map(c => (
                <div key={c.id} className="flex flex-col items-start">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider">
                    {c.label}
                  </span>
                  <span className="text-[10px] text-white/60 mt-1">{c.sub}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop"
            alt="Beautiful home with new roof"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] to-transparent lg:from-[hsl(var(--primary))]/40 lg:to-transparent"
          />
          <div className="absolute bottom-6 right-6 max-w-xs bg-white text-slate-900 rounded-lg shadow-2xl p-5 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
              <ShieldCheck className="h-5 w-5 text-[hsl(var(--secondary))]" />
            </span>
            <div>
              <span className="block text-sm font-extrabold tracking-tight">FULLY LICENSED & INSURED</span>
              <span className="block text-xs text-slate-600 mt-1 leading-relaxed">
                Your home is in safe hands with our licensed and insured team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTeamSection;
