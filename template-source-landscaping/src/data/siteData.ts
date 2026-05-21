/**
 * VERDEFIELD LANDSCAPING — content registry.
 * Images sourced from Unsplash (search topic noted per key). IDs resolved via official download URLs.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const LANDSCAPING_IMAGES = {
  heroHome: u("1764208637294-49d0eccacf40", 1920, 1080),
  heroTree: u("1754321860056-ca7254d5e7ac", 1920, 1080),
  heroLawn: u("1731082686849-d2e0a4d2c70c", 1920, 1080),
  crewWorking: u("1777895703634-bb97e9789866", 1200, 900),
  luxuryBackyard: u("1721222204525-1118ce3860e1", 1200, 900),
  gardenDesign: u("1768333222242-605fc80d86d9", 1200, 900),
  treeRemoval: u("1732613308788-21e67a0cf022", 1200, 900),
  treeTrimming: u("1754321902809-5c21cbc67228", 1200, 900),
  lawnGreen: u("1734303023491-db8037a21f09", 1200, 900),
  hardscapePatio: u("1722103155234-5e83b3effe03", 1200, 900),
  patioWalkway: u("1761637823622-eaaaee0660db", 1200, 900),
  retainingWall: u("1774975787267-c46000e68cbc", 1200, 900),
  irrigation: u("1770664945615-52203ab54c88", 1200, 900),
  outdoorLighting: u("1741646557129-eeb404155d65", 1200, 900),
  mulchBeds: u("1757838661170-186930ac95db", 1200, 900),
  commercialGrounds: u("1759556142460-1b558dd298a4", 1200, 900),
  residentialYard: u("1721222204525-1118ce3860e1", 1200, 900),
  stumpGrinding: u("1738417298040-e810d1295b29", 1200, 900),
  hedgeTrim: u("1768268004427-6fb88cbd1605", 1200, 900),
  seasonalCleanup: u("1777895703634-bb97e9789866", 1200, 900),
  snowRemoval: u("1550959038-53a8c0122d1b", 1200, 900),
  drainage: u("1586895945298-e53a9d8eb40a", 1200, 900),
  emergencyTree: u("1754321860056-ca7254d5e7ac", 1920, 1080),
  beforeYard: u("1761637823138-60d7ec8fb1b2", 900, 700),
  afterYard: u("1722103155234-5e83b3effe03", 900, 700),
  beforeLawn: u("1763687694954-11d4fc83fbba", 900, 700),
  afterLawn: u("1764208637294-49d0eccacf40", 900, 700),
  beforePatio: u("1586895945298-e53a9d8eb40a", 900, 700),
  afterPatio: u("1761637823622-eaaaee0660db", 900, 700),
  beforeCommercial: u("1497366754035-f200968a6e72", 900, 700),
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
    "North Jersey's premium landscaping and tree service partner — design, install, maintain, and protect outdoor spaces homeowners are proud to show off.",
  phone: "(201) 555-0198",
  email: "hello@verdefieldlandscaping.com",
  address: "48 Meadowbrook Lane, Ridgewood, NJ 07450",
  hours: "Mon–Sat 7am–6pm · 24/7 emergency tree service",
  license: "NJ HIC #13VH98765432",
  fax: "",
};

export const SITE_TOP = {
  line: "Spring Cleanup & Mulch Season — Book Your Free Property Walkthrough",
  badges: ["Licensed & Insured", "Family Owned", "ISA-Certified Arborists"],
  ratingValue: "4.9",
  ratingCount: "410+",
  ratingLabel: "Reviews",
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
  eyebrow: "LANDSCAPING & TREE SERVICE",
  headlineBefore: "Outdoor Spaces",
  headlineHighlight: "Designed, Built",
  headlineAfter: "& Maintained to Last.",
  body:
    "VerdeField delivers full-service landscaping, certified tree care, and year-round lawn programs for North Jersey homes and commercial properties — with crews who treat your property like their own backyard.",
  primaryCta: { label: "FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "VIEW TRANSFORMATIONS", to: "/projects" },
  image: LANDSCAPING_IMAGES.heroHome,
  trustPills: [
    { label: "Licensed & Insured", sub: "NJ HIC · Full coverage", icon: "ShieldCheck" as const },
    { label: "Family Owned", sub: "Local since 2006", icon: "Heart" as const },
    { label: "ISA Arborists", sub: "Certified tree care", icon: "Trees" as const },
  ],
  ratingQuote:
    "From emergency tree removals to full backyard transformations — responsive crews, spotless job sites, and results that elevate curb appeal.",
  ratingCard: {
    score: "4.9",
    countLabel: "Trusted across Bergen County",
    avatars: [
      LANDSCAPING_IMAGES.avatarD,
      LANDSCAPING_IMAGES.avatarE,
      LANDSCAPING_IMAGES.avatarF,
      LANDSCAPING_IMAGES.avatarA,
    ],
  },
  featuredEyebrow: "RESIDENTIAL & COMMERCIAL",
  featuredTitle: "Full-Service Outdoor Studio",
  featuredMeta: "Design · Install · Tree Care · Maintenance",
};

export const SERVICES_RIBBON = [
  { id: "landscaping-design", label: "DESIGN", icon: "Ruler" as const, description: "Custom plans & 3D concepts.", to: "/services/landscaping-design" },
  { id: "lawn-maintenance", label: "LAWN CARE", icon: "Leaf" as const, description: "Weekly mowing & fertilization.", to: "/services/lawn-maintenance" },
  { id: "tree-removal", label: "TREE SERVICE", icon: "Trees" as const, description: "Safe removal & pruning.", to: "/services/tree-removal" },
  { id: "hardscaping", label: "HARDSCAPE", icon: "Grid3x3" as const, description: "Patios, walls & walkways.", to: "/services/hardscaping" },
  { id: "emergency-tree-service", label: "EMERGENCY", icon: "ShieldCheck" as const, description: "24/7 storm response.", to: "/services/emergency-tree-service" },
];

export const CAPABILITIES = [
  { id: "design", title: "Design-Build Expertise", description: "Licensed designers translate your vision into buildable plans with material boards and phasing.", icon: "Ruler" as const, to: "/services/landscaping-design" },
  { id: "tree", title: "Certified Tree Care", description: "ISA-certified arborists for pruning, removal, and health assessments — crane work when required.", icon: "Trees" as const, to: "/services/tree-removal" },
  { id: "maintain", title: "Year-Round Maintenance", description: "Mowing, edging, fertilization, and seasonal cleanups that keep properties magazine-ready.", icon: "Leaf" as const, to: "/services/lawn-maintenance" },
  { id: "hardscape", title: "Premium Hardscape", description: "Natural stone patios, retaining walls, and lighting designed for NJ freeze-thaw cycles.", icon: "Grid3x3" as const, to: "/services/hardscaping" },
];

export const PROCESS_STEPS = [
  { id: "walk", label: "Property Walkthrough", description: "On-site assessment of soil, drainage, trees, and your goals." },
  { id: "plan", label: "Design & Proposal", description: "Detailed scope, materials, timeline, and transparent pricing." },
  { id: "prep", label: "Site Preparation", description: "Grading, utility locates, protection of existing plantings." },
  { id: "build", label: "Install & Plant", description: "Hardscape, irrigation, sod, and specimen plantings." },
  { id: "care", label: "Ongoing Care", description: "Maintenance programs and seasonal tune-ups." },
];

export const HOME_STATS = [
  { value: "18+", label: "Years Serving NJ", icon: "Award" as const },
  { value: "3,200+", label: "Properties Transformed", icon: "Home" as const },
  { value: "4.9", label: "Google Rating", icon: "Star" as const },
  { value: "24/7", label: "Emergency Tree", icon: "Clock" as const },
];

export const WHY_BENEFITS = [
  { title: "Single Partner for Outdoors", description: "Design, build, tree care, and maintenance under one accountable team.", icon: "Home" as const },
  { title: "Certified Arborists On Staff", description: "Proper pruning cuts, rigging, and permits — not just a truck and a chainsaw.", icon: "Trees" as const },
  { title: "Premium Materials & Plants", description: "Locally sourced stone, nursery-grade stock, and commercial irrigation components.", icon: "Sparkles" as const },
  { title: "Spotless Job Sites", description: "Daily cleanup, plywood paths, and respect for neighbors and driveways.", icon: "ShieldCheck" as const },
];

const SERVICE_LIST = [
  { id: "landscaping-design", title: "Landscaping Design", icon: "Ruler", description: "Master plans, planting palettes, and 3D concepts for cohesive outdoor living.", image: LANDSCAPING_IMAGES.gardenDesign },
  { id: "lawn-maintenance", title: "Lawn Maintenance", icon: "Leaf", description: "Weekly mowing, edging, fertilization, and weed control programs.", image: LANDSCAPING_IMAGES.lawnGreen },
  { id: "tree-removal", title: "Tree Removal", icon: "Trees", description: "Safe removals with rigging, stump grinding, and complete debris haul-away.", image: LANDSCAPING_IMAGES.treeRemoval },
  { id: "tree-trimming", title: "Tree Trimming & Pruning", icon: "Trees", description: "Structural pruning, crown thinning, and clearance from structures.", image: LANDSCAPING_IMAGES.treeTrimming },
  { id: "stump-grinding", title: "Stump Grinding", icon: "Hammer", description: "Below-grade grinding and backfill ready for sod or planting.", image: LANDSCAPING_IMAGES.stumpGrinding },
  { id: "mulching", title: "Mulching", icon: "Layers", description: "Fresh hardwood mulch for beds with crisp edges and weed barrier.", image: LANDSCAPING_IMAGES.mulchBeds },
  { id: "sod-installation", title: "Sod Installation", icon: "Leaf", description: "Grade, amend, and install premium sod for instant green lawns.", image: LANDSCAPING_IMAGES.sodLawn },
  { id: "irrigation-systems", title: "Irrigation Systems", icon: "Droplets", description: "Smart controllers, drip zones, and seasonal startup/winterization.", image: LANDSCAPING_IMAGES.irrigation },
  { id: "retaining-walls", title: "Retaining Walls", icon: "Fence", description: "Segmental and natural stone walls engineered for NJ slopes.", image: LANDSCAPING_IMAGES.retainingWall },
  { id: "hardscaping", title: "Hardscaping", icon: "Grid3x3", description: "Patios, walkways, steps, and outdoor kitchens in stone and pavers.", image: LANDSCAPING_IMAGES.hardscapePatio },
  { id: "patio-installation", title: "Patio Installation", icon: "Grid3x3", description: "Custom patio layouts with drainage, lighting, and seating walls.", image: LANDSCAPING_IMAGES.patioWalkway },
  { id: "outdoor-lighting", title: "Outdoor Lighting", icon: "Sparkles", description: "Low-voltage path, accent, and security lighting design.", image: LANDSCAPING_IMAGES.outdoorLighting },
  { id: "hedge-trimming", title: "Bush & Hedge Trimming", icon: "Fence", description: "Formal hedges, foundation shrubs, and ornamental shaping.", image: LANDSCAPING_IMAGES.hedgeTrim },
  { id: "seasonal-cleanup", title: "Seasonal Cleanup", icon: "Sun", description: "Spring and fall cleanups, leaf removal, and bed refresh.", image: LANDSCAPING_IMAGES.seasonalCleanup },
  { id: "snow-removal", title: "Snow Removal", icon: "Sun", description: "Commercial and residential plowing, salting, and sidewalk clearing.", image: LANDSCAPING_IMAGES.snowRemoval },
  { id: "drainage-solutions", title: "Drainage Solutions", icon: "Droplets", description: "French drains, grading, and downspout extensions to protect foundations.", image: LANDSCAPING_IMAGES.drainage },
  { id: "commercial-landscaping", title: "Commercial Landscaping", icon: "Building", description: "Grounds maintenance, seasonal color, and snow for HOAs and retail.", image: LANDSCAPING_IMAGES.commercialGrounds },
  { id: "residential-landscaping", title: "Residential Landscaping", icon: "Home", description: "Full-property makeovers from front curb appeal to backyard retreats.", image: LANDSCAPING_IMAGES.residentialYard },
  { id: "emergency-tree-service", title: "Emergency Tree Service", icon: "ShieldCheck", description: "24/7 storm damage response — fallen trees, hangers, and hazard mitigation.", image: LANDSCAPING_IMAGES.emergencyTree },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const HOME_TRANSFORMATIONS = [
  {
    id: "ridgewood-backyard",
    title: "Backyard Oasis Transformation",
    location: "Ridgewood, NJ",
    category: "Residential",
    serviceId: "residential-landscaping",
    description: "Terraced patio, native plantings, and landscape lighting turned a sloped yard into an entertainer's retreat.",
    beforeImage: LANDSCAPING_IMAGES.beforeYard,
    afterImage: LANDSCAPING_IMAGES.afterYard,
  },
  {
    id: "montclair-lawn",
    title: "Premium Lawn Restoration",
    location: "Montclair, NJ",
    category: "Lawn Care",
    serviceId: "sod-installation",
    description: "Grading, irrigation tune-up, and premium sod delivered a golf-course green in three weeks.",
    beforeImage: LANDSCAPING_IMAGES.beforeLawn,
    afterImage: LANDSCAPING_IMAGES.afterLawn,
  },
  {
    id: "ho-ho-kus-patio",
    title: "Natural Stone Patio & Fire Feature",
    location: "Ho-Ho-Kus, NJ",
    category: "Hardscape",
    serviceId: "patio-installation",
    description: "Bluestone patio with built-in seating wall and low-voltage lighting for year-round use.",
    beforeImage: LANDSCAPING_IMAGES.beforePatio,
    afterImage: LANDSCAPING_IMAGES.afterPatio,
  },
  {
    id: "paramus-commercial",
    title: "Medical Campus Grounds Refresh",
    location: "Paramus, NJ",
    category: "Commercial",
    serviceId: "commercial-landscaping",
    description: "Phased shrub replacement, mulch, and seasonal color without disrupting patient parking.",
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
  description: `${p.title} completed by VerdeField in ${p.location}. Design-build coordination, premium materials, warranty-backed.`,
  image: p.afterImage,
  gallery: [p.beforeImage, p.afterImage],
  beforeImage: p.beforeImage,
  afterImage: p.afterImage,
  number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  { id: "james-verde", name: "James Verde", role: "Founder & Lead Arborist", bio: "James built VerdeField on certified tree care and honest scopes — no upsells, just outdoor spaces done right.", image: LANDSCAPING_IMAGES.avatarG, social: { linkedin: "#", twitter: "#" } },
  { id: "maria-stone", name: "Maria Stone", role: "Landscape Design Director", bio: "Maria leads design-build projects from concept through install with NJ-native plant expertise.", image: LANDSCAPING_IMAGES.avatarC, social: { linkedin: "#", twitter: "#" } },
  { id: "carlos-rivera", name: "Carlos Rivera", role: "Hardscape Foreman", bio: "Carlos runs masonry crews specializing in natural stone and engineered retaining walls.", image: LANDSCAPING_IMAGES.avatarB, social: { linkedin: "#", twitter: "#" } },
  { id: "sarah-kim", name: "Sarah Kim", role: "Client Care Manager", bio: "Sarah coordinates estimates, maintenance routes, and emergency tree dispatch.", image: LANDSCAPING_IMAGES.avatarA, social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Patricia H.", role: "Ridgewood, NJ", quote: "Our backyard is unrecognizable — the patio, plantings, and lighting feel like a resort.", avatar: LANDSCAPING_IMAGES.avatarA, rating: 5 },
  { name: "Mark D.", role: "Montclair, NJ", quote: "Emergency tree removal after the storm was fast, safe, and fairly priced.", avatar: LANDSCAPING_IMAGES.avatarB, rating: 5 },
  { name: "Lisa R.", role: "Ho-Ho-Kus, NJ", quote: "Weekly lawn service is consistent — edges are crisp and beds always look fresh.", avatar: LANDSCAPING_IMAGES.avatarC, rating: 5 },
  { name: "Brian T.", role: "Paramus, NJ", quote: "Commercial grounds look professional year-round. Snow service is reliable.", avatar: LANDSCAPING_IMAGES.avatarA, rating: 5 },
  { name: "Angela M.", role: "Fair Lawn, NJ", quote: "Design walkthrough saved us from costly mistakes. The drainage fix solved our basement worries.", avatar: LANDSCAPING_IMAGES.avatarB, rating: 5 },
  { name: "Kevin S.", role: "Tenafly, NJ", quote: "Honest proposal, clean crew, and a finished project we're proud to show neighbors.", avatar: LANDSCAPING_IMAGES.avatarC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "spring-cleanup", title: "Spring Cleanup Checklist for NJ Homeowners", excerpt: "What to tackle before mulch season peaks.", date: "April 10, 2025", author: "Maria Stone", category: "Seasonal", image: LANDSCAPING_IMAGES.seasonalCleanup, content: "Spring cleanup priorities for North Jersey — pruning, bed edging, and irrigation startup." },
  { id: "tree-storm-prep", title: "Preparing Trees Before Storm Season", excerpt: "Pruning and cabling that reduce failure risk.", date: "March 5, 2025", author: "James Verde", category: "Tree Care", image: LANDSCAPING_IMAGES.treeTrimming, content: "Structural pruning and hazard assessments before summer storms." },
  { id: "patio-materials", title: "Natural Stone vs Pavers for NJ Patios", excerpt: "Freeze-thaw performance and maintenance compared.", date: "February 18, 2025", author: "Carlos Rivera", category: "Hardscape", image: LANDSCAPING_IMAGES.hardscapePatio, content: "Material selection for patios that survive New Jersey winters." },
  { id: "lawn-fertilization", title: "When to Fertilize Cool-Season Lawns", excerpt: "Timing that greens without burning.", date: "January 30, 2025", author: "Sarah Kim", category: "Lawn Care", image: LANDSCAPING_IMAGES.lawnGreen, content: "Fertilization calendar for Bergen County cool-season turf." },
  { id: "irrigation-winterize", title: "Why Irrigation Winterization Matters", excerpt: "Avoid burst lines and costly spring repairs.", date: "December 12, 2024", author: "Carlos Rivera", category: "Irrigation", image: LANDSCAPING_IMAGES.irrigation, content: "Blowout and controller shutdown steps before first freeze." },
  { id: "outdoor-lighting", title: "Landscape Lighting That Adds Security", excerpt: "Layer path, accent, and uplighting correctly.", date: "November 8, 2024", author: "Maria Stone", category: "Lighting", image: LANDSCAPING_IMAGES.outdoorLighting, content: "Low-voltage lighting design for safety and curb appeal." },
];

export const STATS = [
  { value: 3200, label: "Properties Served", suffix: "+" },
  { value: 18, label: "Years Experience", suffix: "+" },
  { value: 410, label: "5-Star Reviews", suffix: "+" },
  { value: 24, label: "Hour Emergency", suffix: "/7" },
];

export const FAQ_ITEMS = [
  { question: "Do you offer free estimates?", answer: "Yes — we provide free on-site property walkthroughs with written scope, materials, and timeline." },
  { question: "Are you licensed and insured?", answer: "VerdeField holds NJ Home Improvement Contractor license #13VH98765432, full liability, workers' comp, and ISA-certified arborists." },
  { question: "Do you handle emergency tree work?", answer: "Yes — 24/7 dispatch for storm damage, fallen trees, and hazardous hangers." },
  { question: "What areas do you serve?", answer: "Bergen, Passaic, Morris, Essex, and Hudson counties in North Jersey." },
  { question: "Can you maintain my property year-round?", answer: "We offer weekly mowing, seasonal cleanups, mulch, and snow contracts tailored to your property." },
  { question: "Do you offer design services?", answer: "Our in-house designers produce master plans, planting palettes, and hardscape layouts before install." },
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

export const CORE_VALUES = [
  { id: "craft", title: "Craftsmanship in every detail", description: "From stone cuts to pruning angles — work we sign our name to.", icon: "Hammer" as const },
  { id: "honesty", title: "Honest scopes", description: "Line-item proposals so you know what you're investing in.", icon: "Eye" as const },
  { id: "safety", title: "Safety-first tree work", description: "Rigging, PPE, and permits — never shortcuts on hazardous work.", icon: "ShieldCheck" as const },
  { id: "steward", title: "Stewardship of land", description: "Native plants, smart drainage, and sustainable maintenance.", icon: "Leaf" as const },
  { id: "local", title: "Local accountability", description: "Family-owned — we live in the communities we serve.", icon: "Heart" as const },
  { id: "response", title: "Responsive service", description: "Same-week estimates and 24/7 emergency tree dispatch.", icon: "Clock" as const },
];

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
    { question: "Do you pull permits for tree removal?", answer: "Yes — we handle municipal permits where required and document disposal." },
    { question: "Can you prune near power lines?", answer: "We coordinate with utilities when lines are involved; never DIY near energized lines." },
    { question: "Is stump grinding included?", answer: "Stump grinding is available as an add-on or bundled with removal." },
  ],
  lawn: [
    { question: "How often do you mow?", answer: "Weekly during peak season; bi-weekly options for low-growth properties." },
    { question: "Do you use organic fertilizers?", answer: "We offer organic and conventional programs based on your goals." },
    { question: "When is the best time to plant?", answer: "Spring and fall are ideal for perennials and trees in North Jersey." },
  ],
  hardscape: [
    { question: "What patio materials do you install?", answer: "Natural bluestone, limestone, and premium concrete pavers." },
    { question: "Do you handle drainage?", answer: "Yes — pitch, French drains, and downspout routing are part of our design-build process." },
    { question: "How long does a patio project take?", answer: "Typical backyards run 1–3 weeks depending on size and utilities." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Full-service landscaping and tree care for North Jersey — design, install, maintain, and protect residential and commercial outdoor spaces.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "drainage", title: "Standing Water in Yard", description: "Poor grading leads to mosquitoes and foundation issues — we design drainage fixes.", icon: "Droplets" as const },
  { id: "tree", title: "Overgrown or Hazard Trees", description: "Leaning trunks, dead limbs, or roots lifting pavement need certified assessment.", icon: "Trees" as const },
  { id: "lawn", title: "Patchy or Weedy Lawn", description: "Soil testing, aeration, and sod can restore curb appeal quickly.", icon: "Leaf" as const },
  { id: "patio", title: "Outdated Patio or Walkways", description: "Heaved pavers and faded stone — refresh with engineered base and new materials.", icon: "Grid3x3" as const },
  { id: "seasonal", title: "Seasonal Bed Maintenance", description: "Mulch, pruning, and leaf cleanup keep properties sharp year-round.", icon: "Sun" as const },
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
  category: s.title.toUpperCase().split(" ")[0],
  title: s.title,
  subtitle: "LICENSED CREWS · PREMIUM MATERIALS",
  body: [
    `${s.description} VerdeField crews follow documented site protection, utility locates, and quality checks at every phase.`,
    "Every project includes clear communication, daily cleanup, and warranty-backed workmanship.",
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
  description: "Tell us about your property — we respond within one business day with next steps.",
  bullets: [
    "Free on-site walkthroughs",
    "Written scope & timeline",
    "ISA-certified tree care",
    "NJ HIC licensed & insured",
  ],
};

export const STORM_CHECKLIST = [
  { id: "photos", title: "Share Property Photos", description: "Wide shots of yard, trees, or problem areas speed up your estimate." },
  { id: "walk", title: "Schedule Walkthrough", description: "We assess drainage, access, and scope on site." },
  { id: "proposal", title: "Review Proposal", description: "Transparent pricing, materials, and schedule." },
  { id: "book", title: "Reserve Your Dates", description: "Spring and fall book quickly — secure your slot." },
];

export const INSPECTION_BENEFITS = [
  { id: "curb", title: "Elevate Curb Appeal", description: "Professional landscapes increase perceived home value.", icon: "Home" as const },
  { id: "safety", title: "Safer Trees", description: "Pruning and removal reduce risk to structures and family.", icon: "ShieldCheck" as const },
  { id: "drain", title: "Protect Foundations", description: "Proper grading and drainage keep basements dry.", icon: "Droplets" as const },
  { id: "enjoy", title: "Enjoy Your Yard", description: "Patios, lighting, and plantings extend living outdoors.", icon: "Sparkles" as const },
];

export const INSPECTION_TYPES = [
  { id: "residential", title: "Residential Assessments", description: "Full-property design and maintenance plans.", image: LANDSCAPING_IMAGES.residentialYard },
  { id: "commercial", title: "Commercial Grounds", description: "HOA, retail, and office campuses.", image: LANDSCAPING_IMAGES.commercialGrounds },
  { id: "tree", title: "Tree Health Evaluations", description: "Arborist reports and hazard mitigation.", image: LANDSCAPING_IMAGES.treeTrimming },
  { id: "hardscape", title: "Hardscape Consultations", description: "Patio, wall, and walkway feasibility.", image: LANDSCAPING_IMAGES.hardscapePatio },
];

export const INSPECTION_CHECKLIST = [
  "Slope & drainage review",
  "Tree health & clearance",
  "Soil & lawn condition",
  "Hardscape stability",
  "Irrigation efficiency",
  "Maintenance recommendations",
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NJ HIC #13VH98765432 with full liability coverage.", icon: "ShieldCheck" as const },
  { id: "isa", title: "ISA Arborists", description: "Certified pruning and removal on staff.", icon: "Trees" as const },
  { id: "family", title: "Family Owned", description: "Local accountability since 2006.", icon: "Heart" as const },
  { id: "honest", title: "Transparent Pricing", description: "Line-item proposals — no surprise add-ons.", icon: "Tag" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "years", title: "18+ Years Local", icon: "Award" as const },
  { id: "licensed", title: "NJ HIC Licensed", icon: "ShieldCheck" as const },
  { id: "isa", title: "ISA Arborists", icon: "Trees" as const },
  { id: "emergency", title: "24/7 Tree Emergency", icon: "Clock" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "FLEXIBLE PROJECT BILLING",
  title: "Invest in Lasting Outdoor Value",
  subtitle: "Landscapes and hardscape are long-term investments in your property.",
  body: "We offer phased billing on design-build projects and seasonal maintenance contracts billed monthly or annually.",
  image: LANDSCAPING_IMAGES.financing,
  benefits: [
    "Phased payments on large installs",
    "Clear milestone billing",
    "Maintenance contract options",
    "No hidden change orders",
  ],
  cta: { label: "DISCUSS PAYMENT OPTIONS", to: "/contact" },
};
