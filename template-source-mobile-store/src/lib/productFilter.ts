import type { PhoneProduct } from "@template-mobile-store/data/products";

export type ProductFilters = {
  brand?: string;
  category?: string;
  condition?: string;
  storage?: string;
  price?: string;
  q?: string;
  sort?: string;
  fiveG?: string;
};

function priceInRange(price: number, range: string): boolean {
  if (!range || range === "any") return true;
  if (range === "under-500") return price < 500;
  if (range === "500-800") return price >= 500 && price < 800;
  if (range === "800-1000") return price >= 800 && price < 1000;
  if (range === "1000-plus") return price >= 1000;
  return true;
}

export function filterProducts(list: PhoneProduct[], f: ProductFilters): PhoneProduct[] {
  let out = [...list];
  if (f.brand && f.brand !== "all") {
    out = out.filter(p => p.brand.toLowerCase() === f.brand!.toLowerCase());
  }
  if (f.category && f.category !== "all") {
    out = out.filter(p => p.category === f.category || p.propertyType === f.category);
  }
  if (f.condition && f.condition !== "all") {
    out = out.filter(p => p.listingType === f.condition);
  }
  if (f.storage && f.storage !== "all") {
    out = out.filter(p => p.storage.toLowerCase().includes(f.storage!.toLowerCase()));
  }
  if (f.fiveG === "yes") {
    out = out.filter(p => p.connectivity.toLowerCase().includes("5g"));
  }
  if (f.price) {
    out = out.filter(p => priceInRange(p.price, f.price));
  }
  if (f.q?.trim()) {
    const q = f.q.toLowerCase();
    out = out.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.stockNumber.toLowerCase().includes(q),
    );
  }
  const sort = f.sort || "recommended";
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  if (sort === "newest") out.sort((a, b) => b.number - a.number);
  if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
  if (sort === "popular") out.sort((a, b) => b.reviewCount - a.reviewCount);
  return out;
}
