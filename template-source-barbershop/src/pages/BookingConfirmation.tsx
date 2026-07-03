import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format, parseISO } from "date-fns";
import { CheckCircle2, CalendarDays, Clock, User, Scissors, Phone, Mail } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { getBookingByCode, formatTime12 } from "@template-barbershop/lib/bookings";
import { COMPANY } from "@template-barbershop/data/siteData";

const statusCopy: Record<string, { label: string; tone: string }> = {
  confirmed: { label: "Confirmed", tone: "text-green-600 bg-green-50 border-green-200" },
  pending: { label: "Pending Confirmation", tone: "text-amber-600 bg-amber-50 border-amber-200" },
  waitlist: { label: "Waitlisted", tone: "text-amber-600 bg-amber-50 border-amber-200" },
  cancelled: { label: "Cancelled", tone: "text-red-600 bg-red-50 border-red-200" },
};

const BookingConfirmation = () => {
  const { code } = useParams<{ code: string }>();
  const booking = code ? getBookingByCode(code) : null;

  if (!booking) return <Navigate to="/booking" replace />;

  const status = statusCopy[booking.status] ?? statusCopy.confirmed;

  return (
    <Layout>
      <Helmet>
        <title>Booking Confirmed | {COMPANY.name}</title>
      </Helmet>

      <section className="min-h-[80vh] flex items-center bg-[hsl(var(--muted))] pt-28 pb-20">
        <div className="container-custom container-inset max-w-2xl mx-auto">
          <Reveal direction="zoom">
            <div className="bg-white border border-border p-8 sm:p-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-[hsl(var(--secondary))] mx-auto mb-6" />
              <p className="luxury-eyebrow mb-3">
                {booking.status === "waitlist" ? "You're on the Waitlist" : "Appointment Requested"}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl uppercase text-foreground mb-4">Thank You, {booking.name.split(" ")[0]}!</h1>
              <span className={`inline-block text-xs font-bold uppercase tracking-wide px-3 py-1.5 border ${status.tone}`}>
                {status.label}
              </span>

              <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3 border border-border p-4">
                  <CalendarDays className="h-5 w-5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                    <p className="text-sm font-semibold">{format(parseISO(booking.date), "EEEE, MMMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border border-border p-4">
                  <Clock className="h-5 w-5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Time</p>
                    <p className="text-sm font-semibold">{formatTime12(booking.time)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border border-border p-4">
                  <User className="h-5 w-5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Barber</p>
                    <p className="text-sm font-semibold">{booking.barberName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border border-border p-4">
                  <Scissors className="h-5 w-5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Services</p>
                    <p className="text-sm font-semibold">{booking.serviceNames.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border border-dashed border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Confirmation Code</p>
                <p className="font-display text-2xl tracking-[0.3em] text-[hsl(var(--primary))]">{booking.confirmationCode}</p>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                A confirmation has been sent to <span className="font-semibold text-foreground">{booking.email}</span>. We'll also send a reminder before your visit.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={`/booking/manage/${booking.confirmationCode}`} className="btn-luxury-outline">
                  Manage This Booking
                </Link>
                <Link to="/" className="btn-luxury-primary">
                  Back to Home
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <Phone className="h-3.5 w-3.5" /> {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <Mail className="h-3.5 w-3.5" /> {COMPANY.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default BookingConfirmation;
