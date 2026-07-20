import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template-mobile-store/components/layout/Layout";
import HarborPageHero from "@template-mobile-store/components/sections/HarborPageHero";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { OFFERS, HOME_BUILDER_IMAGES } from "@template-mobile-store/data/siteData";
import { Button } from "@/components/ui/button";

const Offers = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Special Offers | {COMPANY.name}</title>
        <meta name="description" content={`Current specials and incentives at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Savings"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Offers" }]}
        title="Special Offers"
        body="Limited-time incentives on new, used, and certified inventory."
        image={HOME_BUILDER_IMAGES.contactHero}
        imageAlt="Special offers"
      />

      <section className="section-padding-inset bg-white">
        <OffersGrid />
      </section>
    </Layout>
  );
};

function OffersGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {OFFERS.map(offer => (
        <article key={offer.id} className="border border-border p-6 flex flex-col">
          <p className="text-xs uppercase tracking-wider text-[hsl(var(--secondary))] font-semibold">{offer.tag}</p>
          <h2 className="font-display text-2xl text-[hsl(var(--primary))] mt-2">{offer.title}</h2>
          <p className="text-muted-foreground mt-3 flex-1">{offer.description}</p>
          <p className="text-sm text-muted-foreground mt-4">Through {offer.validThrough}</p>
          <Button asChild className="mt-4 w-fit bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
            <Link to={offer.ctaTo}>{offer.ctaLabel}</Link>
          </Button>
        </article>
      ))}
    </div>
  );
}

export default Offers;
