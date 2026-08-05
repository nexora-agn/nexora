export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
};

/** Priority items for personalized demos and post-subscribe mock sites. */
export const PRIORITY_CHECKLIST: ChecklistItem[] = [
  {
    id: "contact",
    title: "Business contact details",
    description: "Legal or trade name, phone, email, and street address.",
  },
  {
    id: "services",
    title: "Services you offer",
    description: "A rough list is fine — what customers hire you for.",
  },
  {
    id: "hours",
    title: "Business hours",
    description: "Weekday and weekend hours, plus holiday notes if relevant.",
  },
  {
    id: "areas",
    title: "Service areas",
    description: "Cities, neighborhoods, or radius you cover.",
  },
  {
    id: "logo",
    title: "Logo",
    description: "PNG or SVG preferred. Skip if you don’t have one yet.",
  },
  {
    id: "photos",
    title: "Photos of your business",
    description: "5–15 shots of the shop, team, or completed work — or a shared album link (Drive, Dropbox, Google Photos).",
  },
  {
    id: "branding",
    title: "Preferred colors or branding",
    description: "Brand colors, fonts you like, or a site whose look you admire.",
  },
  {
    id: "social",
    title: "Social and listing links",
    description: "Google Business, Facebook, Instagram, Yelp, or others you use.",
  },
  {
    id: "reviews",
    title: "Customer reviews or testimonials",
    description: "A few quotes, or a link to your Google reviews.",
  },
  {
    id: "offers",
    title: "Special offers or promotions",
    description: "Any current deal, seasonal promo, or financing note to highlight.",
  },
];

/** Optional extras that strengthen the site when available. */
export const NICE_TO_HAVE_CHECKLIST: ChecklistItem[] = [
  {
    id: "team",
    title: "Team bios",
    description: "Names, roles, and a short intro for owners or key staff.",
  },
  {
    id: "faq",
    title: "Common customer questions",
    description: "Pricing questions, warranties, response times — whatever clients ask most.",
  },
  {
    id: "inspiration",
    title: "Sites you like",
    description: "Competitor or peer websites whose style or structure you prefer.",
  },
  {
    id: "domain",
    title: "Domain and hosting notes",
    description: "Existing domain name, registrar, or hosting provider if you already have one.",
  },
];

/** Upload limits for checklist form → Resend attachments (stay under typical API body caps). */
export const CHECKLIST_UPLOAD = {
  logoMaxBytes: 1.5 * 1024 * 1024,
  photoMaxBytes: 1 * 1024 * 1024,
  photoMaxCount: 8,
  acceptLogo: "image/png,image/jpeg,image/webp,image/svg+xml,.png,.jpg,.jpeg,.webp,.svg",
  acceptPhotos: "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp",
  allowedMime: new Set([
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
    "image/gif",
  ]),
} as const;
