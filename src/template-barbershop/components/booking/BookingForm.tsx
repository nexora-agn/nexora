import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Check, ChevronLeft, ChevronRight, Scissors, User, CalendarDays, Clock, Star } from "lucide-react";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { createBooking, formatTime12, generateTimeSlots, isSlotAvailable } from "@template-barbershop/lib/bookings";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  variant?: "full" | "compact";
  presetServiceId?: string;
  presetBarberId?: string;
}

const STEPS = ["Service", "Barber", "Date & Time", "Your Details"] as const;

const BookingForm = ({ variant = "full", presetServiceId, presetBarberId }: BookingFormProps) => {
  const { services, team } = useSiteContent();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [serviceIds, setServiceIds] = useState<string[]>(presetServiceId ? [presetServiceId] : []);
  const [barberId, setBarberId] = useState<string>(presetBarberId || "any");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loyaltyMember, setLoyaltyMember] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const dateStr = date ? format(date, "yyyy-MM-dd") : "";
  const slots = useMemo(() => (dateStr ? generateTimeSlots(dateStr) : []), [dateStr]);

  const selectedServices = services.filter(s => serviceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalMinutes = selectedServices.reduce((sum, s) => sum + (parseInt(s.duration, 10) || 0), 0);
  const totalDuration = totalMinutes ? `${totalMinutes} min` : "";
  const selectedBarber = team.find(b => b.id === barberId);

  const toggleService = (id: string) => {
    setServiceIds(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));
  };

  const canProceed = [
    serviceIds.length > 0,
    Boolean(barberId),
    Boolean(date && time),
    Boolean(name && phone && email),
  ];

  const goNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setError("");
    if (!date || !time) {
      setError("Please choose a date and time.");
      return;
    }
    if (!isSlotAvailable(dateStr, time, barberId)) {
      setError("That slot was just booked — please pick another time.");
      return;
    }
    setSubmitting(true);
    try {
      const booking = createBooking({
        date: dateStr,
        time,
        barberId,
        barberName: selectedBarber ? selectedBarber.name : "Any Available Barber",
        serviceIds,
        serviceNames: selectedServices.map(s => s.title),
        totalDuration: totalDuration || "30 min",
        totalPrice,
        loyaltyMember,
        firstVisit,
        name,
        phone,
        email,
        notes,
      });
      navigate(`/booking/confirmation/${booking.confirmationCode}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn("bg-white border border-border", variant === "full" ? "shadow-2xl" : "")}>
      <div className="grid grid-cols-4 border-b border-border">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < step && setStep(i)}
            className={cn(
              "relative py-4 text-center text-[10px] sm:text-xs font-sans-brand font-semibold uppercase tracking-[0.12em] transition-colors",
              i === step ? "text-[hsl(var(--primary))]" : i < step ? "text-[hsl(var(--secondary))]" : "text-muted-foreground",
            )}
          >
            <span className="hidden sm:inline">{i + 1}. {label}</span>
            <span className="sm:hidden">{i + 1}</span>
            <span
              className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 transition-colors",
                i <= step ? "bg-[hsl(var(--secondary))]" : "bg-transparent",
              )}
            />
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8 min-h-[380px]">
        {step === 0 && (
          <div>
            <h3 className="font-display text-xl uppercase mb-1 flex items-center gap-2">
              <Scissors className="h-5 w-5 text-[hsl(var(--secondary))]" /> Select Your Service(s)
            </h3>
            <p className="text-sm text-muted-foreground mb-5">Choose one or more services for your visit.</p>
            <div className="grid sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
              {services.map(s => {
                const active = serviceIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.id)}
                    className={cn(
                      "flex items-center justify-between gap-3 border p-3.5 text-left transition-colors",
                      active ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5" : "border-border hover:border-[hsl(var(--primary))]/30",
                    )}
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.duration} · {s.priceLabel}</p>
                    </div>
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center border",
                        active ? "bg-[hsl(var(--secondary))] border-[hsl(var(--secondary))] text-white" : "border-border",
                      )}
                    >
                      {active && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="font-display text-xl uppercase mb-1 flex items-center gap-2">
              <User className="h-5 w-5 text-[hsl(var(--secondary))]" /> Choose Your Barber
            </h3>
            <p className="text-sm text-muted-foreground mb-5">Pick a specific barber or let us match you with the best fit.</p>
            <div className="grid sm:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => setBarberId("any")}
                className={cn(
                  "flex flex-col items-center gap-2 border p-4 text-center transition-colors",
                  barberId === "any" ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5" : "border-border hover:border-[hsl(var(--primary))]/30",
                )}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--primary))]/5">
                  <User className="h-7 w-7 text-[hsl(var(--primary))]/50" />
                </div>
                <p className="text-sm font-semibold">Any Available</p>
                <p className="text-[11px] text-muted-foreground">First open slot</p>
              </button>
              {team.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBarberId(b.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 border p-4 text-center transition-colors",
                    barberId === b.id ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5" : "border-border hover:border-[hsl(var(--primary))]/30",
                  )}
                >
                  <img src={b.image} alt={b.name} className="h-16 w-16 rounded-full object-cover" />
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" /> {b.rating}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-xl uppercase mb-1 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[hsl(var(--secondary))]" /> Pick a Date
              </h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={d => {
                  setDate(d);
                  setTime("");
                }}
                disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="border border-border p-2 mt-3"
              />
            </div>
            <div>
              <h3 className="font-display text-xl uppercase mb-1 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[hsl(var(--secondary))]" /> Pick a Time
              </h3>
              {!date && <p className="text-sm text-muted-foreground mt-3">Select a date first.</p>}
              {date && slots.length === 0 && (
                <p className="text-sm text-muted-foreground mt-3">We're closed that day — please pick another date.</p>
              )}
              {date && slots.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3 max-h-[260px] overflow-y-auto pr-1">
                  {slots.map(slot => {
                    const available = isSlotAvailable(dateStr, slot, barberId);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!available}
                        onClick={() => setTime(slot)}
                        className={cn(
                          "py-2.5 text-xs font-semibold border transition-colors",
                          !available && "opacity-30 cursor-not-allowed line-through",
                          time === slot ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border hover:border-[hsl(var(--primary))]/40",
                        )}
                      >
                        {formatTime12(slot)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-display text-xl uppercase mb-1">Your Details</h3>
            <p className="text-sm text-muted-foreground mb-5">We'll send a confirmation and reminder before your visit.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Full Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1.5 h-11 w-full border border-border px-3 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone</label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="mt-1.5 h-11 w-full border border-border px-3 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                  placeholder="(212) 555-0100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1.5 h-11 w-full border border-border px-3 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                  placeholder="john@email.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notes (optional)</label>
                <Textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="mt-1.5 resize-none rounded-none border-border focus-visible:ring-0 focus-visible:border-[hsl(var(--secondary))]"
                  placeholder="Anything your barber should know?"
                  rows={3}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={loyaltyMember} onChange={e => setLoyaltyMember(e.target.checked)} className="h-4 w-4" />
                I'm a loyalty member
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={firstVisit} onChange={e => setFirstVisit(e.target.checked)} className="h-4 w-4" />
                This is my first visit
              </label>
            </div>

            {(serviceIds.length > 0 || date) && (
              <div className="mt-6 border border-border bg-muted/40 p-4 text-sm space-y-1">
                <p className="font-semibold uppercase text-xs tracking-wide text-muted-foreground mb-1">Booking Summary</p>
                <p>{selectedServices.map(s => s.title).join(", ") || "No service selected"}</p>
                <p>{selectedBarber ? selectedBarber.name : "Any Available Barber"}</p>
                <p>{date ? format(date, "EEEE, MMMM d, yyyy") : ""} {time && `at ${formatTime12(time)}`}</p>
                <p className="font-semibold text-[hsl(var(--primary))]">{totalDuration} · ${totalPrice}</p>
              </div>
            )}
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border p-5">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed[step]}
            className="btn-luxury-primary disabled:opacity-40 disabled:pointer-events-none"
          >
            Continue <ChevronRight className="h-4 w-4 ml-1.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed[3] || submitting}
            className="btn-luxury-primary disabled:opacity-40 disabled:pointer-events-none"
          >
            {submitting ? "Booking..." : "Confirm Appointment"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
