import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RESERVATION_SETTINGS } from "@template-restaurant/data/siteData";
import {
  createReservation,
  formatTime12,
  generateTimeSlots,
  isSlotAvailable,
  type SeatingPreference,
} from "@template-restaurant/lib/reservations";
import { cn } from "@/lib/utils";

interface ReservationFormProps {
  compact?: boolean;
  className?: string;
}

const OCCASIONS = [
  "None",
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Date Night",
  "Celebration",
  "Other",
];

const ReservationForm = ({ compact, className }: ReservationFormProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [seating, setSeating] = useState<SeatingPreference>("no-preference");
  const [occasion, setOccasion] = useState("None");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !phone || !email) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 600));
    const reservation = createReservation({
      date,
      time,
      guests: Number(guests),
      seating,
      occasion: occasion === "None" ? "" : occasion,
      name,
      phone,
      email,
      notes,
    });
    setSubmitting(false);
    navigate(`/reservations/confirmation/${reservation.confirmationCode}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white border border-border shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)] p-6 md:p-8",
        className,
      )}
    >
      {!compact && (
        <div className="mb-8 text-center">
          <p className="luxury-eyebrow mb-2">Reservations</p>
          <h2 className="font-display text-3xl md:text-4xl text-[hsl(var(--primary))]">
            Reserve Your Table
          </h2>
        </div>
      )}

      <div className={cn("grid gap-4", compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2")}>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" /> Date
          </Label>
          <Input
            type="date"
            min={minDate}
            value={date}
            onChange={e => { setDate(e.target.value); setTime(""); }}
            required
            className="rounded-none h-11"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" /> Time
          </Label>
          <Select value={time} onValueChange={setTime} disabled={!date}>
            <SelectTrigger className="rounded-none h-11">
              <SelectValue placeholder={date ? "Select time" : "Select date first"} />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map(slot => {
                const available = isSlotAvailable(date, slot, Number(guests));
                return (
                  <SelectItem key={slot} value={slot} disabled={!available}>
                    {formatTime12(slot)}{!available ? " — Full" : ""}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Users className="h-3.5 w-3.5" /> Guests
          </Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="rounded-none h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: RESERVATION_SETTINGS.maxGuests }, (_, i) => i + 1).map(n => (
                <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Utensils className="h-3.5 w-3.5" /> Seating
          </Label>
          <Select value={seating} onValueChange={v => setSeating(v as SeatingPreference)}>
            <SelectTrigger className="rounded-none h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-preference">No Preference</SelectItem>
              <SelectItem value="indoor">Indoor</SelectItem>
              <SelectItem value="outdoor">Outdoor / Terrace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Special Occasion</Label>
          <Select value={occasion} onValueChange={setOccasion}>
            <SelectTrigger className="rounded-none h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OCCASIONS.map(o => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} required className="rounded-none h-11" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</Label>
          <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="rounded-none h-11" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-none h-11" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Special Requests</Label>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Dietary restrictions, accessibility needs, seating preferences..."
            className="rounded-none min-h-[88px]"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitting || !date || !time}
        className="w-full mt-6 rounded-none h-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white uppercase text-xs tracking-[0.18em]"
      >
        {submitting ? "Reserving..." : "Reserve Table"}
      </Button>
    </form>
  );
};

export default ReservationForm;
