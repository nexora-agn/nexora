import { customerProjects } from "@/data/customerProjects";
import { TEMPLATES, type TemplateOption } from "@/lib/templates";

export type IndustryPage = {
  slug: string;
  name: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  problem: string;
  whatYouGet: string[];
  processNote: string;
  relatedTemplateSlugs: string[];
  liveClientIds: string[];
  relatedServicePath: string;
};

export const INDUSTRIES: IndustryPage[] = [
  {
    slug: "construction",
    name: "Construction",
    navLabel: "Contractors",
    title: "Websites for construction companies",
    metaTitle: "Construction Company Websites | Contractors & Design-Build | Nexora",
    metaDescription:
      "Construction and design-build websites with project proof and clear quote paths. Preview a Nexora template branded for your firm, then subscribe.",
    h1: "Websites for construction companies",
    lede:
      "Contractors need a site that looks as serious as the work: projects, capabilities, and a contact path that reaches the right person.",
    problem:
      "Many contractor sites are PDF galleries with no next step. Buyers cannot tell new-build from remodel, or who to call.",
    whatYouGet: [
      "Project and capability pages that match how you sell",
      "Clear contact and quote paths, not a buried footer form",
      "Optional catalog and pricing sync on Growth",
      "A staged preview you approve before the subscription starts",
    ],
    processNote: "Live example: F.Morina Bauunternehmen, in our work portfolio.",
    relatedTemplateSlugs: ["constructo", "summit", "homebuilder", "remodeler"],
    liveClientIds: ["f-morina-bau"],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "roofing",
    name: "Roofing",
    navLabel: "Roofing companies",
    title: "Websites for roofing companies",
    metaTitle: "Roofing Company Websites | Preview Before You Subscribe | Nexora",
    metaDescription:
      "Nexora builds websites for roofers with service areas, storm and estimate paths, and an AI assistant that captures calls after hours.",
    h1: "Websites for roofing companies",
    lede:
      "Roofing sites have to work when a storm hits: phone first, service area clear, estimate path obvious.",
    problem:
      "Many roofing sites bury the phone number, skip city coverage, and send storm traffic to a generic contact form.",
    whatYouGet: [
      "A mobile-first homepage with a visible phone number and estimate CTA",
      "Service and service-area pages you can preview before launch",
      "An AI assistant that can take name, phone, and job type after hours",
      "Hosting, SSL, and scoped monthly updates on the subscription",
    ],
    processNote:
      "Live examples include Arizona Roof Doctors and Boss Roofing & Siding.",
    relatedTemplateSlugs: ["roofing", "roofix", "mrbuildernyc"],
    liveClientIds: ["arizonaroofdoctors", "boss-roofing"],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "electrical",
    name: "Electrical",
    navLabel: "Electricians",
    title: "Websites for electricians",
    metaTitle: "Electrician Websites | Residential & Commercial | Nexora",
    metaDescription:
      "Websites for electricians that separate residential, commercial, and industrial work, with clear CTAs and after-hours chat capture.",
    h1: "Websites for electricians",
    lede:
      "Electrical buyers search by job type. We give residential, commercial, and industrial their own paths, then you preview the live site.",
    problem:
      "Homeowners, facility managers, and GCs do not want the same page. If they cannot tell you handle their work, they call the next listing.",
    whatYouGet: [
      "Distinct service paths instead of one generic list",
      "Lead forms and click-to-call that stay visible on mobile",
      "Optional catalog or pricing sync on the Growth plan",
      "An AI assistant trained on your services, hours, and area",
    ],
    processNote: "Live example: Go Prime Electric.",
    relatedTemplateSlugs: ["electrician"],
    liveClientIds: ["go-prime-electric"],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    navLabel: "Plumbers",
    title: "Websites for plumbing companies",
    metaTitle: "Plumbing Company Websites | Emergency & Service Pages | Nexora",
    metaDescription:
      "Plumbing websites with emergency and scheduled-service paths, service areas, and 24/7 chat capture. Preview before you subscribe.",
    h1: "Websites for plumbing companies",
    lede:
      "Plumbing traffic is a mix of emergencies and planned work. The site should make both obvious: call now, book later, show where you roll trucks.",
    problem:
      "A brochure site that reads like office hours does not help a leak at 11 p.m. We put the phone and chat first.",
    whatYouGet: [
      "Emergency-first mobile layout with tap-to-call",
      "Service pages for the work you sell",
      "Service-area coverage without fake city doorway pages",
      "AI chat that can collect name, phone, and issue type overnight",
    ],
    processNote: "Preview a plumbing template branded with your logo before you subscribe.",
    relatedTemplateSlugs: ["plumber", "familyfirst-plumber"],
    liveClientIds: [],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "painting",
    name: "Painting",
    navLabel: "Painters",
    title: "Websites for painting companies",
    metaTitle: "Painting Company Websites | Interior & Exterior | Nexora",
    metaDescription:
      "Painting contractor websites with interior/exterior paths, galleries, and estimate CTAs. Preview a Nexora template, then subscribe.",
    h1: "Websites for painting companies",
    lede:
      "Painting is trust-heavy. Homeowners want to see finishes, before/after work, and a simple path to an estimate.",
    problem:
      "A generic contractor theme with stock paint cans does not show scope or proof. We structure galleries and services the way buyers actually choose a painter.",
    whatYouGet: [
      "Interior and exterior service paths",
      "Gallery and before/after layouts",
      "Estimate form and click-to-call on mobile",
      "An AI assistant that can take job type and photos after hours",
    ],
    processNote: "Live example: Indy Precision Painters.",
    relatedTemplateSlugs: ["painting"],
    liveClientIds: ["indy-precision"],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    navLabel: "Landscapers",
    title: "Websites for landscaping and lawn companies",
    metaTitle: "Landscaping & Lawn Care Websites | Nexora",
    metaDescription:
      "Landscaping, lawn, and tree-service websites with seasonal offers, galleries, and quote paths. Preview first with Nexora.",
    h1: "Websites for landscaping and lawn companies",
    lede:
      "Seasonal spikes overwhelm the office if the site only says “contact us.” We make lawn, tree, and hardscape paths obvious.",
    problem:
      "Vague “landscaping services” pages create “how much?” DMs. Tiered offers and geo-clear coverage make quote requests usable.",
    whatYouGet: [
      "Service pages for lawn, tree, and outdoor work",
      "Seasonal offer and quote paths",
      "Gallery layouts for completed yards",
      "After-hours chat capture on every plan",
    ],
    processNote: "Live example: Pro Lawn & Pest Control.",
    relatedTemplateSlugs: ["landscaping"],
    liveClientIds: ["pro-lawn"],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "automotive",
    name: "Automotive",
    navLabel: "Auto shops",
    title: "Websites for auto shops and dealers",
    metaTitle: "Auto Shop, Tire & Dealership Websites | Nexora",
    metaDescription:
      "Websites for auto repair, truck repair, tires, and dealers — with service menus and booking paths. Preview a Nexora template first.",
    h1: "Websites for auto shops and dealers",
    lede:
      "Shops need service menus, hours, and a booking or inquiry path that matches how the bays actually run.",
    problem:
      "A booking widget disconnected from the shop system double-books days. We start with a catalog and a flow you can actually run.",
    whatYouGet: [
      "Service menus aligned to how you bill",
      "Click-to-call, forms, and optional online booking",
      "Templates for repair, truck repair, tires, and dealerships",
      "Growth-plan path to connect jobs to existing tools",
    ],
    processNote: "Preview an automotive template with your brand before you subscribe.",
    relatedTemplateSlugs: ["automotive", "truck-repair", "tire-shop", "dealership"],
    liveClientIds: [],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "real-estate",
    name: "Real estate",
    navLabel: "Real estate",
    title: "Websites for real estate and development",
    metaTitle: "Luxury Real Estate Websites | Nexora",
    metaDescription:
      "Luxury real estate and development websites with listings, agent profiles, and inquiry routing. Preview a Nexora template, then subscribe.",
    h1: "Websites for real estate and development",
    lede:
      "Long sales cycles need listings, neighborhoods, and inquiry context — not a generic contact form.",
    problem:
      "Launch-week traffic is wasted if every inquiry is “tell me more” with no phase, budget, or property attached.",
    whatYouGet: [
      "Listing and neighborhood page structure",
      "Agent and development storytelling",
      "Inquiry flows that capture intent",
      "A staged preview before you subscribe",
    ],
    processNote: "Start from the Nexora Estate luxury real estate template.",
    relatedTemplateSlugs: ["luxury-real-estate"],
    liveClientIds: [],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    navLabel: "Restaurants",
    title: "Websites for restaurants",
    metaTitle: "Restaurant Websites with Reservations | Nexora",
    metaDescription:
      "Restaurant websites with menu, gallery, and reservation flows. Preview a Nexora dining template, then subscribe.",
    h1: "Websites for restaurants",
    lede:
      "Guests want the menu, hours, and a way to book — on a phone, in a few seconds.",
    problem:
      "PDF menus and Instagram-only booking lose walk-in and tourist traffic. We put menu, reserve, and events on the site.",
    whatYouGet: [
      "Menu and signature-dish layouts",
      "Reservation and events paths",
      "Gallery and chef/story pages",
      "Hosting and an on-site assistant on the plan",
    ],
    processNote: "Preview the Nexora Restaurant template with your brand.",
    relatedTemplateSlugs: ["restaurant"],
    liveClientIds: [],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "barbershops",
    name: "Barbershops",
    navLabel: "Barbershops",
    title: "Websites for barbershops and salons",
    metaTitle: "Barbershop Websites with Online Booking | Nexora",
    metaDescription:
      "Barbershop and grooming websites with service menus, barber profiles, and booking. Preview a Nexora template first.",
    h1: "Websites for barbershops and salons",
    lede:
      "Chairs fill when people can see services, prices, and a booking path without calling.",
    problem:
      "A Facebook page and a phone number drop after-hours bookings. We put the menu and calendar on the site.",
    whatYouGet: [
      "Service menu and pricing layout",
      "Barber profiles and gallery",
      "Online booking structure",
      "Gift cards and loyalty pages where the template includes them",
    ],
    processNote: "Preview Forge Barber Co. as the starting barbershop template.",
    relatedTemplateSlugs: ["barbershop"],
    liveClientIds: [],
    relatedServicePath: "/services/websites",
  },
  {
    slug: "retail",
    name: "Retail",
    navLabel: "Retail",
    title: "Websites for phone and retail stores",
    metaTitle: "Phone Store & Retail Websites | Nexora",
    metaDescription:
      "Retail websites for phone stores with shop grids, compare, and repair booking. Preview a Nexora template, then subscribe.",
    h1: "Websites for phone and retail stores",
    lede:
      "Retail sites need products, compare, and a store visit or repair path — not a brochure.",
    problem:
      "A catalog that does not match the floor creates returns and no-shows. We start from shop, compare, and booking flows you can actually run.",
    whatYouGet: [
      "Product and plan merchandising layouts",
      "Compare, cart, and trade-in structure",
      "Repair booking and store locator pages",
      "A staged preview before you subscribe",
    ],
    processNote: "Preview the Nexora Mobile retail template.",
    relatedTemplateSlugs: ["mobile-store"],
    liveClientIds: [],
    relatedServicePath: "/services/websites",
  },
];

export function getIndustryBySlug(slug: string | undefined): IndustryPage | undefined {
  if (!slug) return undefined;
  return INDUSTRIES.find(item => item.slug === slug);
}

export function templatesForIndustry(industry: IndustryPage): TemplateOption[] {
  return TEMPLATES.filter(template => industry.relatedTemplateSlugs.includes(template.chirpsSlug));
}

export function liveClientsForIndustry(industry: IndustryPage) {
  return customerProjects.filter(project => industry.liveClientIds.includes(project.id));
}
