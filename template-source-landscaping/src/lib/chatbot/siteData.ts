/**
 * VOLTCURRENT ELECTRIC — content registry.
 *
 * All copy, lists, and CTA labels live here so the admin EditorPanel can
 * patch them, and the export server can bake the customised values into
 * the standalone ZIP. Keep the export NAMES stable; you can change values
 * freely.
 */

/** Unique plumber/trade Unsplash photos — each used only once in default content. */
const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/** Plumber-only Unsplash photos — do not reuse Roofix / roofing template IDs. */
export const LANDSCAPING_IMAGES = {
  heroPlumber: u("1621905252507-b35492cc74b4", 1920, 1080),
  workerPlumber: u("1621905251189-08b45d6a269e"),
  workerPlumber2: u("1621905251918-48416bd8575a"),
  panelUpgrade: u("1558618666-fcd25c85cd64"),
  oldWiring: u("1590365876016-da05ac533e83"),
  /** Wall-mounted Level 2 charger (go-e on exterior wall). */
  evCharger: u("1745995848032-1b63d2baa7b6"),
  /** EV plugged in at a home charger — before install / in-use shot. */
  evGarage: u("1760539120788-8529cccfea75"),
  evChargerBrick: u("1600490819734-6311c5c6f517"),
  backupPower: u("1682345262055-8f95f3c513ea"),
  contactHero: u("1635335874521-7987db781153", 1400, 900),
  aboutHero: u("1555963966-b7ae5404b6ed", 1400, 900),
  surgeProtection: u("1544724569-5f546fd6f2b5"),
  inspectionsService: u("1646640381839-02748ae8ddf0"),
  reviewsHero: u("1597502310092-31cdaa35b46d", 1400, 900),
  outdoorLighting: u("1473308822086-710304d7d30c"),
  troubleshootSection: u("1601462904263-f2fa0c851cb9", 900, 1100),
  blogHero: u("1601462904263-f2fa0c851cb9", 1400, 900),
  emergencyScene: u("1660330589693-99889d60181e"),
  commercialPlumbing: u("1600880292089-90a7e086ee0c"),
  smartHome: u("1558002038-1055907df827"),
  commercialSplit: u("1504307651254-35680f356dfd", 900, 1200),
  residentialSplit: u("1621905251189-08b45d6a269e", 900, 1200),
  routineInspection: u("1683295083329-4d4738291f3a"),
} as const;

export const COMPANY = {
  name: "VOLTCURRENT ELECTRIC",
  legalName: "VOLTCURRENT ELECTRIC LLC",
  tagline:
    "Premium plumbing contracting for Dallas–Fort Worth homes and businesses — master plumbers, code-perfect work, and power you can count on.",
  phone: "(214) 555-0142",
  email: "service@clearcurrentelectric.com",
  address: "4520 Industrial Blvd, Suite 200, Dallas, TX 75207",
  hours: "Mon - Fri: 7:00 AM - 6:00 PM · 24/7 Emergency Dispatch",
};

/** Top emergency bar above the header. */
export const SITE_TOP = {
  line: "24/7 Emergency Plumbing Service",
  badges: ["Licensed & Insured", "Master Plumbers", "Same-Day Service"],
  ratingValue: "4.9",
  ratingCount: "320+",
  ratingLabel: "Reviews",
  /** Kept for back-compat with the shared editor field. */
  locations: "Dallas · Plano · Frisco · Irving · Arlington",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM - 6:00 PM" },
  { days: "Saturday", hours: "8:00 AM - 2:00 PM" },
  { days: "Sunday", hours: "Emergency Dispatch Only" },
];

/** Embedded map for the contact page (Dallas metro). */
export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-97.05%2C32.65%2C-96.55%2C33.05&layer=mapnik&marker=32.7767,-96.7970";

