import { Helmet } from "react-helmet-async";
import Layout from "@template-truck-repair/components/layout/Layout";
import ContactInfoStrip from "@template-truck-repair/components/home/ContactInfoStrip";
import HomeHero from "@template-truck-repair/components/home/HomeHero";
import WhyChooseGrid from "@template-truck-repair/components/home/WhyChooseGrid";
import ServicesShowcase from "@template-truck-repair/components/home/ServicesShowcase";
import ProcessSection from "@template-truck-repair/components/home/ProcessSection";
import SignatureProjectsSection from "@template-truck-repair/components/home/SignatureProjectsSection";
import HeroPromoBanners from "@template-truck-repair/components/home/HeroPromoBanners";
import ServiceAreasHome from "@template-truck-repair/components/home/ServiceAreasHome";
import ClientStoriesSection from "@template-truck-repair/components/home/ClientStoriesSection";
import StatsCounterStrip from "@template-truck-repair/components/home/StatsCounterStrip";
import LeadContactSection from "@template-truck-repair/components/home/LeadContactSection";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { META_DEFAULT } from "@template-truck-repair/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Design-Build Custom Homes · Central NJ</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Design-Build Custom Homes`} />
        <meta property="og:description" content={META_DEFAULT} />
      </Helmet>

      {sectionVisibility["home.contactStrip"] !== false && (
        <Reveal direction="down" duration={400}>
          <ContactInfoStrip />
        </Reveal>
      )}
      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={50}>
          <WhyChooseGrid />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] !== false && (
        <Reveal delay={70}>
          <ServicesShowcase />
        </Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={90}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={110}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.promoBanners"] !== false && (
        <Reveal delay={130}>
          <HeroPromoBanners />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={150}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={170}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.stats"] !== false && (
        <Reveal delay={190}>
          <StatsCounterStrip />
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
