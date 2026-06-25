/**
 * NEXORA HEAVY DUTY — Truck repair & fleet maintenance content registry.
 * Industrial palette: navy, asphalt, safety orange.
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const TRUCK_IMAGES = {
  hero: u("1766785368863-f2188a8c8b32", 1920, 1080),
  highway: u("1708193203896-ba0630862bb6", 1920, 1080),
  workshop: u("1734477127040-c5845f5af500", 1200, 900),
  mechanic: u("1708449474154-e76585464b5e", 1200, 900),
  warehouse: u("1689373197720-5de95b80f0ae", 1200, 900),
  fleetLot: u("1492168732976-2676c584c675", 1200, 900),
  diagnostics: u("1777900201609-ad2f57813ab8", 1200, 900),
  engine: u("1770705950498-d373e33ecb1a", 1200, 900),
  tools: u("1628222274353-0f7c1adf8d21", 1200, 900),
  roadside: u("1742069029207-0aacf8fa4401", 1200, 900),
  nightOps: u("1737587539858-13981928ee2c", 1200, 900),
  lift: u("1770715897376-22215c26e2a7", 1200, 900),
  trailer: u("1741495515999-0567609a236e", 1200, 900),
  contactHero: u("1734477127040-c5845f5af500", 1400, 900),
  aboutHero: u("1708449474154-e76585464b5e", 1400, 900),
  servicesHero: u("1770715897376-22215c26e2a7", 1400, 900),
  fleetHero: u("1721054939742-713e1cd8e314", 1400, 900),
  emergencyHero: u("1742069029207-0aacf8fa4401", 1400, 900),
  locationsHero: u("1492168732976-2676c584c675", 1400, 900),
  gallery1: u("1734477127040-c5845f5af500", 800, 600),
  gallery2: u("1708449474154-e76585464b5e", 800, 600),
  gallery3: u("1766785368863-f2188a8c8b32", 800, 600),
  gallery4: u("1721054939742-713e1cd8e314", 800, 600),
  gallery5: u("1777900201609-ad2f57813ab8", 800, 600),
  gallery6: u("1770705950498-d373e33ecb1a", 800, 600),
  gallery7: u("1770715897376-22215c26e2a7", 800, 600),
  gallery8: u("1737587539858-13981928ee2c", 800, 600),
  clientA: u("1560250097-0b93528c311a", 120, 120),
  clientB: u("1472099645785-5658abf4ff4e", 120, 120),
  clientC: u("1544005313-94ddf0286df2", 120, 120),
  techLead: u("1519345182560-3f2917c472ef", 600, 800),
} as const;

export const LUXURY_IMAGES = { ...TRUCK_IMAGES, about: TRUCK_IMAGES.aboutHero, contact: TRUCK_IMAGES.contactHero, blog: TRUCK_IMAGES.workshop, heroHome: TRUCK_IMAGES.hero } as const;
export const RESTAURANT_IMAGES = { ...TRUCK_IMAGES, interior: TRUCK_IMAGES.workshop, bar: TRUCK_IMAGES.engine, menuHero: TRUCK_IMAGES.servicesHero, eventsHero: TRUCK_IMAGES.fleetHero, giftHero: TRUCK_IMAGES.workshop, crewWorking: TRUCK_IMAGES.mechanic, luxuryExterior: TRUCK_IMAGES.workshop } as const;
export const HOME_BUILDER_IMAGES = { ...TRUCK_IMAGES, heroHome: TRUCK_IMAGES.hero, contactHero: TRUCK_IMAGES.contactHero, aboutHero: TRUCK_IMAGES.aboutHero, crewWorking: TRUCK_IMAGES.mechanic, luxuryExterior: TRUCK_IMAGES.workshop } as const;

export const COMPANY = {
  name: "NEXORA HEAVY DUTY",
  legalName: "Nexora Fleet Services LLC",
  tagline: "Expert heavy-duty truck repair, diesel diagnostics, and fleet maintenance — keeping commercial fleets on the road 24/7.",
  phone: "(800) 555-TRUCK",
  emergencyPhone: "(800) 555-2478",
  email: "dispatch@nexorafleet.com",
  fleetEmail: "fleet@nexorafleet.com",
  address: "4200 Industrial Parkway, Dallas, TX 75212",
  hours: "Mon–Fri 6am–10pm · Sat 7am–6pm · 24/7 Emergency",
  license: "DOT Certified · ASE Master Diesel Technicians",
  fax: "",
};

export const SITE_TOP = {
  line: "24/7 Emergency Breakdown Support — Call Dispatch Now",
  badges: ["DOT Certified", "Fleet Specialists", "ASE Master Techs"],
  ratingValue: "4.9",
  ratingCount: "320+",
  ratingLabel: "Fleet Client Reviews",
  locations: "Dallas · Fort Worth · Houston · Oklahoma City · Mobile Units",
};

export const OFFICE_HOURS = [
  { days: "Monday – Friday", hours: "6:00 AM – 10:00 PM" },
  { days: "Saturday", hours: "7:00 AM – 6:00 PM" },
  { days: "Sunday", hours: "Emergency calls only" },
  { days: "Emergency Line", hours: "24/7 / 365" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-96.95%2C32.72%2C-96.85%2C32.78&layer=mapnik&marker=32.75,-96.90";

export const HOME_HERO = {
  eyebrow: "HEAVY DUTY TRUCK REPAIR",
  headlineBefore: "Keeping Your Fleet",
  headlineHighlight: "on the Road 24/7",
  headlineAfter: "",
  body: "Expert truck repair, diesel diagnostics, and fleet maintenance you can rely on.",
  primaryCta: { label: "Request Service", to: "/request-service" },
  secondaryCta: { label: "Emergency Breakdown Support", to: "/emergency-repair" },
  image: TRUCK_IMAGES.hero,
  trustPills: [
    { label: "24/7 Dispatch", sub: "Emergency response", icon: "Phone" as const },
    { label: "Fleet Programs", sub: "Priority lanes", icon: "Truck" as const },
    { label: "DOT Certified", sub: "Compliance experts", icon: "ShieldCheck" as const },
  ],
  ratingQuote: "Trusted by fleet managers and logistics companies across the Southwest.",
  ratingCard: { score: "4.9", countLabel: "320+ fleet client reviews", avatars: [TRUCK_IMAGES.clientA, TRUCK_IMAGES.clientB, TRUCK_IMAGES.clientC, TRUCK_IMAGES.techLead] },
  featuredEyebrow: "RESPONSE TIME",
  featuredTitle: "Avg. 45 Min Emergency ETA",
  featuredMeta: "Mobile units · Dallas metro · 24/7 dispatch",
};

export const TRUCK_TYPES = [
  { id: "semi", title: "Semi Trucks", icon: "Truck" as const, image: TRUCK_IMAGES.hero },
  { id: "box", title: "Box Trucks", icon: "Package" as const, image: TRUCK_IMAGES.warehouse },
  { id: "dump", title: "Dump Trucks", icon: "Construction" as const, image: TRUCK_IMAGES.fleetLot },
  { id: "tanker", title: "Tankers", icon: "Fuel" as const, image: TRUCK_IMAGES.highway },
  { id: "reefer", title: "Refrigerated Trucks", icon: "Snowflake" as const, image: TRUCK_IMAGES.trailer },
  { id: "flatbed", title: "Flatbeds", icon: "Layers" as const, image: TRUCK_IMAGES.roadside },
  { id: "trailer", title: "Trailers", icon: "Container" as const, image: TRUCK_IMAGES.trailer },
  { id: "construction", title: "Construction Vehicles", icon: "HardHat" as const, image: TRUCK_IMAGES.workshop },
  { id: "fleet-van", title: "Fleet Vans", icon: "Van" as const, image: TRUCK_IMAGES.fleetLot },
];

export const FLEET_PROGRAM = {
  title: "Fleet Maintenance Programs",
  subtitle: "Reduce downtime. Control costs. Keep every unit road-ready.",
  benefits: [
    "Monthly maintenance contracts with predictable pricing",
    "Priority service lanes — skip the queue",
    "Discounted fleet rates across all service categories",
    "Scheduled DOT inspections and preventive maintenance",
    "Dedicated fleet account manager and single point of contact",
    "Digital service history and reporting dashboard",
  ],
  cta: { label: "Get Fleet Quote", to: "/fleet-maintenance" },
  image: TRUCK_IMAGES.fleetLot,
};

export const GALLERY_IMAGES = [
  { id: "g1", src: TRUCK_IMAGES.gallery1, alt: "Heavy-duty repair bay", category: "workshop" as const },
  { id: "g2", src: TRUCK_IMAGES.gallery2, alt: "Diesel mechanic at work", category: "mechanics" as const },
  { id: "g3", src: TRUCK_IMAGES.gallery3, alt: "Semi truck on highway", category: "fleet" as const },
  { id: "g4", src: TRUCK_IMAGES.gallery4, alt: "Fleet parking yard", category: "fleet" as const },
  { id: "g5", src: TRUCK_IMAGES.gallery5, alt: "Diagnostic equipment", category: "diagnostics" as const },
  { id: "g6", src: TRUCK_IMAGES.gallery6, alt: "Engine overhaul", category: "engine" as const },
  { id: "g7", src: TRUCK_IMAGES.lift, alt: "Truck on hydraulic lift", category: "workshop" as const },
  { id: "g8", src: TRUCK_IMAGES.nightOps, alt: "Night repair operations", category: "operations" as const },
];

export const LOCATIONS = [
  { id: "dallas", name: "Dallas HQ", address: "4200 Industrial Parkway, Dallas, TX 75212", phone: "(214) 555-0140", hours: "Mon–Fri 6am–10pm", bays: 12, mobileUnits: 4 },
  { id: "fort-worth", name: "Fort Worth", address: "1800 Logistics Blvd, Fort Worth, TX 76106", phone: "(817) 555-0192", hours: "Mon–Sat 6am–8pm", bays: 8, mobileUnits: 2 },
  { id: "houston", name: "Houston", address: "9200 Port Industrial Dr, Houston, TX 77029", phone: "(713) 555-0165", hours: "Mon–Fri 6am–10pm", bays: 10, mobileUnits: 3 },
];

export const SERVICE_REQUEST_SETTINGS = {
  priorities: ["Standard", "Urgent", "Emergency"],
  vehicleTypes: TRUCK_TYPES.map(t => t.title),
  defaultEtaMinutes: { Standard: 240, Urgent: 90, Emergency: 45 },
};

const SERVICE_LIST = [
  { id: "diesel-diagnostics", title: "Diesel Engine Diagnostics", icon: "Cpu", description: "Advanced computer diagnostics for Cummins, Detroit, Paccar, and Caterpillar engines.", image: TRUCK_IMAGES.diagnostics },
  { id: "transmission", title: "Transmission Repair", icon: "Cog", description: "Manual and automatic heavy-duty transmission rebuilds and repairs.", image: TRUCK_IMAGES.engine },
  { id: "brakes", title: "Brake System Repair", icon: "CircleStop", description: "Air brake systems, ABS diagnostics, drum and disc brake service.", image: TRUCK_IMAGES.workshop },
  { id: "suspension", title: "Suspension & Axle Repair", icon: "ArrowUpDown", description: "Leaf spring, air ride, and axle alignment for heavy loads.", image: TRUCK_IMAGES.lift },
  { id: "electrical", title: "Electrical Diagnostics", icon: "Zap", description: "Wiring, alternators, starters, and multiplex electrical systems.", image: TRUCK_IMAGES.diagnostics },
  { id: "trailer", title: "Trailer Repair", icon: "Container", description: "Reefer units, landing gear, doors, floors, and structural repairs.", image: TRUCK_IMAGES.trailer },
  { id: "fleet-maintenance", title: "Fleet Maintenance Programs", icon: "ClipboardList", description: "Scheduled PM, oil changes, fluid service, and compliance tracking.", image: TRUCK_IMAGES.fleetLot },
  { id: "oil-fluid", title: "Oil & Fluid Service", icon: "Droplets", description: "Engine oil, coolant, DEF, transmission fluid, and hydraulic systems.", image: TRUCK_IMAGES.engine },
  { id: "turbo-exhaust", title: "Turbo & Exhaust Systems", icon: "Wind", description: "Turbocharger rebuilds, DPF cleaning, and exhaust aftertreatment.", image: TRUCK_IMAGES.engine },
  { id: "roadside", title: "Roadside Assistance", icon: "MapPin", description: "24/7 mobile repair units for breakdowns on the road.", image: TRUCK_IMAGES.roadside },
  { id: "dot-inspection", title: "DOT Inspection Prep", icon: "ShieldCheck", description: "Pre-trip inspections and DOT compliance preparation.", image: TRUCK_IMAGES.workshop },
  { id: "welding", title: "Welding & Fabrication", icon: "Flame", description: "Frame repairs, exhaust fabrication, and custom metalwork.", image: TRUCK_IMAGES.tools },
] as const;

export const SERVICES = [...SERVICE_LIST];
export const PROPERTY_CATEGORIES = SERVICES.slice(0, 8).map(s => ({ id: s.id, title: s.title, description: s.description, icon: s.icon, image: s.image, to: `/services/${s.id}` }));
export const MENU_CATEGORIES = PROPERTY_CATEGORIES;

export const PROCESS_STEPS = [
  { id: "request", label: "Request Service", description: "Submit online or call dispatch — we log your unit and priority level immediately." },
  { id: "diagnosis", label: "Diagnosis", description: "Certified diesel technicians run diagnostics and provide a clear repair assessment." },
  { id: "approval", label: "Repair Plan Approval", description: "You approve the scope and estimate before any work begins. No surprises." },
  { id: "repair", label: "Repair Execution", description: "Priority lanes for fleet clients. Parts sourced same-day when possible." },
  { id: "qc", label: "Quality Check", description: "Road test, brake check, and final inspection before release." },
  { id: "return", label: "Vehicle Return", description: "Unit returned to service with full documentation and service record update." },
];

export const WHY_BENEFITS = [
  { title: "24/7 Emergency Support", description: "Dispatch never sleeps. Mobile units ready for breakdown calls day or night.", icon: "Phone" as const },
  { title: "Certified Diesel Technicians", description: "ASE Master certified techs with OEM training on all major engine platforms.", icon: "Award" as const },
  { title: "Fast Turnaround Time", description: "Priority fleet lanes and stocked parts inventory minimize downtime.", icon: "Clock" as const },
  { title: "Fleet Specialists", description: "Dedicated account managers who understand logistics deadlines.", icon: "Truck" as const },
  { title: "DOT Compliance Experts", description: "Inspection prep, documentation, and compliance tracking built in.", icon: "ShieldCheck" as const },
  { title: "Advanced Diagnostic Tools", description: "Factory-level scan tools for all major truck and engine manufacturers.", icon: "Cpu" as const },
  { title: "Mobile Repair Units", description: "Roadside and on-site repairs to get you moving without a tow.", icon: "MapPin" as const },
  { title: "Transparent Pricing", description: "Written estimates, no hidden fees, fleet contract rates honored.", icon: "Receipt" as const },
];

export const CAPABILITIES = WHY_BENEFITS.map(b => ({ id: b.title.toLowerCase().replace(/\s+/g, "-"), title: b.title, description: b.description, icon: b.icon, to: "/services" }));
export const EXPERIENCE_HIGHLIGHTS = CAPABILITIES;

export const HOME_STATS = [
  { value: "12,000+", label: "Trucks Serviced", icon: "Truck" as const },
  { value: "180+", label: "Fleet Contracts", icon: "ClipboardList" as const },
  { value: "8,500+", label: "Emergency Calls Resolved", icon: "Phone" as const },
  { value: "22", label: "Years Experience", icon: "Calendar" as const },
];

export const STATS = [
  { value: 12000, label: "Trucks Serviced", suffix: "+" },
  { value: 180, label: "Fleet Contracts", suffix: "+" },
  { value: 8500, label: "Emergency Calls", suffix: "+" },
  { value: 22, label: "Years Experience", suffix: "" },
];

export const TESTIMONIALS = [
  { name: "Mike R.", role: "Fleet Manager, Apex Logistics", quote: "Nexora cut our average downtime by 40%. Their priority lane program is a game-changer for our 80-unit fleet.", avatar: TRUCK_IMAGES.clientA, rating: 5 },
  { name: "Sarah K.", role: "Operations Director, Heartland Freight", quote: "When a truck goes down at 2 AM, they answer. Every time. That's why we've been with them for six years.", avatar: TRUCK_IMAGES.clientB, rating: 5 },
  { name: "James T.", role: "Owner, T&L Transport Co.", quote: "Transparent pricing, fast turnaround, and techs who actually know diesel engines. Highly recommend.", avatar: TRUCK_IMAGES.clientC, rating: 5 },
  { name: "Carlos M.", role: "VP Operations, Southwest Hauling", quote: "Their DOT inspection prep saved us from costly violations. Professional operation from dispatch to delivery.", avatar: TRUCK_IMAGES.clientA, rating: 5 },
  { name: "Diana W.", role: "Fleet Coordinator, ColdChain Express", quote: "Reefer trailer repairs done right the first time. Our perishable loads depend on reliability — Nexora delivers.", avatar: TRUCK_IMAGES.clientB, rating: 5 },
  { name: "Robert H.", role: "Safety Manager, National Carriers Inc.", quote: "Digital service records and scheduled PM reminders keep our compliance audit-ready year-round.", avatar: TRUCK_IMAGES.clientC, rating: 5 },
];

export const TEAM = [
  { id: "tech-director", name: "Dave Morrison", role: "Director of Service Operations", bio: "22 years in heavy-duty diesel repair. Former fleet maintenance director for a 500-unit regional carrier.", image: TRUCK_IMAGES.techLead, languages: ["English"], experience: "22 years", specialties: ["Fleet Operations", "DOT Compliance", "Diesel Diagnostics"], social: { linkedin: "#", instagram: "#", email: "dave@nexorafleet.com" } },
];

export const BLOG_POSTS = [
  { id: "dot-inspection-tips", title: "DOT Inspection Checklist for Fleet Managers", excerpt: "Prepare your fleet and avoid costly out-of-service violations.", date: "March 5, 2026", author: "Dave Morrison", category: "Compliance", image: TRUCK_IMAGES.workshop, content: "A pre-trip routine and scheduled PM are your best defense against DOT violations.", readTime: "5 min" },
  { id: "reduce-downtime", title: "5 Ways to Reduce Fleet Downtime", excerpt: "How preventive maintenance contracts save money and keep trucks moving.", date: "February 18, 2026", author: "Service Team", category: "Fleet", image: TRUCK_IMAGES.fleetLot, content: "Downtime costs $450–$750 per day per truck. Prevention beats reaction every time.", readTime: "4 min" },
  { id: "diesel-diagnostics", title: "Understanding Diesel Engine Fault Codes", excerpt: "What those dashboard warnings mean and when to call for help.", date: "January 30, 2026", author: "Tech Team", category: "Diagnostics", image: TRUCK_IMAGES.diagnostics, content: "Modern diesel engines generate hundreds of fault codes. Here's what matters most.", readTime: "6 min" },
];

export const FAQ_ITEMS = [
  { question: "Do you offer 24/7 emergency breakdown service?", answer: "Yes. Call our emergency dispatch line at (800) 555-2478 any time. Mobile units are dispatched with an average 45-minute ETA in the Dallas metro area." },
  { question: "What truck brands do you service?", answer: "We service all major heavy-duty brands including Freightliner, Kenworth, Peterbilt, Volvo, International, Mack, and Western Star." },
  { question: "Do you work with fleet accounts?", answer: "Yes. We offer dedicated fleet maintenance programs with priority lanes, contract pricing, and a dedicated account manager." },
  { question: "Can you perform DOT inspections?", answer: "We provide DOT inspection preparation and work with certified inspectors. We help ensure your fleet passes compliance audits." },
  { question: "Do you offer mobile/roadside repair?", answer: "Yes. Our mobile repair units handle roadside breakdowns, jump starts, tire changes, and many on-site repairs." },
  { question: "How do I get a repair estimate?", answer: "Submit a service request online or call dispatch. We provide written estimates before any repair work begins." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Fleet Maintenance", path: "/fleet-maintenance" },
  { label: "Emergency Repair", path: "/emergency-repair" },
  { label: "Locations", path: "/locations" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS = SERVICES.slice(0, 6).map(s => ({ label: s.title, to: `/services/${s.id}` }));
export const FOOTER_COMPANY_LINKS = [
  { label: "About", to: "/about" },
  { label: "Fleet Programs", to: "/fleet-maintenance" },
  { label: "Emergency Repair", to: "/emergency-repair" },
  { label: "Locations", to: "/locations" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];
export const FOOTER_QUICK_LINKS = [
  { label: "Request Service", to: "/request-service" },
  { label: "Emergency Dispatch", to: "/emergency-repair" },
  { label: "Fleet Quote", to: "/fleet-maintenance" },
];

export const LEAD_FORM = {
  title: "Request Service",
  description: "Tell us about your vehicle and issue — dispatch will confirm your appointment.",
  subtitle: "Average response within 30 minutes during business hours.",
  submitLabel: "Submit Request",
  successMessage: "Service request received. Dispatch will contact you shortly.",
  bullets: ["24/7 emergency dispatch", "Fleet priority lanes", "Written estimates before repair", "DOT compliance support"],
};

export const CTA_SECTION = {
  headline: "Truck Down? We'll Get You Back on the Road.",
  primaryCta: { label: "Request Emergency Repair", to: "/emergency-repair" },
  secondaryCta: { label: "Call Dispatch Center", to: "tel:8005552478" },
};

export const META_DEFAULT = "Nexora Heavy Duty — 24/7 truck repair, diesel diagnostics, and fleet maintenance. Keeping commercial fleets on the road.";
export const BLOG_TAGS = ["Compliance", "Fleet", "Diagnostics", "Maintenance"];
export const SERVICES_PAGE_INTRO = "Full-service heavy-duty repair for semi trucks, fleet vehicles, and commercial trailers.";
export const PROJECTS = [];
export const LISTINGS = [];
export const SIGNATURE_DISHES: never[] = [];
export const SIGNATURE_PROJECT_COUNT = 0;
export const PROJECTS_LATEST_PAGE_SIZE = 6;
export const LISTINGS_PAGE_SIZE = 6;
export const SERVICE_DEEP_DIVES = SERVICES.map(s => ({ id: s.id, category: "HEAVY DUTY", title: s.title, subtitle: s.description, body: [s.description, `Our ${s.title.toLowerCase()} team uses factory-level diagnostic equipment and OEM-spec parts.`] as [string, string], image: s.image, inclusions: ["Written estimate", "ASE certified techs", "Fleet contract rates", "Same-day parts when available", "Full service documentation"] }));
export const SERVICES_RIBBON = SERVICES.slice(0, 5).map(s => ({ id: s.id, label: s.title.toUpperCase(), icon: s.icon, description: s.description, to: `/services/${s.id}` }));
export const COMMERCIAL_FITOUT_CARDS = WHY_BENEFITS.slice(0, 4).map((b, i) => ({ id: `w${i}`, title: b.title, description: b.description, icon: b.icon }));
export const CORE_VALUES = WHY_BENEFITS.slice(0, 6).map((b, i) => ({ id: `v${i}`, title: b.title, description: b.description, icon: b.icon }));
export const CERTIFICATIONS = [
  { id: "dot", label: "DOT Certified Facility", sub: "Inspection & compliance" },
  { id: "ase", label: "ASE Master Diesel", sub: "Certified technicians" },
  { id: "fleet", label: "180+ Fleet Contracts", sub: "Commercial partnerships" },
  { id: "emergency", label: "24/7 Emergency Dispatch", sub: "Always available" },
];
export const ABOUT_STATS = [{ value: "22+", label: "Years" }, { value: "12,000+", label: "Trucks Serviced" }, { value: "180+", label: "Fleet Contracts" }, { value: "4.9", label: "Rating" }, { value: "3", label: "Service Locations" }];
export const PROJECTS_PAGE_STATS = [{ value: "12", label: "Service Categories" }, { value: "12,000+", label: "Trucks Serviced" }, { value: "24/7", label: "Emergency" }, { value: "4.9", label: "Rating" }];
export const ABOUT_TIMELINE = [
  { year: "2004", title: "Founded in Dallas", description: "Opened first 6-bay heavy-duty repair facility on Industrial Parkway." },
  { year: "2010", title: "Fleet Program Launch", description: "Introduced dedicated fleet maintenance contracts for regional carriers." },
  { year: "2016", title: "Mobile Units Deployed", description: "Launched 24/7 roadside assistance with 4 mobile repair trucks." },
  { year: "2020", title: "Houston Expansion", description: "Opened second major facility to serve Gulf Coast logistics corridor." },
  { year: "2024", title: "Digital Fleet Portal", description: "Launched online service history, scheduling, and compliance tracking for fleet clients." },
];
export const AWARDS = [{ year: "2025", title: "Best Fleet Service Provider", org: "Southwest Logistics Association" }, { year: "2024", title: "ASE Blue Seal Recognition", org: "National Institute for ASE" }];
export const ABOUT_HERO_BADGES = [{ label: "DOT Certified", icon: "ShieldCheck" as const }, { label: "ASE Master Diesel", icon: "Award" as const }, { label: "24/7 Dispatch", icon: "Phone" as const }, { label: "180+ Fleets", icon: "Truck" as const }];
export const NEIGHBORHOODS = LOCATIONS.map(l => ({ id: l.id, name: l.name, image: TRUCK_IMAGES.workshop, propertyCount: l.bays, avgPrice: `${l.mobileUnits} mobile units`, description: l.address }));
export const NEW_DEVELOPMENTS: never[] = [];
export const SHOWCASE_ITEMS: never[] = [];
export const PRIVATE_EVENT_TYPES: never[] = [];
export const EVENTS: never[] = [];
export const GIFT_CARD_TIERS: never[] = [];
export const RESERVATION_SETTINGS = SERVICE_REQUEST_SETTINGS;
export const MENU_ITEMS: never[] = [];
export const CHEF = { id: "ops", name: "Dave Morrison", role: "Director of Service Operations", bio: TEAM[0].bio, image: TRUCK_IMAGES.techLead, experience: "22+ years", awards: ["ASE Master Diesel", "DOT Certified"], philosophy: "Every hour off the road costs money. We treat your downtime like our emergency." };
export const FAQ_TABS = [{ id: "general", label: "GENERAL" }, { id: "fleet", label: "FLEET" }, { id: "emergency", label: "EMERGENCY" }] as const;
export type FaqTabId = (typeof FAQ_TABS)[number]["id"];
export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  fleet: [{ question: "How do fleet contracts work?", answer: "Monthly PM schedules, priority lanes, contract pricing, and a dedicated account manager." }, { question: "Can I track service history online?", answer: "Yes. Fleet portal provides digital records, upcoming PM reminders, and compliance reports." }],
  emergency: [{ question: "What is your average emergency ETA?", answer: "45 minutes in Dallas metro. Times vary by location — dispatch provides ETA on every call." }, { question: "What can mobile units fix on-site?", answer: "Jump starts, tire changes, air leaks, minor electrical, coolant leaks, and many diagnostic issues." }],
};
export const SERVICE_AREAS = LOCATIONS.map(l => l.name);
export const SERVICE_CATEGORY_TABS = SERVICES.slice(0, 4).map(s => ({ id: s.id, label: s.title, to: `/services/${s.id}` }));
export const LEAD_MAGNET = { title: "Fleet Maintenance Guide", subtitle: "Free PDF: reduce downtime and control fleet repair costs.", cta: { label: "DOWNLOAD GUIDE", to: "/contact" }, image: TRUCK_IMAGES.fleetLot };
export const CONTACT_TRUST_STRIP = CERTIFICATIONS.map(c => ({ id: c.id, title: c.label, description: c.sub, icon: "ShieldCheck" as const }));
export const FINANCING_CONTENT = { eyebrow: "FLEET PROGRAMS", title: FLEET_PROGRAM.title, subtitle: FLEET_PROGRAM.subtitle, body: "Predictable maintenance costs and priority service for commercial fleets.", image: FLEET_PROGRAM.image, benefits: FLEET_PROGRAM.benefits.slice(0, 4), cta: FLEET_PROGRAM.cta };
export const HERO_PROMO_BANNERS = [{ id: "fleet", title: FLEET_PROGRAM.title, subtitle: FLEET_PROGRAM.subtitle, cta: FLEET_PROGRAM.cta, image: FLEET_PROGRAM.image }, { id: "emergency", title: "24/7 Emergency Dispatch", subtitle: "Truck down? Call (800) 555-2478 now.", cta: { label: "CALL DISPATCH", to: "tel:8005552478" }, image: TRUCK_IMAGES.emergencyHero }];
export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));
export const STORM_CHECKLIST = PROCESS_STEPS.map(s => ({ id: s.id, title: s.label, description: s.description }));
export const INSPECTION_BENEFITS = WHY_BENEFITS.slice(0, 4);
export const INSPECTION_TYPES = SERVICES.slice(0, 4).map(s => ({ id: s.id, title: s.title, description: s.description, image: s.image }));
export const INSPECTION_CHECKLIST = ["Vehicle type & unit number", "Issue description", "Priority level", "GPS location", "Fleet account (if applicable)", "Photo upload (optional)"];
export const SERVICE_AREA_COUNTIES = LOCATIONS.map(l => ({ county: l.name, towns: [l.address] }));
export const BLOG_LIST_PAGE_SIZE = 6;
export function getBlogCategoryCounts() { const m = new Map<string, number>(); for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1); return [...m.entries()].map(([label, count]) => ({ label, count })); }
