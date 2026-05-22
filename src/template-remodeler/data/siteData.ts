/**
 * Crestline Home Remodeling — content registry.
 * IA inspired by Magnolia Home Remodeling (structure & tone only); visual design is original.
 * All image IDs verified HTTP 200 on images.unsplash.com.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const REMODELER_IMAGES = {
  heroHome: u("1771366260867-7e07094579d7", 1600, 1200),
  heroPortfolio: u("1545324418-cc1a3fa10c00", 1920, 1080),
  heroProcess: u("1504307651254-35680f356dfd", 1920, 1080),
  heroVideo: u("1497366216548-37526070297c", 1400, 900),
  crewWorking: u("1504307651254-35680f356dfd", 1200, 900),
  kitchenRemodel: u("1697609996790-f00fe4568e1d", 1200, 900),
  bathRemodel: u("1632120377007-c2adc3017b1e", 1200, 900),
  basementFinish: u("1600210491892-03d54c0aaf87", 1200, 900),
  wholeHomeRemodel: u("1545324418-cc1a3fa10c00", 1200, 900),
  sidingInstall: u("1560518883-ce09059eeffa", 1200, 900),
  windowsDoors: u("1558618666-fcd25c85cd64", 1200, 900),
  roofing: u("1621905252507-b35492cc74b4", 1200, 900),
  deckOutdoor: u("1773161960049-3ec16360da87", 1200, 900),
  homeAddition: u("1565008576549-57569a49371d", 1200, 900),
  patioWalkway: u("1600585154340-be6161a56a0c", 1200, 900),
  porchSteps: u("1779226347538-ca1a725ae550", 1200, 900),
  masonryPaving: u("1613490493576-7fde63acd811", 1200, 900),
  interiorTrim: u("1631679706909-1844bbd07221", 1200, 900),
  generalContractor: u("1486325212027-8081e485255e", 1200, 900),
  beforeHome: u("1763687694954-11d4fc83fbba", 900, 700),
  afterHome: u("1612296350607-076d142d15cd", 900, 700),
  beforeKitchen: u("1738130892621-ea936f363089", 900, 700),
  afterKitchen: u("1697609996790-f00fe4568e1d", 900, 700),
  beforeBath: u("1632693810905-ce553d94e9c0", 900, 700),
  afterBath: u("1632120377007-c2adc3017b1e", 900, 700),
  galleryA: u("1613490493576-7fde63acd811", 800, 1000),
  galleryB: u("1600585154340-be6161a56a0c", 800, 600),
  galleryC: u("1773161960049-3ec16360da87", 800, 600),
  galleryD: u("1621905252507-b35492cc74b4", 800, 600),
  galleryE: u("1558618666-fcd25c85cd64", 800, 600),
  galleryF: u("1560518883-ce09059eeffa", 800, 600),
  leadMagnet: u("1454165804606-c3d57bc86b40", 1200, 900),
  materialsBand: u("1697609996790-f00fe4568e1d", 1200, 600),
  team: u("1504307651254-35680f356dfd", 1200, 900),
  contactHero: u("1771366260867-7e07094579d7", 1400, 900),
  aboutHero: u("1497366216548-37526070297c", 1400, 900),
  aboutCrew: u("1504307651254-35680f356dfd", 1200, 900),
  reviewsHero: u("1631679706909-1844bbd07221", 1400, 900),
  processHero: u("1503387762-592deb58ef4e", 1400, 900),
  blogHero: u("1454165804606-c3d57bc86b40", 1400, 900),
  financing: u("1486325212027-8081e485255e", 1200, 800),
  resourcesHero: u("1454165804606-c3d57bc86b40", 1400, 900),
  avatarA: u("1544005313-94ddf0286df2", 120, 120),
  avatarB: u("1519345182560-3f2917c472ef", 120, 120),
  avatarC: u("1612349317150-e413f6a5b16d", 120, 120),
  avatarD: u("1506794778202-cad84cf45f1d", 80, 80),
  avatarE: u("1544005313-94ddf0286df2", 80, 80),
  avatarF: u("1519345182560-3f2917c472ef", 80, 80),
  avatarG: u("1612349317150-e413f6a5b16d", 300, 300),
} as const;

export const COMPANY = {
  name: "Crestline Home Remodeling",
  legalName: "Crestline Home Remodeling LLC",
  tagline:
    "Family-owned New Jersey home improvement contractor — interior & exterior remodeling, affordable options, and full-service general contracting for 30+ years.",
  phone: "(855) 555-0198",
  email: "hello@crestlineremodeling.com",
  address: "245 Morris Avenue, Union, NJ 07083",
  hours: "Mon–Fri 7:30am–6pm · Sat 9am–2pm",
  license: "NJ HIC #13VH09845210 · Fully Insured",
  fax: "",
};

export const SITE_TOP = {
  line: "2026 Home Remodeling Guide — Download our free planning catalog",
  badges: ["Licensed & Insured", "Family-Owned", "Angi Super Service Award"],
  ratingValue: "4.9",
  ratingCount: "320+",
  ratingLabel: "Verified Reviews",
  locations: "Essex · Bergen · Morris · Middlesex · Union · Somerset · Hudson · Passaic · Warren · Sussex · Hunterdon",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:30 AM – 6:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { days: "Sunday", hours: "Closed" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.35%2C40.65%2C-74.20%2C40.72&layer=mapnik&marker=40.697,-74.263";

export const HOME_HERO = {
  eyebrow: "NEW JERSEY'S PREMIER HOME IMPROVEMENT CONTRACTOR",
  headlineBefore: "NJ's Premier Home",
  headlineHighlight: "Improvement Contractor",
  headlineAfter: "",
  body:
    "Crestline is a family-owned remodeling company with 30+ years transforming kitchens, baths, basements, and exteriors across North & Central Jersey — fully insured, award-winning service, and free estimates on every project.",
  primaryCta: { label: "Get a Free Estimate", to: "/contact" },
  secondaryCta: { label: "View Portfolio", to: "/projects" },
  image: REMODELER_IMAGES.heroHome,
  trustPills: [
    { label: "30+ Years Local", sub: "Family-owned since 1994", icon: "Award" as const },
    { label: "Fully Insured GC", sub: "Licensed home improvement", icon: "ShieldCheck" as const },
    { label: "Free Estimates", sub: "Interior & exterior scopes", icon: "CheckCircle" as const },
  ],
  ratingQuote:
    "Trusted across Essex, Bergen, Morris, and Union counties for kitchen, bath, siding, roofing, and whole-home remodeling.",
  ratingCard: {
    score: "4.9",
    countLabel: "320+ verified homeowner reviews",
    avatars: [
      REMODELER_IMAGES.avatarD,
      REMODELER_IMAGES.avatarE,
      REMODELER_IMAGES.avatarF,
      REMODELER_IMAGES.avatarA,
    ],
  },
  featuredEyebrow: "FREE ESTIMATE",
  featuredTitle: "Start Your Remodel",
  featuredMeta: "Kitchen · Bath · Siding · Roofing · Additions",
};

export const SERVICES_RIBBON = [
  { id: "kitchen-remodeling", label: "KITCHENS", icon: "ChefHat" as const, description: "Cabinetry & layouts.", to: "/services/kitchen-remodeling" },
  { id: "bathroom-remodeling", label: "BATHS", icon: "Bath" as const, description: "Spa & primary suites.", to: "/services/bathroom-remodeling" },
  { id: "roofing-services", label: "ROOFING", icon: "Home" as const, description: "Shingle & flat roofs.", to: "/services/roofing-services" },
  { id: "siding-installation", label: "SIDING", icon: "Layers" as const, description: "Vinyl & fiber cement.", to: "/services/siding-installation" },
  { id: "general-contractor", label: "GENERAL CONTRACTOR", icon: "Hammer" as const, description: "Full-service GC.", to: "/services/general-contractor" },
];

export const CAPABILITIES = [
  { id: "kitchen", title: "Kitchen Remodeling", description: "Layouts, cabinetry, surfaces, and lighting for the heart of your home.", icon: "ChefHat" as const, to: "/services/kitchen-remodeling" },
  { id: "bath", title: "Bathroom Remodeling", description: "Primary suites, guest baths, and accessible updates with premium fixtures.", icon: "Bath" as const, to: "/services/bathroom-remodeling" },
  { id: "exterior", title: "Siding & Roofing", description: "Curb appeal, weather protection, and energy-efficient exteriors.", icon: "Home" as const, to: "/services/siding-installation" },
  { id: "additions", title: "Additions & Decks", description: "More living space with additions, dormers, decks, and porches.", icon: "Plus" as const, to: "/services/additions-dormers" },
];

export const PROCESS_STEPS = [
  { id: "consult", label: "Consultation", description: "On-site walkthrough, goals, budget range, and timeline discussion." },
  { id: "partnership", label: "Partnership Agreement", description: "Written scope, allowances, and a clear contract before design is finalized." },
  { id: "design", label: "Finalize Plan", description: "Selections, drawings, permits, and a locked construction schedule." },
  { id: "prep", label: "Preparation", description: "Material ordering, site protection, and neighbor-friendly logistics." },
  { id: "build", label: "Implementation", description: "Licensed crews, daily communication, and quality checkpoints." },
  { id: "complete", label: "Completion", description: "Walkthrough, punch list, warranty paperwork, and care instructions." },
];

export const HOME_STATS = [
  { value: "30+", label: "Years in NJ", icon: "Award" as const },
  { value: "2,400+", label: "Projects Completed", icon: "Home" as const },
  { value: "11", label: "Counties Served", icon: "MapPin" as const },
  { value: "4.9", label: "Average Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  { title: "Top-Rated NJ Contractor", description: "Angi Super Service Award–style trust built on decades of five-star homeowner feedback.", icon: "Award" as const },
  { title: "Family-Owned & Local", description: "Second-generation leadership with superintendents who live in the communities we serve.", icon: "Heart" as const },
  { title: "Affordable Options", description: "Good-better-best selections and phased scopes that respect your budget.", icon: "Tag" as const },
  { title: "Full-Service GC", description: "One team for kitchens, baths, basements, siding, roofing, decks, and additions.", icon: "Hammer" as const },
  { title: "Fully Insured", description: "NJ HIC license, liability, and workers' compensation on every job.", icon: "ShieldCheck" as const },
  { title: "Free Estimates", description: "No-pressure proposals with clear line items — call or submit the form anytime.", icon: "CheckCircle" as const },
];

const SERVICE_LIST = [
  { id: "kitchen-remodeling", title: "Kitchen Remodeling", icon: "ChefHat", description: "Custom cabinetry, islands, surfaces, lighting, and ventilation for everyday living.", image: REMODELER_IMAGES.kitchenRemodel },
  { id: "bathroom-remodeling", title: "Bathroom Remodeling", icon: "Bath", description: "Walk-in showers, vanities, tile, and accessibility upgrades with designer guidance.", image: REMODELER_IMAGES.bathRemodel },
  { id: "basement-remodeling", title: "Basement Remodeling", icon: "Layers", description: "Finished basements with moisture control, egress, and entertainment layouts.", image: REMODELER_IMAGES.basementFinish },
  { id: "whole-home-remodeling", title: "Home Remodeling", icon: "Home", description: "Phased whole-home updates for occupied residences across North & Central Jersey.", image: REMODELER_IMAGES.wholeHomeRemodel },
  { id: "siding-installation", title: "Siding Installation", icon: "Layers", description: "Vinyl, fiber cement, and trim packages that refresh curb appeal and performance.", image: REMODELER_IMAGES.sidingInstall },
  { id: "replacement-windows-doors", title: "Replacement Windows & Doors", icon: "Square", description: "Energy-efficient windows, patio doors, and entry systems with proper flashing.", image: REMODELER_IMAGES.windowsDoors },
  { id: "roofing-services", title: "Roofing Services", icon: "Home", description: "Asphalt, flat, and repair scopes with ventilation and ice-and-water shield.", image: REMODELER_IMAGES.roofing },
  { id: "decks-wood-composite", title: "Decks (Wood & Composite)", icon: "Sun", description: "Ground-level and elevated decks with railings, lighting, and low-maintenance options.", image: REMODELER_IMAGES.deckOutdoor },
  { id: "additions-dormers", title: "Additions & Dormers", icon: "Plus", description: "Expand living space with second stories, dormers, and rear additions.", image: REMODELER_IMAGES.homeAddition },
  { id: "patios-walkways", title: "Patios & Walkways", icon: "MapPin", description: "Concrete, pavers, and stone walkways that connect indoor-outdoor living.", image: REMODELER_IMAGES.patioWalkway },
  { id: "porches-steps", title: "Porches & Steps", icon: "Home", description: "Front porches, stoops, and railings built to NJ code with lasting materials.", image: REMODELER_IMAGES.porchSteps },
  { id: "masonry-paving", title: "Masonry & Paving", icon: "Hammer", description: "Retaining walls, stone veneer, and hardscape accents for NJ homes.", image: REMODELER_IMAGES.masonryPaving },
  { id: "interior-remodeling-trim", title: "Interior Remodeling & Trim", icon: "Ruler", description: "Millwork, built-ins, flooring, and paint-ready finish carpentry.", image: REMODELER_IMAGES.interiorTrim },
  { id: "general-contractor", title: "General Contractor", icon: "Hammer", description: "Full-service home improvement coordination — one contract, one team.", image: REMODELER_IMAGES.generalContractor },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const HOME_TRANSFORMATIONS = [
  { id: "union-kitchen", title: "Open Concept Kitchen", location: "Union, NJ", category: "Kitchen", serviceId: "kitchen-remodeling", description: "Wall removal, quartz island, and custom shaker cabinetry.", beforeImage: REMODELER_IMAGES.beforeKitchen, afterImage: REMODELER_IMAGES.afterKitchen },
  { id: "montclair-bath", title: "Primary Bath Suite", location: "Montclair, NJ", category: "Bath", serviceId: "bathroom-remodeling", description: "Walk-in shower, heated floors, and double vanity.", beforeImage: REMODELER_IMAGES.beforeBath, afterImage: REMODELER_IMAGES.afterBath },
  { id: "westfield-exterior", title: "Siding & Window Refresh", location: "Westfield, NJ", category: "Exterior", serviceId: "siding-installation", description: "Fiber cement siding with new Andersen-style windows.", beforeImage: REMODELER_IMAGES.beforeHome, afterImage: REMODELER_IMAGES.afterHome },
  { id: "morristown-basement", title: "Basement Media Room", location: "Morristown, NJ", category: "Basement", serviceId: "basement-remodeling", description: "Finished lower level with bar, egress, and LVT flooring.", beforeImage: REMODELER_IMAGES.beforeHome, afterImage: REMODELER_IMAGES.basementFinish },
];

export const BEFORE_AFTER_PROJECTS = HOME_TRANSFORMATIONS.map(p => ({ ...p }));

const EXTRA_PROJECTS = [
  { id: "ridgewood-addition", title: "Two-Story Addition", category: "Addition", serviceId: "additions-dormers", location: "Ridgewood, NJ", image: REMODELER_IMAGES.homeAddition },
  { id: "summit-deck", title: "Composite Deck & Pergola", category: "Outdoor", serviceId: "decks-wood-composite", location: "Summit, NJ", image: REMODELER_IMAGES.deckOutdoor },
  { id: "edison-roof", title: "Architectural Shingle Roof", category: "Roofing", serviceId: "roofing-services", location: "Edison, NJ", image: REMODELER_IMAGES.roofing },
  { id: "paramus-siding", title: "Full Siding Replacement", category: "Siding & Windows", serviceId: "siding-installation", location: "Paramus, NJ", image: REMODELER_IMAGES.sidingInstall },
  { id: "princeton-whole", title: "Whole-Home Refresh", category: "Before & After", serviceId: "whole-home-remodeling", location: "Princeton, NJ", image: REMODELER_IMAGES.wholeHomeRemodel },
  { id: "hoboken-kitchen", title: "Urban Kitchen Remodel", category: "Kitchen", serviceId: "kitchen-remodeling", location: "Hoboken, NJ", image: REMODELER_IMAGES.kitchenRemodel },
  { id: "bridgewater-patio", title: "Paver Patio & Walkway", category: "Outdoor", serviceId: "patios-walkways", location: "Bridgewater, NJ", image: REMODELER_IMAGES.patioWalkway },
  { id: "warren-porch", title: "Front Porch Rebuild", category: "Exterior", serviceId: "porches-steps", location: "Warren, NJ", image: REMODELER_IMAGES.porchSteps },
] as const;

export const PROJECTS = [
  ...BEFORE_AFTER_PROJECTS.map((p, i) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    serviceId: p.serviceId,
    location: p.location,
    year: "2025",
    client: "Private Homeowner",
    value: "—",
    description: `${p.title} — ${p.location}. Completed by Crestline Home Remodeling.`,
    image: p.afterImage,
    gallery: [p.beforeImage, p.afterImage, REMODELER_IMAGES.galleryA, REMODELER_IMAGES.galleryB],
    beforeImage: p.beforeImage,
    afterImage: p.afterImage,
    number: i + 1,
  })),
  ...EXTRA_PROJECTS.map((p, i) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    serviceId: p.serviceId,
    location: p.location,
    year: "2024",
    client: "Private Homeowner",
    value: "—",
    description: `${p.title} — ${p.location}. Remodeling by Crestline.`,
    image: p.image,
    gallery: [p.image, REMODELER_IMAGES.galleryC, REMODELER_IMAGES.galleryD],
    beforeImage: p.image,
    afterImage: p.image,
    number: BEFORE_AFTER_PROJECTS.length + i + 1,
  })),
];

export const PORTFOLIO_FILTERS = [
  "All",
  "Before & After",
  "Kitchen",
  "Bath",
  "Exterior",
  "Basement",
  "Addition",
  "Outdoor",
  "Roofing",
  "Siding & Windows",
] as const;

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 6;

export const TEAM = [
  { id: "michael-crest", name: "Michael Crest", role: "Owner & Lead Estimator", bio: "30+ years leading kitchen, bath, and exterior remodels across New Jersey.", image: REMODELER_IMAGES.avatarG, social: { linkedin: "#", twitter: "#" } },
  { id: "sarah-linden", name: "Sarah Linden", role: "Production Manager", bio: "Coordinates crews, permits, and homeowner updates from demo through punch list.", image: REMODELER_IMAGES.avatarB, social: { linkedin: "#", twitter: "#" } },
  { id: "james-ortiz", name: "James Ortiz", role: "Exterior Division Lead", bio: "Roofing, siding, and window scopes with manufacturer-certified installs.", image: REMODELER_IMAGES.avatarC, social: { linkedin: "#", twitter: "#" } },
  { id: "lisa-park", name: "Lisa Park", role: "Interior Design Liaison", bio: "Guides selections for kitchens, baths, and finish packages.", image: REMODELER_IMAGES.avatarA, social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Karen M.", role: "Westfield, NJ", quote: "Crestline remodeled our kitchen and two baths — on schedule, on budget, and spotless job sites every day.", avatar: REMODELER_IMAGES.avatarA, rating: 5 },
  { name: "David R.", role: "Montclair, NJ", quote: "They handled siding, windows, and a new deck as one project. Communication was excellent from estimate to final walkthrough.", avatar: REMODELER_IMAGES.avatarB, rating: 5 },
  { name: "Angela S.", role: "Morristown, NJ", quote: "Our basement finish looks like it was always part of the house. The crew was respectful and professional.", avatar: REMODELER_IMAGES.avatarC, rating: 5 },
  { name: "Tom B.", role: "Union, NJ", quote: "Free estimate was detailed and honest. No surprise change orders — exactly what we needed for our addition.", avatar: REMODELER_IMAGES.avatarA, rating: 5 },
  { name: "Jennifer L.", role: "Summit, NJ", quote: "Top-rated for a reason. They earned our trust on a whole-home remodel and we have already referred neighbors.", avatar: REMODELER_IMAGES.avatarB, rating: 5 },
  { name: "Robert P.", role: "Edison, NJ", quote: "Roof and gutters done in three days with great cleanup. Toll-free line made scheduling easy.", avatar: REMODELER_IMAGES.avatarC, rating: 5 },
];

export const REVIEW_PLATFORMS = [
  "Google Reviews",
  "Angi",
  "Houzz",
  "Facebook",
  "Home Advisor",
  "Yelp",
];

export const BLOG_POSTS = [
  { id: "kitchen-guide-2026", title: "2026 Kitchen Remodeling Guide for NJ Homeowners", excerpt: "Layouts, budgets, and timelines for North Jersey kitchens.", date: "April 8, 2026", author: "Lisa Park", category: "Kitchen", image: REMODELER_IMAGES.kitchenRemodel, content: "How Crestline phases kitchen remodels in occupied homes." },
  { id: "bath-planning", title: "Primary Bath Planning: What to Decide First", excerpt: "Shower size, tile, and ventilation basics.", date: "March 14, 2026", author: "Sarah Linden", category: "Bath", image: REMODELER_IMAGES.bathRemodel, content: "A practical checklist before demolition day." },
  { id: "siding-options", title: "Siding Options for NJ Climate", excerpt: "Vinyl vs fiber cement in freeze-thaw zones.", date: "February 22, 2026", author: "James Ortiz", category: "Siding", image: REMODELER_IMAGES.sidingInstall, content: "Durability and maintenance considerations." },
  { id: "financing-remodel", title: "Financing a Home Remodel in New Jersey", excerpt: "HELOCs, personal loans, and contractor payment schedules.", date: "January 30, 2026", author: "Michael Crest", category: "Resources", image: REMODELER_IMAGES.financing, content: "Understanding draws and milestone billing." },
  { id: "basement-egress", title: "Basement Egress & Code Basics", excerpt: "When you need permits and emergency exits.", date: "December 12, 2025", author: "Sarah Linden", category: "Basement", image: REMODELER_IMAGES.basementFinish, content: "NJ requirements for finished lower levels." },
  { id: "roof-maintenance", title: "When to Repair vs Replace Your Roof", excerpt: "Signs it's time for a full tear-off.", date: "November 5, 2025", author: "James Ortiz", category: "Roofing", image: REMODELER_IMAGES.roofing, content: "Inspection tips before winter storms." },
];

export const STATS = [
  { value: 2400, label: "Projects Completed", suffix: "+" },
  { value: 30, label: "Years Experience", suffix: "+" },
  { value: 320, label: "5-Star Reviews", suffix: "+" },
  { value: 11, label: "Counties Served", suffix: "" },
];

export const FAQ_ITEMS = [
  { question: "Do you offer free estimates?", answer: "Yes — complimentary on-site or virtual estimates with written scope within a few business days." },
  { question: "Are you licensed and insured?", answer: "NJ HIC licensed with full liability and workers' compensation on every Crestline crew." },
  { question: "What areas do you serve?", answer: "Essex, Sussex, Morris, Middlesex, Passaic, Warren, Hudson, Union, Bergen, Hunterdon, and Somerset counties." },
  { question: "Can we live in the home during a remodel?", answer: "Often yes — we phase kitchen, bath, and interior work to keep essential spaces usable." },
  { question: "Do you offer financing?", answer: "We coordinate with partner lenders and explain milestone billing on every proposal." },
  { question: "How long does a kitchen remodel take?", answer: "Typically 6–10 weeks after materials arrive, depending on layout changes and permits." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Resources", path: "/resources" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Financing", path: "/financing" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Kitchen Remodeling", to: "/services/kitchen-remodeling" },
  { label: "Bathroom Remodeling", to: "/services/bathroom-remodeling" },
  { label: "Basement Remodeling", to: "/services/basement-remodeling" },
  { label: "Siding Installation", to: "/services/siding-installation" },
  { label: "Roofing Services", to: "/services/roofing-services" },
  { label: "General Contractor", to: "/services/general-contractor" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Portfolio", to: "/projects" },
  { label: "Before & After", to: "/projects?filter=Before%20%26%20After" },
  { label: "Our Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "Reviews", to: "/reviews" },
  { label: "Resources", to: "/resources" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Free Estimate", to: "/contact" },
  { label: "Remodeling Guide", to: "/resources" },
  { label: "Financing", to: "/financing" },
];

export const SERVICE_AREAS = [
  "Union, NJ", "Westfield, NJ", "Summit, NJ", "Montclair, NJ", "Morristown, NJ",
  "Edison, NJ", "Paramus, NJ", "Princeton, NJ", "Hoboken, NJ", "Bridgewater, NJ",
  "Ridgewood, NJ", "Warren, NJ",
];

export const SERVICE_AREA_COUNTIES: { county: string; towns: string[] }[] = [
  { county: "Essex County", towns: ["Newark", "Montclair", "West Orange", "Millburn", "Livingston", "Maplewood", "Bloomfield"] },
  { county: "Bergen County", towns: ["Paramus", "Ridgewood", "Hackensack", "Fort Lee", "Teaneck", "Englewood", "Mahwah"] },
  { county: "Morris County", towns: ["Morristown", "Madison", "Denville", "Randolph", "Chatham", "Parsippany", "Rockaway"] },
  { county: "Middlesex County", towns: ["Edison", "Woodbridge", "New Brunswick", "East Brunswick", "Metuchen", "Monroe", "South Plainfield"] },
  { county: "Union County", towns: ["Union", "Westfield", "Summit", "Cranford", "Scotch Plains", "Elizabeth", "Springfield"] },
  { county: "Somerset County", towns: ["Bridgewater", "Bernardsville", "Basking Ridge", "Somerville", "Hillsborough", "Franklin", "Warren"] },
  { county: "Hudson County", towns: ["Hoboken", "Jersey City", "Bayonne", "Union City", "Secaucus", "Weehawken"] },
  { county: "Passaic County", towns: ["Wayne", "Clifton", "Paterson", "Little Falls", "Woodland Park", "Passaic"] },
  { county: "Warren County", towns: ["Phillipsburg", "Hackettstown", "Washington", "Belvidere", "Oxford"] },
  { county: "Sussex County", towns: ["Newton", "Sparta", "Hopatcong", "Vernon", "Andover"] },
  { county: "Hunterdon County", towns: ["Flemington", "Clinton", "Lambertville", "Readington", "Lebanon", "Califon"] },
];

export const BLOG_LIST_PAGE_SIZE = 3;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["KITCHEN", "BATH", "SIDING", "ROOFING", "BASEMENT", "RESOURCES"];

export const PROJECTS_PAGE_STATS = [
  { value: "2,400+", label: "Projects Completed" },
  { value: "30+", label: "Years Experience" },
  { value: "Before & After", label: "Gallery Focus" },
  { value: "4.9", label: "Average Rating" },
];

export const ABOUT_STATS = [
  { value: "30+", label: "Years in New Jersey" },
  { value: "2,400+", label: "Projects Completed" },
  { value: "Family-Owned", label: "Since 1994" },
  { value: "320+", label: "5-Star Reviews" },
  { value: "11", label: "Counties Served" },
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
  { id: "award", label: "Angi Super Service", sub: "Top-rated local contractor" },
  { id: "reviews", label: "4.9 Average Rating", sub: "320+ verified reviews" },
  { id: "local", label: "Family-Owned", sub: "Second generation since 1994" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "kitchen", label: "KITCHEN & BATH" },
  { id: "exterior", label: "EXTERIOR" },
  { id: "process", label: "PROCESS" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  kitchen: [
    { question: "How long does a bath remodel take?", answer: "Most primary baths take 3–5 weeks once materials are on site." },
    { question: "Do you help with selections?", answer: "Yes — our design liaison guides tile, fixtures, and cabinetry packages." },
    { question: "Can you reconfigure plumbing walls?", answer: "We coordinate licensed plumbers for layout changes and permits." },
  ],
  exterior: [
    { question: "Do you install both roofing and siding?", answer: "Yes — exterior scopes can be combined for one schedule and warranty." },
    { question: "What window brands do you offer?", answer: "We install leading vinyl and wood-clad lines with proper flashing details." },
    { question: "Are decks permitted in my town?", answer: "We handle municipal submissions for decks, porches, and additions." },
  ],
  process: [
    { question: "What is your payment schedule?", answer: "Milestone draws tied to inspection-ready progress — outlined in your contract." },
    { question: "Who is my project contact?", answer: "A dedicated production manager from estimate through walkthrough." },
    { question: "Do you warranty your work?", answer: "Yes — written workmanship warranty at completion." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Interior and exterior remodeling across New Jersey — kitchens, baths, basements, siding, roofing, decks, and full-service general contracting with free estimates.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "budget", title: "Need a Clear Budget?", description: "Good-better-best options before you commit to selections.", icon: "Tag" as const },
  { id: "timeline", title: "Tight Timeline?", description: "Phased scopes for occupied homes and seasonal exterior work.", icon: "Clock" as const },
  { id: "exterior", title: "Exterior Package?", description: "Combine roof, siding, and windows for one crew schedule.", icon: "Home" as const },
  { id: "estimate", title: "Free Estimate", description: "On-site walkthrough with written scope in days.", icon: "CheckCircle" as const },
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
  category: "HOME REMODELING",
  title: s.title,
  subtitle: "LICENSED CREWS · PREMIUM MATERIALS",
  body: [
    `${s.description} Crestline delivers documented scopes, protected job sites, and production managers who communicate daily.`,
    "Every project includes transparent allowances, selection support, and a satisfaction-backed walkthrough.",
  ],
  image: s.image,
  inclusions: [
    "Free on-site estimate",
    "Written scope & timeline",
    "Licensed & insured crews",
    "Premium material options",
    "Daily progress updates",
    "Warranty at completion",
  ],
}));

export const LEAD_FORM = {
  title: "Get a Free Estimate",
  description: "Tell us about your project — we respond within one business day.",
  bullets: [
    "Complimentary on-site estimates",
    "Interior & exterior scopes",
    "Licensed NJ home improvement contractor",
    "Family-owned · 30+ years local",
  ],
};

export const LEAD_MAGNET = {
  title: "2026 Home Remodeling Guide",
  subtitle: "Kitchen layouts, bath planning, siding choices, budgeting, and what to expect during construction.",
  cta: { label: "Download Guide", to: "/resources" },
  image: REMODELER_IMAGES.leadMagnet,
};

export const MATERIAL_BRANDS = [
  "Cabinetry & Countertops",
  "Tile & Stone",
  "Roofing Systems",
  "Siding & Trim",
  "Windows & Doors",
  "Decking & Railings",
];

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
  "On-site consultation",
  "Written scope",
  "Budget ranges",
  "Timeline & phasing",
  "Permit requirements",
  "Selection milestones",
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NJ HIC with full coverage.", icon: "ShieldCheck" as const },
  { id: "local", title: "Family-Owned", description: "30+ years in New Jersey.", icon: "Heart" as const },
  { id: "estimate", title: "Free Estimates", description: "No-pressure proposals.", icon: "CheckCircle" as const },
  { id: "honest", title: "Transparent Pricing", description: "Line-item scopes.", icon: "Tag" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "years", title: "30+ Years Local", icon: "Award" as const },
  { id: "licensed", title: "NJ HIC Licensed", icon: "ShieldCheck" as const },
  { id: "family", title: "Family-Owned", icon: "Heart" as const },
  { id: "projects", title: "2,400+ Projects", icon: "Home" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "FINANCING",
  title: "Affordable Remodeling Options",
  subtitle: "Partner lenders, HELOC guidance, and milestone billing explained.",
  body: "Crestline helps you understand payment schedules and financing paths before demolition day — no surprises.",
  image: REMODELER_IMAGES.financing,
  benefits: ["Construction loan partners", "Milestone draw schedules", "Allowance transparency", "Written contracts"],
  cta: { label: "Discuss Financing", to: "/contact" },
};

export const HERO_PROMO_BANNERS = [
  { id: "guide", title: LEAD_MAGNET.title, subtitle: LEAD_MAGNET.subtitle, cta: LEAD_MAGNET.cta, image: LEAD_MAGNET.image },
  { id: "portfolio", title: "Before & After Gallery", subtitle: "Kitchen, bath, exterior, and addition transformations", cta: { label: "View Gallery", to: "/projects?filter=Before%20%26%20After" }, image: REMODELER_IMAGES.heroPortfolio },
  { id: "process", title: "Our 6-Step Process", subtitle: "Consultation through completion walkthrough", cta: { label: "Learn More", to: "/process" }, image: REMODELER_IMAGES.heroProcess },
] as const;

export const SERVICE_CATEGORY_TABS = [
  { id: "interior", label: "Interior", items: ["Kitchen layouts", "Bath & tile", "Basement finishing", "Trim & built-ins", "Flooring", "Lighting plans"], image: REMODELER_IMAGES.kitchenRemodel, to: "/services/kitchen-remodeling" },
  { id: "exterior", label: "Exterior", items: ["Roof replacement", "Siding packages", "Windows & doors", "Decks & porches", "Patios", "Masonry accents"], image: REMODELER_IMAGES.sidingInstall, to: "/services/siding-installation" },
  { id: "full", label: "Full Service", items: ["General contractor", "Additions", "Whole-home remodel", "Permits", "Inspections", "Warranty"], image: REMODELER_IMAGES.generalContractor, to: "/services/general-contractor" },
] as const;

export const VIDEO_STORY = {
  eyebrow: "30+ YEARS IN NEW JERSEY",
  title: "Transforming NJ Homes for Three Decades",
  body: "From kitchen refreshes to full exterior makeovers, Crestline has helped thousands of families love where they live — with honest estimates and crews who treat your home like their own.",
  cta: { label: "Watch Our Story", to: "/about" },
  image: REMODELER_IMAGES.heroVideo,
};

export const META_DEFAULT =
  "New Jersey home remodeling contractor — kitchens, baths, basements, siding, roofing, decks, and general contracting. Free estimates.";
