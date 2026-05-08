import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HomeHero from "@/components/home/HomeHero";
import ServicesRibbon from "@/components/home/ServicesRibbon";
import WhyTeamSection from "@/components/home/WhyTeamSection";
import ClientStoriesSection from "@/components/home/ClientStoriesSection";
import SignatureProjectsSection from "@/components/home/SignatureProjectsSection";
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
        <meta property="og:title" content={`${COMPANY.name} | Roofing Contractor`} />
        <meta property="og:description" content={COMPANY.tagline} />
      </Helmet>

      {sectionVisibility["home.hero"] && <Reveal direction="zoom" duration={700}><HomeHero /></Reveal>}
      {sectionVisibility["home.servicesRibbon"] && <Reveal delay={70}><ServicesRibbon /></Reveal>}
      {sectionVisibility["home.whyTeam"] && <Reveal delay={120}><WhyTeamSection /></Reveal>}
      {sectionVisibility["home.clientStories"] && <Reveal delay={160}><ClientStoriesSection /></Reveal>}
      {sectionVisibility["home.signatureProjects"] && <Reveal delay={200}><SignatureProjectsSection /></Reveal>}
      {sectionVisibility["home.leadContact"] && <Reveal delay={240}><LeadContactSection /></Reveal>}
    </Layout>
  );
};

export default Index;
