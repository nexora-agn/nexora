import { RESERVATION_SETTINGS } from "@template-restaurant/data/siteData";

export type ReservationStatus = "confirmed" | "pending" | "waitlist" | "cancelled";
export type SeatingPreference = "indoor" | "outdoor" | "no-preference";

export interface Reservation {
  id: string;
  confirmationCode: string;
  date: string;
  time: string;
  guests: number;
  seating: SeatingPreference;
  occasion: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status: ReservationStatus;
  tableNumber?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationInput {
  date: string;
  time: string;
  guests: number;
  seating: SeatingPreference;
  occasion: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const STORAGE_KEY = "nexora-restaurant-reservations";

function loadAll(): Reservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Reservation[]) : [];
  } catch {
    return [];
  }
}

function saveAll(list: Reservation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateId(): string {
  return `res-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
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
  const { openTime, closeTime, slotInterval, closedDays } = RESERVATION_SETTINGS;
  if (date) {
    const day = new Date(`${date}T12:00:00`).getDay();
    if (closedDays.includes(day)) return [];
  }
  const slots: string[] = [];
  let current = parseTimeToMinutes(openTime);
  const end = parseTimeToMinutes(closeTime) - 60;
  while (current <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    current += slotInterval;
  }
  return slots;
}

export function getBookedCount(date: string, time: string): number {
  return loadAll().filter(
    r => r.date === date && r.time === time && r.status !== "cancelled",
  ).length;
}

export function isSlotAvailable(date: string, time: string, guests: number): boolean {
  const booked = getBookedCount(date, time);
  const capacity = RESERVATION_SETTINGS.tablesPerSlot ?? 4;
  return booked < capacity && guests <= RESERVATION_SETTINGS.maxGuests;
}

export function createReservation(input: ReservationInput): Reservation {
  const now = new Date().toISOString();
  const available = isSlotAvailable(input.date, input.time, input.guests);
  const status: ReservationStatus = available
    ? RESERVATION_SETTINGS.requireApproval
      ? "pending"
      : "confirmed"
    : RESERVATION_SETTINGS.waitlistEnabled
      ? "waitlist"
      : "pending";

  const reservation: Reservation = {
    id: generateId(),
    confirmationCode: generateCode(),
    ...input,
    status,
    tableNumber: status === "confirmed" ? Math.floor(Math.random() * 20) + 1 : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const all = loadAll();
  all.push(reservation);
  saveAll(all);
  return reservation;
}

export function getReservationByCode(code: string): Reservation | null {
  return loadAll().find(r => r.confirmationCode.toUpperCase() === code.toUpperCase()) ?? null;
}

export function getReservationById(id: string): Reservation | null {
  return loadAll().find(r => r.id === id) ?? null;
}

export function updateReservation(id: string, patch: Partial<ReservationInput>): Reservation | null {
  const all = loadAll();
  const idx = all.findIndex(r => r.id === id);
  if (idx === -1) return null;
  const updated: Reservation = {
    ...all[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  if (patch.date || patch.time || patch.guests) {
    const available = isSlotAvailable(updated.date, updated.time, updated.guests);
    if (!available && updated.status === "confirmed") {
      updated.status = RESERVATION_SETTINGS.waitlistEnabled ? "waitlist" : "pending";
    }
  }
  all[idx] = updated;
  saveAll(all);
  return updated;
}

export function cancelReservation(id: string): Reservation | null {
  const all = loadAll();
  const idx = all.findIndex(r => r.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], status: "cancelled", updatedAt: new Date().toISOString() };
  saveAll(all);
  return all[idx];
}

export function getAllReservations(): Reservation[] {
  return loadAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getReservationsForDate(date: string): Reservation[] {
  return loadAll().filter(r => r.date === date && r.status !== "cancelled");
}

/** SMS-ready payload shape for future integrations */
export function buildSmsPayload(reservation: Reservation) {
  return {
    to: reservation.phone,
    body: `Your table at NEXORA is ${reservation.status} for ${reservation.guests} on ${reservation.date} at ${formatTime12(reservation.time)}. Code: ${reservation.confirmationCode}`,
  };
}
