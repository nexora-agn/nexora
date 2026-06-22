/**
 * NEXORA ESTATE — Luxury Real Estate content registry.
 * Editorial luxury palette: warm whites, charcoal, champagne gold.
 * Images sourced from Unsplash (luxury architecture & interiors).
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const LUXURY_IMAGES = {
  hero: u("1600596542815-ffad4c1539a9", 1920, 1080),
  heroAlt: u("1613490493576-7fde63acd811", 1920, 1080),
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
  name: "NEXORA ESTATE",
  legalName: "Nexora Estate International Realty",
  tagline:
    "Curating exceptional residences and investment opportunities for discerning buyers across premier markets.",
  phone: "(212) 555-0198",
  email: "concierge@nexoraestate.com",
  address: "450 Park Avenue, Suite 2800, New York, NY 10022",
  hours: "Mon–Sat 9am–7pm · Sunday by appointment",
  license: "NY DOS #10401234567 · Equal Housing Opportunity",
  fax: "",
};

export const SITE_TOP = {
  line: "Exclusive Listings — Schedule a Private Viewing",
  badges: ["Luxury Specialists", "International Network", "30+ Years"],
  ratingValue: "4.9",
  ratingCount: "320+",
  ratingLabel: "Client Reviews",
  locations: "Manhattan · Brooklyn · Hamptons · Greenwich · Palm Beach · Miami",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
  { days: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "By appointment" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.74%2C-73.95%2C40.78&layer=mapnik&marker=40.7614,-73.9776";

export const HOME_HERO = {
  eyebrow: "LUXURY REAL ESTATE",
  headlineBefore: "Luxury Living",
  headlineHighlight: "Begins Here",
  headlineAfter: "",
  body:
    "Discover exceptional homes, apartments and investment opportunities curated by trusted real estate professionals.",
  primaryCta: { label: "Browse Properties", to: "/listings" },
  secondaryCta: { label: "Contact an Agent", to: "/contact" },
  image: LUXURY_IMAGES.hero,
  trustPills: [
    { label: "Exclusive Listings", sub: "Off-market access", icon: "Award" as const },
    { label: "Global Network", sub: "12 countries", icon: "Globe" as const },
    { label: "White-Glove Service", sub: "End-to-end advisory", icon: "Heart" as const },
  ],
  ratingQuote: "Trusted by buyers, sellers, and investors across premier residential markets.",
  ratingCard: {
    score: "4.9",
    countLabel: "320+ verified client reviews",
    avatars: [LUXURY_IMAGES.clientA, LUXURY_IMAGES.clientB, LUXURY_IMAGES.clientC, LUXURY_IMAGES.clientA],
  },
  featuredEyebrow: "FEATURED",
  featuredTitle: "Penthouse Collection",
  featuredMeta: "Manhattan · Waterfront · New Developments",
};

export const PROPERTY_CATEGORIES = [
  { id: "villas", title: "Luxury Villas", description: "Estate properties with privacy and prestige.", icon: "Home" as const, image: LUXURY_IMAGES.villa, to: "/listings?type=villa" },
  { id: "apartments", title: "Modern Apartments", description: "Architectural residences in prime locations.", icon: "Building2" as const, image: LUXURY_IMAGES.apartment, to: "/listings?type=apartment" },
  { id: "penthouses", title: "Penthouses", description: "Sky-high living with panoramic views.", icon: "Layers" as const, image: LUXURY_IMAGES.penthouse, to: "/listings?type=penthouse" },
  { id: "waterfront", title: "Waterfront", description: "Coastal and riverfront estates.", icon: "Waves" as const, image: LUXURY_IMAGES.waterfront, to: "/listings?type=waterfront" },
  { id: "commercial", title: "Commercial", description: "Premium office and retail assets.", icon: "Briefcase" as const, image: LUXURY_IMAGES.office, to: "/listings?type=commercial" },
  { id: "investment", title: "Investment", description: "Income-producing luxury portfolios.", icon: "TrendingUp" as const, image: LUXURY_IMAGES.skyline, to: "/listings?type=investment" },
  { id: "land", title: "Land", description: "Development-ready parcels.", icon: "Map" as const, image: LUXURY_IMAGES.neighborhood, to: "/listings?type=land" },
  { id: "developments", title: "New Developments", description: "Pre-construction and new-build projects.", icon: "Construction" as const, image: LUXURY_IMAGES.development, to: "/developments" },
];

export const NEIGHBORHOODS = [
  { id: "upper-east-side", name: "Upper East Side", image: LUXURY_IMAGES.apartment, propertyCount: 42, avgPrice: "$4.2M", description: "Classic pre-war elegance meets modern luxury." },
  { id: "tribeca", name: "Tribeca", image: LUXURY_IMAGES.penthouse, propertyCount: 28, avgPrice: "$6.8M", description: "Loft living and celebrity-favorite addresses." },
  { id: "hamptons", name: "The Hamptons", image: LUXURY_IMAGES.waterfront, propertyCount: 35, avgPrice: "$8.5M", description: "Coastal estates and summer retreats." },
  { id: "greenwich", name: "Greenwich", image: LUXURY_IMAGES.villa, propertyCount: 19, avgPrice: "$5.1M", description: "Connecticut's gold coast grandeur." },
  { id: "miami-beach", name: "Miami Beach", image: LUXURY_IMAGES.pool, propertyCount: 31, avgPrice: "$3.9M", description: "Art Deco glamour and waterfront towers." },
  { id: "aspen", name: "Aspen", image: LUXURY_IMAGES.villa, propertyCount: 14, avgPrice: "$12M", description: "Alpine luxury and ski-in residences." },
];

export const NEW_DEVELOPMENTS = [
  { id: "park-avenue-residences", title: "Park Avenue Residences", location: "Upper East Side, NY", image: LUXURY_IMAGES.development, status: "Under Construction", progress: 72, unitsTotal: 48, unitsAvailable: 12, priceFrom: "$3.2M", completion: "Q4 2026" },
  { id: "hudson-yards-tower", title: "Hudson Yards Tower", location: "West Side, NY", image: LUXURY_IMAGES.skyline, status: "Pre-Sales", progress: 35, unitsTotal: 120, unitsAvailable: 86, priceFrom: "$2.8M", completion: "Q2 2027" },
  { id: "palm-beach-shores", title: "Palm Beach Shores", location: "Palm Beach, FL", image: LUXURY_IMAGES.waterfront, status: "Now Selling", progress: 90, unitsTotal: 24, unitsAvailable: 4, priceFrom: "$5.5M", completion: "Q1 2026" },
];

export const SHOWCASE_ITEMS = [
  { id: "showcase-1", title: "Architectural Excellence", subtitle: "Where design meets lifestyle", description: "Every residence in our portfolio is selected for architectural significance, quality of finishes, and long-term value.", image: LUXURY_IMAGES.interior, align: "left" as const },
  { id: "showcase-2", title: "Curated Experiences", subtitle: "Beyond the transaction", description: "From private viewings to relocation support, our advisors deliver a seamless journey at every stage.", image: LUXURY_IMAGES.kitchen, align: "right" as const },
  { id: "showcase-3", title: "Global Reach", subtitle: "Local expertise, worldwide", description: "Through our international network, we connect clients to premier properties across twelve countries.", image: LUXURY_IMAGES.skyline, align: "left" as const },
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
  { value: "$2.8B+", label: "Sales Volume", icon: "TrendingUp" as const },
  { value: "1,200+", label: "Properties Sold", icon: "Home" as const },
  { value: "30+", label: "Years Experience", icon: "Award" as const },
  { value: "4.9", label: "Client Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  { title: "Local Experts", description: "Deep neighborhood knowledge across every market we serve.", icon: "MapPin" as const },
  { title: "Trusted Advisors", description: "Discreet, client-first guidance through every transaction.", icon: "ShieldCheck" as const },
  { title: "Exclusive Listings", description: "Access to off-market and pre-market opportunities.", icon: "Key" as const },
  { title: "International Network", description: "Premier partnerships across twelve countries worldwide.", icon: "Globe" as const },
  { title: "Personalized Service", description: "Tailored search, viewings, and negotiation strategies.", icon: "Heart" as const },
  { title: "Market Knowledge", description: "Data-driven insights for confident buying and selling.", icon: "BarChart" as const },
  { title: "Professional Photography", description: "Editorial-quality marketing for every listing.", icon: "Camera" as const },
  { title: "Legal Guidance", description: "Coordination with top attorneys and closing specialists.", icon: "Scale" as const },
];

const SERVICE_LIST = [
  { id: "buying", title: "Buying", icon: "Home", description: "Expert representation for discerning buyers seeking exceptional residences.", image: LUXURY_IMAGES.villa },
  { id: "selling", title: "Selling", icon: "Tag", description: "Strategic marketing and negotiation to maximize your property's value.", image: LUXURY_IMAGES.apartment },
  { id: "renting", title: "Renting", icon: "Key", description: "Curated luxury rentals for short and long-term stays.", image: LUXURY_IMAGES.penthouse },
  { id: "property-management", title: "Property Management", icon: "Settings", description: "Full-service management for investment and second homes.", image: LUXURY_IMAGES.interior },
  { id: "investment-consulting", title: "Investment Consulting", icon: "TrendingUp", description: "Portfolio strategy for luxury real estate investors.", image: LUXURY_IMAGES.skyline },
  { id: "relocation", title: "Relocation", icon: "Plane", description: "Seamless transitions for domestic and international moves.", image: LUXURY_IMAGES.neighborhood },
  { id: "interior-consultation", title: "Interior Consultation", icon: "Palette", description: "Designer introductions and staging for premium properties.", image: LUXURY_IMAGES.kitchen },
  { id: "property-valuation", title: "Property Valuation", icon: "Calculator", description: "Comprehensive market analysis and pricing strategy.", image: LUXURY_IMAGES.office },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const LISTINGS = [
  {
    id: "park-avenue-penthouse",
    title: "Park Avenue Penthouse",
    category: "Penthouse",
    propertyType: "penthouse",
    listingType: "buy" as const,
    status: "for-sale" as const,
    featured: true,
    badges: ["featured", "new"] as const,
    serviceId: "buying",
    location: "Upper East Side",
    address: "980 Park Avenue, PH",
    city: "New York, NY",
    price: 18500000,
    priceLabel: "$18,500,000",
    bedrooms: 5,
    bathrooms: 5.5,
    garage: 2,
    sqft: 6200,
    year: "2024",
    client: "Private Seller",
    value: "$18.5M",
    description: "A trophy penthouse with 360° city views, private elevator, and terrace spanning the entire floor. Chef's kitchen, wine room, and five ensuite bedrooms.",
    image: LUXURY_IMAGES.penthouse,
    gallery: [LUXURY_IMAGES.penthouse, LUXURY_IMAGES.interior, LUXURY_IMAGES.kitchen, LUXURY_IMAGES.gallery1],
    agentId: "sophia-chen",
    amenities: ["Private Elevator", "Terrace", "Wine Room", "Smart Home", "Concierge"],
    features: ["Floor-to-ceiling windows", "Marble finishes", "Custom millwork", "Central AC"],
    videoUrl: "",
    floorPlanUrl: LUXURY_IMAGES.floorPlan,
    virtualTourUrl: "#",
    energyRating: "A",
    lat: 40.7749,
    lng: -73.9654,
    openHouse: "Sat 2–5 PM",
    number: 1,
  },
  {
    id: "tribeca-loft",
    title: "Tribeca Industrial Loft",
    category: "Apartment",
    propertyType: "apartment",
    listingType: "buy" as const,
    status: "for-sale" as const,
    featured: true,
    badges: ["open-house"] as const,
    serviceId: "buying",
    location: "Tribeca",
    address: "45 Hudson Street, 4W",
    city: "New York, NY",
    price: 7200000,
    priceLabel: "$7,200,000",
    bedrooms: 3,
    bathrooms: 3,
    garage: 1,
    sqft: 3400,
    year: "2023",
    client: "Private Seller",
    value: "$7.2M",
    description: "Soaring 14-foot ceilings, original timber beams, and a chef's kitchen in the heart of Tribeca's gallery district.",
    image: LUXURY_IMAGES.apartment,
    gallery: [LUXURY_IMAGES.apartment, LUXURY_IMAGES.gallery2, LUXURY_IMAGES.interior],
    agentId: "marcus-williams",
    amenities: ["Doorman", "Fitness Center", "Roof Deck"],
    features: ["Exposed brick", "Oak flooring", "Custom lighting"],
    energyRating: "B+",
    lat: 40.7163,
    lng: -74.0086,
    openHouse: "Sun 12–3 PM",
    number: 2,
  },
  {
    id: "hamptons-estate",
    title: "Hamptons Waterfront Estate",
    category: "Villa",
    propertyType: "villa",
    listingType: "buy" as const,
    status: "for-sale" as const,
    featured: true,
    badges: ["featured"] as const,
    serviceId: "buying",
    location: "Southampton",
    address: "12 Ocean Road",
    city: "Southampton, NY",
    price: 24500000,
    priceLabel: "$24,500,000",
    bedrooms: 8,
    bathrooms: 9,
    garage: 4,
    sqft: 12000,
    year: "2022",
    client: "Private Seller",
    value: "$24.5M",
    description: "Oceanfront compound with infinity pool, tennis court, guest house, and 200 feet of private beach.",
    image: LUXURY_IMAGES.waterfront,
    gallery: [LUXURY_IMAGES.waterfront, LUXURY_IMAGES.pool, LUXURY_IMAGES.villa],
    agentId: "elena-voss",
    amenities: ["Pool", "Tennis Court", "Beach Access", "Guest House"],
    features: ["Infinity pool", "Home theater", "Wine cellar"],
    energyRating: "A",
    lat: 40.8840,
    lng: -72.3895,
    number: 3,
  },
  {
    id: "greenwich-manor",
    title: "Greenwich Colonial Manor",
    category: "Villa",
    propertyType: "villa",
    listingType: "buy" as const,
    status: "pending" as const,
    featured: false,
    badges: [] as const,
    serviceId: "buying",
    location: "Greenwich",
    address: "88 Round Hill Road",
    city: "Greenwich, CT",
    price: 12800000,
    priceLabel: "$12,800,000",
    bedrooms: 6,
    bathrooms: 7,
    garage: 3,
    sqft: 9800,
    year: "2021",
    client: "Private Seller",
    value: "$12.8M",
    description: "Classic New England elegance on 4.2 acres with formal gardens and pool pavilion.",
    image: LUXURY_IMAGES.villa,
    gallery: [LUXURY_IMAGES.villa, LUXURY_IMAGES.gallery3],
    agentId: "sophia-chen",
    amenities: ["Pool", "Gardens", "Home Office"],
    features: ["Library", "Wine room", "Generator"],
    energyRating: "B",
    lat: 41.0262,
    lng: -73.6282,
    number: 4,
  },
  {
    id: "miami-penthouse",
    title: "Miami Beach Sky Residence",
    category: "Penthouse",
    propertyType: "penthouse",
    listingType: "buy" as const,
    status: "for-sale" as const,
    featured: false,
    badges: ["new"] as const,
    serviceId: "buying",
    location: "Miami Beach",
    address: "1000 Ocean Drive, PH-A",
    city: "Miami Beach, FL",
    price: 9800000,
    priceLabel: "$9,800,000",
    bedrooms: 4,
    bathrooms: 4.5,
    garage: 2,
    sqft: 4800,
    year: "2025",
    client: "Developer",
    value: "$9.8M",
    description: "Brand-new oceanfront penthouse with wraparound terrace and resort-style amenities.",
    image: LUXURY_IMAGES.pool,
    gallery: [LUXURY_IMAGES.pool, LUXURY_IMAGES.penthouse],
    agentId: "marcus-williams",
    amenities: ["Spa", "Marina", "Private Beach"],
    features: ["Ocean views", "Smart home", "Impact glass"],
    energyRating: "A+",
    lat: 25.7907,
    lng: -80.1300,
    number: 5,
  },
  {
    id: "soho-rental",
    title: "SoHo Designer Loft",
    category: "Apartment",
    propertyType: "apartment",
    listingType: "rent" as const,
    status: "for-sale" as const,
    featured: false,
    badges: [] as const,
    serviceId: "renting",
    location: "SoHo",
    address: "120 Spring Street, 3F",
    city: "New York, NY",
    price: 28000,
    priceLabel: "$28,000/mo",
    bedrooms: 2,
    bathrooms: 2,
    garage: 0,
    sqft: 2200,
    year: "2024",
    client: "Landlord",
    value: "$28K/mo",
    description: "Furnished designer loft available for 12-month lease. Gallery lighting and private keyed elevator.",
    image: LUXURY_IMAGES.interior,
    gallery: [LUXURY_IMAGES.interior, LUXURY_IMAGES.gallery4],
    agentId: "elena-voss",
    amenities: ["Furnished", "Elevator", "Laundry"],
    features: ["Designer furniture", "Exposed columns"],
    energyRating: "B",
    lat: 40.7233,
    lng: -74.0030,
    number: 6,
  },
  {
    id: "aspen-chalet",
    title: "Aspen Ski-In Chalet",
    category: "Villa",
    propertyType: "villa",
    listingType: "buy" as const,
    status: "sold" as const,
    featured: false,
    badges: [] as const,
    serviceId: "buying",
    location: "Aspen",
    address: "220 Red Mountain Road",
    city: "Aspen, CO",
    price: 15200000,
    priceLabel: "$15,200,000",
    bedrooms: 5,
    bathrooms: 6,
    garage: 3,
    sqft: 7500,
    year: "2020",
    client: "Private Seller",
    value: "$15.2M",
    description: "Ski-in/ski-out chalet with heated driveway, spa, and panoramic mountain views.",
    image: LUXURY_IMAGES.villa,
    gallery: [LUXURY_IMAGES.villa],
    agentId: "sophia-chen",
    amenities: ["Ski Access", "Spa", "Heated Driveway"],
    features: ["Great room", "Wine wall"],
    energyRating: "A",
    lat: 39.1911,
    lng: -106.8175,
    number: 7,
  },
  {
    id: "commercial-plaza",
    title: "Madison Avenue Retail",
    category: "Commercial",
    propertyType: "commercial",
    listingType: "buy" as const,
    status: "for-sale" as const,
    featured: false,
    badges: [] as const,
    serviceId: "investment-consulting",
    location: "Midtown",
    address: "725 Madison Avenue",
    city: "New York, NY",
    price: 22000000,
    priceLabel: "$22,000,000",
    bedrooms: 0,
    bathrooms: 4,
    garage: 0,
    sqft: 8500,
    year: "2019",
    client: "Investment Group",
    value: "$22M",
    description: "Prime retail flagship with strong tenant history and exceptional foot traffic.",
    image: LUXURY_IMAGES.office,
    gallery: [LUXURY_IMAGES.office],
    agentId: "marcus-williams",
    amenities: ["Corner Location", "High Ceilings"],
    features: ["Landmark building", "Triple net lease potential"],
    energyRating: "B",
    lat: 40.7648,
    lng: -73.9708,
    number: 8,
  },
];

/** Alias for template compatibility (projects = listings) */
export const PROJECTS = LISTINGS;

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 6;
export const LISTINGS_PAGE_SIZE = 6;

