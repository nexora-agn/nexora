import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format, parseISO } from "date-fns";
import { Search, CalendarDays, Clock, User, XCircle, RefreshCcw } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { Calendar } from "@/components/ui/calendar";
import {
  Booking,
  cancelBooking,
  formatTime12,
  generateTimeSlots,
  getBookingByCode,
  isSlotAvailable,
  updateBooking,
} from "@template-barbershop/lib/bookings";
import { COMPANY } from "@template-barbershop/data/siteData";

const ManageBooking = () => {
  const { code: codeParam } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState(codeParam || "");
  const [booking, setBooking] = useState<Booking | null>(codeParam ? getBookingByCode(codeParam) : null);
  const [notFound, setNotFound] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState("");
  const [message, setMessage] = useState("");

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getBookingByCode(codeInput.trim());
    setBooking(found);
    setNotFound(!found);
    if (found) navigate(`/booking/manage/${found.confirmationCode}`, { replace: true });
  };

  const handleCancel = () => {
    if (!booking) return;
    if (!window.confirm("Cancel this appointment? This cannot be undone.")) return;
    const updated = cancelBooking(booking.id);
    if (updated) {
      setBooking(updated);
      setMessage("Your appointment has been cancelled.");
    }
  };

  const startReschedule = () => {
    setRescheduling(true);
    setNewDate(booking?.date ? parseISO(booking.date) : undefined);
    setNewTime("");
  };

  const confirmReschedule = () => {
    if (!booking || !newDate || !newTime) return;
    const dateStr = format(newDate, "yyyy-MM-dd");
    const updated = updateBooking(booking.id, { date: dateStr, time: newTime });
    if (updated) {
      setBooking(updated);
      setRescheduling(false);
      setMessage("Your appointment has been rescheduled.");
    }
  };

  const slots = newDate ? generateTimeSlots(format(newDate, "yyyy-MM-dd")) : [];

  return (
    <Layout>
      <Helmet>
        <title>Manage Booking | {COMPANY.name}</title>
      </Helmet>

      <section className="min-h-[75vh] bg-[hsl(var(--muted))] pt-32 pb-20">
        <div className="container-custom container-inset max-w-xl mx-auto">
          <Reveal direction="up" className="text-center mb-10">
            <p className="luxury-eyebrow mb-4">Manage Your Booking</p>
            <h1 className="luxury-heading !text-4xl">Reschedule or Cancel</h1>
          </Reveal>

          {!booking && (
            <Reveal direction="up" delay={100}>
              <form onSubmit={lookup} className="bg-white border border-border p-6 flex gap-3">
                <input
                  value={codeInput}
                  onChange={e => setCodeInput(e.target.value.toUpperCase())}
                  placeholder="Enter confirmation code"
                  className="h-12 flex-1 border border-border px-4 text-sm uppercase tracking-widest focus:outline-none focus:border-[hsl(var(--secondary))]"
                />
                <button type="submit" className="h-12 px-5 bg-[hsl(var(--primary))] text-white flex items-center justify-center hover:bg-[hsl(var(--secondary))] transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </form>
              {notFound && <p className="mt-4 text-sm text-destructive text-center">No booking found for that code.</p>}
            </Reveal>
          )}

          {booking && (
            <Reveal direction="up" delay={100}>
              <div className="bg-white border border-border p-6 sm:p-8">
                {message && <p className="mb-5 text-sm text-[hsl(var(--secondary))] font-semibold">{message}</p>}

                <div className="flex items-center justify-between mb-6">
                  <p className="font-display text-lg uppercase">Booking {booking.confirmationCode}</p>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 border ${
                      booking.status === "cancelled" ? "text-red-600 border-red-200 bg-red-50" : "text-green-600 border-green-200 bg-green-50"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2.5"><CalendarDays className="h-4 w-4 text-[hsl(var(--secondary))]" /> {format(parseISO(booking.date), "EEEE, MMMM d, yyyy")}</p>
                  <p className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-[hsl(var(--secondary))]" /> {formatTime12(booking.time)}</p>
                  <p className="flex items-center gap-2.5"><User className="h-4 w-4 text-[hsl(var(--secondary))]" /> {booking.barberName}</p>
                  <p className="text-muted-foreground">{booking.serviceNames.join(", ")}</p>
                </div>

                {booking.status !== "cancelled" && !rescheduling && (
                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={startReschedule} className="btn-luxury-outline flex-1 !h-11">
                      <RefreshCcw className="h-4 w-4 mr-2" /> Reschedule
                    </button>
                    <button type="button" onClick={handleCancel} className="flex-1 h-11 inline-flex items-center justify-center gap-2 border border-destructive text-destructive text-xs font-bold uppercase tracking-wide hover:bg-destructive hover:text-white transition-colors">
                      <XCircle className="h-4 w-4" /> Cancel Appointment
                    </button>
                  </div>
                )}

                {rescheduling && (
                  <div className="mt-7 border-t border-border pt-6">
                    <p className="font-display text-base uppercase mb-4">Pick a New Date & Time</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Calendar
                        mode="single"
                        selected={newDate}
                        onSelect={d => { setNewDate(d); setNewTime(""); }}
                        disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="border border-border p-2"
                      />
                      <div className="grid grid-cols-3 gap-2 content-start max-h-[260px] overflow-y-auto pr-1">
                        {slots.map(slot => {
                          const available = isSlotAvailable(format(newDate!, "yyyy-MM-dd"), slot, booking.barberId);
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!available}
                              onClick={() => setNewTime(slot)}
                              className={`py-2.5 text-xs font-semibold border transition-colors ${
                                !available ? "opacity-30 cursor-not-allowed line-through" : newTime === slot ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border hover:border-[hsl(var(--primary))]/40"
                              }`}
                            >
                              {formatTime12(slot)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <button type="button" onClick={() => setRescheduling(false)} className="flex-1 h-11 border border-border text-xs font-bold uppercase tracking-wide">Cancel</button>
                      <button type="button" onClick={confirmReschedule} disabled={!newDate || !newTime} className="flex-1 btn-luxury-primary !h-11 disabled:opacity-40">Confirm New Time</button>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need help? <Link to="/contact" className="text-[hsl(var(--secondary))] font-semibold">Contact us</Link> or call {COMPANY.phone}.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ManageBooking;
