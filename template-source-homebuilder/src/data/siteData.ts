/**
 * HARBORSTONE DESIGN-BUILD — content registry.
 * IA inspired by GTG Custom Home Builders; visual system is unique (charcoal + bronze, Josefin + Karla).
 * All image IDs verified HTTP 200 on images.unsplash.com (searched by topic on unsplash.com).
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const HOME_BUILDER_IMAGES = {
  /** unsplash: modern white custom home exterior */
  heroHome: u("1771366260867-7e07094579d7", 1600, 1200),
  /** unsplash: modern house beautiful yard */
  heroPortfolio: u("1779333090247-eafeccd1d049", 1920, 1080),
  /** unsplash: architectural plans desk */
  heroProcess: u("1503387762-592deb58ef4e", 1920, 1080),
  /** unsplash: construction workers site */
  crewWorking: u("1504307651254-35680f356dfd", 1200, 900),
  /** unsplash: luxury modern house exterior */
  luxuryExterior: u("1545324418-cc1a3fa10c00", 1200, 900),
  /** unsplash: blueprints planning */
  architecturalPlans: u("1454165804606-c3d57bc86b40", 1200, 900),
  /** unsplash: custom home white modern */
  customHome: u("1771366260867-7e07094579d7", 1200, 900),
  /** unsplash: brick home exterior */
  homeAddition: u("1779226347538-ca1a725ae550", 1200, 900),
  /** unsplash: residential construction framing */
  homeAdditionAlt: u("1565008576549-57569a49371d", 1200, 900),
  /** unsplash: house exterior stone */
  aduGarage: u("1560518883-ce09059eeffa", 1200, 900),
  /** unsplash: whole home interior living */
  wholeHomeRemodel: u("1600210491892-03d54c0aaf87", 1200, 900),
  /** unsplash: modern kitchen remodel */
  kitchenRemodel: u("1697609996790-f00fe4568e1d", 1200, 900),
  /** unsplash: bathroom remodel */
  bathRemodel: u("1632120377007-c2adc3017b1e", 1200, 900),
  /** unsplash: basement living room */
  basementFinish: u("1565008576549-57569a49371d", 1200, 900),
  /** unsplash: deck outdoor living */
  outdoorDeck: u("1773161960049-3ec16360da87", 1200, 900),
  /** unsplash: design consultation interior */
  designConsult: u("1514678851703-301356daffda", 1200, 900),
  /** unsplash: construction site cranes */
  constructionSite: u("1486325212027-8081e485255e", 1200, 900),
  /** unsplash: modern living room */
  interiorLiving: u("1631679706909-1844bbd07221", 1200, 900),
  /** unsplash: suburban home exterior dated */
  beforeHome: u("1763687694954-11d4fc83fbba", 900, 700),
  /** unsplash: renovated home exterior */
  afterHome: u("1612296350607-076d142d15cd", 900, 700),
  /** unsplash: dated kitchen */
  beforeKitchen: u("1738130892621-ea936f363089", 900, 700),
  /** unsplash: renovated kitchen */
  afterKitchen: u("1697609996790-f00fe4568e1d", 900, 700),
  /** unsplash: room before remodel */
  beforeAddition: u("1632693810905-ce553d94e9c0", 900, 700),
  /** unsplash: home renovation exterior */
  afterAddition: u("1581094794329-c8112a89af12", 900, 700),
  /** unsplash: interior before */
  beforeRemodel: u("1763687694954-11d4fc83fbba", 900, 700),
  /** unsplash: modern interior after */
  afterRemodel: u("1600210491892-03d54c0aaf87", 900, 700),
  galleryA: u("1613490493576-7fde63acd811", 800, 1000),
  galleryB: u("1600585154340-be6161a56a0c", 800, 600),
  galleryC: u("1779333090247-eafeccd1d049", 800, 600),
  galleryD: u("1697609996790-f00fe4568e1d", 800, 600),
  galleryE: u("1773161960049-3ec16360da87", 800, 600),
  galleryF: u("1503387762-592deb58ef4e", 800, 600),
  leadMagnet: u("1454165804606-c3d57bc86b40", 1200, 900),
  team: u("1504307651254-35680f356dfd", 1200, 900),
  contactHero: u("1771366260867-7e07094579d7", 1400, 900),
  aboutHero: u("1545324418-cc1a3fa10c00", 1400, 900),
  aboutCrew: u("1497366216548-37526070297c", 1200, 900),
  reviewsHero: u("1631679706909-1844bbd07221", 1400, 900),
  processHero: u("1503387762-592deb58ef4e", 1400, 900),
  blogHero: u("1454165804606-c3d57bc86b40", 1400, 900),
  financing: u("1486325212027-8081e485255e", 1200, 800),
  avatarA: u("1544005313-94ddf0286df2", 120, 120),
  avatarB: u("1519345182560-3f2917c472ef", 120, 120),
  avatarC: u("1612349317150-e413f6a5b16d", 120, 120),
  avatarD: u("1544005313-94ddf0286df2", 80, 80),
  avatarE: u("1519345182560-3f2917c472ef", 80, 80),
  avatarF: u("1612349317150-e413f6a5b16d", 80, 80),
  avatarG: u("1506794778202-cad84cf45f1d", 300, 300),
} as const;

