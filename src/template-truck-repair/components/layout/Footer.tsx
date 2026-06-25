import { Link } from "react-router-dom";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { FOOTER_QUICK_LINKS, OFFICE_HOURS } from "@template-truck-repair/data/siteData";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const { company: COMPANY, footerServiceLinks, footerCompanyLinks } = useSiteContent();
  const emergencyHref = `tel:${(COMPANY.emergencyPhone || "").replace(/[^+\d]/g, "")}`;

  return (
    <footer className="bg-[#0f1419] text-white border-t-4 border-[hsl(var(--secondary))]">
      <div className="container-custom container-inset py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="font-display text-2xl font-semibold">NEXORA</span>
            <span className="block text-[10px] font-sans-brand uppercase tracking-[0.3em] text-[hsl(var(--secondary))] mt-1">Heavy Duty</span>
            <p className="mt-4 text-sm text-white/65 leading-relaxed">{COMPANY.tagline}</p>
            <a href={emergencyHref} className="inline-flex items-center gap-2 mt-4 text-[hsl(var(--secondary))] text-sm font-bold uppercase tracking-wider hover:underline">
              <Phone className="h-4 w-4" /> {COMPANY.emergencyPhone}
            </a>
          </div>

          <div>
            <h4 className="font-sans-brand text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))] mb-4">Services</h4>
            <ul className="space-y-2">
              {footerServiceLinks.map(l => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/65 hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans-brand text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))] mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerCompanyLinks.map(l => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/65 hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
            <h4 className="font-sans-brand text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))] mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map(l => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/65 hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans-brand text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--secondary))] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />{COMPANY.address}</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />{COMPANY.phone}</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />{COMPANY.email}</li>
            </ul>
            <div className="mt-6 space-y-1">
              {OFFICE_HOURS.map(row => (
                <p key={row.days} className="text-xs text-white/50"><span className="text-white/75">{row.days}</span> · {row.hours}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. DOT Certified · ASE Master Diesel Technicians.</p>
          <div className="flex gap-4">
            <Link to="/faq" className="hover:text-white">FAQ</Link>
            <Link to="/blog" className="hover:text-white">Blog</Link>
            <Link to="/fleet-admin" className="hover:text-white">Fleet Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
