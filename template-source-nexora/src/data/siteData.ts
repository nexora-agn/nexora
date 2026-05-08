/**
 * NEXORA ROOFING — content registry.
 *
 * All copy, lists, and CTA labels live here so the admin EditorPanel can
 * patch them, and the export server can bake the customised values into
 * the standalone ZIP. Keep the export NAMES stable; you can change values
 * freely.
 */

export const COMPANY = {
  name: "NEXORA ROOFING",
  legalName: "NEXORA ROOFING & RESTORATION",
  tagline: "Quality roofing services you can trust. Protecting homes across Texas with honesty, integrity, and craftsmanship.",
  phone: "(469) 555-0198",
  email: "info@nexoraroofing.com",
  address: "123 Roofing Way, Frisco, TX 75034",
  hours: "Mon - Fri: 7:00 AM - 6:00 PM",
};

/** Top emergency bar above the header. */
export const SITE_TOP = {
  line: "24/7 Emergency Roofing Service",
  badges: ["Licensed & Insured", "Free Inspections", "Lifetime Workmanship Warranty"],
  ratingValue: "4.9",
  ratingCount: "250+",
  ratingLabel: "Reviews",
  /** Kept for back-compat with the shared editor field. */
  locations: "Frisco · McKinney · Plano · Allen",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM - 6:00 PM" },
  { days: "Saturday", hours: "8:00 AM - 2:00 PM" },
  { days: "Sunday", hours: "Emergency Only" },
];

/** Embedded map for the contact page. */
export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-96.95%2C32.95%2C-96.65%2C33.25&layer=mapnik&marker=33.15,-96.82";

/** Homepage hero. Trust pills + Google rating overlay are template-specific. */
export const HOME_HERO = {
  eyebrow: "PROTECT YOUR HOME.",
  headlineBefore: "Strong Roofs.",
  headlineHighlight: "Built to Last.",
  headlineAfter: "",
  body:
    "From roof repairs to full replacements, we deliver quality workmanship and honest service you can trust.",
  primaryCta: { label: "GET FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "CALL NOW", to: "/contact" },
  image:
    "https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=1400&h=1000&fit=crop",
  /** Pills shown under the hero CTAs. */
  trustPills: [
    { label: "Free Inspection", sub: "in 24 Hours", icon: "Calendar" as const },
    { label: "Upfront Pricing", sub: "No Hidden Fees", icon: "Tag" as const },
    { label: "Lifetime Warranty", sub: "On Workmanship", icon: "ShieldCheck" as const },
  ],
  /** Google rating card overlay. */
  ratingCard: {
    score: "4.9",
    countLabel: "Based on 250+ Reviews",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    ],
  },
  /** Legacy fields kept for editor compatibility. */
  featuredEyebrow: "TRUSTED BY HOMEOWNERS",
  featuredTitle: "North Texas Roofing Specialists",
  featuredMeta: "Frisco · McKinney · Plano · Allen",
};

/** Home services grid (4 large cards). */
export const SERVICES_RIBBON = [
  {
    id: "roof-repair",
    label: "ROOF REPAIR",
    icon: "Flame" as const,
    description: "Fast and reliable repairs for leaks, damage, and wear & tear.",
    to: "/services/roof-repair",
  },
  {
    id: "roof-replacement",
    label: "ROOF REPLACEMENT",
    icon: "Home" as const,
    description: "High-quality roofs built to last. Asphalt, metal, tile, and more.",
    to: "/services/roof-replacement",
  },
  {
    id: "storm-damage",
    label: "STORM DAMAGE",
    icon: "CloudLightning" as const,
    description: "Storm damage experts. We'll help with repairs and insurance claims.",
    to: "/services/storm-damage",
  },
  {
    id: "insurance-claims",
    label: "INSURANCE CLAIMS",
    icon: "FileCheck" as const,
    description: "We make the process easy and handle the paperwork for you.",
    to: "/services/insurance-claims",
  },
];

