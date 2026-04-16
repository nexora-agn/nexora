import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustSection from "@/components/landing/TrustSection";
import StepsSection from "@/components/landing/StepsSection";
import CustomizationPreview from "@/components/landing/CustomizationPreview";
import WhatYouGet from "@/components/landing/WhatYouGet";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustSection />
      <StepsSection />
      <CustomizationPreview />
      <WhatYouGet />
      <BenefitsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
