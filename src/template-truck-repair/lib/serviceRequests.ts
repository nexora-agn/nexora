import { SERVICE_REQUEST_SETTINGS } from "@template-truck-repair/data/siteData";

export type RequestPriority = "Standard" | "Urgent" | "Emergency";
export type RequestStatus = "received" | "dispatched" | "in-progress" | "completed" | "cancelled";

export interface ServiceRequest {
  id: string;
  ticketNumber: string;
  priority: RequestPriority;
  vehicleType: string;
  unitNumber: string;
  companyName: string;
  name: string;
  phone: string;
  email: string;
  issue: string;
  location: string;
  gpsLat?: number;
  gpsLng?: number;
  status: RequestStatus;
  etaMinutes: number;
  technician?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRequestInput {
  priority: RequestPriority;
  vehicleType: string;
  unitNumber: string;
  companyName: string;
  name: string;
  phone: string;
  email: string;
  issue: string;
  location: string;
  gpsLat?: number;
  gpsLng?: number;
}

const STORAGE_KEY = "nexora-truck-service-requests";

function loadAll(): ServiceRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ServiceRequest[]) : [];
  } catch {
    return [];
  }
}

function saveAll(list: ServiceRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function ticketNum(): string {
  return `NX-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function getEtaMinutes(priority: RequestPriority): number {
  return SERVICE_REQUEST_SETTINGS.defaultEtaMinutes[priority] ?? 120;
}

export function createServiceRequest(input: ServiceRequestInput): ServiceRequest {
  const now = new Date().toISOString();
  const req: ServiceRequest = {
    id: `sr-${Date.now()}`,
    ticketNumber: ticketNum(),
    ...input,
    status: input.priority === "Emergency" ? "dispatched" : "received",
    etaMinutes: getEtaMinutes(input.priority),
    technician: input.priority === "Emergency" ? "Mobile Unit #2" : undefined,
    createdAt: now,
    updatedAt: now,
  };
  const all = loadAll();
  all.push(req);
  saveAll(all);
  return req;
}

export function getRequestByTicket(ticket: string): ServiceRequest | null {
  return loadAll().find(r => r.ticketNumber.toUpperCase() === ticket.toUpperCase()) ?? null;
}

export function getAllRequests(): ServiceRequest[] {
  return loadAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function buildSmsPayload(req: ServiceRequest) {
  return {
    to: req.phone,
    body: `Nexora Heavy Duty: Ticket ${req.ticketNumber} received. Priority: ${req.priority}. ETA: ~${req.etaMinutes} min. Dispatch: (800) 555-2478`,
  };
}
