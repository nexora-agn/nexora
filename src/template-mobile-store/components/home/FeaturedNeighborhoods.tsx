import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NEIGHBORHOODS } from "@template-mobile-store/data/siteData";

const FeaturedNeighborhoods = () => (
  <section className="luxury-section bg-white">
    <div className="container-custom container-inset">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="luxury-eyebrow mb-3">Store locations</p>
          <h2 className="luxury-heading">Austin Area Stores</h2>
        </div>
        <Link to="/stores" className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
          All locations →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEIGHBORHOODS.map(n => (
          <Link
            key={n.id}
            to="/stores"
            className="group relative overflow-hidden aspect-[4/5] image-zoom"
          >
            <img src={n.image} alt={n.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="font-display text-3xl mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">{n.name}</h3>
              <p className="text-sm text-white/70 mb-4 line-clamp-2">{n.description}</p>
              <div className="flex gap-6 text-xs uppercase tracking-wider mb-4">
                <span>{n.propertyCount}+ devices</span>
                <span>{n.avgPrice}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[hsl(var(--secondary))]">
                Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedNeighborhoods;
