import { Helmet } from "react-helmet-async";
import Layout from "@template-restaurant/components/layout/Layout";
import HomeHero from "@template-restaurant/components/home/HomeHero";
import ReservationSection from "@template-restaurant/components/home/ReservationSection";
import MenuHighlights from "@template-restaurant/components/home/MenuHighlights";
import SignatureDishes from "@template-restaurant/components/home/SignatureDishes";
import ChefSection from "@template-restaurant/components/home/ChefSection";
import ExperienceSection from "@template-restaurant/components/home/ExperienceSection";
import PrivateEventsSection from "@template-restaurant/components/home/PrivateEventsSection";
import TestimonialsSlider from "@template-restaurant/components/home/TestimonialsSlider";
import StatsSection from "@template-restaurant/components/home/StatsSection";
import BlogSection from "@template-restaurant/components/home/BlogSection";
import FAQSection from "@template-restaurant/components/home/FAQSection";
import RestaurantCTA from "@template-restaurant/components/home/RestaurantCTA";
import Reveal from "@template-restaurant/components/animations/Reveal";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { META_DEFAULT } from "@template-restaurant/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>{COMPANY.name} | Fine Dining Restaurant</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | Fine Dining`} />
        <meta property="og:description" content={META_DEFAULT} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.reservation"] !== false && (
        <Reveal delay={50}><ReservationSection /></Reveal>
      )}
      {sectionVisibility["home.menuHighlights"] !== false && (
        <Reveal delay={70}><MenuHighlights /></Reveal>
      )}
      {sectionVisibility["home.signatureDishes"] !== false && (
        <Reveal delay={90}><SignatureDishes /></Reveal>
      )}
      {sectionVisibility["home.chefStory"] !== false && (
        <Reveal delay={110}><ChefSection /></Reveal>
      )}
      {sectionVisibility["home.experience"] !== false && (
        <Reveal delay={130}><ExperienceSection /></Reveal>
      )}
      {sectionVisibility["home.privateEvents"] !== false && (
        <Reveal delay={150}><PrivateEventsSection /></Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={170}><TestimonialsSlider /></Reveal>
      )}
      {sectionVisibility["home.stats"] && (
        <Reveal delay={190}><StatsSection /></Reveal>
      )}
      {sectionVisibility["home.blog"] !== false && (
        <Reveal delay={210}><BlogSection /></Reveal>
      )}
      {sectionVisibility["home.faq"] !== false && (
        <Reveal delay={230}><FAQSection /></Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={250}><RestaurantCTA /></Reveal>
      )}
    </Layout>
  );
};

export default Index;