/** Homepage hero — split layout with emergency CTA and plumber photography. */
export const HOME_HERO = {
  eyebrow: "DALLAS–FORT WORTH · MASTER ELECTRICIANS",
  headlineBefore: "Power You Can",
  headlineHighlight: "Trust.",
  headlineAfter: "Day or Night.",
  body:
    "From panel upgrades and EV chargers to emergency repairs and commercial fit-outs, VOLTCURRENT delivers charcoal-sharp craftsmanship, upfront pricing, and plumbers who treat your property like their own.",
  primaryCta: { label: "24/7 EMERGENCY SERVICE", to: "/services/emergency-plumbing" },
  secondaryCta: { label: "CALL NOW", to: "/contact" },
  image: LANDSCAPING_IMAGES.heroPlumber,
  trustPills: [
    { label: "Licensed & Insured", sub: "Texas Master Plumbers", icon: "ShieldCheck" as const },
    { label: "Same-Day Service", sub: "When You Need Power", icon: "Calendar" as const },
    { label: "Upfront Pricing", sub: "No Surprise Invoices", icon: "Tag" as const },
  ],
  ratingQuote:
    "They upgraded our panel, installed two EV chargers, and left the garage cleaner than they found it — honest crew, dark-uniform pros, zero drama.",
  ratingCard: {
    score: "4.9",
    countLabel: "Based on 320+ Google Reviews",
    avatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    ],
  },
  featuredEyebrow: "TRUSTED ACROSS DFW",
  featuredTitle: "Premium Plumbing Contractor",
  featuredMeta: "Dallas · Plano · Frisco · Irving · Arlington",
};

/** Homepage featured services grid (5 cards). */
export const SERVICES_RIBBON = [
  {
    id: "emergency-plumbing",
    label: "EMERGENCY SERVICE",
    icon: "Flame" as const,
    description: "24/7 dispatch for outages, burning smells, sparking panels, and storm damage.",
    to: "/services/emergency-plumbing",
  },
  {
    id: "panel-upgrades",
    label: "PANEL UPGRADES",
    icon: "Wrench" as const,
    description: "200-amp upgrades, sub-panels, and arc-fault protection for modern loads.",
    to: "/services/panel-upgrades",
  },
  {
    id: "residential-plumbing",
    label: "RESIDENTIAL",
    icon: "Home" as const,
    description: "Whole-home wiring, remodels, outlets, and lighting done to NEC code.",
    to: "/services/residential-plumbing",
  },
  {
    id: "ev-charger",
    label: "EV CHARGERS",
    icon: "Zap" as const,
    description: "Level 2 installs, dedicated circuits, and load calculations for your garage.",
    to: "/services/ev-charger",
  },
  {
    id: "commercial-plumbing",
    label: "COMMERCIAL",
    icon: "Hammer" as const,
    description: "Tenant improvements, retail, and industrial plumbing built for uptime.",
    to: "/services/commercial-plumbing",
  },
];

/** Why Choose Us mini-cards (used on About). */
export const CAPABILITIES = [
  {
    id: "master-plumbers",
    title: "Master Plumbers",
    description: "Texas-licensed masters on every job — not apprentices running the show.",
    icon: "Building2" as const,
    to: "/about",
  },
  {
    id: "code-perfect",
    title: "Code-Perfect Work",
    description: "NEC-compliant installs, permits pulled, and inspections passed the first time.",
    icon: "DraftingCompass" as const,
    to: "/about",
  },
  {
    id: "same-day",
    title: "Same-Day Service",
    description: "Most service calls scheduled same-day across the Dallas metro.",
    icon: "Wrench" as const,
    to: "/contact",
  },
  {
    id: "upfront-pricing",
    title: "Upfront Pricing",
    description: "Written estimates before we roll a truck — no hidden fees, no pressure.",
    icon: "Home" as const,
    to: "/contact",
  },
];

/** 5-step service process used on service detail pages. */
export const PROCESS_STEPS = [
  { id: "call", label: "Call or Request Online", description: "Tell us what's happening — we'll triage urgency and schedule fast." },
  { id: "diagnose", label: "On-Site Diagnosis", description: "A master plumber tests, photos, and explains options in plain English." },
  { id: "estimate", label: "Written Estimate", description: "Flat-rate or line-item pricing before work begins — your approval required." },
  { id: "install", label: "Expert Install", description: "Code-compliant work, clean job sites, and premium materials only." },
  { id: "inspect", label: "Test & Inspect", description: "We verify load, GFCI/AFCI protection, and label every panel clearly." },
];

export const HOME_STATS = [
  { value: "18+", label: "Years Experience", icon: "Award" as const },
  { value: "4,200+", label: "Jobs Completed", icon: "Home" as const },
  { value: "24/7", label: "Emergency Dispatch", icon: "ShieldCheck" as const },
  { value: "A+", label: "BBB Rating", icon: "Tag" as const },
];

/** Why Homeowners Choose Us — small benefits list with icons. */
export const WHY_BENEFITS = [
  {
    title: "DFW Local & Family Owned",
    description: "Born in Dallas — we know North Texas homes, heat loads, and inspector expectations.",
    icon: "Home" as const,
  },
  {
    title: "Licensed, Bonded & Insured",
    description: "Full liability and workers' comp — certificates provided before we start.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Master-Level Craftsmanship",
    description: "Neat conduit, labeled panels, and work that passes inspection without callbacks.",
    icon: "Award" as const,
  },
  {
    title: "Honest, Upfront Pricing",
    description: "Charcoal-clear estimates — you approve every dollar before we energize.",
    icon: "Tag" as const,
  },
];

