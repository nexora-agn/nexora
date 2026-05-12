export const COMPANY = {
  name: "Summit Construction",
  /** Subtitle under logo in header/footer when using wordmark */
  legalName: "SUMMIT CONSTRUCTION",
  tagline: "Built on experience. Focused on quality. Delivering exceptional commercial and residential construction in Texas since 2004.",
  phone: "(817) 555-0198",
  email: "info@summitconstruction.com",
  address: "123 Construction Way, Dallas, TX 75201",
  hours: "Mon - Fri: 7:00 AM - 6:00 PM · 24/7 Emergency Service",
};

/** Top announcement / review bar (the brown strip across the top). */
export const SITE_TOP = {
  /** Tagline on the far left of the announcement bar. */
  tagline: "Building Better. Together.",
  /** Trust badges in the centre. */
  badges: "Licensed & Insured · Bonded · 100% Satisfaction Guarantee",
  /** Headline rating shown next to the Google "G". */
  ratingValue: "4.9",
  /** Number of reviews. */
  ratingCount: "260+ Reviews",
  /** Legacy fields kept so older drafts still render. */
  line: "Building Better. Together.",
  locations: "Licensed & Insured · Bonded · 100% Satisfaction Guarantee",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "7:00 AM - 6:00 PM" },
  { days: "Saturday", hours: "By Appointment" },
  { days: "Sunday", hours: "Closed" },
];

/** Google Maps embed (Dallas, TX). Replace with your own iframe if needed. */
export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-96.85%2C32.74%2C-96.74%2C32.82&layer=mapnik&marker=32.7767,-96.7970";

/** Homepage hero. Edit copy here; colors come from the Customize panel. */
export const HOME_HERO = {
  /** Eyebrow above the headline. */
  eyebrow: "FULL-SERVICE CONSTRUCTION COMPANY",
  headlineBefore: "Built on Experience.",
  /** The word(s) shown in the accent (yellow) color. */
  headlineHighlight: "Quality.",
  headlineAfter: "Focused on",
  body:
    "Commercial and residential builds delivered start to finish, with senior-led crews, honest schedules, and a single point of accountability from groundbreak to handover.",
  primaryCta: { label: "GET A FREE ESTIMATE", to: "/contact" },
  secondaryCta: { label: "CALL NOW", to: "/contact" },
  image:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1200&fit=crop",
  featuredEyebrow: "FEATURED PROJECT",
  featuredTitle: "Dallas Corporate Tower",
  featuredMeta: "Dallas, TX · 18-Month Build",
  /** Trust pills shown beneath the hero CTAs. */
  trustPills: [
    { id: "ontime", label: "On Time", sub: "On Budget", icon: "Clock" as const },
    { id: "premium", label: "Premium", sub: "Quality", icon: "Award" as const },
    { id: "licensed", label: "Licensed", sub: "& Insured", icon: "ShieldCheck" as const },
    { id: "satisfaction", label: "Satisfaction", sub: "Guaranteed", icon: "BadgeCheck" as const },
  ],
};

/** The 5-card services grid on the homepage.
 *  IDs intentionally match `SERVICES[].id` so each card deep-links to the
 *  correct service detail page. */
export const SERVICES_RIBBON = [
  { id: "commercial-construction", label: "COMMERCIAL CONSTRUCTION", icon: "Building2" as const },
  { id: "residential-construction", label: "RESIDENTIAL CONSTRUCTION", icon: "Home" as const },
  { id: "construction-management", label: "CONSTRUCTION MANAGEMENT", icon: "HardHat" as const },
  { id: "design-build", label: "DESIGN-BUILD SERVICES", icon: "DraftingCompass" as const },
  { id: "renovation", label: "RENOVATION & ADDITIONS", icon: "Hammer" as const },
];

