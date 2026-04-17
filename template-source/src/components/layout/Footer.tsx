import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight, ArrowUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { COMPANY, FOOTER_SERVICE_LINKS, FOOTER_COMPANY_LINKS } from "@/data/siteData";

const Footer = () => {
  const { logoUrl } = useTheme();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground relative">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            {logoUrl ? (
              <img src={logoUrl} alt={COMPANY.name} className="h-10 mb-4 brightness-0 invert object-contain max-w-[180px]" />
            ) : (
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-secondary text-secondary-foreground text-lg font-black">
                  C
                </span>
                <span className="font-extrabold text-lg">{COMPANY.name}</span>
              </div>
            )}
            <p className="text-sm opacity-80 mb-6 leading-relaxed">{COMPANY.tagline}</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4 opacity-95">SERVICES</h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SERVICE_LINKS.map(item => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-secondary opacity-70 group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4 opacity-95">COMPANY</h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_COMPANY_LINKS.map(item => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-secondary opacity-70 group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4 opacity-95">CONTACT</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                <span className="opacity-80">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`} className="opacity-80 hover:opacity-100">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`mailto:${COMPANY.email}`} className="opacity-80 hover:opacity-100">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-custom px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-2">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="hidden sm:block text-xs opacity-60">Premium construction template</p>
        </div>
      </div>

      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center hover:bg-secondary/90 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
