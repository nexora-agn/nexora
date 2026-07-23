import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { NEIGHBORHOODS, HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import { MapPin, Phone } from "lucide-react";

const Stores = () => {
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <Layout>
      <Helmet>
        <title>Store Locations | {COMPANY.name}</title>
        <meta name="description" content={`Find Nexora Mobile stores in the Austin area — ${COMPANY.name}`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Visit us"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Stores" }]}
        title="Store Locator"
        body="Shop in person, pick up online orders, and visit our repair bars at four Central Texas locations."
        image={HOME_BUILDER_IMAGES.showroom}
        imageAlt="Nexora Mobile store"
      />

      <section className="section-padding-inset">
        <div className="grid md:grid-cols-2 gap-8">
          {NEIGHBORHOODS.map(store => (
            <article key={store.id} className="card-luxury overflow-hidden">
              <img src={store.image} alt="" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="font-sans-brand text-xl font-semibold mb-2">{store.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{store.description}</p>
                <p className="flex items-center gap-2 text-sm mb-4">
                  <MapPin className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {store.avgPrice} · {store.propertyCount}+ devices in stock
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/shop" className="text-xs uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
                    Shop this store
                  </Link>
                  <a href={phoneHref} className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))]">
                    <Phone className="h-3 w-3" /> Call
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Stores;
