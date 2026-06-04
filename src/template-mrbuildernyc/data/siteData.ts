export const COMPANY = {
  name: "MrBuilderNYC",
  legalName: "MrBuilderNYC",
  tagline:
    "NYC's trusted roofing and exterior construction experts. Roof installs, repairs, replacements and full exterior renovations across the five boroughs.",
  phone: "(212) 555-0184",
  email: "info@mrbuildernyc.com",
  address: "350 5th Ave, New York, NY 10118",
  hours: "Mon - Sat: 7:00 AM - 7:00 PM · 24/7 Emergency Roofing",
};

export const SITE_TOP = {
  tagline: "NYC Roofing & Exterior Experts.",
  badges: "Licensed & Insured · NYC DOB Registered · Free Estimates",
  ratingValue: "4.9",
  ratingCount: "280+ NYC Reviews",
  line: "NYC Roofing & Exterior Experts.",
  locations: "Manhattan · Brooklyn · Queens · Bronx · Staten Island",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM - 7:00 PM" },
  { days: "Saturday", hours: "8:00 AM - 5:00 PM" },
  { days: "Sunday", hours: "24/7 Emergency Service" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.68%2C-73.90%2C40.82&layer=mapnik&marker=40.7518,-73.9910";

/** NYC signage — Unsplash kegWoCHJzGY (Nik Shuliahin). Shared by home + services heroes. */
export const NYC_SIGNAGE_HERO_IMAGE =
  "https://images.unsplash.com/photo-1511745235279-2f7276d5ba65?auto=format&fit=crop&w=1920&h=1080&q=85";

export const HOME_HERO = {
  eyebrow: "NEW YORK CITY ROOFING & EXTERIOR",
  headlineBefore: "NYC's Trusted",
  headlineHighlight: "Roofing & Exterior Experts.",
  headlineAfter: "",
  body:
    "Professional roofing, repairs, replacements, and exterior solutions delivered with quality craftsmanship and reliable service — built for the five boroughs.",
  primaryCta: { label: "GET FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "CALL NOW", to: "/contact" },
  image: NYC_SIGNAGE_HERO_IMAGE,
  featuredEyebrow: "BUILT FOR NEW YORK",
  featuredTitle: "Roofing & Exterior Construction",
  featuredMeta: "Residential & Commercial · Five Boroughs",
  trustPills: [
    { id: "inspect", label: "Free Estimate", sub: "Same-Day Response", icon: "Calendar" as const },
    { id: "pricing", label: "Upfront Pricing", sub: "No Hidden Fees", icon: "Tag" as const },
    {
      id: "warranty",
      label: "Workmanship Guarantee",
      sub: "Backed by MrBuilderNYC",
      icon: "ShieldCheck" as const,
    },
  ],
  ratingCard: {
    score: "4.9",
    countLabel: "Based on 280+ NYC reviews",
    avatars: [
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    ],
  },
};

export const SERVICES_RIBBON = [
  { id: "roof-installation", label: "ROOF INSTALLATION", icon: "Home" as const },
  { id: "roof-replacement", label: "ROOF REPLACEMENT", icon: "Hammer" as const },
  { id: "roof-repair", label: "ROOF REPAIR", icon: "Wrench" as const },
  { id: "flat-roofing", label: "FLAT ROOFING", icon: "PanelTop" as const },
  { id: "shingle-roofing", label: "SHINGLE ROOFING", icon: "ClipboardCheck" as const },
  { id: "emergency-roofing", label: "EMERGENCY ROOFING", icon: "Zap" as const },
  { id: "gutters-drainage", label: "GUTTERS & DRAINAGE", icon: "Droplets" as const },
  { id: "exterior-renovations", label: "EXTERIOR RENOVATIONS", icon: "Building2" as const },
  { id: "storm-damage", label: "STORM DAMAGE", icon: "CloudLightning" as const },
];

export const CAPABILITIES = [
  {
    id: "licensed",
    title: "Licensed & Insured",
    description: "NYC DOB registered. Fully bonded and insured roofing professionals.",
    icon: "ShieldCheck" as const,
    to: "/about",
  },
  {
    id: "quality",
    title: "Quality Workmanship",
    description: "Top-grade materials and craftsmanship built to handle NYC weather.",
    icon: "Award" as const,
    to: "/services",
  },
  {
    id: "team",
    title: "Experienced Crews",
    description: "Seasoned roofers and exterior specialists who know NYC buildings.",
    icon: "Users" as const,
    to: "/about",
  },
  {
    id: "warranty",
    title: "Satisfaction Guaranteed",
    description: "Workmanship guarantee on every install — your home is protected.",
    icon: "BadgeCheck" as const,
    to: "/services",
  },
];

export const PROCESS_STEPS = [
  { id: "inspection", label: "Free Inspection", description: "We come to your NYC property and assess every detail." },
  { id: "estimate", label: "Detailed Estimate", description: "Clear, written, no-surprise pricing — same week." },
  { id: "plan", label: "Plan & Schedule", description: "We coordinate permits, parking, and your timeline." },
  { id: "install", label: "Professional Install", description: "Our crews deliver the job with NYC-grade discipline." },
  { id: "cleanup", label: "Walkthrough & Clean-Up", description: "Final QA pass — site spotless when we wrap." },
];

export const HOME_STATS = [
  { value: "12+", label: "Years in NYC", icon: "Award" as const },
  { value: "1800+", label: "Projects Completed", icon: "Home" as const },
  { value: "100%", label: "Satisfied Clients", icon: "Smile" as const },
  { value: "4.9", label: "Average Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = [
  {
    title: "Licensed & Insured",
    description: "NYC DOB registered. Fully bonded with comprehensive liability coverage on every job.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Experienced Roofing Professionals",
    description: "Veteran crews who specialize in NYC roofs — brownstones, walk-ups, co-ops, and commercial flat roofs.",
    icon: "Users" as const,
  },
  {
    title: "Free Estimates",
    description: "Free, no-obligation written estimates. Transparent line-item pricing with no surprises.",
    icon: "BadgeCheck" as const,
  },
  {
    title: "Quality Workmanship Guarantee",
    description: "Customer satisfaction guaranteed — backed by our written workmanship warranty.",
    icon: "Award" as const,
  },
];

export const SERVICES = [
  {
    id: "roof-installation",
    title: "Roof Installation",
    icon: "Home",
    description:
      "New roof installations on NYC homes, brownstones, and new construction — engineered for the weather extremes the five boroughs throw at it.",
    image:
      "https://images.unsplash.com/photo-1644604120663-4e5fcdf33104?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    icon: "Hammer",
    description:
      "Full tear-off and replacement with ice & water shield, new flashing, and proper venting — done with permit-clean documentation.",
    image:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "roof-repair",
    title: "Roof Repair",
    icon: "Wrench",
    description:
      "Leak tracing, flashing rework, slipped shingles, vent boots — honest scoping before we ever pitch a full replacement.",
    image:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "flat-roofing",
    title: "Flat Roofing",
    icon: "PanelTop",
    description:
      "TPO, EPDM, and modified bitumen systems for NYC flat roofs — torch-down, hot-mop, or fully adhered with full warranty.",
    image:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "shingle-roofing",
    title: "Shingle Roofing",
    icon: "ClipboardCheck",
    description:
      "Architectural and designer asphalt shingle systems with manufacturer warranties — premium curb appeal, dependable performance.",
    image:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "emergency-roofing",
    title: "Emergency Roofing Services",
    icon: "Zap",
    description:
      "24/7 emergency response across NYC. Tarping, interior protection, and a written remediation plan when the storm passes.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "gutters-drainage",
    title: "Gutters & Drainage",
    icon: "Droplets",
    description:
      "Seamless aluminum gutters, downspout systems, and leader-to-drain tie-ins — water routed away from your NYC foundation.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "exterior-renovations",
    title: "Exterior Renovations",
    icon: "Building2",
    description:
      "Brick repointing, facade restoration, siding, cornices, and full exterior overhauls — built to NYC standards.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "storm-damage",
    title: "Storm Damage Repair",
    icon: "CloudLightning",
    description:
      "Nor'easter, wind, and hail damage documented for adjusters. Emergency tarping plus full insurance-claim support.",
    image:
      "https://images.unsplash.com/photo-1695045194325-af9f065d5587?auto=format&fit=crop&w=800&h=500&q=85",
  },
];

/** Homepage before/after fallback if `projects` content is empty on a preview. */
export const BEFORE_AFTER_PROJECTS = [
  {
    id: "brooklyn-brownstone",
    title: "Brownstone re-roof",
    location: "Brooklyn, NY",
    beforeImage:
      "https://images.unsplash.com/photo-1655041404429-027ce0cf7b71?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&h=600&q=85",
  },
  {
    id: "queens-flat-roof",
    title: "Queens flat-roof replacement",
    location: "Queens, NY",
    beforeImage:
      "https://images.unsplash.com/photo-1705229753988-15e68d388ca7?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&h=600&q=85",
  },
  {
    id: "bronx-storm-repair",
    title: "Bronx storm restoration",
    location: "Bronx, NY",
    beforeImage:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=600&q=85",
  },
  {
    id: "manhattan-commercial",
    title: "Midtown commercial flat-roof",
    location: "Manhattan, NY",
    beforeImage:
      "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=600&q=85",
  },
];

export const PROJECTS = [
  {
    id: "brooklyn-brownstone",
    title: "Park Slope Brownstone Re-Roof",
    category: "Residential",
    location: "Brooklyn, NY",
    year: "2025",
    client: "Private Homeowner",
    value: "$24K",
    description:
      "Full tear-off and architectural asphalt re-roof on a 4-story Park Slope brownstone with new flashing and copper valleys.",
    beforeImage:
      "https://images.unsplash.com/photo-1655041404429-027ce0cf7b71?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&h=600&q=85",
    image:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&h=600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1655041404429-027ce0cf7b71?auto=format&fit=crop&w=1200&h=800&q=85",
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=1200&h=800&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&h=800&q=85",
    ],
  },
  {
    id: "queens-flat-roof",
    title: "Astoria Flat-Roof Replacement",
    category: "Residential",
    location: "Queens, NY",
    year: "2025",
    client: "Private Client",
    value: "$32K",
    description:
      "60-mil TPO replacement on a 4-unit Astoria walk-up with full tapered insulation and new perimeter flashing.",
    beforeImage:
      "https://images.unsplash.com/photo-1705229753988-15e68d388ca7?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&h=600&q=85",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&h=600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1705229753988-15e68d388ca7?auto=format&fit=crop&w=1200&h=800&q=85",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&h=800&q=85",
    ],
  },
  {
    id: "bronx-storm-repair",
    title: "Bronx Storm Restoration",
    category: "Residential",
    location: "Bronx, NY",
    year: "2024",
    client: "Insurance Claim",
    value: "$28K",
    description:
      "Full roof replacement after a nor'easter ripped shingles off a Riverdale single-family. Insurance-coordinated from estimate to final.",
    beforeImage:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=600&q=85",
    image:
      "https://images.unsplash.com/photo-1559368611-813457131803?auto=format&fit=crop&w=800&h=600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=1200&h=800&q=85",
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=1200&h=800&q=85",
    ],
  },
  {
    id: "manhattan-commercial",
    title: "Midtown Commercial Flat-Roof",
    category: "Commercial",
    location: "Manhattan, NY",
    year: "2024",
    client: "Commercial Property",
    value: "$210K",
    description:
      "EPDM single-ply membrane replacement on a 22,000 sqft Midtown commercial roof with tapered insulation and full parapet rework.",
    beforeImage:
      "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=600&q=85",
    image:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=1200&h=800&q=85",
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=1200&h=800&q=85",
    ],
  },
  { id: "harlem-shingle", title: "Harlem Townhouse Shingle Install", category: "Residential", location: "Manhattan, NY", year: "2024", client: "Private Client", value: "$36K", description: "Premium architectural shingle installation on a Harlem townhouse with new ridge venting and copper drip edge.", image: "https://images.unsplash.com/photo-1645075960701-573cbc669de6?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "si-exterior", title: "Staten Island Exterior Renovation", category: "Residential", location: "Staten Island, NY", year: "2024", client: "Private Homeowner", value: "$58K", description: "Full siding, roof replacement, and gutter overhaul on a single-family Staten Island home. Exterior fully restored.", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "brooklyn-gutters", title: "Williamsburg Gutter System", category: "Residential", location: "Brooklyn, NY", year: "2024", client: "Private Homeowner", value: "$8.4K", description: "Custom seamless 6-inch aluminum gutters with leaf guards and downspout extensions tied into NYC storm drainage.", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "queens-coop", title: "Forest Hills Co-Op Roof", category: "Commercial", location: "Queens, NY", year: "2023", client: "Co-Op Board", value: "$145K", description: "Full TPO membrane re-roof on a Forest Hills co-op with new parapet coping and HVAC curb detailing.", image: "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "bronx-flat", title: "Mott Haven Modified Bitumen", category: "Commercial", location: "Bronx, NY", year: "2023", client: "Commercial Property", value: "$92K", description: "Torch-down modified bitumen system on a Mott Haven mixed-use building with full insulation upgrade.", image: "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
];

export const SIGNATURE_PROJECT_COUNT = 4;
export const PROJECTS_LATEST_PAGE_SIZE = 3;

export const TEAM = [
  { id: "marco-rivera", name: "Marco Rivera", role: "Founder & Master Roofer", bio: "Born and raised in Queens. Founded MrBuilderNYC in 2013 after 15 years on NYC roofs.", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "elena-park", name: "Elena Park", role: "Director of Operations", bio: "Runs scheduling, permits, and the customer experience across the five boroughs.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "anthony-russo", name: "Anthony Russo", role: "Senior Roofing Superintendent", bio: "Delivered hundreds of NYC re-roofs and commercial flat-roof projects.", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "monica-grant", name: "Monica Grant", role: "Insurance Claims Specialist", bio: "Walks NYC homeowners through nor'easter and storm damage claims start to finish.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "david-cohen", name: "David Cohen", role: "Lead Estimator", bio: "Precise material take-offs and transparent quotes — no surprise change orders.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "lucia-mendes", name: "Lucia Mendes", role: "Safety Director", bio: "OSHA-30 certified safety leader. Owns site protocols on every NYC job.", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Michael T.", role: "Park Slope, Brooklyn", quote: "MrBuilderNYC re-roofed our brownstone and the crew was professional from day one. Quality work, fair price, and they cleaned up every single day.", avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "Sarah L.", role: "Astoria, Queens", quote: "Best roofing experience we've ever had in NYC. They explained everything, hit every deadline, and the flat roof has been bulletproof through two winters.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "James R.", role: "Riverdale, Bronx", quote: "Highly recommend MrBuilderNYC. Honest pricing, great communication, and excellent workmanship. They handled our storm claim with the insurance company too.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "Diana K.", role: "Forest Hills, Queens", quote: "After the nor'easter took out our gutters, they were on site the next morning. New seamless gutters and a roof inspection — done in a week.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "Carlos H.", role: "Sunnyside, Queens", quote: "Got three quotes — MrBuilderNYC was the most honest one. Saved us thousands on a flat-roof replacement and finished a day early.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
];

export const BLOG_POSTS = [
  { id: "signs-new-roof-nyc", title: "5 Signs Your NYC Roof Needs Replacing", excerpt: "The most common warning signs we see on NYC brownstones, walk-ups, and single-families.", date: "May 15, 2026", author: "Marco Rivera", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&h=400&q=85", content: "NYC roofs deal with extremes most parts of the country don't — winter ice, summer humidity, salt air on the coastal boroughs, and constant freeze-thaw cycling. Curling shingles, granules in the gutters, daylight in the attic, and water staining on top-floor ceilings are the four most common signals it's time for a replacement.\n\nIf your roof is over 18-20 years old, even cosmetic damage is worth a professional NYC inspection — small leaks compound fast in the building envelope below." },
  { id: "flat-vs-shingle-nyc", title: "Flat Roof vs. Shingle: Which Fits Your NYC Home?", excerpt: "Brownstones, row houses, and walk-ups all need different roofing approaches.", date: "May 1, 2026", author: "Elena Park", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1580775815403-931167518e08?auto=format&fit=crop&w=600&h=400&q=85", content: "Most NYC brownstones and row houses run flat roofs — TPO, EPDM, or modified bitumen are the three main systems we install. Architectural shingles work great on pitched roofs in Staten Island, parts of Queens, and the Bronx.\n\nWe walk you through each option during the free estimate based on your building, exposure, and budget." },
  { id: "spring-roof-maintenance-nyc", title: "Spring Roof Maintenance for NYC Homeowners", excerpt: "The annual checklist that prevents emergency calls when nor'easters hit.", date: "April 22, 2026", author: "Anthony Russo", category: "Maintenance", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&h=400&q=85", content: "Spring is the right time to clear winter debris, check flashing seals around HVAC penetrations, and unclog gutters before summer storms. A 30-minute inspection — or a free professional check — can catch issues worth thousands later." },
  { id: "noreaster-claim-guide", title: "Filing a Nor'easter Storm Damage Claim", excerpt: "Step-by-step guide for getting your NYC wind or hail claim approved.", date: "March 28, 2026", author: "Monica Grant", category: "Storm Damage", image: "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=600&h=400&q=85", content: "Document everything immediately after a storm: photos of the roof, the date, and any visible interior damage. Call your insurance carrier within 48 hours and request a professional NYC roof inspection before any temporary repairs." },
  { id: "exterior-renovation-roi", title: "Exterior Renovations: ROI for NYC Homeowners", excerpt: "What full exterior overhauls return at resale across the boroughs.", date: "March 5, 2026", author: "Marco Rivera", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&h=400&q=85", content: "Roof, siding, and gutter overhauls regularly return 70-90% of cost at resale on NYC single-family homes. Brownstones see even higher returns when facade work is included properly." },
  { id: "gutters-matter-nyc", title: "Why Gutters Are Critical to Your NYC Roof", excerpt: "Clogged or undersized gutters cause more roof damage than most NYC homeowners realize.", date: "February 18, 2026", author: "Anthony Russo", category: "Maintenance", image: "https://images.unsplash.com/photo-1645075960701-573cbc669de6?auto=format&fit=crop&w=600&h=400&q=85", content: "Water that doesn't drain off your roof goes somewhere — usually into the fascia, soffits, and eventually the building envelope. A properly sized seamless gutter system is one of the cheapest ways to protect an NYC roof." },
];

export const STATS = [
  { value: 1800, label: "Projects Completed", suffix: "+" },
  { value: 12, label: "Years in NYC", suffix: "+" },
  { value: 100, label: "Satisfied Clients", suffix: "%" },
  { value: 4.9, label: "Average Rating", suffix: "" },
];

export const FAQ_ITEMS = [
  { question: "How long does a roof installation take in NYC?", answer: "Most residential NYC roofs are completed in 1-3 days depending on the size, pitch, and access. Brownstones and walk-ups can take 3-5 days, and commercial flat roofs vary by scope." },
  { question: "What roofing materials do you install?", answer: "Architectural asphalt shingles, designer shingles, TPO, EPDM, modified bitumen, standing-seam metal, and slate. We'll recommend the right system for your NYC home during the free estimate." },
  { question: "Do you offer workmanship warranties?", answer: "Yes. Every install carries our workmanship warranty plus the full manufacturer warranty on materials. Premium installs qualify for a lifetime warranty." },
  { question: "Are you licensed and insured in NYC?", answer: "Absolutely. MrBuilderNYC is NYC DOB registered, fully bonded, and carries comprehensive general liability plus workers' compensation insurance." },
  { question: "Do you handle storm and insurance claims?", answer: "Yes. Our claims specialists work directly with your carrier's adjuster — we document the damage, walk the roof, and supplement the claim when needed." },
  { question: "How do I get a free estimate?", answer: "Click any 'Get Free Estimate' button or call us directly. We come out same week, inspect your roof, and provide a detailed written quote with no obligation." },
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
  { label: "Roof Replacement", to: "/services/roof-replacement" },
  { label: "Roof Repair", to: "/services/roof-repair" },
  { label: "Flat Roofing", to: "/services/flat-roofing" },
  { label: "Shingle Roofing", to: "/services/shingle-roofing" },
  { label: "Emergency Roofing", to: "/services/emergency-roofing" },
  { label: "Gutters & Drainage", to: "/services/gutters-drainage" },
  { label: "Exterior Renovations", to: "/services/exterior-renovations" },
  { label: "Storm Damage", to: "/services/storm-damage" },
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
  "Manhattan, NY",
  "Brooklyn, NY",
  "Queens, NY",
  "Bronx, NY",
  "Staten Island, NY",
  "Long Island City, NY",
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

export const BLOG_TAGS = ["ROOFING", "REPAIR", "MAINTENANCE", "NOR'EASTER", "INSPECTION", "NYC"];

export const PROJECTS_PAGE_STATS = [
  { value: "1800+", label: "Roofs Completed" },
  { value: "100%", label: "Satisfaction" },
  { value: "12+", label: "Years in NYC" },
  { value: "Lifetime", label: "Workmanship Warranty" },
];

export const ABOUT_STATS = [
  { value: "12+", label: "Years in NYC" },
  { value: "1800+", label: "Roofs completed" },
  { value: "100%", label: "Satisfaction" },
  { value: "4.9", label: "Average rating" },
];

export const CORE_VALUES = [
  {
    id: "reliability",
    title: "Reliability",
    description: "When we say we'll be there, we're there. NYC homeowners count on us to show up.",
    icon: "Shield" as const,
  },
  {
    id: "craftsmanship",
    title: "Quality Craftsmanship",
    description: "We never compromise on materials, workmanship, or finish. Built to last in NYC weather.",
    icon: "Award" as const,
  },
  {
    id: "local",
    title: "Local Expertise",
    description: "We know NYC roofs — brownstones, co-ops, walk-ups, single-families across all five boroughs.",
    icon: "Handshake" as const,
  },
];

export const CERTIFICATIONS = [
  { id: "dob", label: "NYC DOB", sub: "Registered Contractor" },
  { id: "certainteed", label: "CertainTeed", sub: "Master Shingle Applicator" },
  { id: "gaf", label: "GAF", sub: "Certified Contractor" },
  { id: "carlisle", label: "Carlisle", sub: "TPO/EPDM Certified" },
  { id: "owens", label: "Owens Corning", sub: "Preferred Contractor" },
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
    { question: "What roofing projects do you take on?", answer: "Residential re-roofs, repairs, new installs, commercial flat-roof systems, gutters, exterior renovations, and storm restoration across NYC." },
    { question: "Do you handle NYC permits?", answer: "Yes. We pull all required NYC DOB permits and coordinate inspections with the city." },
    { question: "Can you match my existing roof color?", answer: "Almost always. We carry samples from every major manufacturer and bring them on the estimate visit." },
  ],
  pricing: [
    { question: "Do you offer free estimates?", answer: "Yes. All NYC quotes are free with no obligation. We come to your property, inspect the roof, and provide a detailed written estimate." },
    { question: "How are change orders handled?", answer: "Any change is documented and approved in writing before work proceeds. No surprise fees." },
    { question: "Do you offer financing?", answer: "Yes. We partner with several NYC-area lenders to offer 0% intro and long-term payment plans for qualified homeowners." },
  ],
  timeline: [
    { question: "How long does a typical re-roof take?", answer: "Most single-family NYC homes are completed in 1-3 days. Larger brownstones or steeper roofs take 3-5 days." },
    { question: "What about weather delays?", answer: "We monitor NYC forecasts daily and never start a job we can't finish safely. If weather hits mid-job, we tarp and resume." },
  ],
  process: [
    { question: "How does your process work?", answer: "Free inspection → detailed written estimate → permits + schedule → installation → final walkthrough and clean-up. Simple, transparent, no surprises." },
    { question: "How often will I get updates?", answer: "Daily during installation, plus before-and-after photos of every job." },
  ],
  warranty: [
    { question: "What warranties do you offer?", answer: "Manufacturer warranties on materials (up to lifetime), plus our own workmanship warranty on the installation." },
    { question: "Who do I call after the job?", answer: "Our office — same team that installed your roof. We handle warranty calls in-house, not through a call center." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Roof installs, replacements, pinpoint repairs, NYC-grade flat roofing systems, exterior renovations, gutters and drainage, plus 24/7 emergency response across all five boroughs.";

export const COMMERCIAL_FITOUT_CARDS = [
  {
    id: "fast",
    title: "Fast Turnaround",
    description: "Most NYC residential roofs installed in 1-3 days from start to clean-up.",
    icon: "Zap" as const,
  },
  {
    id: "materials",
    title: "Top-Grade Materials",
    description: "Manufacturer-certified products with full warranty coverage for NYC weather.",
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
    category: "RESIDENTIAL ROOFING",
    title: "Roof Installation",
    subtitle: "NEW BUILDS · ADDITIONS · BROWNSTONE RE-DECKS",
    body: [
      "We engineer venting math, drip-edge layout, and underlayment coverage before shingles ever land — DOB packets and truss photos handled for NYC new construction and additions.",
      "Every starter course, ridge run, and valley is photographed for warranty registration and resale disclosure.",
    ],
    image:
      "https://images.unsplash.com/photo-1644604120663-4e5fcdf33104?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Manufacturer nailing-zone verification",
      "Ice & water shield in NYC code zones",
      "Ridge + soffit vent balance check",
      "DOB submittals when applicable",
      "Site protection + nightly dry-in discipline",
      "Workmanship + material warranty turnover",
    ],
  },
  {
    id: "roof-replacement",
    category: "RESIDENTIAL ROOFING",
    title: "Roof Replacement",
    subtitle: "TEAR-OFF · RE-DECK · SYSTEM UPGRADES",
    body: [
      "Architectural laminates to heavyweight designer shingles — decking replaced only where moisture warrants, with photo sign-off before we sheet forward.",
      "Supplement-ready documentation so code upgrades show up cleanly on NYC insurer scopes.",
    ],
    image:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Structural deck inspection lifts",
      "Dumpster choreography + driveway pads",
      "Synthetic underlayment + starter systems",
      "Flashing rework at stacks and walls",
      "Daily magnet sweep + gutter blow-out",
      "Manufacturer walk + homeowner QA packet",
    ],
  },
  {
    id: "roof-repair",
    category: "SERVICE & DIAGNOSTICS",
    title: "Roof Repair",
    subtitle: "LEAK TRACE · FLASHING · VENT BOOTS · RIDGE",
    body: [
      "We chase drips back to originating details — seldom is the fix \"new everything.\" Pipe boots, crickets, wall counter-flashing, and wind-lift tabs are documented with photos.",
      "Same-week mobilization for active NYC leaks; written recap tells you exactly what stopped the migration path.",
    ],
    image:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Interior + attic ingress notes",
      "Targeted teardown with moisture checks",
      "Matched shingle or metal trims",
      "Sealants spec'd for NYC freeze-thaw",
      "48h callback pledge on active emergencies",
      "Repair-scope warranty language in writing",
    ],
  },
  {
    id: "flat-roofing",
    category: "FLAT ROOF SYSTEMS",
    title: "Flat Roofing",
    subtitle: "TPO · EPDM · MODIFIED BITUMEN",
    body: [
      "NYC flat roofs need NYC-specific systems. We install TPO, EPDM rubber, and modified bitumen — mechanically attached, fully adhered, or torch-down depending on the building.",
      "Tapered insulation drainage and full parapet detailing — done with permit-clean documentation.",
    ],
    image:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Structural deck + insulation surveys",
      "Tapered iso drainage planning",
      "Parapet wall tie-ins + coping",
      "HVAC curb detail rework",
      "Roof-door safety logistics",
      "Maintenance log handoff",
    ],
  },
  {
    id: "shingle-roofing",
    category: "RESIDENTIAL ROOFING",
    title: "Shingle Roofing",
    subtitle: "ARCHITECTURAL · DESIGNER · IMPACT-RATED",
    body: [
      "Premium architectural and designer asphalt shingle systems with manufacturer warranties — built for NYC's pitched-roof neighborhoods in Staten Island, Queens, and the Bronx.",
      "Color selection brought on-site so you can compare against your fascia and siding in NYC daylight.",
    ],
    image:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Premium underlayment & starter strips",
      "Ice & water shield at eaves and valleys",
      "Ridge venting balanced to attic CFM",
      "Color sample on-site presentation",
      "Manufacturer warranty registration",
      "Workmanship warranty in writing",
    ],
  },
  {
    id: "emergency-roofing",
    category: "24/7 RESPONSE",
    title: "Emergency Roofing Services",
    subtitle: "TARP · INTERIOR GUARDS · SAFETY PLAN",
    body: [
      "When water is moving inward, rotation one is interior protection plus measured tarp anchors — never haphazard nails through living layers without a remediation plan.",
      "Phone handoff pins you directly to whichever NYC superintendent is coordinating storm routes that night.",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Rapid tarp + sandbag installs",
      "Ceiling poke-relief recommendations",
      "Moisture sensor placement options",
      "Next-morning forensic scope scheduling",
      "Carrier notification language support",
      "Follow-up permanent repair quoting",
    ],
  },
  {
    id: "gutters-drainage",
    category: "ROOF EDGE SYSTEMS",
    title: "Gutters & Drainage",
    subtitle: "SEAMLESS · GUARDS · NYC STORM DRAINS",
    body: [
      "Custom-roll seamless aluminum tied to fascia health — not caulk fantasies — with pitch checks that keep NYC downpours from overflowing the siding.",
      "Leader-to-drain tie-ins routed properly into NYC storm drainage where applicable.",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Pitch + outlet mapping",
      "Hidden hanger spacing to NYC wind zones",
      "Downspout extensions or buried drains",
      "Color-matched miters",
      "Flashing remediation at fascia rot",
      "Clean-out briefing for homeowners",
    ],
  },
  {
    id: "exterior-renovations",
    category: "EXTERIOR ENVELOPE",
    title: "Exterior Renovations",
    subtitle: "SIDING · FACADE · CORNICES · MASONRY",
    body: [
      "Full exterior overhauls coordinated with roof scopes — siding, brick repointing, cornice restoration, and facade work delivered as one integrated project.",
      "Permits pulled, parking secured, neighbors notified — NYC exterior renovations done the right way.",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Moisture screening behind legacy panels",
      "Flashing interplay with gutters",
      "Fiber-cement & engineered siding",
      "Cornice + trim restoration",
      "Brick repointing + facade prep",
      "Integrated warranty with roof scope",
    ],
  },
  {
    id: "storm-damage",
    category: "STORM RESTORATION",
    title: "Storm Damage Repair",
    subtitle: "NOR'EASTER · WIND · HAIL · INSURANCE",
    body: [
      "Granular forensic photos mapped to elevations and compass headings — ridges, valleys, soft metals, and collateral markers so adjusters defend the line items.",
      "Emergency tarp rotations when membranes are breached and rain is inbound; crews stage without pressuring deductible decisions.",
    ],
    image:
      "https://images.unsplash.com/photo-1695045194325-af9f065d5587?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Free storm-zone inspection buckets",
      "Adjuster-ready photo matrix",
      "Code upgrade documentation",
      "Material selection concierge",
      "Full replacement sequencing",
      "Post-build manufacturer registration",
    ],
  },
];

export const LEAD_FORM = {
  title: "Get Your Free Estimate",
  eyebrow: "PROTECT YOUR NYC HOME",
  description:
    "Get a free, no-obligation estimate from MrBuilderNYC. We respond within one business day with same-week site visits across the five boroughs.",
  bullets: [
    "Free inspection",
    "Detailed written estimate",
    "No obligation",
    "Insurance claim support",
  ],
  primaryCta: "GET FREE ESTIMATE",
  secondaryCta: "CALL NOW",
};
