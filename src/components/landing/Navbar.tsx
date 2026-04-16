import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const sectionLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#what-you-get", label: "What you get" },
] as const;

interface NavbarProps {
  onRequestDemo?: () => void;
}

const Navbar = ({ onRequestDemo }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const NavLinks = ({ className }: { className?: string }) => (
    <>
      {sectionLinks.map(({ href, label }) => (
        <a key={href} href={href} onClick={() => setOpen(false)} className={className}>
          {label}
        </a>
      ))}
      <Link to="/contact" onClick={() => setOpen(false)} className={className}>
        Contact
      </Link>
    </>
  );

  const linkClass = "text-sm text-muted-foreground transition-colors hover:text-foreground";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/45 bg-background/75 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 w-full items-center justify-between px-5 md:px-6">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-foreground"
            onClick={() => setOpen(false)}
          >
            webready<span className="text-muted-foreground">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <NavLinks className={linkClass} />
            <Button
              size="sm"
              className="rounded-full border border-slate-800/80 bg-slate-950 px-6 font-semibold text-white shadow-sm hover:bg-slate-900 hover:text-white"
              onClick={onRequestDemo}
            >
              Get started
            </Button>
          </div>

          <button
            type="button"
            className="rounded-xl border border-transparent p-2 text-foreground transition-colors hover:bg-white/70 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open ? (
          <div className="mx-3 mb-3 flex flex-col gap-1 rounded-xl border border-white/55 bg-white/75 p-3 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl md:hidden">
            <NavLinks className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white hover:text-foreground" />
            <Button
              size="sm"
              className="mt-2 w-full rounded-full border border-slate-800/80 bg-slate-950 font-semibold text-white hover:bg-slate-900 hover:text-white"
              onClick={() => {
                setOpen(false);
                onRequestDemo?.();
              }}
            >
              Get started
            </Button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
