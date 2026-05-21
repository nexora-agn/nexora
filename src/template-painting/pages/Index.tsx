import { Helmet } from "react-helmet-async";
import Layout from "@template-painting/components/layout/Layout";
import ContactInfoStrip from "@template-painting/components/home/ContactInfoStrip";
import HomeHero from "@template-painting/components/home/HomeHero";
import TrustLicenseBar from "@template-painting/components/home/TrustLicenseBar";
import InteriorExteriorShowcase from "@template-painting/components/home/InteriorExteriorShowcase";
import CapabilitiesSection from "@template-painting/components/home/CapabilitiesSection";
import ServicesRibbon from "@template-painting/components/home/ServicesRibbon";
import SignatureProjectsSection from "@template-painting/components/home/SignatureProjectsSection";
import WhyTeamSection from "@template-painting/components/home/WhyTeamSection";
import ProcessSection from "@template-painting/components/home/ProcessSection";
import ClientStoriesSection from "@template-painting/components/home/ClientStoriesSection";
import ServiceAreasHome from "@template-painting/components/home/ServiceAreasHome";
import LeadContactSection from "@template-painting/components/home/LeadContactSection";
import Reveal from "@template-painting/components/animations/Reveal";
import { useSiteContent } from "@template-painting/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Premium Painting · North Jersey</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Premium Painting`} />
        <meta property="og:description" content={COMPANY.tagline} />
      </Helmet>

      {sectionVisibility["home.contactStrip"] !== false && (
        <Reveal direction="down" duration={500}>
          <ContactInfoStrip />
        </Reveal>
      )}
      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={800}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.trustBar"] && (
        <Reveal delay={40}>
          <TrustLicenseBar />
        </Reveal>
      )}
      {sectionVisibility["home.residentialCommercial"] !== false && (
        <Reveal delay={60}>
          <InteriorExteriorShowcase />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] !== false && (
        <Reveal delay={80}>
          <CapabilitiesSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={100}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={120}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={140}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.servicesRibbon"] && (
        <Reveal delay={160}>
          <ServicesRibbon />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={180}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={200}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={220}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
