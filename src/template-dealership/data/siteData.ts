/**
 * NEXORA MOTORS — Premium automotive dealership content registry.
 * Default palette: charcoal, graphite, electric blue accent.
 * Images sourced from Unsplash (showrooms, vehicles, service).
 */

import { DEMO_INVENTORY } from "./inventory";

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const LUXURY_IMAGES = {
  hero: u("1692406069831-0bb7ea297645", 1920, 1080),
  heroAlt: u("1618642624018-a370cbf3cd80", 1920, 1080),
  showroom: u("1692406069831-0bb7ea297645", 1400, 900),
  lot: u("1574023240744-64c47c8c0676", 1200, 900),
  keys: u("1653565217811-85b41bcd1edb", 1200, 900),
  evCharge: u("1593941707874-ef25b8b4a92b", 1200, 900),
  villa: u("1771366260867-7e07094579d7", 1200, 900),
  penthouse: u("1502672260266-1c1ef2d93688", 1200, 900),
  apartment: u("1545324418-cc1a3fa10c00", 1200, 900),
  waterfront: u("1512917774080-9991f1c4c750", 1200, 900),
  interior: u("1600210491892-03d54c0aaf87", 1200, 900),
  kitchen: u("1697609996790-f00fe4568e1d", 1200, 900),
  pool: u("1600585154340-be6161a56a0c", 1200, 900),
  skyline: u("1486406146926-c627a92ad1ab", 1200, 900),
  neighborhood: u("1612296350607-076d142d15cd", 1200, 900),
  development: u("1486325212027-8081e485255e", 1200, 900),
  office: u("1497366216548-37526070297c", 1200, 900),
  contact: u("1560518883-ce09059eeffa", 1400, 900),
  about: u("1600607687939-ce8a6c25118c", 1400, 900),
  blog: u("1560448204-e02f11c3d0e2", 1400, 900),
  agentA: u("1560250097-0b93528c311a", 600, 800),
  agentB: u("1573496359142-b8d87734a5a2", 600, 800),
  agentC: u("1580489944761-15a19d654956", 600, 800),
  agentD: u("1472099645785-5658abf4ff4e", 600, 800),
  clientA: u("1544005313-94ddf0286df2", 120, 120),
  clientB: u("1519345182560-3f2917c472ef", 120, 120),
  clientC: u("1612349317150-e413f6a5b16d", 120, 120),
  gallery1: u("1600566753190-17f0baa2a6c3", 800, 600),
  gallery2: u("1600607687644-c7171b42498f", 800, 600),
  gallery3: u("1779333090247-eafeccd1d049", 800, 600),
  gallery4: u("1631679706909-1844bbd07221", 800, 600),
  floorPlan: u("1503387762-592deb58ef4e", 1200, 900),
  /* Page hero aliases (verified HTTP 200) */
  heroHome: u("1600596542815-ffad4c1539a9", 1600, 1200),
  heroPortfolio: u("1779333090247-eafeccd1d049", 1920, 1080),
  luxuryExterior: u("1545324418-cc1a3fa10c00", 1200, 900),
  customHome: u("1771366260867-7e07094579d7", 1200, 900),
  homeAddition: u("1779226347538-ca1a725ae550", 1200, 900),
  wholeHomeRemodel: u("1600210491892-03d54c0aaf87", 1200, 900),
  aduGarage: u("1560518883-ce09059eeffa", 1200, 900),
  interiorLiving: u("1631679706909-1844bbd07221", 1200, 900),
  contactHero: u("1600596542815-ffad4c1539a9", 1400, 900),
  aboutHero: u("1600607687939-ce8a6c25118c", 1400, 900),
  reviewsHero: u("1631679706909-1844bbd07221", 1400, 900),
  processHero: u("1503387762-592deb58ef4e", 1400, 900),
  blogHero: u("1454165804606-c3d57bc86b40", 1400, 900),
  crewWorking: u("1497366216548-37526070297c", 1200, 900),
  financing: u("1486406146926-c627a92ad1ab", 1200, 800),
  architecturalPlans: u("1454165804606-c3d57bc86b40", 1200, 900),
  leadMagnet: u("1454165804606-c3d57bc86b40", 1200, 900),
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
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.74%2C-73.95%2C40.78&layer=mapnik&marker=40.7614,-73.9776";

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
  { id: "park-avenue-residences", title: "Park Avenue Residences", location: "Upper East Side, NY", image: LUXURY_IMAGES.development, status: "Under Construction", progress: 72, unitsTotal: 48, unitsAvailable: 12, priceFrom: "$3.2M", completion: "Q4 2026" },
  { id: "hudson-yards-tower", title: "Hudson Yards Tower", location: "West Side, NY", image: LUXURY_IMAGES.skyline, status: "Pre-Sales", progress: 35, unitsTotal: 120, unitsAvailable: 86, priceFrom: "$2.8M", completion: "Q2 2027" },
  { id: "palm-beach-shores", title: "Palm Beach Shores", location: "Palm Beach, FL", image: LUXURY_IMAGES.waterfront, status: "Now Selling", progress: 90, unitsTotal: 24, unitsAvailable: 4, priceFrom: "$5.5M", completion: "Q1 2026" },
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
  { id: "discover", label: "Discover", description: "Share your vision, lifestyle, and investment criteria with a dedicated advisor." },
  { id: "curate", label: "Curate", description: "Receive a personalized portfolio of on-market and off-market properties." },
  { id: "view", label: "Private Viewings", description: "Experience residences through exclusive, unhurried showings." },
  { id: "negotiate", label: "Negotiate", description: "Expert representation backed by deep market intelligence." },
  { id: "close", label: "Close & Beyond", description: "White-glove closing support and post-sale concierge services." },
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
  { name: "Catherine M.", role: "Park Avenue Buyer", quote: "Sophia understood exactly what we were looking for — the penthouse she found wasn't even on the market yet. Flawless execution from first viewing to closing.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "David & Rachel K.", role: "Hamptons Sellers", quote: "Marcus positioned our estate beautifully. We received multiple offers above asking within two weeks.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Thomas L.", role: "International Investor", quote: "The team's market intelligence and discretion made our portfolio acquisition seamless across three states.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
  { name: "Isabella R.", role: "Tribeca Buyer", quote: "From virtual tours abroad to in-person closings, Elena managed every detail of our relocation.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Michael P.", role: "Greenwich Seller", quote: "Editorial photography and targeted marketing attracted the right buyer — not just any buyer.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Anna S.", role: "Miami Beach Buyer", quote: "A truly premium experience. Nexora Estate sets the standard for luxury real estate advisory.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "luxury-market-2025", title: "Luxury Market Outlook 2025", excerpt: "Key trends shaping premier residential markets.", date: "June 10, 2025", author: "James Harrington", category: "Market Insights", image: LUXURY_IMAGES.skyline, content: "Analysis of inventory, pricing, and buyer sentiment across top-tier markets.", readTime: "6 min" },
  { id: "penthouse-buying-guide", title: "The Complete Penthouse Buying Guide", excerpt: "What to know before purchasing at altitude.", date: "May 22, 2025", author: "Sophia Chen", category: "Buying", image: LUXURY_IMAGES.penthouse, content: "HOA structures, terrace rights, and engineering considerations.", readTime: "8 min" },
  { id: "hamptons-summer", title: "Hamptons Summer: Where to Invest", excerpt: "Neighborhoods gaining momentum this season.", date: "May 5, 2025", author: "Marcus Williams", category: "Neighborhoods", image: LUXURY_IMAGES.waterfront, content: "From Southampton to Montauk — a market-by-market guide.", readTime: "5 min" },
  { id: "staging-secrets", title: "Staging Secrets for Luxury Sellers", excerpt: "How presentation drives premium offers.", date: "April 18, 2025", author: "Elena Voss", category: "Selling", image: LUXURY_IMAGES.interior, content: "Professional staging strategies that consistently deliver results.", readTime: "4 min" },
  { id: "international-buyers", title: "Guide for International Buyers", excerpt: "Navigating US luxury real estate from abroad.", date: "March 30, 2025", author: "Sophia Chen", category: "Buying", image: LUXURY_IMAGES.office, content: "Financing, visas, and tax considerations for foreign nationals.", readTime: "7 min" },
  { id: "new-dev-trends", title: "New Development Trends", excerpt: "Amenities buyers demand in 2025.", date: "March 12, 2025", author: "James Harrington", category: "Developments", image: LUXURY_IMAGES.development, content: "Wellness, sustainability, and privacy in new luxury towers.", readTime: "5 min" },
];

export const STATS = [
  { value: 1200, label: "Properties Sold", suffix: "+" },
  { value: 450, label: "Active Listings", suffix: "+" },
  { value: 3200, label: "Happy Clients", suffix: "+" },
  { value: 30, label: "Years Experience", suffix: "+" },
];

export const FAQ_ITEMS = [
  { question: "How do I schedule a private viewing?", answer: "Contact your advisor or use our inquiry form. We arrange exclusive, unhurried showings at your convenience." },
  { question: "Do you work with international buyers?", answer: "Yes — our team supports clients in twelve countries with virtual tours, legal coordination, and relocation services." },
  { question: "What areas do you serve?", answer: "Manhattan, Brooklyn, Hamptons, Greenwich, Palm Beach, Miami, Aspen, and select international markets." },
  { question: "How are listings priced?", answer: "We provide comprehensive market analysis using comparable sales, active inventory, and proprietary data." },
  { question: "Can you help me sell my property?", answer: "Our selling program includes editorial photography, targeted marketing, and strategic negotiation." },
  { question: "Do you offer property management?", answer: "Full-service management for investment and second homes, including maintenance and tenant placement." },
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
  { value: "30+", label: "Years of Excellence" },
  { value: "1,200+", label: "Properties Sold" },
  { value: "12", label: "Countries" },
  { value: "4.9", label: "Client Rating" },
  { value: "50+", label: "Expert Advisors" },
];

export const CORE_VALUES = WHY_BENEFITS.slice(0, 6).map((b, i) => ({
  id: `v${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const CERTIFICATIONS = [
  { id: "luxury", label: "Luxury Portfolio", sub: "Premier market specialist" },
  { id: "international", label: "International Network", sub: "12-country reach" },
  { id: "equal", label: "Equal Housing", sub: "Fair housing commitment" },
  { id: "reviews", label: "4.9 Client Rating", sub: "320+ verified reviews" },
  { id: "awards", label: "Industry Awards", sub: "Top brokerage recognition" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "buying", label: "BUYING" },
  { id: "selling", label: "SELLING" },
  { id: "renting", label: "RENTING" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  buying: [
    { question: "What is the buying process?", answer: "Discovery, curated search, private viewings, offer strategy, due diligence, and closing." },
    { question: "Do you offer off-market listings?", answer: "Yes — our network provides access to properties before public marketing." },
    { question: "Can I get a mortgage through you?", answer: "We partner with premier lenders and provide mortgage calculator tools on listing pages." },
  ],
  selling: [
    { question: "How do you market luxury properties?", answer: "Editorial photography, targeted digital campaigns, and private broker networks." },
    { question: "What is your commission structure?", answer: "Discussed transparently during your initial consultation." },
    { question: "How long does it take to sell?", answer: "Varies by market — we provide data-driven timeline estimates." },
  ],
  renting: [
    { question: "What rental terms do you offer?", answer: "Short-term, annual, and corporate leases across our luxury portfolio." },
    { question: "Are rentals furnished?", answer: "Many are — we specify furnishing status on each listing." },
    { question: "Do you handle tenant screening?", answer: "Full screening and lease administration for landlord clients." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Comprehensive real estate advisory — buying, selling, renting, and investment consulting for discerning clients.";

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
  category: "LUXURY REAL ESTATE",
  title: s.title,
  subtitle: s.description,
  body: [s.description, `Our ${s.title.toLowerCase()} team delivers white-glove service tailored to your goals.`] as [string, string],
  image: s.image,
  inclusions: ["Dedicated advisor", "Market analysis", "Private viewings", "Negotiation support", "Closing coordination"],
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

export const BLOG_TAGS = ["Market Insights", "Buying", "Selling", "Neighborhoods", "Developments", "Lifestyle"];

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
  "Market analysis",
  "Property valuation",
  "Neighborhood assessment",
  "Investment potential",
  "Legal review coordination",
  "Closing timeline",
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
