import { Helmet } from "react-helmet-async";
import Layout from "@template-truck-repair/components/layout/Layout";
import HomeHero from "@template-truck-repair/components/home/HomeHero";
import EmergencyBreakdownSection from "@template-truck-repair/components/home/EmergencyBreakdownSection";
import ServicesGrid from "@template-truck-repair/components/home/ServicesGrid";
import FleetProgramSection from "@template-truck-repair/components/home/FleetProgramSection";
import WhyChooseUs from "@template-truck-repair/components/home/WhyChooseUs";
import ProcessSection from "@template-truck-repair/components/home/ProcessSection";
import TruckTypesGrid from "@template-truck-repair/components/home/TruckTypesGrid";
import WorkshopGallery from "@template-truck-repair/components/home/WorkshopGallery";
import StatsSection from "@template-truck-repair/components/home/StatsSection";
import TestimonialsSlider from "@template-truck-repair/components/home/TestimonialsSlider";
import EmergencyCTA from "@template-truck-repair/components/home/EmergencyCTA";
import FAQSection from "@template-truck-repair/components/home/FAQSection";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { META_DEFAULT } from "@template-truck-repair/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>{COMPANY.name} | Heavy-Duty Truck Repair & Fleet Maintenance</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Fleet Truck Repair`} />
        <meta property="og:description" content={META_DEFAULT} />
      </Helmet>

      {sectionVisibility["home.hero"] && <Reveal><HomeHero /></Reveal>}
      {sectionVisibility["home.emergency"] !== false && <Reveal delay={50}><EmergencyBreakdownSection /></Reveal>}
      {sectionVisibility["home.services"] !== false && <Reveal delay={70}><ServicesGrid /></Reveal>}
      {sectionVisibility["home.fleetProgram"] !== false && <Reveal delay={90}><FleetProgramSection /></Reveal>}
      {sectionVisibility["home.whyChoose"] !== false && <Reveal delay={110}><WhyChooseUs /></Reveal>}
      {sectionVisibility["home.process"] !== false && <Reveal delay={130}><ProcessSection /></Reveal>}
      {sectionVisibility["home.truckTypes"] !== false && <Reveal delay={150}><TruckTypesGrid /></Reveal>}
      {sectionVisibility["home.gallery"] !== false && <Reveal delay={170}><WorkshopGallery /></Reveal>}
      {sectionVisibility["home.stats"] && <Reveal delay={190}><StatsSection /></Reveal>}
      {sectionVisibility["home.testimonials"] !== false && <Reveal delay={210}><TestimonialsSlider /></Reveal>}
      {sectionVisibility["home.emergencyCta"] !== false && <Reveal delay={230}><EmergencyCTA /></Reveal>}
      {sectionVisibility["home.faq"] !== false && <Reveal delay={250}><FAQSection /></Reveal>}
    </Layout>
  );
};

export default Index;