export const CAPABILITIES = [
  {
    id: "new-build",
    title: "New Build",
    description: "Ground-up homes and commercial buildings tailored to your needs.",
    icon: "Home" as const,
    to: "/services/residential-construction",
  },
  {
    id: "renovations",
    title: "Renovations",
    description: "Structural upgrades, additions, and full-scale transformations.",
    icon: "Wrench" as const,
    to: "/services/renovation",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Office, retail, and warehouse projects delivered on schedule.",
    icon: "Building2" as const,
    to: "/services/commercial-construction",
  },
  {
    id: "design-build",
    title: "Design-Build",
    description: "One team from concept through completion, accountable end to end.",
    icon: "DraftingCompass" as const,
    to: "/services/design-build",
  },
];

export const PROCESS_STEPS = [
  { id: "consult", label: "Consultation", description: "Free on-site consultation and project scoping." },
  { id: "design", label: "Design", description: "Plans and 3D renderings refined with you." },
  { id: "estimate", label: "Estimate", description: "Detailed transparent pricing with no surprises." },
  { id: "build", label: "Build", description: "On-time, on-budget construction with weekly updates." },
  { id: "handover", label: "Handover", description: "Final walkthrough, training, and closeout." },
  { id: "warranty", label: "Warranty", description: "Workmanship warranty and ongoing support." },
];

export const HOME_STATS = [
  { value: "20+", label: "Years Experience", icon: "Award" as const },
  { value: "500+", label: "Projects Completed", icon: "Building2" as const },
  { value: "98%", label: "Client Satisfaction", icon: "Smile" as const },
  { value: "A+", label: "BBB Rating", icon: "Award" as const },
  { value: "100%", label: "Licensed & Insured", icon: "ShieldCheck" as const },
  { value: "Quality", label: "Craftsmanship", icon: "BadgeCheck" as const },
];

export const WHY_BENEFITS = [
  {
    title: "Transparent budgets",
    description: "Milestones, allowances, and changes documented so there are no surprises.",
    icon: "ClipboardCheck" as const,
  },
  {
    title: "Senior-led sites",
    description: "Experienced superintendents on every job, not rotating rookies.",
    icon: "Users" as const,
  },
];

