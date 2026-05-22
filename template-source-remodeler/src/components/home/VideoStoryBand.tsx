import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VIDEO_STORY } from "@/data/siteData";

const VideoStoryBand = () => (
  <section className="rm-section-pad bg-[hsl(var(--rm-cream))] border-y border-border">
    <div className="container-custom container-inset">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative aspect-video overflow-hidden rm-frame">
          <img
            src={VIDEO_STORY.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[hsl(var(--primary))]/40 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 text-white">
              <Play className="h-7 w-7 ml-1" fill="currentColor" aria-hidden />
            </span>
          </div>
        </div>
        <div>
          <p className="font-sans-brand text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--secondary))] mb-3">
            {VIDEO_STORY.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-[hsl(var(--primary))] leading-tight mb-4">
            {VIDEO_STORY.title}
          </h2>
          <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8 max-w-lg">
            {VIDEO_STORY.body}
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-sm bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-[hsl(var(--secondary-foreground))] font-sans-brand font-semibold"
          >
            <Link to={VIDEO_STORY.cta.to}>
              {VIDEO_STORY.cta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default VideoStoryBand;
