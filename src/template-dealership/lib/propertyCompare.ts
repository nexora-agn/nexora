const STORAGE_KEY = "nexora-dealer-compare";
const MAX_COMPARE = 3;

export function getCompareList(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleCompare(id: string): { list: string[]; added: boolean; full: boolean } {
  const current = getCompareList();
  if (current.includes(id)) {
    const list = current.filter(x => x !== id);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
    return { list, added: false, full: false };
  }
  if (current.length >= MAX_COMPARE) {
    return { list: current, added: false, full: true };
  }
  const list = [...current, id];
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
  return { list, added: true, full: false };
}

export function isInCompare(id: string): boolean {
  return getCompareList().includes(id);
}
