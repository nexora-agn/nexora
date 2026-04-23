/** RFC 5321/5322–friendly cap for a single address field. */
export const WORK_EMAIL_MAX_LENGTH = 320;

/**
 * Returns a user-facing error for a single-line work email, or `null` if valid.
 * Pass `emptyMessage` to match the form (e.g. modal vs. onboarding).
 */
export function getWorkEmailError(
  input: string,
  emptyMessage = "Add your work email so we can reach you.",
): string | null {
  const s = input.trim();
  if (!s) return emptyMessage;
  if (s.length > WORK_EMAIL_MAX_LENGTH) {
    return `Use at most ${WORK_EMAIL_MAX_LENGTH} characters.`;
  }
  if (/\s/.test(s)) {
    return "Don’t use spaces in your email address.";
  }
  if (!s.includes("@")) {
    return "An email must include an @ (e.g. you@company.com).";
  }
  const parts = s.split("@");
  if (parts.length > 2) {
    return "Use only one @ in your email address.";
  }
  const [local, domain] = parts as [string, string];
  if (local.length === 0) {
    return "Add the part before the @ (e.g. you@company.com).";
  }
  if (domain.length === 0) {
    return "Add the part after the @ (e.g. you@company.com).";
  }
  if (!domain.includes(".")) {
    return "The domain should include a dot (e.g. company.com).";
  }
  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) {
    return "That email address doesn’t look valid.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) {
    return "That email address doesn’t look valid.";
  }
  return null;
}
