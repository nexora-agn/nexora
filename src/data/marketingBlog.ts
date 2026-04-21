export type MarketingBlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  /** Professional cover (Unsplash, optimized width). */
  coverImage: string;
  coverImageAlt: string;
  paragraphs: string[];
};

export const marketingBlogPosts: MarketingBlogPost[] = [
  {
    slug: "construction-supply-catalog-erp-sync",
    category: "Construction supply",
    title: "Why your B2B catalog should read from the ERP—not a spreadsheet export",
    date: "2026-03-12",
    excerpt:
      "If pricing and stock live in two places, your site will lie eventually. Here is how we keep construction and supply catalogs honest without turning your team into data entry.",
    coverImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Industrial warehouse with stacked materials and high shelving",
    paragraphs: [
      "Wholesale and construction supply buyers do not want a prettier PDF—they want the same numbers your warehouse and credit team see. When the website is fed from a one-off export, every ERP change becomes a ticket: someone re-uploads, someone misses a row, and a customer places an order against stale stock.",
      "The sustainable pattern is single-sourced data: product masters, contract pricing, and availability rules stay in the ERP, and the storefront renders what those systems authorize. That does not mean exposing every internal field; it means mapping once, then letting sync jobs or events push deltas on a schedule your ops team agrees to.",
      "For multi-branch supply, geography and customer tier matter. A good integration carries account-specific price lists and lead times so the site reflects branch stock or central allocation—whatever your ERP already models. The web layer should not reinvent that logic.",
      "Finally, think about order flow. When a cart converts, the payload should land in the same order pipeline as phone or EDI orders. Re-keying web orders into the ERP defeats the purpose. If you are evaluating a platform, ask where the order object lands on first submission, not only how pretty the PLP looks.",
    ],
  },
  {
    slug: "real-estate-development-lead-routing",
    category: "Real estate development",
    title: "Long sales cycles need better lead context—not more form fields",
    date: "2026-03-28",
    excerpt:
      "Development and project marketing sites get traffic spikes on launch week. The teams that win attach phase, budget band, and intent to every inquiry before the first call.",
    coverImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Modern high-rise buildings and urban skyline at dusk",
    paragraphs: [
      "In residential and mixed-use development, the gap between curiosity and qualified interest is wide. A generic “contact us” form treats every visitor the same, so sales spends the first call asking what the website should have captured: which phase, which product line, and whether the buyer is owner-occupier or investor.",
      "Structured inquiry flows—without feeling like a tax return—improve both sides. Dropdowns or progressive steps for phase and budget range, plus free text for timing, give CRM and email routing enough to assign the right person and template.",
      "Automation helps when it respects your process: acknowledge immediately, route by region or project, and push enriched fields into the tool your team already works in. The goal is not to replace the relationship; it is to stop valuable leads from sitting in a shared inbox with no context.",
      "For firms running multiple active projects, per-project landing pages with consistent components keep the brand tight while allowing copy and media to reflect each site. Behind the scenes, the same routing rules can tag the source so marketing can attribute spend without manual spreadsheets.",
    ],
  },
  {
    slug: "automotive-services-booking-erp",
    category: "Automotive services",
    title: "Service menus, bays, and parts: what “online booking” should connect to",
    date: "2026-04-08",
    excerpt:
      "Customers expect to pick a service and a time slot. Shops expect bay capacity and parts availability to match reality. Here is how we think about closing that loop.",
    coverImage:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1400&q=85&auto=format&fit=crop",
    coverImageAlt: "Professional automotive workshop with vehicle on lift and tooling",
    paragraphs: [
      "Automotive and fleet service businesses often have solid shop management or ERP data for jobs, parts, and labour codes. The failure mode is a booking widget that writes to a calendar disconnected from job cards—double-booked bays, or appointments for services you no longer promote.",
      "A useful public experience starts with a service catalogue aligned to how you bill: mapped labour operations and parts kits where applicable, not a generic list of tasks that the front desk has to reinterpret.",
      "Capacity rules belong in the integration layer: which bays, which technicians, and blackout windows should constrain what the customer can book. You may start with simpler rules (e.g. per-day limits) and tighten as you measure no-shows and utilisation.",
      "Parts availability is trickier; many shops do not expose real-time inventory to the web for every SKU. Even then, flagging “supply may be confirmed at check-in” or checking fast-moving items against ERP stock reduces surprises. The point is to be explicit instead of silent—customers tolerate constraints when they are clear.",
      "When the vehicle arrives, the hand-off should create or update the work order in the system your technicians use, with the same package the customer selected online. That continuity is what turns a marketing site into operations infrastructure, not just a brochure.",
    ],
  },
];

export function getMarketingPostBySlug(slug: string): MarketingBlogPost | undefined {
  return marketingBlogPosts.find((p) => p.slug === slug);
}
