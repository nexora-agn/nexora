/**
 * BRUSHHOUSE PAINTING — premium residential & commercial painting content registry.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/** Curated Unsplash photos — verified CDN URLs (images.unsplash.com/photo-…). */
export const PAINTING_IMAGES = {
  heroHome: u("1613490493576-7fde63acd811", 1920, 1080),
  heroInterior: u("1674376360445-2996327553e7", 1400, 900),
  heroExterior: u("1774977737078-7ccc2ac697e6", 1400, 900),
  painterWorking: u("1717281234297-3def5ae3eee1", 900, 1100),
  painterRoller: u("1693985120993-e9b203ce7631", 900, 1100),
  luxuryInterior: u("1600210491892-03d54c0aaf87", 1200, 900),
  modernLiving: u("1631679706909-1844bbd07221", 1200, 900),
  exteriorHouse: u("1774977737078-7ccc2ac697e6", 1200, 900),
  colorConsult: u("1514678851703-301356daffda", 900, 900),
  cabinetPaint: u("1611818830402-d07de749ed59", 900, 900),
  commercial: u("1497366754035-f200968a6e72", 1200, 900),
  deckFence: u("1773161960049-3ec16360da87", 900, 900),
  drywallRepair: u("1590365876016-da05ac533e83", 900, 900),
  wallpaperRemoval: u("1581094794329-c8112a89af12", 900, 900),
  trimMolding: u("1646940748870-264f64b7741d", 900, 900),
  residentialHome: u("1613490493576-7fde63acd811", 1200, 900),
  beforeRoom: u("1632693810905-ce553d94e9c0", 900, 700),
  afterRoom: u("1632120377007-c2adc3017b1e", 900, 700),
  beforeKitchen: u("1738130892621-ea936f363089", 900, 700),
  afterKitchen: u("1697609996790-f00fe4568e1d", 900, 700),
  beforeExterior: u("1763687694954-11d4fc83fbba", 900, 700),
  afterExterior: u("1612296350607-076d142d15cd", 900, 700),
  beforeCommercial: u("1497366754035-f200968a6e72", 900, 700),
  afterCommercial: u("1646940748870-264f64b7741d", 900, 700),
  finishes: u("1589939705384-5185137a7f0f", 900, 900),
  epoxy: u("1589939705384-5185137a7f0f", 900, 900),
  powerWash: u("1707897283727-31befe824066", 900, 900),
  stucco: u("1560518883-ce09059eeffa", 1200, 900),
  team: u("1504307651254-35680f356dfd", 1200, 900),
  contactHero: u("1631679706909-1844bbd07221", 1400, 900),
  aboutHero: u("1717281234297-3def5ae3eee1", 1400, 900),
  aboutStudio: u("1514678851703-301356daffda", 1200, 900),
  reviewsHero: u("1646940748870-264f64b7741d", 1400, 900),
  residentialSplit: u("1600210491892-03d54c0aaf87", 900, 1200),
  commercialSplit: u("1497366754035-f200968a6e72", 900, 1200),
  blogHero: u("1693985120993-e9b203ce7631", 1400, 900),
  financing: u("1611818830402-d07de749ed59", 1200, 800),
  galleryA: u("1694175015319-5d9fb9ec5fcc", 800, 1000),
  galleryB: u("1722605921830-5ff41e84cfe7", 800, 600),
  galleryC: u("1638284457192-27d3d0ec51aa", 800, 600),
  avatarA: u("1544005313-94ddf0286df2", 120, 120),
  avatarB: u("1519345182560-3f2917c472ef", 120, 120),
  avatarC: u("1612349317150-e413f6a5b16d", 120, 120),
  avatarD: u("1544005313-94ddf0286df2", 80, 80),
  avatarE: u("1519345182560-3f2917c472ef", 80, 80),
  avatarF: u("1612349317150-e413f6a5b16d", 80, 80),
  avatarG: u("1506794778202-cad84cf45f1d", 300, 300),
} as const;

