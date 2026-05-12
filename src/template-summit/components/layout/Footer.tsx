import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp, Instagram, Linkedin } from "lucide-react";
import { useTheme } from "@template-summit/contexts/ThemeContext";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

/**
 * Summit (editorial luxury) — centered minimal footer.
 * Big italic wordmark center top, italic tagline below, then a single
 * hairline-divided 3-column row (visit / contact / follow), and a single
 * fine-print line at the very bottom. NO dark navy block, NO 5-column grid,
 * NO 24/7 badge. Intentionally quiet.
 */
const Footer = () => {
  const { logoUrl } = useTheme();
  const { company: COMPANY, navLinks: NAV_LINKS } = useSiteContent();

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="bg-background text-foreground border-t border-foreground/15">
      <div className="container-custom px-4 md:px-10 pt-20 md:pt-28 pb-10">
        {/* Big centered wordmark */}
        <div className="text-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={COMPANY.name}
              className="h-12 md:h-14 mx-auto object-contain max-w-[280px]"
            />
          ) : (
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.02em] text-foreground italic"
              style={{ fontFamily: "var(--tpl-font-display)" }}
            >
              {COMPANY.name || "Summit"}
            </h2>
          )}
          <p
            className="mt-5 italic text-foreground/65 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--tpl-font-display)" }}
          >
            {COMPANY.tagline}
          </p>
        </div>

        {/* Hairline 3-up */}
        <div className="mt-16 md:mt-20 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/15 border-y border-foreground/15">
          <div className="px-2 md:px-8 py-8 text-center md:text-left">
            <p className="text-[10px] tracking-[0.32em] uppercase font-semibold text-foreground/55">
              Visit
            </p>
            <nav className="mt-5 flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start text-sm font-medium">
              {NAV_LINKS.slice(0, 6).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="tpl-link-underline text-foreground/85 hover:text-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="px-2 md:px-8 py-8 text-center md:text-left space-y-3 text-sm">
            <p className="text-[10px] tracking-[0.32em] uppercase font-semibold text-foreground/55">
              Contact
            </p>
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 justify-center md:justify-start text-foreground/85 hover:text-secondary"
              >
                <Phone className="h-3.5 w-3.5" />
                {COMPANY.phone}
              </a>
            )}
            {COMPANY.email && (
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 justify-center md:justify-start text-foreground/85 hover:text-secondary break-all"
              >
                <Mail className="h-3.5 w-3.5" />
                {COMPANY.email}
              </a>
            )}
            {COMPANY.address && (
              <p className="flex items-start gap-2 justify-center md:justify-start text-foreground/75">
                <MapPin className="h-3.5 w-3.5 mt-1" />
                {COMPANY.address}
              </p>
            )}
          </div>

          <div className="px-2 md:px-8 py-8 text-center md:text-left">
            <p className="text-[10px] tracking-[0.32em] uppercase font-semibold text-foreground/55">
              Follow
            </p>
            <div className="mt-5 flex justify-center md:justify-start gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-10 w-10 inline-flex items-center justify-center border border-foreground/20 text-foreground/70 hover:border-secondary hover:text-secondary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p
              className="mt-6 italic text-foreground/55 text-sm"
              style={{ fontFamily: "var(--tpl-font-display)" }}
            >
              "Quiet work, lasting craft."
            </p>
          </div>
        </div>

        {/* Single fine-print line */}
        <p className="mt-10 text-center text-[11px] tracking-[0.22em] uppercase text-foreground/55 font-semibold">
          &copy; {new Date().getFullYear()} {COMPANY.name}
          <span className="mx-3 text-foreground/30">/</span>
          All rights reserved
        </p>
      </div>

      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-none border border-foreground/30 bg-background text-foreground inline-flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
