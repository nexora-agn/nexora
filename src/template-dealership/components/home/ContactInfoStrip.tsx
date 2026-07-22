import { Link } from "react-router-dom";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";

const ContactInfoStrip = () => {
  const { siteTop: TOP } = useSiteContent();

  return (
    <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-center py-2.5 px-4">
      <p className="text-xs font-display font-semibold uppercase tracking-[0.18em]">
        {TOP.line || "120+ vehicles in stock — Schedule a test drive today"}{" "}
        <Link to="/contact" className="underline underline-offset-2 hover:opacity-90 ml-1">
          Learn more
        </Link>
      </p>
    </div>
  );
};

export default ContactInfoStrip;
