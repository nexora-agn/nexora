const STORAGE = "nexora-tire-cart";

export type CartLine = {
  productId: string;
  qty: number;
  color?: string;
  storage?: string;
};

export function getCart(): CartLine[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) || "[]") as CartLine[];
  } catch {
    return [];
  }
}

function save(lines: CartLine[]) {
  localStorage.setItem(STORAGE, JSON.stringify(lines));
}

export function cartCount(): number {
  return getCart().reduce((n, l) => n + l.qty, 0);
}

export function addToCart(productId: string, opts?: { color?: string; storage?: string }) {
  const lines = getCart();
  const existing = lines.find(l => l.productId === productId && l.color === opts?.color && l.storage === opts?.storage);
  if (existing) existing.qty += 1;
  else lines.push({ productId, qty: 1, ...opts });
  save(lines);
  return lines;
}

export function updateQty(productId: string, qty: number) {
  let lines = getCart().map(l => (l.productId === productId ? { ...l, qty } : l)).filter(l => l.qty > 0);
  save(lines);
  return lines;
}

export function removeFromCart(productId: string) {
  const lines = getCart().filter(l => l.productId !== productId);
  save(lines);
  return lines;
}

export function clearCart() {
  save([]);
}
