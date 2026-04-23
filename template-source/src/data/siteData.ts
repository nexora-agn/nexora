export const COMPANY = {
  name: "CONSTRUCTO",
  /** Subtitle under logo in header/footer when using wordmark */
  legalName: "CONSTRUCTO PREMIUM BUILDERS",
  tagline: "Elevating construction standards with design-build excellence since 2008.",
  phone: "+1 (800) 123-4567",
  email: "hello@constructo.com",
  address: "1234 Builder's Avenue, Suite 100, New York, NY 10001",
  hours: "Mon - Fri: 8:00 AM - 6:00 PM",
};

/** Slim top bar (header): line + locations */
export const SITE_TOP = {
  line: "Design-Build Studio Since 2008",
  locations: "London · New York · Dubai",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "9:00am - 6:00pm" },
  { days: "Saturday", hours: "By Appointment" },
  { days: "Sunday", hours: "Closed" },
];

/** OpenStreetMap embed (NYC). Replace with your Google Maps iframe if needed. */
export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.06%2C40.72%2C-73.94%2C40.78&layer=mapnik&marker=40.7484,-74.00";

/** Homepage. Edit copy here; colors come from the Customize panel (CSS variables). */
export const HOME_HERO = {
  headlineBefore: "Build better.",
  headlineHighlight: "Faster.",
  headlineAfter: "With zero surprises.",
  body:
    "We deliver high-end residential and commercial builds with a disciplined process, clear communication, and craftsmanship you can see in every detail.",
  primaryCta: { label: "VIEW OUR WORK", to: "/projects" },
  secondaryCta: { label: "WHO WE ARE", to: "/about" },
  image:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&h=1750&fit=crop",
  featuredEyebrow: "FEATURED PROJECT",
  featuredTitle: "The Oakhill Residence",
  featuredMeta: "Beverly Hills, CA • 14 Months Completion",
};

export const SERVICES_RIBBON = [
  { id: "architect", label: "ARCHITECT", icon: "Compass" as const },
  { id: "builder", label: "BUILDER", icon: "HardHat" as const },
  { id: "design", label: "DESIGN", icon: "Palette" as const, featured: true },
  { id: "construct", label: "CONSTRUCT", icon: "Hammer" as const },
  { id: "detail", label: "DETAIL", icon: "Ruler" as const },
];

export const CAPABILITIES = [
  {
    id: "new-build",
    title: "New Build",
    description: "Ground-up homes and estates tailored to your lifestyle and site.",
    icon: "Home" as const,
    to: "/services/general-contracting",
  },
  {
    id: "renovations",
    title: "Renovations",
    description: "Structural upgrades, additions, and full-home transformations.",
    icon: "Wrench" as const,
    to: "/services/renovation",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Office, retail, and mixed-use delivered on schedule and spec.",
    icon: "Building2" as const,
    to: "/services/general-contracting",
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Concept through construction documents with buildability in mind.",
    icon: "DraftingCompass" as const,
    to: "/services/architecture",
  },
];

export const PROCESS_STEPS = [
  { id: "discovery", label: "Discovery", description: "Goals, budget, and site realities." },
  { id: "design", label: "Design", description: "Concepts refined into clear plans." },
  { id: "planning", label: "Planning", description: "Permits, scope, and schedule locked." },
  { id: "build", label: "Build", description: "Craft execution with weekly visibility." },
  { id: "handover", label: "Handover", description: "Walkthroughs, training, closeout." },
  { id: "aftercare", label: "Aftercare", description: "Warranty support when you need it." },
];

export const HOME_STATS = [
  { value: "350+", label: "Projects Completed" },
  { value: "98%", label: "Positive reviews" },
  { value: "40+", label: "Industry awards" },
  { value: "85%", label: "Repeat clients" },
];

export const WHY_BENEFITS = [
  {
    title: "Transparent budgets",
    description: "Milestones, allowances, and changes documented so there are no surprises.",
    icon: "ClipboardCheck" as const,
  },
  {
    title: "Senior-led sites",
    description: "Experienced supers on every job, not rotating rookies.",
    icon: "Users" as const,
  },
];

