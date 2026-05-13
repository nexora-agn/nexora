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
  eyebrow: "PROTECT YOUR HOME",
  headlineBefore: "Strong Roofs.",
  headlineHighlight: "Built to Last.",
  headlineAfter: "",
  body:
    "From fast repairs to full replacements, we deliver workmanship you can see from the curb — inspections, supplements, installs, and clean yards when we wrap.",
  primaryCta: { label: "GET A FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "CALL NOW", to: "/contact" },
  /** Unsplash — clay tile roof against open sky (strong negative space for hero copy). */
  image:
    "https://images.unsplash.com/photo-1587061633437-187ac80e8e7a?auto=format&fit=crop&w=1920&h=1080&q=85",
  featuredEyebrow: "BUILT TO LAST",
  featuredTitle: "Tile & Premium Roofing",
  featuredMeta: "Residential · Repairs to full replacements",
  trustPills: [
    { id: "inspect", label: "Free Inspection", sub: "in 24 Hours", icon: "Calendar" as const },
    { id: "pricing", label: "Upfront Pricing", sub: "No Surprise Line Items", icon: "Tag" as const },
    {
      id: "warranty",
      label: "Workmanship Warranty",
      sub: "Backed by Roofix QA",
      icon: "ShieldCheck" as const,
    },
  ],
  ratingCard: {
    score: "4.9",
    countLabel: "Based on 320+ reviews",
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
  { id: "roof-replacement", label: "ROOF REPLACEMENT", icon: "Hammer" as const },
  { id: "roof-repair", label: "ROOF REPAIR", icon: "Wrench" as const },
  { id: "storm-damage", label: "STORM DAMAGE", icon: "CloudLightning" as const },
  { id: "roof-inspection", label: "ROOF INSPECTION", icon: "ClipboardCheck" as const },
  { id: "gutter-installation", label: "GUTTER INSTALLATION", icon: "Droplets" as const },
  { id: "roof-installation", label: "ROOF INSTALLATION", icon: "Home" as const },
  { id: "emergency-repair", label: "EMERGENCY REPAIR", icon: "Zap" as const },
  { id: "commercial-roofing", label: "COMMERCIAL ROOFING", icon: "Building2" as const },
  { id: "siding", label: "SIDING", icon: "PanelTop" as const },
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
  {
    id: "roof-installation",
    title: "Roof Installation",
    icon: "Home",
    description:
      "New construction and first-time installs with manufacturer specs, vents balanced, and photo packets for HOA review.",
    image:
      "https://images.unsplash.com/photo-1644604120663-4e5fcdf33104?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "roof-repair",
    title: "Roof Repair",
    icon: "Wrench",
    description:
      "Flashing resets, slipped tabs, squirrel damage — small fixes scoped honestly before we pitch a tear-off.",
    image:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    icon: "Hammer",
    description:
      "Full detachments with ice & water shield, ridge venting engineered to your attic, and magnet passes every lift.",
    image:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "roof-inspection",
    title: "Roof Inspection",
    icon: "ClipboardCheck",
    description:
      "Attic + exterior documentation for buyers, insurers, or annual maintenance — written recap same visit.",
    image:
      "https://images.unsplash.com/photo-1580775815403-931167518e08?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "gutter-installation",
    title: "Gutter Installation",
    icon: "Droplets",
    description:
      "Seamless aluminum profiles, concealed hangers, guards optional — runoff routed away from the foundation.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "storm-damage",
    title: "Storm Damage Repair",
    icon: "CloudLightning",
    description:
      "Wind and hail lifts documented for adjusters — temporary tarps staged while your claim lines up.",
    image:
      "https://images.unsplash.com/photo-1695045194325-af9f065d5587?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "emergency-repair",
    title: "Emergency Roof Repair",
    icon: "Zap",
    description:
      "After-hours tarping, interior protection, and a written plan once the storm passes.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "siding",
    title: "Siding",
    icon: "PanelTop",
    description:
      "Fiber-cement and engineered siding tied back to drip edges so water never hides behind fascia.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&h=500&q=85",
  },
  {
    id: "commercial-roofing",
    title: "Commercial Roofing",
    icon: "Building2",
    description:
      "TPO/PVC membranes, tapered insulation packs, leak tracing on low-slope decks — phased for occupancy.",
    image:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=500&q=85",
  },
];

/** Homepage before/after fallback if `projects` content is empty on a preview. */
export const BEFORE_AFTER_PROJECTS = [
  {
    id: "modern-asphalt",
    title: "Architectural asphalt re-roof",
    location: "Houston, TX",
    beforeImage:
      "https://images.unsplash.com/photo-1655041404429-027ce0cf7b71?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&h=600&q=85",
  },
  {
    id: "metal-roof-estate",
    title: "Standing seam metal upgrade",
    location: "Austin, TX",
    beforeImage:
      "https://images.unsplash.com/photo-1705229753988-15e68d388ca7?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&h=600&q=85",
  },
  {
    id: "storm-restore",
    title: "Hail restoration",
    location: "Dallas, TX",
    beforeImage:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=600&q=85",
  },
  {
    id: "commercial-flat",
    title: "TPO membrane recovery",
    location: "Houston, TX",
    beforeImage:
      "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=800&h=600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=800&h=600&q=85",
  },
];

export const PROJECTS = [
  {
    id: "modern-asphalt",
    title: "Modern Asphalt Re-roof",
    category: "Residential",
    location: "Houston, TX",
    year: "2024",
    client: "Private Homeowner",
    value: "$18K",
    description:
      "Full tear-off and re-roof with architectural asphalt shingles, ice and water shield, and new flashing throughout.",
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
    id: "metal-roof-estate",
    title: "Standing Seam Metal Roof",
    category: "Residential",
    location: "Austin, TX",
    year: "2024",
    client: "Private Client",
    value: "$42K",
    description:
      "Premium 24-gauge standing seam metal roof system with concealed fasteners and matching gutters.",
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
    id: "storm-restore",
    title: "Hail Storm Restoration",
    category: "Residential",
    location: "Dallas, TX",
    year: "2024",
    client: "Insurance Claim",
    value: "$26K",
    description:
      "Insurance-coordinated full roof replacement after severe hail event, including decking repair and gutter replacement.",
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
    id: "commercial-flat",
    title: "TPO Commercial Roof",
    category: "Commercial",
    location: "Houston, TX",
    year: "2023",
    client: "Logistics Partners",
    value: "$185K",
    description:
      "60-mil TPO single-ply membrane replacement on a 38,000 sqft distribution warehouse with tapered insulation.",
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
  { id: "cedar-shake", title: "Cedar Shake Restoration", category: "Residential", location: "The Woodlands, TX", year: "2023", client: "Private Client", value: "$58K", description: "Hand-split cedar shake replacement with new copper valleys and stainless flashing for a heritage estate.", image: "https://images.unsplash.com/photo-1645075960701-573cbc669de6?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "cedar-shake", title: "Cedar Shake Restoration", category: "Residential", location: "The Woodlands, TX", year: "2023", client: "Private Client", value: "$58K", description: "Hand-split cedar shake replacement with new copper valleys and stainless flashing for a heritage estate.", image: "https://images.unsplash.com/photo-1645075960701-573cbc669de6?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "gutter-system", title: "Seamless Gutter Install", category: "Residential", location: "Sugar Land, TX", year: "2023", client: "Private Homeowner", value: "$6.8K", description: "Custom seamless 6-inch aluminum gutters with leaf guards and downspout extensions around full perimeter.", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "tile-replacement", title: "Clay Tile Replacement", category: "Residential", location: "Katy, TX", year: "2022", client: "Private Client", value: "$48K", description: "Spanish clay tile replacement with new underlayment system and copper accent flashing.", image: "https://images.unsplash.com/photo-1566543287897-35108aef906f?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "office-flat", title: "Office Building Re-roof", category: "Commercial", location: "Dallas, TX", year: "2022", client: "Skyline Properties", value: "$92K", description: "Modified bitumen roof replacement on three-story office building with full insulation upgrade.", image: "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
  { id: "siding-refresh", title: "Full Home Siding", category: "Residential", location: "Pearland, TX", year: "2024", client: "Private Homeowner", value: "$32K", description: "Fiber-cement siding installation with new trim, soffits, and fascia for a refreshed exterior.", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&h=600&q=85", gallery: [] },
];

export const SIGNATURE_PROJECT_COUNT = 4;
export const PROJECTS_LATEST_PAGE_SIZE = 3;

export const TEAM = [
  { id: "marcus-reid", name: "Marcus Reid", role: "Founder & Master Roofer", bio: "Two decades of roofing leadership. Founded Roofix in 2009.", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "alicia-hayes", name: "Alicia Hayes", role: "Director of Operations", bio: "Runs scheduling, estimating, and the customer experience end-to-end.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "kenji-okafor", name: "Kenji Okafor", role: "Senior Roofing Superintendent", bio: "Delivered hundreds of residential re-roofs and commercial replacements.", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "sara-blanco", name: "Sara Blanco", role: "Insurance Claims Lead", bio: "Helps homeowners navigate storm and hail insurance claims start to finish.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "dwight-park", name: "Dwight Park", role: "Lead Estimator", bio: "Precise material take-offs and transparent quotes on every job.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
  { id: "lana-cole", name: "Lana Cole", role: "Safety Director", bio: "OSHA-certified safety leader. Owns site protocols across every crew.", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&h=400&q=85", social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Michael T.", role: "Houston, TX", quote: "Roofix did an amazing job on our new roof. The team was professional, on time, and the quality is outstanding.", avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "Sarah L.", role: "Austin, TX", quote: "Great experience from start to finish. They explained everything clearly and the results exceeded our expectations.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "James R.", role: "Dallas, TX", quote: "Highly recommend Roofix. Honest pricing, great communication, and excellent workmanship.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "Diana K.", role: "Sugar Land, TX", quote: "After the storm, they handled everything with our insurance. Roof looks better than before.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
  { name: "Carlos H.", role: "Katy, TX", quote: "Honest, reliable, and fast. They saved us thousands compared to the first quote we got.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=85", rating: 5 },
];

export const BLOG_POSTS = [
  { id: "signs-new-roof", title: "5 Signs You Need a New Roof", excerpt: "How to tell whether it's time to replace your roof before bigger problems start.", date: "May 15, 2024", author: "Marcus Reid", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&h=400&q=85", content: "Most roofs give clear warning signs long before they fail catastrophically. Curling shingles, granules in the gutters, daylight in the attic, and rising energy bills are the four most common signals it's time for a replacement.\n\nIf your roof is over 20 years old, even cosmetic damage is worth a professional inspection — small leaks compound fast in the attic deck below." },
  { id: "right-roofing-material", title: "How to Choose the Right Roofing Material", excerpt: "Asphalt, metal, tile, or cedar — picking the right system for your climate and budget.", date: "May 1, 2024", author: "Alicia Hayes", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1580775815403-931167518e08?auto=format&fit=crop&w=600&h=400&q=85", content: "Architectural asphalt shingles remain the best value for most homeowners — 25-30 year warranty, broad color selection, and easy repairs. Metal roofs cost more upfront but can last 50+ years with minimal maintenance.\n\nTile and cedar are premium choices that look beautiful but require structure-rated decking and specialty installers. We walk you through each option during the free estimate." },
  { id: "spring-maintenance", title: "Spring Roof Maintenance Tips", excerpt: "The annual checklist that prevents emergency calls later in the year.", date: "April 22, 2024", author: "Kenji Okafor", category: "Maintenance", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&h=400&q=85", content: "Spring is the perfect time to clear winter debris, check flashing seals, and unclog gutters before summer storms arrive. A 30-minute inspection by a homeowner — or a free professional check — can catch issues worth thousands later." },
  { id: "regular-inspections-matter", title: "Why Regular Roof Inspections Matter", excerpt: "How a small inspection schedule can extend the life of any roof by 5+ years.", date: "April 10, 2024", author: "Marcus Reid", category: "Maintenance", image: "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=600&h=400&q=85", content: "An annual or bi-annual inspection is the single best thing you can do for your roof. We document any wear, photograph problem areas, and give you a written report you can keep in your homeowner records." },
  { id: "storm-damage-claim", title: "Filing a Storm Damage Insurance Claim", excerpt: "Step-by-step guide for getting your hail or wind damage claim approved.", date: "March 28, 2024", author: "Sara Blanco", category: "Storm Damage", image: "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=600&h=400&q=85", content: "Document everything immediately after a storm: photos of the roof, the date, and any visible interior damage. Call your insurance company within 48 hours and request a professional roof inspection before any temporary repairs." },
  { id: "metal-vs-asphalt", title: "Metal vs Asphalt: Which Is Right for You?", excerpt: "An honest cost-benefit comparison from a contractor who installs both.", date: "March 5, 2024", author: "Marcus Reid", category: "Roofing Tips", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&h=400&q=85", content: "Asphalt wins on upfront cost — typically half the price of metal. Metal wins on longevity, energy efficiency, and resale value. Both are excellent when installed correctly." },
  { id: "gutter-importance", title: "Why Gutters Are Critical to Your Roof", excerpt: "Clogged or undersized gutters cause more roof damage than most homeowners realize.", date: "February 18, 2024", author: "Kenji Okafor", category: "Maintenance", image: "https://images.unsplash.com/photo-1645075960701-573cbc669de6?auto=format&fit=crop&w=600&h=400&q=85", content: "Water that doesn't drain off your roof goes somewhere — usually into the fascia, soffits, and eventually the attic deck. A properly sized seamless gutter system is one of the cheapest ways to protect a roof." },
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
  { label: "Roof Replacement", to: "/services/roof-replacement" },
  { label: "Roof Repair", to: "/services/roof-repair" },
  { label: "Roof Installation", to: "/services/roof-installation" },
  { label: "Storm Damage", to: "/services/storm-damage" },
  { label: "Emergency Repair", to: "/services/emergency-repair" },
  { label: "Roof Inspection", to: "/services/roof-inspection" },
  { label: "Gutter Installation", to: "/services/gutter-installation" },
  { label: "Commercial Roofing", to: "/services/commercial-roofing" },
  { label: "Siding", to: "/services/siding" },
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
  "Roof replacements, pinpoint repairs, new-construction installs, storm and insurance workflows, gutters, siding, emergency tarping — and low-slope systems for warehouses and retail envelopes.";

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
    category: "RESIDENTIAL ROOFING",
    title: "Roof Installation",
    subtitle: "NEW BUILDS · ADDITIONS · FIRST-TIME DECKS",
    body: [
      "We engineer venting math, drip-edge layout, and underlayment coverage before shingles land — HOA packets and truss photos handled for new construction and infill builders.",
      "Every starter course, ridge run, and valley is photographed for warranty registration and resale disclosure packages.",
    ],
    image:
      "https://images.unsplash.com/photo-1644604120663-4e5fcdf33104?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Manufacturer nailing-zone verification",
      "Ice & water in code-driven zones",
      "Ridge + soffit vent balance check",
      "HOA/submittals when applicable",
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
      "Architectural laminates to heavyweight designer shingles — decking replaced only where moisture says so, with photo sign-off before we sheet forward.",
      "Supplement-ready documentation so code upgrades like drip edge and ice/water shield show up cleanly on insurer scopes.",
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
      "We chase drips back to originating details — seldom is the fix “new everything.” Pipe boots, crickets, wall counter-flashing, and wind-lift tabs are documented with photos.",
      "Same-week mobilization routes for active leaks; written recap tells you exactly what stopped the migration path.",
    ],
    image:
      "https://images.unsplash.com/photo-1760331840361-d751cfc1becf?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Interior + attic ingress notes",
      "Targeted teardown with moisture checks",
      "Matched shingle or metal trims",
      "Sealant specs that survive Texas heat cycles",
      "48h callback pledge on active emergencies",
      "Repair-scope warranty language in writing",
    ],
  },
  {
    id: "storm-damage",
    category: "STORM RESTORATION",
    title: "Storm Damage Repair",
    subtitle: "HAIL · WIND · INSURANCE · SUPPLEMENTS",
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
  {
    id: "emergency-repair",
    category: "24/7 RESPONSE",
    title: "Emergency Roof Repair",
    subtitle: "TARP · INTERIOR GUARDS · SAFETY PLAN",
    body: [
      "When water is moving inward, rotation one is interior protection plus measured tarp anchors — never haphazard nails through living layers without a remediation plan.",
      "Phone handoff pins you directly to whichever superintendent is coordinating storm routes that night.",
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
    id: "roof-inspection",
    category: "SERVICE & DIAGNOSTICS",
    title: "Roof Inspection",
    subtitle: "BUY · SELL · ANNUAL · INSURANCE RENEWAL",
    body: [
      "Whether you’re underwriting a resale or prepping for insurer photo audits, inspections include attic pulls, decking samples, ventilation math, and clear pass/future-watch notes.",
      "Reports deliver same day as the walk whenever lighting and safety allow.",
    ],
    image:
      "https://images.unsplash.com/photo-1580775815403-931167518e08?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Slope-by-slope photo album",
      "Remaining life expectancy band",
      "Maintenance backlog ranked by urgency",
      "Drone add-on upon request",
      "Digital PDF for agents + adjusters",
      "Estimate companion if repairs quoted",
    ],
  },
  {
    id: "gutter-installation",
    category: "ROOF EDGE SYSTEMS",
    title: "Gutter Installation",
    subtitle: "SEAMLESS · GUARDS · DOWNSPOUT PLANES",
    body: [
      "Custom-roll seamless aluminum tied to fascia health — not caulk fantasies — with pitch checks that keep Texas downpouts from overflowing siding.",
      "Leaf guard systems quoted only where tree load justifies ROI.",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Pitch + outlet mapping",
      "Hidden hanger spacing to wind zones",
      "Downspout extensions or buried drains",
      "Color-matched miters",
      "Flashing remediation at fascia rot",
      "Clean-out briefing for homeowners",
    ],
  },
  {
    id: "commercial-roofing",
    category: "LOW-SLOPE COMMERCIAL",
    title: "Commercial Roofing",
    subtitle: "TPO · PVC · MOD BIT · METAL CAPITAL",
    body: [
      "Mechanically adhered and fully welded assemblies with phased mobilization — ideal for warehouses, tilt-wall retail, clinics, and school boards that can’t tolerate multi-week closures.",
      "Leak response retainers optionally bundle infrared sweeps quarterly.",
    ],
    image:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Structural deck + insulation surveys",
      "Tapered iso drain planning",
      "Parapet wall tie-ins + coping",
      "HVAC curb detail rework",
      "Roof-door safety logistics",
      "Maintenance log handoff",
    ],
  },
  {
    id: "siding",
    category: "EXTERIOR ENVELOPE",
    title: "Siding",
    subtitle: "FIBER CEMENT · TRIM STACK · WATER DETAILING",
    body: [
      "Roof-water management doesn’t stop at fascia. We reinstall siding assemblies with breathable WRB detail, drip caps that talk to shingles, and color-matched trims.",
      "Integrated scheduling when siding touches active roof facets mid-project.",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&h=700&q=85",
    inclusions: [
      "Moisture screening behind legacy panels",
      "Flashing interplay with gutters",
      "JamesHardie-level fastener discipline",
      "Paint-ready caulk sequencing",
      "Soffit + ventilated detail upgrades",
      "Integrated warranty wording with roof scopes",
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
