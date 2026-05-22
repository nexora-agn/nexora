import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-remodeler/contexts/SiteContentContext";
import { useTheme } from "@template-remodeler/contexts/ThemeContext";
import { REMODELER_IMAGES } from "@template-remodeler/data/siteData";
import { getServiceIcon } from "@template-remodeler/lib/serviceIcons";

const HomeHero = () => {
  const { homeHero: HERO, company: COMPANY, services } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const heroFromContent = typeof HERO.image === "string" ? HERO.image.trim() : "";
  const heroImage =
    heroFromContent || resolveServiceImage("kitchen-remodeling", REMODELER_IMAGES.heroHome);
  const rating = HERO.ratingCard;
  const trustPills = HERO.trustPills ?? [];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll contact you within one business day.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="relative border-b border-border overflow-hidden">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/55 via-[hsl(var(--primary))]/40 to-[hsl(var(--primary))]/15"
      />

      <div className="relative container-custom container-inset py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 text-[hsl(var(--primary-foreground))]">
            <p className="font-sans-brand text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-4">
              {HERO.eyebrow}
            </p>

            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.25rem] leading-[1.08] mb-4">
              {HERO.headlineBefore}{" "}
              <span className="text-[hsl(var(--secondary))] italic">{HERO.headlineHighlight}</span>
            </h1>

            <div className="rm-rule my-6 bg-[hsl(var(--secondary))]" />

            <p className="text-base md:text-lg text-[hsl(var(--primary-foreground)/0.9)] font-sans-brand leading-relaxed max-w-xl mb-8">
              {HERO.body}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-sm bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-[hsl(var(--secondary-foreground))] font-sans-brand font-semibold"
              >
                <Link to={HERO.primaryCta?.to || "/contact"}>
                  {HERO.primaryCta?.label || "Get a Free Estimate"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-sm border-2 border-[hsl(var(--primary-foreground)/0.4)] bg-transparent text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground)/0.1)] font-sans-brand font-semibold"
              >
                <Link to={HERO.secondaryCta?.to || "/projects"}>
                  {HERO.secondaryCta?.label || "View Portfolio"}
                </Link>
              </Button>
            </div>

            {trustPills.length > 0 && (
              <ul className="grid sm:grid-cols-3 gap-3 mb-8">
                {trustPills.map(pill => {
                  const Icon = getServiceIcon(pill.icon);
                  return (
                    <li key={pill.label} className="flex gap-3 items-start border border-[hsl(var(--primary-foreground)/0.15)] bg-[hsl(var(--primary))]/50 p-3 backdrop-blur-sm">
                      <span className="rm-check-box border-[hsl(var(--secondary))] text-[hsl(var(--secondary))]">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <span>
                        <span className="block font-sans-brand text-sm font-semibold leading-snug">{pill.label}</span>
                        <span className="block text-xs text-[hsl(var(--primary-foreground)/0.7)] mt-0.5">{pill.sub}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {rating && (
              <div className="inline-flex flex-wrap items-center gap-4 border border-[hsl(var(--primary-foreground)/0.15)] bg-[hsl(var(--primary))]/50 px-4 py-3 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {(rating.avatars ?? []).slice(0, 4).map((src, i) => (
                    <img key={i} src={src} alt="" className="h-8 w-8 border-2 border-white object-cover rounded-full" />
                  ))}
                </div>
                <div>
                  <p className="flex items-center gap-1.5 font-display text-lg text-[hsl(var(--primary-foreground))]">
                    <Star className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    {rating.score}
                  </p>
                  <p className="text-xs text-[hsl(var(--primary-foreground)/0.7)] font-sans-brand">{rating.countLabel}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-[hsl(var(--secondary))] p-6 md:p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]">
              <p className="font-sans-brand text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-1">
                {HERO.featuredEyebrow}
              </p>
              <h2 className="font-display text-2xl text-[hsl(var(--primary))] mb-1">{HERO.featuredTitle}</h2>
              <p className="text-xs text-muted-foreground font-sans-brand mb-5">{HERO.featuredMeta}</p>
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required name="firstName" placeholder="First name" className="h-11 px-3 border border-input text-sm font-sans-brand" />
                  <input required name="lastName" placeholder="Last name" className="h-11 px-3 border border-input text-sm font-sans-brand" />
                </div>
                <input required type="email" name="email" placeholder="Email" className="w-full h-11 px-3 border border-input text-sm font-sans-brand" />
                <input required type="tel" name="phone" placeholder="Phone" className="w-full h-11 px-3 border border-input text-sm font-sans-brand" />
                <input name="zip" placeholder="ZIP code" className="w-full h-11 px-3 border border-input text-sm font-sans-brand" />
                <select name="service" className="w-full h-11 px-3 border border-input text-sm font-sans-brand bg-background">
                  <option value="">Service interest</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-sm bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 font-sans-brand font-semibold uppercase tracking-wide text-sm"
                >
                  {submitting ? "Sending…" : "Get a Free Quote"}
                </Button>
              </form>
              <p className="text-[10px] text-muted-foreground font-sans-brand mt-3 text-center">
                Or call{" "}
                <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`} className="font-semibold text-[hsl(var(--primary))]">
                  {COMPANY.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
