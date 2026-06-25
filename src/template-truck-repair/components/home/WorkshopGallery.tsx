import { Link } from "react-router-dom";
import { GALLERY_IMAGES } from "@template-truck-repair/data/siteData";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { cn } from "@/lib/utils";

const WorkshopGallery = () => (
  <section className="industrial-section bg-[hsl(var(--muted))]">
    <div className="container-custom container-inset">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="industrial-eyebrow mb-3">Our Facility</p>
            <h2 className="industrial-heading">Workshop Gallery</h2>
          </div>
          <Link to="/gallery" className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
            View Full Gallery →
          </Link>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {GALLERY_IMAGES.slice(0, 8).map((img, i) => (
          <Reveal key={img.id} delay={i * 40}>
            <div className={cn(i === 0 ? "col-span-2 row-span-2" : "")}>
              <img src={img.src} alt={img.alt} className="w-full h-full min-h-[140px] object-cover" loading="lazy" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WorkshopGallery;