/** Full service catalog. Powers /services and /services/[id]. */
export const SERVICES = [
  {
    id: "emergency-plumbing",
    title: "Emergency Plumbing",
    icon: "Flame",
    description: "24/7 response for power loss, burning smells, sparking breakers, and storm damage.",
    image: LANDSCAPING_IMAGES.heroPlumber,
  },
  {
    id: "panel-upgrades",
    title: "Panel Upgrades",
    icon: "Wrench",
    description: "200-amp service upgrades, sub-panels, and modern AFCI/GFCI protection.",
    image: LANDSCAPING_IMAGES.panelUpgrade,
  },
  {
    id: "residential-plumbing",
    title: "Residential Plumbing",
    icon: "Home",
    description: "Whole-home wiring, remodels, outlets, switches, and lighting for Dallas homeowners.",
    image: LANDSCAPING_IMAGES.workerPlumber,
  },
  {
    id: "ev-charger",
    title: "EV Charger Installation",
    icon: "Zap",
    description: "Level 2 home and commercial chargers with dedicated circuits and permits.",
    image: LANDSCAPING_IMAGES.evCharger,
  },
  {
    id: "commercial-plumbing",
    title: "Commercial Plumbing",
    icon: "Hammer",
    description: "Tenant improvements, retail, office, and industrial plumbing built for uptime.",
    image: LANDSCAPING_IMAGES.commercialPlumbing,
  },
];

/** Featured projects — one per core service, images match the work shown. */
export const BEFORE_AFTER_PROJECTS = [
  {
    id: "dallas-panel-upgrade",
    title: "200-Amp Panel Upgrade",
    location: "Dallas, TX",
    category: "Panel Upgrades",
    serviceId: "panel-upgrades",
    beforeImage: LANDSCAPING_IMAGES.oldWiring,
    afterImage: LANDSCAPING_IMAGES.panelUpgrade,
  },
  {
    id: "plano-ev-charger",
    title: "Level 2 EV Charger Install",
    location: "Plano, TX",
    category: "EV Charging",
    serviceId: "ev-charger",
    beforeImage: LANDSCAPING_IMAGES.evGarage,
    afterImage: LANDSCAPING_IMAGES.evCharger,
  },
  {
    id: "frisco-residential-rewire",
    title: "Whole-Home Rewire",
    location: "Frisco, TX",
    category: "Residential",
    serviceId: "residential-plumbing",
    beforeImage: LANDSCAPING_IMAGES.oldWiring,
    afterImage: LANDSCAPING_IMAGES.workerPlumber,
  },
  {
    id: "irving-commercial-fitout",
    title: "Restaurant Plumbing Fit-Out",
    location: "Irving, TX",
    category: "Commercial",
    serviceId: "commercial-plumbing",
    beforeImage: LANDSCAPING_IMAGES.commercialSplit,
    afterImage: LANDSCAPING_IMAGES.commercialPlumbing,
  },
  {
    id: "arlington-emergency-restore",
    title: "Storm Damage Panel Restore",
    location: "Arlington, TX",
    category: "Emergency",
    serviceId: "emergency-plumbing",
    beforeImage: LANDSCAPING_IMAGES.emergencyScene,
    afterImage: LANDSCAPING_IMAGES.workerPlumber2,
  },
];

/** Projects list for project detail page and listings. */
export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  serviceId: p.serviceId,
  location: p.location,
  year: "2024",
  client: p.category === "Commercial" ? "Commercial Client" : "Private Homeowner",
  value: "—",
  description: `${p.title} for our ${p.category.toLowerCase()} team in ${p.location}. NEC-compliant work, labeled panels, and a clean job site from start to finish.`,
  image: p.afterImage,
  gallery: [p.beforeImage, p.afterImage],
  beforeImage: p.beforeImage,
  afterImage: p.afterImage,
  number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 5;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  {
    id: "marcus-reed",
    name: "Marcus Reed",
    role: "Founder & Master Plumber",
    bio: "Marcus founded VOLTCURRENT with one rule: every panel labeled, every connection torqued, every homeowner respected.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=85",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "elena-vargas",
    name: "Elena Vargas",
    role: "Operations Director",
    bio: "Elena keeps DFW crews routed, stocked, and on time — so your appointment window means something.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=85",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "derek-holloway",
    name: "Derek Holloway",
    role: "Lead Commercial Plumber",
    bio: "Derek runs tenant improvements and industrial jobs with zero downtime tolerance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=85",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "EV & Smart Home Specialist",
    bio: "Priya designs load calculations and installs Level 2 chargers and Lutron systems across North Texas.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=85",
    social: { linkedin: "#", twitter: "#" },
  },
];

