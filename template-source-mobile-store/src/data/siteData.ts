/**
 * NEXORA MOBILE — Premium phone & device retailer (Austin, TX).
 * Default palette: charcoal, white, Apple-style blue accent.
 */

import { DEMO_PRODUCTS } from "./products";

export { DEMO_PRODUCTS };

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/** Verified Unsplash IDs — phones, tablets, watches, accessories, and retail only */
export const LUXURY_IMAGES = {
  hero: u("1512941937669-90a1b58e7e9c", 1920, 1080),
  heroAlt: u("1511707171634-5f897ff02aa9", 1920, 1080),
  showroom: u("1556742049-0cfed4f6a45d", 1400, 900),
  lot: u("1580910051074-3eb694886505", 1200, 900),
  keys: u("1512428559087-560fa5ceab42", 1200, 900),
  evCharge: u("1488509082528-cefbba5ad692", 1200, 900),
  villa: u("1598327105666-5b89351aff97", 1200, 900),
  penthouse: u("1634403665481-74948d815f03", 1200, 900),
  apartment: u("1523206489230-c012c64b2b48", 1200, 900),
  waterfront: u("1573152143286-0c422b4d2175", 1200, 900),
  interior: u("1522125670776-3c7abb882bc2", 1200, 900),
  kitchen: u("1572016047668-5b5e909e1605", 1200, 900),
  pool: u("1544244015-0df4b3ffc6b0", 1200, 900),
  skyline: u("1531297484001-80022131f5a1f", 1200, 900),
  neighborhood: u("1585060544812-6b45742d762f", 1200, 900),
  development: u("1423784346385-c1d4dac9893a", 1200, 900),
  office: u("1556742049-0cfed4f6a45d", 1200, 900),
  contact: u("1512941937669-90a1b58e7e9c", 1400, 900),
  about: u("1592890288564-76628a30a657", 1400, 900),
  blog: u("1511707171634-5f897ff02aa9", 1400, 900),
  agentA: u("1560250097-0b93528c311a", 600, 800),
  agentB: u("1573496359142-b8d87734a5a2", 600, 800),
  agentC: u("1580489944761-15a19d654956", 600, 800),
  agentD: u("1472099645785-5658abf4ff4e", 600, 800),
  clientA: u("1544005313-94ddf0286df2", 120, 120),
  clientB: u("1519345182560-3f2917c472ef", 120, 120),
  clientC: u("1612349317150-e413f6a5b16d", 120, 120),
  gallery1: u("1512941937669-90a1b58e7e9c", 800, 600),
  gallery2: u("1598327105666-5b89351aff97", 800, 600),
  gallery3: u("1488509082528-cefbba5ad692", 800, 600),
  gallery4: u("1544244015-0df4b3ffc6b0", 800, 600),
  floorPlan: u("1580910051074-3eb694886505", 1200, 900),
  heroHome: u("1512941937669-90a1b58e7e9c", 1600, 1200),
  heroPortfolio: u("1556742049-0cfed4f6a45d", 1920, 1080),
  luxuryExterior: u("1580910051074-3eb694886505", 1200, 900),
  customHome: u("1598327105666-5b89351aff97", 1200, 900),
  homeAddition: u("1634403665481-74948d815f03", 1200, 900),
  wholeHomeRemodel: u("1523206489230-c012c64b2b48", 1200, 900),
  aduGarage: u("1573152143286-0c422b4d2175", 1200, 900),
  interiorLiving: u("1522125670776-3c7abb882bc2", 1200, 900),
  contactHero: u("1556742049-0cfed4f6a45d", 1400, 900),
  aboutHero: u("1592890288564-76628a30a657", 1400, 900),
  reviewsHero: u("1512428559087-560fa5ceab42", 1400, 900),
  processHero: u("1423784346385-c1d4dac9893a", 1400, 900),
  blogHero: u("1511707171634-5f897ff02aa9", 1400, 900),
  crewWorking: u("1585060544812-6b45742d762f", 1200, 900),
  financing: u("1531297484001-80022131f5a1f", 1200, 800),
  architecturalPlans: u("1572016047668-5b5e909e1605", 1200, 900),
  leadMagnet: u("1488509082528-cefbba5ad692", 1200, 900),
} as const;

