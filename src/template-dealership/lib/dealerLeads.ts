const STORAGE = "nexora-dealer-leads";

export type LeadType = "inquiry" | "test-drive" | "finance" | "trade-in" | "service" | "parts" | "contact";
export type LeadStatus = "new" | "contacted" | "qualified" | "appointment" | "negotiation" | "sold" | "lost";

export interface DealerLead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  name: string;
  email: string;
  phone: string;
  vehicleId?: string;
  message?: string;
  payload?: Record<string, string>;
  createdAt: string;
}

function load(): DealerLead[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) || "[]") as DealerLead[];
  } catch {
    return [];
  }
}

function save(list: DealerLead[]) {
  localStorage.setItem(STORAGE, JSON.stringify(list));
}

export function createLead(input: Omit<DealerLead, "id" | "status" | "createdAt">): DealerLead {
  const lead: DealerLead = {
    ...input,
    id: `lead-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  const all = load();
  all.unshift(lead);
  save(all);
  return lead;
}

export function getLeads(): DealerLead[] {
  return load();
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  const all = load();
  const idx = all.findIndex(l => l.id === id);
  if (idx < 0) return;
  all[idx] = { ...all[idx], status };
  save(all);
}