export const TESTIMONIALS = [
  {
    name: "Jennifer K.",
    role: "Dallas, TX",
    quote:
      "VOLTCURRENT upgraded our 100-amp panel to 200 amps and installed a Tesla charger — professional, fast, and the panel looks showroom clean.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=85",
    rating: 5,
  },
  {
    name: "Robert H.",
    role: "Plano, TX",
    quote:
      "Power went out at 11 PM — they had a master plumber at our door in under two hours. Lifesavers.",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=120&h=120&q=85",
    rating: 5,
  },
  {
    name: "Angela M.",
    role: "Frisco, TX",
    quote:
      "Fair estimate, no upsells, and they passed city inspection on the first visit. Our whole-home rewire was stress-free.",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&h=120&q=85",
    rating: 5,
  },
  {
    name: "Chris T.",
    role: "Irving, TX",
    quote:
      "Commercial kitchen build-out — they coordinated with our GC and never held up the opening. Highly recommend for business owners.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=85",
    rating: 5,
  },
  {
    name: "Diana L.",
    role: "Arlington, TX",
    quote:
      "Outdoor lighting transformed our backyard. Subtle, warm, and every fixture aimed perfectly. Worth every penny.",
    avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=120&h=120&q=85",
    rating: 5,
  },
  {
    name: "Michael S.",
    role: "McKinney, TX",
    quote:
      "They found aluminum wiring our home inspector missed and brought everything up to code. Honest, thorough, and patient with our questions.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=85",
    rating: 5,
  },
];

export const BLOG_POSTS = [
  {
    id: "when-to-upgrade-plumbing-panel",
    title: "When to Upgrade Your Plumbing Panel in Texas",
    excerpt: "Signs your 100-amp panel is struggling — and what a 200-amp upgrade actually involves.",
    date: "March 18, 2024",
    author: "Marcus Reed",
    category: "Panels",
    image: LANDSCAPING_IMAGES.panelUpgrade,
    content:
      "Flickering lights when the AC kicks on, warm breakers, or a panel full of tandem breakers are red flags. In DFW's heat, modern homes need headroom for EV chargers, pool equipment, and smart loads. A licensed master plumber can load-calc your home and recommend a 200-amp upgrade with AFCI protection — usually completed in one day with city inspection included.",
  },
  {
    id: "ev-charger-home-guide",
    title: "Home EV Charger Installation: What Dallas Homeowners Should Know",
    excerpt: "Level 1 vs Level 2, dedicated circuits, permits, and rebates explained.",
    date: "February 28, 2024",
    author: "Priya Nair",
    category: "EV Charging",
    image: LANDSCAPING_IMAGES.evGarage,
    content:
      "A Level 2 charger on a 240V dedicated circuit can add 25+ miles of range per hour — but your panel must support the load. We handle load calculations, permit pulls, and manufacturer-approved installs for Tesla, ChargePoint, JuiceBox, and more. Ask about utility rebates available in Oncor territory.",
  },
  {
    id: "whole-home-surge-protection",
    title: "Why Whole-Home Surge Protection Matters in North Texas",
    excerpt: "Lightning, grid spikes, and HVAC cycling — how to protect your electronics.",
    date: "January 22, 2024",
    author: "Derek Holloway",
    category: "Safety",
    image: LANDSCAPING_IMAGES.surgeProtection,
    content:
      "Point-of-use strips aren't enough when a storm hits the grid. A Type 1 or Type 2 whole-home surge protector at the panel shields HVAC boards, appliances, and smart home gear. Installation takes a few hours and pays for itself the first time it blocks a spike.",
  },
  {
    id: "aluminum-wiring-risks",
    title: "Aluminum Wiring in Older Dallas Homes: Risks & Remediation",
    excerpt: "What to look for, when to rewire, and safer interim fixes.",
    date: "December 8, 2023",
    author: "Marcus Reed",
    category: "Safety",
    image: LANDSCAPING_IMAGES.oldWiring,
    content:
      "Homes built between 1965 and 1973 may have aluminum branch circuits. Loose connections at outlets and switches create fire risk. COPALUM or AlumiConn pigtailing can be a bridge solution, but many insurers prefer full copper remediation — we provide honest assessments, not scare tactics.",
  },
  {
    id: "generator-vs-battery-backup",
    title: "Standby Generator vs Battery Backup: Which Is Right for DFW?",
    excerpt: "Compare cost, runtime, fuel, and what each can power during an outage.",
    date: "November 14, 2023",
    author: "Derek Holloway",
    category: "Backup Power",
    image: LANDSCAPING_IMAGES.backupPower,
    content:
      "Generators run indefinitely on natural gas or propane — ideal for extended outages. Battery systems are quieter and maintenance-free but have limited capacity. We install both with automatic transfer switches sized to your critical loads.",
  },
  {
    id: "smart-home-wiring-basics",
    title: "Smart Home Wiring Basics Before You Buy Devices",
    excerpt: "Neutral wires, hub placement, and why your Wi-Fi isn't the only bottleneck.",
    date: "October 3, 2023",
    author: "Priya Nair",
    category: "Smart Home",
    image: LANDSCAPING_IMAGES.smartHome,
    content:
      "Most smart switches need a neutral in the box — older Dallas homes often don't have one. Plan circuits and panel space before stacking dozens of devices. We pre-wire for Lutron, Control4, and Matter-ready installs so you're not fishing walls later.",
  },
];