export const COMPANY = {
  name: "NEXORA Mobile",
  legalName: "Nexora Mobile Retail LLC",
  tagline:
    "Austin's premium destination for new and refurbished phones, tablets, watches, and accessories — shop online or visit our stores.",
  phone: "(512) 555-TECH",
  email: "hello@nexoramobile.com",
  fleetEmail: "business@nexoramobile.com",
  address: "800 Congress Avenue, Austin, TX 78701",
  hours: "Mon–Sat 10am–8pm · Sun 11am–6pm",
  license: "Authorized retailer · Apple & Samsung service partner",
  fax: "",
};

export const SITE_TOP = {
  line: "Free same-day pickup in Austin — 0% APR on select devices",
  badges: ["Certified Refurb", "Trade-In Accepted", "Genius Bar Repairs"],
  ratingValue: "4.9",
  ratingCount: "3,100+",
  ratingLabel: "Google Reviews",
  locations: "Congress Ave · The Domain · South Lamar · Round Rock",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
  { days: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "By appointment" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-97.80%2C30.22%2C-97.72%2C30.30&layer=mapnik&marker=30.2672,-97.7431";

export const HOME_HERO = {
  eyebrow: "AUSTIN · PREMIUM TECH RETAIL",
  headlineBefore: "The Future Is",
  headlineHighlight: "in Your Hands",
  headlineAfter: "",
  body:
    "Shop the latest iPhones, Galaxy flagships, Pixel cameras, and certified refurbished devices with transparent pricing and expert support.",
  primaryCta: { label: "Shop Phones", to: "/shop?category=smartphones" },
  secondaryCta: { label: "Latest Releases", to: "/shop?sort=newest" },
  image: LUXURY_IMAGES.hero,
  trustPills: [
    { label: "200+ Devices", sub: "New & refurbished", icon: "Smartphone" as const },
    { label: "Same-Day Pickup", sub: "Austin stores", icon: "Calendar" as const },
    { label: "0% APR Options", sub: "On select models", icon: "Zap" as const },
  ],
  ratingQuote: "Central Texas trusts Nexora Mobile for honest advice, fair trade-ins, and fast repairs.",
  ratingCard: {
    score: "4.9",
    countLabel: "3,100+ verified Google reviews",
    avatars: [LUXURY_IMAGES.clientA, LUXURY_IMAGES.clientB, LUXURY_IMAGES.clientC, LUXURY_IMAGES.clientA],
  },
  featuredEyebrow: "NEW ARRIVALS",
  featuredTitle: "Flagship Lineup",
  featuredMeta: "iPhone · Galaxy · Pixel · Watch · iPad",
};

export const PROPERTY_CATEGORIES = [
  { id: "smartphones", title: "Smartphones", description: "Latest Android and unlocked flagships.", icon: "Smartphone" as const, image: LUXURY_IMAGES.lot, to: "/shop?category=smartphones" },
  { id: "iphone", title: "iPhones", description: "New and certified Apple iPhone lineup.", icon: "Smartphone" as const, image: LUXURY_IMAGES.heroAlt, to: "/shop?category=iphone" },
  { id: "samsung", title: "Samsung Galaxy", description: "Galaxy S, Z Fold, and A-series devices.", icon: "Smartphone" as const, image: LUXURY_IMAGES.luxuryExterior, to: "/shop?category=samsung" },
  { id: "pixel", title: "Google Pixel", description: "Pure Android and best-in-class cameras.", icon: "Camera" as const, image: LUXURY_IMAGES.customHome, to: "/shop?category=pixel" },
  { id: "refurbished", title: "Refurbished", description: "Certified renewed with warranty included.", icon: "RefreshCw" as const, image: LUXURY_IMAGES.keys, to: "/shop?category=refurbished" },
  { id: "tablets", title: "Tablets", description: "iPad and Galaxy Tab for work and play.", icon: "Tablet" as const, image: LUXURY_IMAGES.interior, to: "/shop?category=tablets" },
  { id: "smartwatches", title: "Watches", description: "Apple Watch and Galaxy Watch.", icon: "Watch" as const, image: LUXURY_IMAGES.evCharge, to: "/shop?category=smartwatches" },
  { id: "accessories", title: "Accessories", description: "Cases, chargers, buds, and more.", icon: "Headphones" as const, image: LUXURY_IMAGES.kitchen, to: "/shop?category=accessories" },
];

export const NEIGHBORHOODS = [
  { id: "congress-ave", name: "Congress Avenue", image: LUXURY_IMAGES.showroom, propertyCount: 120, avgPrice: "Downtown", description: "800 Congress Ave — flagship store, repairs, and pickup hub." },
  { id: "the-domain", name: "The Domain", image: LUXURY_IMAGES.lot, propertyCount: 85, avgPrice: "North Austin", description: "11410 Century Oaks Ter — full lineup and trade-in desk." },
  { id: "south-lamar", name: "South Lamar", image: LUXURY_IMAGES.evCharge, propertyCount: 64, avgPrice: "South Austin", description: "2300 S Lamar Blvd — accessories, quick repairs, and refurbished deals." },
  { id: "round-rock", name: "Round Rock", image: LUXURY_IMAGES.keys, propertyCount: 48, avgPrice: "Round Rock", description: "1100 E Palm Valley Blvd — suburban pickup and business sales." },
];

export const NEW_DEVELOPMENTS = [
  { id: "iphone-launch", title: "iPhone 16 Pro Max", location: "In stock · All stores", image: LUXURY_IMAGES.penthouse, status: "Now Available", progress: 100, unitsTotal: 48, unitsAvailable: 32, priceFrom: "$1,199", completion: "Ships today" },
  { id: "galaxy-fold", title: "Galaxy Z Fold 6", location: "Pre-order · The Domain", image: LUXURY_IMAGES.villa, status: "Pre-Order", progress: 65, unitsTotal: 24, unitsAvailable: 18, priceFrom: "$1,799", completion: "Sept 2026" },
  { id: "pixel-camera", title: "Pixel 9 Pro XL", location: "Camera bundle promo", image: LUXURY_IMAGES.waterfront, status: "Limited Stock", progress: 40, unitsTotal: 36, unitsAvailable: 9, priceFrom: "$999", completion: "While supplies last" },
];

export const SHOWCASE_ITEMS = [
  { id: "showcase-1", title: "Shop Online or In Store", subtitle: "Your choice", description: "Browse specs, compare models, and reserve pickup — or walk in for a hands-on demo with a specialist.", image: LUXURY_IMAGES.showroom, align: "left" as const },
  { id: "showcase-2", title: "Honest Pricing", subtitle: "No hidden fees", description: "See device price, trade-in credit, and monthly payments before you check out.", image: LUXURY_IMAGES.keys, align: "right" as const },
  { id: "showcase-3", title: "Repairs & Support", subtitle: "After you buy", description: "Same-day screen and battery service, data transfer, and warranty help at every location.", image: LUXURY_IMAGES.crewWorking, align: "left" as const },
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
  { id: "browse", label: "Browse", description: "Filter by brand, storage, condition, and price online or with a specialist in store." },
  { id: "compare", label: "Compare", description: "Side-by-side specs, camera samples, and trade-in estimates for your current phone." },
  { id: "checkout", label: "Checkout", description: "Pay in full, finance, or split with trade-in credit — pickup or delivery." },
  { id: "setup", label: "Set Up", description: "Free data transfer, SIM activation help, and case recommendations." },
  { id: "support", label: "Stay Supported", description: "Repairs, warranty claims, and upgrade reminders when you're ready." },
];

export const HOME_STATS = [
  { value: "200+", label: "Devices in Stock", icon: "Smartphone" as const },
  { value: "4", label: "Austin-Area Stores", icon: "MapPin" as const },
  { value: "12+", label: "Years in Tech Retail", icon: "Award" as const },
  { value: "4.9", label: "Store Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  { title: "Transparent Pricing", description: "Device price, promos, and estimated monthly payments on every product page.", icon: "Tag" as const },
  { title: "Certified Repairs", description: "Apple- and Samsung-trained techs with OEM-quality parts.", icon: "Wrench" as const },
  { title: "Shop Your Way", description: "Buy online for pickup, delivery, or walk in for a live demo.", icon: "Smartphone" as const },
  { title: "Four Austin Stores", description: "Shared inventory search across Congress, Domain, Lamar, and Round Rock.", icon: "MapPin" as const },
  { title: "Certified Refurb", description: "30-point inspection, 1-year warranty, and 14-day returns.", icon: "ShieldCheck" as const },
  { title: "5G Ready", description: "Unlocked and carrier-ready devices with plan guidance.", icon: "Zap" as const },
  { title: "Same-Day Pickup", description: "Order by 2pm for pickup at your nearest store.", icon: "Calendar" as const },
  { title: "Trade-In Credit", description: "Instant estimates online or in store toward your next phone.", icon: "RefreshCw" as const },
];

const SERVICE_LIST = [
  { id: "smartphones", title: "Smartphones", icon: "Smartphone", description: "Latest iPhone, Galaxy, Pixel, and unlocked Android flagships.", image: LUXURY_IMAGES.showroom },
  { id: "refurbished", title: "Refurbished", icon: "RefreshCw", description: "Certified renewed devices with warranty included.", image: LUXURY_IMAGES.lot },
  { id: "tablets", title: "Tablets & iPad", icon: "Tablet", description: "Productivity and entertainment tablets in stock.", image: LUXURY_IMAGES.pool },
  { id: "finance", title: "Device Financing", icon: "Calculator", description: "0% APR promos and flexible monthly payments.", image: LUXURY_IMAGES.financing },
  { id: "trade-in", title: "Trade-In", icon: "RefreshCw", description: "Turn your old phone into instant store credit.", image: LUXURY_IMAGES.keys },
  { id: "repairs", title: "Repair Bar", icon: "Wrench", description: "Screens, batteries, ports, and water-damage diagnostics.", image: LUXURY_IMAGES.crewWorking },
  { id: "accessories", title: "Accessories", icon: "Headphones", description: "Cases, chargers, buds, and protection plans.", image: LUXURY_IMAGES.interior },
  { id: "business", title: "Business & Fleet", icon: "Building2", description: "Bulk orders, MDM setup, and invoicing for teams.", image: LUXURY_IMAGES.skyline },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const LISTINGS = DEMO_PRODUCTS;

/** Template compatibility (projects = product catalog) */
export const PROJECTS = LISTINGS;

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 6;
export const LISTINGS_PAGE_SIZE = 6;

export const TEAM = [
  {
    id: "alex-martinez",
    name: "Alex Martinez",
    role: "Store Manager · Congress Ave",
    bio: "Alex leads our flagship team — pairing customers with the right device, plan, and trade-in value.",
    image: LUXURY_IMAGES.agentA,
    languages: ["English", "Spanish"],
    experience: "12 years",
    specialties: ["iPhone", "Financing", "Business"],
    social: { linkedin: "#", instagram: "#", email: "alex@nexoramobile.com" },
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    role: "Mobile Specialist · The Domain",
    bio: "Priya helps shoppers compare Galaxy, Pixel, and iPhone models with side-by-side demos.",
    image: LUXURY_IMAGES.agentC,
    languages: ["English", "Hindi"],
    experience: "9 years",
    specialties: ["Samsung", "Trade-In", "Accessories"],
    social: { linkedin: "#", instagram: "#", email: "priya@nexoramobile.com" },
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    role: "Repair Lead · South Lamar",
    bio: "Marcus runs our repair bar — screen, battery, and water-damage diagnostics with same-day options.",
    image: LUXURY_IMAGES.agentB,
    languages: ["English"],
    experience: "14 years",
    specialties: ["Repairs", "Refurbished", "Data Transfer"],
    social: { linkedin: "#", instagram: "#", email: "marcus@nexoramobile.com" },
  },
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    role: "Digital Retail Director",
    bio: "Sophia oversees online orders, pickup, delivery, and checkout experiences across all stores.",
    image: LUXURY_IMAGES.agentD,
    languages: ["English", "Mandarin"],
    experience: "11 years",
    specialties: ["Online Orders", "Pickup", "Warranty"],
    social: { linkedin: "#", instagram: "#", email: "sophia@nexoramobile.com" },
  },
];

export const TESTIMONIALS = [
  { name: "Jordan T.", role: "iPhone upgrade", quote: "Traded my 13 Pro and walked out with a 16 Pro Max the same day. Pricing matched what they quoted online.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Maria & Luis R.", role: "Family plan switch", quote: "Priya compared Galaxy and Pixel cameras with us for twenty minutes — no pressure, just clear advice.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Chen W.", role: "Screen repair", quote: "Cracked screen fixed in under two hours at South Lamar. Looks brand new.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
  { name: "Aisha K.", role: "Refurbished buyer", quote: "Certified refurbished Pixel looked flawless and saved me hundreds. Warranty included.", avatar: LUXURY_IMAGES.clientA, rating: 5 },
  { name: "Devon P.", role: "Business fleet", quote: "Ordered twelve phones for our sales team — MDM setup and delivery were seamless.", avatar: LUXURY_IMAGES.clientB, rating: 5 },
  { name: "Elena S.", role: "Online pickup", quote: "Ordered at lunch, picked up at Congress Ave after work. Easiest phone upgrade I've had.", avatar: LUXURY_IMAGES.clientC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "flagship-2026", title: "2026 Flagship Phone Guide", excerpt: "iPhone, Galaxy, and Pixel compared for Austin shoppers.", date: "June 10, 2026", author: "Alex Martinez", category: "Buying Guides", image: LUXURY_IMAGES.skyline, content: "Storage, cameras, and battery life — what matters most this year.", readTime: "6 min" },
  { id: "trade-in-tips", title: "Maximize Your Trade-In Value", excerpt: "Condition checks and timing that boost your credit.", date: "May 22, 2026", author: "Priya Shah", category: "Trade-In", image: LUXURY_IMAGES.keys, content: "How we grade devices and when promos stack.", readTime: "5 min" },
  { id: "refurb-myths", title: "Refurbished vs. Used: What's the Difference?", excerpt: "Certification, warranty, and what to look for.", date: "May 5, 2026", author: "Marcus Williams", category: "Refurbished", image: LUXURY_IMAGES.lot, content: "Our 30-point inspection explained.", readTime: "4 min" },
  { id: "accessory-essentials", title: "Must-Have Accessories for a New Phone", excerpt: "Cases, glass, and chargers that actually last.", date: "April 18, 2026", author: "Sophia Chen", category: "Accessories", image: LUXURY_IMAGES.interior, content: "Bundle deals and protection plan tips.", readTime: "4 min" },
  { id: "5g-austin", title: "5G Coverage in Central Texas", excerpt: "What unlocked buyers should know.", date: "March 30, 2026", author: "Alex Martinez", category: "Tech Tips", image: LUXURY_IMAGES.waterfront, content: "Carrier vs. unlocked and eSIM setup.", readTime: "7 min" },
  { id: "watch-pairing", title: "Pairing Your New Apple Watch or Galaxy Watch", excerpt: "Setup, health features, and plan add-ons.", date: "March 12, 2026", author: "Priya Shah", category: "Wearables", image: LUXURY_IMAGES.evCharge, content: "Step-by-step pairing at the repair bar.", readTime: "5 min" },
];

export const STATS = [
  { value: 85000, label: "Devices Sold", suffix: "+" },
  { value: 200, label: "Models In Stock", suffix: "+" },
  { value: 3100, label: "Happy Customers", suffix: "+" },
  { value: 12, label: "Years in Austin", suffix: "+" },
];

export const FAQ_ITEMS = [
  { question: "Do you offer same-day pickup?", answer: "Yes — order online and choose in-store pickup at any Austin-area location, often ready within hours." },
  { question: "What warranty comes with refurbished phones?", answer: "Certified refurbished devices include a 1-year Nexora warranty plus optional AppleCare or Samsung Care." },
  { question: "How does trade-in work?", answer: "Submit your IMEI and condition online or in store. We apply instant credit toward your next device." },
  { question: "Can you transfer my data?", answer: "Every purchase includes complimentary data migration from your old phone at the repair bar." },
  { question: "What repair services do you offer?", answer: "Screen and battery replacement, charging port repair, water damage assessment, and back-glass service." },
  { question: "Is financing available?", answer: "Yes — 0% APR promotions on select models and monthly payment estimates on every product page." },
];

export const SHOP_MEGA_LINKS = [
  { label: "All phones", path: "/shop?category=smartphones" },
  { label: "Tablets", path: "/shop?category=tablets" },
  { label: "Watches", path: "/shop?category=smartwatches" },
  { label: "Accessories", path: "/accessories" },
  { label: "Deals", path: "/deals" },
  { label: "Refurbished", path: "/refurbished" },
] as const;

/** Primary header navigation — keep this list short; shop links live in SHOP_MEGA_LINKS. */
export const NAV_LINKS = [
  { label: "Deals", path: "/deals" },
  { label: "Trade-In", path: "/trade-in" },
  { label: "Repairs", path: "/repairs" },
  { label: "Stores", path: "/stores" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Shop Phones", to: "/shop?category=smartphones" },
  { label: "Refurbished", to: "/shop?category=refurbished" },
  { label: "Tablets & Watches", to: "/shop?category=tablets" },
  { label: "Device Financing", to: "/finance" },
  { label: "Repairs", to: "/repairs" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Shop All", to: "/shop" },
  { label: "Special Offers", to: "/offers" },
  { label: "About", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Store Locations", to: "/stores" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Payment Calculator", to: "/finance" },
  { label: "Compare Phones", to: "/compare" },
  { label: "Trade-In Value", to: "/trade-in" },
  { label: "My Account", to: "/account" },
];

export const SERVICE_AREAS = NEIGHBORHOODS.map(n => n.name);

export const PROJECTS_PAGE_STATS = [
  { value: "200+", label: "Devices in stock" },
  { value: "40+", label: "New this month" },
  { value: "4.9", label: "Store rating" },
  { value: "Same day", label: "Pickup available" },
];

export const OFFERS = [
  {
    id: "iphone-trade",
    tag: "Trade-In",
    title: "Extra $100 on iPhone trade-ins",
    description: "Through August — stack with carrier promos when you upgrade in store.",
    validThrough: "August 31, 2026",
    ctaLabel: "Start trade-in",
    ctaTo: "/trade-in",
  },
  {
    id: "refurb-deal",
    tag: "Refurbished",
    title: "Certified refurbished from $299",
    description: "1-year warranty, 30-point inspection, and 14-day returns.",
    validThrough: "July 31, 2026",
    ctaLabel: "Shop refurbished",
    ctaTo: "/refurbished",
  },
  {
    id: "accessory-bundle",
    tag: "Accessories",
    title: "Case + screen protector bundle 20% off",
    description: "With any new phone purchase this month.",
    validThrough: "September 15, 2026",
    ctaLabel: "Shop accessories",
    ctaTo: "/accessories",
  },
  {
    id: "apr-special",
    tag: "Financing",
    title: "0% APR for 24 months",
    description: "On select flagship phones with approved credit.",
    validThrough: "August 15, 2026",
    ctaLabel: "Shop deals",
    ctaTo: "/deals",
  },
];

export const ABOUT_STATS = [
  { value: "12+", label: "Years in Austin" },
  { value: "85,000+", label: "Devices Sold" },
  { value: "4", label: "Retail Locations" },
  { value: "4.9", label: "Store Rating" },
  { value: "40+", label: "Mobile Specialists" },
];

export const CORE_VALUES = WHY_BENEFITS.slice(0, 6).map((b, i) => ({
  id: `v${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const CERTIFICATIONS = [
  { id: "apple", label: "Apple Authorized", sub: "Sales & service partner" },
  { id: "samsung", label: "Samsung Care", sub: "Certified repair network" },
  { id: "refurb", label: "Certified Refurb", sub: "30-point inspection" },
  { id: "reviews", label: "4.9 Store Rating", sub: "3,100+ Google reviews" },
  { id: "local", label: "Locally Owned", sub: "Austin since 2014" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "buying", label: "BUYING" },
  { id: "tradein", label: "TRADE-IN" },
  { id: "repairs", label: "REPAIRS" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  buying: [
    { question: "Do you sell unlocked phones?", answer: "Yes — most smartphones are available unlocked and compatible with major US carriers." },
    { question: "Can I finance a device?", answer: "Select models qualify for 0% APR promotions; use our calculator on any product page." },
    { question: "What comes in the box?", answer: "New devices include OEM charging cable and documentation; refurbished units include Nexora-certified accessories where noted." },
  ],
  tradein: [
    { question: "How is trade-in value calculated?", answer: "We use model, storage, carrier lock status, and cosmetic condition — online estimates match in-store when details are accurate." },
    { question: "Can I trade in a broken phone?", answer: "Cracked screens and weak batteries may still qualify for partial credit toward a new device." },
    { question: "When is credit applied?", answer: "Instant credit at checkout in store or after inspection for mail-in trade-ins." },
  ],
  repairs: [
    { question: "How long do repairs take?", answer: "Most screen and battery jobs finish same day; water damage may take 24–48 hours." },
    { question: "Do repairs void my warranty?", answer: "Authorized repairs through Nexora Mobile preserve applicable OEM warranties when using approved parts." },
    { question: "Do you offer loaner phones?", answer: "Loaners are available for select repair appointments — ask at the repair bar." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Phones, tablets, watches, trade-ins, financing, and repairs — everything you need from one Austin-based team.";

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
  category: "MOBILE RETAIL",
  title: s.title,
  subtitle: s.description,
  body: [s.description, `Our ${s.title.toLowerCase()} specialists help you choose, pay, and stay connected.`] as [string, string],
  image: s.image,
  inclusions: ["Expert advice", "Transparent pricing", "Setup & data transfer", "Warranty options", "Ongoing support"],
}));

export const LEAD_FORM = {
  title: "Questions about your order or device?",
  description: "Sales, repairs, and trade-in teams respond within one business day.",
  subtitle: "Sales, repairs, and trade-in teams respond within one business day.",
  submitLabel: "Send message",
  successMessage: "Thank you. A Nexora Mobile specialist will contact you shortly.",
  bullets: [
    "Transparent pricing on every device",
    "Same-day pickup and delivery options",
    "Trade-in and financing support",
    "Certified repairs & data transfer",
  ],
};

export const REPAIR_SERVICES = [
  { id: "screen", title: "Screen replacement", description: "OLED and LCD repairs for iPhone, Samsung, and Pixel.", priceFrom: "$89", duration: "1–2 hours" },
  { id: "battery", title: "Battery service", description: "Restore all-day battery life with genuine-quality cells.", priceFrom: "$69", duration: "45 min" },
  { id: "charging", title: "Charging port", description: "Fix loose ports, lint buildup, and charging failures.", priceFrom: "$79", duration: "Same day" },
  { id: "water", title: "Water damage", description: "Diagnostic, cleaning, and component-level recovery.", priceFrom: "$49", duration: "24–48 hrs" },
  { id: "back-glass", title: "Back glass", description: "Laser-assisted back glass replacement on supported models.", priceFrom: "$99", duration: "2–3 hours" },
  { id: "data", title: "Data transfer", description: "Move photos, contacts, and apps to your new device.", priceFrom: "Free with purchase", duration: "30 min" },
];

export const BLOG_TAGS = ["Buying Guides", "Trade-In", "Refurbished", "Accessories", "Tech Tips", "Wearables"];

export const BLOG_LIST_PAGE_SIZE = 6;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const META_DEFAULT =
  "Nexora Mobile — premium phone retailer in Austin, TX. Shop iPhones, Galaxy, Pixel, tablets, watches, and accessories. Trade-in, repairs, and same-day pickup.";

export const CTA_SECTION = {
  headline: "Ready for Your Next Device?",
  primaryCta: { label: "Shop Phones", to: "/shop" },
  secondaryCta: { label: "Trade-In Value", to: "/trade-in" },
};

export const FINANCING_CONTENT = {
  eyebrow: "DEVICE FINANCING",
  title: "Payments Made Clear",
  subtitle: "Calculate monthly payments and apply for financing on phones, tablets, and watches.",
  body: "We work with multiple lenders to offer competitive rates on new and certified refurbished devices.",
  image: LUXURY_IMAGES.financing,
  benefits: ["Payment calculator", "0% APR promos", "Trade-in integration", "Online application"],
  cta: { label: "Apply for Financing", to: "/finance" },
};

export const HOME_BUILDER_IMAGES = LUXURY_IMAGES;

export const ABOUT_TIMELINE = [
  { year: "2014", title: "First Austin Store", description: "Opened on Congress Avenue as a focused smartphone and repair shop." },
  { year: "2018", title: "Certified Refurb Program", description: "Launched 30-point refurb certification with 1-year Nexora warranty." },
  { year: "2021", title: "Expanded Footprint", description: "Added The Domain and South Lamar locations with shared inventory." },
  { year: "2024", title: "Business & Fleet", description: "MDM setup, bulk ordering, and invoicing for Central Texas teams." },
  { year: "2026", title: "Full Digital Checkout", description: "Buy online, pick up in store, or schedule delivery across Austin." },
];

export const AWARDS = [
  { year: "2025", title: "Best Mobile Retailer", org: "Austin Business Journal" },
  { year: "2024", title: "Top Customer Service", org: "Central Texas Consumers' Choice" },
  { year: "2023", title: "Excellence in Repairs", org: "Samsung Authorized Partner Awards" },
];

export const ABOUT_HERO_BADGES = [
  { label: "12+ Years", icon: "Award" as const },
  { label: "200+ In Stock", icon: "Smartphone" as const },
  { label: "4 Locations", icon: "MapPin" as const },
  { label: "4.9 Rating", icon: "ShieldCheck" as const },
];

export const LEAD_MAGNET = {
  title: "Phone Buyer's Guide",
  subtitle: "Compare flagships, storage tiers, and trade-in timing for 2026.",
  cta: { label: "GET THE GUIDE", to: "/contact" },
  image: LUXURY_IMAGES.heroAlt,
};

export const SERVICE_AREA_COUNTIES = NEIGHBORHOODS.map(n => ({
  county: n.name,
  towns: [n.description],
}));

export const CONTACT_TRUST_STRIP = [
  { id: "authorized", title: "Authorized Retailer", description: "Apple & Samsung sales and service partner.", icon: "ShieldCheck" as const },
  { id: "service", title: "Repair Bar", description: "Same-day screen and battery service.", icon: "Wrench" as const },
  { id: "local", title: "Local Team", description: "Four Austin-area stores.", icon: "MapPin" as const },
  { id: "digital", title: "Shop Online", description: "Compare, cart, and pickup digitally.", icon: "Smartphone" as const },
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
  "IMEI & activation check",
  "Battery health test",
  "Display & touch test",
  "Camera & speaker test",
  "Cosmetic grading",
  "Data wipe & reset",
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
    title: "Shop the Full Lineup",
    subtitle: "New, refurbished, tablets, watches, and accessories with upfront pricing.",
    cta: { label: "SHOP NOW", to: "/shop" },
    image: LUXURY_IMAGES.showroom,
  },
];