export const SERVICES = [
  { id: "general-contracting", title: "General Contracting", icon: "Building2", description: "Full-service general contracting for commercial and residential projects of any scale.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop" },
  { id: "renovation", title: "Renovation & Remodeling", icon: "Hammer", description: "Transform existing spaces with expert renovation and remodeling services.", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop" },
  { id: "project-management", title: "Project Management", icon: "ClipboardList", description: "Professional project management ensuring on-time, on-budget delivery.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
  { id: "architecture", title: "Architecture & Design", icon: "Ruler", description: "Innovative architectural design that blends form with function.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop" },
  { id: "interior-design", title: "Interior Design", icon: "Paintbrush", description: "Create stunning interiors that reflect your vision and lifestyle.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop" },
  { id: "green-building", title: "Green Building", icon: "Leaf", description: "Sustainable construction practices for an eco-friendly future.", image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&h=400&fit=crop" },
];

export const PROJECTS = [
  { id: "skyline-tower", title: "Skyline Tower", category: "Commercial", location: "Manhattan, NY", year: "2023", client: "Skyline Development Corp", value: "$45M", description: "A 30-story mixed-use tower featuring state-of-the-art amenities and sustainable design principles.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop", gallery: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"] },
  { id: "riverside-residences", title: "Riverside Residences", category: "Residential", location: "Brooklyn, NY", year: "2023", client: "Riverside Living LLC", value: "$28M", description: "Luxury waterfront residential complex with 120 units and premium amenities.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", gallery: [] },
  { id: "metro-mall", title: "Metro Shopping Mall", category: "Commercial", location: "Queens, NY", year: "2022", client: "Metro Retail Group", value: "$52M", description: "Modern retail destination with over 200 stores across three levels.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop", gallery: [] },
  { id: "green-office", title: "Green Office Park", category: "Industrial", location: "Jersey City, NJ", year: "2022", client: "EcoSpace Inc", value: "$35M", description: "LEED Platinum certified office campus with renewable energy systems.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", gallery: [] },
  { id: "harbor-bridge", title: "Harbor Bridge Renovation", category: "Infrastructure", location: "Newark, NJ", year: "2021", client: "NJ Dept of Transportation", value: "$18M", description: "Complete structural renovation of a historic harbor bridge.", image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&h=400&fit=crop", gallery: [] },
  { id: "sunset-villa", title: "Sunset Villa Estate", category: "Residential", location: "Hamptons, NY", year: "2023", client: "Private Client", value: "$8M", description: "Bespoke luxury estate with panoramic ocean views.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop", gallery: [] },
  { id: "waterfront-pier", title: "Waterfront Pier Restoration", category: "Infrastructure", location: "Boston, MA", year: "2022", client: "MassPort Authority", value: "$22M", description: "Structural rehabilitation of a historic timber pier with modern seismic upgrades.", image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop", gallery: [] },
  { id: "loft-conversion", title: "SoHo Loft Conversion", category: "Residential", location: "Manhattan, NY", year: "2023", client: "Private Client", value: "$4M", description: "Full-floor raw-to-refined conversion with new MEP and bespoke millwork.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop", gallery: [] },
  { id: "data-center-edge", title: "Edge Data Hall", category: "Industrial", location: "Ashburn, VA", year: "2024", client: "CloudScale Inc", value: "$62M", description: "Tier III hall with redundant cooling, commissioning, and LEED-ready envelope.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop", gallery: [] },
];

/** Hero/signature grid uses the first N projects; “Latest deliveries” paginates the rest. */
export const SIGNATURE_PROJECT_COUNT = 3;
export const PROJECTS_LATEST_PAGE_SIZE = 3;

export const TEAM = [
  { id: "john-mitchell", name: "John Mitchell", role: "CEO & Founder", bio: "With over 30 years in construction, John founded CONSTRUCTO with a vision for excellence.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "sarah-chen", name: "Sarah Chen", role: "Chief Architect", bio: "Award-winning architect specializing in sustainable commercial design.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "michael-rodriguez", name: "Michael Rodriguez", role: "Project Director", bio: "Expert project manager with a track record of delivering complex builds on time.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "emily-watson", name: "Emily Watson", role: "Head of Design", bio: "Creative interior designer transforming spaces into experiences.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "david-park", name: "David Park", role: "Chief Engineer", bio: "Structural engineering expert with 20+ years of experience.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop", social: { linkedin: "#", twitter: "#" } },
  { id: "lisa-thompson", name: "Lisa Thompson", role: "Operations Manager", bio: "Streamlines operations for maximum efficiency and quality.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop", social: { linkedin: "#", twitter: "#" } },
];

export const TESTIMONIALS = [
  { name: "Robert Johnson", role: "CEO, Johnson Properties", quote: "CONSTRUCTO delivered our office tower ahead of schedule and under budget. Exceptional quality and professionalism.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" },
  { name: "Maria Garcia", role: "Homeowner", quote: "Our dream home became reality thanks to CONSTRUCTO. Every detail was perfect.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { name: "James Wilson", role: "Director, Metro Retail", quote: "The mall project was complex but they handled it with expertise. Highly recommend.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop" },
];

export const BLOG_POSTS = [
  { id: "future-of-construction", title: "The Future of Sustainable Construction", excerpt: "Exploring how green building practices are reshaping the construction industry.", date: "March 15, 2024", author: "Sarah Chen", category: "Sustainability", image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&h=400&fit=crop", content: "Sustainable construction is no longer a trend. It's the future. From recycled materials to energy-efficient designs, the industry is evolving rapidly. At CONSTRUCTO, we've embraced LEED certification standards across all our new projects.\n\nKey innovations include solar-integrated building materials, smart energy management systems, and water recycling infrastructure. These technologies not only reduce environmental impact but also lower long-term operational costs for building owners.\n\nOur Green Office Park project in Jersey City stands as a testament to what's possible when sustainability meets modern design. The LEED Platinum certified campus features rooftop solar arrays, rainwater harvesting, and natural ventilation systems." },
  { id: "choosing-contractor", title: "How to Choose the Right Contractor", excerpt: "Key factors to consider when selecting a construction partner for your project.", date: "February 28, 2024", author: "John Mitchell", category: "Tips", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", content: "Choosing the right contractor can make or break your construction project. Here are the essential factors to consider.\n\nFirst, verify credentials and insurance. A reputable contractor should have proper licensing, bonding, and comprehensive insurance coverage.\n\nSecond, review their portfolio. Look for projects similar in scope and complexity to yours. Ask for references and actually contact them.\n\nThird, get detailed written estimates. Compare not just the bottom line, but the specifics of what's included.\n\nFinally, trust your communication instincts. A good contractor communicates clearly, responds promptly, and keeps you informed throughout the process." },
  { id: "smart-buildings", title: "Smart Building Technologies in 2024", excerpt: "How IoT and automation are transforming modern construction and building management.", date: "January 10, 2024", author: "David Park", category: "Technology", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", content: "Smart building technologies are revolutionizing how we design, construct, and manage buildings. From IoT sensors to AI-powered energy management, the possibilities are endless.\n\nBuilding Information Modeling (BIM) has transformed the design phase, allowing teams to create detailed 3D models that detect conflicts before construction begins.\n\nDuring construction, drones and robotics are improving safety and efficiency. Post-construction, smart systems monitor everything from HVAC performance to occupancy patterns.\n\nAt CONSTRUCTO, we integrate smart technologies from the design phase, ensuring buildings are future-ready from day one." },
  { id: "prefab-momentum", title: "Prefab Momentum in Urban Infill", excerpt: "Why modular assemblies are winning on tight city lots without sacrificing design intent.", date: "December 5, 2023", author: "Sarah Chen", category: "Technology", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop", content: "Prefabrication is shedding its industrial-only reputation. On constrained sites, volumetric modules cut calendar time while holding tolerances that stick-built crews struggle to repeat.\n\nWe coordinate MEP penetrations in the factory so field work is mostly connection and commissioning, with fewer surprises and cleaner inspections." },
  { id: "site-safety-culture", title: "Building a Site Safety Culture That Sticks", excerpt: "Leading indicators, toolbox talks, and accountability from the GC down.", date: "November 18, 2023", author: "Michael Rodriguez", category: "Tips", image: "https://images.unsplash.com/photo-1581092160562-40aa08e2c586?w=600&h=400&fit=crop", content: "Safety is not a poster. It is a daily choice reinforced by how we plan lifts, sequence trades, and debrief near misses.\n\nOur supers run joint walks with subs before high-risk activities. If the plan does not feel crisp, we pause and rewrite it." },
  { id: "cost-certainty", title: "Cost Certainty in Volatile Markets", excerpt: "How we lock allowances, hedge long-lead buys, and communicate trade-offs early.", date: "October 2, 2023", author: "John Mitchell", category: "Tips", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", content: "Owners deserve numbers they can plan around. We pair milestone pricing with transparent contingency bands and weekly burn reports so decisions happen before variances compound." },
  { id: "mass-timber", title: "Mass Timber: Where Code and Craft Meet", excerpt: "A primer on hybrid structures, fire design, and supplier coordination.", date: "September 12, 2023", author: "Sarah Chen", category: "Sustainability", image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&h=400&fit=crop", content: "Timber is no longer niche. With updated code paths and experienced fabricators, we deliver exposed structure without apologizing for performance.\n\nEarly supplier engagement keeps CNC files aligned with field surveys." },
];

export const STATS = [
  { value: 850, label: "Projects Completed", suffix: "+" },
  { value: 28, label: "Years Experience", suffix: "" },
  { value: 150, label: "Team Members", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
];

export const FAQ_ITEMS = [
  { question: "What types of projects does CONSTRUCTO handle?", answer: "We handle a wide range of projects including commercial buildings, residential homes, renovations, industrial facilities, and infrastructure projects. Our team has expertise across all construction sectors." },
  { question: "How do you ensure project quality?", answer: "We implement rigorous quality control processes at every stage. This includes regular inspections, material testing, compliance checks, and third-party quality audits." },
  { question: "What is your typical project timeline?", answer: "Timelines vary based on project scope and complexity. A typical residential project takes 6-12 months, while commercial projects may range from 12-24 months. We provide detailed timelines during the planning phase." },
  { question: "Do you offer financing options?", answer: "Yes, we work with several financial institutions to offer competitive financing options for qualified projects. Our team can help you explore the best options for your budget." },
  { question: "Are you licensed and insured?", answer: "Absolutely. CONSTRUCTO maintains all required state and local licenses, comprehensive general liability insurance, and workers' compensation coverage." },
  { question: "How do I get a project estimate?", answer: "Contact us through our website or call us directly. We'll schedule a consultation to discuss your project needs and provide a detailed written estimate at no obligation." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Company", path: "/about" },
  { label: "News", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [
  { label: "Residential Construction", to: "/services" },
  { label: "Commercial Builds", to: "/services" },
  { label: "Renovations & Additions", to: "/services/renovation" },
  { label: "Architecture & Planning", to: "/services/architecture" },
  { label: "Project Management", to: "/services/project-management" },
  { label: "Green Building", to: "/services/green-building" },
];

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "About Us", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/contact" },
  { label: "FAQ", to: "/faq" },
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

export const BLOG_TAGS = ["BUILD", "DESIGN", "ECO", "RENOVATION", "TIPS", "COMMERCIAL"];

export const PROJECTS_PAGE_STATS = [
  { value: "350+", label: "Projects Completed" },
  { value: "98%", label: "Timeline Accuracy" },
  { value: "85%", label: "Repeat Clients" },
  { value: "2-Year", label: "Warranty" },
];

export const ABOUT_STATS = [
  { value: "16", label: "Years of experience" },
  { value: "120+", label: "Projects completed" },
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
  { id: "iso", label: "ISO 9001", sub: "Quality management" },
  { id: "leed", label: "LEED Certified", sub: "Sustainable delivery" },
  { id: "lic", label: "Licensed & Insured", sub: "Multi-state coverage" },
  { id: "riba", label: "RIBA Chartered", sub: "Design partners" },
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
        "We deliver ground-up residential estates, large-scale renovations, commercial offices, retail, and select infrastructure-adjacent work. If scope and values align, we’ll assess fit in discovery.",
    },
    {
      question: "Do you handle necessary building permits?",
      answer:
        "Yes. Our team coordinates submissions, code reviews, inspections, and sign-offs. You receive a clear permit tracker in your project portal.",
    },
    {
      question: "Can you work with my architect?",
      answer:
        "Absolutely. We integrate early with your architect and engineers, or provide full design-build under one contract, whichever fits your project.",
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
        "Every change is written, priced, and approved before work proceeds. No verbal-only changes, which protects both sides.",
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
        "Timelines depend on scope, permits, and procurement. Broadly: renovations 4–12 months, new builds 12–24 months, commercial fit-outs 6–18 months. You’ll get a critical-path schedule at contract.",
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
        "We provide manufacturer warranties on installed systems plus our workmanship warranty. Terms are spelled out in your closeout package.",
    },
    {
      question: "Who do I call after move-in?",
      answer:
        "A dedicated aftercare line and portal ticket. Same team that built it, not a call center.",
    },
  ],
};

export const SERVICES_PAGE_INTRO =
  "End-to-end design and construction, from feasibility through handover, with one accountable partner and clear communication at every stage.";

export const COMMERCIAL_FITOUT_CARDS = [
  {
    id: "fast",
    title: "Fast-Track Delivery",
    description: "Phased schedules and night shifts when your business can’t stop.",
    icon: "Zap" as const,
  },
  {
    id: "sourcing",
    title: "Material Sourcing",
    description: "Global vendor network with QA at receipt, for fewer surprises on site.",
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
    id: "new-builds",
    category: "REAL ESTATE",
    title: "New Builds & Estates",
    subtitle: "DELIVERED IN 12–24 MONTHS TYPICALLY, SITE- AND PROGRAM-DEPENDENT",
    body: [
      "We orchestrate architecture, structure, MEP, and interiors as a single thread, reducing gaps between design intent and field execution.",
      "Expect fixed milestone pricing options where scope allows, plus a single point of contact from groundbreaking through certificate of occupancy.",
    ],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=700&fit=crop",
    inclusions: [
      "Feasibility & budgeting",
      "Design management",
      "Permit coordination",
      "Site logistics & safety",
      "Quality inspections",
      "Warranty & closeout",
    ],
  },
  {
    id: "renovations",
    category: "RESIDENTIAL",
    title: "Renovations & Additions",
    subtitle: "PHASED WORK WHEN YOU NEED TO REMAIN IN-PLACE",
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
    id: "commercial",
    category: "COMMERCIAL",
    title: "Commercial Fit-Outs",
    subtitle: "OFFICE · RETAIL · HOSPITALITY",
    body: [
      "Tenant improvements delivered to landlord specs with aggressive timelines, including BIM coordination, mockups, and commissioning.",
      "We align with your operations team so openings land on marketing dates, not “whenever construction finishes.”",
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
    inclusions: [
      "Test-fit & pricing",
      "Landlord coordination",
      "MEP engineering",
      "Commissioning",
      "LEED / compliance support",
      "As-built documentation",
    ],
  },
];

export const LEAD_FORM = {
  title: "Ready to build your vision?",
  description:
    "Tell us about your project. We reply within one business day with next steps.",
  bullets: ["Fixed milestone pricing options", "Dedicated project lead", "Weekly photo updates"],
};
