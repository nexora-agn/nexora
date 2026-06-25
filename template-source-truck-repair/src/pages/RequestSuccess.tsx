import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Clock, Truck, MapPin } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { getRequestByTicket } from "@template-truck-repair/lib/serviceRequests";

const statusLabel: Record<string, string> = {
  received: "Request Received",
  dispatched: "Technician Dispatched",
  "in-progress": "Repair In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const RequestSuccess = () => {
  const { ticket } = useParams<{ ticket: string }>();
  const { company: COMPANY } = useSiteContent();
  const request = ticket ? getRequestByTicket(ticket) : null;

  if (!request) {
    return (
      <Layout>
        <div className="container-custom container-inset py-32 text-center">
          <h1 className="font-display text-3xl mb-4">Request Not Found</h1>
          <p className="text-muted-foreground mb-8">Please check your ticket number and try again.</p>
          <Link to="/request-service" className="btn-industrial-primary">New Request</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Service Request Confirmed | {COMPANY.name}</title>
      </Helmet>

      <section className="industrial-section">
        <div className="container-custom container-inset max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-[hsl(var(--secondary))] mx-auto mb-6" />
          <p className="industrial-eyebrow mb-3">Dispatch Confirmed</p>
          <h1 className="font-display text-4xl text-[hsl(var(--primary))] mb-2">{statusLabel[request.status]}</h1>
          <p className="text-muted-foreground mb-8">Ticket <strong>{request.ticketNumber}</strong> — we&apos;ll contact you at {request.phone}</p>

          <div className="bg-[hsl(var(--muted))] p-8 text-left space-y-4 mb-8 border border-border">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[hsl(var(--secondary))]" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Est. Response</p>
                  <p className="font-medium">~{request.etaMinutes} minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-[hsl(var(--secondary))]" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Vehicle</p>
                  <p className="font-medium">{request.vehicleType || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[hsl(var(--secondary))]" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Priority</p>
                  <p className="font-medium">{request.priority}</p>
                </div>
              </div>
              {request.technician && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Assigned</p>
                  <p className="font-medium">{request.technician}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/emergency-repair" className="btn-industrial-outline">Emergency Support</Link>
            <Link to="/" className="btn-industrial-primary">Return Home</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RequestSuccess;