export const COMPANY = {
  name: "HARBORSTONE DESIGN-BUILD",
  legalName: "HarborStone Design-Build LLC",
  tagline:
    "Award-winning design-build custom home builder serving Central New Jersey — luxury residential from concept to keys.",
  phone: "(908) 555-0176",
  email: "hello@harborstonedb.com",
  address: "130 Main Street, Flemington, NJ 08822",
  hours: "Mon–Fri 8am–5pm · Evenings & weekends by appointment",
  license: "NJ HIC #13VH08472931 · Design-Build",
  fax: "",
};

export const SITE_TOP = {
  line: "Free Custom Home Guide — Download our planning checklist",
  badges: ["Licensed & Insured", "Design-Build", "25+ Years Local"],
  ratingValue: "4.9",
  ratingCount: "180+",
  ratingLabel: "Google Reviews",
  locations: "Hunterdon · Somerset · Mercer · Middlesex · Morris · Union · Bucks PA",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { days: "Saturday", hours: "By appointment" },
  { days: "Sunday", hours: "Closed" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-75.0%2C40.4%2C-74.5%2C40.7&layer=mapnik&marker=40.51,-74.86";

export const HOME_HERO = {
  eyebrow: "CENTRAL NEW JERSEY DESIGN-BUILD",
  headlineBefore: "Design-Build Custom Home Builder",
  headlineHighlight: "In Central New Jersey",
  headlineAfter: "",
  body:
    "HarborStone is an award-winning firm with a vetted network of architects and designers — one team, streamlined process, and a client experience centered on your budget and timeline.",
  primaryCta: { label: "WORK WITH US", to: "/contact" },
  secondaryCta: { label: "VIEW PORTFOLIO", to: "/projects" },
  image: HOME_BUILDER_IMAGES.heroHome,
  trustPills: [
    { label: "Streamlined Design-Build", sub: "Single accountable team", icon: "Workflow" as const },
    { label: "High-Quality Custom Homes", sub: "Luxury residential focus", icon: "Award" as const },
    { label: "Guaranteed Satisfaction", sub: "Client-first close-out", icon: "CheckCircle" as const },
  ],
  ratingQuote:
    "Trusted across Hunterdon, Somerset, and Mercer counties for custom homes, additions, and whole-home remodeling.",
  ratingCard: {
    score: "4.9",
    countLabel: "180+ verified Google reviews",
    avatars: [
      HOME_BUILDER_IMAGES.avatarD,
      HOME_BUILDER_IMAGES.avatarE,
      HOME_BUILDER_IMAGES.avatarF,
      HOME_BUILDER_IMAGES.avatarA,
    ],
  },
  featuredEyebrow: "DESIGN-BUILD",
  featuredTitle: "Luxury Custom Homes",
  featuredMeta: "Custom · Additions · ADUs · Remodeling",
};

export const SERVICES_RIBBON = [
  { id: "custom-homes", label: "CUSTOM HOMES", icon: "Home" as const, description: "Ground-up luxury builds.", to: "/services/custom-homes" },
  { id: "home-additions", label: "ADDITIONS", icon: "Plus" as const, description: "Expand living space.", to: "/services/home-additions" },
  { id: "adu-detached-garages", label: "ADUs & GARAGES", icon: "Warehouse" as const, description: "Detached living & storage.", to: "/services/adu-detached-garages" },
  { id: "whole-home-remodeling", label: "WHOLE HOME", icon: "Hammer" as const, description: "Full-home transformations.", to: "/services/whole-home-remodeling" },
  { id: "kitchen-bath-remodeling", label: "KITCHEN & BATH", icon: "Bath" as const, description: "Premium interior updates.", to: "/services/kitchen-bath-remodeling" },
];

export const CAPABILITIES = [
  { id: "custom", title: "Custom Homes", description: "Design-build delivery from lot selection through certificate of occupancy.", icon: "Home" as const, to: "/services/custom-homes" },
  { id: "addition", title: "Home Additions", description: "Second stories, wings, and in-law suites matched to your architecture.", icon: "Plus" as const, to: "/services/home-additions" },
  { id: "remodel", title: "Whole Home Remodeling", description: "Phased renovations that respect how you live during construction.", icon: "Hammer" as const, to: "/services/whole-home-remodeling" },
  { id: "design", title: "Design Consultation", description: "Feasibility, budgeting, and architect introductions before you commit.", icon: "Ruler" as const, to: "/services/design-consultation" },
];

export const PROCESS_STEPS = [
  { id: "consult", label: "Consultation & Vision", description: "On-site meeting to understand your goals, lot, and budget parameters." },
  { id: "design", label: "Design & Budget", description: "Architectural design, selections, and a transparent construction estimate." },
  { id: "permits", label: "Permits & Engineering", description: "Municipal submissions, engineering, and pre-construction scheduling." },
  { id: "build", label: "Construction", description: "Dedicated superintendent, weekly updates, and protected job sites." },
  { id: "walk", label: "Walkthrough & Warranty", description: "Final punch list, orientation, and warranty-backed close-out." },
];

export const HOME_STATS = [
  { value: "25+", label: "Years in NJ", icon: "Award" as const },
  { value: "140+", label: "Homes Delivered", icon: "Home" as const },
  { value: "7", label: "Counties Served", icon: "MapPin" as const },
  { value: "4.9", label: "Google Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  { title: "Client-Centered Design-Build", description: "One accountable team keeps your experience, budget, and schedule aligned from day one.", icon: "Heart" as const },
  { title: "Vetted Design Partners", description: "Architects and interior designers we trust — or we welcome your existing design team.", icon: "Users" as const },
  { title: "Transparent Budgeting", description: "Detailed allowances and line-item proposals — no surprise change orders.", icon: "Eye" as const },
  { title: "Quality Craftsmanship", description: "Skilled trades, premium materials, and superintendents who know luxury residential.", icon: "Award" as const },
  { title: "Local Permitting Expertise", description: "Decades navigating Hunterdon, Somerset, and Mercer zoning and historic districts.", icon: "ShieldCheck" as const },
  { title: "Satisfaction Guarantee", description: "We do not consider a project complete until you are proud to call it home.", icon: "CheckCircle" as const },
];

const SERVICE_LIST = [
  { id: "custom-homes", title: "Custom Homes", icon: "Home", description: "Ground-up luxury residences tailored to your lot, lifestyle, and long-term goals.", image: HOME_BUILDER_IMAGES.customHome },
  { id: "home-additions", title: "Home Additions", icon: "Plus", description: "Second stories, wings, and expanded living areas integrated with your home's character.", image: HOME_BUILDER_IMAGES.homeAddition },
  { id: "adu-detached-garages", title: "ADUs & Detached Garages", icon: "Warehouse", description: "Guest suites, in-law apartments, and custom detached garages with premium finishes.", image: HOME_BUILDER_IMAGES.aduGarage },
  { id: "whole-home-remodeling", title: "Whole Home Remodeling", icon: "Hammer", description: "Full interior and exterior transformations with phased scheduling for occupied homes.", image: HOME_BUILDER_IMAGES.wholeHomeRemodel },
  { id: "kitchen-bath-remodeling", title: "Kitchen & Bath Remodeling", icon: "Bath", description: "Designer kitchens, primary suites, and spa baths with meticulous detailing.", image: HOME_BUILDER_IMAGES.kitchenRemodel },
  { id: "basement-finishing", title: "Basement Finishing", icon: "Layers", description: "Family rooms, home offices, and entertainment spaces with proper moisture control.", image: HOME_BUILDER_IMAGES.basementFinish },
  { id: "outdoor-living-decks", title: "Outdoor Living & Decks", icon: "Sun", description: "Covered porches, decks, and outdoor kitchens for year-round entertaining.", image: HOME_BUILDER_IMAGES.outdoorDeck },
  { id: "design-consultation", title: "Design Consultation", icon: "Ruler", description: "Feasibility, budgeting, and architect pairing before you break ground.", image: HOME_BUILDER_IMAGES.designConsult },
] as const;

export const SERVICES = [...SERVICE_LIST];

export const HOME_TRANSFORMATIONS = [
  {
    id: "clinton-custom",
    title: "Hillside Custom Home",
    location: "Clinton, NJ",
    category: "Custom Home",
    serviceId: "custom-homes",
    description: "4,800 sq ft design-build with chef's kitchen and covered rear terrace.",
    beforeImage: HOME_BUILDER_IMAGES.beforeHome,
    afterImage: HOME_BUILDER_IMAGES.afterHome,
  },
  {
    id: "princeton-addition",
    title: "Two-Story Addition",
    location: "Princeton, NJ",
    category: "Addition",
    serviceId: "home-additions",
    description: "Master suite wing with vaulted ceiling and custom millwork.",
    beforeImage: HOME_BUILDER_IMAGES.beforeAddition,
    afterImage: HOME_BUILDER_IMAGES.afterAddition,
  },
  {
    id: "hopewell-remodel",
    title: "Whole Home Renovation",
    location: "Hopewell, NJ",
    category: "Remodel",
    serviceId: "whole-home-remodeling",
    description: "Gut renovation preserving original stone façade with modern interior.",
    beforeImage: HOME_BUILDER_IMAGES.beforeRemodel,
    afterImage: HOME_BUILDER_IMAGES.afterRemodel,
  },
  {
    id: "pennington-kitchen",
    title: "Kitchen & Great Room",
    location: "Pennington, NJ",
    category: "Remodel",
    serviceId: "kitchen-bath-remodeling",
    description: "Open concept kitchen with quartz surfaces and custom cabinetry.",
    beforeImage: HOME_BUILDER_IMAGES.beforeKitchen,
    afterImage: HOME_BUILDER_IMAGES.afterKitchen,
  },
];

export const BEFORE_AFTER_PROJECTS = HOME_TRANSFORMATIONS.map(p => ({ ...p }));

const EXTRA_PROJECTS = [
  { id: "stockton-barn", title: "Contemporary Barn Home", category: "Custom Home", serviceId: "custom-homes", location: "Stockton, NJ", image: HOME_BUILDER_IMAGES.luxuryExterior },
  { id: "skillman-adu", title: "Detached Guest Suite", category: "ADU", serviceId: "adu-detached-garages", location: "Skillman, NJ", image: HOME_BUILDER_IMAGES.aduGarage },
  { id: "basking-ridge-deck", title: "Covered Outdoor Living", category: "Remodel", serviceId: "outdoor-living-decks", location: "Basking Ridge, NJ", image: HOME_BUILDER_IMAGES.outdoorDeck },
  { id: "lawrence-basement", title: "Lower Level Media Room", category: "Remodel", serviceId: "basement-finishing", location: "Lawrence, NJ", image: HOME_BUILDER_IMAGES.basementFinish },
  { id: "flemington-garage", title: "Three-Bay Detached Garage", category: "ADU", serviceId: "adu-detached-garages", location: "Flemington, NJ", image: HOME_BUILDER_IMAGES.homeAdditionAlt },
  { id: "bernards-remodel", title: "Colonial Whole-Home Update", category: "Remodel", serviceId: "whole-home-remodeling", location: "Bernardsville, NJ", image: HOME_BUILDER_IMAGES.wholeHomeRemodel },
  { id: "morristown-addition", title: "Rear Family Room Addition", category: "Addition", serviceId: "home-additions", location: "Morristown, NJ", image: HOME_BUILDER_IMAGES.homeAddition },
  { id: "doylestown-custom", title: "Bucks County Estate", category: "Custom Home", serviceId: "custom-homes", location: "Doylestown, PA", image: HOME_BUILDER_IMAGES.heroPortfolio },
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
    description: `${p.title} — ${p.location}. Completed by HarborStone Design-Build.`,
    image: p.afterImage,
    gallery: [p.beforeImage, p.afterImage, HOME_BUILDER_IMAGES.galleryA, HOME_BUILDER_IMAGES.galleryB],
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
    description: `${p.title} — ${p.location}. Design-build delivery by HarborStone.`,
    image: p.image,
    gallery: [p.image, HOME_BUILDER_IMAGES.galleryC, HOME_BUILDER_IMAGES.galleryD],
    beforeImage: p.image,
    afterImage: p.image,
    number: BEFORE_AFTER_PROJECTS.length + i + 1,
  })),
];

