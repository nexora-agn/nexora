import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onRequestDemo?: () => void;
}

const Navbar = ({ onRequestDemo }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          webready<span className="text-muted-foreground">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#what-you-get" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            What You Get
          </a>
          <Button size="sm" className="rounded-full px-6" onClick={onRequestDemo}>
            Get Started
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          <a href="#how-it-works" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">How It Works</a>
          <a href="#benefits" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Benefits</a>
          <a href="#what-you-get" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">What You Get</a>
          <Button size="sm" className="rounded-full w-fit px-6" onClick={() => { setOpen(false); onRequestDemo?.(); }}>Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
