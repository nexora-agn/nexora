import { Helmet } from "react-helmet-async";
import Layout from "@template-tire-shop/components/layout/Layout";
import HomeHero from "@template-tire-shop/components/home/HomeHero";
import TireFinder from "@template-tire-shop/components/home/TireFinder";
import FeaturedListings from "@template-tire-shop/components/home/FeaturedListings";
import PropertyCategories from "@template-tire-shop/components/home/PropertyCategories";
import ServicesRibbon from "@template-tire-shop/components/home/ServicesRibbon";
import NewDevelopmentsSection from "@template-tire-shop/components/home/NewDevelopmentsSection";
import WhyChooseUs from "@template-tire-shop/components/home/WhyChooseUs";
import ProcessSection from "@template-tire-shop/components/home/ProcessSection";
import FeaturedNeighborhoods from "@template-tire-shop/components/home/FeaturedNeighborhoods";
import TestimonialsSlider from "@template-tire-shop/components/home/TestimonialsSlider";
import FAQSection from "@template-tire-shop/components/home/FAQSection";
import LuxuryCTA from "@template-tire-shop/components/home/LuxuryCTA";
import Reveal from "@template-tire-shop/components/animations/Reveal";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { META_DEFAULT } from "@template-tire-shop/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>{COMPANY.name} | Austin Tire Shop · Find · Fit · Install</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Austin Tire Shop`} />
        <meta property="og:description" content={META_DEFAULT} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.search"] !== false && (
        <Reveal delay={40}>
          <TireFinder />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={50}><FeaturedListings /></Reveal>
      )}
      {sectionVisibility["home.serviceCategories"] && (
        <Reveal delay={70}><PropertyCategories /></Reveal>
      )}
      {sectionVisibility["home.capabilities"] && (
        <Reveal delay={90}><ServicesRibbon /></Reveal>
      )}
      {sectionVisibility["home.developments"] !== false && (
        <Reveal delay={110}><NewDevelopmentsSection /></Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={130}><WhyChooseUs /></Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={140}><ProcessSection /></Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={150}><FeaturedNeighborhoods /></Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={170}><TestimonialsSlider /></Reveal>
      )}
      {sectionVisibility["home.faq"] !== false && (
        <Reveal delay={190}><FAQSection /></Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={210}><LuxuryCTA /></Reveal>
      )}
    </Layout>
  );
};

export default Index;
