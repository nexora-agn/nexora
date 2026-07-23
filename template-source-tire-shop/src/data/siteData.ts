/**
 * NEXORA TIRES — Austin, TX tire shop.
 * Palette: asphalt black, safety yellow, steel gray, white.
 */

import { DEMO_TIRES } from "./tires";

export { DEMO_TIRES, DEMO_PRODUCTS } from "./tires";

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/** Verified Unsplash IDs — tires, wheels, cars, shop floors only */
export const LUXURY_IMAGES = {
  hero: u("1558618666-fcd25c85cd64", 1920, 1080),
  heroAlt: u("1605559424843-9e4c228bf1c2", 1920, 1080),
  showroom: u("1492144534655-ae79c964c9d7", 1400, 900),
  lot: u("1606664515524-ed2f786a0bd6", 1200, 900),
  keys: u("1617814076367-b759c7d7e738", 1200, 900),
  evCharge: u("1486496572940-2bb2341fdbdf", 1200, 900),
  villa: u("1517524008697-84bbe3c3fd98", 1200, 900),
  penthouse: u("1549924231-f129b911e442", 1200, 900),
  apartment: u("1563720223185-11003d516935", 1200, 900),
  waterfront: u("1617469767053-d3b523a0b982", 1200, 900),
  interior: u("1503376780353-7e6692767b70", 1200, 900),
  kitchen: u("1583121274602-3e2820c69888", 1200, 900),
  pool: u("1494976388531-d1058494cdd8", 1200, 900),
  skyline: u("1574023240744-64c47c8c0676", 1200, 900),
  neighborhood: u("1653565217811-85b41bcd1edb", 1200, 900),
  development: u("1593941707874-ef25b8b4a92b", 1200, 900),
  office: u("1692406069831-0bb7ea297645", 1200, 900),
  contact: u("1618642624018-a370cbf3cd80", 1400, 900),
  about: u("1552519507-da3b142c6e3d", 1400, 900),
  blog: u("1614200179396-2bdb77ebf81b", 1400, 900),
  agentA: u("1560250097-0b93528c311a", 600, 800),
  agentB: u("1573496359142-b8d87734a5a2", 600, 800),
  agentC: u("1580489944761-15a19d654956", 600, 800),
  agentD: u("1472099645785-5658abf4ff4e", 600, 800),
  clientA: u("1544005313-94ddf0286df2", 120, 120),
  clientB: u("1519345182560-3f2917c472ef", 120, 120),
  clientC: u("1612349317150-e413f6a5b16d", 120, 120),
  gallery1: u("1558618666-fcd25c85cd64", 800, 600),
  gallery2: u("1605559424843-9e4c228bf1c2", 800, 600),
  gallery3: u("1492144534655-ae79c964c9d7", 800, 600),
  gallery4: u("1617814076367-b759c7d7e738", 800, 600),
  floorPlan: u("1606664515524-ed2f786a0bd6", 1200, 900),
  heroHome: u("1558618666-fcd25c85cd64", 1600, 1200),
  heroPortfolio: u("1492144534655-ae79c964c9d7", 1920, 1080),
  luxuryExterior: u("1517524008697-84bbe3c3fd98", 1200, 900),
  customHome: u("1549924231-f129b911e442", 1200, 900),
  homeAddition: u("1563720223185-11003d516935", 1200, 900),
  wholeHomeRemodel: u("1617469767053-d3b523a0b982", 1200, 900),
  aduGarage: u("1503376780353-7e6692767b70", 1200, 900),
  interiorLiving: u("1583121274602-3e2820c69888", 1200, 900),
  contactHero: u("1618642624018-a370cbf3cd80", 1400, 900),
  aboutHero: u("1552519507-da3b142c6e3d", 1400, 900),
  reviewsHero: u("1494976388531-d1058494cdd8", 1400, 900),
  processHero: u("1574023240744-64c47c8c0676", 1400, 900),
  blogHero: u("1614200179396-2bdb77ebf81b", 1400, 900),
  crewWorking: u("1653565217811-85b41bcd1edb", 1200, 900),
  financing: u("1593941707874-ef25b8b4a92b", 1200, 800),
  architecturalPlans: u("1692406069831-0bb7ea297645", 1200, 900),
  leadMagnet: u("1486496572940-2bb2341fdbdf", 1200, 900),
} as const;

