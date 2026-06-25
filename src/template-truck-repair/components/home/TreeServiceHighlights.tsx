import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { useTheme } from "@template-truck-repair/contexts/ThemeContext";
import { HOME_BUILDER_IMAGES } from "@template-truck-repair/data/siteData";
import { Button } from "@/components/ui/button";

const TREE_SERVICES = [
  { id: "tree-removal", title: "Tree Removal", image: HOME_BUILDER_IMAGES.treeRemoval },
  { id: "tree-trimming", title: "Trimming & Pruning", image: HOME_BUILDER_IMAGES.treeTrimming },
  { id: "stump-grinding", title: "Stump Grinding", image: HOME_BUILDER_IMAGES.stumpGrinding },
  { id: "emergency-tree-service", title: "24/7 Emergency", image: HOME_BUILDER_IMAGES.emergencyTree },
] as const;

const TreeServiceHighlights = () => {
  const { company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-16 lg:py-24">
      <div className="container-custom container-inset">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="verde-editorial-rule mb-4" />
            <p className="text-[11px] font-sans-brand font-bold tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
              Certified Tree Care
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
              ISA Arborists On Every Hazardous Job
            </h2>
            <p className="mt-4 text-[hsl(var(--primary-foreground)/0.85)] font-sans-brand leading-relaxed">
              From precision pruning to storm-damage removals — rigging, permits, and spotless haul-away included.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] shrink-0"
          >
            <a href={phoneHref}>
              <Phone className="h-4 w-4 mr-2" />
              Emergency Line
            </a>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {TREE_SERVICES.map((item, index) => {
            const img = resolveServiceImage(item.id, item.image);
            return (
              <Link
                key={item.id}
                to={`/services/${item.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] card-lift"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <img
                  src={img}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))] via-[hsl(var(--flow-panel))]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl text-white flex items-center justify-between gap-2">
                    {item.title}
                    <ArrowUpRight className="h-5 w-5 text-[hsl(var(--secondary))] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TreeServiceHighlights;
