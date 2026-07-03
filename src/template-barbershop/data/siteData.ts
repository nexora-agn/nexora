/**
 * FORGE BARBER CO. — Premium Barbershop content registry.
 * Matte black, charcoal & warm gold palette. Industrial-luxury barbering.
 * Photography sourced from Unsplash (barbershop interiors, cuts, grooming).
 */

const u = (id: string, w = 900, h = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const BARBERSHOP_IMAGES = {
  hero: u("1585747860715-2ba37e788b70", 1920, 1080),
  heroAlt: u("1587909209111-5097ee578ec3", 1920, 1080),
  interior: u("1521590832167-7bcbfaa6381f", 1200, 900),
  interiorAlt: u("1470259078422-826894b933aa", 1200, 900),
  chairs: u("1622286342621-4bd786c2447c", 1200, 900),
  classicChair: u("1521572163474-6864f9cf17ab", 1200, 900),
  shopFront: u("1560066984-138dadb4c035", 1200, 900),
  modernShop: u("1600334129128-685c5582fd35", 1200, 900),
  lounge: u("1580618672591-eb180b1a973f", 1200, 900),
  barberPole: u("1596728325488-58c87691e9af", 1200, 900),
  haircut: u("1503951914875-452162b0f3f1", 1200, 900),
  haircutFinish: u("1544006659-f0b21884ce1d", 1200, 900),
  fade: u("1605497788044-5a32c7078486", 1200, 900),
  beardTrim: u("1493256338651-d82f7acb2b38", 1200, 900),
  shave: u("1599351431202-1e0f0137899a", 1200, 900),
  tools: u("1517832606299-7ae9b720a186", 1200, 900),
  clippers: u("1621605815971-fbc98d665033", 1200, 900),
  detailShot: u("1522529599102-193c0d76b5b6", 1200, 900),
  shopDetail: u("1601412436009-d964bd02edbc", 1200, 900),
  barberAtWork: u("1584316712724-f5d4b188fee2", 1200, 900),
  products: u("1618886614638-80e3c103d31a", 1200, 900),
  productsAlt: u("1616683693504-3ea7e9ad6fec", 1200, 900),
  groomingProducts: u("1552058544-f2b08422138a", 1200, 900),
  barberA: u("1516575150278-77136aed6920", 900, 1100),
  barberB: u("1560869713-7d0a29430803", 900, 1100),
  barberC: u("1519085360753-af0119f7cbe7", 900, 1100),
  barberD: u("1524504388940-b1c1722653e1", 900, 1100),
  barberE: u("1524638431109-93d95c968f03", 900, 1100),
  guestA: u("1500648767791-00dcc994a43e", 200, 200),
  guestB: u("1492562080023-ab3db95bfbce", 200, 200),
  guestC: u("1568602471122-7832951cc4c5", 200, 200),
  guestD: u("1519345182560-3f2917c472ef", 200, 200),
  guestE: u("1522337660859-02fbefca4702", 200, 200),
  guestF: u("1494959764136-6be9eb3c261e", 200, 200),
  guestG: u("1499996860823-5214fcc65f8f", 200, 200),
  guestH: u("1506794778202-cad84cf45f1d", 200, 200),
  contactHero: u("1560066984-138dadb4c035", 1400, 900),
  aboutHero: u("1521590832167-7bcbfaa6381f", 1400, 900),
  servicesHero: u("1503951914875-452162b0f3f1", 1400, 900),
  barbersHero: u("1584316712724-f5d4b188fee2", 1400, 900),
  galleryHero: u("1622286342621-4bd786c2447c", 1400, 900),
  giftHero: u("1618886614638-80e3c103d31a", 1400, 900),
  blogHero: u("1560066984-138dadb4c035", 1400, 900),
  reviewsHero: u("1600334129128-685c5582fd35", 1400, 900),
  loyaltyHero: u("1596728325488-58c87691e9af", 1400, 900),
  productsHero: u("1552058544-f2b08422138a", 1400, 900),
  pricingHero: u("1605497788044-5a32c7078486", 1400, 900),
} as const;

export const COMPANY = {
  name: "FORGE BARBER CO.",
  legalName: "Forge Barber Co.",
  tagline:
    "Precision cuts, master-grade beard work, and modern barbering delivered by experienced professionals in a matte-black, industrial-luxury setting.",
  phone: "(212) 555-0198",
  email: "book@forgebarberco.com",
  address: "412 Bowery Street, New York, NY 10012",
  hours: "Mon–Sat 9am–8pm · Sun 10am–5pm",
  license: "NYS Board of Barbering #BB-88291",
  fax: "",
};

export const SITE_TOP = {
  line: "Book Your Appointment — Walk-ins Welcome After 2PM",
  badges: ["Master Barbers", "Premium Products", "5-Star Rated"],
  ratingValue: "4.9",
  ratingCount: "2,400+",
  ratingLabel: "Client Reviews",
  locations: "Bowery Flagship · Uptown Lounge · Westside Studio",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 8:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 6:00 PM" },
  { days: "Sunday", hours: "10:00 AM – 5:00 PM" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-73.998%2C40.720%2C-73.978%2C40.730&layer=mapnik&marker=40.725,-73.988";

export const HOME_HERO = {
  eyebrow: "PRECISION BARBERING",
  headlineBefore: "Precision Cuts.",
  headlineHighlight: "Timeless Style.",
  headlineAfter: "",
  body:
    "Premium haircuts, beard grooming, and modern barbering delivered by experienced professionals — in a matte-black, industrial-luxury setting built for men who take their style seriously.",
  primaryCta: { label: "Book Appointment", to: "/booking" },
  secondaryCta: { label: "View Services", to: "/services" },
  image: BARBERSHOP_IMAGES.hero,
  trustPills: [
    { label: "Master Barbers", sub: "12+ years average experience", icon: "Scissors" as const },
    { label: "Premium Products", sub: "Small-batch grooming lines", icon: "Sparkles" as const },
    { label: "5-Star Rated", sub: "2,400+ verified reviews", icon: "Star" as const },
  ],
  ratingQuote: "The sharpest fades and the cleanest lines in the city — booked out weeks in advance for a reason.",
  ratingCard: {
    score: "4.9",
    countLabel: "2,400+ verified client reviews",
    avatars: [BARBERSHOP_IMAGES.guestA, BARBERSHOP_IMAGES.guestB, BARBERSHOP_IMAGES.guestC, BARBERSHOP_IMAGES.guestD],
  },
  featuredEyebrow: "SIGNATURE",
  featuredTitle: "The Forge Signature Cut",
  featuredMeta: "Haircut · Hot towel shave · Beard sculpt",
};

export const SERVICE_CATEGORIES = [
  { id: "haircuts", title: "Haircuts", description: "Precision scissor and clipper cuts, tailored to your style.", icon: "Scissors" as const, image: BARBERSHOP_IMAGES.haircut, to: "/services?category=haircuts" },
  { id: "fades", title: "Fades", description: "Skin fades, tapers, and blends with razor-sharp precision.", icon: "Zap" as const, image: BARBERSHOP_IMAGES.fade, to: "/services?category=fades" },
  { id: "beard", title: "Beard Grooming", description: "Shaping, trimming, and detailing for a distinguished look.", icon: "Sparkles" as const, image: BARBERSHOP_IMAGES.beardTrim, to: "/services?category=beard" },
  { id: "shaves", title: "Hot Towel Shaves", description: "Traditional straight-razor shaves with hot towel service.", icon: "Droplets" as const, image: BARBERSHOP_IMAGES.shave, to: "/services?category=shaves" },
  { id: "color", title: "Hair Coloring", description: "Gray blending and full color, done with care and precision.", icon: "Palette" as const, image: BARBERSHOP_IMAGES.groomingProducts, to: "/services?category=color" },
  { id: "kids-seniors", title: "Kids & Seniors", description: "Patient, friendly cuts for the youngest and most experienced clients.", icon: "Users" as const, image: BARBERSHOP_IMAGES.interiorAlt, to: "/services?category=kids-seniors" },
  { id: "styling", title: "Hair Styling", description: "Wash, blow-dry, and finish for special occasions or everyday polish.", icon: "Wind" as const, image: BARBERSHOP_IMAGES.haircutFinish, to: "/services?category=styling" },
  { id: "packages", title: "Grooming Packages", description: "Curated multi-service experiences for the complete refresh.", icon: "Gift" as const, image: BARBERSHOP_IMAGES.lounge, to: "/services?category=packages" },
] as const;

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  name?: string;
  description: string;
  price: number;
  priceLabel: string;
  duration: string;
  image: string;
  icon: string;
  popular: boolean;
  badges: string[];
}

export const SERVICES: ServiceItem[] = [
  { id: "haircut", categoryId: "haircuts", title: "Signature Haircut", name: "Signature Haircut", description: "Precision scissor-over-comb cut, tailored to your face shape and style.", price: 45, priceLabel: "$45", duration: "45 min", image: BARBERSHOP_IMAGES.haircut, icon: "Scissors" as const, popular: true, badges: ["popular"] as const },
  { id: "skin-fade", categoryId: "fades", title: "Skin Fade", name: "Skin Fade", description: "Bald-to-skin fade blended seamlessly into your preferred length on top.", price: 50, priceLabel: "$50", duration: "50 min", image: BARBERSHOP_IMAGES.fade, icon: "Zap" as const, popular: true, badges: ["popular", "signature"] as const },
  { id: "beard-trim", categoryId: "beard", title: "Beard Trim", name: "Beard Trim", description: "Clean lineup and trim to keep your beard sharp between full shapes.", price: 25, priceLabel: "$25", duration: "20 min", image: BARBERSHOP_IMAGES.beardTrim, icon: "Sparkles" as const, popular: false, badges: [] as const },
  { id: "beard-shaping", categoryId: "beard", title: "Beard Shaping", description: "Full shape and sculpt with straight-razor detailing and beard oil finish.", price: 35, priceLabel: "$35", duration: "30 min", image: BARBERSHOP_IMAGES.beardTrim, icon: "Sparkles" as const, popular: true, badges: ["popular"] as const },
  { id: "hot-towel-shave", categoryId: "shaves", title: "Hot Towel Shave", description: "Traditional straight-razor shave with hot towels and pre-shave oil.", price: 55, priceLabel: "$55", duration: "45 min", image: BARBERSHOP_IMAGES.shave, icon: "Droplets" as const, popular: true, badges: ["signature"] as const },
  { id: "kids-haircut", categoryId: "kids-seniors", title: "Kids Haircut", description: "Patient, friendly cuts for clients 12 and under.", price: 30, priceLabel: "$30", duration: "30 min", image: BARBERSHOP_IMAGES.interiorAlt, icon: "Users" as const, popular: false, badges: [] as const },
  { id: "senior-haircut", categoryId: "kids-seniors", title: "Senior Haircut", description: "Classic cuts for clients 65+, with complimentary hot towel neck shave.", price: 35, priceLabel: "$35", duration: "30 min", image: BARBERSHOP_IMAGES.classicChair, icon: "Users" as const, popular: false, badges: [] as const },
  { id: "hair-wash", categoryId: "styling", title: "Hair Wash", description: "Deep-clean wash with premium shampoo and scalp massage.", price: 15, priceLabel: "$15", duration: "15 min", image: BARBERSHOP_IMAGES.productsAlt, icon: "Droplets" as const, popular: false, badges: [] as const },
  { id: "hair-styling", categoryId: "styling", title: "Hair Styling", description: "Wash, blow-dry, and product finish for a polished, event-ready look.", price: 30, priceLabel: "$30", duration: "30 min", image: BARBERSHOP_IMAGES.haircutFinish, icon: "Wind" as const, popular: false, badges: [] as const },
  { id: "buzz-cut", categoryId: "haircuts", title: "Buzz Cut", description: "All-over clipper cut at your preferred guard length.", price: 25, priceLabel: "$25", duration: "20 min", image: BARBERSHOP_IMAGES.clippers, icon: "Scissors" as const, popular: false, badges: [] as const },
  { id: "scissor-cut", categoryId: "haircuts", title: "Scissor Cut", description: "Classic all-scissor cut for a textured, natural finish.", price: 50, priceLabel: "$50", duration: "50 min", image: BARBERSHOP_IMAGES.haircut, icon: "Scissors" as const, popular: false, badges: [] as const },
  { id: "razor-line-up", categoryId: "fades", title: "Razor Line Up", description: "Crisp straight-razor hairline and edge-up between full cuts.", price: 20, priceLabel: "$20", duration: "15 min", image: BARBERSHOP_IMAGES.tools, icon: "Zap" as const, popular: false, badges: [] as const },
  { id: "hair-coloring", categoryId: "color", title: "Hair Coloring", description: "Gray blending or full color, matched to your natural tone.", price: 65, priceLabel: "From $65", duration: "60 min", image: BARBERSHOP_IMAGES.groomingProducts, icon: "Palette" as const, popular: false, badges: [] as const },
  { id: "facial-treatment", categoryId: "beard", title: "Facial Treatment", description: "Deep-clean facial with steam, extraction, and cooling mask.", price: 60, priceLabel: "$60", duration: "40 min", image: BARBERSHOP_IMAGES.detailShot, icon: "Sparkles" as const, popular: false, badges: [] as const },
  { id: "grooming-package", categoryId: "packages", title: "Men's Grooming Package", description: "Haircut, beard sculpt, hot towel shave, and facial — the complete refresh.", price: 120, priceLabel: "$120", duration: "90 min", image: BARBERSHOP_IMAGES.lounge, icon: "Gift" as const, popular: true, badges: ["popular", "best-value"] as const },
];

export const PACKAGES = [
  {
    id: "classic-gentleman",
    title: "Classic Gentleman",
    description: "Our foundational experience — a precision haircut paired with a clean beard lineup.",
    price: 65,
    priceLabel: "$65",
    duration: "60 min",
    image: BARBERSHOP_IMAGES.haircut,
    includes: ["Signature haircut", "Beard trim & lineup", "Hot towel finish", "Style consultation"],
    popular: false,
  },
  {
    id: "executive-grooming",
    title: "Executive Grooming",
    description: "Boardroom-ready polish — haircut, beard shaping, and a scalp treatment.",
    price: 95,
    priceLabel: "$95",
    duration: "75 min",
    image: BARBERSHOP_IMAGES.barberAtWork,
    includes: ["Signature haircut", "Beard shaping", "Scalp treatment massage", "Hot towel shave finish", "Premium styling"],
    popular: true,
  },
  {
    id: "premium-beard-experience",
    title: "Premium Beard Experience",
    description: "A dedicated beard ritual for the discerning gentleman — shape, oil, and steam.",
    price: 75,
    priceLabel: "$75",
    duration: "50 min",
    image: BARBERSHOP_IMAGES.beardTrim,
    includes: ["Beard shaping & sculpt", "Hot towel steam", "Straight-razor lineup", "Beard oil & balm treatment"],
    popular: false,
  },
  {
    id: "vip-grooming-package",
    title: "VIP Grooming Package",
    description: "Our most complete experience — cut, shave, facial, and styling with priority booking.",
    price: 165,
    priceLabel: "$165",
    duration: "120 min",
    image: BARBERSHOP_IMAGES.lounge,
    includes: ["Signature haircut", "Hot towel straight-razor shave", "Facial treatment", "Beard sculpt", "Priority barber selection", "Complimentary beverage"],
    popular: true,
  },
  {
    id: "wedding-groom-package",
    title: "Wedding Groom Package",
    description: "Look sharp on the big day — a private grooming session for the groom (and his party).",
    price: 195,
    priceLabel: "From $195",
    duration: "90 min",
    image: BARBERSHOP_IMAGES.classicChair,
    includes: ["Private studio session", "Signature haircut", "Hot towel shave", "Beard sculpt & styling", "Groomsmen group rates available"],
    popular: false,
  },
];

export const EXPERIENCE_HIGHLIGHTS = [
  { id: "experienced", title: "Experienced Barbers", description: "Every barber on our floor brings 8+ years of craft, trained in classic and modern technique.", icon: "Award" as const, to: "/barbers" },
  { id: "products", title: "Premium Products", description: "Small-batch pomades, oils, and tonics chosen for performance, not just packaging.", icon: "Sparkles" as const, to: "/products" },
  { id: "equipment", title: "Modern Equipment", description: "Freshly sanitized, professional-grade clippers, razors, and tools for every guest.", icon: "Zap" as const, to: "/gallery" },
  { id: "personalized", title: "Personalized Service", description: "A consultation before every cut — we listen before we pick up the shears.", icon: "MessageSquare" as const, to: "/booking" },
  { id: "relaxing", title: "Relaxing Environment", description: "Industrial-luxury interiors, curated playlists, and a pour of something good.", icon: "Armchair" as const, to: "/gallery" },
  { id: "precision", title: "Precision Grooming", description: "Razor-sharp lines and seamless fades — precision is the whole point.", icon: "Scissors" as const, to: "/services" },
  { id: "hygiene", title: "Hygiene Standards", description: "Hospital-grade sanitation between every single client, every single time.", icon: "ShieldCheck" as const, to: "/about" },
  { id: "satisfaction", title: "Customer Satisfaction", description: "A 4.9-star average across 2,400+ reviews — we earn every appointment back.", icon: "Heart" as const, to: "/reviews" },
];

export const PRODUCTS = [
  { id: "matte-pomade", name: "Forge Matte Pomade", category: "Styling", description: "Strong hold, zero shine — all-day control for textured looks.", price: 22, priceLabel: "$22", image: BARBERSHOP_IMAGES.productsAlt },
  { id: "hair-wax", name: "Sculpting Hair Wax", category: "Styling", description: "Pliable hold for natural texture and separation.", price: 20, priceLabel: "$20", image: BARBERSHOP_IMAGES.products },
  { id: "beard-oil", name: "Forge Beard Oil", category: "Beard Care", description: "Sandalwood & cedar blend that softens and conditions.", price: 24, priceLabel: "$24", image: BARBERSHOP_IMAGES.beardTrim },
  { id: "shampoo", name: "Daily Clarifying Shampoo", category: "Hair Care", description: "Sulfate-free formula that cleans without stripping.", price: 18, priceLabel: "$18", image: BARBERSHOP_IMAGES.groomingProducts },
  { id: "conditioner", name: "Restorative Conditioner", category: "Hair Care", description: "Lightweight conditioning for everyday softness and shine.", price: 18, priceLabel: "$18", image: BARBERSHOP_IMAGES.productsAlt },
  { id: "styling-powder", name: "Volumizing Styling Powder", category: "Styling", description: "Instant texture and root lift for fine or flat hair.", price: 19, priceLabel: "$19", image: BARBERSHOP_IMAGES.products },
  { id: "clippers", name: "Pro Series Clippers", category: "Tools", description: "The same clippers our barbers use — cordless, precise, quiet.", price: 129, priceLabel: "$129", image: BARBERSHOP_IMAGES.clippers },
  { id: "boar-brush", name: "Boar Bristle Brush", category: "Tools", description: "Distributes natural oils and smooths for a finished look.", price: 26, priceLabel: "$26", image: BARBERSHOP_IMAGES.tools },
];

export const GALLERY_IMAGES = [
  { id: "gal-1", src: BARBERSHOP_IMAGES.interior, alt: "Matte black barbershop interior", category: "interior" as const },
  { id: "gal-2", src: BARBERSHOP_IMAGES.chairs, alt: "Row of vintage barber chairs", category: "chairs" as const },
  { id: "gal-3", src: BARBERSHOP_IMAGES.haircut, alt: "Barber delivering a precision haircut", category: "haircuts" as const },
  { id: "gal-4", src: BARBERSHOP_IMAGES.fade, alt: "Sharp skin fade close-up", category: "haircuts" as const },
  { id: "gal-5", src: BARBERSHOP_IMAGES.beardTrim, alt: "Beard trim and shaping session", category: "beard" as const },
  { id: "gal-6", src: BARBERSHOP_IMAGES.shave, alt: "Hot towel straight-razor shave", category: "beard" as const },
  { id: "gal-7", src: BARBERSHOP_IMAGES.tools, alt: "Barber tools laid out on the station", category: "details" as const },
  { id: "gal-8", src: BARBERSHOP_IMAGES.products, alt: "Grooming products on display", category: "products" as const },
  { id: "gal-9", src: BARBERSHOP_IMAGES.lounge, alt: "Waiting lounge with leather seating", category: "lounge" as const },
  { id: "gal-10", src: BARBERSHOP_IMAGES.barberAtWork, alt: "Barber at work on a client", category: "team" as const },
  { id: "gal-11", src: BARBERSHOP_IMAGES.shopFront, alt: "Forge Barber Co. storefront", category: "interior" as const },
  { id: "gal-12", src: BARBERSHOP_IMAGES.detailShot, alt: "Close detail of a finished cut", category: "details" as const },
];

export const GIFT_CARD_TIERS = [
  { id: "gc-50", amount: 50, label: "$50", description: "A haircut on us, or credit toward any single service." },
  { id: "gc-100", amount: 100, label: "$100", description: "Perfect for a full grooming package for someone special." },
  { id: "gc-200", amount: 200, label: "$200", description: "Covers the VIP Grooming Package with room to spare." },
  { id: "gc-500", amount: 500, label: "$500", description: "The ultimate gift — months of premium grooming, on us." },
];

export const LOYALTY_TIERS = [
  {
    id: "regular",
    name: "Regular",
    threshold: "Every client, from visit one",
    benefits: ["Earn 1 point per $1 spent", "Birthday month 15% off", "Priority text reminders"],
  },
  {
    id: "gold",
    name: "Gold Member",
    threshold: "After 6 visits per year",
    benefits: ["Everything in Regular", "10% off every visit", "Priority booking windows", "Free beard trim add-on"],
  },
  {
    id: "black-card",
    name: "Black Card",
    threshold: "After 12 visits per year",
    benefits: ["Everything in Gold", "15% off every visit", "Guaranteed same-day availability", "Complimentary VIP package annually", "Referral rewards — $20 credit per friend"],
  },
];

export const RESERVATION_SETTINGS = {
  maxGuests: 1,
  slotInterval: 30,
  openTime: "09:00",
  closeTime: "20:00",
  closedDays: [] as number[],
  tablesPerSlot: 6,
  waitlistEnabled: true,
  requireApproval: false,
};

export const BOOKING_SETTINGS = RESERVATION_SETTINGS;

export const SERVICES_RIBBON = SERVICE_CATEGORIES.slice(0, 5).map(c => ({
  id: c.id,
  label: c.title.toUpperCase(),
  icon: c.icon,
  description: c.description,
  to: c.to,
}));

export const CAPABILITIES = EXPERIENCE_HIGHLIGHTS.slice(0, 4);

export const PROCESS_STEPS = [
  { id: "book", label: "Book", description: "Reserve your barber, service, and time online in under a minute." },
  { id: "arrive", label: "Arrive", description: "Check in at the front desk and settle into our lounge with a drink." },
  { id: "consult", label: "Consult", description: "A quick conversation on length, style, and finish before we start." },
  { id: "cut", label: "Cut", description: "Your barber delivers a precise cut, fade, or grooming service." },
  { id: "style", label: "Finish", description: "Hot towel, product finish, and a final mirror check before you leave." },
];

export const HOME_STATS = [
  { value: "35,000+", label: "Haircuts Completed", icon: "Scissors" as const },
  { value: "12,000+", label: "Happy Clients", icon: "Users" as const },
  { value: "14", label: "Years of Experience", icon: "Award" as const },
  { value: "4.9", label: "Five-Star Reviews", icon: "Star" as const },
];

export const WHY_BENEFITS = EXPERIENCE_HIGHLIGHTS.map(h => ({
  title: h.title,
  description: h.description,
  icon: h.icon,
}));

export const SERVICE_LIST = SERVICE_CATEGORIES.map(c => ({
  id: c.id,
  title: c.title,
  icon: c.icon,
  description: c.description,
  image: c.image,
}));

export const SERVICE_DEEP_DIVES: {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  body: [string, string];
  image: string;
  inclusions: string[];
}[] = [
  {
    id: "haircuts",
    category: "HAIRCUTS",
    title: "Haircuts, Fades & Buzz Cuts",
    subtitle: "Precision cutting for every style",
    body: [
      "From classic scissor cuts to razor-sharp skin fades, every haircut starts with a real consultation — we ask before we cut.",
      "Our barbers train continuously on the latest techniques while keeping a deep respect for the fundamentals of classic barbering.",
    ],
    image: BARBERSHOP_IMAGES.haircut,
    inclusions: ["Consultation before every cut", "Precision clipper & scissor work", "Neck shave & lineup finish", "Style & product recommendation"],
  },
  {
    id: "beard",
    category: "BEARD GROOMING",
    title: "Beard Trims & Shaping",
    subtitle: "Sculpted, healthy, distinguished",
    body: [
      "A great beard needs more than a trimmer — it needs shape, symmetry, and the right product regimen.",
      "We map your beard to your face shape, clean up the lines with a straight razor, and finish with oil that actually conditions.",
    ],
    image: BARBERSHOP_IMAGES.beardTrim,
    inclusions: ["Face-shape beard mapping", "Straight-razor lineup", "Hot towel prep", "Beard oil & balm finish"],
  },
  {
    id: "shaves",
    category: "HOT TOWEL SHAVES",
    title: "Traditional Straight-Razor Shaves",
    subtitle: "An old-world ritual, done right",
    body: [
      "Multiple hot towel applications, warm lather, and a straight razor — the full traditional shave experience.",
      "It's slower on purpose. Twenty minutes of hot towels and warm lather before the blade even touches your skin.",
    ],
    image: BARBERSHOP_IMAGES.shave,
    inclusions: ["Pre-shave oil treatment", "Multiple hot towel rounds", "Straight-razor double pass", "Cooling aftershave balm"],
  },
  {
    id: "color",
    category: "HAIR COLORING",
    title: "Gray Blending & Full Color",
    subtitle: "Natural-looking results, matched precisely",
    body: [
      "Whether you want to blend the grays or go for a full color change, our colorists match tone and undertone with care.",
      "We use ammonia-light formulas designed for men's hair and scalp comfort.",
    ],
    image: BARBERSHOP_IMAGES.groomingProducts,
    inclusions: ["Color consultation & patch test", "Gray blending or full color", "Scalp-safe formulas", "Aftercare product guidance"],
  },
  {
    id: "kids-seniors",
    category: "KIDS & SENIORS",
    title: "Kids & Senior Haircuts",
    subtitle: "Patient, friendly service for every age",
    body: [
      "From a first haircut to a decades-long regular, our barbers take the time to make every client comfortable.",
      "Senior cuts include a complimentary hot towel neck shave — a small touch that makes a big difference.",
    ],
    image: BARBERSHOP_IMAGES.interiorAlt,
    inclusions: ["Patient, unrushed service", "Kid-friendly styling chairs", "Complimentary senior neck shave", "Flexible scheduling"],
  },
];

export const TEAM = [
  {
    id: "marcus-vale",
    name: "Marcus Vale",
    role: "Founder & Master Barber",
    bio: "Marcus opened Forge Barber Co. after a decade cutting hair in NYC's top shops. Known for razor-sharp fades and a calm chair-side presence, he trained every barber on our floor personally.",
    image: BARBERSHOP_IMAGES.barberA,
    experience: "16 years",
    specialties: ["Skin Fades", "Straight-Razor Shaves", "Classic Cuts"],
    rating: 5.0,
    reviewCount: 640,
    social: { instagram: "#", linkedin: "#", email: "marcus@forgebarberco.com" },
  },
  {
    id: "diego-torres",
    name: "Diego Torres",
    role: "Senior Barber",
    bio: "Diego specializes in intricate fades and hair design, bringing a modern edge to every appointment. His clients follow him for the detail work — no line is ever out of place.",
    image: BARBERSHOP_IMAGES.barberB,
    experience: "10 years",
    specialties: ["Skin Fades", "Hair Designs", "Beard Sculpting"],
    rating: 4.9,
    reviewCount: 512,
    social: { instagram: "#", linkedin: "#", email: "diego@forgebarberco.com" },
  },
  {
    id: "elijah-brooks",
    name: "Elijah Brooks",
    role: "Barber & Beard Specialist",
    bio: "Elijah's specialty is the beard — mapping, shaping, and conditioning every client toward their healthiest, sharpest look. His hot towel shave is a shop favorite.",
    image: BARBERSHOP_IMAGES.barberC,
    experience: "8 years",
    specialties: ["Beard Shaping", "Hot Towel Shaves", "Facial Treatments"],
    rating: 4.9,
    reviewCount: 398,
    social: { instagram: "#", linkedin: "#", email: "elijah@forgebarberco.com" },
  },
  {
    id: "sam-whitfield",
    name: "Sam Whitfield",
    role: "Barber",
    bio: "Sam brings a background in classical barbering and a steady hand to every scissor cut. Popular with clients who want a timeless, low-maintenance style.",
    image: BARBERSHOP_IMAGES.barberD,
    experience: "6 years",
    specialties: ["Scissor Cuts", "Classic Styles", "Kids Cuts"],
    rating: 4.8,
    reviewCount: 276,
    social: { instagram: "#", linkedin: "#", email: "sam@forgebarberco.com" },
  },
  {
    id: "leo-nakamura",
    name: "Leo Nakamura",
    role: "Colorist & Barber",
    bio: "Leo leads our color program — from subtle gray blending to full transformations — while holding his own as a sharp all-around barber.",
    image: BARBERSHOP_IMAGES.barberE,
    experience: "9 years",
    specialties: ["Hair Coloring", "Gray Blending", "Modern Fades"],
    rating: 4.9,
    reviewCount: 341,
    social: { instagram: "#", linkedin: "#", email: "leo@forgebarberco.com" },
  },
];

export const TESTIMONIALS = [
  { name: "James Carter", role: "Regular Client, 3 years", quote: "Marcus has cut my hair for three years and it's never once been off. The consultation before every cut is what keeps me coming back.", avatar: BARBERSHOP_IMAGES.guestA, rating: 5 },
  { name: "David Kim", role: "Skin Fade Client", quote: "Best fade I've had in this city, full stop. Diego's attention to detail on the blend is unreal.", avatar: BARBERSHOP_IMAGES.guestB, rating: 5 },
  { name: "Robert Alvarez", role: "Hot Towel Shave Client", quote: "The hot towel shave is worth it alone. Slow, relaxing, and my skin has never felt better after a shave.", avatar: BARBERSHOP_IMAGES.guestC, rating: 5 },
  { name: "Michael Chen", role: "VIP Package Client", quote: "Booked the VIP package before a big interview and walked out looking like a different person. Impeccable service.", avatar: BARBERSHOP_IMAGES.guestD, rating: 5 },
  { name: "Anthony Reyes", role: "Beard Grooming Client", quote: "Elijah mapped my beard to my face shape and it completely changed how I look. Wish I'd found this place years ago.", avatar: BARBERSHOP_IMAGES.guestE, rating: 5 },
  { name: "Thomas Nguyen", role: "Wedding Groom Package", quote: "Booked the wedding package for me and four groomsmen — smooth, on time, and everyone looked sharp for the photos.", avatar: BARBERSHOP_IMAGES.guestF, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "how-to-maintain-a-fade", title: "How to Maintain a Skin Fade Between Cuts", excerpt: "Simple habits to keep your fade looking fresh for the full two to three weeks.", date: "March 3, 2026", author: "Diego Torres", category: "Style Trends", image: BARBERSHOP_IMAGES.fade, content: "A skin fade grows out fastest at the neckline — here's how to extend the life of your cut.", readTime: "4 min" },
  { id: "beard-oil-vs-balm", title: "Beard Oil vs. Beard Balm: What's the Difference?", excerpt: "Elijah breaks down when to use oil, when to use balm, and why you might need both.", date: "February 18, 2026", author: "Elijah Brooks", category: "Beard Care", image: BARBERSHOP_IMAGES.beardTrim, content: "Oil conditions the skin underneath; balm styles and holds. Most beards benefit from both.", readTime: "5 min" },
  { id: "picking-the-right-barber", title: "How to Pick the Right Barber for Your Style", excerpt: "Not every barber specializes in every cut — here's how to match yourself to the right chair.", date: "February 2, 2026", author: "Marcus Vale", category: "Grooming Advice", image: BARBERSHOP_IMAGES.barberAtWork, content: "Look at a barber's portfolio for the specific style you want, not just general skill.", readTime: "6 min" },
  { id: "product-review-pomades", title: "We Tested 5 Pomades — Here's What Won", excerpt: "A side-by-side breakdown of hold, shine, and washability from our product shelf.", date: "January 20, 2026", author: "Sam Whitfield", category: "Product Reviews", image: BARBERSHOP_IMAGES.products, content: "Matte pomades win for all-day hold with zero shine — full breakdown inside.", readTime: "5 min" },
  { id: "hair-care-tips-winter", title: "Winter Hair Care Tips for Men", excerpt: "Cold air and indoor heating dry out both hair and scalp — here's how to fight back.", date: "January 8, 2026", author: "Leo Nakamura", category: "Hair Care Tips", image: BARBERSHOP_IMAGES.groomingProducts, content: "A hydrating shampoo rotation and a monthly scalp treatment go a long way in winter.", readTime: "4 min" },
  { id: "barbershop-news-expansion", title: "Forge Barber Co. Is Expanding Uptown", excerpt: "We're opening a second chair-count studio uptown this spring — here's what to expect.", date: "December 12, 2025", author: "Forge Team", category: "Barber News", image: BARBERSHOP_IMAGES.shopFront, content: "Same standards, same barbers rotating through, twice the appointment availability.", readTime: "3 min" },
];

export const STATS = [
  { value: 2400, label: "Five-Star Reviews", suffix: "+" },
  { value: 35000, label: "Haircuts Completed", suffix: "+" },
  { value: 14, label: "Years of Craft", suffix: "" },
  { value: 12000, label: "Happy Clients", suffix: "+" },
];

export const FAQ_ITEMS = [
  { question: "Do I need an appointment?", answer: "We recommend booking online to guarantee your preferred barber and time, though walk-ins are welcome after 2pm based on availability." },
  { question: "Can I book online?", answer: "Yes — use our online booking system to choose your barber, service, date, and time. You'll get an instant confirmation." },
  { question: "Do you accept walk-ins?", answer: "Walk-ins are welcome any time, but wait times can be longer during peak hours (Thursday–Saturday afternoons). Booking ahead guarantees your spot." },
  { question: "Which barber should I choose?", answer: "Check each barber's specialties on our Barbers page — if you're not sure, book 'Any Available Barber' and our front desk will match you to the best fit for your style." },
  { question: "What payment methods are accepted?", answer: "We accept all major credit cards, Apple Pay, Google Pay, and cash. Gratuity can be added at checkout or given directly to your barber." },
  { question: "Can I reschedule my appointment?", answer: "Yes — use the manage booking link in your confirmation email, or contact us directly. We ask for at least 4 hours' notice to avoid a late-cancellation fee." },
  { question: "How far in advance should I book?", answer: "Popular barbers and weekend slots can book out 1–2 weeks ahead. Weekday mornings usually have same-week availability." },
  { question: "Do you offer gift cards?", answer: "Yes — digital and printable gift cards are available in any amount through our Gift Cards page." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Barbers", path: "/barbers" },
  { label: "Gallery", path: "/gallery" },
  { label: "Pricing", path: "/pricing" },
  { label: "Book Online", path: "/booking" },
  { label: "Reviews", path: "/reviews" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = SERVICE_CATEGORIES.slice(0, 6).map(c => ({
  label: c.title,
  to: c.to,
}));

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "About Us", to: "/about" },
  { label: "Our Barbers", to: "/barbers" },
  { label: "Gallery", to: "/gallery" },
  { label: "Pricing", to: "/pricing" },
  { label: "Products", to: "/products" },
  { label: "Loyalty Program", to: "/loyalty" },
  { label: "Gift Cards", to: "/gift-cards" },
  { label: "Blog", to: "/blog" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Book Appointment", to: "/booking" },
  { label: "View Pricing", to: "/pricing" },
  { label: "Gift Cards", to: "/gift-cards" },
  { label: "FAQ", to: "/faq" },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  client: string;
  value: string;
  description: string;
  image: string;
  gallery: string[];
  number: number;
}

export const PROJECTS: ProjectItem[] = GALLERY_IMAGES.map((g, i) => ({
  id: g.id,
  title: g.alt,
  category: g.category as string,
  location: g.category.replace(/-/g, " "),
  year: "2026",
  client: "",
  value: "",
  description: g.alt,
  image: g.src,
  gallery: [g.src],
  number: i + 1,
}));

export const PROJECTS_PAGE_STATS = [
  { value: "500+", label: "Transformations Shared" },
  { value: "5", label: "Master Barbers" },
  { value: "3", label: "Studio Locations" },
  { value: "4.9", label: "Average Rating" },
];

export const ABOUT_STATS = [
  { value: "14", label: "Years of Craft" },
  { value: "12,000+", label: "Happy Clients" },
  { value: "35,000+", label: "Haircuts Completed" },
  { value: "4.9", label: "Average Rating" },
  { value: "5", label: "Master Barbers" },
];

export const CORE_VALUES = [
  { id: "passion", title: "Passion", description: "Every barber here chose this craft — cutting hair isn't a job, it's the work.", icon: "Heart" as const },
  { id: "craftsmanship", title: "Craftsmanship", description: "We treat every cut as a piece of work worth getting exactly right.", icon: "Scissors" as const },
  { id: "community", title: "Community", description: "A neighborhood shop at heart — regulars become familiar faces, then friends.", icon: "Users" as const },
  { id: "experience", title: "Experience", description: "Our newest barber has six years in the chair; our founder has sixteen.", icon: "Award" as const },
  { id: "professionalism", title: "Professionalism", description: "On time, sanitized, and dialed in — the fundamentals, done consistently.", icon: "ShieldCheck" as const },
  { id: "attention-to-detail", title: "Attention to Detail", description: "The difference between good and great is always in the finishing touches.", icon: "Sparkles" as const },
];

export const CERTIFICATIONS = [
  { id: "licensed", label: "NYS Licensed Barbershop", sub: "Board of Barbering #BB-88291" },
  { id: "master-certified", label: "Master Barber Certified", sub: "5 barbers, 8+ years each" },
  { id: "hygiene", label: "Hygiene Excellence Award", sub: "City health inspection, 3 years running" },
  { id: "rating", label: "4.9 Average Rating", sub: "2,400+ verified reviews" },
  { id: "best-of", label: "Best Barbershop 2025", sub: "NYC Grooming Awards" },
];

export const SERVICES_PAGE_INTRO =
  "Every service starts with a real consultation. From precision fades to traditional straight-razor shaves, explore the full Forge Barber Co. menu below.";

export const COMMERCIAL_FITOUT_CARDS = PACKAGES.slice(0, 4).map(p => ({
  id: p.id,
  title: p.title,
  description: p.description,
  icon: "Gift" as const,
}));

export const LEAD_FORM = {
  title: "Book Your Appointment",
  description: "Tell us your preferred barber, service, and time — we'll confirm instantly and send a reminder before your visit.",
  subtitle: "Tell us your preferred barber, service, and time — we'll confirm instantly and send a reminder before your visit.",
  submitLabel: "Book Appointment",
  successMessage: "Thank you. Your appointment request has been received — check your email for confirmation.",
  bullets: [
    "Instant online confirmation",
    "Pick your preferred barber",
    "Free reschedule up to 4 hours ahead",
    "Reminder texts & emails before your visit",
  ],
};

export const BLOG_TAGS = ["Hair Care Tips", "Beard Care", "Grooming Advice", "Product Reviews", "Style Trends", "Barber News"];

export const BLOG_LIST_PAGE_SIZE = 6;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const META_DEFAULT =
  "Forge Barber Co. — premium barbershop for precision cuts, beard grooming, and modern barbering in an industrial-luxury setting.";

export const CTA_SECTION = {
  headline: "Ready for Your Next Fresh Cut?",
  primaryCta: { label: "Book Appointment", to: "/booking" },
  secondaryCta: { label: "Call Now", to: `tel:${COMPANY.phone.replace(/[^+\d]/g, "")}` },
};

export const ABOUT_TIMELINE = [
  { year: "2012", title: "Forge Opens", description: "Marcus Vale opens a three-chair shop on the Bowery with one simple rule: every cut earns the next visit." },
  { year: "2016", title: "Team Expands to Five Barbers", description: "Diego, Elijah, and Sam join the floor, each bringing a specialty that rounds out the shop." },
  { year: "2019", title: "First 'Best Barbershop' Award", description: "Recognized by the NYC Grooming Awards for craftsmanship and consistency." },
  { year: "2023", title: "Loyalty Program Launches", description: "Forge Gold and Black Card memberships reward our most loyal regulars." },
  { year: "2026", title: "Uptown Studio Opens", description: "A second location opens uptown, doubling weekly appointment availability." },
];

export const AWARDS = [
  { year: "2025", title: "Best Barbershop", org: "NYC Grooming Awards" },
  { year: "2024", title: "Hygiene Excellence Award", org: "NYC Dept. of Health" },
  { year: "2023", title: "Top-Rated Grooming Studio", org: "CityBest Reviews" },
];

export const ABOUT_HERO_BADGES = [
  { label: "14 Years Open", icon: "Calendar" as const },
  { label: "4.9 Rating", icon: "Star" as const },
  { label: "5 Master Barbers", icon: "Scissors" as const },
  { label: "Best Barbershop 2025", icon: "Award" as const },
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NYS Board of Barbering certified.", icon: "ShieldCheck" as const },
  { id: "rated", title: "4.9 Average Rating", description: "2,400+ verified reviews.", icon: "Star" as const },
  { id: "products", title: "Premium Products", description: "Small-batch grooming lines.", icon: "Sparkles" as const },
  { id: "parking", title: "Free Street Parking", description: "Metered parking directly outside.", icon: "MapPin" as const },
];

export const PARKING_INFO =
  "Free metered street parking is available directly outside the shop after 6pm and on weekends. A paid garage is located one block north on Elizabeth Street.";
