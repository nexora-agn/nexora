/**
 * FAMILY FIRST PLUMBING — Nexora template content registry.
 * Inspired by familyfirstplumbingnj.com (structure, services, NJ shore positioning).
 * Default showcase brand uses the client's existing logo asset.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const premium = (path: string, w = 600, h = 400) =>
  `https://plus.unsplash.com/${path}?w=${w}&h=${h}&auto=format&fit=crop&q=85`;

/** Service hero images — curated from Unsplash (user-selected). */
export const PLUMBING_IMAGES = {
  heroPlumber: u("1526898943670-92bfa9f94c12", 1920, 1080),
  plumberWorking: u("1526898943670-92bfa9f94c12"),
  plumberSink: u("1779113940567-617ec0de80ad"),
  plumberTools: u("1526898943670-92bfa9f94c12"),
  workerPlumber2: u("1526898943670-92bfa9f94c12"),
  pipes: u("1618840626133-54463084a141"),
  pipesClose: u("1621905251189-08b45d6a269e"),
  bathroom: u("1779113940567-617ec0de80ad"),
  kitchen: premium("premium_photo-1682126049179-3c4e06049b55"),
  /** Water heater / pump service — unsplash.com/photos/Tr9W2tl0g9o */
  waterHeater: premium("premium_photo-1682126049179-3c4e06049b55"),
  /** Slab leak / wall repair — unsplash.com/photos/jF8AL7LO59I */
  slabLeakRepair: premium("premium_photo-1682882489477-ef82fd77f1d5"),
  /** Drain / floor cleaning — unsplash.com/photos/zOFckCbvEUs (squeegee worker) */
  drainCleaning: premium("premium_photo-1764004514379-60b0a13f726c"),
  homePlumbing: premium("premium_photo-1682126049179-3c4e06049b55", 1920, 1080),
  drain: premium("premium_photo-1661662815924-97a8a767a262"),
  commercial: u("1504307651254-35680f356dfd"),
  team: u("1600880292203-757bb62b4baf"),
  van: u("1521791136064-7986c2920216"),
  emergency: premium("premium_photo-1663045495725-89f23b57cfc5"),
  emergencyScene: premium("premium_photo-1663045495725-89f23b57cfc5"),
  leak: u("1618840626133-54463084a141"),
  leakDetection: u("1581094794329-c8112a89af12"),
  boiler: premium("premium_photo-1664301972519-506636f0245d"),
  smartHome: u("1526898943670-92bfa9f94c12"),
  contactHero: u("1581092160562-40aa08e78837", 1400, 900),
  aboutHero: premium("premium_photo-1682126049179-3c4e06049b55", 1400, 900),
  aboutWhoWeAre: premium("premium_photo-1682882489477-ef82fd77f1d5", 1200, 900),
  reviewsHero: u("1580489944761-15a19d654956", 1400, 900),
  residentialSplit: premium("premium_photo-1682126049179-3c4e06049b55", 900, 1200),
  commercialSplit: u("1504307651254-35680f356dfd", 900, 1200),
  troubleshoot: u("1779113940567-617ec0de80ad", 900, 1100),
  troubleshootSection: premium("premium_photo-1663045495725-89f23b57cfc5", 900, 1100),
  blogHero: u("1526898943670-92bfa9f94c12", 1400, 900),
  financing: u("1472099645785-5658abf4ff4e"),
  beforePipe: u("1621905252507-b35492cc74b4"),
  afterPipe: u("1621905251189-08b45d6a269e"),
  avatarA: u("1507003211169-0a1dd7228f2d", 120, 120),
  avatarB: u("1472099645785-5658abf4ff4e", 120, 120),
  avatarC: u("1580489944761-15a19d654956", 120, 120),
  avatarD: u("1507003211169-0a1dd7228f2d", 80, 80),
  avatarE: u("1472099645785-5658abf4ff4e", 80, 80),
  avatarF: u("1580489944761-15a19d654956", 80, 80),
  avatarG: u("1580489944761-15a19d654956", 300, 300),
} as const;

export const COMPANY = {
  name: "Family First Plumbing",
  legalName: "Family First Plumbing LLC",
  tagline:
    "Monmouth & Ocean County's trusted plumber and boiler specialist — emergency repairs, hydronic heating, and honest service your family can count on.",
  phone: "(732) 996-4491",
  email: "service@familyfirstplumbingnj.com",
  address: "Monmouth & Ocean County, New Jersey",
  hours: "Call or text · Fast scheduling · Emergency service available",
  license: "Fully Licensed & Insured NJ Contractor",
  fax: "",
};