export const TEAM = [
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    role: "Managing Director · Luxury Sales",
    bio: "Sophia has closed over $800M in Manhattan luxury transactions. Fluent in Mandarin, English, and French.",
    image: LUXURY_IMAGES.agentA,
    languages: ["English", "Mandarin", "French"],
    experience: "18 years",
    specialties: ["Penthouses", "New Developments", "International Buyers"],
    social: { linkedin: "#", instagram: "#", email: "sophia@nexoraestate.com" },
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    role: "Senior Advisor · Waterfront",
    bio: "Marcus specializes in Hamptons, Miami, and coastal estates with a focus on off-market acquisitions.",
    image: LUXURY_IMAGES.agentB,
    languages: ["English", "Spanish"],
    experience: "15 years",
    specialties: ["Waterfront", "Estates", "Investment"],
    social: { linkedin: "#", instagram: "#", email: "marcus@nexoraestate.com" },
  },
  {
    id: "elena-voss",
    name: "Elena Voss",
    role: "Advisor · Rentals & Relocation",
    bio: "Elena guides corporate relocations and luxury rental placements across NYC and Greenwich.",
    image: LUXURY_IMAGES.agentC,
    languages: ["English", "German", "Italian"],
    experience: "12 years",
    specialties: ["Rentals", "Relocation", "Interior Staging"],
    social: { linkedin: "#", instagram: "#", email: "elena@nexoraestate.com" },
  },
  {
    id: "james-harrington",
    name: "James Harrington",
    role: "Founder & Principal Broker",
    bio: "James founded Nexora Estate with a vision for editorial-quality marketing and white-glove client service.",
    image: LUXURY_IMAGES.agentD,
    languages: ["English"],
    experience: "30+ years",
    specialties: ["Leadership", "Ultra-Luxury", "Development"],
    social: { linkedin: "#", instagram: "#", email: "james@nexoraestate.com" },
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

export const NAV_LINKS = [
  { label: "Buy", path: "/listings?type=buy" },
  { label: "Rent", path: "/listings?type=rent" },
  { label: "New Developments", path: "/developments" },
  { label: "Listings", path: "/listings" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Buying", to: "/services/buying" },
  { label: "Selling", to: "/services/selling" },
  { label: "Renting", to: "/services/renting" },
  { label: "Property Management", to: "/services/property-management" },
  { label: "Investment Consulting", to: "/services/investment-consulting" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Listings", to: "/listings" },
  { label: "New Developments", to: "/developments" },
  { label: "About", to: "/about" },
  { label: "Our Agents", to: "/team" },
  { label: "Neighborhoods", to: "/service-areas" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Mortgage Calculator", to: "/listings" },
  { label: "Saved Searches", to: "/listings" },
  { label: "Compare Listings", to: "/listings" },
];

export const SERVICE_AREAS = NEIGHBORHOODS.map(n => n.name);

export const PROJECTS_PAGE_STATS = [
  { value: "450+", label: "Active Listings" },
  { value: "$2.8B+", label: "Sales Volume" },
  { value: "30+", label: "Years Experience" },
  { value: "4.9", label: "Client Rating" },
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
  title: "Schedule a Consultation",
  description: "Tell us about your goals — an advisor will respond within one business day.",
  subtitle: "Tell us about your goals — an advisor will respond within one business day.",
  submitLabel: "Send Inquiry",
  successMessage: "Thank you. A Nexora Estate advisor will contact you shortly.",
  bullets: [
    "Dedicated luxury property advisor",
    "Access to off-market listings",
    "Private viewing coordination",
    "International buyer & relocation support",
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
  "Nexora Estate — luxury real estate advisory. Exceptional homes, penthouses, and investment properties curated for discerning buyers.";

export const HOME_BUILDER_IMAGES = LUXURY_IMAGES;

export const CTA_SECTION = {
  headline: "Find Your Dream Property Today",
  primaryCta: { label: "Browse Listings", to: "/listings" },
  secondaryCta: { label: "Contact Our Team", to: "/contact" },
};

export const ABOUT_TIMELINE = [
  { year: "1994", title: "Founded in Manhattan", description: "James Harrington establishes Nexora Estate with a focus on Upper East Side luxury." },
  { year: "2005", title: "Hamptons Expansion", description: "Opening of Southampton office to serve coastal estate clients." },
  { year: "2015", title: "International Network", description: "Partnerships established across London, Paris, and Dubai." },
  { year: "2020", title: "Digital Innovation", description: "Launch of virtual tours and editorial marketing platform." },
  { year: "2025", title: "Record Sales Year", description: "$2.8B in closed volume across premier markets." },
];

export const AWARDS = [
  { year: "2025", title: "Top Luxury Brokerage", org: "Luxury Real Estate Awards" },
  { year: "2024", title: "Best Marketing Program", org: "Real Estate Excellence" },
  { year: "2023", title: "International Network Award", org: "Global Property Council" },
];

export const ABOUT_HERO_BADGES = [
  { label: "30+ Years", icon: "Award" as const },
  { label: "$2.8B Volume", icon: "Tag" as const },
  { label: "12 Countries", icon: "Home" as const },
  { label: "4.9 Rating", icon: "ShieldCheck" as const },
];

export const LEAD_MAGNET = {
  title: "Luxury Market Report",
  subtitle: "Exclusive insights on premier residential markets and investment opportunities.",
  cta: { label: "REQUEST ACCESS", to: "/contact" },
  image: LUXURY_IMAGES.office,
};

export const SERVICE_AREA_COUNTIES = NEIGHBORHOODS.map(n => ({
  county: n.name,
  towns: [n.description],
}));

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed Brokerage", description: "Equal housing opportunity.", icon: "ShieldCheck" as const },
  { id: "global", title: "Global Network", description: "12-country reach.", icon: "Globe" as const },
  { id: "local", title: "Local Experts", description: "Deep market knowledge.", icon: "Heart" as const },
  { id: "discreet", title: "Discreet Service", description: "White-glove advisory.", icon: "Tag" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "RESOURCES",
  title: "Financing Luxury Real Estate",
  subtitle: "Mortgage options, jumbo loans, and international buyer programs.",
  body: "Our advisors connect you with premier lenders specializing in high-value residential transactions.",
  image: LUXURY_IMAGES.skyline,
  benefits: ["Jumbo loan guidance", "International buyer support", "Portfolio financing", "Pre-approval assistance"],
  cta: { label: "SPEAK WITH AN ADVISOR", to: "/contact" },
};

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
    id: "listings",
    title: "Browse Exclusive Listings",
    subtitle: "On-market and off-market properties curated for discerning buyers.",
    cta: { label: "VIEW LISTINGS", to: "/listings" },
    image: LUXURY_IMAGES.penthouse,
  },
];
