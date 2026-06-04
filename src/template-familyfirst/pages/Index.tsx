import { Helmet } from "react-helmet-async";
import Layout from "@template-familyfirst/components/layout/Layout";
import HomeHero from "@template-familyfirst/components/home/HomeHero";
import ContactInfoStrip from "@template-familyfirst/components/home/ContactInfoStrip";
import TrustLicenseBar from "@template-familyfirst/components/home/TrustLicenseBar";
import CapabilitiesSection from "@template-familyfirst/components/home/CapabilitiesSection";
import ServicesRibbon from "@template-familyfirst/components/home/ServicesRibbon";
import StatsBanner from "@template-familyfirst/components/home/StatsBanner";
import ProcessSection from "@template-familyfirst/components/home/ProcessSection";
import ResidentialCommercialSplit from "@template-familyfirst/components/home/ResidentialCommercialSplit";
import SignatureProjectsSection from "@template-familyfirst/components/home/SignatureProjectsSection";
import WhyTeamSection from "@template-familyfirst/components/home/WhyTeamSection";
import ClientStoriesSection from "@template-familyfirst/components/home/ClientStoriesSection";
import EmergencyFinancingBand from "@template-familyfirst/components/home/EmergencyFinancingBand";
import TroubleshootingSection from "@template-familyfirst/components/home/TroubleshootingSection";
import ServiceAreasHome from "@template-familyfirst/components/home/ServiceAreasHome";
import LeadContactSection from "@template-familyfirst/components/home/LeadContactSection";
import HomeFaqSection from "@template-familyfirst/components/home/HomeFaqSection";
import Reveal from "@template-familyfirst/components/animations/Reveal";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";

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
      {sectionVisibility["home.faq"] !== false && (
        <Reveal delay={285}>
          <HomeFaqSection />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={300}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
