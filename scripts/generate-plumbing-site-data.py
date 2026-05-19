#!/usr/bin/env python3
"""Generate src/template-plumbing/data/siteData.ts — Jersey Plumbing content, ClearCurrent brand."""

from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src/template-plumbing/data/siteData.ts"

u = lambda id, w=600, h=400: (
    f"https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={w}&h={h}&q=85"
)

IMAGES = {
    "heroPlumber": u("1581578731548-946f06248c2e", 1920, 1080),
    "plumberWorking": u("1607472586895-0e2c109898b5"),
    "plumberSink": u("1558611848-73f7bab4e8ce"),
    "pipes": u("1625246333192-fd0cb1b95a1b"),
    "bathroom": u("1600607687939-ce8a6c25118c"),
    "kitchen": u("1600585154526-990d4e1dbd08"),
    "waterHeater": u("1542013936699-17806145349b"),
    "drain": u("1613525210169-4a47e40c0e21"),
    "faucet": u("1563453563774-c818a94d17f7"),
    "toilet": u("1584622780114-8137f71e31e3"),
    "commercial": u("1552034559-eeaa6b60833f"),
    "team": u("1600880292203-757bb62b4baf"),
    "van": u("1521791136064-7986c2920216"),
    "emergency": u("1607473331331-522f7c80940a"),
    "leak": u("1540932239608-ae26a4e5e3a0"),
    "sump": u("1600566752844-7e18647f7111"),
    "boiler": u("1600566752355-4a595f92fb57"),
    "gasLine": u("1595514536987-0ce9d4a8a67e"),
    "repiping": u("1572981774475-03758662ea16"),
    "conditioning": u("1600566753190-5f12e414252b"),
    "fixtures": u("1600585154340-be6161a56a0c"),
    "shower": u("1556909114-f6e7ad7d3136"),
    "contactHero": u("1581578731548-946f06248c2e", 1400, 900),
    "aboutHero": u("1600880292203-757bb62b4baf", 1400, 900),
    "reviewsHero": u("1607472586895-0e2c109898b5", 1400, 900),
    "residentialSplit": u("1600566753086-00f18fb6b3ea", 900, 1200),
    "commercialSplit": u("1552034559-eeaa6b60833f", 900, 1200),
    "troubleshoot": u("1613525210169-4a47e40c0e21", 900, 1100),
    "blogHero": u("1625246333192-fd0cb1b95a1b", 1400, 900),
    "financing": u("1600573472592-401b55301b40"),
    "beforePipe": u("1572981774475-03758662ea16"),
    "afterPipe": u("1625246333192-fd0cb1b95a1b"),
}

SERVICES = [
    ("emergency-plumbing", "Emergency Plumbing", "Flame", "24/7 response for burst pipes, leaks, clogs, and water heater failures.", "emergency"),
    ("drain-cleaning", "Drain Cleaning", "Droplets", "Thorough drain cleaning to clear clogs and restore proper flow.", "drain"),
    ("water-heaters", "Water Heaters", "Flame", "Fast repair and installation to keep hot water flowing when you need it.", "waterHeater"),
    ("boilers", "Boilers", "Thermometer", "Expert boiler installation, repair, and maintenance for reliable home heating.", "boiler"),
    ("water-leaks", "Water Leaks", "Droplets", "Accurate leak detection and repairs to prevent damage and wasted water.", "leak"),
    ("leak-detection", "Leak Detection", "Search", "Professional leak detection to find hidden leaks before they cause damage.", "leak"),
    ("sump-pumps", "Sump Pumps", "Waves", "Installation and service to protect your basement from flooding.", "sump"),
    ("repiping", "Repiping", "Wrench", "Complete pipe replacement for improved water flow and long-term reliability.", "repiping"),
    ("fixtures", "Fixtures (Tubs, Sinks, Toilets)", "Bath", "Professional installation and replacement of plumbing fixtures.", "fixtures"),
    ("faucet-repairs", "Faucet Repairs & Replacements", "Droplets", "Fix leaks or upgrade faucets for better performance and style.", "faucet"),
    ("water-conditioning", "Water Conditioning", "Sparkles", "Water softening and filtration for cleaner, better-tasting water.", "conditioning"),
    ("gas-lines", "Gas Lines", "Flame", "Safe installation and repair of gas lines by licensed professionals.", "gasLine"),
    ("shower-repair", "Shower Repair", "ShowerHead", "Shower valve repair, replacement, and leak fixes.", "shower"),
    ("toilet-repair", "Toilet Repair & Replacement", "Bath", "Toilet repairs, flapper fixes, and full replacements.", "toilet"),
]

