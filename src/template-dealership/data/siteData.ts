/**
 * NEXORA MOTORS — Premium automotive dealership content registry.
 * Default palette: charcoal, graphite, electric blue accent.
 * Images sourced from Unsplash (showrooms, vehicles, service).
 */

import { DEMO_INVENTORY } from "./inventory";

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/** Verified Unsplash IDs — cars, showrooms, lots, service, and EV only */
export const LUXURY_IMAGES = {
  hero: u("1692406069831-0bb7ea297645", 1920, 1080),
  heroAlt: u("1618642624018-a370cbf3cd80", 1920, 1080),
  showroom: u("1692406069831-0bb7ea297645", 1400, 900),
  lot: u("1574023240744-64c47c8c0676", 1200, 900),
  keys: u("1653565217811-85b41bcd1edb", 1200, 900),
  evCharge: u("1593941707874-ef25b8b4a92b", 1200, 900),
  villa: u("1492144534655-ae79c964c9d7", 1200, 900),
  penthouse: u("1552519507-da3b142c6e3d", 1200, 900),
  apartment: u("1503376780353-7e6692767b70", 1200, 900),
  waterfront: u("1549317661-bd32c8ce0db2", 1200, 900),
  interior: u("1606664515524-ed2f786a0bd6", 1200, 900),
  kitchen: u("1617814076367-b759c7d7e738", 1200, 900),
  pool: u("1486496572940-2bb2341fdbdf", 1200, 900),
  skyline: u("1560958089-b8a1929cea89", 1200, 900),
  neighborhood: u("1583121274602-3e2820c69888", 1200, 900),
  development: u("1605559424843-9e4c228bf1c2", 1200, 900),
  office: u("1549924231-f129b911e442", 1200, 900),
  contact: u("1692406069831-0bb7ea297645", 1400, 900),
  about: u("1574023240744-64c47c8c0676", 1400, 900),
  blog: u("1618642624018-a370cbf3cd80", 1400, 900),
  agentA: u("1560250097-0b93528c311a", 600, 800),
  agentB: u("1573496359142-b8d87734a5a2", 600, 800),
  agentC: u("1580489944761-15a19d654956", 600, 800),
  agentD: u("1472099645785-5658abf4ff4e", 600, 800),
  clientA: u("1544005313-94ddf0286df2", 120, 120),
  clientB: u("1519345182560-3f2917c472ef", 120, 120),
  clientC: u("1612349317150-e413f6a5b16d", 120, 120),
  gallery1: u("1492144534655-ae79c964c9d7", 800, 600),
  gallery2: u("1552519507-da3b142c6e3d", 800, 600),
  gallery3: u("1503376780353-7e6692767b70", 800, 600),
  gallery4: u("1593941707874-ef25b8b4a92b", 800, 600),
  floorPlan: u("1563720223185-11003d516935", 1200, 900),
  heroHome: u("1692406069831-0bb7ea297645", 1600, 1200),
  heroPortfolio: u("1574023240744-64c47c8c0676", 1920, 1080),
  luxuryExterior: u("1503376780353-7e6692767b70", 1200, 900),
  customHome: u("1494976388531-d1058494cdd8", 1200, 900),
  homeAddition: u("1517524008697-84bbe3c3fd98", 1200, 900),
  wholeHomeRemodel: u("1606664515524-ed2f786a0bd6", 1200, 900),
  aduGarage: u("1558618666-fcd25c85cd64", 1200, 900),
  interiorLiving: u("1617814076367-b759c7d7e738", 1200, 900),
  contactHero: u("1692406069831-0bb7ea297645", 1400, 900),
  aboutHero: u("1574023240744-64c47c8c0676", 1400, 900),
  reviewsHero: u("1653565217811-85b41bcd1edb", 1400, 900),
  processHero: u("1609521263047-f8f205293f24", 1400, 900),
  blogHero: u("1618642624018-a370cbf3cd80", 1400, 900),
  crewWorking: u("1617469767053-d3b523a0b982", 1200, 900),
  financing: u("1563720223185-11003d516935", 1200, 800),
  architecturalPlans: u("1549924231-f129b911e442", 1200, 900),
  leadMagnet: u("1593941707874-ef25b8b4a92b", 1200, 900),
} as const;

