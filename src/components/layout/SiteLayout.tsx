import { useState, type ReactNode } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RequestDemoModal from "@/components/landing/RequestDemoModal";

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[-12%] top-0 h-80 w-80 rounded-full bg-violet-400/[0.16] blur-3xl" />
        <div className="absolute right-[-10%] top-40 h-72 w-72 rounded-full bg-cyan-400/[0.14] blur-3xl" />
        <div className="absolute bottom-0 left-[10%] h-72 w-72 rounded-full bg-slate-400/[0.12] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[min(42rem,55vh)] opacity-50">
          <div
            className="mx-auto h-full w-full max-w-6xl bg-[linear-gradient(to_right,rgba(100,116,139,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.07)_1px,transparent_1px)]"
            style={{ backgroundSize: "40px 40px" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-300/[0.1]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <Navbar onRequestDemo={() => setDemoOpen(true)} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </div>
    </div>
  );
};

export default SiteLayout;
