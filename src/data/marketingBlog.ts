export type MarketingBlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  date: string;
  excerpt: string;
  /** Professional cover (Unsplash, optimized width). */
  coverImage: string;
  coverImageAlt: string;
  paragraphs: string[];
  relatedTo?: { to: string; label: string };
};

export const marketingBlogPosts: MarketingBlogPost[] = [
  {
    slug: "preview-your-website-before-you-subscribe",
    category: "How Nexora works",
    title: "Preview your website before you subscribe",
    metaTitle: "Preview Your Website Before You Subscribe | Nexora",
    metaDescription:
      "Nexora stages a live website with your brand before you pay. Here is what the preview includes, what happens at checkout, and how that differs from a typical agency quote.",
    date: "2026-09-17",
    excerpt:
      "Most agencies ask you to sign before you have seen a working site. We invert that: you click through a staged website, then you subscribe.",
    coverImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Person reviewing a website layout on a laptop at a desk",
    relatedTo: { to: "/services/websites", label: "How website subscriptions work" },
    paragraphs: [
      "A typical website project sells a timeline and a mood board. You pay a deposit, wait, and hope the first reveal matches what you had in mind. Nexora sells the opposite sequence: we brand a working site, you preview it on desktop and mobile, and you subscribe only if you want that site to go live.",
      "The preview is not a PDF. It is a staged website with your logo, colors, and service story applied to a trade template. You can tap the phone number, open service pages, and see how the AI assistant behaves. If something is wrong, we change it before checkout — not after a six-month waterfall.",
      "Starter and Growth plans are published: $99 and $199 a month. Enterprise is $399. Hosting and SSL are included. The AI assistant is included, with a message limit that matches the plan. Growth adds catalog sync and SEO plus Google Ads setup. You pick the plan in the project flow, share kickoff details, and complete Stripe checkout.",
      "This model only works if the preview is honest. Template demos on our examples page are sample companies. Live customer sites are listed on the work page. If you are comparing Nexora to a DIY builder, the difference is not “more templates.” It is that we handle design, launch, and hosting so you are not the project manager.",
    ],
  },
  {
    slug: "what-a-local-service-website-needs-to-generate-leads",
    category: "Local businesses",
    title: "What a local service website needs to generate leads",
    metaTitle: "What a Local Service Website Needs to Generate Leads | Nexora",
    metaDescription:
      "The pages, phone treatment, and after-hours capture that actually get inquiries for trades. Practical checklist from how Nexora builds roofing, electrical, and contractor sites.",
    date: "2026-09-17",
    excerpt:
      "A beautiful homepage that hides the phone number is a brochure. Here is the minimum structure we use when the job is inbound calls and form fills.",
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Small business owner reviewing notes and a laptop in an office",
    relatedTo: { to: "/industries", label: "Industry websites" },
    paragraphs: [
      "Local service buyers are impatient. They search a job type, glance at the first screen on a phone, and call or leave. If the number is in a hamburger menu, if service areas are missing, or if every trade is dumped into one paragraph, they dial the next company.",
      "The pages that matter are unglamorous: a homepage with a tap-to-call button, individual service pages that match how people search (repair versus replacement, residential versus commercial), and coverage copy for the areas you actually serve. Do not invent a landing page for every suburb you might drive through. Be specific about where you roll trucks.",
      "After hours is where most brochure sites fail. An office that closes at 5 p.m. still gets storm and leak traffic at 11. An on-site assistant that can collect name, phone, and job type is not a gimmick; it is the difference between a visitor and a lead. Nexora includes that assistant on every plan, with a monthly message cap that scales on Growth and Enterprise.",
      "Proof should be real. Link to work you have done, show photos of job sites, and keep claims you cannot measure out of the hero. If you want a site built that way, start from the industry pages or request a staged preview. You will see the structure before you subscribe.",
    ],
  },
  {
    slug: "construction-supply-catalog-erp-sync",
    category: "Construction supply",
    title: "Why your B2B catalog should read from the ERP, not a spreadsheet export",
    metaTitle: "B2B Catalog Should Read From the ERP | Nexora",
    metaDescription:
      "Why construction and supply websites should render catalog, pricing, and stock from the ERP instead of spreadsheet exports — and where web orders should land.",
    date: "2026-03-12",
    excerpt:
      "If pricing and stock live in two places, your site will lie eventually. Here is how we keep construction and supply catalogs honest without turning your team into data entry.",
    coverImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Industrial warehouse with stacked materials and high shelving",
    relatedTo: { to: "/industries/construction", label: "Construction websites" },
    paragraphs: [
      "Wholesale and construction supply buyers do not want a prettier PDF. They want the same numbers your warehouse and credit team see. When the website is fed from a one-off export, every ERP change becomes a ticket: someone re-uploads, someone misses a row, and a customer places an order against stale stock.",
      "The sustainable pattern is single-sourced data: product masters, contract pricing, and availability rules stay in the ERP, and the storefront renders what those systems authorize. That does not mean exposing every internal field; it means mapping once, then letting sync jobs or events push deltas on a schedule your ops team agrees to.",
      "For multi-branch supply, geography and customer tier matter. A good integration carries account-specific price lists and lead times so the site reflects branch stock or central allocation, whatever your ERP already models. The web layer should not reinvent that logic.",
      "Finally, think about order flow. When a cart converts, the payload should land in the same order pipeline as phone or EDI orders. Re-keying web orders into the ERP defeats the purpose. If you are evaluating a platform, ask where the order object lands on first submission, not only how pretty the PLP looks. Nexora’s Growth plan is the path we use when catalog and pricing need to stay matched to office systems.",
    ],
  },
  {
    slug: "real-estate-development-lead-routing",
    category: "Real estate development",
    title: "Long sales cycles need better lead context, not more form fields",
    metaTitle: "Better Lead Context for Development Sites | Nexora",
    metaDescription:
      "Development websites convert better when inquiries carry phase, budget band, and intent — not a longer form. How we think about routing on project marketing sites.",
    date: "2026-03-28",
    excerpt:
      "Development and project marketing sites get traffic spikes on launch week. The teams that win attach phase, budget band, and intent to every inquiry before the first call.",
    coverImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Modern high-rise buildings and urban skyline at dusk",
    relatedTo: { to: "/services/websites", label: "Hosted websites" },
    paragraphs: [
      "In residential and mixed-use development, the gap between curiosity and qualified interest is wide. A generic “contact us” form treats every visitor the same, so sales spends the first call asking what the website should have captured: which phase, which product line, and whether the buyer is owner-occupier or investor.",
      "Structured inquiry flows (without feeling like a tax return) improve both sides. Dropdowns or progressive steps for phase and budget range, plus free text for timing, give CRM and email routing enough to assign the right person and template.",
      "Automation helps when it respects your process: acknowledge immediately, route by region or project, and push enriched fields into the tool your team already works in. The goal is not to replace the relationship; it is to stop valuable leads from sitting in a shared inbox with no context.",
      "For firms running multiple active projects, per-project landing pages with consistent components keep the brand tight while allowing copy and media to reflect each site. Behind the scenes, the same routing rules can tag the source so marketing can attribute spend without manual spreadsheets.",
    ],
  },
  {
    slug: "automotive-services-booking-erp",
    category: "Automotive services",
    title: "Service menus, bays, and parts: what “online booking” should connect to",
    metaTitle: "Auto Shop Booking Should Match the Shop System | Nexora",
    metaDescription:
      "Online booking for auto and fleet shops only works if service menus, bay capacity, and work orders connect to the systems the shop already runs.",
    date: "2026-04-08",
    excerpt:
      "Customers expect to pick a service and a time slot. Shops expect bay capacity and parts availability to match reality. Here is how we think about closing that loop.",
    coverImage:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Professional automotive workshop with vehicle on lift and tooling",
    relatedTo: { to: "/industries/automotive", label: "Automotive websites" },
    paragraphs: [
      "Automotive and fleet service businesses often have solid shop management or ERP data for jobs, parts, and labour codes. The failure mode is a booking widget that writes to a calendar disconnected from job cards: double-booked bays, or appointments for services you no longer promote.",
      "A useful public experience starts with a service catalogue aligned to how you bill: mapped labour operations and parts kits where applicable, not a generic list of tasks that the front desk has to reinterpret.",
      "Capacity rules belong in the integration layer: which bays, which technicians, and blackout windows should constrain what the customer can book. You may start with simpler rules (e.g. per-day limits) and tighten as you measure no-shows and utilisation.",
      "Parts availability is trickier; many shops do not expose real-time inventory to the web for every SKU. Even then, flagging “supply may be confirmed at check-in” or checking fast-moving items against ERP stock reduces surprises. The point is to be explicit instead of silent: customers tolerate constraints when they are clear.",
      "When the vehicle arrives, the hand-off should create or update the work order in the system your technicians use, with the same package the customer selected online. That continuity is what turns a marketing site into operations infrastructure, not just a brochure.",
    ],
  },
];

export function getMarketingPostBySlug(slug: string): MarketingBlogPost | undefined {
  return marketingBlogPosts.find(post => post.slug === slug);
}