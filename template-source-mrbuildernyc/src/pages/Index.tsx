import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HomeHero from "@/components/home/HomeHero";
import ServicesRibbon from "@/components/home/ServicesRibbon";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import StatsBanner from "@/components/home/StatsBanner";
import ProcessSection from "@/components/home/ProcessSection";
import SignatureProjectsSection from "@/components/home/SignatureProjectsSection";
import ClientStoriesSection from "@/components/home/ClientStoriesSection";
import WhyTeamSection from "@/components/home/WhyTeamSection";
import LeadContactSection from "@/components/home/LeadContactSection";
import Reveal from "@/components/animations/Reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();
  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Roofing Contractor</title>
        <meta
          name="description"
          content={`${COMPANY.name}. ${COMPANY.tagline}`}
        />
        <meta
          property="og:title"
          content={`${COMPANY.name} | Roofing Contractor`}
        />
        <meta property="og:description" content={COMPANY.tagline} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.servicesRibbon"] && (
        <Reveal delay={70}>
          <ServicesRibbon />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] && (
        <Reveal delay={90}>
          <CapabilitiesSection />
        </Reveal>
      )}
      {sectionVisibility["home.stats"] && (
        <Reveal delay={110}>
          <StatsBanner />
        </Reveal>
      )}
      {sectionVisibility["home.process"] && (
        <Reveal delay={130}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={150}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={170}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={190}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={210}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
