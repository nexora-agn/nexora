import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold tracking-tight text-foreground">
          webready<span className="text-muted-foreground">.</span>
        </span>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} webready. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
