import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Layout from "@template-dealership/components/layout/Layout";
import HarborPageHero from "@template-dealership/components/sections/HarborPageHero";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { getCompareList } from "@template-dealership/lib/propertyCompare";
import { formatCurrency } from "@template-dealership/lib/mortgageCalculator";
import type { VehicleListing } from "@template-dealership/data/inventory";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";

const ROWS: { key: string; label: string; get: (v: VehicleListing) => string }[] = [
  { key: "price", label: "Price", get: v => formatCurrency(v.price) },
  { key: "mileage", label: "Mileage", get: v => `${v.mileage.toLocaleString()} mi` },
  { key: "engine", label: "Engine", get: v => v.engine },
  { key: "fuel", label: "Fuel", get: v => v.fuelType },
  { key: "drivetrain", label: "Drivetrain", get: v => v.drivetrain },
  { key: "features", label: "Features", get: v => String(v.features?.length ?? 0) },
];

const Compare = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getCompareList());
    const t = setInterval(() => setIds(getCompareList()), 800);
    return () => clearInterval(t);
  }, []);

  const vehicles = useMemo(() => {
    const map = new Map((projects as unknown as VehicleListing[]).map(v => [v.id, v]));
    return ids.map(id => map.get(id)).filter(Boolean) as VehicleListing[];
  }, [projects, ids]);

  return (
    <Layout>
      <Helmet>
        <title>Compare Vehicles | {COMPANY.name}</title>
        <meta name="description" content={`Compare up to three vehicles side by side at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Shop"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Compare" }]}
        title="Compare Vehicles"
        body="Review price, specs, and features for up to three vehicles from your saved compare list."
        image={HOME_BUILDER_IMAGES.contactHero}
        imageAlt="Vehicle comparison"
      />

      <section className="section-padding-inset bg-white">
          {vehicles.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">Add vehicles from inventory using Compare to see them here (up to 3).</p>
              <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                <Link to="/inventory">Browse inventory</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto border border-border">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--primary))] text-white">
                    <th className="text-left p-4 font-display uppercase tracking-wider text-xs">Spec</th>
                    {vehicles.map(v => (
                      <th key={v.id} className="text-left p-4 font-display font-semibold">
                        <Link to={`/inventory/${v.id}`} className="hover:text-[hsl(var(--secondary))]">
                          {v.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? "bg-[hsl(var(--muted))]/40" : "bg-white"}>
                      <td className="p-4 font-semibold text-[hsl(var(--primary))]">{row.label}</td>
                      {vehicles.map(v => (
                        <td key={v.id} className="p-4 text-foreground">
                          {row.get(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </section>
    </Layout>
  );
};

export default Compare;