export const COMPANY = {
  name: "NEXORA MOTORS",
  legalName: "Nexora Automotive Group LLC",
  tagline:
    "Your premium digital showroom — new, used, and certified vehicles with transparent pricing and a modern buying experience.",
  phone: "(512) 555-AUTO",
  email: "sales@nexoramotors.com",
  fleetEmail: "fleet@nexoramotors.com",
  address: "1200 Auto Row Boulevard, Austin, TX 78701",
  hours: "Mon–Sat 9am–8pm · Sun 11am–6pm",
  license: "TX Dealer License #DA-482910 · Equal Opportunity Dealer",
  fax: "",
};

export const SITE_TOP = {
  line: "120+ vehicles in stock — Schedule a test drive today",
  badges: ["Certified Service", "Transparent Pricing", "Digital Retail Ready"],
  ratingValue: "4.9",
  ratingCount: "2,400+",
  ratingLabel: "Google Reviews",
  locations: "Austin Main · Round Rock · Cedar Park · San Marcos",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
  { days: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "By appointment" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-97.80%2C30.22%2C-97.72%2C30.30&layer=mapnik&marker=30.2672,-97.7431";

export const HOME_HERO = {
  eyebrow: "PREMIUM AUTOMOTIVE RETAIL",
  headlineBefore: "Find the Vehicle",
  headlineHighlight: "That Moves You",
  headlineAfter: "",
  body:
    "Explore our latest new, used, and certified vehicles with a simple, transparent shopping experience.",
  primaryCta: { label: "Search Inventory", to: "/inventory" },
  secondaryCta: { label: "Explore New Vehicles", to: "/new-vehicles" },
  image: LUXURY_IMAGES.hero,
  trustPills: [
    { label: "120+ In Stock", sub: "New, used & CPO", icon: "Car" as const },
    { label: "Same-Day Test Drives", sub: "Book online", icon: "Calendar" as const },
    { label: "Digital Purchase", sub: "Finance & trade online", icon: "Zap" as const },
  ],
  ratingQuote: "Trusted by Central Texas drivers for transparent pricing and a modern buying experience.",
  ratingCard: {
    score: "4.9",
    countLabel: "2,400+ verified Google reviews",
    avatars: [LUXURY_IMAGES.clientA, LUXURY_IMAGES.clientB, LUXURY_IMAGES.clientC, LUXURY_IMAGES.clientA],
  },
  featuredEyebrow: "FEATURED",
  featuredTitle: "Performance & EV Lineup",
  featuredMeta: "Sports · SUVs · Electric · Certified Pre-Owned",
};

export const PROPERTY_CATEGORIES = [
  { id: "suv", title: "SUVs & Crossovers", description: "Family-ready utility with premium comfort.", icon: "Car" as const, image: LUXURY_IMAGES.lot, to: "/inventory?body=suv" },
  { id: "sedan", title: "Sedans", description: "Efficient daily drivers and executive sedans.", icon: "CarFront" as const, image: LUXURY_IMAGES.luxuryExterior, to: "/inventory?body=sedan" },
  { id: "truck", title: "Trucks", description: "Work-ready pickups and commercial trucks.", icon: "Truck" as const, image: LUXURY_IMAGES.customHome, to: "/inventory?body=truck" },
  { id: "sports", title: "Performance", description: "Sports cars and driver-focused machines.", icon: "Gauge" as const, image: LUXURY_IMAGES.heroAlt, to: "/inventory?body=sports" },
  { id: "ev", title: "Electric & Hybrid", description: "EV inventory with charging guidance.", icon: "Zap" as const, image: LUXURY_IMAGES.evCharge, to: "/inventory?body=electric" },
  { id: "new", title: "New Vehicles", description: "Latest models with factory incentives.", icon: "Sparkles" as const, image: LUXURY_IMAGES.showroom, to: "/new-vehicles" },
  { id: "used", title: "Pre-Owned", description: "Inspected used inventory ready to drive.", icon: "RefreshCw" as const, image: LUXURY_IMAGES.lot, to: "/used-vehicles" },
  { id: "cpo", title: "Certified Pre-Owned", description: "Warranty-backed CPO with multipoint inspection.", icon: "ShieldCheck" as const, image: LUXURY_IMAGES.keys, to: "/certified-pre-owned" },
];

export const NEIGHBORHOODS = [
  { id: "austin-main", name: "Austin Main", image: LUXURY_IMAGES.showroom, propertyCount: 68, avgPrice: "$42k", description: "Flagship showroom on Auto Row Boulevard." },
  { id: "round-rock", name: "Round Rock", image: LUXURY_IMAGES.lot, propertyCount: 34, avgPrice: "$38k", description: "Expanded new and used inventory north of Austin." },
  { id: "cedar-park", name: "Cedar Park", image: LUXURY_IMAGES.evCharge, propertyCount: 22, avgPrice: "$51k", description: "EV specialists and certified service center." },
  { id: "san-marcos", name: "San Marcos", image: LUXURY_IMAGES.keys, propertyCount: 18, avgPrice: "$29k", description: "Value-focused used and CPO selection." },
];

export const NEW_DEVELOPMENTS = [
  { id: "ev-arrival", title: "2026 EV Arrivals", location: "Cedar Park EV Center", image: LUXURY_IMAGES.evCharge, status: "Now Arriving", progress: 85, unitsTotal: 40, unitsAvailable: 18, priceFrom: "$42k", completion: "In stock now" },
  { id: "truck-lineup", title: "Work Truck Lineup", location: "Austin Main · Round Rock", image: LUXURY_IMAGES.customHome, status: "Expanded Stock", progress: 70, unitsTotal: 32, unitsAvailable: 14, priceFrom: "$38k", completion: "Ready to drive" },
  { id: "cpo-event", title: "CPO Showcase Event", location: "All locations", image: LUXURY_IMAGES.keys, status: "Limited Time", progress: 55, unitsTotal: 60, unitsAvailable: 28, priceFrom: "$22k", completion: "Through Aug 2026" },
];

export const SHOWCASE_ITEMS = [
  { id: "showcase-1", title: "Digital Showroom", subtitle: "Shop on your terms", description: "Search, compare, and calculate payments across our full inventory — from any device, any time.", image: LUXURY_IMAGES.showroom, align: "left" as const },
  { id: "showcase-2", title: "Transparent Pricing", subtitle: "No surprises", description: "See dealer price, incentives, and estimated monthly payments up front so you can buy with confidence.", image: LUXURY_IMAGES.keys, align: "right" as const },
  { id: "showcase-3", title: "Complete Ownership", subtitle: "Sales through service", description: "Factory-trained technicians, OEM parts, and service specials keep you on the road long after delivery.", image: LUXURY_IMAGES.crewWorking, align: "left" as const },
];

export const SERVICES_RIBBON = PROPERTY_CATEGORIES.slice(0, 5).map(c => ({
  id: c.id,
  label: c.title.toUpperCase(),
  icon: c.icon,
  description: c.description,
  to: c.to,
}));

export const CAPABILITIES = PROPERTY_CATEGORIES.slice(0, 4).map(c => ({
  id: c.id,
  title: c.title,
  description: c.description,
  icon: c.icon,
  to: c.to,
}));

export const PROCESS_STEPS = [
  { id: "browse", label: "Browse", description: "Search new, used, and certified inventory online or with a sales specialist." },
  { id: "compare", label: "Compare", description: "Side-by-side specs, payment estimates, and trade-in credit for your current vehicle." },
  { id: "drive", label: "Test Drive", description: "Book online and drive the same day when slots are available." },
  { id: "finance", label: "Finance & Trade", description: "Apply for financing, lease options, and lock in your trade-in value." },
  { id: "deliver", label: "Deliver & Service", description: "Pickup or delivery, then factory-trained service that keeps you on the road." },
];

export const HOME_STATS = [
  { value: "120+", label: "Vehicles in Stock", icon: "Car" as const },
  { value: "15+", label: "Manufacturers", icon: "Building2" as const },
  { value: "25+", label: "Years Serving Texas", icon: "Award" as const },
  { value: "4.9", label: "Dealer Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  { title: "Transparent Pricing", description: "Clear dealer price, incentives, and payment estimates on every vehicle.", icon: "Tag" as const },
  { title: "Certified Technicians", description: "Factory-trained service for every brand we sell.", icon: "Wrench" as const },
  { title: "Digital Retail", description: "Finance, trade-in, and purchase steps you can complete online.", icon: "Smartphone" as const },
  { title: "Multi-Location", description: "Four Central Texas stores with shared inventory search.", icon: "MapPin" as const },
  { title: "CPO Confidence", description: "Rigorous inspections and warranty-backed certified pre-owned.", icon: "ShieldCheck" as const },
  { title: "EV Specialists", description: "Charging guidance, incentives, and dedicated EV inventory.", icon: "Zap" as const },
  { title: "Same-Day Test Drives", description: "Book online and drive the same day when slots are available.", icon: "Calendar" as const },
  { title: "Trade-In Value", description: "Fast estimates and appraisal appointments for your current vehicle.", icon: "RefreshCw" as const },
];

const SERVICE_LIST = [
  { id: "new-vehicles", title: "New Vehicles", icon: "Sparkles", description: "Latest models from leading manufacturers with factory incentives.", image: LUXURY_IMAGES.showroom },
  { id: "used-vehicles", title: "Used Vehicles", icon: "Car", description: "Quality pre-owned inventory inspected and ready to drive.", image: LUXURY_IMAGES.lot },
  { id: "cpo", title: "Certified Pre-Owned", icon: "ShieldCheck", description: "CPO vehicles with extended warranty and rigorous inspection.", image: LUXURY_IMAGES.luxuryExterior },
  { id: "finance", title: "Financing", icon: "Calculator", description: "Competitive rates, lease options, and online credit applications.", image: LUXURY_IMAGES.financing },
  { id: "trade-in", title: "Trade-In", icon: "RefreshCw", description: "Get a fair market value for your current vehicle in minutes.", image: LUXURY_IMAGES.keys },
  { id: "service", title: "Service Center", icon: "Wrench", description: "Factory-trained technicians and OEM parts.", image: LUXURY_IMAGES.crewWorking },
  { id: "parts", title: "Parts & Accessories", icon: "Package", description: "Genuine OEM parts and accessories for your vehicle.", image: LUXURY_IMAGES.interior },
  { id: "ev", title: "Electric Vehicles", icon: "Zap", description: "EV inventory, charging guidance, and tax incentive support.", image: LUXURY_IMAGES.evCharge },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const LISTINGS = DEMO_INVENTORY;

/** Template compatibility (projects = inventory vehicles) */
export const PROJECTS = LISTINGS;

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 6;
export const LISTINGS_PAGE_SIZE = 6;

export const TEAM = [
  {
    id: "alex-martinez",
    name: "Alex Martinez",
    role: "Sales Manager · New Vehicles",
    bio: "Alex helps buyers match the right new model to their lifestyle, with deep knowledge of incentives and digital purchase options.",
    image: LUXURY_IMAGES.agentA,
    languages: ["English", "Spanish"],
    experience: "12 years",
    specialties: ["New Vehicles", "Fleet", "EV"],
    social: { linkedin: "#", instagram: "#", email: "alex@nexoramotors.com" },
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    role: "Senior Consultant · Certified Pre-Owned",
    bio: "Priya guides clients through CPO benefits, warranty coverage, and value-focused pre-owned purchases.",
    image: LUXURY_IMAGES.agentC,
    languages: ["English", "Hindi"],
    experience: "9 years",
    specialties: ["CPO", "Used Inventory", "Trade-In"],
    social: { linkedin: "#", instagram: "#", email: "priya@nexoramotors.com" },
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    role: "Performance & Luxury Specialist",
    bio: "Marcus works with enthusiasts and luxury buyers on sports, performance, and high-end SUV inventory.",
    image: LUXURY_IMAGES.agentB,
    languages: ["English"],
    experience: "14 years",
    specialties: ["Performance", "Luxury SUVs", "Exotic"],
    social: { linkedin: "#", instagram: "#", email: "marcus@nexoramotors.com" },
  },
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    role: "Finance & Digital Retail Director",
    bio: "Sophia leads financing, lease options, and end-to-end digital purchase experiences for Nexora Motors.",
    image: LUXURY_IMAGES.agentD,
    languages: ["English", "Mandarin"],
    experience: "11 years",
    specialties: ["Financing", "Leasing", "Digital Retail"],
    social: { linkedin: "#", instagram: "#", email: "sophia@nexoramotors.com" },
  },
];

export const TESTIMONIALS = [
  { name: "Jordan T.", role: "New SUV buyer", quote: "Transparent pricing and a same-day test drive. We left with a family SUV and fair trade-in credit — no pressure, just clear numbers.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Maria & Luis R.", role: "CPO purchasers", quote: "Priya walked us through certified pre-owned warranty coverage. The inspection report matched everything she described.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Chen W.", role: "EV buyer", quote: "Cedar Park EV specialists explained charging and incentives clearly. Delivery was on time and the paperwork was painless.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
  { name: "Aisha K.", role: "Service customer", quote: "Factory-trained techs fixed our issue the same day with OEM parts. Honest updates the whole time.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Devon P.", role: "Fleet manager", quote: "Ordered three work trucks for our crew — financing and delivery were coordinated across Round Rock without headaches.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Elena S.", role: "Digital retail buyer", quote: "Built the deal online, finished in store in under an hour. Best car-buying experience we've had in Texas.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "ev-guide-2026", title: "2026 EV Buyer's Guide for Texas Drivers", excerpt: "Incentives, charging, and range tips for Central Texas.", date: "June 10, 2026", author: "Alex Martinez", category: "Electric Vehicles", image: LUXURY_IMAGES.evCharge, content: "Compare popular EVs, home charging options, and current Texas incentives.", readTime: "6 min" },
  { id: "cpo-explained", title: "Certified Pre-Owned Explained", excerpt: "What CPO warranty and inspection really cover.", date: "May 22, 2026", author: "Priya Shah", category: "Buying Guides", image: LUXURY_IMAGES.keys, content: "Multipoint inspections, remaining factory coverage, and how CPO differs from standard used.", readTime: "5 min" },
  { id: "trade-in-tips", title: "How to Maximize Your Trade-In Value", excerpt: "Prep tips that improve your appraisal.", date: "May 5, 2026", author: "Marcus Williams", category: "Trade-In", image: LUXURY_IMAGES.lot, content: "Service records, condition, and timing that help you get a stronger offer.", readTime: "4 min" },
  { id: "payment-basics", title: "Lease vs Loan: Choosing the Right Payment", excerpt: "Monthly payment math made clear.", date: "April 18, 2026", author: "Sophia Chen", category: "Financing", image: LUXURY_IMAGES.financing, content: "When leasing wins, when buying wins, and how trade-ins change the deal.", readTime: "7 min" },
  { id: "service-intervals", title: "Service Intervals That Keep You On the Road", excerpt: "Oil, brakes, tires, and seasonal checks.", date: "March 30, 2026", author: "Alex Martinez", category: "Service", image: LUXURY_IMAGES.crewWorking, content: "Recommended maintenance windows for new and pre-owned vehicles.", readTime: "5 min" },
  { id: "truck-buying", title: "Choosing the Right Work Truck", excerpt: "Payload, towing, and cab configurations.", date: "March 12, 2026", author: "Marcus Williams", category: "Trucks", image: LUXURY_IMAGES.customHome, content: "Match truck specs to job-site needs without overbuying.", readTime: "6 min" },
];

export const STATS = [
  { value: 18500, label: "Vehicles Sold", suffix: "+" },
  { value: 120, label: "In Stock Now", suffix: "+" },
  { value: 2400, label: "Happy Drivers", suffix: "+" },
  { value: 25, label: "Years in Texas", suffix: "+" },
];

export const FAQ_ITEMS = [
  { question: "How do I schedule a test drive?", answer: "Book online or call any location. Same-day slots are often available for vehicles in stock." },
  { question: "Do you offer financing and leasing?", answer: "Yes — we work with multiple lenders for competitive rates on new, used, and certified vehicles. Apply online or in store." },
  { question: "What areas do you serve?", answer: "Four Central Texas locations: Austin Main, Round Rock, Cedar Park, and San Marcos — with shared inventory search." },
  { question: "How is pricing shown online?", answer: "Every vehicle lists dealer price, available incentives, and an estimated monthly payment you can adjust." },
  { question: "Can I get a trade-in value before I visit?", answer: "Yes — submit your VIN and condition online for a fast estimate, then confirm with an appraisal at the store." },
  { question: "What does certified pre-owned include?", answer: "A multipoint inspection, remaining or extended warranty coverage, and transparent vehicle history." },
];

export const SHOP_MEGA_LINKS = [
  { label: "All inventory", path: "/inventory" },
  { label: "New vehicles", path: "/new-vehicles" },
  { label: "Used vehicles", path: "/used-vehicles" },
  { label: "Certified pre-owned", path: "/certified-pre-owned" },
  { label: "Special offers", path: "/offers" },
] as const;

/** Primary header navigation — keep this list short; shop links live in SHOP_MEGA_LINKS. */
export const NAV_LINKS = [
  { label: "Finance", path: "/finance" },
  { label: "Service & Parts", path: "/service-parts" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "New Vehicles", to: "/new-vehicles" },
  { label: "Used Vehicles", to: "/used-vehicles" },
  { label: "Certified Pre-Owned", to: "/certified-pre-owned" },
  { label: "Finance Center", to: "/finance" },
  { label: "Service & Parts", to: "/service-parts" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Search Inventory", to: "/inventory" },
  { label: "Special Offers", to: "/offers" },
  { label: "About", to: "/about" },
  { label: "Sales Team", to: "/team" },
  { label: "Locations", to: "/service-areas" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Payment Calculator", to: "/finance" },
  { label: "Compare Vehicles", to: "/compare" },
  { label: "Schedule Test Drive", to: "/test-drive" },
  { label: "Dealer Admin", to: "/dealer-admin" },
];

export const SERVICE_AREAS = NEIGHBORHOODS.map(n => n.name);

export const PROJECTS_PAGE_STATS = [
  { value: "120+", label: "Vehicles in stock" },
  { value: "35", label: "New this month" },
  { value: "4.9", label: "Dealer rating" },
  { value: "24hr", label: "Avg. response time" },
];

export const OFFERS = [
  {
    id: "apr-special",
    tag: "Financing",
    title: "0.9% APR for 36 months",
    description: "Qualified buyers on select new models. See dealer for details.",
    validThrough: "August 31, 2026",
    ctaLabel: "View new inventory",
    ctaTo: "/new-vehicles",
  },
  {
    id: "cpo-warranty",
    tag: "CPO",
    title: "$500 off certified pre-owned",
    description: "Includes extended warranty and multipoint inspection on every CPO unit.",
    validThrough: "July 31, 2026",
    ctaLabel: "Shop CPO",
    ctaTo: "/certified-pre-owned",
  },
  {
    id: "service-bundle",
    tag: "Service",
    title: "Free first oil change",
    description: "With any vehicle purchase from our pre-owned inventory.",
    validThrough: "September 15, 2026",
    ctaLabel: "Browse used",
    ctaTo: "/used-vehicles",
  },
  {
    id: "trade-bonus",
    tag: "Trade-in",
    title: "Trade-in bonus up to $1,500",
    description: "Extra value when you trade toward a new or certified vehicle.",
    validThrough: "August 15, 2026",
    ctaLabel: "Value your trade",
    ctaTo: "/value-your-trade",
  },
];

export const ABOUT_STATS = [
  { value: "25+", label: "Years in Texas" },
  { value: "18,500+", label: "Vehicles Sold" },
  { value: "4", label: "Locations" },
  { value: "4.9", label: "Dealer Rating" },
  { value: "40+", label: "Sales & Service Pros" },
];

export const CORE_VALUES = WHY_BENEFITS.slice(0, 6).map((b, i) => ({
  id: `v${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const CERTIFICATIONS = [
  { id: "dealer", label: "Licensed TX Dealer", sub: "Dealer License #DA-482910" },
  { id: "cpo", label: "CPO Certified", sub: "Factory-backed warranties" },
  { id: "service", label: "Factory Service", sub: "OEM parts & trained techs" },
  { id: "reviews", label: "4.9 Dealer Rating", sub: "2,400+ Google reviews" },
  { id: "awards", label: "Industry Awards", sub: "Texas Auto Dealers Association" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "buying", label: "BUYING" },
  { id: "finance", label: "FINANCE" },
  { id: "service", label: "SERVICE" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  buying: [
    { question: "What is the buying process?", answer: "Browse inventory, compare options, test drive, finance or pay cash, complete paperwork, and take delivery or schedule pickup." },
    { question: "Can I buy online?", answer: "Yes — use digital retail to build your deal, apply for financing, and finish in store or with delivery." },
    { question: "Do you sell certified pre-owned?", answer: "Yes — CPO vehicles include multipoint inspection and warranty coverage as listed on each vehicle page." },
  ],
  finance: [
    { question: "How do payments work?", answer: "Use our calculator on any vehicle page, then apply online or with a finance specialist for personalized rates." },
    { question: "Can I lease?", answer: "Lease options are available on select new models — ask about current incentives and mileage limits." },
    { question: "Does my trade-in affect financing?", answer: "Yes — trade equity can reduce your amount financed or monthly payment once the appraisal is confirmed." },
  ],
  service: [
    { question: "Do you service all makes?", answer: "We specialize in the brands we sell and also service many other makes — call for availability." },
    { question: "How do I book service?", answer: "Schedule online via Service & Parts or call your preferred location for same-week appointments." },
    { question: "Do you use OEM parts?", answer: "Yes — factory-trained technicians use OEM or equivalent parts as appropriate for the job." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "New and used vehicles, certified pre-owned, financing, trade-ins, and factory service — everything under one roof across Central Texas.";

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
  category: "AUTOMOTIVE RETAIL",
  title: s.title,
  subtitle: s.description,
  body: [s.description, `Our ${s.title.toLowerCase()} team helps you buy, finance, and stay on the road with confidence.`] as [string, string],
  image: s.image,
  inclusions: ["Transparent pricing", "Expert guidance", "Test drives available", "Finance & trade support", "After-sale service"],
}));

export const LEAD_FORM = {
  title: "Get a personalized quote",
  description: "Tell us what you're looking for — sales, finance, or service will respond within one business day.",
  subtitle: "Tell us what you're looking for — sales, finance, or service will respond within one business day.",
  submitLabel: "Send message",
  successMessage: "Thank you. A Nexora Motors specialist will contact you shortly.",
  bullets: [
    "Transparent pricing on every vehicle",
    "Test drives and digital purchase options",
    "Financing and trade-in support",
    "Factory-trained service & OEM parts",
  ],
};

export const BLOG_TAGS = ["Electric Vehicles", "Buying Guides", "Trade-In", "Financing", "Service", "Trucks"];

export const BLOG_LIST_PAGE_SIZE = 6;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const META_DEFAULT =
  "Nexora Motors — premium automotive dealership in Austin, TX. Search new, used, and certified inventory, calculate payments, value your trade, and schedule a test drive online.";

export const CTA_SECTION = {
  headline: "Ready to Find Your Next Vehicle?",
  primaryCta: { label: "Search Inventory", to: "/inventory" },
  secondaryCta: { label: "Schedule Test Drive", to: "/test-drive" },
};

export const FINANCING_CONTENT = {
  eyebrow: "FINANCE CENTER",
  title: "Payments Made Clear",
  subtitle: "Calculate monthly payments, explore lease options, and apply for financing online.",
  body: "Our finance team works with multiple lenders to help you find competitive rates for new, used, and certified vehicles.",
  image: LUXURY_IMAGES.financing,
  benefits: ["Payment calculator", "Lease & loan options", "Trade-in integration", "Online credit application"],
  cta: { label: "Apply for Financing", to: "/finance" },
};

export const HOME_BUILDER_IMAGES = LUXURY_IMAGES;

export const ABOUT_TIMELINE = [
  { year: "1998", title: "Founded in Austin", description: "Nexora Motors opens its first showroom on Auto Row Boulevard." },
  { year: "2008", title: "CPO Program Launch", description: "Certified pre-owned program with factory-backed warranties." },
  { year: "2018", title: "Digital Showroom", description: "Online inventory, payment tools, and test drive booking go live." },
  { year: "2023", title: "EV Center", description: "Dedicated electric vehicle specialists at Cedar Park." },
  { year: "2026", title: "Digital Retail", description: "End-to-end online purchase flow with delivery and pickup options." },
];

export const AWARDS = [
  { year: "2025", title: "Dealer of Excellence", org: "Texas Auto Dealers Association" },
  { year: "2024", title: "Best Digital Experience", org: "Automotive Retail Summit" },
  { year: "2023", title: "Top Customer Satisfaction", org: "DealerRater" },
];

export const ABOUT_HERO_BADGES = [
  { label: "25+ Years", icon: "Award" as const },
  { label: "120+ In Stock", icon: "Car" as const },
  { label: "4 Locations", icon: "MapPin" as const },
  { label: "4.9 Rating", icon: "ShieldCheck" as const },
];

export const LEAD_MAGNET = {
  title: "EV Buyer's Guide",
  subtitle: "Incentives, charging, and model comparisons for Texas drivers.",
  cta: { label: "GET THE GUIDE", to: "/contact" },
  image: LUXURY_IMAGES.evCharge,
};

export const SERVICE_AREA_COUNTIES = NEIGHBORHOODS.map(n => ({
  county: n.name,
  towns: [n.description],
}));

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed Dealer", description: "TX Dealer License #DA-482910.", icon: "ShieldCheck" as const },
  { id: "service", title: "Factory Service", description: "OEM parts and certified technicians.", icon: "Wrench" as const },
  { id: "local", title: "Local Team", description: "Four Central Texas locations.", icon: "MapPin" as const },
  { id: "digital", title: "Shop Online", description: "Search, compare, and buy digitally.", icon: "Smartphone" as const },
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
  "VIN & title verification",
  "Mechanical multipoint inspection",
  "Brake, tire & fluid check",
  "Electrical & safety systems",
  "Interior & exterior condition",
  "Road test & final QA",
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
    id: "inventory",
    title: "Search Full Inventory",
    subtitle: "New, used, and certified vehicles with transparent pricing.",
    cta: { label: "SEARCH INVENTORY", to: "/inventory" },
    image: LUXURY_IMAGES.showroom,
  },
];
