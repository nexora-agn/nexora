#!/usr/bin/env python3
"""Generate MINHS Automotive siteData.ts from template."""

from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src/template-minhs/data/siteData.ts"

u = lambda id, w=600, h=400: (
    f'https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={w}&h={h}&q=85'
)

content = '''/**
 * MINHS AUTOMOTIVE — content registry.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const MINHS_IMAGES = {
  heroLuxury: u("1492144534655-ae79c964c9d7", 1920, 1080),
  serviceBay: u("1723099971299-3789db53604c", 1400, 900),
  technician: u("1643700973089-baa86a1ab9ee", 900, 1100),
  technician2: u("1687462970787-61d953508926", 1400, 900),
  diagnostic: u("1771340012319-0b4fca008b54", 900, 900),
  workshopTools: u("1530124566582-a618bc2615dc", 900, 700),
  bmwDetail: u("1555215695-3004980ad54e", 900, 600),
  mercedesDetail: u("1618843479313-40f8afb4b4d8", 900, 600),
  porscheDetail: u("1549317661-bd32c8ce0db2", 900, 600),
  shopFloor: u("1596986952526-3be237187071", 1400, 900),
  warrantyHero: u("1486006920555-c77dcf18193c", 1600, 700),
  contactHero: u("1727893119356-1702fe921cf9", 1400, 900),
  aboutHero: u("1675034743372-672c3c3f8377", 1400, 900),
  reviewsHero: u("1643700973089-baa86a1ab9ee", 1400, 900),
  blogHero: u("1486262715619-67b85e0b08d3", 1400, 900),
  troubleshootSection: u("1771340012319-0b4fca008b54", 1200, 800),
  serviceAreasHero: u("1727893294198-e85137574f5b", 1400, 900),
  emergencyScene: u("1723099971299-3789db53604c", 1400, 900),
  residentialSplit: u("1492144534655-ae79c964c9d7", 900, 700),
  commercialSplit: u("1727893119356-1702fe921cf9", 900, 700),
  brakeService: u("1593699199342-59b40e08f0ac", 800, 600),
  oilChange: u("1487754180451-c456f719a1fc", 800, 600),
  transmission: u("1486262715619-67b85e0b08d3", 800, 600),
  engineDiag: u("1771340012319-0b4fca008b54", 800, 600),
  suspension: u("1645445522156-9ac06bc7a767", 800, 600),
  gallery1: u("1492144534655-ae79c964c9d7", 800, 600),
  gallery2: u("1555215695-3004980ad54e", 800, 600),
  gallery3: u("1618843479313-40f8afb4b4d8", 800, 600),
  gallery4: u("1643700973089-baa86a1ab9ee", 800, 600),
  gallery5: u("1675034743126-0f250a5fee51", 800, 600),
  smartHome: u("1530124566582-a618bc2615dc", 600, 400),
  panelUpgrade: u("1727893294198-e85137574f5b", 1400, 900),
} as const;

export const COMPANY = {
  name: "MINHS Automotive",
  legalName: "MINHS Automotive Inc.",
  tagline:
    "Brooklyn's premier European auto repair shop — dealer-level expertise without dealer-level prices.",
  phone: "(718) 832-3096",
  email: "info@minhsautocare.com",
  address: "578 3rd Ave, Brooklyn, NY 11215",
  hours: "Mon - Fri: 8:00 AM - 5:30 PM · Sat: By Appointment",
};

export const SITE_TOP = {
  line: "#1 Dealer Alternative · European Vehicle Specialists",
  badges: ["ASE Certified", "Family Owned", "5 Year Warranty"],
  ratingValue: "4.9",
  ratingCount: "500+",
  ratingLabel: "Reviews",
  locations: "Brooklyn · Park Slope · Gowanus · Carroll Gardens",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "8:00 AM - 5:30 PM" },
  { days: "Saturday", hours: "By Appointment" },
  { days: "Sunday", hours: "Closed" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.66%2C-73.95%2C40.69&layer=mapnik&marker=40.6682,-73.9895";

export const HOME_HERO = {
  eyebrow: "BROOKLYN · EUROPEAN AUTO SPECIALISTS",
  headlineBefore: "Brooklyn's Premier",
  headlineHighlight: "European Auto Repair",
  headlineAfter: "Shop",
  body:
    "Dealer-level expertise without dealer-level prices. Factory-trained technicians, transparent communication, and a 5 year / 50,000 mile nationwide warranty on qualifying work.",
  primaryCta: { label: "Schedule Appointment", to: "/contact" },
  secondaryCta: { label: "Call Now", to: "tel:+17188323096" },
  image: MINHS_IMAGES.heroLuxury,
  trustPills: [
    { label: "ASE Certified", sub: "Master Technicians", icon: "ShieldCheck" as const },
    { label: "Dealer Alternative", sub: "#1 in Brooklyn", icon: "Award" as const },
    { label: "5 Year Warranty", sub: "50,000 Mile Coverage", icon: "Tag" as const },
  ],
  ratingQuote:
    "Nick treats my BMW like his own — honest, knowledgeable, and never steers me wrong. These are my mechanics for life.",
  ratingCard: {
    score: "4.9",
    countLabel: "Based on 500+ Customer Reviews",
    avatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    ],
  },
  featuredEyebrow: "PASSION FOR EXCELLENCE",
  featuredTitle: "European Luxury Specialists",
  featuredMeta: "BMW · Mercedes · Audi · Porsche · Land Rover",
};

export const TRUST_BAR_ITEMS = [
  { label: "ASE Certified Technicians", icon: "ShieldCheck" as const },
  { label: "Dealer Alternative", icon: "Award" as const },
  { label: "Family Owned", icon: "Heart" as const },
  { label: "5 Year / 50,000 Mile Warranty", icon: "Tag" as const },
  { label: "European Vehicle Specialists", icon: "Wrench" as const },
];

export const VEHICLE_BRANDS = [
  { id: "bmw", name: "BMW", tagline: "Factory-scheduled care" },
  { id: "audi", name: "Audi", tagline: "Quattro expertise" },
  { id: "mercedes", name: "Mercedes-Benz", tagline: "Star-level service" },
  { id: "volkswagen", name: "Volkswagen", tagline: "German precision" },
  { id: "porsche", name: "Porsche", tagline: "Performance focused" },
  { id: "jaguar", name: "Jaguar", tagline: "British luxury" },
  { id: "land-rover", name: "Land Rover", tagline: "4x4 specialists" },
  { id: "volvo", name: "Volvo", tagline: "Safety-first repairs" },
  { id: "mini", name: "MINI", tagline: "Cooper specialists" },
];

export const SERVICES_RIBBON = [
  { id: "oil-changes", label: "OIL CHANGES", icon: "Droplets" as const, description: "Premium oils and filters for European engines.", to: "/services/oil-changes" },
  { id: "brake-repair", label: "BRAKE REPAIR", icon: "CircleDot" as const, description: "Pads, rotors, and fluid service to OEM standards.", to: "/services/brake-repair" },
  { id: "transmission", label: "TRANSMISSION", icon: "Cog" as const, description: "Fluid service, diagnostics, and rebuild coordination.", to: "/services/transmission-service" },
  { id: "engine-diagnostics", label: "ENGINE DIAGNOSTICS", icon: "Cpu" as const, description: "Factory-level scan tools and root-cause analysis.", to: "/services/engine-diagnostics" },
  { id: "preventive-maintenance", label: "PREVENTIVE MAINTENANCE", icon: "Calendar" as const, description: "Factory schedules that protect your investment.", to: "/services/preventive-maintenance" },
];

export const CAPABILITIES = [
  { id: "family-owned", title: "Family Owned Business", description: "Over 25 years serving Brooklyn with personal accountability.", icon: "Heart" as const, to: "/about" },
  { id: "factory-trained", title: "Factory Trained Technicians", description: "ASE Master Technicians who know European systems inside out.", icon: "Award" as const, to: "/about" },
  { id: "transparent", title: "Transparent Communication", description: "Clear estimates, honest recommendations, no surprise invoices.", icon: "Eye" as const, to: "/contact" },
  { id: "warranty", title: "Warranty Protection", description: "5 years / 50,000 miles nationwide on qualifying repairs.", icon: "ShieldCheck" as const, to: "/about" },
];

export const PROCESS_STEPS = [
  { id: "schedule", label: "Schedule Appointment", description: "Book online or call — we'll confirm your visit and vehicle details." },
  { id: "inspect", label: "Inspection & Diagnosis", description: "Factory-trained techs inspect, scan, and document findings with photos." },
  { id: "approve", label: "Transparent Estimate", description: "You approve every line item before we turn a wrench." },
  { id: "repair", label: "Expert Repair", description: "OEM-quality parts, dealer-level procedures, meticulous workmanship." },
  { id: "deliver", label: "Quality Delivery", description: "Final road test, washed vehicle, and warranty documentation." },
];

export const HOME_STATS = [
  { value: "25+", label: "Years in Brooklyn", icon: "Award" as const },
  { value: "10+", label: "European Brands", icon: "Wrench" as const },
  { value: "5 Yr", label: "Nationwide Warranty", icon: "ShieldCheck" as const },
  { value: "ASE", label: "Master Technicians", icon: "Tag" as const },
];

export const WHY_BENEFITS = [
  { title: "Family Owned & Brooklyn Rooted", description: "A neighborhood shop built on trust, ethics, and long-term relationships.", icon: "Heart" as const },
  { title: "Over 25 Years of Excellence", description: "Decades serving European drivers who expect dealer quality at fair prices.", icon: "Award" as const },
  { title: "Customer-Focused Service", description: "Service advisors who listen first and recommend only what your car needs.", icon: "Users" as const },
  { title: "Factory Trained Technicians", description: "ASE Master Technicians and enthusiasts who live European automotive.", icon: "Wrench" as const },
  { title: "Transparent Communication", description: "Digital updates, clear estimates, and honest timelines — every visit.", icon: "Eye" as const },
  { title: "High Quality Workmanship", description: "Dealer-level procedures, premium parts, and pride in every repair.", icon: "ShieldCheck" as const },
  { title: "Warranty Protection", description: "5 years / 50,000 miles nationwide warranty for peace of mind.", icon: "Tag" as const },
];

export const WARRANTY_SECTION = {
  eyebrow: "NATIONWIDE PROTECTION",
  headline: "5 Years / 50,000 Mile",
  highlight: "Nationwide Warranty",
  body:
    "Our commitment to everlasting service includes a 5 year, 50,000 mile limited warranty — the protection you need whether you're in Brooklyn or across the country.",
  cta: { label: "Learn More", to: "/about" },
  image: MINHS_IMAGES.warrantyHero,
  bullets: [
    "Nationwide coverage on qualifying repairs",
    "Written warranty documentation",
    "Factory-level repair standards",
    "Visit store for complete details",
  ],
};

export const ABOUT_HOME = {
  eyebrow: "OUR STORY",
  headline: "Family Ownership. Brooklyn Roots. Automotive Passion.",
  body: [
    "MINHS Automotive is a full-service European auto repair shop in Brooklyn, NY. Our mission is to earn your loyalty through high standards of service, professionalism, and quality customer care.",
    "We function as a team, work ethically, and focus on meeting — and exceeding — your expectations. That devotion, paired with community responsibility, has fueled our success for over 25 years.",
  ],
  image: MINHS_IMAGES.shopFloor,
  cta: { label: "About MINHS", to: "/about" },
};

export const SERVICES = [
  { id: "oil-changes", title: "Oil Changes", icon: "Droplets", description: "Premium synthetic oils and OEM filters for European engines.", image: MINHS_IMAGES.oilChange },
  { id: "brake-repair", title: "Brake Repair", icon: "CircleDot", description: "Pads, rotors, calipers, and fluid service to manufacturer specs.", image: MINHS_IMAGES.brakeService },
  { id: "transmission-service", title: "Transmission Service", icon: "Cog", description: "Fluid exchanges, diagnostics, and coordinated rebuilds.", image: MINHS_IMAGES.transmission },
  { id: "engine-diagnostics", title: "Engine Diagnostics", icon: "Cpu", description: "Advanced scan tools, smoke testing, and root-cause analysis.", image: MINHS_IMAGES.engineDiag },
  { id: "preventive-maintenance", title: "Preventive Maintenance", icon: "Calendar", description: "Factory-scheduled maintenance that extends vehicle life.", image: MINHS_IMAGES.serviceBay },
  { id: "suspension-repair", title: "Suspension Repair", icon: "Wrench", description: "Shocks, struts, control arms, and alignment-related work.", image: MINHS_IMAGES.suspension },
  { id: "electrical-diagnostics", title: "Electrical Diagnostics", icon: "Zap", description: "Module programming, wiring faults, and sensor issues.", image: MINHS_IMAGES.diagnostic },
  { id: "factory-scheduled-maintenance", title: "Factory Scheduled Maintenance", icon: "ClipboardCheck", description: "Dealer maintenance schedules without dealer pricing.", image: MINHS_IMAGES.bmwDetail },
  { id: "performance-services", title: "Performance Services", icon: "Gauge", description: "Upgrades and performance work guided by factory integrity.", image: MINHS_IMAGES.porscheDetail },
  { id: "general-repairs", title: "General Repairs", icon: "Hammer", description: "Comprehensive European and import repair under one roof.", image: MINHS_IMAGES.technician },
];

export const BEFORE_AFTER_PROJECTS = [
  { id: "bmw-service-bay", title: "BMW Service Bay", location: "Brooklyn, NY", category: "Service Bays", serviceId: "general-repairs", beforeImage: MINHS_IMAGES.gallery1, afterImage: MINHS_IMAGES.serviceBay },
  { id: "diagnostic-suite", title: "Diagnostic Equipment", location: "Brooklyn, NY", category: "Diagnostics", serviceId: "engine-diagnostics", beforeImage: MINHS_IMAGES.gallery2, afterImage: MINHS_IMAGES.diagnostic },
  { id: "luxury-lineup", title: "European Luxury Vehicles", location: "Brooklyn, NY", category: "Luxury Vehicles", serviceId: "preventive-maintenance", beforeImage: MINHS_IMAGES.gallery3, afterImage: MINHS_IMAGES.heroLuxury },
  { id: "technician-work", title: "Technicians at Work", location: "Brooklyn, NY", category: "Technicians", serviceId: "general-repairs", beforeImage: MINHS_IMAGES.gallery4, afterImage: MINHS_IMAGES.technician },
  { id: "shop-environment", title: "Shop Environment", location: "Brooklyn, NY", category: "Shop", serviceId: "oil-changes", beforeImage: MINHS_IMAGES.gallery5, afterImage: MINHS_IMAGES.shopFloor },
];

export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  serviceId: p.serviceId,
  location: p.location,
  year: "2025",
  client: "MINHS Customer",
  value: "—",
  description: `${p.title} at our Brooklyn facility — dealer-level environment, European specialization, and meticulous attention to detail.`,
  image: p.afterImage,
  gallery: [p.beforeImage, p.afterImage],
  beforeImage: p.beforeImage,
  afterImage: p.afterImage,
  number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 5;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  { id: "nick", name: "Nick", role: "Lead Technician", bio: "Factory-trained BMW specialist known for honest recommendations and meticulous work.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "anthony", name: "Anthony", role: "Service Advisor", bio: "Respectful, knowledgeable communication — especially valued by our female customers.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "james", name: "James", role: "Master Technician", bio: "Land Rover and complex diagnostics — stands by every repair until the job is right.", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&h=300&q=85", social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Trixi (BMW X5 Owner)", role: "Brooklyn, NY", quote: "Nick treats my car like his own — attentive, knowledgeable, and honorable. These are my mechanics for life.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=85", rating: 5 },
  { name: "Sarah M.", role: "Brooklyn, NY", quote: "Ladies go here! Respectful, helpful, not condescending. Anthony and the whole shop are super knowledgeable.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=85", rating: 5 },
  { name: "Land Rover Owner", role: "Brooklyn, NY", quote: "Upfront, transparent, and professional from day one. They stood by their word when a complex repair tested everyone's patience.", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=120&h=120&q=85", rating: 5 },
  { name: "VW Owner", role: "Brooklyn, NY", quote: "Fair prices, spectacular service. Fixed my EPC warning under estimate and solved a sunroof leak the dealer wanted $500+ to diagnose.", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&h=120&q=85", rating: 5 },
  { name: "Audi A4 Owner", role: "Brooklyn, NY", quote: "Thorough, fair, and reasonably priced. They go above and beyond even when it's not best for business short-term.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=85", rating: 5 },
  { name: "Mercedes Owner", role: "Park Slope, NY", quote: "Dealer-level expertise without the dealer attitude. My car was washed and vacuumed when I picked it up.", avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=120&h=120&q=85", rating: 5 },
];

export const BLOG_POSTS = [
  { id: "bmw-maintenance-schedule", title: "BMW Maintenance: What Brooklyn Owners Should Know", excerpt: "Factory intervals, oil specs, and when to visit an independent specialist.", date: "April 12, 2025", author: "MINHS Team", category: "BMW", image: MINHS_IMAGES.bmwDetail, content: "Following your BMW's factory maintenance schedule protects resale value and prevents costly failures. We provide dealer-quality service with transparent pricing and OEM-spec fluids." },
  { id: "mercedes-brake-service", title: "Mercedes Brake Service: Signs You Need Attention", excerpt: "Squeal, pulsation, and fluid intervals for luxury braking systems.", date: "March 8, 2025", author: "MINHS Team", category: "Mercedes", image: MINHS_IMAGES.mercedesDetail, content: "European brake systems demand precision. We inspect pads, rotors, sensors, and fluid to Mercedes specifications — often at significant savings versus dealership menus." },
  { id: "porsche-preventive-care", title: "Porsche Preventive Care in NYC", excerpt: "Performance models need maintenance that respects engineering limits.", date: "February 2, 2025", author: "MINHS Team", category: "Porsche", image: MINHS_IMAGES.porscheDetail, content: "From oil changes to performance inspections, we guide upgrades that never compromise structural integrity or factory reliability." },
];

export const STATS = [
  { value: 25, label: "Years Serving Brooklyn", suffix: "+" },
  { value: 10, label: "European Brands", suffix: "+" },
  { value: 500, label: "5-Star Reviews", suffix: "+" },
  { value: 5, label: "Year Warranty", suffix: " Yr" },
];

export const FAQ_ITEMS = [
  { question: "Do you work on all European brands?", answer: "Yes — BMW, Mercedes-Benz, Audi, Volkswagen, Porsche, Jaguar, Land Rover, Volvo, MINI, and other European luxury vehicles are our specialty." },
  { question: "Are you a dealer alternative?", answer: "We provide dealer-level expertise, factory-trained technicians, and OEM-quality procedures — typically at significantly lower cost than dealership service menus." },
  { question: "What warranty do you offer?", answer: "Qualifying repairs include a 5 year / 50,000 mile limited nationwide warranty. Visit our shop for complete program details." },
  { question: "How do I schedule an appointment?", answer: "Use our online appointment form, call (718) 832-3096, or stop by 578 3rd Ave, Brooklyn. We also offer a 24-hour key drop box." },
  { question: "Do you offer free maintenance printouts?", answer: "Yes — ask for your manufacturer recommended maintenance schedule when you visit. We'll help you follow it to protect your investment." },
  { question: "What areas do you serve?", answer: "We're based in Brooklyn and serve Park Slope, Gowanus, Carroll Gardens, and greater NYC European owners." },
  { question: "Are your technicians ASE certified?", answer: "Our team includes ASE Master Technicians and factory-trained European specialists." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Reviews", path: "/reviews" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS = [
  { label: "Oil Changes", to: "/services/oil-changes" },
  { label: "Brake Repair", to: "/services/brake-repair" },
  { label: "Engine Diagnostics", to: "/services/engine-diagnostics" },
  { label: "Preventive Maintenance", to: "/services/preventive-maintenance" },
  { label: "Factory Scheduled Maintenance", to: "/services/factory-scheduled-maintenance" },
];

export const FOOTER_COMPANY_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact Us", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Brooklyn, NY",
  "Park Slope, NY",
  "Gowanus, NY",
  "Carroll Gardens, NY",
  "Cobble Hill, NY",
  "Red Hook, NY",
  "Sunset Park, NY",
  "Prospect Heights, NY",
  "Williamsburg, NY",
  "Manhattan, NY",
];

export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["BMW", "MERCEDES", "PORSCHE", "MAINTENANCE", "BROOKLYN"];

export const PROJECTS_PAGE_STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "10+", label: "European Brands" },
  { value: "5 Yr", label: "Nationwide Warranty" },
  { value: "ASE", label: "Master Techs" },
];

export const ABOUT_STATS = [
  { value: "25+", label: "Years in Brooklyn" },
  { value: "10+", label: "European Brands" },
  { value: "5 Yr", label: "Nationwide Warranty" },
  { value: "ASE", label: "Certified Techs" },
  { value: "500+", label: "Happy Customers" },
];

export const CORE_VALUES = [
  { id: "trust", title: "Customer trust first", description: "Earn loyalty through service, professionalism, and ethical teamwork.", icon: "Handshake" as const },
  { id: "quality", title: "Dealer-level quality", description: "Factory procedures, premium parts, and workmanship you can see.", icon: "Award" as const },
  { id: "honesty", title: "Transparent communication", description: "Clear estimates and honest recommendations — every visit.", icon: "Eye" as const },
  { id: "community", title: "Brooklyn roots", description: "Proud to serve the neighborhood we've called home for decades.", icon: "Heart" as const },
  { id: "passion", title: "Automotive passion", description: "Technicians and enthusiasts who love European engineering.", icon: "Zap" as const },
  { id: "warranty", title: "Warranty protection", description: "5 year / 50,000 mile coverage for confidence on every road.", icon: "ShieldCheck" as const },
];

export const CERTIFICATIONS = [
  { id: "ase", label: "ASE Master Technicians", sub: "Certified excellence" },
  { id: "european", label: "European Specialists", sub: "BMW · Mercedes · Audi+" },
  { id: "warranty", label: "5 Year Warranty", sub: "50,000 mile coverage" },
  { id: "family", label: "Family Owned", sub: "25+ years Brooklyn" },
  { id: "dealer-alt", label: "Dealer Alternative", sub: "#1 in Brooklyn" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "services", label: "SERVICES" },
  { id: "warranty", label: "WARRANTY" },
  { id: "appointments", label: "APPOINTMENTS" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3),
  services: [
    { question: "Do you use OEM parts?", answer: "We use OEM-quality and manufacturer-approved parts appropriate for your European vehicle." },
    { question: "Can you perform factory scheduled maintenance?", answer: "Yes — we follow manufacturer maintenance schedules and document service for your records." },
  ],
  warranty: [
    { question: "What does the 5 year warranty cover?", answer: "Qualifying repairs include limited nationwide coverage for 5 years or 50,000 miles. Visit us for complete terms." },
    { question: "Is the warranty transferable?", answer: "Program details are available in-store — ask your service advisor when you visit." },
  ],
  appointments: [
    { question: "Do you have a key drop box?", answer: "Yes — 24-hour key drop is available for your convenience." },
    { question: "How soon can I get an appointment?", answer: "We take appointments by phone and online — call (718) 832-3096 for the next available slot." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Ten core automotive services for European luxury vehicles in Brooklyn — oil changes, brakes, transmission, diagnostics, preventive maintenance, and dealer-alternative factory care.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "check-engine", title: "Check Engine Light", description: "Advanced diagnostics to find root cause — not just clear codes.", icon: "Cpu" as const },
  { id: "brake-noise", title: "Brake Noise or Vibration", description: "Inspection of pads, rotors, and hydraulic systems.", icon: "CircleDot" as const },
  { id: "fluid-leaks", title: "Fluid Leaks", description: "Oil, coolant, and transmission leaks diagnosed and repaired.", icon: "Droplets" as const },
  { id: "suspension", title: "Suspension Issues", description: "Clunks, wandering steering, and uneven tire wear.", icon: "Wrench" as const },
  { id: "electrical", title: "Electrical Warnings", description: "EPC, battery, and module faults on European systems.", icon: "Zap" as const },
  { id: "maintenance-due", title: "Maintenance Due", description: "Factory schedule services at independent pricing.", icon: "Calendar" as const },
];

export const SERVICE_DEEP_DIVES = SERVICES.slice(0, 5).map((s, i) => ({
  id: s.id,
  category: "AUTOMOTIVE",
  title: s.title,
  subtitle: "EUROPEAN SPECIALISTS · BROOKLYN",
  body: [s.description, "Factory-trained technicians, transparent estimates, and warranty-backed workmanship."],
  image: s.image,
  inclusions: ["Multi-point inspection", "Written estimate", "OEM-quality parts", "Road test verification", "Warranty documentation", "Vehicle cleaned on delivery"],
}));

export const LEAD_FORM = {
  title: "Schedule Your Appointment",
  description: "Request service online — we'll confirm your visit and vehicle details.",
  bullets: [
    "Online appointment requests",
    "Service & repair estimates",
    "24-hour key drop available",
    "European vehicle specialists",
  ],
};

export const STORM_CHECKLIST = PROCESS_STEPS;

export const INSPECTION_BENEFITS = WHY_BENEFITS.slice(0, 5).map((b, i) => ({
  id: `benefit-${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const INSPECTION_TYPES = SERVICES.slice(0, 4).map(s => ({
  id: s.id,
  title: s.title,
  description: s.description,
  image: s.image,
}));

export const INSPECTION_CHECKLIST = [
  "Brakes, suspension, and steering components",
  "Engine oil, filters, and fluid levels",
  "Battery, charging, and electrical systems",
  "Tires, alignment indicators, and wear patterns",
  "Check engine and module fault scans",
  "Factory maintenance schedule review",
];

export const CONTACT_TRUST_STRIP = [
  { id: "ase", title: "ASE Certified", description: "Master technicians on every European repair.", icon: "ShieldCheck" as const },
  { id: "dealer", title: "Dealer Alternative", description: "Factory-level service without dealership pricing.", icon: "Award" as const },
  { id: "warranty", title: "5 Year Warranty", description: "50,000 mile nationwide protection on qualifying work.", icon: "Tag" as const },
  { id: "family", title: "Family Owned", description: "25+ years serving Brooklyn drivers.", icon: "Heart" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "family", title: "Family Owned", icon: "Heart" as const },
  { id: "ase", title: "ASE Certified", icon: "ShieldCheck" as const },
  { id: "european", title: "European Specialists", icon: "Wrench" as const },
  { id: "warranty", title: "5 Year Warranty", icon: "Tag" as const },
];

export const CTA_SECTION = {
  headline: "Ready To Experience Dealer-Level Service?",
  subheadline: "Schedule your appointment or call our Brooklyn shop today.",
  primaryCta: { label: "Schedule Appointment", to: "/contact" },
  secondaryCta: { label: "Call Today", to: "tel:+17188323096" },
};
'''

OUT.write_text(content)
print(f"Wrote {OUT} ({len(content)} bytes)")
