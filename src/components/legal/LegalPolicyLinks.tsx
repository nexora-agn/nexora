import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LEGAL_POLICY_LINKS } from "@/lib/legalPolicyLinks";

type LegalPolicyLinksProps = {
  className?: string;
  linkClassName?: string;
  /** `list` — footer-style vertical list; `inline` — horizontal with separators; `compact` — navbar row */
  variant?: "list" | "inline" | "compact";
};

const LegalPolicyLinks = ({
  className,
  linkClassName,
  variant = "list",
}: LegalPolicyLinksProps) => {
  if (variant === "inline") {
    return (
      <nav className={cn("flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm", className)} aria-label="Legal policies">
        {LEGAL_POLICY_LINKS.map((item, i) => (
          <span key={item.to} className="inline-flex items-center gap-1">
            {i > 0 ? <span className="text-muted-foreground/60" aria-hidden>·</span> : null}
            <Link to={item.to} className={cn("font-medium text-foreground underline-offset-4 hover:underline", linkClassName)}>
              {item.label}
            </Link>
          </span>
        ))}
      </nav>
    );
  }

  if (variant === "compact") {
    return (
      <nav className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)} aria-label="Legal policies">
        {LEGAL_POLICY_LINKS.map(item => (
          <Link key={item.to} to={item.to} className={cn("text-sm transition-colors", linkClassName)}>
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <ul className={cn("space-y-2.5", className)}>
      {LEGAL_POLICY_LINKS.map(item => (
        <li key={item.to}>
          <Link to={item.to} className={cn("text-sm transition-colors", linkClassName)}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LegalPolicyLinks;
