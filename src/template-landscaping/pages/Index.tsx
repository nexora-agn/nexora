import { Helmet } from "react-helmet-async";
import Layout from "@template-landscaping/components/layout/Layout";
import ContactInfoStrip from "@template-landscaping/components/home/ContactInfoStrip";
import HomeHero from "@template-landscaping/components/home/HomeHero";
import HeroPromoBanners from "@template-landscaping/components/home/HeroPromoBanners";
import TrustLicenseBar from "@template-landscaping/components/home/TrustLicenseBar";
import ServiceCategoryTabs from "@template-landscaping/components/home/ServiceCategoryTabs";
import WhatWeOfferGrid from "@template-landscaping/components/home/WhatWeOfferGrid";
import StatsCounterStrip from "@template-landscaping/components/home/StatsCounterStrip";
import WhyChooseGrid from "@template-landscaping/components/home/WhyChooseGrid";
import ProcessSection from "@template-landscaping/components/home/ProcessSection";
import SignatureProjectsSection from "@template-landscaping/components/home/SignatureProjectsSection";
import ClientStoriesSection from "@template-landscaping/components/home/ClientStoriesSection";
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
        <Reveal direction="down" duration={400}>
          <ContactInfoStrip />
        </Reveal>
      )}
      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.promoBanners"] !== false && (
        <Reveal delay={30}>
          <HeroPromoBanners />
        </Reveal>
      )}
      {sectionVisibility["home.trustBar"] && (
        <Reveal delay={50}>
          <TrustLicenseBar />
        </Reveal>
      )}
      {sectionVisibility["home.serviceCategories"] !== false && (
        <Reveal delay={70}>
          <ServiceCategoryTabs />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] !== false && (
        <Reveal delay={90}>
          <WhatWeOfferGrid />
        </Reveal>
      )}
      {sectionVisibility["home.stats"] !== false && (
        <Reveal delay={110}>
          <StatsCounterStrip />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={130}>
          <WhyChooseGrid />
        </Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={150}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={170}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={190}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={210}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={230}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
