import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustSection from "@/components/landing/TrustSection";
import StepsSection from "@/components/landing/StepsSection";
import ErpIntegrationSection from "@/components/landing/ErpIntegrationSection";
import CustomizationPreview from "@/components/landing/CustomizationPreview";
import AiLandingSection from "@/components/landing/AiLandingSection";
import ProjectsShowcase from "@/components/landing/ProjectsShowcase";
import WhatYouGet from "@/components/landing/WhatYouGet";
import PricingSection from "@/components/landing/PricingSection";
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
          className="absolute left-[-12%] top-24 h-72 w-72 rounded-full bg-slate-300/20 blur-3xl"
          style={{ animation: "float 11s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-10%] top-[22rem] h-[20rem] w-[20rem] rounded-full bg-neutral-900/[0.05] blur-3xl"
          style={{ animation: "float 13s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[-8%] left-[18%] h-80 w-80 rounded-full bg-slate-200/30 blur-3xl"
          style={{ animation: "float 15s ease-in-out infinite reverse" }}
        />
        <div className="absolute inset-x-0 top-0 h-[36rem] animated-grid opacity-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/[0.02]" />
      </div>

      <div className="relative">
        <Navbar onRequestDemo={() => setDemoOpen(true)} />
        <Hero onRequestDemo={() => setDemoOpen(true)} />
        <TrustSection />
        <StepsSection />
        <ErpIntegrationSection />
        <CustomizationPreview />
        <AiLandingSection />
        <ProjectsShowcase />
        <WhatYouGet />
        <PricingSection onRequestDemo={() => setDemoOpen(true)} />
        <FinalCTA onRequestDemo={() => setDemoOpen(true)} />
        <Footer />
        <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </div>
    </div>
  );
};

export default Index;