export const SERVICES = [
  { id: "commercial-construction", title: "Commercial Construction", icon: "Building2", description: "Office buildings, retail spaces, warehouses and more.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop" },
  { id: "residential-construction", title: "Residential Construction", icon: "Home", description: "Custom homes, additions, remodels and everything in between.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop" },
  { id: "construction-management", title: "Construction Management", icon: "HardHat", description: "Expert project management to ensure quality, timelines and budgets.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
  { id: "design-build", title: "Design-Build Services", icon: "DraftingCompass", description: "One team from start to finish for a seamless building experience.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop" },
  { id: "renovation", title: "Renovation & Additions", icon: "Hammer", description: "Transform your space with our renovation and expansion services.", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop" },
  { id: "green-building", title: "Green Building", icon: "Leaf", description: "Sustainable construction practices for an eco-friendly future.", image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&h=400&fit=crop" },
];

export const PROJECTS = [
  { id: "corporate-office", title: "Corporate Office Building", category: "Commercial", location: "Dallas, TX", year: "2024", client: "Skyline Development Corp", value: "$28M", description: "A modern Class-A corporate headquarters with sustainable design and Class-A finishes throughout.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop"] },
  { id: "modern-home", title: "Modern Custom Home", category: "Residential", location: "Fort Worth, TX", year: "2024", client: "Private Client", value: "$2.4M", description: "Custom 6,200 sqft contemporary residence with infinity pool, smart-home automation, and craft-millwork interiors.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop", gallery: [] },
  { id: "retail-center", title: "Retail Shopping Center", category: "Commercial", location: "Frisco, TX", year: "2023", client: "Northshore Retail Group", value: "$18M", description: "Open-air retail destination featuring 28 storefronts, food hall, and dedicated parking structure.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop", gallery: [] },
  { id: "commercial-warehouse", title: "Commercial Warehouse", category: "Industrial", location: "Arlington, TX", year: "2023", client: "Logistics Partners LLC", value: "$12M", description: "180,000 sqft tilt-wall distribution facility with 32-foot clear heights and 22 dock doors.", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop", gallery: [] },
  { id: "luxury-residence", title: "Hilltop Luxury Estate", category: "Residential", location: "Plano, TX", year: "2023", client: "Private Client", value: "$4.5M", description: "Bespoke 8,500 sqft estate with guest house, wine room, and resort-style outdoor living.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", gallery: [] },
  { id: "medical-office", title: "Medical Office Plaza", category: "Commercial", location: "Dallas, TX", year: "2022", client: "North Texas Health Partners", value: "$22M", description: "Three-building medical campus with state-of-the-art diagnostic imaging and ambulatory surgery suite.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", gallery: [] },
  { id: "boutique-hotel", title: "Boutique Hotel Renovation", category: "Hospitality", location: "Dallas, TX", year: "2022", client: "Hospitality Group of Texas", value: "$8.7M", description: "Full-property renovation of a 96-key boutique hotel including all guest rooms, lobby, and rooftop bar.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", gallery: [] },
  { id: "tenant-improvement", title: "Corporate Tenant Improvement", category: "Commercial", location: "Fort Worth, TX", year: "2022", client: "Confidential Fortune 500", value: "$6.2M", description: "Phased after-hours tenant improvement of 110,000 sqft across three floors with no business interruption.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop", gallery: [] },
  { id: "restaurant-buildout", title: "Flagship Restaurant Buildout", category: "Hospitality", location: "Plano, TX", year: "2024", client: "Summit Hospitality Inc.", value: "$3.1M", description: "From shell to opening night in 14 weeks: bespoke millwork bar, exhibition kitchen, and outdoor patio.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop", gallery: [] },
];

/** Hero/signature grid uses the first N projects; “Latest deliveries” paginates the rest. */
export const SIGNATURE_PROJECT_COUNT = 4;
export const PROJECTS_LATEST_PAGE_SIZE = 3;

export const TEAM = [
  { id: "michael-summit", name: "Michael Summit", role: "Founder & CEO", bio: "Three decades of construction leadership, founder of Summit Construction in 2004.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "sarah-chen", name: "Sarah Chen", role: "Director of Operations", bio: "Expert in operations and quality systems with deep commercial construction experience.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "michael-rodriguez", name: "Michael Rodriguez", role: "Senior Project Manager", bio: "Delivered $400M+ in commercial projects across North Texas.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "emily-watson", name: "Emily Watson", role: "Design-Build Lead", bio: "Architect-led design-build delivery, including custom residential and commercial.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "david-park", name: "David Park", role: "Chief Estimator", bio: "Detailed cost engineering and value-engineering across all market sectors.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "lisa-thompson", name: "Lisa Thompson", role: "Safety Director", bio: "OSHA-certified safety leader with an industry-leading EMR record.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Jason T.", role: "Dallas, TX", quote: "Summit Construction exceeded our expectations. The team was professional, communicative and delivered on time and within budget.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop", rating: 5 },
  { name: "Sarah M.", role: "Fort Worth, TX", quote: "Their attention to detail and quality of work is unmatched. We will definitely use them for future projects.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", rating: 5 },
  { name: "Michael R.", role: "Plano, TX", quote: "Honest, reliable and high quality work. It's rare to find a construction company you can truly trust.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop", rating: 5 },
  { name: "Linda K.", role: "Frisco, TX", quote: "From the first walk-through to the final punch list, they were on top of every detail. Highly recommended.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop", rating: 5 },
  { name: "Carlos H.", role: "Arlington, TX", quote: "Best contractor we've ever worked with. Built our headquarters two weeks ahead of schedule.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop", rating: 5 },
];

export const BLOG_POSTS = [
  { id: "future-of-construction", title: "The Future of Sustainable Construction", excerpt: "Exploring how green building practices are reshaping the construction industry.", date: "March 15, 2024", author: "Sarah Chen", category: "Sustainability", image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&h=400&fit=crop", content: "Sustainable construction is no longer a trend. It's the future. From recycled materials to energy-efficient designs, the industry is evolving rapidly. At Summit Construction, we've embraced LEED certification standards across all our new projects.\n\nKey innovations include solar-integrated building materials, smart energy management systems, and water recycling infrastructure. These technologies not only reduce environmental impact but also lower long-term operational costs for building owners." },
  { id: "choosing-contractor", title: "How to Choose the Right Contractor", excerpt: "Key factors to consider when selecting a construction partner for your project.", date: "February 28, 2024", author: "Michael Summit", category: "Tips", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", content: "Choosing the right contractor can make or break your construction project. First, verify credentials and insurance. A reputable contractor should have proper licensing, bonding, and comprehensive insurance coverage.\n\nSecond, review their portfolio. Look for projects similar in scope and complexity to yours. Ask for references and actually contact them.\n\nThird, get detailed written estimates. Compare not just the bottom line, but the specifics of what's included." },
  { id: "smart-buildings", title: "Smart Building Technologies in 2024", excerpt: "How IoT and automation are transforming modern construction and building management.", date: "January 10, 2024", author: "David Park", category: "Technology", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", content: "Smart building technologies are revolutionizing how we design, construct, and manage buildings. From IoT sensors to AI-powered energy management, the possibilities are endless." },
  { id: "prefab-momentum", title: "Prefab Momentum in Urban Infill", excerpt: "Why modular assemblies are winning on tight city lots without sacrificing design intent.", date: "December 5, 2023", author: "Sarah Chen", category: "Technology", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop", content: "Prefabrication is shedding its industrial-only reputation. On constrained sites, volumetric modules cut calendar time while holding tolerances that stick-built crews struggle to repeat." },
  { id: "site-safety-culture", title: "Building a Site Safety Culture That Sticks", excerpt: "Leading indicators, toolbox talks, and accountability from the GC down.", date: "November 18, 2023", author: "Michael Rodriguez", category: "Tips", image: "https://images.unsplash.com/photo-1581092160562-40aa08e2c586?w=600&h=400&fit=crop", content: "Safety is not a poster. It is a daily choice reinforced by how we plan lifts, sequence trades, and debrief near misses." },
  { id: "cost-certainty", title: "Cost Certainty in Volatile Markets", excerpt: "How we lock allowances, hedge long-lead buys, and communicate trade-offs early.", date: "October 2, 2023", author: "Michael Summit", category: "Tips", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", content: "Owners deserve numbers they can plan around. We pair milestone pricing with transparent contingency bands and weekly burn reports." },
  { id: "mass-timber", title: "Mass Timber: Where Code and Craft Meet", excerpt: "A primer on hybrid structures, fire design, and supplier coordination.", date: "September 12, 2023", author: "Sarah Chen", category: "Sustainability", image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&h=400&fit=crop", content: "Timber is no longer niche. With updated code paths and experienced fabricators, we deliver exposed structure without apologizing for performance." },
];

export const STATS = [
  { value: 500, label: "Projects Completed", suffix: "+" },
  { value: 20, label: "Years Experience", suffix: "+" },
  { value: 75, label: "Team Members", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
];

export const FAQ_ITEMS = [
  { question: "What types of projects does Summit Construction handle?", answer: "We handle commercial buildings, residential homes, renovations, industrial facilities and tenant improvements across North Texas. Our team has expertise across all construction sectors." },
  { question: "How do you ensure project quality?", answer: "We implement rigorous quality control processes at every stage. This includes regular inspections, material testing, compliance checks, and third-party quality audits." },
  { question: "What is your typical project timeline?", answer: "Timelines vary based on project scope and complexity. A typical residential project takes 6-12 months, while commercial projects may range from 12-24 months. We provide detailed timelines during the planning phase." },
  { question: "Do you offer financing options?", answer: "We work with several financial institutions to offer competitive financing options for qualified projects. Our team can help you explore the best options for your budget." },
  { question: "Are you licensed and insured?", answer: "Absolutely. Summit Construction maintains all required state and local licenses, comprehensive general liability insurance, and workers' compensation coverage." },
  { question: "How do I get a project estimate?", answer: "Contact us through our website or call us directly. We'll schedule a free consultation to discuss your project needs and provide a detailed written estimate at no obligation." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "About Us", path: "/about" },
  { label: "Journal", path: "/blog" },
  { label: "Reviews", path: "/reviews" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Commercial Construction", to: "/services/commercial-construction" },
  { label: "Residential Construction", to: "/services/residential-construction" },
  { label: "Construction Management", to: "/services/construction-management" },
  { label: "Design-Build", to: "/services/design-build" },
  { label: "Renovation & Additions", to: "/services/renovation" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Journal", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

/** Service areas shown in the footer column. */
export const SERVICE_AREAS: string[] = [
  "Dallas, TX",
  "Fort Worth, TX",
  "Arlington, TX",
  "Plano, TX",
  "Frisco, TX",
];

/** List posts per page (below the featured article on page 1). */
export const BLOG_LIST_PAGE_SIZE = 2;

/** Category sidebar counts, derived from `BLOG_POSTS`. */
export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) {
    m.set(p.category, (m.get(p.category) || 0) + 1);
  }
  return [...m.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const BLOG_TAGS = ["BUILD", "DESIGN", "RENOVATION", "COMMERCIAL", "RESIDENTIAL", "TIPS"];

export const PROJECTS_PAGE_STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Timeline Accuracy" },
  { value: "85%", label: "Repeat Clients" },
  { value: "10-Year", label: "Warranty" },
];

export const ABOUT_STATS = [
  { value: "20+", label: "Years of experience" },
  { value: "500+", label: "Projects completed" },
  { value: "98%", label: "Repeat customers" },
  { value: "85%", label: "Client growth" },
];

export const CORE_VALUES = [
  {
    id: "quality",
    title: "Quality",
    description: "Materials, trades, and inspections held to a single uncompromising standard.",
    icon: "Award" as const,
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "Open books on allowances, schedules, and decisions. No black boxes.",
    icon: "Eye" as const,
  },
  {
    id: "reliability",
    title: "Reliability",
    description: "We show up, hit milestones, and communicate before small issues become big ones.",
    icon: "Handshake" as const,
  },
  {
    id: "safety",
    title: "Safety",
    description: "Site-specific plans, training, and audits on every project, every day.",
    icon: "Shield" as const,
  },
];

export const CERTIFICATIONS = [
  { id: "abc", label: "ABC", sub: "Associated Builders & Contractors" },
  { id: "agc", label: "AGC", sub: "Associated General Contractors" },
  { id: "build", label: "Build With Strength", sub: "NRMCA Member" },
  { id: "bbb", label: "BBB Accredited", sub: "A+ Rating" },
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
    {
      question: "What project types do you take on?",
      answer:
        "We deliver ground-up residential, custom homes, commercial offices, retail centers, warehouses, and select industrial work across North Texas.",
    },
    {
      question: "Do you handle necessary building permits?",
      answer:
        "Yes. Our team coordinates submissions, code reviews, inspections, and sign-offs. You receive a clear permit tracker in your project portal.",
    },
    {
      question: "Can you work with my architect?",
      answer:
        "Absolutely. We integrate early with your architect and engineers, or provide full design-build under one contract — whichever fits your project.",
    },
  ],
  pricing: [
    {
      question: "Do you offer fixed pricing for projects?",
      answer:
        "Where scope is definable, we provide fixed-price milestones with documented allowances. When unknowns remain, we use transparent T&M bands with caps and weekly burn reports.",
    },
    {
      question: "How are change orders handled?",
      answer:
        "Every change is written, priced, and approved before work proceeds. No verbal-only changes — protecting both sides.",
    },
    {
      question: "What payment structure do you use?",
      answer:
        "Typically milestone-based draws tied to verifiable completion. We align schedules with your lender if financing is involved.",
    },
  ],
  timeline: [
    {
      question: "What is your typical project timeline?",
      answer:
        "Timelines depend on scope, permits, and procurement. Broadly: renovations 4–12 months, new builds 12–24 months, commercial fit-outs 6–18 months.",
    },
    {
      question: "How do you mitigate delays?",
      answer:
        "Long-lead items are ordered early, subs are locked with backup crews, and we maintain float in the schedule for inspections and weather.",
    },
  ],
  process: [
    {
      question: "How does your process work?",
      answer:
        "Discovery → design alignment → planning & permits → build with weekly reporting → structured handover → aftercare. You always know the gate you’re in.",
    },
    {
      question: "How often will I get updates?",
      answer:
        "Weekly written updates with photos, plus immediate alerts for decisions that affect cost or schedule.",
    },
  ],
  warranty: [
    {
      question: "What kind of warranty do you provide?",
      answer:
        "We provide manufacturer warranties on installed systems plus our 10-year structural workmanship warranty. Terms are spelled out in your closeout package.",
    },
    {
      question: "Who do I call after move-in?",
      answer:
        "A dedicated aftercare line and portal ticket. Same team that built it — not a call center.",
    },
  ],
};

export const SERVICES_PAGE_INTRO =
  "End-to-end construction and design, from feasibility through handover, with one accountable partner and clear communication at every stage.";

export const COMMERCIAL_FITOUT_CARDS = [
  {
    id: "fast",
    title: "Fast-Track Delivery",
    description: "Phased schedules and night shifts when your business can't stop.",
    icon: "Zap" as const,
  },
  {
    id: "sourcing",
    title: "Material Sourcing",
    description: "Trusted vendor network with QA at receipt, for fewer surprises on site.",
    icon: "Package" as const,
  },
  {
    id: "docs",
    title: "Project Documentation",
    description: "As-builts, O&M manuals, and digital turnover in one place.",
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
    id: "commercial",
    category: "COMMERCIAL",
    title: "Commercial Construction",
    subtitle: "OFFICE · RETAIL · WAREHOUSE · MEDICAL",
    body: [
      "We orchestrate architecture, structure, MEP, and interiors as a single thread, reducing gaps between design intent and field execution.",
      "Expect fixed milestone pricing options where scope allows, plus a single point of contact from groundbreaking through certificate of occupancy.",
    ],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=700&fit=crop",
    inclusions: [
      "Feasibility & budgeting",
      "Permit coordination",
      "Site logistics & safety",
      "Quality inspections",
      "Commissioning",
      "Warranty & closeout",
    ],
  },
  {
    id: "residential",
    category: "RESIDENTIAL",
    title: "Custom Homes & Additions",
    subtitle: "WHEN YOU NEED TO REMAIN IN-PLACE, WE PHASE THE WORK",
    body: [
      "Structural modifications, envelope upgrades, and full interior reimagining, sequenced to protect livability and schedule.",
      "Dust control, temporary kitchens/baths, and daily cleanup standards are part of the plan, not an afterthought.",
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&h=700&fit=crop",
    inclusions: [
      "Existing conditions survey",
      "Phasing plan",
      "Code & energy upgrades",
      "Protective barriers",
      "Weekly walkthroughs",
      "Punch & warranty",
    ],
  },
  {
    id: "design-build",
    category: "DESIGN-BUILD",
    title: "Design-Build Services",
    subtitle: "ONE TEAM, ONE CONTRACT, ZERO FINGER-POINTING",
    body: [
      "We bring architects, engineers, and builders under one roof. You get a single accountable partner from concept sketches to certificate of occupancy.",
      "Cost certainty arrives earlier in the process because pricing happens alongside design — not after.",
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=700&fit=crop",
    inclusions: [
      "Conceptual design",
      "Pricing during design",
      "Permit & code review",
      "BIM coordination",
      "Construction management",
      "As-built documentation",
    ],
  },
];

export const LEAD_FORM = {
  title: "Get a Free Estimate",
  eyebrow: "LET'S BUILD SOMETHING GREAT TOGETHER",
  description:
    "Tell us about your project. We respond within one business day with next steps.",
  bullets: [
    "Free consultation",
    "Detailed project estimate",
    "No obligation",
    "Answer all your questions",
  ],
  primaryCta: "GET A FREE ESTIMATE",
  secondaryCta: "CALL NOW",
};