/** Why Choose Us mini-cards (used on About). */
export const CAPABILITIES = [
  {
    id: "experienced",
    title: "Experienced",
    description: "Over 20 years of combined experience in roofing and storm restoration.",
    icon: "Award" as const,
    to: "/about",
  },
  {
    id: "trusted",
    title: "Trusted",
    description: "Hundreds of 5-star reviews from homeowners across North Texas.",
    icon: "ShieldCheck" as const,
    to: "/about",
  },
  {
    id: "quality-focused",
    title: "Quality Focused",
    description: "We use premium materials and follow the highest industry standards.",
    icon: "Hammer" as const,
    to: "/about",
  },
  {
    id: "customer-first",
    title: "Customer First",
    description: "Your satisfaction is our priority from the first call to the final cleanup.",
    icon: "Users" as const,
    to: "/about",
  },
];

/** 5-step insurance claim process used on Insurance Claims page. */
export const PROCESS_STEPS = [
  { id: "free-inspection", label: "Free Inspection", description: "We inspect the damage and document everything." },
  { id: "inspection-meeting", label: "Inspection Meeting", description: "We meet your adjuster on-site and present our findings." },
  { id: "claim-support", label: "Claim Support", description: "We handle the paperwork and communicate with your insurer." },
  { id: "maximize-coverage", label: "Maximize Coverage", description: "We fight for the full coverage you're entitled to." },
  { id: "quality-repairs", label: "Quality Repairs", description: "We complete the work with expert craftsmanship." },
];

export const HOME_STATS = [
  { value: "20+", label: "Years Experience", icon: "Award" as const },
  { value: "500+", label: "Roofs Completed", icon: "Home" as const },
  { value: "10 Yr", label: "Workmanship Warranty", icon: "ShieldCheck" as const },
  { value: "A+", label: "BBB Rating", icon: "Tag" as const },
];

/** Why Homeowners Choose Us — small benefits list with icons. */
export const WHY_BENEFITS = [
  {
    title: "Local & Family Owned",
    description: "Locally owned and operated. We treat every home like our own.",
    icon: "Home" as const,
  },
  {
    title: "Licensed, Bonded & Insured",
    description: "Fully licensed and insured for your protection.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Quality Workmanship",
    description: "Premium materials and craftsmanship you can see.",
    icon: "Award" as const,
  },
  {
    title: "Honest, Upfront Pricing",
    description: "No hidden fees. Just clear, transparent estimates.",
    icon: "Tag" as const,
  },
];

/** Full service catalog. Powers /services and /services/[id]. */
export const SERVICES = [
  {
    id: "roof-repair",
    title: "Roof Repair",
    icon: "Flame",
    description: "Fast and reliable repairs for leaks, damage, and wear & tear.",
    image: "https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=600&h=400&fit=crop",
  },
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    icon: "Home",
    description: "High-quality roofs built to last. Asphalt, metal, tile, and more.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
  },
  {
    id: "storm-damage",
    title: "Storm Damage Repair",
    icon: "CloudLightning",
    description: "Storm damage experts. We'll help with repairs and insurance claims.",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=600&h=400&fit=crop",
  },
  {
    id: "insurance-claims",
    title: "Insurance Claims",
    icon: "FileCheck",
    description: "We make the process easy and handle the paperwork for you.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
  },
  {
    id: "roof-inspections",
    title: "Roof Inspections",
    icon: "Search",
    description: "Detailed inspections and honest reports to protect your investment.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
  },
  {
    id: "gutter-services",
    title: "Gutter Services",
    icon: "Wrench",
    description: "Gutter installation, repair, and cleaning to protect your roof and home.",
    image: "https://images.unsplash.com/photo-1597222909672-83c9c47e2cdf?w=600&h=400&fit=crop",
  },
];

/** Before/After gallery shown on the homepage and a dedicated page. */
export const BEFORE_AFTER_PROJECTS = [
  {
    id: "frisco-replacement",
    title: "Roof Replacement",
    location: "Frisco, TX",
    beforeImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=450&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=600&h=450&fit=crop",
  },
  {
    id: "mckinney-storm",
    title: "Storm Damage Repair",
    location: "McKinney, TX",
    beforeImage: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=600&h=450&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=450&fit=crop",
  },
  {
    id: "prosper-replacement",
    title: "Roof Replacement",
    location: "Prosper, TX",
    beforeImage: "https://images.unsplash.com/photo-1597222909672-83c9c47e2cdf?w=600&h=450&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=600&h=450&fit=crop",
  },
  {
    id: "allen-repair",
    title: "Roof Repair",
    location: "Allen, TX",
    beforeImage: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=600&h=450&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=450&fit=crop",
  },
];