export const SIGNATURE_PROJECT_COUNT = 6;
export const PROJECTS_LATEST_PAGE_SIZE = 4;

export const TEAM = [
  { id: "andrew-harbor", name: "Andrew Harbor", role: "Founder & Principal Builder", bio: "25+ years leading design-build custom homes across Central New Jersey.", image: HOME_BUILDER_IMAGES.avatarG, social: { linkedin: "#", twitter: "#" } },
  { id: "paul-stone", name: "Paul Stone", role: "Director of Construction", bio: "Oversees field operations, scheduling, and trade partner relationships.", image: HOME_BUILDER_IMAGES.avatarB, social: { linkedin: "#", twitter: "#" } },
  { id: "elena-morris", name: "Elena Morris", role: "Design-Build Manager", bio: "Coordinates architects, selections, and client communication through close-out.", image: HOME_BUILDER_IMAGES.avatarC, social: { linkedin: "#", twitter: "#" } },
  { id: "bob-fleming", name: "Robert Fleming", role: "Client Experience Lead", bio: "Guides homeowners through budgeting, permitting, and milestone reviews.", image: HOME_BUILDER_IMAGES.avatarA, social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Patricia H.", role: "Tewksbury, NJ", quote: "HarborStone handled planning, budgeting, permitting, and construction — completely professional and delivered everything they promised.", avatar: HOME_BUILDER_IMAGES.avatarA, rating: 5 },
  { name: "Mark D.", role: "Delaware Township, NJ", quote: "Several zoning appeals were required; they instilled confidence and over-delivered each step. We will miss working with this team.", avatar: HOME_BUILDER_IMAGES.avatarB, rating: 5 },
  { name: "Matthew R.", role: "Short Hills, NJ", quote: "They became part of the family — shared our vision and executed in a manner that exceeded expectations.", avatar: HOME_BUILDER_IMAGES.avatarC, rating: 5 },
  { name: "Lisa K.", role: "Princeton, NJ", quote: "Our addition looks like it was always part of the original home. Craftsmanship and communication were outstanding.", avatar: HOME_BUILDER_IMAGES.avatarA, rating: 5 },
  { name: "Brian T.", role: "Hopewell, NJ", quote: "Transparent budget, weekly site meetings, and a finished home we are proud to show neighbors.", avatar: HOME_BUILDER_IMAGES.avatarB, rating: 5 },
  { name: "Angela M.", role: "Clinton, NJ", quote: "The design-build process kept us in control without the stress of juggling separate architect and builder contracts.", avatar: HOME_BUILDER_IMAGES.avatarC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "custom-home-budget", title: "Setting a Realistic Custom Home Budget in NJ", excerpt: "Key cost factors for Central Jersey luxury builds.", date: "April 12, 2025", author: "Robert Fleming", category: "Planning", image: HOME_BUILDER_IMAGES.architecturalPlans, content: "Understanding land, design, and construction costs before you break ground." },
  { id: "design-build-vs-traditional", title: "Why Design-Build Works for Custom Homes", excerpt: "Single-team accountability from concept to completion.", date: "March 8, 2025", author: "Elena Morris", category: "Process", image: HOME_BUILDER_IMAGES.heroProcess, content: "How design-build centers the client experience and protects your timeline." },
  { id: "adu-guide", title: "ADUs & Detached Garages: What NJ Homeowners Should Know", excerpt: "Zoning, utilities, and timeline basics.", date: "February 20, 2025", author: "Andrew Harbor", category: "Additions", image: HOME_BUILDER_IMAGES.aduGarage, content: "Accessory dwelling units are increasingly popular in Hunterdon and Somerset counties." },
  { id: "kitchen-trends", title: "Kitchen Design Trends for 2025", excerpt: "Layouts, surfaces, and lighting homeowners love.", date: "January 15, 2025", author: "Elena Morris", category: "Remodeling", image: HOME_BUILDER_IMAGES.kitchenRemodel, content: "How we approach kitchen remodels within occupied homes." },
  { id: "permit-timeline", title: "Navigating NJ Building Permits", excerpt: "What to expect from submission to approval.", date: "December 5, 2024", author: "Paul Stone", category: "Process", image: HOME_BUILDER_IMAGES.constructionSite, content: "Municipal timelines vary — we plan contingencies into every schedule." },
  { id: "financing-options", title: "Financing Your Custom Home Build", excerpt: "Construction loans and draw schedules explained.", date: "November 18, 2024", author: "Robert Fleming", category: "Resources", image: HOME_BUILDER_IMAGES.financing, content: "Partnering with local lenders who understand design-build draws." },
];

export const STATS = [
  { value: 140, label: "Homes Delivered", suffix: "+" },
  { value: 25, label: "Years Experience", suffix: "+" },
  { value: 180, label: "5-Star Reviews", suffix: "+" },
  { value: 7, label: "Counties Served", suffix: "" },
];

export const FAQ_ITEMS = [
  { question: "Do you offer free consultations?", answer: "Yes — complimentary on-site consultations with follow-up scope and budget guidance." },
  { question: "Are you licensed and insured?", answer: "NJ HIC licensed with full liability and workers' compensation coverage on every project." },
  { question: "What is design-build?", answer: "One team handles design coordination and construction under a single contract — keeping budget and schedule aligned." },
  { question: "What areas do you serve?", answer: "Hunterdon, Somerset, Mercer, Middlesex, Morris, Union counties in NJ and select Bucks County, PA towns." },
  { question: "Can you work with my architect?", answer: "Absolutely — we collaborate with your designer or recommend vetted partners from our network." },
  { question: "How long does a custom home take?", answer: "Typically 12–18 months from permit to completion depending on size, complexity, and municipality." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "Process", path: "/process" },
  { label: "About", path: "/about" },
  { label: "Resources", path: "/financing" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Custom Homes", to: "/services/custom-homes" },
  { label: "Home Additions", to: "/services/home-additions" },
  { label: "ADUs & Garages", to: "/services/adu-detached-garages" },
  { label: "Whole Home Remodeling", to: "/services/whole-home-remodeling" },
  { label: "Kitchen & Bath", to: "/services/kitchen-bath-remodeling" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Portfolio", to: "/projects" },
  { label: "Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Client Login", to: "/contact" },
  { label: "Industry Partners", to: "/about" },
  { label: "Realtor Referral", to: "/contact" },
];

export const SERVICE_AREAS = [
  "Flemington, NJ", "Clinton, NJ", "Princeton, NJ", "Hopewell, NJ", "Pennington, NJ",
  "Skillman, NJ", "Basking Ridge, NJ", "Bernardsville, NJ", "Morristown, NJ", "Lawrence, NJ",
  "Hillsborough, NJ", "Chester, NJ", "Doylestown, PA", "New Hope, PA",
];

export const SERVICE_AREA_COUNTIES: { county: string; towns: string[] }[] = [
  { county: "Hunterdon County", towns: ["Flemington", "Clinton", "Readington", "Tewksbury", "Califon", "Lambertville", "Delaware Township", "East Amwell"] },
  { county: "Somerset County", towns: ["Hillsborough", "Skillman", "Bernardsville", "Basking Ridge", "Bedminster", "Warren", "Montgomery", "Franklin"] },
  { county: "Mercer County", towns: ["Princeton", "Hopewell", "Pennington", "Lawrence", "Hamilton", "West Windsor", "East Windsor"] },
  { county: "Middlesex County", towns: ["Plainsboro", "South Brunswick", "East Brunswick", "Monroe", "Edison", "Metuchen", "New Brunswick"] },
  { county: "Morris County", towns: ["Morristown", "Chester", "Chatham", "Mendham", "Washington", "Harding Township"] },
  { county: "Union County", towns: ["Berkeley Heights", "New Providence", "Summit", "Westfield"] },
  { county: "Bucks County, PA", towns: ["Doylestown", "New Hope", "Newtown", "Solebury", "Warrington", "Buckingham"] },
];

export const BLOG_LIST_PAGE_SIZE = 2;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["PLANNING", "PROCESS", "REMODELING", "ADDITIONS", "RESOURCES"];

export const PROJECTS_PAGE_STATS = [
  { value: "140+", label: "Homes Delivered" },
  { value: "25+", label: "Years Experience" },
  { value: "Design-Build", label: "Single Team" },
  { value: "4.9", label: "Google Rating" },
];

export const ABOUT_STATS = [
  { value: "25+", label: "Years in Central NJ" },
  { value: "140+", label: "Homes Delivered" },
  { value: "Design-Build", label: "Licensed Team" },
  { value: "180+", label: "5-Star Reviews" },
  { value: "7", label: "Counties Served" },
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
  { id: "designbuild", label: "Design-Build", sub: "Single-team delivery" },
  { id: "reviews", label: "4.9 Google Rating", sub: "180+ verified reviews" },
  { id: "local", label: "Second Generation", sub: "Family-owned since 1999" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "custom", label: "CUSTOM HOMES" },
  { id: "remodel", label: "REMODELING" },
  { id: "process", label: "PROCESS" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  custom: [
    { question: "Do you help find land?", answer: "We advise on buildability and can introduce broker partners — you purchase land independently." },
    { question: "What size homes do you build?", answer: "Typically 2,500–8,000+ sq ft luxury residences; we scope smaller projects case by case." },
    { question: "Can you match existing architecture?", answer: "Yes — additions and remodels are detailed to blend with your home's style and materials." },
  ],
  remodel: [
    { question: "Can we live in the home during remodeling?", answer: "Often yes — we phase work and maintain safe, clean zones for occupied renovations." },
    { question: "Do you handle kitchen selections?", answer: "Our design-build manager guides cabinetry, surfaces, fixtures, and lighting selections." },
    { question: "What about historic districts?", answer: "We have experience with Princeton, Lambertville, and other review boards." },
  ],
  process: [
    { question: "How are payments structured?", answer: "Draw schedules tied to milestones — detailed in your construction agreement." },
    { question: "Who is my main contact?", answer: "A dedicated design-build manager from consultation through warranty." },
    { question: "Do you provide a warranty?", answer: "Yes — written warranty coverage at close-out with responsive follow-up." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Design-build custom homes, additions, ADUs, and whole-home remodeling across Central New Jersey — one team from concept to completion.";

export const COMMERCIAL_FITOUT_CARDS = [
  { id: "budget", title: "Unclear Budget?", description: "We establish realistic allowances before design is finalized.", icon: "Tag" as const },
  { id: "land", title: "Need Land Guidance?", description: "Lot feasibility and utility assessments before you buy.", icon: "MapPin" as const },
  { id: "architect", title: "Need an Architect?", description: "We pair you with designers from our vetted network.", icon: "Ruler" as const },
  { id: "timeline", title: "Tight Timeline?", description: "Permitting and scheduling planned together — not in silos.", icon: "Clock" as const },
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
  category: "DESIGN-BUILD",
  title: s.title,
  subtitle: "LICENSED CREWS · PREMIUM MATERIALS",
  body: [
    `${s.description} HarborStone delivers documented scopes, protected job sites, and superintendents who communicate weekly.`,
    "Every project includes transparent budgeting, selection support, and a satisfaction-backed close-out.",
  ],
  image: s.image,
  inclusions: [
    "Complimentary consultation",
    "Written scope & timeline",
    "Licensed & insured crews",
    "Premium material allowances",
    "Weekly progress updates",
    "Warranty at close-out",
  ],
}));

export const LEAD_FORM = {
  title: "Request Your Free Design-Build Consultation",
  description: "Tell us about your project — we respond within one business day.",
  bullets: [
    "Complimentary on-site consultations",
    "Transparent design-build proposals",
    "Vetted architect & designer network",
    "NJ HIC licensed & insured",
  ],
};

export const LEAD_MAGNET = {
  title: "Free Custom Home Guide",
  subtitle: "Setting a realistic budget, financing options, choosing a builder, timelines, and land considerations.",
  cta: { label: "GET ACCESS", to: "/contact" },
  image: HOME_BUILDER_IMAGES.leadMagnet,
};

export const STORM_CHECKLIST = [
  { id: "consult", title: "Schedule Consultation", description: "Share your vision, lot, and budget goals." },
  { id: "design", title: "Review Design", description: "Plans, selections, and construction estimate." },
  { id: "permit", title: "Permit & Schedule", description: "Submissions and build calendar locked." },
  { id: "build", title: "Break Ground", description: "Superintendent-led construction with weekly updates." },
];

export const INSPECTION_BENEFITS = [
  { id: "value", title: "Increase Home Value", description: "Quality design-build improves resale and daily living.", icon: "Home" as const },
  { id: "space", title: "More Living Space", description: "Additions and ADUs without compromising architecture.", icon: "Plus" as const },
  { id: "efficiency", title: "Modern Efficiency", description: "Insulation, HVAC, and windows planned with your remodel.", icon: "Sparkles" as const },
  { id: "enjoy", title: "Love Where You Live", description: "Kitchens, baths, and outdoor spaces built for how you live.", icon: "Heart" as const },
];

export const INSPECTION_TYPES = [
  { id: "custom", title: "Custom Homes", description: "Ground-up luxury builds.", image: HOME_BUILDER_IMAGES.customHome },
  { id: "addition", title: "Additions", description: "Expand your footprint.", image: HOME_BUILDER_IMAGES.homeAddition },
  { id: "remodel", title: "Remodeling", description: "Whole-home or phased updates.", image: HOME_BUILDER_IMAGES.wholeHomeRemodel },
  { id: "adu", title: "ADUs & Garages", description: "Detached structures.", image: HOME_BUILDER_IMAGES.aduGarage },
];

export const INSPECTION_CHECKLIST = [
  "Lot & zoning review",
  "Structural feasibility",
  "Budget & allowances",
  "Timeline & phasing",
  "Permit requirements",
  "Selection milestones",
];

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Insured", description: "NJ HIC with full coverage.", icon: "ShieldCheck" as const },
  { id: "designbuild", title: "Design-Build", description: "Single accountable team.", icon: "Workflow" as const },
  { id: "local", title: "Local Since 1999", description: "Second-generation builder.", icon: "Heart" as const },
  { id: "honest", title: "Transparent Pricing", description: "Line-item proposals.", icon: "Tag" as const },
];

export const ABOUT_HERO_BADGES = [
  { id: "years", title: "25+ Years Local", icon: "Award" as const },
  { id: "licensed", title: "NJ HIC Licensed", icon: "ShieldCheck" as const },
  { id: "designbuild", title: "Design-Build", icon: "Workflow" as const },
  { id: "homes", title: "140+ Homes", icon: "Home" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "RESOURCES",
  title: "Financing Your Custom Home",
  subtitle: "Construction loans, draw schedules, and phased billing explained.",
  body: "We coordinate with local lenders familiar with design-build draws and help you understand milestone payments before you commit.",
  image: HOME_BUILDER_IMAGES.financing,
  benefits: ["Construction loan guidance", "Phased draw schedules", "Allowance transparency", "No hidden fees"],
  cta: { label: "DISCUSS OPTIONS", to: "/contact" },
};

export const HERO_PROMO_BANNERS = [
  {
    id: "guide",
    title: LEAD_MAGNET.title,
    subtitle: LEAD_MAGNET.subtitle,
    cta: LEAD_MAGNET.cta,
    image: LEAD_MAGNET.image,
  },
  {
    id: "portfolio",
    title: "See Our Custom Homes",
    subtitle: "Portfolio across Hunterdon, Somerset, and Mercer counties",
    cta: { label: "View Portfolio", to: "/projects" },
    image: HOME_BUILDER_IMAGES.heroPortfolio,
  },
  {
    id: "process",
    title: "Our Design-Build Process",
    subtitle: "Consultation through walkthrough — one accountable team",
    cta: { label: "Learn More", to: "/process" },
    image: HOME_BUILDER_IMAGES.heroProcess,
  },
] as const;

export const SERVICE_CATEGORY_TABS = [
  {
    id: "custom",
    label: "Custom Homes",
    items: ["Lot feasibility", "Architect coordination", "Luxury finishes", "Energy-efficient envelopes", "Smart home pre-wire", "Landscape integration"],
    image: HOME_BUILDER_IMAGES.customHome,
    to: "/services/custom-homes",
  },
  {
    id: "additions",
    label: "Additions & ADUs",
    items: ["Second stories", "In-law suites", "Detached garages", "Guest cottages", "Municipal variances", "Structural engineering"],
    image: HOME_BUILDER_IMAGES.homeAddition,
    to: "/services/home-additions",
  },
  {
    id: "remodel",
    label: "Remodeling",
    items: ["Kitchen & bath", "Basement finishing", "Whole-home updates", "Outdoor living", "Historic renovations", "Phased scheduling"],
    image: HOME_BUILDER_IMAGES.kitchenRemodel,
    to: "/services/whole-home-remodeling",
  },
] as const;

export const META_DEFAULT =
  "Design-build custom home builder in Central New Jersey — custom homes, additions, ADUs, and luxury remodeling.";
