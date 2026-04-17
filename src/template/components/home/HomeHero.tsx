import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_HERO } from "@template/data/siteData";

const HomeHero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-muted/90 via-background to-background section-padding">
    <div className="container-custom px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.1]">
            {HOME_HERO.headlineBefore}{" "}
            <span className="text-secondary">{HOME_HERO.headlineHighlight}</span>{" "}
            {HOME_HERO.headlineAfter}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{HOME_HERO.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-sm px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide">
              <Link to={HOME_HERO.primaryCta.to}>{HOME_HERO.primaryCta.label}</Link>
            </Button>
            <Link
              to={HOME_HERO.secondaryCta.to}
              className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-secondary transition-colors group"
            >
              {HOME_HERO.secondaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative lg:min-w-0">
          <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-3xl bg-muted shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
            <img
              src={HOME_HERO.image}
              alt=""
              className="w-full aspect-[4/5] max-h-[min(560px,78vh)] object-cover object-center"
              loading="eager"
            />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-black/45 px-4 py-4 shadow-lg backdrop-blur-xl sm:px-6 sm:py-5 md:gap-6">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary sm:text-xs">
                    {HOME_HERO.featuredEyebrow}
                  </p>
                  <h2 className="mt-1.5 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
                    {HOME_HERO.featuredTitle}
                  </h2>
                  <p className="mt-1 text-sm text-white/85">{HOME_HERO.featuredMeta}</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-md ring-1 ring-white/40 transition-transform hover:scale-105 md:h-[4.25rem] md:w-[4.25rem]"
                  aria-label="Play video"
                >
                  <Play className="h-7 w-7 ml-1 md:h-8 md:w-8" fill="currentColor" strokeWidth={0} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeHero;
