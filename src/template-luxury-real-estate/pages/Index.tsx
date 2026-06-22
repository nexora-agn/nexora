import { Helmet } from "react-helmet-async";
import Layout from "@template-luxury-real-estate/components/layout/Layout";
import HomeHero from "@template-luxury-real-estate/components/home/HomeHero";
import PropertySearch from "@template-luxury-real-estate/components/home/PropertySearch";
import FeaturedListings from "@template-luxury-real-estate/components/home/FeaturedListings";
import PropertyCategories from "@template-luxury-real-estate/components/home/PropertyCategories";
import WhyChooseUs from "@template-luxury-real-estate/components/home/WhyChooseUs";
import FeaturedNeighborhoods from "@template-luxury-real-estate/components/home/FeaturedNeighborhoods";
import NewDevelopmentsSection from "@template-luxury-real-estate/components/home/NewDevelopmentsSection";
import PropertyShowcase from "@template-luxury-real-estate/components/home/PropertyShowcase";
import ServicesSection from "@template-luxury-real-estate/components/home/ServicesSection";
import AgentsSection from "@template-luxury-real-estate/components/home/AgentsSection";
import TestimonialsSlider from "@template-luxury-real-estate/components/home/TestimonialsSlider";
import StatsSection from "@template-luxury-real-estate/components/home/StatsSection";
import BlogSection from "@template-luxury-real-estate/components/home/BlogSection";
import FAQSection from "@template-luxury-real-estate/components/home/FAQSection";
import LuxuryCTA from "@template-luxury-real-estate/components/home/LuxuryCTA";
import Reveal from "@template-luxury-real-estate/components/animations/Reveal";
import { useSiteContent } from "@template-luxury-real-estate/contexts/SiteContentContext";
import { META_DEFAULT } from "@template-luxury-real-estate/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>{COMPANY.name} | Luxury Real Estate</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Luxury Real Estate`} />
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
