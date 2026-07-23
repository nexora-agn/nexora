import { Helmet } from "react-helmet-async";
import { useMemo, type ReactNode } from "react";
import Layout from "@template-tire-shop/components/layout/Layout";
import { PropertyCard } from "@template-tire-shop/components/home/FeaturedListings";
import LuxuryCTA from "@template-tire-shop/components/home/LuxuryCTA";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import type { VehicleListing } from "@template-tire-shop/data/inventory";

type Props = {
  listingType: VehicleListing["listingType"];
  title: string;
  eyebrow: string;
  description: string;
  extraSection?: ReactNode;
};

const VehicleCategoryList = ({ listingType, title, eyebrow, description, extraSection }: Props) => {
  const { projects, company: COMPANY } = useSiteContent();

  const filtered = useMemo(
    () => (projects as unknown as VehicleListing[]).filter(v => v.listingType === listingType),
    [projects, listingType],
  );

  return (
    <Layout>
      <Helmet>
        <title>
          {title} | {COMPANY.name}
        </title>
        <meta name="description" content={description} />
      </Helmet>

      <section className="bg-[hsl(var(--primary))] text-white dealer-header-offset pb-10 sm:pb-12 lg:pb-14">
        <CategoryHero eyebrow={eyebrow} title={title} count={filtered.length} />
      </section>

      {extraSection}

      <section className="section-padding-inset">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No devices in this category right now. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      <LuxuryCTA />
    </Layout>
  );
};

function CategoryHero({ eyebrow, title, count }: { eyebrow: string; title: string; count: number }) {
  return (
    <div className="container-custom container-inset">
      <p className="dealer-eyebrow text-[hsl(var(--secondary))] mb-3">{eyebrow}</p>
      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-2">{title}</h1>
      <p className="text-white/70">{count} devices available</p>
    </div>
  );
}

export default VehicleCategoryList;
