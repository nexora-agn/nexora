import { BOOKING_SETTINGS } from "@template-barbershop/data/siteData";

export type BookingStatus = "confirmed" | "pending" | "waitlist" | "cancelled";

export interface Booking {
  id: string;
  confirmationCode: string;
  date: string;
  time: string;
  barberId: string;
  barberName: string;
  serviceIds: string[];
  serviceNames: string[];
  totalDuration: string;
  totalPrice: number;
  loyaltyMember: boolean;
  firstVisit: boolean;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BookingInput {
  date: string;
  time: string;
  barberId: string;
  barberName: string;
  serviceIds: string[];
  serviceNames: string[];
  totalDuration: string;
  totalPrice: number;
  loyaltyMember: boolean;
  firstVisit: boolean;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const STORAGE_KEY = "nexora-forge-barbershop-bookings";

function loadAll(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function saveAll(list: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateId(): string {
  return `bkg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function generateTimeSlots(date?: string): string[] {
  const { openTime, closeTime, slotInterval, closedDays } = BOOKING_SETTINGS;
  if (date) {
    const day = new Date(`${date}T12:00:00`).getDay();
    if (closedDays.includes(day)) return [];
  }
  const slots: string[] = [];
  let current = parseTimeToMinutes(openTime);
  const end = parseTimeToMinutes(closeTime) - 30;
  while (current <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    current += slotInterval;
  }
  return slots;
}

export function getBookedCount(date: string, time: string, barberId: string): number {
  return loadAll().filter(
    b => b.date === date && b.time === time && b.barberId === barberId && b.status !== "cancelled",
  ).length;
}

export function isSlotAvailable(date: string, time: string, barberId: string): boolean {
  if (barberId === "any") return true;
  const booked = getBookedCount(date, time, barberId);
  return booked < 1;
}

export function createBooking(input: BookingInput): Booking {
  const now = new Date().toISOString();
  const available = isSlotAvailable(input.date, input.time, input.barberId);
  const status: BookingStatus = available
    ? BOOKING_SETTINGS.requireApproval
      ? "pending"
      : "confirmed"
    : BOOKING_SETTINGS.waitlistEnabled
      ? "waitlist"
      : "pending";

  const booking: Booking = {
    id: generateId(),
    confirmationCode: generateCode(),
    ...input,
    status,
    createdAt: now,
    updatedAt: now,
  };

  const all = loadAll();
  all.push(booking);
  saveAll(all);
  return booking;
}

export function getBookingByCode(code: string): Booking | null {
  return loadAll().find(b => b.confirmationCode.toUpperCase() === code.toUpperCase()) ?? null;
}

export function getBookingById(id: string): Booking | null {
  return loadAll().find(b => b.id === id) ?? null;
}

export function updateBooking(id: string, patch: Partial<BookingInput>): Booking | null {
  const all = loadAll();
  const idx = all.findIndex(b => b.id === id);
  if (idx === -1) return null;
  const updated: Booking = {
    ...all[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  if (patch.date || patch.time || patch.barberId) {
    const available = isSlotAvailable(updated.date, updated.time, updated.barberId);
    if (!available && updated.status === "confirmed") {
      updated.status = BOOKING_SETTINGS.waitlistEnabled ? "waitlist" : "pending";
    }
  }
  all[idx] = updated;
  saveAll(all);
  return updated;
}

export function cancelBooking(id: string): Booking | null {
  const all = loadAll();
  const idx = all.findIndex(b => b.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], status: "cancelled", updatedAt: new Date().toISOString() };
  saveAll(all);
  return all[idx];
}

export function getAllBookings(): Booking[] {
  return loadAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getBookingsForDate(date: string): Booking[] {
  return loadAll().filter(b => b.date === date && b.status !== "cancelled");
}

/** SMS-ready payload shape for future reminder / notification integrations. */
export function buildSmsPayload(booking: Booking) {
  return {
    to: booking.phone,
    body: `Your appointment at FORGE BARBER CO. is ${booking.status} for ${booking.date} at ${formatTime12(booking.time)} with ${booking.barberName}. Code: ${booking.confirmationCode}`,
  };
}

export function buildEmailConfirmation(booking: Booking) {
  return {
    to: booking.email,
    subject: `Your Forge Barber Co. appointment — ${booking.confirmationCode}`,
    body: `Hi ${booking.name}, your appointment is confirmed for ${booking.date} at ${formatTime12(booking.time)} with ${booking.barberName}. Services: ${booking.serviceNames.join(", ")}. Manage or reschedule anytime at /booking/manage/${booking.confirmationCode}.`,
  };
}
