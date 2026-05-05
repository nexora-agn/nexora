import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@template-summit/contexts/ThemeContext";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

const Footer = () => {
  const { logoUrl } = useTheme();
  const {
    company: COMPANY,
    footerServiceLinks: FOOTER_SERVICE_LINKS,
    footerCompanyLinks: FOOTER_COMPANY_LINKS,
    serviceAreas,
  } = useSiteContent();

  const SERVICE_AREAS =
    serviceAreas && serviceAreas.length
      ? serviceAreas
      : ["Dallas, TX", "Fort Worth, TX", "Arlington, TX", "Plano, TX", "Frisco, TX"];

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const logoLetter = (COMPANY.name || "S").charAt(0).toUpperCase();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground relative">
      <div className="container-custom px-4 md:px-8 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={COMPANY.name}
                className="h-10 mb-5 brightness-0 invert object-contain max-w-[200px]"
              />
            ) : (
              <div className="flex items-center gap-2.5 mb-5">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary shadow-sm">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden
                    className="h-6 w-6"
                  >
                    <path
                      d="M4 52 L20 28 L30 40 L40 22 L60 52 Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-base font-black tracking-tight uppercase">
                    {(COMPANY.name || "Summit").split(" ")[0]}
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-white/70 uppercase">
                    {(COMPANY.name || "")
                      .split(" ")
                      .slice(1)
                      .join(" ")
                      .toUpperCase() || "CONSTRUCTION"}
                  </p>
                </div>
              </div>
            )}
            <p className="text-sm text-white/75 leading-relaxed mb-6">
              Building better spaces and stronger communities through quality
              construction and exceptional service.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-black text-xs tracking-[0.2em] uppercase mb-5 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_COMPANY_LINKS.map(item => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="text-white/75 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-black text-xs tracking-[0.2em] uppercase mb-5 text-white">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_SERVICE_LINKS.map(item => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="text-white/75 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h4 className="font-black text-xs tracking-[0.2em] uppercase mb-5 text-white">
              Service Areas
            </h4>
            <ul className="space-y-3 text-sm">
              {SERVICE_AREAS.map(area => (
                <li key={area} className="text-white/75">
                  {area}
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-secondary font-bold hover:gap-2.5 transition-all"
                >
                  View All Areas
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-xs tracking-[0.2em] uppercase mb-5 text-white">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              {COMPANY.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-secondary" />
                  <a
                    href={`tel:${cleanPhone}`}
                    className="text-white/85 hover:text-secondary transition-colors font-medium"
                  >
                    {COMPANY.phone}
                  </a>
                </li>
              )}
              {COMPANY.email && (
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-secondary" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-white/85 hover:text-secondary transition-colors font-medium break-all"
                  >
                    {COMPANY.email}
                  </a>
                </li>
              )}
              {COMPANY.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                  <span className="text-white/85 leading-relaxed">
                    {COMPANY.address}
                  </span>
                </li>
              )}
              <li className="flex items-center gap-3 pt-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span className="text-red-300 font-bold text-xs tracking-wider uppercase">
                  24/7 Emergency Service
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-3">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
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
