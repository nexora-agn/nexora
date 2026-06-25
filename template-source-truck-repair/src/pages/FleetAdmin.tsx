import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@template-truck-repair/components/layout/Layout";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import {
  getFleetClients,
  getServiceOrders,
  updateOrderStatus,
  ORDER_STATUS_OPTIONS,
} from "@template-truck-repair/lib/fleetAdmin";
import type { RequestStatus } from "@template-truck-repair/lib/serviceRequests";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const statusColor: Record<string, string> = {
  received: "bg-slate-100 text-slate-700",
  dispatched: "bg-amber-100 text-amber-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-700",
};

const FleetAdmin = () => {
  const { company: COMPANY } = useSiteContent();
  const [tab, setTab] = useState<"orders" | "clients">("orders");
  const [orders, setOrders] = useState(() => getServiceOrders());
  const clients = getFleetClients();

  const refreshOrders = () => setOrders(getServiceOrders());

  const onStatusChange = (ticket: string, status: RequestStatus) => {
    updateOrderStatus(ticket, status);
    refreshOrders();
  };

  return (
    <Layout>
      <Helmet>
        <title>Fleet Portal | {COMPANY.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pt-28 pb-8 bg-[hsl(var(--primary))] text-white">
        <div className="container-custom container-inset">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-2">Fleet CMS</p>
          <h1 className="font-display text-3xl md:text-4xl">Fleet Operations Dashboard</h1>
          <p className="text-white/70 text-sm mt-2">Service orders, fleet clients, and repair status tracking.</p>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset">
          <div className="flex gap-2 mb-8 border-b border-border">
            {(["orders", "clients"] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 -mb-px",
                  tab === t ? "border-[hsl(var(--secondary))] text-[hsl(var(--primary))]" : "border-transparent text-muted-foreground",
                )}
              >
                {t === "orders" ? "Service Orders" : "Fleet Clients"}
              </button>
            ))}
          </div>

          {tab === "orders" && (
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead className="bg-[hsl(var(--muted))]">
                  <tr>
                    <th className="text-left p-3 font-semibold uppercase text-xs tracking-wider">Ticket</th>
                    <th className="text-left p-3 font-semibold uppercase text-xs tracking-wider">Priority</th>
                    <th className="text-left p-3 font-semibold uppercase text-xs tracking-wider">Vehicle</th>
                    <th className="text-left p-3 font-semibold uppercase text-xs tracking-wider">Company</th>
                    <th className="text-left p-3 font-semibold uppercase text-xs tracking-wider">Status</th>
                    <th className="text-left p-3 font-semibold uppercase text-xs tracking-wider">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No service orders yet. Submit a request from the homepage.</td></tr>
                  ) : orders.map(o => (
                    <tr key={o.id} className="border-t border-border">
                      <td className="p-3 font-mono text-xs">{o.ticketNumber}</td>
                      <td className="p-3">{o.priority}</td>
                      <td className="p-3">{o.vehicleType || "—"}</td>
                      <td className="p-3">{o.companyName || o.name}</td>
                      <td className="p-3">
                        <Select value={o.status} onValueChange={v => onStatusChange(o.ticketNumber, v as RequestStatus)}>
                          <SelectTrigger className={cn("h-8 w-36 text-xs rounded-none", statusColor[o.status])}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUS_OPTIONS.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">{o.etaMinutes} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "clients" && (
            <div className="grid md:grid-cols-2 gap-6">
              {clients.map(c => (
                <article key={c.id} className="card-industrial p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-display text-lg text-[hsl(var(--primary))]">{c.companyName}</h2>
                      <p className="text-sm text-muted-foreground">{c.contactName}</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider bg-[hsl(var(--muted))] px-2 py-1">{c.contractType}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{c.phone} · {c.email}</p>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--secondary))] mb-2">Vehicles ({c.vehicles.length})</h3>
                  <ul className="space-y-1">
                    {c.vehicles.map(v => (
                      <li key={v.id} className="text-sm flex justify-between border-b border-border py-1">
                        <span>{v.unitNumber}</span>
                        <span className="text-muted-foreground">{v.type}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FleetAdmin;
