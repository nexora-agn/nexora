import { ShieldCheck, Heart, Award, Workflow } from "lucide-react";
import { useSiteContent } from "@template-remodeler/contexts/SiteContentContext";

const TrustLicenseBar = () => {
  const { siteTop: TOP } = useSiteContent();
  const badges = TOP.badges ?? [];

  return (
    <section className="border-y border-border bg-white py-5">
      <div className="container-custom container-inset">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {badges.map((label, i) => {
            const icons = [ShieldCheck, Heart, Workflow, Award];
            const Icon = icons[i % icons.length];
            return (
              <div key={label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground)]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-sans-brand font-semibold text-[hsl(var(--primary))]">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustLicenseBar;