export const STATS = [
  { value: 4200, label: "Jobs Completed", suffix: "+" },
  { value: 18, label: "Years Experience", suffix: "+" },
  { value: 320, label: "5-Star Reviews", suffix: "+" },
  { value: 100, label: "Code Compliance", suffix: "%" },
];

export const FAQ_ITEMS = [
  {
    question: "How quickly can you respond to an plumbing emergency?",
    answer:
      "We offer 24/7 emergency dispatch across the Dallas metro. Most urgent calls receive a master plumber within 2–4 hours, depending on location and storm volume.",
  },
  {
    question: "Do you provide free estimates?",
    answer:
      "Yes — service and project estimates are free and include a written scope. Emergency diagnostic fees apply but are credited toward repair when you proceed with VOLTCURRENT.",
  },
  {
    question: "Are you licensed and insured in Texas?",
    answer:
      "Absolutely. VOLTCURRENT holds a Texas plumbing contractor license, full general liability, and workers' compensation. Certificates available on request before work begins.",
  },
  {
    question: "Do you pull permits and schedule inspections?",
    answer:
      "Yes. Panel upgrades, service changes, EV chargers, and commercial work include permit coordination and inspection scheduling — it's built into our process.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, checks, ACH, and offer financing through approved lenders for qualified projects over $2,500.",
  },
  {
    question: "Can you install EV chargers on older panels?",
    answer:
      "Often yes — after a load calculation. If your panel lacks capacity, we'll recommend a sub-panel or service upgrade so your charger runs safely without nuisance trips.",
  },
  {
    question: "Do you offer warranties on workmanship?",
    answer:
      "Yes. We stand behind our labor with a written workmanship warranty, and pass through manufacturer warranties on panels, breakers, generators, and chargers.",
  },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Emergency Service", path: "/services/emergency-plumbing" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Reviews", path: "/reviews" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Emergency Service", to: "/services/emergency-plumbing" },
  { label: "Panel Upgrades", to: "/services/panel-upgrades" },
  { label: "Residential Plumbing", to: "/services/residential-plumbing" },
  { label: "EV Charger Installation", to: "/services/ev-charger" },
  { label: "Commercial Plumbing", to: "/services/commercial-plumbing" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact Us", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Dallas, TX",
  "Plano, TX",
  "Frisco, TX",
  "Irving, TX",
  "Arlington, TX",
  "McKinney, TX",
  "Garland, TX",
  "Richardson, TX",
  "Fort Worth, TX",
  "Carrollton, TX",
];

/** Pages: blog list page size + tags. */
export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["PANELS", "EV CHARGING", "SAFETY", "BACKUP POWER", "SMART HOME", "TIPS"];

export const PROJECTS_PAGE_STATS = [
  { value: "4,200+", label: "Jobs Completed" },
  { value: "98%", label: "On-Time Completion" },
  { value: "5 Yr", label: "Workmanship Warranty" },
  { value: "A+", label: "BBB Rating" },
];

export const ABOUT_STATS = [
  { value: "18+", label: "Years Experience" },
  { value: "4,200+", label: "Jobs Completed" },
  { value: "5 Yr", label: "Workmanship Warranty" },
  { value: "A+", label: "BBB Rating" },
  { value: "320+", label: "5-Star Reviews" },
];

export const CORE_VALUES = [
  {
    id: "safety",
    title: "Safety without compromise",
    description: "Lockout/tagout, arc-flash awareness, and NEC compliance on every circuit we touch.",
    icon: "ShieldCheck" as const,
  },
  {
    id: "craft",
    title: "Craftsmanship you can see",
    description: "Labeled panels, neat bends, and torque specs documented — dark-uniform pros, clean sites.",
    icon: "Award" as const,
  },
  {
    id: "honesty",
    title: "Honesty in every estimate",
    description: "We recommend what you need, not what pads the invoice. Charcoal-clear pricing, always.",
    icon: "Eye" as const,
  },
  {
    id: "reliability",
    title: "Reliability when the power's out",
    description: "24/7 dispatch, stocked trucks, and masters who show up — not excuses.",
    icon: "Handshake" as const,
  },
  {
    id: "community",
    title: "Rooted in DFW",
    description: "We hire local, sponsor trade programs, and power the neighborhoods we live in.",
    icon: "Heart" as const,
  },
  {
    id: "growth",
    title: "Continuous improvement",
    description: "Ongoing NEC training, new tool investments, and smarter installs every year.",
    icon: "Users" as const,
  },
];

export const CERTIFICATIONS = [
  { id: "texas-master", label: "Texas Master Plumber", sub: "State-licensed contracting" },
  { id: "nec", label: "NEC Compliant", sub: "2023 National Plumbing Code" },
  { id: "osha", label: "OSHA 30-Hour", sub: "Jobsite safety certified" },
  { id: "bbb", label: "BBB Accredited", sub: "A+ Business Rating" },
  { id: "generac", label: "Generac Authorized", sub: "Standby generator installer" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, "0"),
}));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "emergency", label: "EMERGENCY" },
  { id: "process", label: "PROCESS" },
  { id: "warranty", label: "WARRANTY" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: [
    {
      question: "What areas do you serve?",
      answer:
        "We serve the full Dallas–Fort Worth metro including Dallas, Plano, Frisco, Irving, Arlington, McKinney, and surrounding cities.",
    },
    {
      question: "Do you provide free estimates?",
      answer:
        "Yes — project and service estimates are free with a written scope. Emergency diagnostics may carry a fee credited toward repair.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "VOLTCURRENT is fully licensed, bonded, and insured in Texas. We provide certificates of insurance before starting work.",
    },
  ],
  emergency: [
    {
      question: "What counts as an plumbing emergency?",
      answer:
        "Complete power loss, burning smells, sparking outlets, buzzing panels, exposed wires, or storm damage affecting your service entrance.",
    },
    {
      question: "How fast can you get here?",
      answer:
        "Most DFW emergency calls receive a master plumber within 2–4 hours, 24/7/365. During major storms, we prioritize life-safety issues first.",
    },
    {
      question: "Should I turn off my main breaker?",
      answer:
        "If you smell burning, see smoke, or hear arcing — yes, shut off the main if safe to do so and call us immediately. Never touch a wet panel.",
    },
  ],
  process: [
    {
      question: "How long does a panel upgrade take?",
      answer:
        "Most residential 200-amp upgrades are completed in one day with utility coordination and city inspection scheduled within the week.",
    },
    {
      question: "Do you pull permits?",
      answer:
        "Yes — permits and inspections are included on panel upgrades, service changes, EV chargers, generators, and commercial work.",
    },
    {
      question: "Will you leave my home clean?",
      answer:
        "Absolutely. Boot covers, floor protection, and a full debris sweep are standard on every residential job.",
    },
  ],
  warranty: [
    {
      question: "What warranty do you offer?",
      answer:
        "We provide a 5-year workmanship warranty on qualifying installs plus manufacturer warranties on equipment we supply.",
    },
    {
      question: "Is the warranty transferable?",
      answer:
        "Yes — the workmanship warranty transfers once to a new homeowner with documentation from our office.",
    },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Five core plumbing services for Dallas–Fort Worth — 24/7 emergency response, panel upgrades, residential wiring, EV charger installs, and commercial fit-outs. Master plumbers, code-perfect work, upfront pricing.";

/** Emergency / specialty scenarios — used on service detail layouts. */
export const COMMERCIAL_FITOUT_CARDS = [
  {
    id: "power-outage",
    title: "Power Outage",
    description: "No lights, dead outlets, or partial loss — we restore power safely and fast.",
    icon: "Cloud" as const,
  },
  {
    id: "storm-damage",
    title: "Storm Damage",
    description: "Lightning strikes, fallen lines, and surge damage to panels and equipment.",
    icon: "CloudLightning" as const,
  },
  {
    id: "overloaded-circuit",
    title: "Overloaded Circuits",
    description: "Tripping breakers, warm outlets, and circuits that can't handle modern loads.",
    icon: "Wind" as const,
  },
  {
    id: "burning-smell",
    title: "Burning Smell",
    description: "Acrid odors from panels, outlets, or appliances — shut off power and call immediately.",
    icon: "Droplets" as const,
  },
  {
    id: "sparking",
    title: "Sparking Outlets",
    description: "Visible arcing or buzzing — often a loose connection or failing device.",
    icon: "TreePine" as const,
  },
  {
    id: "flood-damage",
    title: "Flood & Water Damage",
    description: "Water near panels or outlets requires professional assessment before re-energizing.",
    icon: "Snowflake" as const,
  },
];

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
    id: "emergency-plumbing",
    category: "EMERGENCY",
    title: "Emergency Plumbing Service",
    subtitle: "24/7 DISPATCH · MASTER ELECTRICIANS",
    body: [
      "When the power's out or something smells wrong, you need a licensed master — not a handyman with a voltage tester. VOLTCURRENT rolls stocked trucks across DFW with the gear to isolate faults, make safe repairs, and restore power.",
      "We document everything for insurance when storms are involved and never leave a hazardous condition energized overnight.",
    ],
    image: LANDSCAPING_IMAGES.emergencyScene,
    inclusions: [
      "24/7 phone dispatch",
      "Same-night emergency response",
      "Fault isolation & repair",
      "Temporary power solutions",
      "Storm damage documentation",
      "Insurance-ready photo reports",
    ],
  },
  {
    id: "panel-upgrades",
    category: "RESIDENTIAL",
    title: "Panel Upgrades & Service Changes",
    subtitle: "100A → 200A · MOST JOBS COMPLETE IN ONE DAY",
    body: [
      "Older Dallas homes often run on 100-amp panels that can't support EV chargers, tankless water heaters, and modern HVAC. We upgrade to 200-amp service with new breakers, grounding, and labeling that inspectors love.",
      "Every upgrade includes load calculations, permit pulls, utility coordination, and a final walkthrough with you at the panel.",
    ],
    image: LANDSCAPING_IMAGES.panelUpgrade,
    inclusions: [
      "Load calculation & scope",
      "200-amp panel & breakers",
      "Grounding & bonding upgrade",
      "Permit & inspection",
      "Utility meter coordination",
      "Labeled, photo-documented panel",
    ],
  },
  {
    id: "ev-charger",
    category: "EV CHARGING",
    title: "EV Charger Installation",
    subtitle: "LEVEL 2 · TESLA · CHARGEPOINT · JUICEBOX",
    body: [
      "A proper Level 2 install isn't just running wire — it's load calcs, dedicated circuits, GFCI where required, and permits. We install wall connectors in garages, carports, and commercial lots with clean conduit and manufacturer specs.",
      "Ask about 240V outlet options if you want flexibility between portable and hardwired chargers.",
    ],
    image: LANDSCAPING_IMAGES.evCharger,
    inclusions: [
      "Site survey & load calc",
      "Dedicated 240V circuit",
      "Hardwired or NEMA 14-50",
      "Permit & inspection",
      "Manufacturer-approved mount",
      "Rebate paperwork assistance",
    ],
  },
  {
    id: "commercial-plumbing",
    category: "COMMERCIAL",
    title: "Commercial Plumbing",
    subtitle: "RETAIL · OFFICE · RESTAURANT · INDUSTRIAL",
    body: [
      "Downtime costs money. We phase commercial work around your hours, coordinate with GCs, and deliver code-compliant power distribution, lighting, and equipment circuits on aggressive schedules.",
      "From tenant improvements to three-phase service, VOLTCURRENT is the contractor property managers call back.",
    ],
    image: LANDSCAPING_IMAGES.commercialPlumbing,
    inclusions: [
      "Design-build coordination",
      "Three-phase distribution",
      "Lighting & controls",
      "Equipment circuits",
      "After-hours scheduling",
      "As-built documentation",
    ],
  },
  {
    id: "residential-plumbing",
    category: "RESIDENTIAL",
    title: "Residential Plumbing",
    subtitle: "WIRING · REMODELS · LIGHTING · REPAIRS",
    body: [
      "From kitchen remodels to whole-home rewires, our residential crews deliver neat work that passes inspection the first time. We handle outlets, switches, recessed lighting, sub-panels, and aluminum remediation with honest scopes — no scare tactics.",
      "Every job includes labeled panels, GFCI/AFCI protection where required, and a magnetic sweep before we leave your driveway.",
    ],
    image: LANDSCAPING_IMAGES.workerPlumber,
    inclusions: [
      "Whole-home & room rewires",
      "Outlet & switch upgrades",
      "Recessed & pendant lighting",
      "Sub-panel installs",
      "Code corrections & repairs",
      "Permit & inspection coordination",
    ],
  },
];

