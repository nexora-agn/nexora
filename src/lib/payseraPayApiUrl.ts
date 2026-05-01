/** Optional origin when SPA is not served from the same host as `/api/paysera-*` (mirror of export URL pattern). */
export function payseraPayApiUrl(pathQuery: string): string {
  const p = pathQuery.startsWith("/") ? pathQuery : `/${pathQuery}`;
  const origin = (import.meta.env.VITE_PAYSERA_PAY_API_ORIGIN as string | undefined)?.trim().replace(/\/$/, "");
  return origin ? `${origin}${p}` : p;
}
