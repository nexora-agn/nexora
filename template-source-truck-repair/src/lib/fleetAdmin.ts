import type { ServiceRequest, RequestStatus } from "./serviceRequests";
import { getAllRequests } from "./serviceRequests";

export interface FleetVehicle {
  id: string;
  unitNumber: string;
  type: string;
  vin?: string;
}

export interface FleetClient {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  contractType: "monthly" | "pay-per-service";
  vehicles: FleetVehicle[];
  createdAt: string;
}

const CLIENTS_KEY = "nexora-fleet-clients";
const ORDERS_KEY = "nexora-fleet-service-orders";

function loadClients(): FleetClient[] {
  try {
    const raw = localStorage.getItem(CLIENTS_KEY);
    return raw ? (JSON.parse(raw) as FleetClient[]) : demoClients();
  } catch {
    return demoClients();
  }
}

function saveClients(list: FleetClient[]) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(list));
}

function demoClients(): FleetClient[] {
  const demo: FleetClient[] = [
    {
      id: "fc-apex",
      companyName: "Apex Logistics",
      contactName: "Mike Rodriguez",
      phone: "(214) 555-0101",
      email: "mike@apexlogistics.com",
      contractType: "monthly",
      vehicles: [
        { id: "v1", unitNumber: "AL-1042", type: "Semi Truck" },
        { id: "v2", unitNumber: "AL-1043", type: "Semi Truck" },
        { id: "v3", unitNumber: "AL-2201", type: "Refrigerated Truck" },
      ],
      createdAt: "2024-03-15T00:00:00.000Z",
    },
    {
      id: "fc-heartland",
      companyName: "Heartland Freight",
      contactName: "Sarah Kim",
      phone: "(817) 555-0198",
      email: "sarah@heartlandfreight.com",
      contractType: "monthly",
      vehicles: [
        { id: "v4", unitNumber: "HF-88", type: "Semi Truck" },
        { id: "v5", unitNumber: "HF-89", type: "Flatbed" },
      ],
      createdAt: "2023-08-01T00:00:00.000Z",
    },
  ];
  saveClients(demo);
  return demo;
}

export function getFleetClients(): FleetClient[] {
  return loadClients();
}

export function getFleetClient(id: string): FleetClient | null {
  return loadClients().find(c => c.id === id) ?? null;
}

export function getServiceOrders(): ServiceRequest[] {
  return getAllRequests();
}

export function updateOrderStatus(ticketNumber: string, status: RequestStatus, technician?: string) {
  const all = getAllRequests();
  const idx = all.findIndex(r => r.ticketNumber === ticketNumber);
  if (idx < 0) return null;
  const updated = {
    ...all[idx],
    status,
    technician: technician ?? all[idx].technician,
    updatedAt: new Date().toISOString(),
  };
  const stored = JSON.parse(localStorage.getItem("nexora-truck-service-requests") || "[]") as ServiceRequest[];
  const sidx = stored.findIndex(r => r.ticketNumber === ticketNumber);
  if (sidx >= 0) {
    stored[sidx] = updated;
    localStorage.setItem("nexora-truck-service-requests", JSON.stringify(stored));
  }
  return updated;
}

export const ORDER_STATUS_OPTIONS: RequestStatus[] = ["received", "dispatched", "in-progress", "completed", "cancelled"];
