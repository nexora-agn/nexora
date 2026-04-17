import { Helmet } from "react-helmet-async";
import Layout from "@template/components/layout/Layout";
import HomeHero from "@template/components/home/HomeHero";
import ServicesRibbon from "@template/components/home/ServicesRibbon";
import CapabilitiesSection from "@template/components/home/CapabilitiesSection";
import SignatureProjectsSection from "@template/components/home/SignatureProjectsSection";
import StatsBanner from "@template/components/home/StatsBanner";
import ProcessSection from "@template/components/home/ProcessSection";
import ClientStoriesSection from "@template/components/home/ClientStoriesSection";
import WhyTeamSection from "@template/components/home/WhyTeamSection";
import LeadContactSection from "@template/components/home/LeadContactSection";
import Reveal from "@template/components/animations/Reveal";
import { COMPANY } from "@template/data/siteData";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility } = useSiteContent();
  return (
    <Layout>
    <Helmet>
      <title>{COMPANY.name} — Construction &amp; Design</title>
      <meta
        name="description"
        content={`${COMPANY.name} — ${COMPANY.tagline} Residential and commercial builds with a transparent process.`}
      />
      <meta property="og:title" content={`${COMPANY.name} — Construction & Design`} />
      <meta property="og:description" content={COMPANY.tagline} />
    </Helmet>

    {sectionVisibility["home.hero"] && <Reveal direction="zoom" duration={700}><HomeHero /></Reveal>}
    {sectionVisibility["home.servicesRibbon"] && <Reveal delay={70}><ServicesRibbon /></Reveal>}
    {sectionVisibility["home.capabilities"] && <Reveal delay={90}><CapabilitiesSection /></Reveal>}
    {sectionVisibility["home.signatureProjects"] && <Reveal delay={110}><SignatureProjectsSection /></Reveal>}
    {sectionVisibility["home.stats"] && <Reveal delay={130}><StatsBanner /></Reveal>}
    {sectionVisibility["home.process"] && <Reveal delay={150}><ProcessSection /></Reveal>}
    {sectionVisibility["home.clientStories"] && <Reveal delay={170}><ClientStoriesSection /></Reveal>}
    {sectionVisibility["home.whyTeam"] && <Reveal delay={190}><WhyTeamSection /></Reveal>}
    {sectionVisibility["home.leadContact"] && <Reveal delay={220}><LeadContactSection /></Reveal>}
    </Layout>
  );
};

export default Index;
