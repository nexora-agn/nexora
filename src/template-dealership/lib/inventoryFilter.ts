import type { VehicleListing } from "@template-dealership/data/inventory";

export type InventoryFilters = {
  condition?: string;
  make?: string;
  body?: string;
  price?: string;
  q?: string;
  sort?: string;
};

function priceInRange(price: number, range: string): boolean {
  if (!range || range === "Any Price") return true;
  if (range.startsWith("Under")) return price < 30000;
  if (range.includes("30k") && range.includes("50k")) return price >= 30000 && price < 50000;
  if (range.includes("50k") && range.includes("75k")) return price >= 50000 && price < 75000;
  if (range.includes("75k") && range.includes("100k")) return price >= 75000 && price < 100000;
  if (range.includes("100k+")) return price >= 100000;
  return true;
}

export function filterInventory(list: VehicleListing[], f: InventoryFilters): VehicleListing[] {
  let out = [...list];
  if (f.condition && f.condition !== "all") {
    out = out.filter(v => v.listingType === f.condition);
  }
  if (f.make) {
    out = out.filter(v => v.make.toLowerCase() === f.make!.toLowerCase());
  }
  if (f.body && f.body !== "all") {
    const b = f.body.toLowerCase();
    out = out.filter(v => v.propertyType === b || v.category.toLowerCase() === b || (b === "electric" && v.fuelType.toLowerCase().includes("electric")));
  }
  if (f.price) {
    out = out.filter(v => priceInRange(v.price, f.price));
  }
  if (f.q?.trim()) {
    const q = f.q.toLowerCase();
    out = out.filter(
      v =>
        v.title.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.stockNumber.toLowerCase().includes(q) ||
        v.vin.toLowerCase().includes(q),
    );
  }
  const sort = f.sort || "newest";
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  if (sort === "mileage") out.sort((a, b) => a.mileage - b.mileage);
  if (sort === "year") out.sort((a, b) => Number(b.year) - Number(a.year));
  if (sort === "payment") out.sort((a, b) => a.monthlyEstimate - b.monthlyEstimate);
  return out;
}
