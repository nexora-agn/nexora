import { Helmet } from "react-helmet-async";
import Layout from "@template-electrical/components/layout/Layout";
import HomeHero from "@template-electrical/components/home/HomeHero";
import TrustLicenseBar from "@template-electrical/components/home/TrustLicenseBar";
import ResidentialCommercialSplit from "@template-electrical/components/home/ResidentialCommercialSplit";
import ServicesRibbon from "@template-electrical/components/home/ServicesRibbon";
import TroubleshootingSection from "@template-electrical/components/home/TroubleshootingSection";
import WhyTeamSection from "@template-electrical/components/home/WhyTeamSection";
import SignatureProjectsSection from "@template-electrical/components/home/SignatureProjectsSection";
import ClientStoriesSection from "@template-electrical/components/home/ClientStoriesSection";
import EmergencyFinancingBand from "@template-electrical/components/home/EmergencyFinancingBand";
import ServiceAreasHome from "@template-electrical/components/home/ServiceAreasHome";
import LeadContactSection from "@template-electrical/components/home/LeadContactSection";
import Reveal from "@template-electrical/components/animations/Reveal";
import { useSiteContent } from "@template-electrical/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Licensed Electrician</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Licensed Electrician`} />
        <meta property="og:description" content={COMPANY.tagline} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.trustBar"] && (
        <Reveal delay={40}>
          <TrustLicenseBar />
        </Reveal>
      )}
      {sectionVisibility["home.residentialCommercial"] && (
        <Reveal delay={70}>
          <ResidentialCommercialSplit />
        </Reveal>
      )}
      {sectionVisibility["home.servicesRibbon"] && (
        <Reveal delay={100}>
          <ServicesRibbon />
        </Reveal>
      )}
      {sectionVisibility["home.troubleshooting"] && (
        <Reveal delay={130}>
          <TroubleshootingSection />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={160}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={190}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={220}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.emergencyBand"] && (
        <Reveal delay={250}>
          <EmergencyFinancingBand />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={280}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={310}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