SERVICE_AREAS = [
    "Hillsborough, NJ",
    "Bridgewater, NJ",
    "Somerville, NJ",
    "Morristown, NJ",
    "Randolph, NJ",
    "Parsippany, NJ",
    "Livingston, NJ",
    "Westfield, NJ",
    "Summit, NJ",
    "Flemington, NJ",
]

def main():
    lines = [
        "/**",
        " * CLEARCURRENT PLUMBING — content registry.",
        " * Copy sourced from jerseyplumbing.com (structure & services). Fictional brand name.",
        " */",
        "",
        "const u = (id: string, w = 600, h = 400) =>",
        '  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;',
        "",
        "export const PLUMBING_IMAGES = {",
    ]
    for k, v in IMAGES.items():
        lines.append(f'  {k}: "{v}",')
    lines.append("} as const;")
    lines.append("")
    lines.append('export const COMPANY = {')
    lines.append('  name: "CLEARCURRENT PLUMBING",')
    lines.append('  legalName: "ClearCurrent Plumbing Service",')
    lines.append('  tagline:')
    lines.append('    "Central New Jersey\'s trusted residential & commercial plumbing professionals — emergency repairs, water systems, and 24/7 service you can count on.",')
    lines.append('  phone: "(908) 281-7101",')
    lines.append('  email: "info@clearcurrentplumbing.com",')
    lines.append('  address: "PO Box 7371, Hillsborough, NJ 08844",')
    lines.append('  hours: "24/7 Emergency · Phones answered around the clock",')
    lines.append('  license: "NJ Master Plumber #7359",')
    lines.append('  fax: "1-908-647-1517",')
    lines.append("};")
    lines.append("")
    lines.append("export const SITE_TOP = {")
    lines.append('  line: "24/7 Emergency Plumbing Service",')
    lines.append('  badges: ["Licensed & Insured", "Master Plumber #7359", "Family Owned 30+ Years"],')
    lines.append('  ratingValue: "4.9",')
    lines.append('  ratingCount: "500+",')
    lines.append('  ratingLabel: "Reviews",')
    lines.append('  locations: "Somerset · Morris · Hunterdon · Essex · Union",')
    lines.append("};")
    lines.append("")
    lines.append("export const OFFICE_HOURS = [")
    lines.append('  { days: "Monday – Sunday", hours: "24/7 Emergency Dispatch" },')
    lines.append('  { days: "Office", hours: "Hillsborough, NJ" },')
    lines.append('  { days: "Service Area", hours: "Central New Jersey" },')
    lines.append("];")
    lines.append("")
    lines.append('export const MAP_EMBED_URL =')
    lines.append('  "https://www.openstreetmap.org/export/embed.html?bbox=-74.85%2C40.35%2C-74.35%2C40.75&layer=mapnik&marker=40.49,-74.63";')
    lines.append("")
    lines.append("export const HOME_HERO = {")
    lines.append('  eyebrow: "WELCOME TO CLEARCURRENT PLUMBING",')
    lines.append('  headlineBefore: "Reliable Plumbing.",')
    lines.append('  headlineHighlight: "Fast Response.",')
    lines.append('  headlineAfter: "Expert Service Anytime You Need Us.",')
    lines.append('  body:')
    lines.append('    "We\'re ClearCurrent Plumbing — Central New Jersey\'s trusted residential & commercial plumbing professionals. From emergency repairs to advanced water systems, we keep your home running smoothly 24/7.",')
    lines.append('  primaryCta: { label: "REQUEST SERVICE", to: "/contact" },')
    lines.append('  secondaryCta: { label: "24/7 EMERGENCY", to: "/services/emergency-plumbing" },')
    lines.append("  image: PLUMBING_IMAGES.heroPlumber,")
    lines.append("  trustPills: [")
    lines.append('    { label: "24/7 Emergency", sub: "Always Answered", icon: "Clock" as const },')
    lines.append('    { label: "Online Booking", sub: "Easy Scheduling", icon: "Calendar" as const },')
    lines.append('    { label: "30+ Years", sub: "Serving NJ", icon: "Award" as const },')
    lines.append("  ],")
    lines.append('  ratingQuote:')
    lines.append('    "Our phones are answered 24/7 by our own team. Uniformed, ID-badged technicians arrive on time and ready to help.",')
    lines.append("  ratingCard: {")
    lines.append('    score: "4.9",')
    lines.append('    countLabel: "Trusted by Your Neighbors",')
    lines.append("    avatars: [")
    lines.append('      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",')
    lines.append('      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop",')
    lines.append('      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",')
    lines.append('      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",')
    lines.append("    ],")
    lines.append("  },")
    lines.append('  featuredEyebrow: "CENTRAL NEW JERSEY",')
    lines.append('  featuredTitle: "Trusted Plumbing Professionals",')
    lines.append('  featuredMeta: "Somerset · Morris · Hunterdon · Essex · Union",')
    lines.append("};")
    lines.append("")
    lines.append("export const SERVICES_RIBBON = [")
    ribbons = [
        ("emergency-plumbing", "EMERGENCY", "Flame", "24/7 emergency services for burst pipes, leaks, and clogs."),
        ("drain-cleaning", "DRAIN CLEANING", "Droplets", "Clear clogs and restore proper flow."),
        ("water-heaters", "WATER HEATERS", "Flame", "Repair and installation when you need hot water."),
        ("boilers", "BOILERS", "Thermometer", "Installation, repair, and maintenance."),
        ("water-leaks", "WATER LEAKS", "Droplets", "Leak detection and repair."),
    ]
    for sid, label, icon, desc in ribbons:
        lines.append("  {")
        lines.append(f'    id: "{sid}", label: "{label}", icon: "{icon}" as const,')
        lines.append(f'    description: "{desc}", to: "/services/{sid}",')
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const CAPABILITIES = [")
    caps = [
        ("warrantied", "Warrantied", "Quality workmanship backed by a warranty you can trust.", "ShieldCheck"),
        ("timely", "Timely Appointments", "Phones answered 24/7. Uniformed, ID-badged technicians on time.", "Clock"),
        ("licensed", "Licensed & Insured", "NJ Master Plumber #7359 — fully licensed professionals.", "Award"),
        ("honest", "Honest Communication", "Clear explanations and upfront pricing before work begins.", "Eye"),
    ]
    for cid, title, desc, icon in caps:
        lines.append(f'  {{ id: "{cid}", title: "{title}", description: "{desc}", icon: "{icon}" as const, to: "/about" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const PROCESS_STEPS = [")
    steps = [
        ("touch", "Get in Touch", "Call or request service online — we answer 24/7."),
        ("response", "Fast, Professional Response", "A licensed technician arrives on time, ready to assess and fix the issue."),
        ("pricing", "Transparent Solution & Pricing", "We explain the problem, recommend solutions, and provide a clear quote before work begins."),
        ("guarantee", "Quality Service Guaranteed", "Workmanship warranties and a focus on long-term performance — your satisfaction is our priority."),
    ]
    for sid, label, desc in steps:
        lines.append(f'  {{ id: "{sid}", label: "{label}", description: "{desc}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const HOME_STATS = [")
    stats = [
        ("30+", "Years Of Experience", "Award"),
        ("20", "Working Staff", "Users"),
        ("100k+", "Projects Complete", "Home"),
        ("100%", "Satisfaction Guarantee", "ShieldCheck"),
    ]
    for val, label, icon in stats:
        lines.append(f'  {{ value: "{val}", label: "{label}", icon: "{icon}" as const }},')
    lines.append("];")
    lines.append("")
    lines.append("export const WHY_BENEFITS = [")
    benefits = [
        ("Family-Owned & Trusted", "Nearly 30 years serving Somerset, Morris, Hunterdon, Essex, and Union counties.", "Home"),
        ("Licensed Master Plumbers", "NJ Master Plumber #7359 — licensed, insured, professionally trained.", "ShieldCheck"),
        ("24/7 Emergency Response", "Plumbing problems don't wait — and neither do we.", "Clock"),
        ("Upfront, Honest Pricing", "Clear explanations and pricing before any work begins.", "Tag"),
    ]
    for title, desc, icon in benefits:
        lines.append(f'  {{ title: "{title}", description: "{desc}", icon: "{icon}" as const }},')
    lines.append("];")
    lines.append("")
    lines.append("export const SERVICES = [")
    for sid, title, icon, desc, img in SERVICES:
        lines.append("  {")
        lines.append(f'    id: "{sid}", title: "{title}", icon: "{icon}",')
        lines.append(f'    description: "{desc}",')
        lines.append(f"    image: PLUMBING_IMAGES.{img},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    # Projects
    projects = [
        ("hillsborough-water-heater", "Water Heater Replacement", "Hillsborough, NJ", "Water Heaters", "water-heaters", "beforePipe", "waterHeater"),
        ("bridgewater-drain", "Main Line Drain Cleaning", "Bridgewater, NJ", "Drain Cleaning", "drain-cleaning", "drain", "plumberWorking"),
        ("morristown-repipe", "Whole-Home Repiping", "Morristown, NJ", "Repiping", "repiping", "beforePipe", "afterPipe"),
        ("summit-boiler", "Boiler Service & Repair", "Summit, NJ", "Boilers", "boilers", "boiler", "plumberWorking"),
        ("westfield-emergency", "Emergency Burst Pipe Repair", "Westfield, NJ", "Emergency", "emergency-plumbing", "leak", "emergency"),
    ]
    lines.append("export const BEFORE_AFTER_PROJECTS = [")
    for pid, title, loc, cat, sid, before, after in projects:
        lines.append("  {")
        lines.append(f'    id: "{pid}", title: "{title}", location: "{loc}", category: "{cat}",')
        lines.append(f'    serviceId: "{sid}",')
        lines.append(f"    beforeImage: PLUMBING_IMAGES.{before},")
        lines.append(f"    afterImage: PLUMBING_IMAGES.{after},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const PROJECTS = BEFORE_AFTER_PROJECTS.map((p, i) => ({")
    lines.append("  id: p.id, title: p.title, category: p.category, serviceId: p.serviceId,")
    lines.append("  location: p.location, year: \"2024\",")
    lines.append('  client: p.category === "Commercial" ? "Commercial Client" : "Private Homeowner",')
    lines.append('  value: "—",')
    lines.append("  description: `${p.title} for our ${p.category.toLowerCase()} team in ${p.location}. Licensed work, clean job site, warranty-backed.`,"
    )
    lines.append("  image: p.afterImage, gallery: [p.beforeImage, p.afterImage],")
    lines.append("  beforeImage: p.beforeImage, afterImage: p.afterImage, number: i + 1,")
    lines.append("}));")
    lines.append("")
    lines.append("export const SIGNATURE_PROJECT_COUNT = 5;")
    lines.append("export const PROJECTS_LATEST_PAGE_SIZE = 4;")
    lines.append("")
    # Team
    lines.append("export const TEAM = [")
    team = [
        ("james-clear", "James Clearwater", "Founder & Master Plumber", "James founded ClearCurrent with one promise: honest diagnostics, quality workmanship, and respect for every home."),
        ("maria-santos", "Maria Santos", "Operations Director", "Maria keeps crews routed across five counties — your appointment window means something."),
        ("tom-rivers", "Tom Rivers", "Lead Commercial Plumber", "Tom runs commercial plumbing for restaurants, offices, and multi-family properties."),
        ("sarah-kim", "Sarah Kim", "Water Systems Specialist", "Sarah leads water heater, boiler, and conditioning installs across Central NJ."),
    ]
    avatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=85",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=85",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=85",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=85",
    ]
    for (tid, name, role, bio), img in zip(team, avatars):
        lines.append("  {")
        lines.append(f'    id: "{tid}", name: "{name}", role: "{role}",')
        lines.append(f'    bio: "{bio}",')
        lines.append(f'    image: "{img}",')
        lines.append('    social: { linkedin: "#", twitter: "#" },')
        lines.append("  },")
    lines.append("];")
    lines.append("")
    # Testimonials - NJ plumbing themed
    lines.append("export const TESTIMONIALS = [")
    testimonials = [
        ("Patricia M.", "Hillsborough, NJ", "They replaced our water heater same day when it failed — professional, clean, and fair pricing.", 0),
        ("David R.", "Bridgewater, NJ", "Drain backup at 10 PM — technician was here in under two hours. Lifesavers.", 1),
        ("Susan L.", "Morristown, NJ", "Whole-home repipe was stress-free. Passed inspection, no mess left behind.", 2),
        ("Mark T.", "Summit, NJ", "Boiler service before winter — thorough, explained everything, no upsells.", 3),
        ("Jennifer K.", "Westfield, NJ", "Emergency burst pipe — they found the leak fast and fixed it right. Highly recommend.", 4),
        ("Robert H.", "Somerville, NJ", "30 years in the area shows. Honest crew, on time, warrantied work.", 5),
    ]
    t_avatars = [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=85",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=120&h=120&q=85",
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&h=120&q=85",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=85",
        "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=120&h=120&q=85",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=85",
    ]
    for name, role, quote, i in testimonials:
        lines.append(f'  {{ name: "{name}", role: "{role}", quote: "{quote}", avatar: "{t_avatars[i]}", rating: 5 }},')
    lines.append("];")
    lines.append("")
    # Blog
    lines.append("export const BLOG_POSTS = [")
    blogs = [
        ("signs-water-heater-failure", "Signs Your Water Heater Is Failing", "Rusty water, rumbling, and age — when to repair vs replace.", "March 18, 2024", "James Clearwater", "Water Heaters", "waterHeater"),
        ("prevent-frozen-pipes-nj", "How to Prevent Frozen Pipes in New Jersey Winters", "Insulation, drip tips, and when to call a pro.", "February 28, 2024", "Sarah Kim", "Tips", "pipes"),
        ("drain-cleaning-vs-snaking", "Drain Cleaning vs Snaking: What's Right for Your Clog?", "When hydro-jetting beats a basic snake.", "January 22, 2024", "Tom Rivers", "Drains", "drain"),
        ("sump-pump-maintenance", "Sump Pump Maintenance Before Storm Season", "Test, battery backup, and discharge line checks.", "December 8, 2023", "Maria Santos", "Sump Pumps", "sump"),
        ("water-conditioning-benefits", "Water Conditioning: Softening vs Filtration", "Cleaner water, longer appliance life, better taste.", "November 14, 2023", "Sarah Kim", "Water Quality", "conditioning"),
        ("gas-line-safety", "Gas Line Safety: What Homeowners Should Know", "Signs of leaks, shutoffs, and when to call licensed pros.", "October 3, 2023", "James Clearwater", "Safety", "gasLine"),
    ]
    for bid, title, excerpt, date, author, cat, img in blogs:
        lines.append("  {")
        lines.append(f'    id: "{bid}", title: "{title}", excerpt: "{excerpt}",')
        lines.append(f'    date: "{date}", author: "{author}", category: "{cat}",')
        lines.append(f"    image: PLUMBING_IMAGES.{img},")
        lines.append(f'    content: "{excerpt} Our licensed team serves Central NJ with upfront pricing and warrantied workmanship.",')
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const STATS = [")
    lines.append('  { value: 100000, label: "Projects Complete", suffix: "+" },')
    lines.append('  { value: 30, label: "Years Experience", suffix: "+" },')
    lines.append('  { value: 500, label: "5-Star Reviews", suffix: "+" },')
    lines.append('  { value: 100, label: "Satisfaction Guarantee", suffix: "%" },')
    lines.append("];")
    lines.append("")
  # FAQ
    lines.append("export const FAQ_ITEMS = [")
    faqs = [
        ("How quickly can you respond to a plumbing emergency?", "We offer 24/7 emergency dispatch across Somerset, Morris, Hunterdon, Essex, and Union counties. Most urgent calls receive a licensed technician within 2–4 hours."),
        ("Do you provide free estimates?", "Yes — service and project estimates are free with a written scope. Emergency diagnostic fees may apply but are credited toward repair when you proceed."),
        ("Are you licensed and insured in New Jersey?", "Absolutely. ClearCurrent holds NJ Master Plumber license #7359, full liability, and workers' compensation."),
        ("Do you offer warranties on workmanship?", "Yes. Quality workmanship backed by a warranty you can trust on qualifying work."),
        ("What payment methods do you accept?", "We accept all major credit cards, checks, ACH, and offer financing for qualified projects."),
        ("What areas do you serve?", "We serve Central New Jersey including Somerset, Morris, Hunterdon, Essex, and Union counties."),
    ]
    for q, a in faqs:
        lines.append(f'  {{ question: "{q}", answer: "{a}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const NAV_LINKS = [")
    nav = [("Home", "/"), ("Services", "/services"), ("Projects", "/projects"), ("About", "/about"), ("Service Areas", "/service-areas"), ("Financing", "/financing"), ("Contact", "/contact")]
    for label, path in nav:
        lines.append(f'  {{ label: "{label}", path: "{path}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = [")
    for sid, title, *_ in SERVICES[:6]:
        lines.append(f'  {{ label: "{title}", to: "/services/{sid}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [")
    for label, path in [("Home", "/"), ("Services", "/services"), ("Projects", "/projects"), ("About Us", "/about"), ("Reviews", "/reviews"), ("Financing", "/financing"), ("Contact Us", "/contact")]:
        lines.append(f'  {{ label: "{label}", to: "{path}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const SERVICE_AREAS = [")
    for area in SERVICE_AREAS:
        lines.append(f'  "{area}",')
    lines.append("];")
    lines.append("")
    lines.append("export const BLOG_LIST_PAGE_SIZE = 2;")
    lines.append("")
    lines.append("export function getBlogCategoryCounts(): { label: string; count: number }[] {")
    lines.append("  const m = new Map<string, number>();")
    lines.append("  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);")
    lines.append("  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));")
    lines.append("}")
    lines.append("")
    lines.append('export const BLOG_TAGS = ["WATER HEATERS", "DRAINS", "TIPS", "SUMP PUMPS", "SAFETY", "MAINTENANCE"];')
    lines.append("")
    lines.append("export const PROJECTS_PAGE_STATS = [")
    for val, label in [("100k+", "Projects Complete"), ("30+", "Years Experience"), ("100%", "Satisfaction Guarantee"), ("4.9", "Google Rating")]:
        lines.append(f'  {{ value: "{val}", label: "{label}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const ABOUT_STATS = [")
    for val, label in [("30+", "Years Experience"), ("100k+", "Projects Complete"), ("NJ", "Master Plumber"), ("500+", "5-Star Reviews"), ("24/7", "Emergency Service")]:
        lines.append(f'  {{ value: "{val}", label: "{label}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const CORE_VALUES = [")
    values = [
        ("quality", "Quality workmanship", "Your home's water matters — we deliver work backed by a warranty you can trust.", "ShieldCheck"),
        ("honesty", "Honest communication", "Clear explanations and upfront pricing before any work begins.", "Eye"),
        ("reliability", "24/7 reliability", "Plumbing problems don't wait — and neither do we.", "Clock"),
        ("family", "Family-owned", "Nearly 30 years serving Central New Jersey communities.", "Home"),
        ("licensed", "Licensed professionals", "NJ Master Plumber #7359 — licensed, insured, ID-badged technicians.", "Award"),
        ("community", "Community focused", "We hire local and support the neighborhoods we serve.", "Heart"),
    ]
    for vid, title, desc, icon in values:
        lines.append(f'  {{ id: "{vid}", title: "{title}", description: "{desc}", icon: "{icon}" as const }},')
    lines.append("];")
    lines.append("")
    lines.append("export const CERTIFICATIONS = [")
    certs = [
        ("nj-master", "NJ Master Plumber #7359", "State-licensed plumbing"),
        ("insured", "Licensed & Insured", "Full liability coverage"),
        ("family", "Family Owned 30+ Years", "Trusted local business"),
        ("bbb", "BBB Accredited", "A+ Business Rating"),
        ("warranty", "Workmanship Warranty", "Quality guaranteed"),
    ]
    for cid, label, sub in certs:
        lines.append(f'  {{ id: "{cid}", label: "{label}", sub: "{sub}" }},')
    lines.append("];")
    lines.append("")
    lines.append("export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, \"0\") }));")
    lines.append("")
    lines.append("export const FAQ_TABS = [")
    lines.append('  { id: "general", label: "GENERAL" },')
    lines.append('  { id: "emergency", label: "EMERGENCY" },')
    lines.append('  { id: "process", label: "PROCESS" },')
    lines.append('  { id: "warranty", label: "WARRANTY" },')
    lines.append("] as const;")
    lines.append("")
    lines.append("export type FaqTabId = (typeof FAQ_TABS)[number][\"id\"];")
    lines.append("")
    lines.append("export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {")
    lines.append("  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),")
    lines.append("  emergency: [")
    lines.append('    { question: "What counts as a plumbing emergency?", answer: "Burst pipes, major leaks, sewer backups, no hot water in winter, and gas odors require immediate professional help." },')
    lines.append('    { question: "How fast can you get here?", answer: "Most Central NJ emergency calls receive a licensed technician within 2–4 hours, 24/7/365." },')
    lines.append('    { question: "Should I shut off my water?", answer: "If you have a major leak, shut off the main water valve if safe to do so and call us immediately." },')
    lines.append("  ],")
    lines.append("  process: [")
    lines.append('    { question: "How does scheduling work?", answer: "Call or book online — our team answers 24/7 and confirms your appointment window." },')
    lines.append('    { question: "Do you provide upfront pricing?", answer: "Yes — we explain the problem and provide a clear quote before work begins." },')
    lines.append('    { question: "Will you leave my home clean?", answer: "Absolutely. Boot covers, floor protection, and cleanup are standard on every job." },')
    lines.append("  ],")
    lines.append("  warranty: [")
    lines.append('    { question: "What warranty do you offer?", answer: "Quality workmanship backed by a warranty you can trust on qualifying installs and repairs." },')
    lines.append('    { question: "Is equipment warrantied?", answer: "Yes — manufacturer warranties apply to water heaters, boilers, and fixtures we supply." },')
    lines.append("  ],")
    lines.append("};")
    lines.append("")
    lines.append('export const SERVICES_PAGE_INTRO =')
    lines.append('  "Complete plumbing solutions for Central New Jersey — emergency response, drain cleaning, water heaters, boilers, repiping, and more. Licensed master plumbers, honest pricing, 24/7 service.";')
    lines.append("")
    lines.append("export const COMMERCIAL_FITOUT_CARDS = [")
    emergency_cards = [
        ("burst-pipe", "Burst Pipes", "Sudden leaks and flooding — shut off water and call immediately.", "Droplets"),
        ("clog", "Severe Clogs", "Backed-up drains, toilets, or main line blockages.", "Waves"),
        ("no-hot-water", "No Hot Water", "Water heater failure — especially urgent in cold weather.", "Flame"),
        ("sewer", "Sewer Backup", "Raw sewage in drains — health hazard requiring fast response.", "Cloud"),
        ("leak", "Major Leaks", "Hidden or visible leaks causing damage or high water bills.", "Search"),
        ("sump", "Sump Pump Failure", "Basement flooding risk during storms.", "Snowflake"),
    ]
    for cid, title, desc, icon in emergency_cards:
        lines.append(f'  {{ id: "{cid}", title: "{title}", description: "{desc}", icon: "{icon}" as const }},')
    lines.append("];")
    lines.append("")
    lines.append("export const SERVICE_DEEP_DIVES: {")
    lines.append("  id: string; category: string; title: string; subtitle: string;")
    lines.append("  body: [string, string]; image: string; inclusions: string[];")
    lines.append("}[] = [")
    dives = [
        ("emergency-plumbing", "EMERGENCY", "Emergency Plumbing", "24/7 DISPATCH · LICENSED TECHNICIANS",
         ["When pipes burst or water won't stop, you need licensed professionals — not a handyman. ClearCurrent rolls stocked trucks across Central NJ with the tools to make safe repairs fast.",
          "We document damage for insurance when needed and never leave a hazardous condition unresolved."],
         "emergency", ["24/7 phone dispatch", "Same-night emergency response", "Burst pipe repair", "Leak isolation", "Water shutoff assistance", "Insurance-ready documentation"]),
        ("drain-cleaning", "DRAINS", "Drain Cleaning", "CLEAR CLOGS · RESTORE FLOW",
         ["Kitchen, bathroom, and main line clogs need the right tool — snake, auger, or hydro-jetting. We diagnose the cause and clear blockages without damaging pipes.",
          "Preventive maintenance keeps drains flowing year-round."],
         "drain", ["Kitchen & bath drains", "Main line cleaning", "Hydro-jetting", "Camera inspection", "Root intrusion removal", "Preventive maintenance"]),
        ("water-heaters", "WATER HEATERS", "Water Heater Service", "REPAIR · REPLACE · MAINTAIN",
         ["No hot water is an emergency in New Jersey winters. We service tank and tankless units, pull permits when required, and install quality brands with manufacturer warranties.",
          "Ask about energy-efficient upgrades and same-day replacement when inventory allows."],
         "waterHeater", ["Tank & tankless service", "Same-day replacement", "Permit coordination", "Expansion tanks", "Anode rod replacement", "Manufacturer warranty"]),
    ]
    for sid, cat, title, sub, body, img, inc in dives:
        lines.append("  {")
        lines.append(f'    id: "{sid}", category: "{cat}", title: "{title}", subtitle: "{sub}",')
        lines.append(f'    body: ["{body[0]}", "{body[1]}"],')
        lines.append(f"    image: PLUMBING_IMAGES.{img},")
        lines.append("    inclusions: [")
        for item in inc:
            lines.append(f'      "{item}",')
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const LEAD_FORM = {")
    lines.append('  title: "Get Your Free Plumbing Estimate",')
    lines.append('  description: "No obligation. Licensed plumber review within one business day.",')
    lines.append("  bullets: [")
    lines.append('    "Free on-site estimates",')
    lines.append('    "Upfront, honest pricing",')
    lines.append('    "24/7 emergency service",')
    lines.append('    "NJ Master Plumber #7359",')
    lines.append("  ],")
    lines.append("};")
    lines.append("")
    lines.append("export const STORM_CHECKLIST = [")
    lines.append('  { id: "safety", title: "Shut Off Water", description: "If safe, turn off the main water valve to limit damage until we arrive." },')
    lines.append('  { id: "call", title: "Call ClearCurrent Plumbing", description: "24/7 dispatch — we triage urgency and send a licensed technician." },')
    lines.append('  { id: "document", title: "Document the Damage", description: "Photos help with insurance claims for burst pipes and flooding." },')
    lines.append('  { id: "avoid", title: "Avoid DIY on Gas Lines", description: "Gas odors require immediate evacuation and a licensed professional." },')
    lines.append("];")
    lines.append("")
    lines.append("export const INSPECTION_BENEFITS = [")
    lines.append('  { id: "prevent", title: "Prevent Water Damage", description: "Catch leaks and failing pipes before they flood your home.", icon: "ShieldCheck" as const },')
    lines.append('  { id: "health", title: "Protect Water Quality", description: "Identify contamination risks and aging supply lines.", icon: "Droplets" as const },')
    lines.append('  { id: "efficiency", title: "Improve Efficiency", description: "Water heater and fixture upgrades lower utility bills.", icon: "Home" as const },')
    lines.append('  { id: "value", title: "Protect Home Value", description: "Clean plumbing reports build buyer confidence.", icon: "DollarSign" as const },')
    lines.append("];")
    lines.append("")
    lines.append("export const INSPECTION_TYPES = [")
    lines.append('  { id: "routine", title: "Routine Plumbing Inspections", description: "Recommended for older homes to verify pipes, fixtures, and water heaters.", image: PLUMBING_IMAGES.pipes },')
    lines.append('  { id: "pre-purchase", title: "Pre-Purchase Inspections", description: "Know what you\'re buying — we inspect supply, waste, and fixtures.", image: PLUMBING_IMAGES.bathroom },')
    lines.append('  { id: "emergency", title: "Post-Emergency Assessment", description: "After burst pipes or backups — documentation for insurance.", image: PLUMBING_IMAGES.emergency },')
    lines.append('  { id: "commercial", title: "Commercial Plumbing", description: "Restaurants, offices, and multi-family properties.", image: PLUMBING_IMAGES.commercial },')
    lines.append("];")
    lines.append("")
    lines.append("export const INSPECTION_CHECKLIST = [")
    for item in ["Water heater age & condition", "Visible supply & drain lines", "Fixture operation & leaks", "Sump pump test", "Water pressure check", "Gas line visual inspection (licensed)" ]:
        lines.append(f'  "{item}",')
    lines.append("];")
    lines.append("")
    lines.append("export const CONTACT_TRUST_STRIP = [")
    lines.append('  { id: "licensed", title: "Licensed & Insured", description: "NJ Master Plumber #7359 with full liability coverage.", icon: "ShieldCheck" as const },')
    lines.append('  { id: "warranty", title: "Warrantied Work", description: "Quality workmanship backed by a warranty you can trust.", icon: "Award" as const },')
    lines.append('  { id: "timely", title: "Timely Appointments", description: "Phones answered 24/7 — uniformed, ID-badged technicians.", icon: "Clock" as const },')
    lines.append('  { id: "honest", title: "Honest Pricing", description: "Clear quotes before work begins — no surprises.", icon: "Tag" as const },')
    lines.append("];")
    lines.append("")
    lines.append("export const ABOUT_HERO_BADGES = [")
    lines.append('  { id: "family", title: "Family Owned 30+ Years", icon: "Home" as const },')
    lines.append('  { id: "licensed", title: "NJ Master Plumber", icon: "ShieldCheck" as const },')
    lines.append('  { id: "warranty", title: "Warrantied Work", icon: "Award" as const },')
    lines.append('  { id: "honest", title: "Upfront Pricing", icon: "Tag" as const },')
    lines.append("];")
    lines.append("")
    lines.append("export const FINANCING_CONTENT = {")
    lines.append('  eyebrow: "FLEXIBLE FINANCING",')
    lines.append('  title: "Affordable Plumbing Solutions",')
    lines.append('  subtitle: "Don\'t let budget stand between you and essential repairs.",')
    lines.append('  body: "We partner with trusted lenders to offer flexible financing on qualifying water heaters, repiping, and major installations. Apply in minutes — decisions often same day.",')
    lines.append("  image: PLUMBING_IMAGES.financing,")
    lines.append("  benefits: [")
    lines.append('    "Low monthly payments",')
    lines.append('    "Quick approval process",')
    lines.append('    "No prepayment penalties",')
    lines.append('    "Works with major projects",')
    lines.append("  ],")
    lines.append('  cta: { label: "REQUEST FINANCING INFO", to: "/contact" },')
    lines.append("};")
    lines.append("")

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT} ({len(lines)} lines)")

if __name__ == "__main__":
    main()
