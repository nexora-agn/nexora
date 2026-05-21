/**
 * VERDEFIELD LANDSCAPING — content registry.
 * Images sourced from Unsplash (search topic noted per key). IDs resolved via official download URLs.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const LANDSCAPING_IMAGES = {
  /** unsplash: lush green garden / lawn */
  heroHome: u("1764208637294-49d0eccacf40", 1920, 1080),
  /** unsplash: arborist chainsaw tree removal */
  heroTree: u("1754321860056-ca7254d5e7ac", 1920, 1080),
  /** unsplash: lawn mowing */
  heroLawn: u("1731082686849-d2e0a4d2c70c", 1920, 1080),
  /** unsplash: gardener leaf blower */
  crewWorking: u("1777895703634-bb97e9789866", 1200, 900),
  /** unsplash: backyard stone path patio */
  luxuryBackyard: u("1721222204525-1118ce3860e1", 1200, 900),
  /** unsplash: landscaping design garden */
  gardenDesign: u("1768333222242-605fc80d86d9", 1200, 900),
  /** unsplash: crane tree removal */
  treeRemoval: u("1732613308788-21e67a0cf022", 1200, 900),
  /** unsplash: arborist pruning branches */
  treeTrimming: u("1754321902809-5c21cbc67228", 1200, 900),
  /** unsplash: green lawn mowing */
  lawnGreen: u("1734303023491-db8037a21f09", 1200, 900),
  /** unsplash: stone patio steps */
  hardscapePatio: u("1722103155234-5e83b3effe03", 1200, 900),
  /** unsplash: paved stone walkway */
  patioWalkway: u("1761637823622-eaaaee0660db", 1200, 900),
  /** unsplash: stacked stone retaining wall */
  retainingWall: u("1774975787267-c46000e68cbc", 1200, 900),
  /** unsplash: sprinklers lawn sunset */
  irrigation: u("1770664945615-52203ab54c88", 1200, 900),
  /** unsplash: garden pathway lights night */
  outdoorLighting: u("1741646557129-eeb404155d65", 1200, 900),
  /** unsplash: mulch garden beds */
  mulchBeds: u("1757838661170-186930ac95db", 1200, 900),
  /** unsplash: terraced commercial gardens */
  commercialGrounds: u("1759556142460-1b558dd298a4", 1200, 900),
  /** unsplash: residential backyard patio */
  residentialYard: u("1721222204525-1118ce3860e1", 1200, 900),
  /** unsplash: tree stump after removal */
  stumpGrinding: u("1738417298040-e810d1295b29", 1200, 900),
  /** unsplash: hedge trimmer grass */
  hedgeTrim: u("1768268004427-6fb88cbd1605", 1200, 900),
  /** unsplash: leaf blower landscaping */
  seasonalCleanup: u("1777895703634-bb97e9789866", 1200, 900),
  /** unsplash: snowblower driveway */
  snowRemoval: u("1550959038-53a8c0122d1b", 1200, 900),
  /** unsplash: brick garden pathway drainage */
  drainage: u("1586895945298-e53a9d8eb40a", 1200, 900),
  /** unsplash: arborist chainsaw emergency */
  emergencyTree: u("1754321860056-ca7254d5e7ac", 1920, 1080),
  /** before: weathered garden path */
  beforeYard: u("1761637823138-60d7ec8fb1b2", 900, 700),
  /** after: stone patio backyard */
  afterYard: u("1722103155234-5e83b3effe03", 900, 700),
  /** before: dull lawn */
  beforeLawn: u("1763687694954-11d4fc83fbba", 900, 700),
  /** after: lush green lawn */
  afterLawn: u("1764208637294-49d0eccacf40", 900, 700),
  /** before: brick path */
  beforePatio: u("1586895945298-e53a9d8eb40a", 900, 700),
  /** after: paved walkway */
  afterPatio: u("1761637823622-eaaaee0660db", 900, 700),
  /** before: office exterior */
  beforeCommercial: u("1497366754035-f200968a6e72", 900, 700),
  /** after: formal landscaped grounds */
  afterCommercial: u("1760627591383-fd47992375b8", 900, 700),
  galleryA: u("1768333222242-605fc80d86d9", 800, 1000),
  galleryB: u("1754321902809-5c21cbc67228", 800, 600),
  galleryC: u("1722103155234-5e83b3effe03", 800, 600),
  galleryD: u("1757838661170-186930ac95db", 800, 600),
  galleryE: u("1770664945615-52203ab54c88", 800, 600),
  galleryF: u("1741646557129-eeb404155d65", 800, 600),
  team: u("1777895703634-bb97e9789866", 1200, 900),
  contactHero: u("1767268287133-6509b1a9946f", 1400, 900),
  aboutHero: u("1764208637294-49d0eccacf40", 1400, 900),
  aboutCrew: u("1777895703634-bb97e9789866", 1200, 900),
  reviewsHero: u("1721222204525-1118ce3860e1", 1400, 900),
  residentialSplit: u("1721222204525-1118ce3860e1", 900, 1200),
  commercialSplit: u("1759556142460-1b558dd298a4", 900, 1200),
  blogHero: u("1761637823138-60d7ec8fb1b2", 1400, 900),
  financing: u("1722103155234-5e83b3effe03", 1200, 800),
  deckFence: u("1767350903634-310178c73201", 1200, 900),
  sodLawn: u("1764208637294-49d0eccacf40", 1200, 900),
  avatarA: u("1544005313-94ddf0286df2", 120, 120),
  avatarB: u("1519345182560-3f2917c472ef", 120, 120),
  avatarC: u("1612349317150-e413f6a5b16d", 120, 120),
  avatarD: u("1544005313-94ddf0286df2", 80, 80),
  avatarE: u("1519345182560-3f2917c472ef", 80, 80),
  avatarF: u("1612349317150-e413f6a5b16d", 80, 80),
  avatarG: u("1506794778202-cad84cf45f1d", 300, 300),
} as const;

