import { Helmet } from "react-helmet-async";
import Layout from "@template-barbershop/components/layout/Layout";
import HomeHero from "@template-barbershop/components/home/HomeHero";
import BookingTeaser from "@template-barbershop/components/home/BookingTeaser";
import ServicesGrid from "@template-barbershop/components/home/ServicesGrid";
import PackagesGrid from "@template-barbershop/components/home/PackagesGrid";
import BarbersGrid from "@template-barbershop/components/home/BarbersGrid";
import WhyChooseUs from "@template-barbershop/components/home/WhyChooseUs";
import GallerySection from "@template-barbershop/components/home/GallerySection";
import ProductsPreview from "@template-barbershop/components/home/ProductsPreview";
import TestimonialsSlider from "@template-barbershop/components/home/TestimonialsSlider";
import HomeStats from "@template-barbershop/components/home/HomeStats";
import LoyaltyTeaser from "@template-barbershop/components/home/LoyaltyTeaser";
import BlogPreviews from "@template-barbershop/components/home/BlogPreviews";
import FAQSection from "@template-barbershop/components/home/FAQSection";
import CTASection from "@template-barbershop/components/sections/CTASection";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { META_DEFAULT, COMPANY } from "@template-barbershop/data/siteData";

const Index = () => {
  const { sectionVisibility } = useSiteContent();
  const show = (id: string) => sectionVisibility[id] !== false;

  return (
    <Layout>
      <Helmet>
        <title>{COMPANY.name} | Precision Cuts. Timeless Style.</title>
        <meta name="description" content={META_DEFAULT} />
      </Helmet>
      {show("home.hero") && <HomeHero />}
      {show("home.booking") && <BookingTeaser />}
      {show("home.services") && <ServicesGrid />}
      {show("home.packages") && <PackagesGrid />}
      {show("home.barbers") && <BarbersGrid />}
      {show("home.whyChoose") && <WhyChooseUs />}
      {show("home.gallery") && <GallerySection />}
      {show("home.stats") && <HomeStats />}
      {show("home.products") && <ProductsPreview />}
      {show("home.testimonials") && <TestimonialsSlider />}
      {show("home.loyalty") && <LoyaltyTeaser />}
      {show("home.blog") && <BlogPreviews />}
      {show("home.faq") && <FAQSection />}
      {show("home.cta") && <CTASection />}
    </Layout>
  );
};

export default Index;
