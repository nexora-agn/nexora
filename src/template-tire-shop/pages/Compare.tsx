import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { getCompareList } from "@template-tire-shop/lib/propertyCompare";
import { formatCurrency } from "@template-tire-shop/lib/mortgageCalculator";
import type { PhoneProduct } from "@template-tire-shop/data/products";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import { Button } from "@/components/ui/button";

const ROWS: { key: string; label: string; get: (p: PhoneProduct) => string }[] = [
  { key: "price", label: "Price", get: p => formatCurrency(p.price) },
  { key: "display", label: "Display", get: p => p.screen },
  { key: "processor", label: "Processor", get: p => p.processor },
  { key: "ram", label: "RAM", get: p => p.ram },
  { key: "storage", label: "Storage", get: p => p.storage },
  { key: "camera", label: "Camera", get: p => p.camera },
  { key: "battery", label: "Battery", get: p => p.battery },
  { key: "5g", label: "5G", get: p => (p.connectivity.toLowerCase().includes("5g") ? "Yes" : "No") },
];

const Compare = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getCompareList());
    const t = setInterval(() => setIds(getCompareList()), 800);
    return () => clearInterval(t);
  }, []);

  const phones = useMemo(() => {
    const map = new Map((projects as PhoneProduct[]).map(p => [p.id, p]));
    return ids.map(id => map.get(id)).filter(Boolean) as PhoneProduct[];
  }, [projects, ids]);

  return (
    <Layout>
      <Helmet>
        <title>Compare Phones | {COMPANY.name}</title>
        <meta name="description" content={`Compare up to three devices side by side at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Shop"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Compare" }]}
        title="Compare Devices"
        body="Review display, performance, camera, battery, and 5G support for up to three saved devices."
        image={HOME_BUILDER_IMAGES.contactHero}
        imageAlt="Phone comparison"
      />

      <section className="section-padding-inset bg-white">
        {phones.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">Add devices from the shop using Compare (up to 3).</p>
            <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
              <Link to="/shop">Browse shop</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-[hsl(var(--primary))] text-white">
                  <th className="text-left p-4 font-display uppercase tracking-wider text-xs">Spec</th>
                  {phones.map(p => (
                    <th key={p.id} className="text-left p-4 font-sans-brand font-semibold">
                      <Link to={`/shop/${p.id}`} className="hover:text-[hsl(var(--secondary))]">
                        {p.title}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? "bg-[hsl(var(--muted))]/40" : "bg-white"}>
                    <td className="p-4 font-semibold text-[hsl(var(--primary))]">{row.label}</td>
                    {phones.map(p => (
                      <td key={p.id} className="p-4 text-foreground">
                        {row.get(p)}
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