export const COMPANY = {
  name: "BRUSHHOUSE PAINTING",
  legalName: "BrushHouse Painting Co.",
  tagline:
    "North Jersey's premium residential & commercial painting studio — flawless finishes, meticulous prep, and color expertise for homes that feel magazine-ready.",
  phone: "(201) 555-0142",
  email: "hello@brushhousepainting.com",
  address: "12 Studio Lane, Ridgewood, NJ 07450",
  hours: "Mon–Sat 7am–6pm · Free estimates by appointment",
  license: "NJ HIC #13VH12345678",
  fax: "",
};

export const SITE_TOP = {
  line: "Spring Exterior Season — Book Your Free Estimate",
  badges: ["Licensed & Insured", "5-Star Google Reviews", "Premium Finishes"],
  ratingValue: "4.9",
  ratingCount: "320+",
  ratingLabel: "Reviews",
  locations: "Bergen · Passaic · Morris · Essex · Hudson",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "8:00 AM – 2:00 PM" },
  { days: "Sunday", hours: "By appointment" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.2%2C40.9%2C-73.9%2C41.1&layer=mapnik&marker=40.98,-74.12";

export const HOME_HERO = {
  eyebrow: "NORTH JERSEY PREMIUM PAINTING",
  headlineBefore: "Transform Your Home",
  headlineHighlight: "With Flawless",
  headlineAfter: "Interior & Exterior Finishes.",
  body:
    "BrushHouse Painting delivers museum-quality prep, designer-grade coatings, and crews who treat your home like their own. From single-room refreshes to full exterior transformations.",
  primaryCta: { label: "FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "VIEW OUR WORK", to: "/projects" },
  image: PAINTING_IMAGES.heroHome,
  trustPills: [
    { label: "Licensed & Insured", sub: "NJ HIC Licensed", icon: "ShieldCheck" as const },
    { label: "5-Star Reviews", sub: "320+ Google", icon: "Star" as const },
    { label: "Premium Finishes", sub: "Sherwin · Benjamin Moore", icon: "Sparkles" as const },
  ],
  ratingQuote:
    "Meticulous surface prep, clean job sites, and written warranties on every project — the standard North Jersey homeowners expect.",
  ratingCard: {
    score: "4.9",
    countLabel: "Loved by Bergen County homeowners",
    avatars: [
      PAINTING_IMAGES.avatarD,
      PAINTING_IMAGES.avatarE,
      PAINTING_IMAGES.avatarF,
      PAINTING_IMAGES.avatarA,
    ],
  },
  featuredEyebrow: "RESIDENTIAL & COMMERCIAL",
  featuredTitle: "Luxury Painting Studio",
  featuredMeta: "Interior · Exterior · Cabinets · Commercial",
};

export const SERVICES_RIBBON = [
  { id: "interior-painting", label: "INTERIOR", icon: "Home" as const, description: "Walls, ceilings, trim — flawless finishes.", to: "/services/interior-painting" },
  { id: "exterior-painting", label: "EXTERIOR", icon: "Building2" as const, description: "Weather-ready coatings that last.", to: "/services/exterior-painting" },
  { id: "cabinet-painting", label: "CABINETS", icon: "Paintbrush" as const, description: "Factory-smooth kitchen transformations.", to: "/services/cabinet-painting" },
  { id: "color-consultation", label: "COLOR", icon: "Palette" as const, description: "Designer-guided palette selection.", to: "/services/color-consultation" },
  { id: "commercial-painting", label: "COMMERCIAL", icon: "Building" as const, description: "Offices, retail, multi-family.", to: "/services/commercial-painting" },
];

export const CAPABILITIES = [
  { id: "prep", title: "Meticulous Prep", description: "Sanding, patching, priming — the foundation of a finish that lasts decades.", icon: "Layers" as const, to: "/about" },
  { id: "coatings", title: "Premium Coatings", description: "Sherwin-Williams, Benjamin Moore, and Farrow & Ball systems.", icon: "Sparkles" as const, to: "/services" },
  { id: "clean", title: "Clean Job Sites", description: "Daily cleanup, floor protection, and respectful crews.", icon: "ShieldCheck" as const, to: "/about" },
  { id: "warranty", title: "Written Warranty", description: "Labor warranty on every project — confidence you can hold.", icon: "Award" as const, to: "/contact" },
];

export const PROCESS_STEPS = [
  { id: "consult", label: "Consultation", description: "On-site walkthrough, scope review, and color direction." },
  { id: "proposal", label: "Detailed Proposal", description: "Line-item pricing, schedule, and product specifications." },
  { id: "prep", label: "Surface Preparation", description: "Repair, sand, prime — the step most painters skip." },
  { id: "paint", label: "Expert Application", description: "Spray, brush, and roll techniques matched to each surface." },
  { id: "walkthrough", label: "Final Walkthrough", description: "Touch-ups, cleanup, and warranty documentation." },
];

export const HOME_STATS = [
  { value: "18+", label: "Years of Craftsmanship", icon: "Award" as const },
  { value: "2,400+", label: "Rooms & Facades Painted", icon: "Paintbrush" as const },
  { value: "4.9", label: "Google Rating", icon: "Star" as const },
  { value: "100%", label: "Satisfaction Promise", icon: "Heart" as const },
];

export const WHY_BENEFITS = [
  { title: "Designer-Level Color Guidance", description: "In-house color consultations so your palette feels intentional, not guesswork.", icon: "Palette" as const },
  { title: "Prep-First Philosophy", description: "We spend up to 40% of project time on preparation — because finish quality lives in the prep.", icon: "Layers" as const },
  { title: "Owner-Led Quality Control", description: "Every project has a lead painter and daily QC walkthroughs.", icon: "Eye" as const },
  { title: "Respect for Your Home", description: "Floor coverings, furniture protection, HEPA sanding, and quiet, courteous crews.", icon: "Home" as const },
];

export const SERVICES = [
  { id: "interior-painting", title: "Interior Painting", icon: "Home", description: "Walls, ceilings, trim, and accent features with smooth, durable finishes.", image: PAINTING_IMAGES.heroInterior },
  { id: "exterior-painting", title: "Exterior Painting", icon: "Building2", description: "Siding, trim, shutters, and masonry with weather-resistant systems.", image: PAINTING_IMAGES.exteriorHouse },
  { id: "cabinet-painting", title: "Cabinet Painting", icon: "Paintbrush", description: "Spray-finished cabinetry with factory-level smoothness.", image: PAINTING_IMAGES.cabinetPaint },
  { id: "commercial-painting", title: "Commercial Painting", icon: "Building", description: "Offices, retail, HOAs, and multi-family with minimal downtime.", image: PAINTING_IMAGES.commercial },
  { id: "color-consultation", title: "Color Consultation", icon: "Palette", description: "Whole-home palettes, accent walls, and exterior schemes.", image: PAINTING_IMAGES.colorConsult },
];

/** Homepage before/after — fixed painting imagery (not tied to editable project drafts). */
export const HOME_TRANSFORMATIONS = [
  {
    id: "ridgewood-interior",
    title: "Whole-Home Interior Refresh",
    location: "Ridgewood, NJ",
    category: "Interior",
    serviceId: "interior-painting",
    description: "Empty rooms transformed with designer neutrals, crisp trim, and flawless ceilings throughout the first floor.",
    beforeImage: PAINTING_IMAGES.beforeRoom,
    afterImage: PAINTING_IMAGES.afterRoom,
  },
  {
    id: "montclair-exterior",
    title: "Colonial Exterior Transformation",
    location: "Montclair, NJ",
    category: "Exterior",
    serviceId: "exterior-painting",
    description: "Weathered siding and trim refreshed with premium exterior coatings and meticulous prep.",
    beforeImage: PAINTING_IMAGES.beforeExterior,
    afterImage: PAINTING_IMAGES.afterExterior,
  },
  {
    id: "ho-ho-kus-cabinets",
    title: "Kitchen Cabinet Spray Finish",
    location: "Ho-Ho-Kus, NJ",
    category: "Cabinets",
    serviceId: "cabinet-painting",
    description: "Dated oak cabinets refinished with a factory-smooth sprayed finish — no replacement needed.",
    beforeImage: PAINTING_IMAGES.beforeKitchen,
    afterImage: PAINTING_IMAGES.afterKitchen,
  },
  {
    id: "paramus-commercial",
    title: "Medical Office Repaint",
    location: "Paramus, NJ",
    category: "Commercial",
    serviceId: "commercial-painting",
    description: "Phased hallway and exam room repaints completed over a weekend with zero patient disruption.",
    beforeImage: PAINTING_IMAGES.beforeCommercial,
    afterImage: PAINTING_IMAGES.afterCommercial,
  },
];

export const BEFORE_AFTER_PROJECTS = HOME_TRANSFORMATIONS.map(p => ({ ...p }));

export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({
  id: p.id, title: p.title, category: p.category, serviceId: p.serviceId,
  location: p.location, year: "2025",
  client: p.category === "Commercial" ? "Commercial Client" : "Private Homeowner",
  value: "—",
  description: `${p.title} completed by BrushHouse Painting in ${p.location}. Meticulous prep, premium coatings, warranty-backed.`,
  image: p.afterImage, gallery: [p.beforeImage, p.afterImage],
  beforeImage: p.beforeImage, afterImage: p.afterImage, number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 5;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  { id: "marcus-brush", name: "Marcus Brushwell", role: "Founder & Master Painter", bio: "Marcus built BrushHouse on one belief: prep is everything, and homeowners deserve gallery-level results.", image: PAINTING_IMAGES.avatarG, social: { linkedin: "#", twitter: "#" } },
  { id: "elena-rose", name: "Elena Rosetti", role: "Color & Design Director", bio: "Elena guides palette selection and finish specifications for whole-home projects.", image: PAINTING_IMAGES.avatarC, social: { linkedin: "#", twitter: "#" } },
  { id: "james-crew", name: "James Crew", role: "Lead Commercial Foreman", bio: "James runs commercial and multi-family crews across Bergen and Hudson counties.", image: PAINTING_IMAGES.avatarB, social: { linkedin: "#", twitter: "#" } },
  { id: "sophia-lin", name: "Sophia Lin", role: "Client Experience Manager", bio: "Sophia coordinates schedules, walkthroughs, and warranty documentation.", image: PAINTING_IMAGES.avatarA, social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Catherine M.", role: "Ridgewood, NJ", quote: "Our entire first floor looks like a design magazine — crisp trim, perfect ceilings, zero overspray.", avatar: PAINTING_IMAGES.avatarA, rating: 5 },
  { name: "Robert K.", role: "Montclair, NJ", quote: "Exterior transformation in three weeks. Neighbors keep asking who we hired.", avatar: PAINTING_IMAGES.avatarB, rating: 5 },
  { name: "Amanda S.", role: "Ho-Ho-Kus, NJ", quote: "Cabinet spray finish is flawless. They protected everything and cleaned daily.", avatar: PAINTING_IMAGES.avatarC, rating: 5 },
  { name: "David P.", role: "Paramus, NJ", quote: "Commercial office repaint over a weekend — zero disruption to patients Monday morning.", avatar: PAINTING_IMAGES.avatarA, rating: 5 },
  { name: "Jennifer L.", role: "Fair Lawn, NJ", quote: "Color consultation saved us from a costly mistake. The palette is perfect.", avatar: PAINTING_IMAGES.avatarB, rating: 5 },
  { name: "Michael T.", role: "Tenafly, NJ", quote: "Honest pricing, detailed proposal, and a written warranty. Highly recommend.", avatar: PAINTING_IMAGES.avatarC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "exterior-paint-timing", title: "Best Time to Paint Your Home Exterior in New Jersey", excerpt: "Temperature, humidity, and season windows for lasting results.", date: "April 12, 2025", author: "Marcus Brushwell", category: "Exterior", image: PAINTING_IMAGES.exteriorHouse, content: "Temperature, humidity, and season windows for lasting exterior results in North Jersey." },
  { id: "cabinet-paint-vs-replace", title: "Cabinet Painting vs Replacement: What Saves More?", excerpt: "When spray finishing beats a full kitchen gut.", date: "March 8, 2025", author: "Elena Rosetti", category: "Cabinets", image: PAINTING_IMAGES.cabinetPaint, content: "When spray finishing beats a full kitchen gut — cost, timeline, and durability compared." },
  { id: "interior-sheen-guide", title: "Choosing the Right Sheen for Every Room", excerpt: "Flat, eggshell, satin — where each performs best.", date: "February 14, 2025", author: "Elena Rosetti", category: "Interior", image: PAINTING_IMAGES.luxuryInterior, content: "Flat, eggshell, satin — where each performs best in kitchens, baths, and living spaces." },
  { id: "prep-matters", title: "Why 40% of Our Time Is Spent on Prep", excerpt: "The step that separates premium painters from the rest.", date: "January 22, 2025", author: "Marcus Brushwell", category: "Tips", image: PAINTING_IMAGES.painterWorking, content: "The step that separates premium painters from the rest — sanding, priming, and repair." },
  { id: "color-trends-2025", title: "2025 North Jersey Color Trends", excerpt: "Warm neutrals, earthy greens, and soft charcoals.", date: "December 5, 2024", author: "Elena Rosetti", category: "Color", image: PAINTING_IMAGES.colorConsult, content: "Warm neutrals, earthy greens, and soft charcoals dominating Bergen County interiors." },
  { id: "deck-stain-care", title: "How to Maintain Your Deck Stain", excerpt: "Annual care for longer-lasting outdoor wood.", date: "November 18, 2024", author: "James Crew", category: "Exterior", image: PAINTING_IMAGES.deckFence, content: "Annual care for longer-lasting outdoor wood finishes in New Jersey climates." },
];

export const STATS = [
  { value: 2400, label: "Projects Completed", suffix: "+" },
  { value: 18, label: "Years Experience", suffix: "+" },
  { value: 320, label: "5-Star Reviews", suffix: "+" },
  { value: 100, label: "Satisfaction Promise", suffix: "%" },
];

export const FAQ_ITEMS = [
  { question: "How long does a typical interior painting project take?", answer: "A single room takes 1–2 days. Whole-home interiors typically run 5–10 days depending on prep, square footage, and drying times between coats." },
  { question: "Do you provide free estimates?", answer: "Yes — on-site estimates are free and include written scope, product specifications, and schedule." },
  { question: "Are you licensed and insured?", answer: "BrushHouse holds NJ Home Improvement Contractor license #13VH12345678, full liability, and workers' compensation." },
  { question: "What paint brands do you use?", answer: "We specify Sherwin-Williams, Benjamin Moore, and Farrow & Ball systems matched to each surface and exposure." },
  { question: "Do you offer warranties?", answer: "Yes — written labor warranties on every project, plus manufacturer warranties on coatings." },
  { question: "What areas do you serve?", answer: "Bergen, Passaic, Morris, Essex, and Hudson counties in North Jersey." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Interior Painting", to: "/services/interior-painting" },
  { label: "Exterior Painting", to: "/services/exterior-painting" },
  { label: "Cabinet Painting", to: "/services/cabinet-painting" },
  { label: "Commercial Painting", to: "/services/commercial-painting" },
  { label: "Color Consultation", to: "/services/color-consultation" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Ridgewood, NJ", "Montclair, NJ", "Ho-Ho-Kus, NJ", "Paramus, NJ", "Fair Lawn, NJ",
  "Tenafly, NJ", "Glen Rock, NJ", "Wyckoff, NJ", "Franklin Lakes, NJ", "Englewood, NJ",
];

export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["EXTERIOR", "CABINETS", "INTERIOR", "TIPS", "COLOR"];

export const PROJECTS_PAGE_STATS = [
  { value: "2,400+", label: "Projects Completed" },
  { value: "18+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Promise" },
  { value: "4.9", label: "Google Rating" },
];

export const ABOUT_STATS = [
  { value: "18+", label: "Years Craftsmanship" },
  { value: "2,400+", label: "Projects Completed" },
  { value: "NJ", label: "HIC Licensed" },
  { value: "320+", label: "5-Star Reviews" },
  { value: "100%", label: "Prep-First Standard" },
];

export const CORE_VALUES = [
  { id: "craft", title: "Craftsmanship over speed", description: "We would rather delay a coat than rush past proper prep.", icon: "Paintbrush" as const },
  { id: "honesty", title: "Transparent proposals", description: "Line-item scopes so you know exactly what you are paying for.", icon: "Eye" as const },
  { id: "respect", title: "Respect for your home", description: "Protection, cleanup, and quiet crews on every job site.", icon: "Home" as const },
  { id: "color", title: "Color confidence", description: "Designer guidance so your palette feels cohesive room to room.", icon: "Palette" as const },
  { id: "warranty", title: "Warranty-backed work", description: "Written labor warranties and manufacturer coating coverage.", icon: "ShieldCheck" as const },
  { id: "community", title: "Local reputation", description: "We hire locally and stand behind every Bergen County project.", icon: "Heart" as const },
];

export const CERTIFICATIONS = [
  { id: "licensed", label: "NJ HIC Licensed", sub: "Home improvement contractor" },
  { id: "insured", label: "Fully Insured", sub: "Liability & workers' comp" },
  { id: "reviews", label: "4.9 Google Rating", sub: "320+ verified reviews" },
  { id: "epa", label: "EPA Lead-Safe", sub: "Certified renovation firm" },
  { id: "warranty", label: "Written Warranty", sub: "Labor guarantee on every job" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "interior", label: "INTERIOR" },
  { id: "exterior", label: "EXTERIOR" },
  { id: "warranty", label: "WARRANTY" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  interior: [
    { question: "Do you move furniture?", answer: "We coordinate furniture shifting and use floor and surface protection on every interior project." },
    { question: "How do you handle odors?", answer: "Low-VOC and zero-VOC options are available; we ventilate and schedule coats for minimal disruption." },
    { question: "Can you match existing trim?", answer: "Yes — we sample existing finishes and specify matching sheens and colors." },
  ],
  exterior: [
    { question: "What exterior surfaces do you paint?", answer: "Wood siding, fiber cement, trim, shutters, stucco, and masonry with appropriate primers." },
    { question: "Do you power wash first?", answer: "Yes — exterior projects include wash, scrape, caulk, and prime as needed." },
    { question: "When is the best season?", answer: "Late spring through early fall when temperatures and humidity are in spec for coating manufacturers." },
  ],
  warranty: [
    { question: "What warranty do you offer?", answer: "Written labor warranties vary by scope — typically 2–5 years on interior and exterior work." },
    { question: "Are coatings warrantied?", answer: "Manufacturer warranties apply to premium lines we specify in your proposal." },
    { question: "What if I need a touch-up?", answer: "Contact our office — we document every project and schedule touch-ups promptly." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Five core painting services for North Jersey homes and businesses — interior, exterior, cabinets, commercial, and color consultation with meticulous prep and premium coatings.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "peel", title: "Peeling Exterior Paint", description: "Failing coatings expose wood — schedule prep and repaint before damage spreads.", icon: "Layers" as const },
  { id: "fade", title: "Faded or Chalky Siding", description: "UV breakdown means it is time for a wash, scrape, and fresh system.", icon: "Sun" as const },
  { id: "cabinet", title: "Dated Cabinet Finish", description: "Yellowed lacquer or oak tones — spray refinishing transforms kitchens.", icon: "Paintbrush" as const },
  { id: "stain", title: "Stains & Scuffs on Walls", description: "Kids, pets, and daily life — we repair and repaint for a fresh canvas.", icon: "Home" as const },
  { id: "color", title: "Unsure About Color", description: "Book a consultation before committing to a whole-home palette.", icon: "Palette" as const },
];

export const SERVICE_DEEP_DIVES: {
  id: string; category: string; title: string; subtitle: string;
  body: [string, string]; image: string; inclusions: string[];
}[] = SERVICES.map(s => ({
  id: s.id,
  category: s.title.toUpperCase().split(" ")[0],
  title: s.title,
  subtitle: "METICULOUS PREP · PREMIUM COATINGS",
  body: [
    `${s.description} BrushHouse crews follow a documented prep-first process — repair, sand, prime, then apply coatings specified for your substrate.`,
    "Every project includes daily cleanup, protection of floors and furnishings, and a final walkthrough with warranty documentation.",
  ],
  image: s.image,
  inclusions: [
    "On-site consultation",
    "Surface repair & prep",
    "Premium primer systems",
    "Expert brush, roll & spray",
    "Daily job site cleanup",
    "Written labor warranty",
  ],
}));

export const LEAD_FORM = {
  title: "Request Your Free Painting Estimate",
  description: "Tell us about your project — we respond within one business day with next steps.",
  bullets: [
    "Free on-site estimates",
    "Written scope & schedule",
    "Premium coating specifications",
    "NJ HIC licensed & insured",
  ],
};

export const STORM_CHECKLIST = [
  { id: "photos", title: "Share Photos", description: "Send wide shots of rooms or exterior elevations to speed up your estimate." },
  { id: "consult", title: "Schedule Walkthrough", description: "We visit on-site to assess prep, access, and color direction." },
  { id: "proposal", title: "Review Proposal", description: "Line-item scope, products, timeline, and warranty terms." },
  { id: "book", title: "Reserve Your Dates", description: "Spring and fall book quickly — secure your slot with a deposit." },
];

export const INSPECTION_BENEFITS = [
  { id: "value", title: "Protect Your Investment", description: "Quality paint systems prevent moisture intrusion and wood decay.", icon: "ShieldCheck" as const },
  { id: "curb", title: "Boost Curb Appeal", description: "Exterior color and finish are the first impression buyers notice.", icon: "Home" as const },
  { id: "health", title: "Healthier Interiors", description: "Low-VOC options and HEPA sanding for occupied homes.", icon: "Heart" as const },
  { id: "speed", title: "Faster Resale", description: "Fresh, neutral palettes help listings photograph beautifully.", icon: "TrendingUp" as const },
];

export const INSPECTION_TYPES = [
  { id: "interior", title: "Interior Assessments", description: "Room-by-room scope for occupied homes.", image: PAINTING_IMAGES.luxuryInterior },
  { id: "exterior", title: "Exterior Assessments", description: "Siding, trim, and masonry evaluation.", image: PAINTING_IMAGES.exteriorHouse },
  { id: "cabinet", title: "Cabinet Refinishing", description: "Spray booth or on-site cabinet systems.", image: PAINTING_IMAGES.cabinetPaint },
  { id: "commercial", title: "Commercial Walkthroughs", description: "Phased schedules for offices and retail.", image: PAINTING_IMAGES.commercial },
];

export const INSPECTION_CHECKLIST = [
  "Substrate condition & repairs",
  "Existing coating adhesion",
  "Caulking & trim gaps",
  "Moisture & mildew checks",
  "Color & sheen recommendations",
  "Timeline & access plan",
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NJ HIC #13VH12345678 with full liability coverage.", icon: "ShieldCheck" as const },
  { id: "warranty", title: "Written Warranty", description: "Labor guarantee documented at project close.", icon: "Award" as const },
  { id: "prep", title: "Prep-First Standard", description: "Documented prep on every surface before paint.", icon: "Layers" as const },
  { id: "honest", title: "Transparent Pricing", description: "Line-item proposals — no surprise change orders.", icon: "Tag" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "craft", title: "18+ Years Craftsmanship", icon: "Paintbrush" as const },
  { id: "licensed", title: "NJ HIC Licensed", icon: "ShieldCheck" as const },
  { id: "warranty", title: "Written Warranty", icon: "Award" as const },
  { id: "color", title: "Color Consultation", icon: "Palette" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "FLEXIBLE PAYMENT OPTIONS",
  title: "Invest in Lasting Beauty",
  subtitle: "Premium painting is an investment in your home's value.",
  body: "We offer phased billing on large projects and can coordinate with partners for qualified financing on whole-home and commercial scopes.",
  image: PAINTING_IMAGES.financing,
  benefits: [
    "Phased billing on large scopes",
    "Clear milestone payments",
    "No surprise add-ons",
    "Works with renovation timelines",
  ],
  cta: { label: "DISCUSS PAYMENT OPTIONS", to: "/contact" },
};
