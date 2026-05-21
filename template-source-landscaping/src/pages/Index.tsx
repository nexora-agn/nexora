import { Helmet } from "react-helmet-async";
import Layout from "@template-landscaping/components/layout/Layout";
import ContactInfoStrip from "@template-landscaping/components/home/ContactInfoStrip";
import HomeHero from "@template-landscaping/components/home/HomeHero";
import TrustLicenseBar from "@template-landscaping/components/home/TrustLicenseBar";
import ResidentialCommercialSplit from "@template-landscaping/components/home/ResidentialCommercialSplit";
import TreeServiceHighlights from "@template-landscaping/components/home/TreeServiceHighlights";
import LawnMaintenanceShowcase from "@template-landscaping/components/home/LawnMaintenanceShowcase";
import CapabilitiesSection from "@template-landscaping/components/home/CapabilitiesSection";
import WhyTeamSection from "@template-landscaping/components/home/WhyTeamSection";
import ProcessSection from "@template-landscaping/components/home/ProcessSection";
import SignatureProjectsSection from "@template-landscaping/components/home/SignatureProjectsSection";
import ClientStoriesSection from "@template-landscaping/components/home/ClientStoriesSection";
import SeasonalServicesBand from "@template-landscaping/components/home/SeasonalServicesBand";
import ServiceAreasHome from "@template-landscaping/components/home/ServiceAreasHome";
import LeadContactSection from "@template-landscaping/components/home/LeadContactSection";
import Reveal from "@template-landscaping/components/animations/Reveal";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Landscaping & Tree Service · North Jersey</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Landscaping & Tree Service`} />
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
          <ResidentialCommercialSplit />
        </Reveal>
      )}
      {sectionVisibility["home.treeHighlights"] !== false && (
        <Reveal delay={80}>
          <TreeServiceHighlights />
        </Reveal>
      )}
      {sectionVisibility["home.lawnShowcase"] !== false && (
        <Reveal delay={100}>
          <LawnMaintenanceShowcase />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] !== false && (
        <Reveal delay={120}>
          <CapabilitiesSection />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={140}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={160}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={180}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={200}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.seasonalServices"] !== false && (
        <Reveal delay={220}>
          <SeasonalServicesBand />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={240}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={260}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
