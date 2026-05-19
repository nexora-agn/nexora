import { Helmet } from "react-helmet-async";
import Layout from "@template-plumbing/components/layout/Layout";
import HomeHero from "@template-plumbing/components/home/HomeHero";
import ContactInfoStrip from "@template-plumbing/components/home/ContactInfoStrip";
import TrustLicenseBar from "@template-plumbing/components/home/TrustLicenseBar";
import CapabilitiesSection from "@template-plumbing/components/home/CapabilitiesSection";
import ServicesRibbon from "@template-plumbing/components/home/ServicesRibbon";
import StatsBanner from "@template-plumbing/components/home/StatsBanner";
import ProcessSection from "@template-plumbing/components/home/ProcessSection";
import ResidentialCommercialSplit from "@template-plumbing/components/home/ResidentialCommercialSplit";
import SignatureProjectsSection from "@template-plumbing/components/home/SignatureProjectsSection";
import WhyTeamSection from "@template-plumbing/components/home/WhyTeamSection";
import ClientStoriesSection from "@template-plumbing/components/home/ClientStoriesSection";
import EmergencyFinancingBand from "@template-plumbing/components/home/EmergencyFinancingBand";
import TroubleshootingSection from "@template-plumbing/components/home/TroubleshootingSection";
import ServiceAreasHome from "@template-plumbing/components/home/ServiceAreasHome";
import LeadContactSection from "@template-plumbing/components/home/LeadContactSection";
import Reveal from "@template-plumbing/components/animations/Reveal";
import { useSiteContent } from "@template-plumbing/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Trusted Plumbers · 24/7 Service</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Trusted Plumbers`} />
        <meta property="og:description" content={COMPANY.tagline} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.contactStrip"] !== false && (
        <Reveal delay={30}>
          <ContactInfoStrip />
        </Reveal>
      )}
      {sectionVisibility["home.trustBar"] && (
        <Reveal delay={50}>
          <TrustLicenseBar />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] !== false && (
        <Reveal delay={70}>
          <CapabilitiesSection />
        </Reveal>
      )}
      {sectionVisibility["home.servicesRibbon"] && (
        <Reveal delay={90}>
          <ServicesRibbon />
        </Reveal>
      )}
      {sectionVisibility["home.stats"] !== false && (
        <Reveal delay={110}>
          <StatsBanner />
        </Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={130}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.residentialCommercial"] && (
        <Reveal delay={150}>
          <ResidentialCommercialSplit />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={170}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={190}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={210}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.troubleshooting"] && (
        <Reveal delay={230}>
          <TroubleshootingSection />
        </Reveal>
      )}
      {sectionVisibility["home.emergencyBand"] && (
        <Reveal delay={250}>
          <EmergencyFinancingBand />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={270}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={290}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
