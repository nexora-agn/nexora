import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, ArrowRight, Scissors } from "lucide-react";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";

const Footer = () => {
  const { company: COMPANY, officeHours, footerServiceLinks, footerCompanyLinks } = useSiteContent();
  const { logoUrl } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#0a0a0b] text-white">
      <div className="container-custom container-inset pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <Scissors className="h-7 w-7 text-[hsl(var(--secondary))]" />
                  <div className="leading-tight">
                    <span className="block font-display text-lg font-semibold uppercase tracking-wide">Forge</span>
                    <span className="block text-[9px] font-sans-brand uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
                      Barber Co.
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">{COMPANY.tagline}</p>
            <div className="flex items-center gap-3 pt-1">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media link"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.16em] text-white mb-5">Services</h4>
            <ul className="space-y-3">
              {footerServiceLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-[hsl(var(--secondary))] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.16em] text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {footerCompanyLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-[hsl(var(--secondary))] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-display text-sm uppercase tracking-[0.16em] text-white mb-4">Visit Us</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  <span>{COMPANY.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />
                  <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white transition-colors">
                    {COMPANY.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                    {COMPANY.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-[0.16em] text-white mb-3">Opening Hours</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                {officeHours.map(row => (
                  <li key={row.days} className="flex justify-between gap-4">
                    <span>{row.days}</span>
                    <span className="text-white/80">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="font-display text-sm uppercase tracking-[0.16em] text-white mb-2">Join the List</h4>
            <p className="text-xs text-white/50">Grooming tips, seasonal offers, and first access to new packages.</p>
          </div>
          {subscribed ? (
            <p className="text-sm text-[hsl(var(--secondary))]">You're on the list. Welcome to Forge.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-11 flex-1 bg-white/5 border border-white/15 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[hsl(var(--secondary))]"
              />
              <button
                type="submit"
                className="h-11 px-5 bg-[hsl(var(--secondary))] text-white flex items-center justify-center hover:brightness-110 transition-all"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} {COMPANY.legalName}. All rights reserved.</p>
          <p>{COMPANY.license}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
