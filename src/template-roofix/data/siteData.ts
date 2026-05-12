export const COMPANY = {
  name: "Roofix",
  legalName: "ROOFIX",
  tagline: "Quality roofs. Stronger homes. High-quality roofing solutions built to protect what matters most.",
  phone: "(713) 456-7890",
  email: "info@roofix.com",
  address: "123 Roofing Way, Houston, TX 77001",
  hours: "Mon - Fri: 8:00 AM - 6:00 PM · 24/7 Emergency Service",
};

export const SITE_TOP = {
  tagline: "Strong Roofs. Safe Homes.",
  badges: "Licensed & Insured · Bonded · Lifetime Warranty",
  ratingValue: "4.9",
  ratingCount: "320+ Reviews",
  line: "Strong Roofs. Safe Homes.",
  locations: "Licensed & Insured · Bonded · Lifetime Warranty",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "8:00 AM - 6:00 PM" },
  { days: "Saturday", hours: "9:00 AM - 3:00 PM" },
  { days: "Sunday", hours: "Emergency Only" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-95.43%2C29.71%2C-95.30%2C29.79&layer=mapnik&marker=29.7604,-95.3698";

export const HOME_HERO = {
  eyebrow: "PROFESSIONAL ROOFING CONTRACTORS",
  headlineBefore: "Strong Roofs.",
  headlineHighlight: "Safe Homes.",
  headlineAfter: "",
  body:
    "High-quality roofing solutions built to protect what matters most. Licensed, insured roofers delivering durable installations, fast repairs, and honest pricing.",
  primaryCta: { label: "GET A FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "OUR SERVICES", to: "/services" },
  image:
    "https://images.unsplash.com/photo-1632759145355-e9d2c00ec600?w=1600&h=1200&fit=crop",
  featuredEyebrow: "FEATURED PROJECT",
  featuredTitle: "Modern Asphalt Re-roof",
  featuredMeta: "Houston, TX · 3-Day Install",
  trustPills: [
    { id: "licensed", label: "Licensed", sub: "& Insured", icon: "ShieldCheck" as const },
    { id: "quality", label: "Quality", sub: "Materials", icon: "Award" as const },
    { id: "team", label: "Expert", sub: "Team", icon: "Users" as const },
    { id: "warranty", label: "Warranty", sub: "Protection", icon: "BadgeCheck" as const },
  ],
};

export const SERVICES_RIBBON = [
  { id: "roof-replacement", label: "ROOF REPLACEMENT", icon: "Home" as const },
  { id: "roof-repair", label: "ROOF REPAIR", icon: "Wrench" as const },
  { id: "storm-damage", label: "STORM DAMAGE", icon: "CloudLightning" as const },
  { id: "roof-inspection", label: "ROOF INSPECTION", icon: "ClipboardCheck" as const },
  { id: "gutter-installation", label: "GUTTER INSTALLATION", icon: "Hammer" as const },
];

export const CAPABILITIES = [
  {
    id: "licensed",
    title: "Licensed & Insured",
    description: "Fully certified roofing professionals.",
    icon: "ShieldCheck" as const,
    to: "/about",
  },
  {
    id: "quality",
    title: "Quality Materials",
    description: "We use top-grade materials trusted by manufacturers.",
    icon: "Award" as const,
    to: "/services",
  },
  {
    id: "team",
    title: "Expert Team",
    description: "Skilled & experienced roofing experts on every job.",
    icon: "Users" as const,
    to: "/about",
  },
  {
    id: "warranty",
    title: "Warranty Protection",
    description: "Long-term warranty for peace of mind.",
    icon: "BadgeCheck" as const,
    to: "/services",
  },
];

export const PROCESS_STEPS = [
  { id: "inspection", label: "Inspection & Assessment", description: "We inspect your roof and assess your needs." },
  { id: "estimate", label: "Detailed Estimate", description: "We provide a clear & transparent estimate." },
  { id: "plan", label: "Plan & Schedule", description: "We plan the work and set your schedule." },
  { id: "install", label: "Professional Installation", description: "Our team gets the job done right." },
  { id: "cleanup", label: "Final Inspection & Clean-Up", description: "We ensure quality and leave your property clean." },
];

export const HOME_STATS = [
  { value: "15+", label: "Years Experience", icon: "Award" as const },
  { value: "2500+", label: "Projects Completed", icon: "Home" as const },
  { value: "100%", label: "Satisfied Clients", icon: "Smile" as const },
  { value: "4.9", label: "Average Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  {
    title: "Licensed & Insured",
    description: "Fully certified roofing professionals working on every job.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Experienced Team",
    description: "Skilled and experienced roofing experts who deliver consistent quality.",
    icon: "Users" as const,
  },
  {
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden fees or surprise charges.",
    icon: "BadgeCheck" as const,
  },
  {
    title: "Satisfaction Guaranteed",
    description: "We back our roofing work with a lifetime workmanship warranty.",
    icon: "Award" as const,
  },
];

export const SERVICES = [
  { id: "roof-installation", title: "Roof Installation", icon: "Home", description: "Professional roof installation using high-quality materials for long-lasting durability.", image: "https://images.unsplash.com/photo-1632759145355-e9d2c00ec600?w=600&h=400&fit=crop" },
  { id: "roof-repair", title: "Roof Repair", icon: "Wrench", description: "Fast and effective repair solutions for all types of roof damage.", image: "https://images.unsplash.com/photo-1632759145351-d3866b2151a1?w=600&h=400&fit=crop" },
  { id: "roof-replacement", title: "Roof Replacement", icon: "Hammer", description: "Complete roof replacement with modern and durable materials.", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop" },
  { id: "roof-inspection", title: "Roof Inspection", icon: "ClipboardCheck", description: "Detailed inspections to identify issues before they become costly.", image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&h=400&fit=crop" },
  { id: "gutter-installation", title: "Gutter Installation", icon: "Droplets", description: "Protect your home with our seamless gutter installation.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
  { id: "storm-damage", title: "Storm Damage Repair", icon: "CloudLightning", description: "We help restore your roof after storm damage quickly and efficiently.", image: "https://images.unsplash.com/photo-1545158539-1709d5b8f7d2?w=600&h=400&fit=crop" },
  { id: "emergency-repair", title: "Emergency Roof Repair", icon: "Zap", description: "24/7 emergency roof repair when leaks and storms can't wait.", image: "https://images.unsplash.com/photo-1568438350562-2cae6d394ad0?w=600&h=400&fit=crop" },
  { id: "siding", title: "Siding", icon: "PanelTop", description: "Durable siding installation and repair to protect and beautify your home.", image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&h=400&fit=crop" },
  { id: "commercial-roofing", title: "Commercial Roofing", icon: "Building2", description: "Reliable commercial roof installation, repair, and maintenance.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop" },
];

export const PROJECTS = [
  { id: "modern-asphalt", title: "Modern Asphalt Re-roof", category: "Residential", location: "Houston, TX", year: "2024", client: "Private Homeowner", value: "$18K", description: "Full tear-off and re-roof with architectural asphalt shingles, ice and water shield, and new flashing throughout.", image: "https://images.unsplash.com/photo-1632759145355-e9d2c00ec600?w=800&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=800&fit=crop"] },
  { id: "metal-roof-estate", title: "Standing Seam Metal Roof", category: "Residential", location: "Austin, TX", year: "2024", client: "Private Client", value: "$42K", description: "Premium 24-gauge standing seam metal roof system with concealed fasteners and matching gutters.", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop", gallery: [] },
  { id: "storm-restore", title: "Hail Storm Restoration", category: "Residential", location: "Dallas, TX", year: "2024", client: "Insurance Claim", value: "$26K", description: "Insurance-coordinated full roof replacement after severe hail event, including decking repair and gutter replacement.", image: "https://images.unsplash.com/photo-1568438350562-2cae6d394ad0?w=800&h=600&fit=crop", gallery: [] },
  { id: "commercial-flat", title: "TPO Commercial Roof", category: "Commercial", location: "Houston, TX", year: "2023", client: "Logistics Partners", value: "$185K", description: "60-mil TPO single-ply membrane replacement on a 38,000 sqft distribution warehouse with tapered insulation.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop", gallery: [] },
  { id: "cedar-shake", title: "Cedar Shake Restoration", category: "Residential", location: "The Woodlands, TX", year: "2023", client: "Private Client", value: "$58K", description: "Hand-split cedar shake replacement with new copper valleys and stainless flashing for a heritage estate.", image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&h=600&fit=crop", gallery: [] },
  { id: "gutter-system", title: "Seamless Gutter Install", category: "Residential", location: "Sugar Land, TX", year: "2023", client: "Private Homeowner", value: "$6.8K", description: "Custom seamless 6-inch aluminum gutters with leaf guards and downspout extensions around full perimeter.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", gallery: [] },
  { id: "tile-replacement", title: "Clay Tile Replacement", category: "Residential", location: "Katy, TX", year: "2022", client: "Private Client", value: "$48K", description: "Spanish clay tile replacement with new underlayment system and copper accent flashing.", image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=800&h=600&fit=crop", gallery: [] },
  { id: "office-flat", title: "Office Building Re-roof", category: "Commercial", location: "Dallas, TX", year: "2022", client: "Skyline Properties", value: "$92K", description: "Modified bitumen roof replacement on three-story office building with full insulation upgrade.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", gallery: [] },
  { id: "siding-refresh", title: "Full Home Siding", category: "Residential", location: "Pearland, TX", year: "2024", client: "Private Homeowner", value: "$32K", description: "Fiber-cement siding installation with new trim, soffits, and fascia for a refreshed exterior.", image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&h=600&fit=crop", gallery: [] },
];

export const SIGNATURE_PROJECT_COUNT = 4;
export const PROJECTS_LATEST_PAGE_SIZE = 3;

export const TEAM = [
  { id: "marcus-reid", name: "Marcus Reid", role: "Founder & Master Roofer", bio: "Two decades of roofing leadership. Founded Roofix in 2009.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "alicia-hayes", name: "Alicia Hayes", role: "Director of Operations", bio: "Runs scheduling, estimating, and the customer experience end-to-end.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "kenji-okafor", name: "Kenji Okafor", role: "Senior Project Manager", bio: "Delivered hundreds of residential re-roofs and commercial replacements.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "sara-blanco", name: "Sara Blanco", role: "Insurance Claims Lead", bio: "Helps homeowners navigate storm and hail insurance claims start to finish.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "dwight-park", name: "Dwight Park", role: "Lead Estimator", bio: "Precise material take-offs and transparent quotes on every job.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "lana-cole", name: "Lana Cole", role: "Safety Director", bio: "OSHA-certified safety leader. Owns site protocols across every crew.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Michael T.", role: "Houston, TX", quote: "Roofix did an amazing job on our new roof. The team was professional, on time, and the quality is outstanding.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop", rating: 5 },
  { name: "Sarah L.", role: "Austin, TX", quote: "Great experience from start to finish. They explained everything clearly and the results exceeded our expectations.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", rating: 5 },
  { name: "James R.", role: "Dallas, TX", quote: "Highly recommend Roofix. Honest pricing, great communication, and excellent workmanship.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop", rating: 5 },
  { name: "Diana K.", role: "Sugar Land, TX", quote: "After the storm, they handled everything with our insurance. Roof looks better than before.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop", rating: 5 },
  { name: "Carlos H.", role: "Katy, TX", quote: "Honest, reliable, and fast. They saved us thousands compared to the first quote we got.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop", rating: 5 },
];

export const BLOG_POSTS = [
  { id: "signs-new-roof", title: "5 Signs You Need a New Roof", excerpt: "How to tell whether it's time to replace your roof before bigger problems start.", date: "May 15, 2024", author: "Marcus Reid", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1632759145355-e9d2c00ec600?w=600&h=400&fit=crop", content: "Most roofs give clear warning signs long before they fail catastrophically. Curling shingles, granules in the gutters, daylight in the attic, and rising energy bills are the four most common signals it's time for a replacement.\n\nIf your roof is over 20 years old, even cosmetic damage is worth a professional inspection — small leaks compound fast in the attic deck below." },
  { id: "right-roofing-material", title: "How to Choose the Right Roofing Material", excerpt: "Asphalt, metal, tile, or cedar — picking the right system for your climate and budget.", date: "May 1, 2024", author: "Alicia Hayes", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop", content: "Architectural asphalt shingles remain the best value for most homeowners — 25-30 year warranty, broad color selection, and easy repairs. Metal roofs cost more upfront but can last 50+ years with minimal maintenance.\n\nTile and cedar are premium choices that look beautiful but require structure-rated decking and specialty installers. We walk you through each option during the free estimate." },
  { id: "spring-maintenance", title: "Spring Roof Maintenance Tips", excerpt: "The annual checklist that prevents emergency calls later in the year.", date: "April 22, 2024", author: "Kenji Okafor", category: "Maintenance", image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&h=400&fit=crop", content: "Spring is the perfect time to clear winter debris, check flashing seals, and unclog gutters before summer storms arrive. A 30-minute inspection by a homeowner — or a free professional check — can catch issues worth thousands later." },
  { id: "regular-inspections-matter", title: "Why Regular Roof Inspections Matter", excerpt: "How a small inspection schedule can extend the life of any roof by 5+ years.", date: "April 10, 2024", author: "Marcus Reid", category: "Maintenance", image: "https://images.unsplash.com/photo-1568438350562-2cae6d394ad0?w=600&h=400&fit=crop", content: "An annual or bi-annual inspection is the single best thing you can do for your roof. We document any wear, photograph problem areas, and give you a written report you can keep in your homeowner records." },
  { id: "storm-damage-claim", title: "Filing a Storm Damage Insurance Claim", excerpt: "Step-by-step guide for getting your hail or wind damage claim approved.", date: "March 28, 2024", author: "Sara Blanco", category: "Storm Damage", image: "https://images.unsplash.com/photo-1545158539-1709d5b8f7d2?w=600&h=400&fit=crop", content: "Document everything immediately after a storm: photos of the roof, the date, and any visible interior damage. Call your insurance company within 48 hours and request a professional roof inspection before any temporary repairs." },
  { id: "metal-vs-asphalt", title: "Metal vs Asphalt: Which Is Right for You?", excerpt: "An honest cost-benefit comparison from a contractor who installs both.", date: "March 5, 2024", author: "Marcus Reid", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop", content: "Asphalt wins on upfront cost — typically half the price of metal. Metal wins on longevity, energy efficiency, and resale value. Both are excellent when installed correctly." },
  { id: "gutter-importance", title: "Why Gutters Are Critical to Your Roof", excerpt: "Clogged or undersized gutters cause more roof damage than most homeowners realize.", date: "February 18, 2024", author: "Kenji Okafor", category: "Maintenance", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", content: "Water that doesn't drain off your roof goes somewhere — usually into the fascia, soffits, and eventually the attic deck. A properly sized seamless gutter system is one of the cheapest ways to protect a roof." },
];

export const STATS = [
  { value: 2500, label: "Projects Completed", suffix: "+" },
  { value: 15, label: "Years Experience", suffix: "+" },
  { value: 100, label: "Satisfied Clients", suffix: "%" },
  { value: 4.9, label: "Average Rating", suffix: "" },
];

export const FAQ_ITEMS = [
  { question: "How long does a roof installation take?", answer: "Most residential roof installations are completed in 1-3 days depending on the size and complexity of the roof. Commercial projects vary based on scope." },
  { question: "What type of roofing materials do you install?", answer: "We install asphalt shingles, standing-seam metal, clay tile, cedar shake, TPO, modified bitumen, and more. We'll recommend the right material for your home and budget during the free estimate." },
  { question: "Do you offer warranties?", answer: "Yes. All our installations carry a workmanship warranty plus the full manufacturer warranty on materials. Most premium installs qualify for a lifetime warranty." },
  { question: "Are you licensed and insured?", answer: "Absolutely. Roofix is fully licensed, bonded, and carries comprehensive general liability plus workers' compensation insurance." },
  { question: "Do you handle insurance claims?", answer: "Yes. Our claims specialists work directly with your insurance adjuster to make storm-damage claims easy and fast." },
  { question: "How do I get a free estimate?", answer: "Click any 'Get a Free Estimate' button or call us. We come out, inspect your roof, and provide a detailed written quote with no obligation." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Reviews", path: "/reviews" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Roof Installation", to: "/services/roof-installation" },
  { label: "Roof Repair", to: "/services/roof-repair" },
  { label: "Roof Replacement", to: "/services/roof-replacement" },
  { label: "Storm Damage", to: "/services/storm-damage" },
  { label: "Gutter Installation", to: "/services/gutter-installation" },
  { label: "Roof Inspection", to: "/services/roof-inspection" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const SERVICE_AREAS: string[] = [
  "Houston, TX",
  "Austin, TX",
  "Dallas, TX",
  "Sugar Land, TX",
  "Katy, TX",
  "The Woodlands, TX",
];

export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) {
    m.set(p.category, (m.get(p.category) || 0) + 1);
  }
  return [...m.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["ROOFING", "REPAIR", "MAINTENANCE", "STORM DAMAGE", "INSPECTION", "TIPS"];

export const PROJECTS_PAGE_STATS = [
  { value: "2500+", label: "Roofs Completed" },
  { value: "100%", label: "Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "Lifetime", label: "Workmanship Warranty" },
];

export const ABOUT_STATS = [
  { value: "15+", label: "Years of experience" },
  { value: "2500+", label: "Roofs completed" },
  { value: "100%", label: "Satisfaction" },
  { value: "4.9", label: "Average rating" },
];

export const CORE_VALUES = [
  {
    id: "integrity",
    title: "Integrity",
    description: "We do the right thing, always — on every job, with every customer.",
    icon: "Shield" as const,
  },
  {
    id: "quality",
    title: "Quality",
    description: "We never compromise on materials, craftsmanship, or finish.",
    icon: "Award" as const,
  },
  {
    id: "commitment",
    title: "Commitment",
    description: "We are committed to your satisfaction from estimate through warranty.",
    icon: "Handshake" as const,
  },
];

export const CERTIFICATIONS = [
  { id: "certainteed", label: "CertainTeed", sub: "Master Shingle Applicator" },
  { id: "gaf", label: "GAF", sub: "Certified Contractor" },
  { id: "iko", label: "IKO", sub: "ShieldPro Plus" },
  { id: "owens", label: "Owens Corning", sub: "Preferred Contractor" },
  { id: "velux", label: "VELUX", sub: "Skylight Specialist" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, "0"),
}));

export const FAQ_TABS = [
  { id: "projects", label: "PROJECTS" },
  { id: "pricing", label: "PRICING" },
  { id: "timeline", label: "TIMELINE" },
  { id: "process", label: "PROCESS" },
  { id: "warranty", label: "WARRANTY" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  projects: [
    { question: "What roofing projects do you take on?", answer: "Residential re-roofs, repairs, new installs, commercial flat-roof systems, gutters, siding, and storm restoration across Texas." },
    { question: "Do you handle permits?", answer: "Yes. We pull all required permits and coordinate inspections with your local authority." },
    { question: "Can you match my existing roof color?", answer: "Almost always. We carry samples from every major manufacturer and bring them to your home for a color match." },
  ],
  pricing: [
    { question: "Do you offer free estimates?", answer: "Yes. All quotes are free with no obligation. We come to your home, inspect the roof, and provide a detailed written estimate." },
    { question: "How are change orders handled?", answer: "Any change is documented and approved in writing before work proceeds. No surprise fees." },
    { question: "Do you offer financing?", answer: "Yes. We partner with several lenders to offer 0% intro and long-term payment plans for qualified homeowners." },
  ],
  timeline: [
    { question: "How long does a typical re-roof take?", answer: "Most single-family homes are completed in 1-3 days. Larger or steeper roofs take 3-5 days." },
    { question: "What about weather delays?", answer: "We monitor forecasts daily and never start a job we can't finish safely. If weather hits mid-job, we tarp and resume." },
  ],
  process: [
    { question: "How does your process work?", answer: "Free inspection → detailed written estimate → schedule → installation → final walkthrough and clean-up. Simple, transparent, no surprises." },
    { question: "How often will I get updates?", answer: "Daily during installation, plus before-and-after photos of every job." },
  ],
  warranty: [
    { question: "What warranties do you offer?", answer: "Manufacturer warranties on materials (up to lifetime), plus our own workmanship warranty on the installation." },
    { question: "Who do I call after the job?", answer: "Our office — same team that installed your roof. We handle warranty calls in-house, not through a call center." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "We offer a full range of roofing services to meet your needs — from quick repairs to full replacements, storm restoration, and commercial systems.";

export const COMMERCIAL_FITOUT_CARDS = [
  {
    id: "fast",
    title: "Fast Turnaround",
    description: "Most residential roofs installed in 1-3 days from start to clean-up.",
    icon: "Zap" as const,
  },
  {
    id: "materials",
    title: "Top-Grade Materials",
    description: "Manufacturer-certified products with full warranty coverage.",
    icon: "Package" as const,
  },
  {
    id: "docs",
    title: "Detailed Documentation",
    description: "Before-and-after photos, warranty docs, and insurance paperwork delivered.",
    icon: "FileText" as const,
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
    id: "roof-installation",
    category: "ROOFING",
    title: "Roof Installation",
    subtitle: "ASPHALT · METAL · TILE · CEDAR",
    body: [
      "Professional roof installation using top-quality materials and expert craftsmanship to ensure a durable and beautiful roof for your home for years to come.",
      "Every installation includes ice-and-water shield, synthetic underlayment, premium starter strip, ridge venting, and new flashing throughout.",
    ],
    image: "https://images.unsplash.com/photo-1632759145355-e9d2c00ec600?w=900&h=700&fit=crop",
    inclusions: [
      "High-Quality Materials",
      "Expert Installation",
      "Clean & Safe Worksite",
      "Warrantied Workmanship",
      "Final Inspection",
      "Lifetime Workmanship Warranty",
    ],
  },
  {
    id: "roof-repair",
    category: "ROOFING",
    title: "Roof Repair",
    subtitle: "LEAK REPAIR · FLASHING · SHINGLE REPLACEMENT",
    body: [
      "Fast, effective roof repair for leaks, missing shingles, flashing failures, and storm damage. Most repairs completed same-day or next-day.",
      "We diagnose the root cause — not just patch symptoms — so the fix lasts. Every repair is photographed and warrantied.",
    ],
    image: "https://images.unsplash.com/photo-1632759145351-d3866b2151a1?w=900&h=700&fit=crop",
    inclusions: [
      "Same-day diagnosis",
      "Leak root-cause repair",
      "Flashing & boot replacement",
      "Shingle matching",
      "Photo documentation",
      "Workmanship warranty",
    ],
  },
  {
    id: "storm-damage",
    category: "STORM RESTORATION",
    title: "Storm Damage Repair",
    subtitle: "HAIL · WIND · INSURANCE CLAIM SUPPORT",
    body: [
      "Hail and wind damage rarely stops at the surface. We inspect underlayment, decking, gutters, and ventilation — then build a documented scope your insurance can approve quickly.",
      "Our claims specialists work directly with your adjuster to make the process easy.",
    ],
    image: "https://images.unsplash.com/photo-1545158539-1709d5b8f7d2?w=900&h=700&fit=crop",
    inclusions: [
      "Free storm inspection",
      "Insurance claim support",
      "Adjuster meeting attendance",
      "Emergency tarping",
      "Full replacement coordination",
      "Final walkthrough",
    ],
  },
];

export const LEAD_FORM = {
  title: "Get a Free Estimate",
  eyebrow: "LET'S PROTECT YOUR HOME",
  description:
    "Get a free estimate from our roofing experts. We respond within one business day with next steps.",
  bullets: [
    "Free inspection",
    "Detailed written estimate",
    "No obligation",
    "Insurance claim support",
  ],
  primaryCta: "GET A FREE ESTIMATE",
  secondaryCta: "CALL NOW",
};
