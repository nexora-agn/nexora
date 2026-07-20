import { Helmet } from "react-helmet-async";
import Layout from "@template-mobile-store/components/layout/Layout";
import HomeHero from "@template-mobile-store/components/home/HomeHero";
import PropertySearch from "@template-mobile-store/components/home/PropertySearch";
import FeaturedListings from "@template-mobile-store/components/home/FeaturedListings";
import PropertyCategories from "@template-mobile-store/components/home/PropertyCategories";
import WhyChooseUs from "@template-mobile-store/components/home/WhyChooseUs";
import FeaturedNeighborhoods from "@template-mobile-store/components/home/FeaturedNeighborhoods";
import NewDevelopmentsSection from "@template-mobile-store/components/home/NewDevelopmentsSection";
import PropertyShowcase from "@template-mobile-store/components/home/PropertyShowcase";
import ServicesSection from "@template-mobile-store/components/home/ServicesSection";
import AgentsSection from "@template-mobile-store/components/home/AgentsSection";
import TestimonialsSlider from "@template-mobile-store/components/home/TestimonialsSlider";
import StatsSection from "@template-mobile-store/components/home/StatsSection";
import BlogSection from "@template-mobile-store/components/home/BlogSection";
import FAQSection from "@template-mobile-store/components/home/FAQSection";
import LuxuryCTA from "@template-mobile-store/components/home/LuxuryCTA";
import Reveal from "@template-mobile-store/components/animations/Reveal";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { META_DEFAULT } from "@template-mobile-store/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>{COMPANY.name} | Premium Mobile Store · Austin, TX</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Premium Mobile Store`} />
        <meta property="og:description" content={META_DEFAULT} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.search"] !== false && <PropertySearch />}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={50}><FeaturedListings /></Reveal>
      )}
      {sectionVisibility["home.serviceCategories"] && (
        <Reveal delay={70}><PropertyCategories /></Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={90}><WhyChooseUs /></Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={110}><FeaturedNeighborhoods /></Reveal>
      )}
      {sectionVisibility["home.developments"] !== false && (
        <Reveal delay={130}><NewDevelopmentsSection /></Reveal>
      )}
      {sectionVisibility["home.showcase"] !== false && (
        <Reveal delay={150}><PropertyShowcase /></Reveal>
      )}
      {sectionVisibility["home.capabilities"] && (
        <Reveal delay={170}><ServicesSection /></Reveal>
      )}
      {sectionVisibility["home.agents"] !== false && (
        <Reveal delay={190}><AgentsSection /></Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={210}><TestimonialsSlider /></Reveal>
      )}
      {sectionVisibility["home.stats"] && (
        <Reveal delay={230}><StatsSection /></Reveal>
      )}
      {sectionVisibility["home.blog"] !== false && (
        <Reveal delay={250}><BlogSection /></Reveal>
      )}
      {sectionVisibility["home.faq"] !== false && (
        <Reveal delay={270}><FAQSection /></Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={290}><LuxuryCTA /></Reveal>
      )}
    </Layout>
  );
};

export default Index;
