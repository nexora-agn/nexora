import { Link } from "react-router-dom";
import { ClipboardCheck, Users } from "lucide-react";
import { COMPANY, WHY_BENEFITS } from "@template/data/siteData";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const benefitIcons = {
  ClipboardCheck,
  Users,
} as const;

const WhyTeamSection = () => {
  const { team } = useSiteContent();
  const leadership = team.slice(0, 3);

  return (
    <section className="section-padding bg-background border-t border-border">
    <div className="container-custom px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Why {COMPANY.name}?
          </h2>
          <ul className="space-y-8">
            {WHY_BENEFITS.map(b => {
              const Icon = benefitIcons[b.icon];
              return (
                <li key={b.title} className="flex gap-4">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{b.title}</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{b.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {leadership.map(member => (
              <Link key={member.id} to="/team" className="group text-center">
                <div className="overflow-hidden rounded-xl mb-3 aspect-[3/4] bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">{member.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default WhyTeamSection;