/** Old projects list kept for compatibility with project detail page. */
export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({
  id: p.id,
  title: p.title,
  category: "Residential",
  location: p.location,
  year: "2024",
  client: "Private Homeowner",
  value: "—",
  description: `${p.title} project completed in ${p.location}. Quality workmanship and honest service from start to finish.`,
  image: p.afterImage,
  gallery: [p.beforeImage, p.afterImage],
  beforeImage: p.beforeImage,
  afterImage: p.afterImage,
  number: i + 1,
}));

export const SIGNATURE_PROJECT_COUNT = 4;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  {
    id: "mike-thompson",
    name: "Mike Thompson",
    role: "Founder & CEO",
    bio: "Mike founded Nexora Roofing with a mission to bring honest, quality roofing to North Texas homeowners.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "carla-rodriguez",
    name: "Carla Rodriguez",
    role: "Operations Manager",
    bio: "Carla keeps every project on schedule and every homeowner informed.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "jason-lee",
    name: "Jason Lee",
    role: "Lead Project Manager",
    bio: "Jason runs the field and makes sure every roof is installed to the highest standards.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "ashley-baker",
    name: "Ashley Baker",
    role: "Insurance Claims Specialist",
    bio: "Ashley handles the paperwork so you don't have to.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    social: { linkedin: "#", twitter: "#" },
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Dallas, TX",
    quote:
      "Nexora Roofing did an amazing job on our new roof. They were professional, on time, and the quality is top-notch.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Fort Worth, TX",
    quote:
      "We had severe storm damage and they helped us through the whole insurance process. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
    rating: 5,
  },
  {
    name: "Melissa R.",
    role: "Plano, TX",
    quote:
      "Great communication, fair pricing, and excellent workmanship. Our roof looks great and we feel protected.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
    rating: 5,
  },
  {
    name: "Mark D.",
    role: "Frisco, TX",
    quote:
      "From start to finish, Nexora Roofing was amazing. Professional, on time, and the quality of work is outstanding.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
    rating: 5,
  },
  {
    name: "Stephanie L.",
    role: "McKinney, TX",
    quote:
      "They made the insurance claim process so easy and our new roof looks incredible. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Allen, TX",
    quote:
      "Honest, reliable, and the best pricing we found. The crew was respectful and cleaned up everything.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop",
    rating: 5,
  },
];

export const BLOG_POSTS = [
  {
    id: "roof-inspection-checklist",
    title: "Your Annual Roof Inspection Checklist",
    excerpt: "What homeowners should look for between professional inspections to catch problems early.",
    date: "March 12, 2024",
    author: "Mike Thompson",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
    content:
      "Catching small problems early is the cheapest way to protect your roof. Walk your property after every major storm and look for missing shingles, dented vents, and granules in the gutters. If anything looks off, schedule a free professional inspection before water finds its way inside.",
  },
  {
    id: "filing-an-insurance-claim",
    title: "How to File a Roof Insurance Claim Without the Headache",
    excerpt: "A simple step-by-step guide to making sure your storm damage claim gets approved.",
    date: "February 22, 2024",
    author: "Ashley Baker",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    content:
      "Document the damage with photos, file the claim within your policy window, and request an on-site adjuster meeting. We'll meet your adjuster, walk the roof, and make sure nothing gets missed.",
  },
  {
    id: "asphalt-vs-metal",
    title: "Asphalt vs Metal Roofs: Which Is Right for North Texas?",
    excerpt: "Cost, longevity, and storm performance compared.",
    date: "January 18, 2024",
    author: "Jason Lee",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1632759145355-8b8f3ab5ad9c?w=600&h=400&fit=crop",
    content:
      "Asphalt is affordable and proven. Metal is more expensive up front but lasts decades longer and shrugs off hail better. The right answer depends on your budget, your home's design, and how long you plan to stay.",
  },
];

export const STATS = [
  { value: 500, label: "Roofs Completed", suffix: "+" },
  { value: 20, label: "Years Experience", suffix: "+" },
  { value: 250, label: "5-Star Reviews", suffix: "+" },
  { value: 100, label: "Customer Satisfaction", suffix: "%" },
];

