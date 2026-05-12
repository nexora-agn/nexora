/** 1-based page from URL query; default 1; NaN → 1 */
export function parsePageParam(value: string | null): number {
  const n = parseInt(value ?? "1", 10);
  if (Number.isNaN(n) || n < 1) return 1;
  return n;
}

export function totalPages(itemCount: number, pageSize: number): number {
  if (pageSize < 1) return 1;
  return Math.max(1, Math.ceil(itemCount / pageSize));
}

export function clampPage(page: number, totalPageCount: number): number {
  if (totalPageCount < 1) return 1;
  return Math.min(Math.max(1, page), totalPageCount);
}

export function slicePage<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