export const COMPANY = {
  name: "Nexora Tires",
  legalName: "Nexora Tires LLC",
  tagline:
    "Austin's tire specialists — find the right fit by vehicle or size, then get professional install, rotation, and alignment at four Central Texas shops.",
  phone: "(512) 555-TIRE",
  email: "hello@nexoratires.com",
  fleetEmail: "fleet@nexoratires.com",
  address: "900 Congress Avenue, Austin, TX 78701",
  hours: "Mon–Fri 8am–6pm · Sat 8am–5pm · Sun 10am–4pm",
  license: "ASE-certified techs · Road-hazard warranties available",
  fax: "",
};

export const SITE_TOP = {
  line: "Free mount & balance with set of 4 · Same-day appointments in Austin",
  badges: ["ASE Certified", "Road Hazard Available", "Fleet Accounts"],
  ratingValue: "4.9",
  ratingCount: "2,400+",
  ratingLabel: "Google Reviews",
  locations: "Congress Ave · The Domain · South Lamar · Round Rock",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "8:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "10:00 AM – 4:00 PM" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-97.80%2C30.22%2C-97.72%2C30.30&layer=mapnik&marker=30.2672,-97.7431";

export const HOME_HERO = {
  eyebrow: "AUSTIN · TIRE SPECIALISTS",
  headlineBefore: "The Right Tires.",
  headlineHighlight: "The Right Fit.",
  headlineAfter: "The Right Road Ahead.",
  body:
    "Match tires to your vehicle, size, or season — then book install, rotation, or alignment with ASE-certified techs at four Austin-area shops.",
  primaryCta: { label: "Find My Tires", to: "/shop" },
  secondaryCta: { label: "Book Tire Service", to: "/book" },
  image: LUXURY_IMAGES.hero,
  trustPills: [
    { label: "12 Brands", sub: "In stock daily", icon: "CircleDot" as const },
    { label: "Same-Day Install", sub: "Austin shops", icon: "Calendar" as const },
    { label: "Fleet Ready", sub: "Commercial accounts", icon: "Truck" as const },
  ],
  ratingQuote: "Central Texas trusts Nexora Tires for honest fitment advice, fair pricing, and clean installs.",
  ratingCard: {
    score: "4.9",
    countLabel: "2,400+ verified Google reviews",
    avatars: [LUXURY_IMAGES.clientA, LUXURY_IMAGES.clientB, LUXURY_IMAGES.clientC, LUXURY_IMAGES.clientA],
  },
  featuredEyebrow: "IN STOCK",
  featuredTitle: "Featured Fitments",
  featuredMeta: "All-Season · Winter · Performance · All-Terrain · EV",
};

export const PROPERTY_CATEGORIES = [
  { id: "all-season", title: "All-Season", description: "Year-round grip for Austin roads.", icon: "CircleDot" as const, image: LUXURY_IMAGES.lot, to: "/shop?category=all-season" },
  { id: "winter", title: "Winter", description: "Ice and snow traction when temps drop.", icon: "Snowflake" as const, image: LUXURY_IMAGES.heroAlt, to: "/shop?category=winter" },
  { id: "summer", title: "Summer", description: "Maximum dry and wet performance.", icon: "Sun" as const, image: LUXURY_IMAGES.luxuryExterior, to: "/shop?category=summer" },
  { id: "performance", title: "Performance", description: "UH P rubber for sport driving.", icon: "Gauge" as const, image: LUXURY_IMAGES.customHome, to: "/shop?category=performance" },
  { id: "all-terrain", title: "All-Terrain", description: "On-road manners, off-road bite.", icon: "Mountain" as const, image: LUXURY_IMAGES.keys, to: "/shop?category=all-terrain" },
  { id: "mud-terrain", title: "Mud-Terrain", description: "Max traction for trail-rigged trucks.", icon: "Trees" as const, image: LUXURY_IMAGES.evCharge, to: "/shop?category=mud-terrain" },
  { id: "ev", title: "EV Tires", description: "Load-rated, quiet, low rolling resistance.", icon: "Zap" as const, image: LUXURY_IMAGES.interior, to: "/shop?category=ev" },
  { id: "truck", title: "Truck & Fleet", description: "Highway and commercial load ratings.", icon: "Truck" as const, image: LUXURY_IMAGES.kitchen, to: "/shop?category=truck" },
];

export const NEIGHBORHOODS = [
  { id: "congress-ave", name: "Congress Avenue", image: LUXURY_IMAGES.showroom, propertyCount: 800, avgPrice: "Downtown", description: "900 Congress Ave — flagship bay, alignment rack, and same-day installs." },
  { id: "the-domain", name: "The Domain", image: LUXURY_IMAGES.lot, propertyCount: 620, avgPrice: "North Austin", description: "11410 Century Oaks Ter — full brand lineup and EV tire specialists." },
  { id: "south-lamar", name: "South Lamar", image: LUXURY_IMAGES.evCharge, propertyCount: 480, avgPrice: "South Austin", description: "2300 S Lamar Blvd — seasonal swaps, storage, and flat repair." },
  { id: "round-rock", name: "Round Rock", image: LUXURY_IMAGES.keys, propertyCount: 540, avgPrice: "Round Rock", description: "1100 E Palm Valley Blvd — truck, trailer, and fleet service." },
];

export const NEW_DEVELOPMENTS = [
  { id: "winter-ready", title: "Winter Tire Campaign", location: "All stores · Storage included", image: LUXURY_IMAGES.penthouse, status: "Seasonal", progress: 85, unitsTotal: 200, unitsAvailable: 142, priceFrom: "$156", completion: "Book swap" },
  { id: "summer-perf", title: "Summer Performance Event", location: "Congress · The Domain", image: LUXURY_IMAGES.villa, status: "Limited Stock", progress: 60, unitsTotal: 120, unitsAvailable: 48, priceFrom: "$219", completion: "While supplies last" },
  { id: "fleet-refresh", title: "Fleet Refresh Program", location: "Round Rock · Mobile install", image: LUXURY_IMAGES.waterfront, status: "Open Enrollment", progress: 40, unitsTotal: 500, unitsAvailable: 310, priceFrom: "Quote", completion: "Volume pricing" },
];

export const SHOWCASE_ITEMS = [
  { id: "showcase-1", title: "Find by Vehicle or Size", subtitle: "Precision fitment", description: "Use our tire finder to match year/make/model or exact size — then reserve install at any Austin shop.", image: LUXURY_IMAGES.showroom, align: "left" as const },
  { id: "showcase-2", title: "Honest Specs", subtitle: "No guesswork", description: "See size, speed rating, load index, wet/dry grip, and warranty miles on every product card.", image: LUXURY_IMAGES.keys, align: "right" as const },
  { id: "showcase-3", title: "Service After Install", subtitle: "Stay road-ready", description: "Rotations, alignments, TPMS, flat repair, and seasonal storage keep your set lasting longer.", image: LUXURY_IMAGES.crewWorking, align: "left" as const },
];

export const SERVICES_RIBBON = [
  { id: "installation", label: "INSTALL", icon: "Wrench" as const, description: "Mount, balance, and torque to spec.", to: "/services/installation" },
  { id: "rotation", label: "ROTATION", icon: "RefreshCw" as const, description: "Even wear for longer tread life.", to: "/services/rotation" },
  { id: "balancing", label: "BALANCE", icon: "Disc" as const, description: "Smooth out vibration at speed.", to: "/services/balancing" },
  { id: "alignment", label: "ALIGNMENT", icon: "MoveHorizontal" as const, description: "Protect tread and steering feel.", to: "/services/alignment" },
  { id: "flat-repair", label: "FLAT REPAIR", icon: "LifeBuoy" as const, description: "Plug/patch when it's safe to repair.", to: "/services/flat-repair" },
];

export const CAPABILITIES = SERVICES_RIBBON.slice(0, 4).map(c => ({
  id: c.id,
  title: c.label.replace(/_/g, " "),
  description: c.description,
  icon: c.icon,
  to: c.to,
}));

export const PROCESS_STEPS = [
  { id: "find", label: "Find", description: "Search by vehicle, size, or tire type with our industrial tire finder." },
  { id: "fit", label: "Fit", description: "Confirm load, speed rating, and season with a specialist before you buy." },
  { id: "install", label: "Install", description: "Mount, balance, TPMS reset, and road-force balance when needed." },
  { id: "maintain", label: "Maintain", description: "Rotate, align, repair flats, and store seasonal sets for longer life." },
];

export const HOME_STATS = [
  { value: "8,000+", label: "Tires in Stock", icon: "CircleDot" as const },
  { value: "4", label: "Austin-Area Shops", icon: "MapPin" as const },
  { value: "15+", label: "Years Fitting Tires", icon: "Award" as const },
  { value: "4.9", label: "Shop Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  { title: "Spec-Sheet Clarity", description: "Size, load, speed, grip ratings, and warranty miles on every listing.", icon: "ClipboardList" as const },
  { title: "ASE-Certified Techs", description: "Torque-to-spec installs with TPMS service and road-force balance.", icon: "Wrench" as const },
  { title: "Finder + Shop", description: "Match by vehicle or size online, then book the bay that fits your day.", icon: "Search" as const },
  { title: "Four Austin Shops", description: "Shared inventory across Congress, Domain, Lamar, and Round Rock.", icon: "MapPin" as const },
  { title: "Road Hazard Options", description: "Protect against nails and road debris on eligible sets.", icon: "ShieldCheck" as const },
  { title: "EV & Performance Ready", description: "Load-rated EV tires and UH P summer sets in stock.", icon: "Zap" as const },
  { title: "Same-Day Appointments", description: "Many installs finish while you wait — book online or walk in.", icon: "Calendar" as const },
  { title: "Fleet Accounts", description: "Volume pricing, mobile install, and scheduled rotations for fleets.", icon: "Truck" as const },
];

const SERVICE_LIST = [
  { id: "installation", title: "Tire Installation", icon: "Wrench", description: "Mount, balance, torque, and TPMS reset for cars, SUVs, and trucks.", image: LUXURY_IMAGES.showroom },
  { id: "rotation", title: "Tire Rotation", icon: "RefreshCw", description: "Manufacturer-pattern rotations to even wear and extend tread life.", image: LUXURY_IMAGES.lot },
  { id: "balancing", title: "Wheel Balancing", icon: "Disc", description: "Eliminate vibration with precision and road-force balancing.", image: LUXURY_IMAGES.pool },
  { id: "alignment", title: "Wheel Alignment", icon: "MoveHorizontal", description: "Laser alignment to protect tread and restore straight-line tracking.", image: LUXURY_IMAGES.financing },
  { id: "flat-repair", title: "Flat Repair", icon: "LifeBuoy", description: "Industry-standard plug/patch when the puncture is repairable.", image: LUXURY_IMAGES.keys },
  { id: "storage", title: "Seasonal Storage", icon: "Warehouse", description: "Clean, labeled storage for winter/summer swaps.", image: LUXURY_IMAGES.crewWorking },
  { id: "tpms", title: "TPMS Service", icon: "Gauge", description: "Sensor programming, battery replacement, and warning light resets.", image: LUXURY_IMAGES.interior },
  { id: "roadside", title: "Roadside Help", icon: "Phone", description: "Spare mount guidance and emergency tire appointment priority.", image: LUXURY_IMAGES.skyline },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const LISTINGS = DEMO_TIRES;

/** Template compatibility (projects = tire catalog) */
export const PROJECTS = LISTINGS;

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 6;
export const LISTINGS_PAGE_SIZE = 6;

export const TEAM = [
  {
    id: "alex-martinez",
    name: "Alex Martinez",
    role: "Shop Manager · Congress Ave",
    bio: "Alex leads fitment and alignment at our flagship bay — matching load and speed ratings to how you actually drive.",
    image: LUXURY_IMAGES.agentA,
    languages: ["English", "Spanish"],
    experience: "14 years",
    specialties: ["Performance", "Alignment", "EV"],
    social: { linkedin: "#", instagram: "#", email: "alex@nexoratires.com" },
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    role: "Fitment Specialist · The Domain",
    bio: "Priya helps shoppers compare all-season, winter, and EV tires with clear grip and warranty trade-offs.",
    image: LUXURY_IMAGES.agentC,
    languages: ["English", "Hindi"],
    experience: "9 years",
    specialties: ["All-Season", "EV", "TPMS"],
    social: { linkedin: "#", instagram: "#", email: "priya@nexoratires.com" },
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    role: "Service Lead · South Lamar",
    bio: "Marcus runs rotations, flat repairs, and seasonal storage swaps with same-day turnaround.",
    image: LUXURY_IMAGES.agentB,
    languages: ["English"],
    experience: "16 years",
    specialties: ["Repair", "Storage", "Rotation"],
    social: { linkedin: "#", instagram: "#", email: "marcus@nexoratires.com" },
  },
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    role: "Fleet Director",
    bio: "Sophia manages commercial accounts, mobile installs, and scheduled fleet rotations across Central Texas.",
    image: LUXURY_IMAGES.agentD,
    languages: ["English", "Mandarin"],
    experience: "11 years",
    specialties: ["Fleet", "Commercial", "Truck"],
    social: { linkedin: "#", instagram: "#", email: "sophia@nexoratires.com" },
  },
];

export const TESTIMONIALS = [
  { name: "Jordan T.", role: "Pilot Sport 4S install", quote: "Finder matched my BMW size perfectly. Mount and balance done in under an hour at Congress Ave.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Maria & Luis R.", role: "All-season set", quote: "Priya explained wet grip ratings without the sales pitch. CrossClimate 2s feel planted in rain.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Chen W.", role: "Flat repair", quote: "Nail in the tread — patched correctly and back on the road same afternoon at South Lamar.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
  { name: "Aisha K.", role: "Winter swap", quote: "Stored my summers, mounted Blizzaks before the freeze. Labeled and ready next spring.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Devon P.", role: "Fleet account", quote: "Twelve work vans rotated on schedule — invoicing and mobile install made it painless.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Elena S.", role: "EV tires", quote: "Hankook iON set for my Model Y — quieter cabin and load rating explained clearly.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "tire-size-guide", title: "How to Read Your Tire Size", excerpt: "Width, aspect, rim — decode the sidewall before you shop.", date: "June 10, 2026", author: "Alex Martinez", category: "Buying Guides", image: LUXURY_IMAGES.skyline, content: "What 225/45R17 actually means and when you can upsize.", readTime: "6 min" },
  { id: "winter-vs-allseason", title: "Winter vs All-Season in Central Texas", excerpt: "When a dedicated winter set is worth it around Austin.", date: "May 22, 2026", author: "Priya Shah", category: "Seasonal", image: LUXURY_IMAGES.keys, content: "3PMSF ratings, storage, and rare ice events.", readTime: "5 min" },
  { id: "ev-tire-myths", title: "Do EVs Need Special Tires?", excerpt: "Load, noise, and rolling resistance explained.", date: "May 5, 2026", author: "Marcus Williams", category: "EV", image: LUXURY_IMAGES.lot, content: "Why EV-labeled tires matter for range and wear.", readTime: "4 min" },
  { id: "rotation-schedule", title: "When to Rotate Your Tires", excerpt: "Mileage intervals that actually protect tread life.", date: "April 18, 2026", author: "Sophia Chen", category: "Maintenance", image: LUXURY_IMAGES.interior, content: "Patterns for FWD, AWD, and staggered setups.", readTime: "4 min" },
  { id: "alignment-signs", title: "Signs You Need an Alignment", excerpt: "Pulling, feathering, and uneven inner wear.", date: "March 30, 2026", author: "Alex Martinez", category: "Service", image: LUXURY_IMAGES.waterfront, content: "How alignment saves a new set from early death.", readTime: "7 min" },
  { id: "fleet-cost", title: "Lowering Fleet Cost-Per-Mile", excerpt: "Rotation cadence and retreadable casings.", date: "March 12, 2026", author: "Sophia Chen", category: "Fleet", image: LUXURY_IMAGES.evCharge, content: "Commercial tire strategies for Austin fleets.", readTime: "5 min" },
];

export const STATS = [
  { value: 120000, label: "Tires Installed", suffix: "+" },
  { value: 8000, label: "SKUs In Stock", suffix: "+" },
  { value: 2400, label: "Happy Drivers", suffix: "+" },
  { value: 15, label: "Years in Austin", suffix: "+" },
];

export const FAQ_ITEMS = [
  { question: "Can I find tires by my vehicle?", answer: "Yes — use the Tire Finder (By Vehicle) or shop by exact size. We'll confirm load and speed ratings before install." },
  { question: "Do you offer same-day installation?", answer: "Most appointments finish the same day. Book online or walk in — wait times vary by shop and season." },
  { question: "What's included with installation?", answer: "Mount, balance, torque to spec, TPMS check/reset, and a road test when needed." },
  { question: "Do you repair flats?", answer: "If the puncture is in the repairable tread area, we plug/patch to industry standards. Sidewall damage usually means replacement." },
  { question: "Can you store seasonal tires?", answer: "Yes — clean, labeled storage for winter/summer swaps at our South Lamar and Round Rock shops." },
  { question: "Do you serve fleets?", answer: "Fleet accounts get volume pricing, scheduled rotations, and optional mobile install across Central Texas." },
];

export const SHOP_MEGA_LINKS = [
  { label: "All tires", path: "/shop" },
  { label: "All-Season", path: "/shop?category=all-season" },
  { label: "Winter", path: "/shop?category=winter" },
  { label: "Performance", path: "/shop?category=performance" },
  { label: "All-Terrain", path: "/shop?category=all-terrain" },
  { label: "EV Tires", path: "/shop?category=ev" },
] as const;

/** Primary header navigation */
export const NAV_LINKS = [
  { label: "Find Tires", path: "/shop" },
  { label: "Services", path: "/services" },
  { label: "Book", path: "/book" },
  { label: "Fleet", path: "/fleet" },
  { label: "Stores", path: "/stores" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Find Tires", to: "/shop" },
  { label: "Tire Installation", to: "/services/installation" },
  { label: "Alignment", to: "/services/alignment" },
  { label: "Flat Repair", to: "/services/flat-repair" },
  { label: "Fleet Services", to: "/fleet" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Shop All", to: "/shop" },
  { label: "Book Service", to: "/book" },
  { label: "About", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Store Locations", to: "/stores" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Compare Tires", to: "/compare" },
  { label: "Repairs & Flats", to: "/repairs" },
  { label: "Seasonal Storage", to: "/services/storage" },
  { label: "My Account", to: "/account" },
];

export const SERVICE_AREAS = NEIGHBORHOODS.map(n => n.name);

export const PROJECTS_PAGE_STATS = [
  { value: "8,000+", label: "Tires in stock" },
  { value: "40+", label: "New SKUs this month" },
  { value: "4.9", label: "Shop rating" },
  { value: "Same day", label: "Installs available" },
];

export const OFFERS = [
  {
    id: "set-of-four",
    tag: "Install",
    title: "Free mount & balance on a set of 4",
    description: "Through August — includes TPMS check at any Austin-area shop.",
    validThrough: "August 31, 2026",
    ctaLabel: "Find tires",
    ctaTo: "/shop",
  },
  {
    id: "winter-swap",
    tag: "Seasonal",
    title: "Winter swap + storage package",
    description: "Mount winters, store summers — labeled and ready for spring.",
    validThrough: "December 15, 2026",
    ctaLabel: "Book swap",
    ctaTo: "/book",
  },
  {
    id: "alignment-bundle",
    tag: "Alignment",
    title: "$20 off alignment with new tires",
    description: "Protect your new tread with a laser alignment the same visit.",
    validThrough: "September 15, 2026",
    ctaLabel: "Book service",
    ctaTo: "/book",
  },
  {
    id: "fleet-volume",
    tag: "Fleet",
    title: "Fleet volume pricing",
    description: "Open a commercial account for scheduled rotations and mobile install.",
    validThrough: "Ongoing",
    ctaLabel: "Talk to fleet",
    ctaTo: "/fleet",
  },
];

export const ABOUT_STATS = [
  { value: "15+", label: "Years in Austin" },
  { value: "120,000+", label: "Tires Installed" },
  { value: "4", label: "Service Locations" },
  { value: "4.9", label: "Shop Rating" },
  { value: "35+", label: "ASE Techs" },
];

export const CORE_VALUES = WHY_BENEFITS.slice(0, 6).map((b, i) => ({
  id: `v${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const CERTIFICATIONS = [
  { id: "ase", label: "ASE Certified", sub: "Techs at every bay" },
  { id: "roadhazard", label: "Road Hazard", sub: "Eligible sets protected" },
  { id: "tpms", label: "TPMS Experts", sub: "Program & reset" },
  { id: "reviews", label: "4.9 Shop Rating", sub: "2,400+ Google reviews" },
  { id: "local", label: "Locally Owned", sub: "Austin since 2011" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "buying", label: "BUYING" },
  { id: "service", label: "SERVICE" },
  { id: "fleet", label: "FLEET" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  buying: [
    { question: "Should I replace all four tires?", answer: "AWD vehicles usually need matched sets. We'll advise based on remaining tread depth and drivetrain." },
    { question: "Can I mix brands?", answer: "We recommend matching brand and model across an axle — especially for performance and winter tires." },
    { question: "What does the speed rating mean?", answer: "It's the maximum sustained speed the tire is engineered for. Never go below your vehicle's OEM requirement." },
  ],
  service: [
    { question: "How long does an install take?", answer: "Most set-of-four installs finish in 45–90 minutes depending on shop load and TPMS needs." },
    { question: "Do you reset TPMS?", answer: "Yes — sensor checks and resets are part of every install appointment." },
    { question: "When should I rotate?", answer: "Typically every 5,000–7,500 miles, or per your vehicle manufacturer." },
  ],
  fleet: [
    { question: "Do you offer mobile install?", answer: "Yes for qualifying fleet accounts across the Austin metro." },
    { question: "Can we get volume pricing?", answer: "Commercial accounts unlock volume pricing and scheduled service windows." },
    { question: "Do you invoice net-30?", answer: "Approved fleets can invoice on net terms — contact fleet@nexoratires.com." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Installation, rotation, balancing, alignment, flat repair, storage, TPMS, and roadside support — everything that keeps Austin drivers rolling.";

export const COMMERCIAL_FITOUT_CARDS = WHY_BENEFITS.slice(0, 4).map((b, i) => ({
  id: `why-${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const SERVICE_DEEP_DIVES: {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  body: [string, string];
  image: string;
  inclusions: string[];
}[] = SERVICES.map(s => ({
  id: s.id,
  category: "TIRE SERVICE",
  title: s.title,
  subtitle: s.description,
  body: [s.description, `Our ${s.title.toLowerCase()} team keeps your set safe, balanced, and lasting longer.`] as [string, string],
  image: s.image,
  inclusions: ["ASE technicians", "Transparent pricing", "Same-day options", "Warranty support", "Four Austin shops"],
}));

export const LEAD_FORM = {
  title: "Questions about tires or service?",
  description: "Fitment and service teams respond within one business day.",
  subtitle: "Fitment and service teams respond within one business day.",
  submitLabel: "Send message",
  successMessage: "Thank you. A Nexora Tires specialist will contact you shortly.",
  bullets: [
    "Spec-sheet clarity on every tire",
    "Same-day install appointments",
    "Seasonal storage & swaps",
    "Fleet accounts & mobile service",
  ],
};

export const REPAIR_SERVICES = [
  { id: "flat", title: "Flat repair", description: "Plug/patch for repairable tread punctures.", priceFrom: "$29", duration: "30–45 min" },
  { id: "tpms", title: "TPMS sensor", description: "Replace or program tire pressure sensors.", priceFrom: "$79", duration: "45 min" },
  { id: "balance", title: "Rebalance", description: "Fix vibration after impact or wear.", priceFrom: "$20/wheel", duration: "30 min" },
  { id: "alignment", title: "Alignment", description: "Laser alignment for cars and light trucks.", priceFrom: "$99", duration: "60–90 min" },
  { id: "valve", title: "Valve stems", description: "Replace aging or leaking valve stems.", priceFrom: "$12", duration: "With install" },
  { id: "storage", title: "Seasonal storage", description: "Clean, labeled off-season tire storage.", priceFrom: "$80/season", duration: "Drop-off" },
];

export const BLOG_TAGS = ["Buying Guides", "Seasonal", "EV", "Maintenance", "Service", "Fleet"];

export const BLOG_LIST_PAGE_SIZE = 6;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const META_DEFAULT =
  "Nexora Tires — Austin, TX tire shop. Find tires by vehicle or size. Install, rotation, alignment, flat repair, and fleet service.";

export const CTA_SECTION = {
  headline: "Ready for the Right Fit?",
  primaryCta: { label: "Find My Tires", to: "/shop" },
  secondaryCta: { label: "Book Tire Service", to: "/book" },
};

export const FINANCING_CONTENT = {
  eyebrow: "FLEET & FINANCING",
  title: "Pay Your Way",
  subtitle: "Flexible payment options on qualifying sets and open fleet accounts for commercial operators.",
  body: "Ask about promotional financing on set-of-four purchases and net terms for approved fleets.",
  image: LUXURY_IMAGES.financing,
  benefits: ["Set-of-4 promos", "Fleet invoicing", "Road hazard plans", "Online booking"],
  cta: { label: "Talk to Fleet", to: "/fleet" },
};

export const HOME_BUILDER_IMAGES = LUXURY_IMAGES;

export const ABOUT_TIMELINE = [
  { year: "2011", title: "First Austin Shop", description: "Opened on Congress Avenue as a focused tire and alignment bay." },
  { year: "2015", title: "Seasonal Storage", description: "Launched winter/summer swap and labeled storage program." },
  { year: "2019", title: "Expanded Footprint", description: "Added The Domain and South Lamar with shared inventory." },
  { year: "2023", title: "Fleet & Mobile", description: "Commercial accounts and mobile install across Central Texas." },
  { year: "2026", title: "Digital Tire Finder", description: "Match by vehicle, size, or type — then book the bay online." },
];

export const AWARDS = [
  { year: "2025", title: "Best Tire Shop", org: "Austin Business Journal" },
  { year: "2024", title: "Top Customer Service", org: "Central Texas Consumers' Choice" },
  { year: "2023", title: "Fleet Partner of the Year", org: "Central Texas Fleet Association" },
];

export const ABOUT_HERO_BADGES = [
  { label: "15+ Years", icon: "Award" as const },
  { label: "8,000+ In Stock", icon: "CircleDot" as const },
  { label: "4 Locations", icon: "MapPin" as const },
  { label: "4.9 Rating", icon: "ShieldCheck" as const },
];

export const LEAD_MAGNET = {
  title: "Tire Buyer's Guide",
  subtitle: "Compare seasons, load ratings, and when to replace — Austin edition.",
  cta: { label: "GET THE GUIDE", to: "/contact" },
  image: LUXURY_IMAGES.heroAlt,
};

export const SERVICE_AREA_COUNTIES = NEIGHBORHOODS.map(n => ({
  county: n.name,
  towns: [n.description],
}));

export const CONTACT_TRUST_STRIP = [
  { id: "ase", title: "ASE Certified", description: "Techs at every service bay.", icon: "ShieldCheck" as const },
  { id: "service", title: "Same-Day Install", description: "Mount, balance, and TPMS reset.", icon: "Wrench" as const },
  { id: "local", title: "Local Team", description: "Four Austin-area shops.", icon: "MapPin" as const },
  { id: "digital", title: "Tire Finder", description: "Match by vehicle, size, or type.", icon: "Search" as const },
];

export const SERVICE_CATEGORY_TABS = PROPERTY_CATEGORIES.slice(0, 4).map(c => ({
  id: c.id,
  label: c.title,
  to: c.to,
}));

export const STORM_CHECKLIST = PROCESS_STEPS.map(s => ({
  id: s.id,
  title: s.label,
  description: s.description,
}));

export const INSPECTION_BENEFITS = WHY_BENEFITS.slice(0, 4);

export const INSPECTION_TYPES = SERVICES.slice(0, 4).map(s => ({
  id: s.id,
  title: s.title,
  description: s.description,
  image: s.image,
}));

export const INSPECTION_CHECKLIST = [
  "Sidewall & tread inspection",
  "Tread depth measurement",
  "TPMS sensor check",
  "Torque to manufacturer spec",
  "Balance verification",
  "Road-test when needed",
];

export const HERO_PROMO_BANNERS = [
  {
    id: "guide",
    title: LEAD_MAGNET.title,
    subtitle: LEAD_MAGNET.subtitle,
    cta: LEAD_MAGNET.cta,
    image: LEAD_MAGNET.image,
  },
  {
    id: "shop",
    title: "Shop the Full Catalog",
    subtitle: "All-season, winter, performance, all-terrain, EV, and fleet tires with upfront pricing.",
    cta: { label: "FIND TIRES", to: "/shop" },
    image: LUXURY_IMAGES.showroom,
  },
];