export const FAQ_ITEMS = [
  {
    question: "How quickly can you respond to a roofing emergency?",
    answer:
      "We offer 24/7 emergency roofing service and typically respond within a few hours, depending on your location and the severity of the situation.",
  },
  {
    question: "Do you provide free estimates?",
    answer: "Yes — every estimate is free, on-site, and comes with no obligation. We'll walk the roof, take photos, and explain exactly what we recommend.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. Nexora Roofing carries full general liability and workers' compensation coverage. Documentation is available on request.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, checks, ACH transfers, and offer financing through approved lenders for qualified projects.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes. We work with several lenders to offer competitive financing options. Ask about it during your free estimate.",
  },
  {
    question: "Will filing a claim increase my insurance rates?",
    answer:
      "Storm damage claims typically don't raise individual rates, since they're considered acts of nature. We can help you understand your specific policy.",
  },
  {
    question: "How long does the insurance claim process take?",
    answer:
      "From inspection to roof completion, most claims wrap up in 4-8 weeks. We move as fast as your insurer allows and keep you updated at every step.",
  },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Roofing Services", path: "/services" },
  { label: "Storm Damage", path: "/services/storm-damage" },
  { label: "Insurance Claims", path: "/services/insurance-claims" },
  { label: "About Us", path: "/about" },
  { label: "Reviews", path: "/reviews" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Roof Repair", to: "/services/roof-repair" },
  { label: "Roof Replacement", to: "/services/roof-replacement" },
  { label: "Storm Damage Repair", to: "/services/storm-damage" },
  { label: "Insurance Claims", to: "/services/insurance-claims" },
  { label: "Roof Inspections", to: "/services/roof-inspections" },
  { label: "Gutter Services", to: "/services/gutter-services" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Roofing Services", to: "/services" },
  { label: "Storm Damage", to: "/services/storm-damage" },
  { label: "Insurance Claims", to: "/services/insurance-claims" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Frisco, TX",
  "McKinney, TX",
  "Plano, TX",
  "Allen, TX",
  "Prosper, TX",
  "Dallas, TX",
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

export const BLOG_TAGS = ["MAINTENANCE", "INSURANCE", "MATERIALS", "STORM DAMAGE", "TIPS"];

export const PROJECTS_PAGE_STATS = [
  { value: "500+", label: "Roofs Completed" },
  { value: "98%", label: "On-Time Completion" },
  { value: "10 Yr", label: "Workmanship Warranty" },
  { value: "A+", label: "BBB Rating" },
];

export const ABOUT_STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "500+", label: "Roofs Completed" },
  { value: "10 Yr", label: "Workmanship Warranty" },
  { value: "A+", label: "BBB Rating" },
  { value: "250+", label: "5-Star Reviews" },
];

export const CORE_VALUES = [
  {
    id: "integrity",
    title: "Integrity in everything we do",
    description: "We do what we say we'll do and treat every home like our own.",
    icon: "ShieldCheck" as const,
  },
  {
    id: "quality",
    title: "Quality without compromise",
    description: "Premium materials, certified installers, and zero shortcuts.",
    icon: "Award" as const,
  },
  {
    id: "respect",
    title: "Respect for our customers and team",
    description: "Clean job sites, clear communication, and crews that show up on time.",
    icon: "Users" as const,
  },
  {
    id: "reliability",
    title: "Reliability you can count on",
    description: "We finish what we start and stand behind our workmanship for life.",
    icon: "Handshake" as const,
  },
  {
    id: "improvement",
    title: "Continuous improvement",
    description: "We invest in training, tools, and techniques to deliver more every year.",
    icon: "Eye" as const,
  },
  {
    id: "community",
    title: "Giving back to our community",
    description: "We support local schools, veterans, and storm-relief efforts in North Texas.",
    icon: "Heart" as const,
  },
];

export const CERTIFICATIONS = [
  { id: "gaf", label: "GAF Certified", sub: "Weather Stopper Roofing Contractor" },
  { id: "certainteed", label: "CertainTeed", sub: "Select ShingleMaster" },
  { id: "owens-corning", label: "Owens Corning", sub: "Preferred Contractor" },
  { id: "bbb", label: "BBB Accredited", sub: "A+ Business Rating" },
  { id: "malarkey", label: "Malarkey Roofing", sub: "Certified Contractor" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, "0"),
}));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "insurance", label: "INSURANCE" },
  { id: "process", label: "PROCESS" },
  { id: "warranty", label: "WARRANTY" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: [
    {
      question: "How quickly can you respond to a roofing emergency?",
      answer:
        "24/7 dispatch — most emergency calls get a tarp or temporary protection within a few hours.",
    },
    {
      question: "Do you provide free estimates?",
      answer: "Yes, every estimate is free, on-site, and includes photos plus written recommendations.",
    },
  ],
  insurance: [
    {
      question: "Will filing a storm claim raise my rates?",
      answer:
        "Most storm damage claims are weather-related and don't typically raise individual rates. We can review your policy with you.",
    },
    {
      question: "What if my claim is denied?",
      answer:
        "We help with re-inspections, supplemental claim filings, and (when needed) connect you with a licensed public adjuster.",
    },
  ],
  process: [
    {
      question: "How long does a typical roof replacement take?",
      answer:
        "Most residential roofs are completed in 1–2 days, weather permitting.",
    },
    {
      question: "Do you clean up after the work?",
      answer:
        "Yes. Magnetic nail sweep, debris haul-off, and a final walkthrough are included on every job.",
    },
  ],
  warranty: [
    {
      question: "What kind of warranty do you offer?",
      answer:
        "Manufacturer warranties on materials (up to lifetime) plus a 10-year workmanship warranty backed by Nexora.",
    },
    {
      question: "Is the warranty transferable?",
      answer: "Yes — the workmanship warranty transfers to a new homeowner one time.",
    },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Comprehensive roofing services for homeowners across North Texas. From minor repairs to full replacements, storm damage, and insurance claims — we handle it all with honesty and craftsmanship.";

/** Insurance Claims page — types of claims we handle. */
export const COMMERCIAL_FITOUT_CARDS = [
  {
    id: "hail",
    title: "Hail Damage",
    description: "Hail can cause serious roof damage that may not be visible from the ground.",
    icon: "Cloud" as const,
  },
  {
    id: "wind",
    title: "Wind Damage",
    description: "High winds can lift shingles, cause leaks, and lead to major problems.",
    icon: "Wind" as const,
  },
  {
    id: "storm",
    title: "Storm Damage",
    description: "Thunderstorms can bring heavy rain, hail, and wind that damage your roof.",
    icon: "CloudLightning" as const,
  },
  {
    id: "falling-trees",
    title: "Falling Trees",
    description: "Fallen branches or trees can cause significant roof damage.",
    icon: "TreePine" as const,
  },
  {
    id: "water",
    title: "Water Damage",
    description: "Leaks and water intrusion can lead to mold, rot, and structural issues.",
    icon: "Droplets" as const,
  },
  {
    id: "ice-dams",
    title: "Ice Dams",
    description: "Ice dams can cause water to back up and damage your roof and home.",
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
    id: "roof-replacement",
    category: "RESIDENTIAL",
    title: "Roof Replacement",
    subtitle: "FULL TEAR-OFFS COMPLETED IN 1–2 DAYS",
    body: [
      "Full tear-offs, premium underlayment, and certified-installer crews. We handle asphalt, metal, tile, and synthetic systems with manufacturer-backed warranties.",
      "Every replacement includes a magnetic nail sweep and full debris haul-off — your yard goes back to spotless.",
    ],
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&h=700&fit=crop",
    inclusions: [
      "Free on-site estimate",
      "Premium materials",
      "Certified installation",
      "10-year workmanship warranty",
      "Magnetic nail sweep cleanup",
      "Final walkthrough & sign-off",
    ],
  },
  {
    id: "storm-damage",
    category: "EMERGENCY",
    title: "Storm Damage Repair",
    subtitle: "24/7 EMERGENCY RESPONSE",
    body: [
      "Hail, wind, fallen branches — we tarp emergency leaks fast and document everything you'll need for an insurance claim.",
      "Our crew has handled hundreds of storm restorations across North Texas, and we'll fight to make sure your claim is fully covered.",
    ],
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=900&h=700&fit=crop",
    inclusions: [
      "24/7 emergency tarping",
      "Damage documentation",
      "Adjuster meeting on-site",
      "Insurance paperwork support",
      "Repair or full replacement",
      "Workmanship warranty",
    ],
  },
  {
    id: "insurance-claims",
    category: "SUPPORT",
    title: "Insurance Claims",
    subtitle: "WE HANDLE THE PAPERWORK FOR YOU",
    body: [
      "From the first photo to the final shingle, we make insurance claims simple. We meet your adjuster on-site, walk the roof together, and make sure nothing gets missed.",
      "You pay your deductible — we handle the rest.",
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=700&fit=crop",
    inclusions: [
      "Free claim review",
      "Adjuster meeting",
      "Photo documentation",
      "Supplemental filing",
      "Re-inspection support",
      "Approved repair completion",
    ],
  },
];

export const LEAD_FORM = {
  title: "Get Your Free Roof Inspection & Estimate",
  description: "No Obligation. 100% Free.",
  bullets: [
    "Free roof inspection",
    "Upfront, honest pricing",
    "Fast response (24 hrs)",
    "No pushy sales tactics",
  ],
};

/** Insurance Claims page right column — what to do after a storm. */
export const STORM_CHECKLIST = [
  { id: "safety", title: "Ensure Safety", description: "Check for hazards and make sure everyone is safe." },
  { id: "document", title: "Document Damage", description: "Take photos and videos of your roof and property." },
  { id: "call", title: "Call Nexora Roofing", description: "We'll inspect the damage and guide you through the next steps." },
  { id: "notify", title: "Notify Your Insurance", description: "We'll meet your adjuster and handle the process." },
];

/** Roof Inspections page — benefits cards. */
export const INSPECTION_BENEFITS = [
  { id: "prevent", title: "Prevent Costly Repairs", description: "Catch small issues early before they turn into expensive problems.", icon: "ShieldCheck" as const },
  { id: "extend", title: "Extend Roof Life", description: "Routine maintenance helps your roof last years longer.", icon: "Clock" as const },
  { id: "protect", title: "Protect Your Home", description: "Prevent leaks, water damage, and structural issues before they start.", icon: "Home" as const },
  { id: "warranty", title: "Maintain Warranty", description: "Many manufacturer warranties require regular professional inspections.", icon: "FileCheck" as const },
  { id: "value", title: "Increase Home Value", description: "A well-maintained roof adds value and boosts curb appeal.", icon: "DollarSign" as const },
];

/** Roof Inspections page — types of inspection cards. */
export const INSPECTION_TYPES = [
  {
    id: "routine",
    title: "Routine Maintenance Inspections",
    description: "Recommended twice a year to ensure your roof is in top condition and performing its best.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
  },
  {
    id: "storm",
    title: "Storm Damage Inspections",
    description: "After severe weather, we inspect your roof for damage and help with insurance claims if needed.",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?w=600&h=400&fit=crop",
  },
  {
    id: "pre-purchase",
    title: "Pre-Purchase Inspections",
    description: "Know exactly what you're buying. We provide detailed reports for homebuyers and real estate agents.",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&h=400&fit=crop",
  },
  {
    id: "commercial",
    title: "Commercial Roof Inspections",
    description: "Comprehensive inspections for commercial properties to keep your business protected.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
];

/** Roof Inspections page — what we inspect checklist. */
export const INSPECTION_CHECKLIST = [
  "Shingles, tiles, and metal panels",
  "Flashing around chimneys, vents, and skylights",
  "Gutters, downspouts, and drainage",
  "Roof decking and underlayment",
  "Attic ventilation and insulation",
  "Signs of leaks or water damage",
  "Overall roof structure and integrity",
];

/** Contact page bottom strip badges. */
export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "Fully licensed and insured for your protection.", icon: "ShieldCheck" as const },
  { id: "quality", title: "Quality Guaranteed", description: "We stand behind our work with strong warranties.", icon: "Award" as const },
  { id: "expert", title: "Expert Team", description: "Experienced, trained, and committed to excellence.", icon: "Users" as const },
  { id: "available", title: "Always Available", description: "24/7 emergency service when you need us most.", icon: "Clock" as const },
];

/** About page hero badges. */
export const ABOUT_HERO_BADGES = [
  { id: "local", title: "Local & Family Owned", icon: "Home" as const },
  { id: "licensed", title: "Licensed, Bonded & Insured", icon: "ShieldCheck" as const },
  { id: "quality", title: "Quality Workmanship", icon: "Award" as const },
  { id: "honest", title: "Honest, Upfront Pricing", icon: "Tag" as const },
];
