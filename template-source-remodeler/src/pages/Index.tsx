import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ContactInfoStrip from "@/components/home/ContactInfoStrip";
import HomeHero from "@/components/home/HomeHero";
import StatsCounterStrip from "@/components/home/StatsCounterStrip";
import VideoStoryBand from "@/components/home/VideoStoryBand";
import SignatureProjectsSection from "@/components/home/SignatureProjectsSection";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import HeroPromoBanners from "@/components/home/HeroPromoBanners";
import ClientStoriesSection from "@/components/home/ClientStoriesSection";
import ReviewPlatformsStrip from "@/components/home/ReviewPlatformsStrip";
import ProcessSection from "@/components/home/ProcessSection";
import MaterialsBand from "@/components/home/MaterialsBand";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LeadContactSection from "@/components/home/LeadContactSection";
import ServiceAreasHome from "@/components/home/ServiceAreasHome";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/animations/Reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { META_DEFAULT } from "@/data/siteData";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | NJ Home Remodeling & Improvement</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | NJ Home Remodeling`} />
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
      {sectionVisibility["home.stats"] !== false && (
        <Reveal delay={50}>
          <StatsCounterStrip />
        </Reveal>
      )}
      {sectionVisibility["home.videoStory"] !== false && (
        <Reveal delay={70}>
          <VideoStoryBand />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={90}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.capabilities"] !== false && (
        <Reveal delay={110}>
          <ServicesShowcase />
        </Reveal>
      )}
      {sectionVisibility["home.promoBanners"] !== false && (
        <Reveal delay={130}>
          <HeroPromoBanners />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={150}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.reviewPlatforms"] !== false && (
        <Reveal delay={170}>
          <ReviewPlatformsStrip />
        </Reveal>
      )}
      {sectionVisibility["home.process"] !== false && (
        <Reveal delay={190}>
          <ProcessSection />
        </Reveal>
      )}
      {sectionVisibility["home.materials"] !== false && (
        <Reveal delay={210}>
          <MaterialsBand />
        </Reveal>
      )}
      {sectionVisibility["home.blogPreview"] !== false && (
        <Reveal delay={230}>
          <BlogPreviewSection />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={250}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={270}>
          <LeadContactSection />
        </Reveal>
      )}
      {sectionVisibility["home.finalCta"] !== false && (
        <CTASection
          title="Request Your Free Estimate Today"
          subtitle="Kitchen, bath, basement, siding, roofing, and full-home remodeling across 11 NJ counties."
          primaryLabel="Get a Free Estimate"
          secondaryLabel="Call Now"
        />
      )}
    </Layout>
  );
};

export default Index;