export const COMPANY = {
  name: "VERDEFIELD LANDSCAPING",
  legalName: "VerdeField Landscaping & Tree Service LLC",
  tagline:
    "North Jersey's trusted landscaping and tree service partner — design, build, maintain, and protect outdoor spaces for over 18 years.",
  phone: "(201) 555-0198",
  email: "hello@verdefieldlandscaping.com",
  address: "48 Meadowbrook Lane, Ridgewood, NJ 07450",
  hours: "Mon–Sat 7am–6pm · 24/7 emergency tree service",
  license: "NJ HIC #13VH98765432",
  fax: "",
};

export const SITE_TOP = {
  line: "Spring Cleanup Season — Free Property Walkthrough · Call Today",
  badges: ["Licensed & Insured", "Family Owned", "ISA-Certified Arborists"],
  ratingValue: "4.9",
  ratingCount: "410+",
  ratingLabel: "Google Reviews",
  locations: "Bergen · Passaic · Morris · Essex · Hudson",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "8:00 AM – 3:00 PM" },
  { days: "Emergency Tree", hours: "24/7 dispatch" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.2%2C40.9%2C-73.9%2C41.1&layer=mapnik&marker=40.98,-74.12";

export const HOME_HERO = {
  eyebrow: "WELCOME TO VERDEFIELD",
  headlineBefore: "Your Next Outdoor Project",
  headlineHighlight: "Starts With Us",
  headlineAfter: "",
  body:
    "Comprehensive lawn care, certified tree service, and premium hardscaping for residential and commercial properties across North Jersey.",
  primaryCta: { label: "FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "VIEW OUR WORK", to: "/projects" },
  image: LANDSCAPING_IMAGES.heroHome,
  trustPills: [
    { label: "Licensed & Insured", sub: "NJ HIC Licensed", icon: "ShieldCheck" as const },
    { label: "Family Owned", sub: "Local since 2006", icon: "Heart" as const },
    { label: "ISA Arborists", sub: "Certified tree care", icon: "Trees" as const },
  ],
  ratingQuote:
    "Referred and repeat clients across Bergen County — professional crews, fair pricing, and results you can see from the curb.",
  ratingCard: {
    score: "4.9",
    countLabel: "410+ verified Google reviews",
    avatars: [
      LANDSCAPING_IMAGES.avatarD,
      LANDSCAPING_IMAGES.avatarE,
      LANDSCAPING_IMAGES.avatarF,
      LANDSCAPING_IMAGES.avatarA,
    ],
  },
  featuredEyebrow: "RESIDENTIAL & COMMERCIAL",
  featuredTitle: "Full-Service Outdoor Experts",
  featuredMeta: "Design · Tree Care · Hardscape · Maintenance",
};

export const SERVICES_RIBBON = [
  { id: "landscaping-design", label: "DESIGN", icon: "Ruler" as const, description: "Custom outdoor plans.", to: "/services/landscaping-design" },
  { id: "lawn-maintenance", label: "LAWN CARE", icon: "Leaf" as const, description: "Weekly programs.", to: "/services/lawn-maintenance" },
  { id: "tree-removal", label: "TREE SERVICE", icon: "Trees" as const, description: "Safe removal & pruning.", to: "/services/tree-removal" },
  { id: "hardscaping", label: "HARDSCAPE", icon: "Grid3x3" as const, description: "Patios & walls.", to: "/services/hardscaping" },
  { id: "emergency-tree-service", label: "24/7 EMERGENCY", icon: "ShieldCheck" as const, description: "Storm response.", to: "/services/emergency-tree-service" },
];

export const CAPABILITIES = [
  { id: "trim", title: "Tree Trimming & Pruning", description: "Promote tree health with structural pruning and clearance from roofs and lines.", icon: "Trees" as const, to: "/services/tree-trimming" },
  { id: "hardscape", title: "Hardscaping & Patios", description: "Retaining walls, walkways, and outdoor living spaces built to last.", icon: "Grid3x3" as const, to: "/services/hardscaping" },
  { id: "lawn", title: "Lawn Maintenance", description: "Mowing, fertilization, and seasonal programs for thick, healthy turf.", icon: "Leaf" as const, to: "/services/lawn-maintenance" },
  { id: "design", title: "Landscaping Design", description: "Master plans and planting palettes for cohesive curb appeal.", icon: "Ruler" as const, to: "/services/landscaping-design" },
];

export const PROCESS_STEPS = [
  { id: "walk", label: "Free Walkthrough", description: "We assess your property, trees, drainage, and goals on site." },
  { id: "plan", label: "Custom Proposal", description: "Clear scope, materials, timeline, and transparent pricing." },
  { id: "install", label: "Expert Install", description: "Licensed crews with daily cleanup and site protection." },
  { id: "review", label: "Final Review", description: "Walkthrough with you — we don't leave until you're satisfied." },
  { id: "maintain", label: "Ongoing Care", description: "Optional maintenance to protect your investment year-round." },
];

export const HOME_STATS = [
  { value: "3,200+", label: "Properties Served", icon: "Home" as const },
  { value: "18+", label: "Years in NJ", icon: "Award" as const },
  { value: "4.9", label: "Google Rating", icon: "Star" as const },
  { value: "24/7", label: "Emergency Tree", icon: "Clock" as const },
];

export const WHY_BENEFITS = [
  { title: "Client Commitment", description: "Lasting relationships through professional workmanship and responsive communication.", icon: "Heart" as const },
  { title: "Safety Above All", description: "Rigging, PPE, and permits on every hazardous tree job — safety is our mindset.", icon: "ShieldCheck" as const },
  { title: "Integrity First", description: "Honest scopes and fair pricing with no surprise change orders.", icon: "Eye" as const },
  { title: "Innovation", description: "Modern drainage, lighting, and design techniques for lasting outdoor spaces.", icon: "Sparkles" as const },
  { title: "Sustainability", description: "Eco-conscious plant selections and responsible debris recycling.", icon: "Leaf" as const },
  { title: "Satisfaction Guarantee", description: "Your approval at close-out — our reputation is built on happy neighbors.", icon: "Award" as const },
];

const SERVICE_LIST = [
  { id: "landscaping-design", title: "Landscaping Design", icon: "Ruler", description: "Master plans, planting palettes, and outdoor living concepts.", image: LANDSCAPING_IMAGES.gardenDesign },
  { id: "lawn-maintenance", title: "Lawn Maintenance", icon: "Leaf", description: "Weekly mowing, edging, fertilization, and weed control.", image: LANDSCAPING_IMAGES.lawnGreen },
  { id: "tree-removal", title: "Tree Removal", icon: "Trees", description: "Safe removals with rigging, grinding, and complete haul-away.", image: LANDSCAPING_IMAGES.treeRemoval },
  { id: "tree-trimming", title: "Tree Trimming & Pruning", icon: "Trees", description: "Structural pruning and crown work by certified arborists.", image: LANDSCAPING_IMAGES.treeTrimming },
  { id: "stump-grinding", title: "Stump Grinding", icon: "Hammer", description: "Below-grade grinding ready for sod or new plantings.", image: LANDSCAPING_IMAGES.stumpGrinding },
  { id: "mulching", title: "Mulching", icon: "Layers", description: "Fresh mulch, crisp bed edges, and weed barrier.", image: LANDSCAPING_IMAGES.mulchBeds },
  { id: "sod-installation", title: "Sod Installation", icon: "Leaf", description: "Grade, amend, and install premium sod.", image: LANDSCAPING_IMAGES.sodLawn },
  { id: "irrigation-systems", title: "Irrigation Systems", icon: "Droplets", description: "Smart controllers, drip zones, winterization.", image: LANDSCAPING_IMAGES.irrigation },
  { id: "retaining-walls", title: "Retaining Walls", icon: "Fence", description: "Engineered stone walls for NJ slopes.", image: LANDSCAPING_IMAGES.retainingWall },
  { id: "hardscaping", title: "Hardscaping", icon: "Grid3x3", description: "Patios, walkways, steps, and outdoor kitchens.", image: LANDSCAPING_IMAGES.hardscapePatio },
  { id: "patio-installation", title: "Patio Installation", icon: "Grid3x3", description: "Custom patios with drainage and lighting.", image: LANDSCAPING_IMAGES.patioWalkway },
  { id: "outdoor-lighting", title: "Outdoor Lighting", icon: "Sparkles", description: "Path, accent, and security lighting design.", image: LANDSCAPING_IMAGES.outdoorLighting },
  { id: "hedge-trimming", title: "Bush & Hedge Trimming", icon: "Fence", description: "Formal hedges and foundation shrub shaping.", image: LANDSCAPING_IMAGES.hedgeTrim },
  { id: "seasonal-cleanup", title: "Seasonal Cleanup", icon: "Sun", description: "Spring and fall cleanups and leaf removal.", image: LANDSCAPING_IMAGES.seasonalCleanup },
  { id: "snow-removal", title: "Snow Removal", icon: "Sun", description: "Residential and commercial plowing and salting.", image: LANDSCAPING_IMAGES.snowRemoval },
  { id: "drainage-solutions", title: "Drainage Solutions", icon: "Droplets", description: "French drains, grading, downspout routing.", image: LANDSCAPING_IMAGES.drainage },
  { id: "commercial-landscaping", title: "Commercial Landscaping", icon: "Building", description: "HOA, retail, and office grounds maintenance.", image: LANDSCAPING_IMAGES.commercialGrounds },
  { id: "residential-landscaping", title: "Residential Landscaping", icon: "Home", description: "Full-property design-build makeovers.", image: LANDSCAPING_IMAGES.residentialYard },
  { id: "emergency-tree-service", title: "Emergency Tree Service", icon: "ShieldCheck", description: "24/7 storm damage and hazard mitigation.", image: LANDSCAPING_IMAGES.emergencyTree },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const HOME_TRANSFORMATIONS = [
  {
    id: "ridgewood-backyard",
    title: "Backyard Oasis Transformation",
    location: "Ridgewood, NJ",
    category: "Residential",
    serviceId: "residential-landscaping",
    description: "Terraced patio, plantings, and lighting for a sloped entertainer's yard.",
    beforeImage: LANDSCAPING_IMAGES.beforeYard,
    afterImage: LANDSCAPING_IMAGES.afterYard,
  },
  {
    id: "montclair-lawn",
    title: "Premium Lawn Restoration",
    location: "Montclair, NJ",
    category: "Lawn Care",
    serviceId: "sod-installation",
    description: "Grading, irrigation tune-up, and premium sod in three weeks.",
    beforeImage: LANDSCAPING_IMAGES.beforeLawn,
    afterImage: LANDSCAPING_IMAGES.afterLawn,
  },
  {
    id: "ho-ho-kus-patio",
    title: "Natural Stone Patio",
    location: "Ho-Ho-Kus, NJ",
    category: "Hardscape",
    serviceId: "patio-installation",
    description: "Bluestone patio with seating wall and landscape lighting.",
    beforeImage: LANDSCAPING_IMAGES.beforePatio,
    afterImage: LANDSCAPING_IMAGES.afterPatio,
  },
  {
    id: "paramus-commercial",
    title: "Medical Campus Grounds",
    location: "Paramus, NJ",
    category: "Commercial",
    serviceId: "commercial-landscaping",
    description: "Phased shrub replacement and seasonal color.",
    beforeImage: LANDSCAPING_IMAGES.beforeCommercial,
    afterImage: LANDSCAPING_IMAGES.afterCommercial,
  },
];

export const BEFORE_AFTER_PROJECTS = HOME_TRANSFORMATIONS.map(p => ({ ...p }));

export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  serviceId: p.serviceId,
  location: p.location,
  year: "2025",
  client: p.category === "Commercial" ? "Commercial Property" : "Private Homeowner",
  value: "—",
  description: `${p.title} — ${p.location}. Completed by VerdeField Landscaping.`,
  image: p.afterImage,
  gallery: [p.beforeImage, p.afterImage, LANDSCAPING_IMAGES.galleryA, LANDSCAPING_IMAGES.galleryB],
  beforeImage: p.beforeImage,
  afterImage: p.afterImage,
  number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  { id: "james-verde", name: "James Verde", role: "Founder & Lead Arborist", bio: "18+ years leading tree care and landscape design-build across North Jersey.", image: LANDSCAPING_IMAGES.avatarG, social: { linkedin: "#", twitter: "#" } },
  { id: "maria-stone", name: "Maria Stone", role: "Landscape Design Director", bio: "Designs outdoor spaces that balance beauty, drainage, and long-term maintenance.", image: LANDSCAPING_IMAGES.avatarC, social: { linkedin: "#", twitter: "#" } },
  { id: "carlos-rivera", name: "Carlos Rivera", role: "Hardscape Foreman", bio: "Natural stone and paver specialist for patios and retaining walls.", image: LANDSCAPING_IMAGES.avatarB, social: { linkedin: "#", twitter: "#" } },
  { id: "sarah-kim", name: "Sarah Kim", role: "Client Care Manager", bio: "Coordinates estimates, routes, and 24/7 emergency tree dispatch.", image: LANDSCAPING_IMAGES.avatarA, social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Patricia H.", role: "Ridgewood, NJ", quote: "Our backyard is unrecognizable — patio, plantings, and lighting feel like a resort.", avatar: LANDSCAPING_IMAGES.avatarA, rating: 5 },
  { name: "Mark D.", role: "Montclair, NJ", quote: "Emergency tree removal after the storm was fast, safe, and fairly priced.", avatar: LANDSCAPING_IMAGES.avatarB, rating: 5 },
  { name: "Lisa R.", role: "Ho-Ho-Kus, NJ", quote: "Weekly lawn service — edges crisp, beds always fresh. Highly recommend.", avatar: LANDSCAPING_IMAGES.avatarC, rating: 5 },
  { name: "Brian T.", role: "Paramus, NJ", quote: "Commercial grounds look professional year-round. Snow service is reliable.", avatar: LANDSCAPING_IMAGES.avatarA, rating: 5 },
  { name: "Angela M.", role: "Fair Lawn, NJ", quote: "The drainage fix solved our basement worries. Honest proposal and great crew.", avatar: LANDSCAPING_IMAGES.avatarB, rating: 5 },
  { name: "Kevin S.", role: "Tenafly, NJ", quote: "They transformed our patio — we use it all year. Professional from start to finish.", avatar: LANDSCAPING_IMAGES.avatarC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "spring-cleanup", title: "Spring Cleanup Checklist for NJ Homeowners", excerpt: "What to tackle before mulch season.", date: "April 10, 2025", author: "Maria Stone", category: "Seasonal", image: LANDSCAPING_IMAGES.seasonalCleanup, content: "Spring cleanup priorities for North Jersey properties." },
  { id: "tree-storm-prep", title: "Preparing Trees Before Storm Season", excerpt: "Pruning that reduces failure risk.", date: "March 5, 2025", author: "James Verde", category: "Tree Care", image: LANDSCAPING_IMAGES.treeTrimming, content: "Structural pruning before summer storms." },
  { id: "patio-materials", title: "Natural Stone vs Pavers for Patios", excerpt: "Freeze-thaw performance compared.", date: "February 18, 2025", author: "Carlos Rivera", category: "Hardscape", image: LANDSCAPING_IMAGES.hardscapePatio, content: "Material selection for NJ patios." },
  { id: "lawn-fertilization", title: "When to Fertilize Cool-Season Lawns", excerpt: "Timing for Bergen County turf.", date: "January 30, 2025", author: "Sarah Kim", category: "Lawn Care", image: LANDSCAPING_IMAGES.lawnGreen, content: "Fertilization calendar for cool-season lawns." },
  { id: "irrigation-winterize", title: "Why Irrigation Winterization Matters", excerpt: "Avoid burst lines in spring.", date: "December 12, 2024", author: "Carlos Rivera", category: "Irrigation", image: LANDSCAPING_IMAGES.irrigation, content: "Winterization steps before first freeze." },
  { id: "outdoor-lighting", title: "Landscape Lighting for Security", excerpt: "Layer path and accent lighting.", date: "November 8, 2024", author: "Maria Stone", category: "Lighting", image: LANDSCAPING_IMAGES.outdoorLighting, content: "Low-voltage lighting design tips." },
];

export const STATS = [
  { value: 3200, label: "Properties Served", suffix: "+" },
  { value: 18, label: "Years Experience", suffix: "+" },
  { value: 410, label: "5-Star Reviews", suffix: "+" },
  { value: 24, label: "Hour Emergency", suffix: "/7" },
];

export const FAQ_ITEMS = [
  { question: "Do you offer free estimates?", answer: "Yes — free on-site property walkthroughs with written scope and pricing." },
  { question: "Are you licensed and insured?", answer: "NJ HIC licensed with full liability, workers' comp, and ISA-certified arborists on staff." },
  { question: "Do you handle emergency tree work?", answer: "Yes — 24/7 dispatch for storm damage and hazardous trees." },
  { question: "What areas do you serve?", answer: "Bergen, Passaic, Morris, Essex, and Hudson counties." },
  { question: "Can you maintain my property year-round?", answer: "Weekly mowing, seasonal cleanups, mulch, and snow contracts available." },
  { question: "Do you offer design services?", answer: "In-house designers produce master plans before install." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Reviews", path: "/reviews" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Landscaping Design", to: "/services/landscaping-design" },
  { label: "Lawn Maintenance", to: "/services/lawn-maintenance" },
  { label: "Tree Removal", to: "/services/tree-removal" },
  { label: "Hardscaping", to: "/services/hardscaping" },
  { label: "Emergency Tree Service", to: "/services/emergency-tree-service" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Ridgewood, NJ", "Montclair, NJ", "Ho-Ho-Kus, NJ", "Paramus, NJ", "Fair Lawn, NJ",
  "Tenafly, NJ", "Glen Rock, NJ", "Wyckoff, NJ", "Franklin Lakes, NJ", "Englewood, NJ",
  "Ramsey, NJ", "Mahwah, NJ", "Wayne, NJ", "Morristown, NJ",
];

export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["SEASONAL", "TREE CARE", "HARDSCAPE", "LAWN CARE", "IRRIGATION"];

export const PROJECTS_PAGE_STATS = [
  { value: "3,200+", label: "Properties Served" },
  { value: "18+", label: "Years Experience" },
  { value: "ISA", label: "Certified Arborists" },
  { value: "4.9", label: "Google Rating" },
];

export const ABOUT_STATS = [
  { value: "18+", label: "Years in North Jersey" },
  { value: "3,200+", label: "Properties Served" },
  { value: "ISA", label: "Certified Arborists" },
  { value: "410+", label: "5-Star Reviews" },
  { value: "24/7", label: "Emergency Tree" },
];

export const CORE_VALUES = WHY_BENEFITS.map((b, i) => ({
  id: `v${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const CERTIFICATIONS = [
  { id: "licensed", label: "NJ HIC Licensed", sub: "Home improvement contractor" },
  { id: "insured", label: "Fully Insured", sub: "Liability & workers' comp" },
  { id: "isa", label: "ISA Arborists", sub: "Certified tree care" },
  { id: "reviews", label: "4.9 Google Rating", sub: "410+ verified reviews" },
  { id: "family", label: "Family Owned", sub: "Local since 2006" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "tree", label: "TREE CARE" },
  { id: "lawn", label: "LAWN & PLANT" },
  { id: "hardscape", label: "HARDSCAPE" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  tree: [
    { question: "Do you pull permits for tree removal?", answer: "Yes — we handle municipal permits where required." },
    { question: "Can you prune near power lines?", answer: "We coordinate with utilities when lines are involved." },
    { question: "Is stump grinding included?", answer: "Available as add-on or bundled with removal." },
  ],
  lawn: [
    { question: "How often do you mow?", answer: "Weekly in peak season; flexible schedules available." },
    { question: "Do you offer organic fertilizers?", answer: "Organic and conventional programs available." },
    { question: "When is the best time to plant?", answer: "Spring and fall are ideal in North Jersey." },
  ],
  hardscape: [
    { question: "What patio materials do you install?", answer: "Bluestone, limestone, and premium pavers." },
    { question: "Do you handle drainage?", answer: "Yes — grading and French drains are part of design-build." },
    { question: "How long does a patio take?", answer: "Typically 1–3 weeks depending on scope." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Full-service landscaping and tree care for North Jersey — design, install, maintain, and protect your property.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "drainage", title: "Standing Water in Yard", description: "Grading and French drains to protect your foundation.", icon: "Droplets" as const },
  { id: "tree", title: "Hazard Trees", description: "Leaning trunks and dead limbs need certified assessment.", icon: "Trees" as const },
  { id: "lawn", title: "Patchy Lawn", description: "Aeration, sod, and fertilization restore curb appeal.", icon: "Leaf" as const },
  { id: "patio", title: "Outdated Hardscape", description: "Refresh patios and walkways with new materials.", icon: "Grid3x3" as const },
  { id: "seasonal", title: "Seasonal Maintenance", description: "Mulch, pruning, and leaf cleanup year-round.", icon: "Sun" as const },
];

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
  category: "LANDSCAPING",
  title: s.title,
  subtitle: "LICENSED CREWS · QUALITY MATERIALS",
  body: [
    `${s.description} VerdeField delivers documented scopes, protected job sites, and crews who show up on time.`,
    "Every project includes clear communication, daily cleanup, and workmanship you can count on.",
  ],
  image: s.image,
  inclusions: [
    "Free property walkthrough",
    "Written scope & timeline",
    "Licensed & insured crews",
    "Premium materials",
    "Daily site cleanup",
    "Satisfaction guarantee",
  ],
}));

export const LEAD_FORM = {
  title: "Request Your Free Outdoor Estimate",
  description: "Tell us about your property — we respond within one business day.",
  bullets: [
    "Free on-site walkthroughs",
    "Written scope & timeline",
    "ISA-certified tree care",
    "NJ HIC licensed & insured",
  ],
};

export const STORM_CHECKLIST = [
  { id: "photos", title: "Share Photos", description: "Wide shots help us quote faster." },
  { id: "walk", title: "Schedule Walkthrough", description: "On-site assessment of scope and access." },
  { id: "proposal", title: "Review Proposal", description: "Transparent pricing and schedule." },
  { id: "book", title: "Reserve Dates", description: "Spring and fall book quickly." },
];

export const INSPECTION_BENEFITS = [
  { id: "curb", title: "Elevate Curb Appeal", description: "Professional landscapes increase home value.", icon: "Home" as const },
  { id: "safety", title: "Safer Trees", description: "Reduce risk to structures and family.", icon: "ShieldCheck" as const },
  { id: "drain", title: "Protect Foundations", description: "Proper drainage keeps basements dry.", icon: "Droplets" as const },
  { id: "enjoy", title: "Enjoy Your Yard", description: "Patios and lighting extend outdoor living.", icon: "Sparkles" as const },
];

export const INSPECTION_TYPES = [
  { id: "residential", title: "Residential", description: "Full-property plans.", image: LANDSCAPING_IMAGES.residentialYard },
  { id: "commercial", title: "Commercial", description: "Grounds maintenance.", image: LANDSCAPING_IMAGES.commercialGrounds },
  { id: "tree", title: "Tree Evaluation", description: "Arborist assessments.", image: LANDSCAPING_IMAGES.treeTrimming },
  { id: "hardscape", title: "Hardscape", description: "Patio and wall feasibility.", image: LANDSCAPING_IMAGES.hardscapePatio },
];

export const INSPECTION_CHECKLIST = [
  "Slope & drainage review",
  "Tree health & clearance",
  "Soil & lawn condition",
  "Hardscape stability",
  "Irrigation efficiency",
  "Maintenance plan",
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NJ HIC with full coverage.", icon: "ShieldCheck" as const },
  { id: "isa", title: "ISA Arborists", description: "Certified tree care on staff.", icon: "Trees" as const },
  { id: "family", title: "Family Owned", description: "Local since 2006.", icon: "Heart" as const },
  { id: "honest", title: "Transparent Pricing", description: "Line-item proposals.", icon: "Tag" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "years", title: "18+ Years Local", icon: "Award" as const },
  { id: "licensed", title: "NJ HIC Licensed", icon: "ShieldCheck" as const },
  { id: "isa", title: "ISA Arborists", icon: "Trees" as const },
  { id: "emergency", title: "24/7 Tree Emergency", icon: "Clock" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "FLEXIBLE BILLING",
  title: "Invest in Lasting Outdoor Value",
  subtitle: "Landscapes and hardscape are long-term investments.",
  body: "Phased billing on design-build projects and seasonal maintenance contracts.",
  image: LANDSCAPING_IMAGES.financing,
  benefits: ["Phased payments", "Clear milestones", "Maintenance plans", "No hidden fees"],
  cta: { label: "DISCUSS OPTIONS", to: "/contact" },
};

/** Jireh-style service category lists for homepage tabs */
export const SERVICE_CATEGORY_TABS = [
  {
    id: "tree",
    label: "Tree Services",
    items: [
      "Tree Pruning",
      "Tree Health Assessment",
      "Emergency Tree Removal",
      "Stump Grinding",
      "Arborist Consultations",
      "Tree Canopy Thinning",
    ],
    image: LANDSCAPING_IMAGES.treeTrimming,
    to: "/services/tree-removal",
  },
  {
    id: "hardscape",
    label: "Hardscaping",
    items: [
      "Concrete & Stone Patios",
      "Retaining Walls",
      "Walkway Installation",
      "Outdoor Living Spaces",
      "Garden Edging",
      "Paver Repair",
    ],
    image: LANDSCAPING_IMAGES.hardscapePatio,
    to: "/services/hardscaping",
  },
  {
    id: "landscape",
    label: "Landscaping",
    items: [
      "Mulch Installation",
      "Lawn Installation",
      "Hedge Trimming",
      "Landscape Renovation",
      "Garden Maintenance",
      "Lawn Aeration",
    ],
    image: LANDSCAPING_IMAGES.gardenDesign,
    to: "/services/landscaping-design",
  },
] as const;

export const HERO_PROMO_BANNERS = [
  {
    id: "curb",
    title: "Boost Your Home's Curb Appeal",
    subtitle: "Enhance your outdoor space with our landscaping services",
    cta: { label: "View Projects", to: "/projects" },
    image: LANDSCAPING_IMAGES.luxuryBackyard,
  },
  {
    id: "dream",
    title: "Ready to Create Your Dream Yard?",
    subtitle: "Transform your outdoor space today",
    cta: { label: "Contact Us", to: "/contact" },
    image: LANDSCAPING_IMAGES.gardenDesign,
  },
  {
    id: "storm",
    title: "Storm Damage? We're Here 24/7",
    subtitle: "Emergency tree services you can trust",
    cta: { label: "Emergency Line", to: "/services/emergency-tree-service" },
    image: LANDSCAPING_IMAGES.emergencyTree,
  },
] as const;
