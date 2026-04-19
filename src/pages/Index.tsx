import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustSection from "@/components/landing/TrustSection";
import StepsSection from "@/components/landing/StepsSection";
import CustomizationPreview from "@/components/landing/CustomizationPreview";
import WhatYouGet from "@/components/landing/WhatYouGet";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import RequestDemoModal from "@/components/landing/RequestDemoModal";

const Index = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const scrollState = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const target = scrollState || (location.hash ? location.hash.slice(1) : "");
    if (!target) return;
    const scroll = () => {
      const el = document.getElementById(target);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    };
    const id = window.setTimeout(scroll, 50);
    return () => window.clearTimeout(id);
  }, [location.hash, location.state]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-violet-400/[0.22] blur-3xl"
          style={{ animation: "float 10s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-8%] top-[22rem] h-[22rem] w-[22rem] rounded-full bg-cyan-400/[0.2] blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[-5%] left-[15%] h-96 w-96 rounded-full bg-slate-400/[0.14] blur-3xl"
          style={{ animation: "float 14s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute right-[5%] top-[45%] h-64 w-64 rounded-full bg-blue-400/[0.1] blur-3xl"
        />
        <div
          className="absolute inset-x-0 top-0 h-[38rem] animated-grid opacity-[0.55]"
          style={{ animation: "pulseGlow 7s ease-in-out infinite" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200/[0.07] via-transparent to-slate-300/[0.12]" />
      </div>

      <div className="relative">
      <Navbar onRequestDemo={() => setDemoOpen(true)} />
      <Hero onRequestDemo={() => setDemoOpen(true)} />
      <TrustSection />
      <StepsSection />
      <CustomizationPreview />
      <WhatYouGet />
      <BenefitsSection />
      <FinalCTA onRequestDemo={() => setDemoOpen(true)} />
      <Footer />
      <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </div>
    </div>
  );
};

export default Index;
