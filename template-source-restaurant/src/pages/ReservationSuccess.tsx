import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Calendar, Clock, Users } from "lucide-react";
import Layout from "@template-restaurant/components/layout/Layout";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { getReservationByCode, formatTime12 } from "@template-restaurant/lib/reservations";

const statusLabel: Record<string, string> = {
  confirmed: "Confirmed",
  pending: "Pending Approval",
  waitlist: "Waitlist",
  cancelled: "Cancelled",
};

const ReservationSuccess = () => {
  const { code } = useParams<{ code: string }>();
  const { company: COMPANY } = useSiteContent();
  const reservation = code ? getReservationByCode(code) : null;

  if (!reservation) {
    return (
      <Layout>
        <div className="container-custom container-inset py-32 text-center">
          <h1 className="font-display text-3xl mb-4">Reservation Not Found</h1>
          <p className="text-muted-foreground mb-8">Please check your confirmation code and try again.</p>
          <Link to="/reservations" className="btn-luxury-primary">Make a Reservation</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Reservation Confirmed | {COMPANY.name}</title>
      </Helmet>

      <section className="luxury-section">
        <div className="container-custom container-inset max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-[hsl(var(--secondary))] mx-auto mb-6" />
          <p className="luxury-eyebrow mb-3">Thank You</p>
          <h1 className="font-display text-4xl text-[hsl(var(--primary))] mb-2">
            {reservation.status === "confirmed" ? "You're All Set" : statusLabel[reservation.status]}
          </h1>
          <p className="text-muted-foreground mb-8">
            A confirmation has been sent to {reservation.email}
          </p>

          <div className="bg-[hsl(var(--muted))] p-8 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">Confirmation Code</span>
              <span className="font-sans-brand font-semibold tracking-widest text-lg">{reservation.confirmationCode}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[hsl(var(--secondary))]" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                  <p className="font-medium">{reservation.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[hsl(var(--secondary))]" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                  <p className="font-medium">{formatTime12(reservation.time)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-[hsl(var(--secondary))]" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Guests</p>
                  <p className="font-medium">{reservation.guests}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                <p className="font-medium">{statusLabel[reservation.status]}</p>
              </div>
            </div>
            {reservation.tableNumber && (
              <p className="text-sm text-muted-foreground pt-2">
                Table assignment: #{reservation.tableNumber}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/reservations/manage/${reservation.confirmationCode}`} className="btn-luxury-outline">
              Modify Reservation
            </Link>
            <Link to="/" className="btn-luxury-primary">Return Home</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReservationSuccess;