export const LEAD_FORM = {
  title: "Get Your Free Plumbing Estimate",
  description: "No obligation. Master plumber review within one business day.",
  bullets: [
    "Free on-site or virtual estimate",
    "Upfront, honest pricing",
    "Same-day service available",
    "Licensed Texas master plumbers",
  ],
};

/** Emergency page — what to do when power fails. */
export const STORM_CHECKLIST = [
  { id: "safety", title: "Ensure Safety First", description: "Stay away from downed lines, standing water near panels, and sparking equipment." },
  { id: "breaker", title: "Shut Off Main Breaker", description: "If safe, turn off the main breaker to prevent further damage until we arrive." },
  { id: "call", title: "Call VOLTCURRENT Electric", description: "24/7 dispatch — we'll triage urgency and send a master plumber." },
  { id: "document", title: "Document the Damage", description: "Photos of the panel, outlets, and any visible damage help with insurance claims." },
];

/** Plumbing inspections page — benefits cards. */
export const INSPECTION_BENEFITS = [
  { id: "prevent", title: "Prevent Fire & Shock Hazards", description: "Catch loose connections, overheating breakers, and outdated wiring before they fail.", icon: "ShieldCheck" as const },
  { id: "code", title: "Code Compliance", description: "Know your home meets NEC standards — critical for insurance and resale.", icon: "Clock" as const },
  { id: "insurance", title: "Insurance Requirements", description: "Many carriers require inspections after claims or when insuring older homes.", icon: "Home" as const },
  { id: "value", title: "Protect Home Value", description: "A clean inspection report builds buyer confidence and speeds closings.", icon: "DollarSign" as const },
  { id: "peace", title: "Peace of Mind", description: "Detailed photo reports with clear recommendations — no jargon, no scare tactics.", icon: "FileCheck" as const },
];

