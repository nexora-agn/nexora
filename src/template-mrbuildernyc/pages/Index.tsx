import { Helmet } from "react-helmet-async";
import Layout from "@template-mrbuildernyc/components/layout/Layout";
import HomeHero from "@template-mrbuildernyc/components/home/HomeHero";
import ServicesRibbon from "@template-mrbuildernyc/components/home/ServicesRibbon";
import SignatureProjectsSection from "@template-mrbuildernyc/components/home/SignatureProjectsSection";
import ClientStoriesSection from "@template-mrbuildernyc/components/home/ClientStoriesSection";
import WhyTeamSection from "@template-mrbuildernyc/components/home/WhyTeamSection";
import LeadContactSection from "@template-mrbuildernyc/components/home/LeadContactSection";
import Reveal from "@template-mrbuildernyc/components/animations/Reveal";
import { useSiteContent } from "@template-mrbuildernyc/contexts/SiteContentContext";

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
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={110}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={150}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={190}>
          <SignatureProjectsSection />
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