export const SITE_TOP = {
  line: "Call or Text a Photo — We'll Diagnose Fast",
  badges: ["Licensed & Insured", "Boiler & Hydronic Specialists", "Family-Owned Local Team"],
  ratingValue: "5.0",
  ratingCount: "100+",
  ratingLabel: "Reviews",
  locations: "Monmouth · Ocean County",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "8:00 AM – 2:00 PM" },
  { days: "Emergency", hours: "Call or text anytime" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.25%2C39.85%2C-73.85%2C40.35&layer=mapnik&marker=40.22,-74.05";

export const HOME_HERO = {
  eyebrow: "PLUMBER & BOILER SPECIALIST",
  headlineBefore: "Plumbing Problems",
  headlineHighlight: "Handled Right",
  headlineAfter: "The First Time — For Your Family.",
  body:
    "No hot water, leaks, or heating issues? Family First Plumbing handles the jobs most plumbers avoid — boilers, hydronic systems, and the repairs homeowners dread. Call or text a photo for a fast, straightforward solution.",
  primaryCta: { label: "SCHEDULE SERVICE", to: "/contact" },
  secondaryCta: { label: "EMERGENCY HELP", to: "/services/emergency-plumbing" },
  image: PLUMBING_IMAGES.homePlumbing,
  trustPills: [
    { label: "Licensed & Insured", sub: "NJ Contractor", icon: "ShieldCheck" as const },
    { label: "Boiler Experts", sub: "Hydronic Heating", icon: "Thermometer" as const },
    { label: "Local & Trusted", sub: "Shore Communities", icon: "Home" as const },
  ],
  ratingQuote:
    "We fix the problem, not just the symptom — clear communication, on-time arrivals, and work done to code.",
  ratingCard: {
    score: "5.0",
    countLabel: "Loved by Shore Homeowners",
    avatars: [
      PLUMBING_IMAGES.avatarD,
      PLUMBING_IMAGES.avatarE,
      PLUMBING_IMAGES.avatarF,
      PLUMBING_IMAGES.avatarA,
    ],
  },
  featuredEyebrow: "MONMOUTH & OCEAN COUNTY",
  featuredTitle: "Your Local Plumbing Partner",
  featuredMeta: "Residential · Commercial · Boilers",
};

export const SERVICES_RIBBON = [
  {
    id: "emergency-plumbing", label: "Emergency Plumbing", icon: "Flame" as const,
    description: "Burst pipes, backups, and urgent leaks — fast response when it matters.", to: "/services/emergency-plumbing",
  },
  {
    id: "drain-cleaning", label: "Drain Cleaning", icon: "Droplets" as const,
    description: "Kitchen, bath, and main line clogs cleared the right way.", to: "/services/drain-cleaning",
  },
  {
    id: "water-heaters", label: "Water Heaters", icon: "Flame" as const,
    description: "Repair, replacement, and installation when hot water can't wait.", to: "/services/water-heaters",
  },
  {
    id: "sewer-services", label: "Sewer Services", icon: "Waves" as const,
    description: "Line cleaning, repairs, and backup solutions for peace of mind.", to: "/services/sewer-services",
  },
  {
    id: "leak-detection", label: "Leak Detection", icon: "Search" as const,
    description: "Find hidden leaks before they damage walls, slabs, or bills.", to: "/services/leak-detection",
  },
  {
    id: "pipe-repair", label: "Pipe Repair", icon: "Wrench" as const,
    description: "Corroded, frozen, or failing pipes repaired to local code.", to: "/services/pipe-repair",
  },
  {
    id: "plumbing-installations", label: "Installations", icon: "Hammer" as const,
    description: "Fixtures, lines, and upgrades installed cleanly and correctly.", to: "/services/plumbing-installations",
  },
  {
    id: "residential-plumbing", label: "Residential", icon: "Home" as const,
    description: "Whole-home plumbing care for shore families.", to: "/services/residential-plumbing",
  },
  {
    id: "commercial-plumbing", label: "Commercial", icon: "Building2" as const,
    description: "Reliable plumbing for offices, retail, and multi-family properties.", to: "/services/commercial-plumbing",
  },
];

export const CAPABILITIES = [
  { id: "boiler", title: "Boiler & Hydronic Pros", description: "We specialize in boilers and heating systems other plumbers avoid.", icon: "Thermometer" as const, to: "/services/water-heaters" },
  { id: "licensed", title: "Licensed & Insured", description: "Fully licensed New Jersey plumbing contractor — code-compliant every job.", icon: "ShieldCheck" as const, to: "/about" },
  { id: "honest", title: "No Runaround", description: "Straight answers, clear options, and pricing before work starts.", icon: "Eye" as const, to: "/about" },
  { id: "ontime", title: "We Show Up", description: "On-time appointments and follow-up after the job is done.", icon: "Clock" as const, to: "/about" },
];

export const PROCESS_STEPS = [
  { id: "touch", label: "Get in Touch", description: "Call or request service online — we answer 24/7." },
  { id: "response", label: "Fast, Professional Response", description: "A licensed technician arrives on time, ready to assess and fix the issue." },
  { id: "pricing", label: "Transparent Solution & Pricing", description: "We explain the problem, recommend solutions, and provide a clear quote before work begins." },
  { id: "guarantee", label: "Quality Service Guaranteed", description: "Workmanship warranties and a focus on long-term performance — your satisfaction is our priority." },
];

export const HOME_STATS = [
  { value: "5.0", label: "Average Rating", icon: "Award" as const },
  { value: "2", label: "Counties Served", icon: "Home" as const },
  { value: "24/7", label: "Emergency Help", icon: "Clock" as const },
  { value: "100%", label: "Licensed Work", icon: "ShieldCheck" as const },
];

export const WHY_BENEFITS = [
  { title: "Boiler & Hydronic Specialists", description: "No heat, no hot water, strange noises — we diagnose hydronic systems other plumbers pass on.", icon: "Thermometer" as const },
  { title: "We Fix the Real Problem", description: "Not just the symptom — lasting repairs with clear explanations in plain language.", icon: "Wrench" as const },
  { title: "Fully Licensed & Insured", description: "New Jersey plumbing contractor meeting strict safety and local code requirements.", icon: "ShieldCheck" as const },
  { title: "Family-First Service", description: "Respectful crews, tidy job sites, and follow-up after the work is complete.", icon: "Home" as const },
  { title: "On-Time & Straightforward", description: "We show up when we say we will — no guesswork, no runaround.", icon: "Clock" as const },
  { title: "Shore Community Trusted", description: "Proudly serving Monmouth and Ocean County homeowners and businesses.", icon: "Heart" as const },
];

export const SERVICES = [
  {
    id: "emergency-plumbing", title: "Emergency Plumbing", icon: "Flame",
    description: "Burst pipes, sewer backups, and urgent leaks — call or text a photo for fast help.",
    image: PLUMBING_IMAGES.emergency,
  },
  {
    id: "drain-cleaning", title: "Drain Cleaning", icon: "Droplets",
    description: "Clear tough clogs and restore flow in kitchen, bath, and main lines.",
    image: PLUMBING_IMAGES.drain,
  },
  {
    id: "water-heaters", title: "Water Heater Services", icon: "Flame",
    description: "Tank and tankless repair, replacement, and maintenance — hot water restored quickly.",
    image: PLUMBING_IMAGES.waterHeater,
  },
  {
    id: "sewer-services", title: "Sewer Services", icon: "Waves",
    description: "Sewer line cleaning, repair, and backup response for homes and businesses.",
    image: PLUMBING_IMAGES.pipes,
  },
  {
    id: "leak-detection", title: "Leak Detection", icon: "Search",
    description: "Locate hidden leaks in walls, slabs, and supply lines before damage spreads.",
    image: PLUMBING_IMAGES.leakDetection,
  },
  {
    id: "pipe-repair", title: "Pipe Repair", icon: "Wrench",
    description: "Repair corroded, frozen, or damaged pipes with code-compliant materials.",
    image: PLUMBING_IMAGES.pipesClose,
  },
  {
    id: "plumbing-installations", title: "Plumbing Installations", icon: "Hammer",
    description: "New fixtures, repipes, sump pumps, and outdoor spigots installed right.",
    image: PLUMBING_IMAGES.kitchen,
  },
  {
    id: "residential-plumbing", title: "Residential Plumbing", icon: "Home",
    description: "Full-home plumbing for shore families — repairs, upgrades, and maintenance.",
    image: PLUMBING_IMAGES.residentialSplit,
  },
  {
    id: "commercial-plumbing", title: "Commercial Plumbing", icon: "Building2",
    description: "Reliable plumbing for retail, offices, and multi-family properties.",
    image: PLUMBING_IMAGES.commercial,
  },
];

export const BEFORE_AFTER_PROJECTS = [
  {
    id: "freehold-water-heater", title: "Water Heater Replacement", location: "Freehold, NJ", category: "Water Heaters",
    serviceId: "water-heaters",
    beforeImage: PLUMBING_IMAGES.beforePipe,
    afterImage: PLUMBING_IMAGES.waterHeater,
  },
  {
    id: "toms-river-drain", title: "Main Line Drain Cleaning", location: "Toms River, NJ", category: "Drain Cleaning",
    serviceId: "drain-cleaning",
    beforeImage: PLUMBING_IMAGES.pipes,
    afterImage: PLUMBING_IMAGES.drainCleaning,
  },
  {
    id: "red-bank-leak", title: "Hidden Slab Leak Repair", location: "Red Bank, NJ", category: "Leak Detection",
    serviceId: "leak-detection",
    beforeImage: PLUMBING_IMAGES.leak,
    afterImage: PLUMBING_IMAGES.slabLeakRepair,
  },
  {
    id: "brick-boiler", title: "Boiler Service & Repair", location: "Brick, NJ", category: "Boilers",
    serviceId: "boilers",
    beforeImage: PLUMBING_IMAGES.pipesClose,
    afterImage: PLUMBING_IMAGES.boiler,
  },
  {
    id: "point-pleasant-emergency", title: "Emergency Burst Pipe Repair", location: "Point Pleasant, NJ", category: "Emergency",
    serviceId: "emergency-plumbing",
    beforeImage: PLUMBING_IMAGES.beforePipe,
    afterImage: PLUMBING_IMAGES.emergency,
  },
];

export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({
  id: p.id, title: p.title, category: p.category, serviceId: p.serviceId,
  location: p.location, year: "2024",
  client: p.category === "Commercial" ? "Commercial Client" : "Private Homeowner",
  value: "—",
  description: `${p.title} for our ${p.category.toLowerCase()} team in ${p.location}. Licensed work, clean job site, warranty-backed.`,
  image: p.afterImage, gallery: [p.beforeImage, p.afterImage],
  beforeImage: p.beforeImage, afterImage: p.afterImage, number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 5;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  {
    id: "james-clear", name: "James Clearwater", role: "Founder & Master Plumber",
    bio: "James founded Family First with one promise: honest diagnostics, quality workmanship, and respect for every home.",
    image: PLUMBING_IMAGES.avatarG,
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "maria-santos", name: "Maria Santos", role: "Operations Director",
    bio: "Maria keeps crews routed across five counties — your appointment window means something.",
    image: PLUMBING_IMAGES.avatarC,
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "tom-rivers", name: "Tom Rivers", role: "Lead Commercial Plumber",
    bio: "Tom runs commercial plumbing for restaurants, offices, and multi-family properties.",
    image: PLUMBING_IMAGES.avatarB,
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "sarah-kim", name: "Sarah Kim", role: "Water Systems Specialist",
    bio: "Sarah leads water heater and boiler installs across Central NJ.",
    image: PLUMBING_IMAGES.avatarC,
    social: { linkedin: "#", twitter: "#" },
  },
];

export const TESTIMONIALS = [
  { name: "Karen S.", role: "Freehold, NJ", quote: "Extremely knowledgeable — went over every option for our repair, did the work personally, and followed up after the job. Highly recommend.", avatar: PLUMBING_IMAGES.avatarA, rating: 5 },
  { name: "Mike D.", role: "Toms River, NJ", quote: "Great scheduling and communication from start to finish. Exactly what you want from a local plumber.", avatar: PLUMBING_IMAGES.avatarB, rating: 5 },
  { name: "Linda P.", role: "Red Bank, NJ", quote: "They repaired our leaking water heater quickly. The home inspection caught pressure issues we didn't know about — huge help.", avatar: PLUMBING_IMAGES.avatarC, rating: 5 },
  { name: "James W.", role: "Brick, NJ", quote: "Quick, reliable, efficient service at reasonable rates. Will call again without hesitation.", avatar: PLUMBING_IMAGES.avatarA, rating: 5 },
  { name: "Donna R.", role: "Point Pleasant, NJ", quote: "Boiler was making strange noises — they fixed the real issue, not a band-aid. House is warm again.", avatar: PLUMBING_IMAGES.avatarB, rating: 5 },
  { name: "Steve H.", role: "Howell, NJ", quote: "Family-owned feel with professional results. On time, respectful, and honest about pricing.", avatar: PLUMBING_IMAGES.avatarC, rating: 5 },
];

export const BLOG_POSTS = [
  {
    id: "signs-water-heater-failure", title: "Signs Your Water Heater Is Failing", excerpt: "Rusty water, rumbling, and age — when to repair vs replace.",
    date: "March 18, 2024", author: "James Clearwater", category: "Water Heaters",
    image: PLUMBING_IMAGES.waterHeater,
    content: "Rusty water, rumbling, and age — when to repair vs replace. Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",
  },
  {
    id: "prevent-frozen-pipes-nj", title: "How to Prevent Frozen Pipes in New Jersey Winters", excerpt: "Insulation, drip tips, and when to call a pro.",
    date: "February 28, 2024", author: "Sarah Kim", category: "Tips",
    image: PLUMBING_IMAGES.pipes,
    content: "Insulation, drip tips, and when to call a pro. Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",
  },
  {
    id: "drain-cleaning-vs-snaking", title: "Drain Cleaning vs Snaking: What's Right for Your Clog?", excerpt: "When hydro-jetting beats a basic snake.",
    date: "January 22, 2024", author: "Tom Rivers", category: "Drains",
    image: PLUMBING_IMAGES.drain,
    content: "When hydro-jetting beats a basic snake. Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",
  },
  {
    id: "boiler-maintenance-winter", title: "Boiler Maintenance Before Winter", excerpt: "Annual service, pressure checks, and when to call a pro.",
    date: "December 8, 2023", author: "Maria Santos", category: "Boilers",
    image: PLUMBING_IMAGES.boiler,
    content: "Annual service, pressure checks, and when to call a pro. Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",
  },
  {
    id: "signs-hidden-water-leak", title: "5 Signs of a Hidden Water Leak", excerpt: "Spikes on your bill, stains, and musty odors.",
    date: "November 14, 2023", author: "Sarah Kim", category: "Leak Detection",
    image: PLUMBING_IMAGES.leak,
    content: "Spikes on your bill, stains, and musty odors — when to schedule professional leak detection. Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",
  },
  {
    id: "emergency-plumbing-checklist", title: "What to Do Before the Plumber Arrives", excerpt: "Shutoffs, safety, and damage control for emergencies.",
    date: "October 3, 2023", author: "James Clearwater", category: "Emergency",
    image: PLUMBING_IMAGES.emergency,
    content: "Shutoffs, safety, and damage control for emergencies. Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",
  },
];

export const STATS = [
  { value: 100000, label: "Projects Complete", suffix: "+" },
  { value: 30, label: "Years Experience", suffix: "+" },
  { value: 500, label: "5-Star Reviews", suffix: "+" },
  { value: 100, label: "Satisfaction Guarantee", suffix: "%" },
];

export const FAQ_ITEMS = [
  { question: "Do you work on boilers and hydronic heating?", answer: "Yes — boiler repair, hydronic heating, circulator pumps, and expansion tanks are core specialties. We handle the systems many plumbers avoid." },
  { question: "Can I text a photo of my plumbing issue?", answer: "Absolutely. Call or text a photo to (732) 996-4491 so we can triage faster and arrive prepared." },
  { question: "Are you licensed and insured in New Jersey?", answer: "Family First Plumbing is a fully licensed and insured New Jersey plumbing contractor. Every install and repair meets local code and safety requirements." },
  { question: "What should I do if I have no heat or hot water?", answer: "Check your thermostat and boiler power if safe to do so, then call us. No heat and no hot water are urgent — especially in winter." },
  { question: "Do you offer financing or free estimates?", answer: "We provide clear estimates before work begins and can discuss financing options on qualifying water heaters and larger projects." },
  { question: "What areas do you serve?", answer: "We proudly serve Monmouth and Ocean County — including Freehold, Toms River, Red Bank, Brick, and surrounding shore communities." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Financing", path: "/financing" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Emergency Plumbing", to: "/services/emergency-plumbing" },
  { label: "Drain Cleaning", to: "/services/drain-cleaning" },
  { label: "Water Heater Services", to: "/services/water-heaters" },
  { label: "Sewer Services", to: "/services/sewer-services" },
  { label: "Leak Detection", to: "/services/leak-detection" },
  { label: "Residential Plumbing", to: "/services/residential-plumbing" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Financing", to: "/financing" },
  { label: "Contact Us", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Freehold, NJ",
  "Toms River, NJ",
  "Red Bank, NJ",
  "Brick, NJ",
  "Point Pleasant, NJ",
  "Howell, NJ",
  "Middletown, NJ",
  "Jackson, NJ",
  "Lakewood, NJ",
  "Manalapan, NJ",
];

export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["WATER HEATERS", "DRAINS", "TIPS", "BOILERS", "LEAK DETECTION", "EMERGENCY"];

export const PROJECTS_PAGE_STATS = [
  { value: "100k+", label: "Projects Complete" },
  { value: "30+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "4.9", label: "Google Rating" },
];

export const ABOUT_STATS = [
  { value: "30+", label: "Years Experience" },
  { value: "100k+", label: "Projects Complete" },
  { value: "NJ", label: "Master Plumber" },
  { value: "500+", label: "5-Star Reviews" },
  { value: "24/7", label: "Emergency Service" },
];

export const CORE_VALUES = [
  { id: "quality", title: "Quality workmanship", description: "Your home's water matters — we deliver work backed by a warranty you can trust.", icon: "ShieldCheck" as const },
  { id: "honesty", title: "Honest communication", description: "Clear explanations and upfront pricing before any work begins.", icon: "Eye" as const },
  { id: "reliability", title: "24/7 reliability", description: "Plumbing problems don't wait — and neither do we.", icon: "Clock" as const },
  { id: "family", title: "Family-owned", description: "Nearly 30 years serving Central New Jersey communities.", icon: "Home" as const },
  { id: "licensed", title: "Licensed professionals", description: "NJ Master Plumber #7359 — licensed, insured, ID-badged technicians.", icon: "Award" as const },
  { id: "community", title: "Community focused", description: "We hire local and support the neighborhoods we serve.", icon: "Heart" as const },
];

export const CERTIFICATIONS = [
  { id: "nj-master", label: "NJ Master Plumber #7359", sub: "State-licensed plumbing" },
  { id: "insured", label: "Licensed & Insured", sub: "Full liability coverage" },
  { id: "family", label: "Family Owned 30+ Years", sub: "Trusted local business" },
  { id: "bbb", label: "BBB Accredited", sub: "A+ Business Rating" },
  { id: "warranty", label: "Workmanship Warranty", sub: "Quality guaranteed" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "emergency", label: "EMERGENCY" },
  { id: "process", label: "PROCESS" },
  { id: "warranty", label: "WARRANTY" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  emergency: [
    { question: "What counts as a plumbing emergency?", answer: "Burst pipes, major leaks, sewer backups, no hot water in winter, and gas odors require immediate professional help." },
    { question: "How fast can you get here?", answer: "Most Central NJ emergency calls receive a licensed technician within 2–4 hours, 24/7/365." },
    { question: "Should I shut off my water?", answer: "If you have a major leak, shut off the main water valve if safe to do so and call us immediately." },
  ],
  process: [
    { question: "How does scheduling work?", answer: "Call or book online — our team answers 24/7 and confirms your appointment window." },
    { question: "Do you provide upfront pricing?", answer: "Yes — we explain the problem and provide a clear quote before work begins." },
    { question: "Will you leave my home clean?", answer: "Absolutely. Boot covers, floor protection, and cleanup are standard on every job." },
  ],
  warranty: [
    { question: "What warranty do you offer?", answer: "Quality workmanship backed by a warranty you can trust on qualifying installs and repairs." },
    { question: "Is equipment warrantied?", answer: "Yes — manufacturer warranties apply to water heaters, boilers, and fixtures we supply." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Complete plumbing for Monmouth and Ocean County — emergency response, drains, water heaters, sewers, leak detection, and boiler expertise. Licensed, insured, and focused on doing the job right the first time.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "burst-pipe", title: "Burst Pipes", description: "Sudden leaks and flooding — shut off water and call immediately.", icon: "Droplets" as const },
  { id: "clog", title: "Severe Clogs", description: "Backed-up drains, toilets, or main line blockages.", icon: "Waves" as const },
  { id: "no-hot-water", title: "No Hot Water", description: "Water heater failure — especially urgent in cold weather.", icon: "Flame" as const },
  { id: "sewer", title: "Sewer Backup", description: "Raw sewage in drains — health hazard requiring fast response.", icon: "Cloud" as const },
  { id: "leak", title: "Major Leaks", description: "Hidden or visible leaks causing damage or high water bills.", icon: "Search" as const },
  { id: "frozen", title: "Frozen Pipes", description: "Burst risk when temperatures drop — call before damage spreads.", icon: "Snowflake" as const },
];

export const SERVICE_DEEP_DIVES: {
  id: string; category: string; title: string; subtitle: string;
  body: [string, string]; image: string; inclusions: string[];
}[] = [
  {
    id: "emergency-plumbing", category: "EMERGENCY", title: "Emergency Plumbing", subtitle: "24/7 DISPATCH · LICENSED TECHNICIANS",
    body: ["When pipes burst or water won't stop, you need licensed professionals — not a handyman. Family First rolls stocked trucks across Central NJ with the tools to make safe repairs fast.", "We document damage for insurance when needed and never leave a hazardous condition unresolved."],
    image: PLUMBING_IMAGES.emergency,
    inclusions: [
      "24/7 phone dispatch",
      "Same-night emergency response",
      "Burst pipe repair",
      "Leak isolation",
      "Water shutoff assistance",
      "Insurance-ready documentation",
    ],
  },
  {
    id: "drain-cleaning", category: "DRAINS", title: "Drain Cleaning", subtitle: "CLEAR CLOGS · RESTORE FLOW",
    body: ["Kitchen, bathroom, and main line clogs need the right tool — snake, auger, or hydro-jetting. We diagnose the cause and clear blockages without damaging pipes.", "Preventive maintenance keeps drains flowing year-round."],
    image: PLUMBING_IMAGES.drain,
    inclusions: [
      "Kitchen & bath drains",
      "Main line cleaning",
      "Hydro-jetting",
      "Camera inspection",
      "Root intrusion removal",
      "Preventive maintenance",
    ],
  },
  {
    id: "water-heaters", category: "WATER HEATERS", title: "Water Heater Service", subtitle: "REPAIR · REPLACE · MAINTAIN",
    body: ["No hot water is an emergency in New Jersey winters. We service tank and tankless units, pull permits when required, and install quality brands with manufacturer warranties.", "Ask about energy-efficient upgrades and same-day replacement when inventory allows."],
    image: PLUMBING_IMAGES.waterHeater,
    inclusions: [
      "Tank & tankless service",
      "Same-day replacement",
      "Permit coordination",
      "Expansion tanks",
      "Anode rod replacement",
      "Manufacturer warranty",
    ],
  },
  {
    id: "boilers", category: "BOILERS", title: "Boiler Service", subtitle: "INSTALL · REPAIR · MAINTAIN",
    body: ["Reliable heat starts with a properly serviced boiler. We inspect burners, pressure, vents, and safety controls for residential systems across Central NJ.", "Seasonal tune-ups catch failures before winter and extend equipment life."],
    image: PLUMBING_IMAGES.boiler,
    inclusions: [
      "Annual maintenance",
      "Emergency repairs",
      "Pressure & safety checks",
      "Radiant & baseboard systems",
      "Combustion analysis",
      "Manufacturer warranty support",
    ],
  },
  {
    id: "water-leaks", category: "LEAKS", title: "Water Leak Repair", subtitle: "STOP DAMAGE · SAVE WATER",
    body: ["Visible drips and hidden slab leaks can destroy drywall and spike utility bills. We locate the source and repair with code-compliant materials.", "Fast isolation limits damage until a permanent fix is complete."],
    image: PLUMBING_IMAGES.leak,
    inclusions: [
      "Pipe leak repair",
      "Fixture leak fixes",
      "Slab leak coordination",
      "Shutoff valve replacement",
      "Dry-out recommendations",
      "Insurance documentation",
    ],
  },
  {
    id: "leak-detection", category: "LEAK DETECTION", title: "Leak Detection", subtitle: "FIND HIDDEN LEAKS EARLY",
    body: ["Not every leak shows on the ceiling. Acoustic and pressure testing help pinpoint leaks behind walls and under slabs without unnecessary demolition.", "Early detection protects structure and prevents mold."],
    image: PLUMBING_IMAGES.leakDetection,
    inclusions: [
      "Electronic leak detection",
      "Pressure testing",
      "Thermal imaging (when applicable)",
      "Written findings",
      "Repair recommendations",
      "Follow-up verification",
    ],
  },
  {
    id: "sewer-services", category: "SEWER", title: "Sewer Services", subtitle: "LINES · BACKUPS · REPAIR",
    body: ["Sewer backups are stressful and hazardous. We diagnose blockages, broken lines, and root intrusion with the right equipment for your property.", "Clear communication and code-compliant repairs restore safe drainage."],
    image: PLUMBING_IMAGES.pipes,
    inclusions: ["Main line cleaning", "Sewer line repair", "Camera inspection", "Backup response", "Root removal", "Preventive maintenance"],
  },
  {
    id: "pipe-repair", category: "PIPES", title: "Pipe Repair", subtitle: "CORROSION · LEAKS · FREEZE DAMAGE",
    body: ["Failing pipes can damage walls, floors, and foundations. We repair or replace supply and drain lines with materials suited to Jersey Shore homes.", "From isolated fixes to repiping sections, work is done to local code."],
    image: PLUMBING_IMAGES.pipesClose,
    inclusions: ["Copper & PEX repair", "Frozen pipe fixes", "Shutoff valves", "Pressure testing", "Wall access coordination", "Warrantied workmanship"],
  },
  {
    id: "plumbing-installations", category: "INSTALLS", title: "Plumbing Installations", subtitle: "FIXTURES · LINES · UPGRADES",
    body: ["New fixtures, sump pumps, and outdoor spigots should be installed cleanly and tested thoroughly. We handle permits when required and leave your space tidy.", "Upgrades improve comfort, efficiency, and home value."],
    image: PLUMBING_IMAGES.kitchen,
    inclusions: ["Fixture installs", "Sump pumps", "Outdoor spigots", "Supply line upgrades", "Permit coordination", "Final testing"],
  },
  {
    id: "residential-plumbing", category: "RESIDENTIAL", title: "Residential Plumbing", subtitle: "HOMES · CONDOS · RENTALS",
    body: ["Your home's plumbing should be reliable year-round. We handle repairs, maintenance, and upgrades for shore families with respectful in-home service.", "From kitchens and baths to water heaters and boilers — one trusted local team."],
    image: PLUMBING_IMAGES.residentialSplit,
    inclusions: ["Whole-home repairs", "Kitchen & bath", "Water heaters", "Boiler coordination", "Maintenance plans", "Emergency service"],
  },
  {
    id: "commercial-plumbing", category: "COMMERCIAL", title: "Commercial Plumbing", subtitle: "UPTIME · CODE · RELIABILITY",
    body: ["Businesses need plumbing that stays online. We support retail, offices, and multi-family properties with scheduled service and fast emergency response.", "Licensed work that satisfies inspectors and property managers."],
    image: PLUMBING_IMAGES.commercial,
    inclusions: ["Restroom & kitchen lines", "Backflow coordination", "Drain maintenance", "Emergency response", "Property manager billing", "Code-compliant repairs"],
  },
];

export const LEAD_FORM = {
  title: "Get Your Free Plumbing Estimate",
  description: "Tell us what's going on — we'll respond as soon as possible with clear next steps.",
  bullets: [
    "Free estimates on qualifying work",
    "Licensed & insured NJ contractor",
    "Boiler & hydronic specialists",
    "Call or text a photo for faster help",
  ],
};

export const STORM_CHECKLIST = [
  { id: "safety", title: "Shut Off Water", description: "If safe, turn off the main water valve to limit damage until we arrive." },
  { id: "call", title: "Call Family First Plumbing", description: "Call or text (732) 996-4491 — send a photo if you can." },
  { id: "document", title: "Document the Damage", description: "Photos help with insurance claims for burst pipes and flooding." },
  { id: "avoid", title: "Avoid DIY on Gas Lines", description: "Gas odors require immediate evacuation and a licensed professional." },
];

export const INSPECTION_BENEFITS = [
  { id: "prevent", title: "Prevent Water Damage", description: "Catch leaks and failing pipes before they flood your home.", icon: "ShieldCheck" as const },
  { id: "health", title: "Protect Water Quality", description: "Identify contamination risks and aging supply lines.", icon: "Droplets" as const },
  { id: "efficiency", title: "Improve Efficiency", description: "Water heater and fixture upgrades lower utility bills.", icon: "Home" as const },
  { id: "value", title: "Protect Home Value", description: "Clean plumbing reports build buyer confidence.", icon: "DollarSign" as const },
];

export const INSPECTION_TYPES = [
  { id: "routine", title: "Routine Plumbing Inspections", description: "Recommended for older homes to verify pipes, fixtures, and water heaters.", image: PLUMBING_IMAGES.pipes },
  { id: "pre-purchase", title: "Pre-Purchase Inspections", description: "Know what you're buying — we inspect supply, waste, and fixtures.", image: PLUMBING_IMAGES.bathroom },
  { id: "emergency", title: "Post-Emergency Assessment", description: "After burst pipes or backups — documentation for insurance.", image: PLUMBING_IMAGES.emergency },
  { id: "commercial", title: "Commercial Plumbing", description: "Restaurants, offices, and multi-family properties.", image: PLUMBING_IMAGES.commercial },
];

export const INSPECTION_CHECKLIST = [
  "Water heater age & condition",
  "Visible supply & drain lines",
  "Fixture operation & leaks",
  "Main line flow test",
  "Water pressure check",
  "Gas line visual inspection (licensed)",
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NJ Master Plumber #7359 with full liability coverage.", icon: "ShieldCheck" as const },
  { id: "warranty", title: "Warrantied Work", description: "Quality workmanship backed by a warranty you can trust.", icon: "Award" as const },
  { id: "timely", title: "Timely Appointments", description: "Phones answered 24/7 — uniformed, ID-badged technicians.", icon: "Clock" as const },
  { id: "honest", title: "Honest Pricing", description: "Clear quotes before work begins — no surprises.", icon: "Tag" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "family", title: "Family Owned 30+ Years", icon: "Home" as const },
  { id: "licensed", title: "NJ Master Plumber", icon: "ShieldCheck" as const },
  { id: "warranty", title: "Warrantied Work", icon: "Award" as const },
  { id: "honest", title: "Upfront Pricing", icon: "Tag" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "FLEXIBLE FINANCING",
  title: "Affordable Plumbing Solutions",
  subtitle: "Don't let budget stand between you and essential repairs.",
  body: "We partner with trusted lenders to offer flexible financing on qualifying water heaters, boilers, and major installations. Apply in minutes — decisions often same day.",
  image: PLUMBING_IMAGES.financing,
  benefits: [
    "Low monthly payments",
    "Quick approval process",
    "No prepayment penalties",
    "Works with major projects",
  ],
  cta: { label: "REQUEST FINANCING INFO", to: "/contact" },
};
