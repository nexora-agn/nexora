import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const sectionLinks = [
  { id: "how-it-works", label: "How it works" },
  { id: "erp-sync", label: "ERP" },
  { id: "ai", label: "AI" },
  { id: "projects", label: "Work" },
  { id: "pricing", label: "Pricing" },
  { id: "what-you-get", label: "Platform" },
] as const;

interface NavbarProps {
  onRequestDemo?: () => void;
}

const Navbar = ({ onRequestDemo }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleSectionClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      setOpen(false);
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: id } });
        return;
      }
      e.preventDefault();
      scrollToSection(id);
    };

  const NavLinks = ({ className }: { className?: string }) => (
    <>
      {sectionLinks.map(({ id, label }) => (
        <a
          key={id}
          href={`/#${id}`}
          onClick={handleSectionClick(id)}
          className={className}
        >
          {label}
        </a>
      ))}
      <Link to="/blog" onClick={() => setOpen(false)} className={className}>
        Blog
      </Link>
      <Link to="/start" onClick={() => setOpen(false)} className={className}>
        Start a project
      </Link>
      <Link to="/contact" onClick={() => setOpen(false)} className={className}>
        Contact
      </Link>
    </>
  );

  const linkClass = "text-sm text-neutral-600 transition-colors hover:text-neutral-950";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-neutral-200/80 bg-white/80 shadow-[0_18px_40px_-28px_rgba(10,10,10,0.2)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
        <div className="flex h-16 w-full items-center justify-between px-5 md:px-6">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-neutral-950"
            onClick={() => setOpen(false)}
          >
            Nexora
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <NavLinks className={linkClass} />
            <Button
              size="sm"
              className="rounded-xl border-0 bg-brand px-6 font-semibold text-brand-foreground shadow-sm hover:bg-brand-muted"
              onClick={onRequestDemo}
            >
              Book a Demo
            </Button>
          </div>

          <button
            type="button"
            className="rounded-xl border border-transparent p-2 text-neutral-950 transition-colors hover:bg-neutral-100 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open ? (
          <div className="mx-3 mb-3 flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg lg:hidden">
            <NavLinks className="rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950" />
            <Button
              size="sm"
              className="mt-2 w-full rounded-xl border-0 bg-brand font-semibold text-brand-foreground hover:bg-brand-muted"
              onClick={() => {
                setOpen(false);
                onRequestDemo?.();
              }}
            >
              Book a Demo
            </Button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
