import { Link } from "react-router-dom";
import { NEW_DEVELOPMENTS } from "@template-dealership/data/siteData";
import { Progress } from "@/components/ui/progress";

const NewDevelopmentsSection = () => (
  <section className="luxury-section bg-[hsl(var(--primary))] text-white">
    <div className="container-custom container-inset">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-3">Incoming Inventory</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white">New Arrivals</h2>
        </div>
        <Link to="/developments" className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
          View All Arrivals →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {NEW_DEVELOPMENTS.map(dev => (
          <article key={dev.id} className="bg-white/5 border border-white/10 overflow-hidden group hover:border-[hsl(var(--secondary))]/50 transition-colors">
            <div className="image-zoom aspect-[16/10]">
              <img src={dev.image} alt={dev.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--secondary))]">{dev.status}</span>
                <span className="text-xs text-white/60">{dev.completion}</span>
              </div>
              <h3 className="font-display text-2xl mb-1 group-hover:text-[hsl(var(--secondary))] transition-colors">{dev.title}</h3>
              <p className="text-sm text-white/60 mb-4">{dev.location}</p>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span>Progress</span>
                  <span>{dev.progress}%</span>
                </div>
                <Progress value={dev.progress} className="h-1 bg-white/20 [&>div]:bg-[hsl(var(--secondary))]" />
              </div>
              <div className="flex justify-between text-sm border-t border-white/10 pt-4">
                <span>{dev.unitsAvailable} of {dev.unitsTotal} available</span>
                <span className="text-[hsl(var(--secondary))]">From {dev.priceFrom}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default NewDevelopmentsSection;
