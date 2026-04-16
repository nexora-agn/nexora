import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-background">
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
  );
};

export default Index;