/** Plumbing inspections page — types of inspection cards. */
export const INSPECTION_TYPES = [
  {
    id: "routine",
    title: "Routine Safety Inspections",
    description: "Recommended every 3–5 years for older homes to verify panel condition, grounding, and device integrity.",
    image: LANDSCAPING_IMAGES.routineInspection,
  },
  {
    id: "pre-purchase",
    title: "Pre-Purchase Inspections",
    description: "Know what you're buying. We inspect panels, wiring, outlets, and GFCI protection for buyers and agents.",
    image: LANDSCAPING_IMAGES.inspectionsService,
  },
  {
    id: "insurance",
    title: "Insurance & Claim Inspections",
    description: "Post-storm or claim-related assessments with documentation for adjusters and carriers.",
    image: LANDSCAPING_IMAGES.emergencyScene,
  },
  {
    id: "commercial",
    title: "Commercial Plumbing Inspections",
    description: "Comprehensive inspections for retail, office, and industrial properties to maintain uptime and compliance.",
    image: LANDSCAPING_IMAGES.commercialPlumbing,
  },
];

/** Plumbing inspections page — what we inspect checklist. */
export const INSPECTION_CHECKLIST = [
  "Main panel & sub-panels (breakers, bus bars, labeling)",
  "Service entrance & grounding electrode system",
  "GFCI & AFCI protection where required",
  "Outlets, switches, and visible wiring condition",
  "Smoke/CO detector circuits (where applicable)",
  "EV charger & dedicated appliance circuits",
  "Signs of overheating, corrosion, or aluminum wiring",
];

/** Contact page bottom strip badges. */
export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "Texas master plumbers with full liability coverage.", icon: "ShieldCheck" as const },
  { id: "quality", title: "Code-Perfect Work", description: "NEC-compliant installs that pass inspection the first time.", icon: "Award" as const },
  { id: "expert", title: "Master Plumbers", description: "Experienced crews — not handymen with extension cords.", icon: "Users" as const },
  { id: "available", title: "24/7 Emergency", description: "Dispatch when you need power restored — day or night.", icon: "Clock" as const },
];

/** About page hero badges. */
export const ABOUT_HERO_BADGES = [
  { id: "local", title: "DFW Local & Family Owned", icon: "Home" as const },
  { id: "licensed", title: "Licensed Master Plumbers", icon: "ShieldCheck" as const },
  { id: "quality", title: "Code-Perfect Craftsmanship", icon: "Award" as const },
  { id: "honest", title: "Upfront, Honest Pricing", icon: "Tag" as const },
];
