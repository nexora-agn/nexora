import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Users } from "lucide-react";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const benefitIcons = {
  ClipboardCheck,
  Users,
} as const;

const WhyTeamSection = () => {
  const { team, company: COMPANY, whyBenefits: WHY_BENEFITS } = useSiteContent();
  const leadership = team.slice(0, 3);

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-custom px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              WHY CHOOSE US
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 tracking-tight leading-[1.1]">
              Why {COMPANY.name}?
            </h2>
            <ul className="space-y-7">
              {WHY_BENEFITS.map(b => {
                const Icon =
                  benefitIcons[b.icon as keyof typeof benefitIcons] ??
                  ClipboardCheck;
                return (
                  <li
                    key={b.title}
                    className="flex gap-5 group rounded-xl p-4 -mx-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {b.title}
                      </h3>
                      <p className="text-muted-foreground mt-1.5 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                  THE TEAM
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight leading-[1.1]">
                  Leadership
                </h2>
              </div>
              <Link
                to="/team"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-primary hover:text-secondary transition-colors"
              >
                MEET EVERYONE
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {leadership.map(member => (
                <Link
                  key={member.id}
                  to="/team"
                  className="group text-center"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-muted ring-1 ring-black/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {member.role}
                  </p>
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
