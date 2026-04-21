import { Link } from "react-router-dom";

const gridPattern =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-neutral-800 bg-neutral-950">
      <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_120%,rgba(148,163,184,0.1),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundImage: gridPattern }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-16 lg:grid-cols-[1.2fr_1fr_auto] lg:items-start">
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-block text-base font-bold tracking-tight text-white transition-opacity hover:opacity-85"
            >
              Nexora
            </Link>
            <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-400">
              Serious sites for teams who outgrew DIY—without hiring a full dev shop.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Legal &amp; contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <p className="text-sm text-neutral-500 lg:text-right lg:pt-0.5">© {year} Nexora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
