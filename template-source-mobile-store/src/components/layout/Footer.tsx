import { Link } from "react-router-dom";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { FOOTER_QUICK_LINKS } from "@template-mobile-store/data/siteData";
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { company: COMPANY, footerServiceLinks, footerCompanyLinks } = useSiteContent();

  return (
    <footer className="bg-[hsl(var(--primary))] text-white">
      <div className="container-custom container-inset py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-semibold tracking-wide">NEXORA</span>
              <span className="block text-[10px] font-sans-brand uppercase tracking-[0.35em] text-[hsl(var(--secondary))] mt-1">
                Estate
              </span>
            </Link>
            <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-sm">{COMPANY.tagline}</p>
            <div className="mt-6 flex gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-white/50 hover:text-[hsl(var(--secondary))] transition-colors" aria-label="Social">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans-brand text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-5">Services</h4>
            <ul className="space-y-3">
              {footerServiceLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans-brand text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-5">Company</h4>
            <ul className="space-y-3">
              {footerCompanyLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans-brand text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-5">Newsletter</h4>
            <p className="text-sm text-white/70 mb-4">Exclusive listings and market insights.</p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11"
              />
              <Button type="submit" className="rounded-none bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white h-11 uppercase text-xs tracking-wider">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {FOOTER_QUICK_LINKS.map(l => (
              <Link key={l.to} to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
            ))}
            <span>{COMPANY.license}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
