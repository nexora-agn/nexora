import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@template-truck-repair/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import {
  cancelReservation,
  formatTime12,
  getReservationByCode,
  updateReservation,
} from "@template-truck-repair/lib/reservations";

const ManageReservation = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { company: COMPANY } = useSiteContent();
  const initial = code ? getReservationByCode(code) : null;

  const [reservation, setReservation] = useState(initial);
  const [lookupCode, setLookupCode] = useState(code || "");
  const [date, setDate] = useState(initial?.date || "");
  const [time, setTime] = useState(initial?.time || "");
  const [guests, setGuests] = useState(String(initial?.guests || 2));
  const [notes, setNotes] = useState(initial?.notes || "");
  const [saved, setSaved] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getReservationByCode(lookupCode);
    if (found) {
      setReservation(found);
      setDate(found.date);
      setTime(found.time);
      setGuests(String(found.guests));
      setNotes(found.notes);
      navigate(`/reservations/manage/${found.confirmationCode}`, { replace: true });
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation) return;
    const updated = updateReservation(reservation.id, {
      date,
      time,
      guests: Number(guests),
      notes,
      seating: reservation.seating,
      occasion: reservation.occasion,
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email,
    });
    if (updated) {
      setReservation(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleCancel = () => {
    if (!reservation) return;
    cancelReservation(reservation.id);
    navigate("/reservations");
  };

  if (!reservation) {
    return (
      <Layout>
        <Helmet><title>Manage Reservation | {COMPANY.name}</title></Helmet>
        <section className="luxury-section">
          <div className="container-custom container-inset max-w-md mx-auto">
            <h1 className="font-display text-3xl text-center mb-6">Find Your Reservation</h1>
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <Label>Confirmation Code</Label>
                <Input
                  value={lookupCode}
                  onChange={e => setLookupCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-character code"
                  className="rounded-none h-11 mt-1 uppercase tracking-widest"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-none h-11 bg-[hsl(var(--primary))]">
                Look Up
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              <Link to="/reservations" className="text-[hsl(var(--secondary))] underline">Make a new reservation</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  if (reservation.status === "cancelled") {
    return (
      <Layout>
        <div className="container-custom container-inset py-32 text-center">
          <h1 className="font-display text-3xl mb-4">Reservation Cancelled</h1>
          <Link to="/reservations" className="btn-luxury-primary mt-6 inline-flex">Book Again</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet><title>Manage Reservation | {COMPANY.name}</title></Helmet>
      <section className="luxury-section">
        <div className="container-custom container-inset max-w-lg mx-auto">
          <h1 className="font-display text-3xl text-center mb-2">Manage Reservation</h1>
          <p className="text-center text-muted-foreground mb-8">Code: {reservation.confirmationCode}</p>

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-800 text-sm p-4 mb-6 text-center">
              Reservation updated successfully.
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4 bg-[hsl(var(--muted))] p-6 md:p-8">
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-none h-11 mt-1" required />
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="rounded-none h-11 mt-1" required />
            </div>
            <div>
              <Label>Guests</Label>
              <Input type="number" min={1} max={12} value={guests} onChange={e => setGuests(e.target.value)} className="rounded-none h-11 mt-1" required />
            </div>
            <div>
              <Label>Special Requests</Label>
              <Input value={notes} onChange={e => setNotes(e.target.value)} className="rounded-none h-11 mt-1" />
            </div>
            <p className="text-xs text-muted-foreground">
              Guest: {reservation.name} · {formatTime12(reservation.time)} on {reservation.date}
            </p>
            <Button type="submit" className="w-full rounded-none h-11 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))]">
              Save Changes
            </Button>
          </form>

          <div className="mt-8 text-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button type="button" className="text-sm text-destructive hover:underline">
                  Cancel this reservation
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel reservation?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your table will be released.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel}>Cancel Reservation</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ManageReservation;
