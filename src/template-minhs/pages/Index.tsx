import { Helmet } from "react-helmet-async";
import Layout from "@template-minhs/components/layout/Layout";
import HomeHero from "@template-minhs/components/home/HomeHero";
import TrustLicenseBar from "@template-minhs/components/home/TrustLicenseBar";
import VehicleBrandsSection from "@template-minhs/components/home/VehicleBrandsSection";
import ServicesRibbon from "@template-minhs/components/home/ServicesRibbon";
import WhyTeamSection from "@template-minhs/components/home/WhyTeamSection";
import WarrantySection from "@template-minhs/components/home/WarrantySection";
import ClientStoriesSection from "@template-minhs/components/home/ClientStoriesSection";
import SignatureProjectsSection from "@template-minhs/components/home/SignatureProjectsSection";
import AboutHomeSection from "@template-minhs/components/home/AboutHomeSection";
import ServiceAreasHome from "@template-minhs/components/home/ServiceAreasHome";
import HomeFaqSection from "@template-minhs/components/home/HomeFaqSection";
import CTABannerSection from "@template-minhs/components/home/CTABannerSection";
import LeadContactSection from "@template-minhs/components/home/LeadContactSection";
import Reveal from "@template-minhs/components/animations/Reveal";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";

const Index = () => {
  const { sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | European Auto Repair Brooklyn</title>
        <meta name="description" content={`${COMPANY.name}. ${COMPANY.tagline}`} />
        <meta property="og:title" content={`${COMPANY.name} | European Auto Repair`} />
        <meta property="og:description" content={COMPANY.tagline} />
      </Helmet>

      {sectionVisibility["home.hero"] && (
        <Reveal direction="zoom" duration={700}>
          <HomeHero />
        </Reveal>
      )}
      {sectionVisibility["home.trustBar"] && (
        <Reveal delay={40}>
          <TrustLicenseBar />
        </Reveal>
      )}
      {sectionVisibility["home.vehicleBrands"] !== false && (
        <Reveal delay={60}>
          <VehicleBrandsSection />
        </Reveal>
      )}
      {sectionVisibility["home.servicesRibbon"] && (
        <Reveal delay={90}>
          <ServicesRibbon />
        </Reveal>
      )}
      {sectionVisibility["home.whyTeam"] && (
        <Reveal delay={120}>
          <WhyTeamSection />
        </Reveal>
      )}
      {sectionVisibility["home.warranty"] !== false && (
        <Reveal delay={150}>
          <WarrantySection />
        </Reveal>
      )}
      {sectionVisibility["home.clientStories"] && (
        <Reveal delay={180}>
          <ClientStoriesSection />
        </Reveal>
      )}
      {sectionVisibility["home.signatureProjects"] && (
        <Reveal delay={210}>
          <SignatureProjectsSection />
        </Reveal>
      )}
      {sectionVisibility["home.aboutHome"] !== false && (
        <Reveal delay={240}>
          <AboutHomeSection />
        </Reveal>
      )}
      {sectionVisibility["home.serviceAreas"] && (
        <Reveal delay={270}>
          <ServiceAreasHome />
        </Reveal>
      )}
      {sectionVisibility["home.faq"] !== false && (
        <Reveal delay={300}>
          <HomeFaqSection />
        </Reveal>
      )}
      {sectionVisibility["home.ctaBanner"] !== false && (
        <Reveal delay={320}>
          <CTABannerSection />
        </Reveal>
      )}
      {sectionVisibility["home.leadContact"] && (
        <Reveal delay={340}>
          <LeadContactSection />
        </Reveal>
      )}
    </Layout>
  );
};

export default Index;
