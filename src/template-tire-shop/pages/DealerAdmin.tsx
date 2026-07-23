import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import Layout from "@template-tire-shop/components/layout/Layout";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import {
  getLeads,
  updateLeadStatus,
  type DealerLead,
  type LeadStatus,
} from "@template-tire-shop/lib/dealerLeads";
import type { VehicleListing } from "@template-tire-shop/data/inventory";
import { cn } from "@/lib/utils";

const TABS = ["inventory", "leads", "cms"] as const;

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "appointment", "negotiation", "sold", "lost"];

const DealerAdmin = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const [tab, setTab] = useState<(typeof TABS)[number]>("inventory");
  const [leads, setLeads] = useState<DealerLead[]>(() => getLeads());

  const stats = useMemo(() => {
    const list = projects as unknown as VehicleListing[];
    return {
      total: list.length,
      new: list.filter(v => v.listingType === "new").length,
      used: list.filter(v => v.listingType === "used").length,
      cpo: list.filter(v => v.listingType === "cpo").length,
    };
  }, [projects]);

  const refreshLeads = () => setLeads(getLeads());

  const onStatus = (id: string, status: LeadStatus) => {
    updateLeadStatus(id, status);
    refreshLeads();
  };

  return (
    <Layout>
      <Helmet>
        <title>Dealer Admin | {COMPANY.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="dealer-header-offset pb-10 sm:pb-12 bg-[hsl(var(--primary))] text-white">
        <div className="container-custom container-inset">
          <h1 className="font-display text-3xl font-semibold">Dealer admin</h1>
          <p className="text-white/70 mt-2 text-sm">Demo portal — inventory, leads, and CMS placeholder.</p>
        </div>
      </section>

      <section className="section-padding-inset">
        <div className="flex gap-2 mb-8 border-b border-border pb-4">
          {TABS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-wider",
                tab === t ? "bg-[hsl(var(--primary))] text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "inventory" && (
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { label: "In stock", value: stats.total },
              { label: "New", value: stats.new },
              { label: "Used", value: stats.used },
              { label: "CPO", value: stats.cpo },
            ].map(s => (
              <StatCard key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}

        {tab === "leads" && (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-[hsl(var(--muted))]">
                <tr>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted-foreground">
                      No leads yet. Submit forms on the site to populate this list.
                    </td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-t border-border">
                      <td className="p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 capitalize">{lead.type}</td>
                      <td className="p-3">
                        {lead.name}
                        <br />
                        <span className="text-muted-foreground text-xs">{lead.email}</span>
                      </td>
                      <td className="p-3">
                        <select
                          value={lead.status}
                          onChange={e => onStatus(lead.id, e.target.value as LeadStatus)}
                          className="border border-border px-2 py-1 text-xs"
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "cms" && (
          <div className="max-w-xl text-muted-foreground space-y-2 border border-dashed border-border p-8">
            <p className="font-display text-lg text-[hsl(var(--primary))]">CMS placeholder</p>
            <p>Connect Nexora editor drafts to manage hero copy, inventory highlights, and offers from the admin dashboard.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border p-6 text-center">
      <p className="font-display text-3xl text-[hsl(var(--secondary))]">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default DealerAdmin;
