/** Optional origin when SPA is not served from the same host as `/api/paddle-*`. */
export function paddlePayApiUrl(pathQuery: string): string {
  const path = pathQuery.startsWith("/") ? pathQuery : `/${pathQuery}`;
  const origin = (import.meta.env.VITE_PADDLE_PAY_API_ORIGIN as string | undefined)?.trim().replace(/\/$/, "");
  if (origin) return `${origin}${path}`;
  return path;
}
