# Nexora — Website knowledge base (for chatbots / assistants)

**Purpose:** Single source of truth describing the public **Nexora** marketing site (nexora-agn.com) so a chatbot can answer accurately.  
**Generated from:** Application source as of **May 11, 2026**.  
**Note:** Legal pages show a “Last updated” date that is generated when the page loads; treat policy timing as “current on the site” unless the business publishes a fixed effective date elsewhere.

---

## 1. Brand, legal entity, and positioning

- **Consumer-facing brand:** Nexora (also referenced as “Nexora AGN” in some marketing sections).
- **Legal name:** NEXORA SOLUTION L.L.C  
- **Legal form:** With Limited Liability Company (L.L.C.)  
- **Commercial registration (CR):** 196260-1  
- **Website / primary domain referenced in collateral:** nexora-agn.com  
- **Default browser title (homepage):** “Nexora | We build your website, you preview it, then you decide.”  
- **Meta description (homepage):** “Nexora builds branded, responsive websites with a clear process. Preview your brand, launch on your timeline.”

### What Nexora does (high level)

Nexora is a website studio that emphasizes **preview before commitment**: they build sites (with a strong tilt toward construction and trades in hero copy), let prospects **see a live preview**, then the client decides. They offer **packaged plans** (Starter, Growth) plus **Custom** scopes, **ERP-oriented integrations** for catalog/pricing/stock, **AI assistant** tiers, and ongoing **SEO / growth messaging**. Payment options on the packaged flow include Stripe, PayPal, and Paysera.

---

## 2. Contact and social

| Channel | Detail |
|--------|--------|
| **Email** | info@nexora-agn.com |
| **Phone** | +1 (888) 535-9177 |
| **Instagram** | [@nexora.agn](https://www.instagram.com/nexora.agn?igsh=MXE4OXR5cm95ejEzNw%3D%3D) |
| **Registered office** | Listed on the Contact page once `addressLines` are configured in code; until then the display may be empty aside from legal name and CR. |

**Response-time promise (Contact page):** “We reply within one business day.”

**Privacy-related requests:** Users are directed to the Privacy policy and may use the Contact page.

---

## 3. Site map (public routes)

| Path | Page title (typical) | Summary |
|------|----------------------|---------|
| `/` | Nexora (default marketing title) | Full landing: hero, how it works, live brand preview, ERP, AI, portfolio, why Nexora, pricing, final CTA. |
| `/contact` | Contact \| Nexora | Contact details + inquiry form (name, work email, subject optional, message). |
| `/start` | Start a project \| Nexora | Multi-step onboarding: project type → plan → brand/content → payment preference → confirmation. |
| `/blog` | Blog \| Nexora | List of insights articles. |
| `/blog/:slug` | Blog \| Nexora | Individual article (three slugs exist; unknown slug shows 404). |
| `/privacy` | Privacy policy \| Nexora | Data practices, Paysera mentioned for payments. |
| `/terms` | Terms of service \| Nexora | Engagement terms for site use and services. |
| `/refund-policy` | Refund policy \| Nexora | Refunds / cancellations policy. |
| `/shipping-policy` | Shipping policy \| Nexora | Digital delivery only — no physical shipping. |
| `/sales-deck` | Sales collateral \| Nexora | Print/PDF collateral: portfolio + “why Nexora” + representative outcomes (**`noindex`**). |
| `/website-program` | Website program \| Nexora | Long-form program overview, pricing table, FAQs (**`noindex`**). |

**404:** Any unknown path shows “Page not found” with link home.

### Staff-only (not customer self-service)

- `/admin/login`, `/admin/clients`, `/admin/clients/:id`, `/admin/requests` — require authentication; redirect unauthenticated users to login. Do **not** describe these as public support paths.

---

## 4. Homepage (`/`) — sections and key copy

Sections appear in this order:

### Navigation (desktop/mobile)

Anchors scroll on the homepage (or navigate home then scroll): **How it works**, **ERP**, **AI**, **Work**, **Why Nexora**, **Pricing**.  
Top-level links: **Blog**, **Start a project**, **Contact**.  
Primary button: **Book a Demo** (opens demo request modal).

### Hero

- **Eyebrow:** “WEBSITES FOR CONSTRUCTION COMPANIES”
- **Headline:** “We Build Your Website. You Preview It. Then You Decide.”
- **Body:** “Nexora builds high-converting websites for construction companies, and lets you preview the live site before you buy. Love it? We launch it and migrate everything seamlessly.”
- **Primary CTA:** “See Your Website” / sub: “Preview Your Live Site” (scrolls to live preview section).
- **Secondary CTA:** “Book a Demo” / sub: “Talk to a Specialist”.
- **Trust strip (3 items):** Clear packages (Starter, Growth, or Custom); Zero Risk — You Decide; We Migrate Everything — Stress-Free.
- **Bottom bar (4 features):** Preview Before You Buy; Built for Construction; We Handle Everything; Results That Matter (more leads, calls, builds).
- **“Your Site is Ready!” checklist:** Pages Built; Design Complete; Content In Place; Mobile Optimized; SEO Ready.
- **Trust slider heading:** “Trusted by local businesses” — names: F.Morina Bauunternehmen, Arizona Roof Doctors, Boss Roofing & Siding, The Honest Guys, Go Prime Electric, Pro Lawn & Pest Control, Indy Precision Painters.

### How it works (`#how-it-works`)

**Headline:** “Four steps. One clear path.”  
**Sub:** “You bring brand and content. We build, connect, and ship.”

1. **Logo & colors** — Upload logo and palette; applied across header, favicon, surfaces, type. Tags: Brand-first, One palette.  
2. **Your content** — “Tell us what you do. We shape the story.” Tags: Messaging, Conversion.  
3. **ERP integration** — “Products flow to the site automatically.” Tags: Auto sync, Live catalog.  
4. **Build & launch** — “We polish, you approve, you go live.” Completion banner: “Ready to go live” — “Full site in hand. Flip the switch when you’re ready. No loose ends.” Tags: Responsive, Review & launch.

**“Plays nice with” / ERP logos named on site:** Oracle NetSuite, SAP, Microsoft Dynamics 365, Sage, Trimble Viewpoint, Autodesk, Odoo, QuickBooks, Xero.  
**Footer line:** “Don’t see yours? Ask. We connect most major systems.”

### Live brand preview (`#live-preview`)

**Eyebrow:** “Try it live”  
**Headline:** “See your brand before you buy in”  
**Sub:** “Logo, colours, desktop or mobile. Updates instantly. No guesswork.”  
Mini flow labels: Upload → Brand → Colors → ERP.

Users can upload a logo (PNG/JPG/SVG/WebP), set brand name, pick primary/secondary colors (with optional extraction from logo), and toggle desktop vs mobile mock preview.

### ERP / systems (`#erp-sync`)

**Eyebrow:** “Systems in sync”  
**Headline:** “Your site talks to your tools.”  
**Sub:** “One source of truth. No copy-paste. No surprise numbers.”

Bullets:

- Catalog & pricing matches live rules.  
- Orders land where fulfilment already looks.  
- One trail — finance and ops see the same story.

**Industry cards:**

- Construction & supply — “Pricing and stock match your warehouse. No double entry.”  
- Real estate & development — “Leads land with context, not just ‘contact us.’”  
- Automotive & field services — “Bookings and jobs match how your shop already works.”

**Quick fit check Q&A:**

- Already have a site? → “Refresh or start fresh. We plan the data path upfront.”  
- Migrating or new? → “Same clear review loop either way.”  
- Which system? → “We map once. Then catalog and orders stay in sync.”

### AI (`#ai`)

**Headline:** “Automation that actually helps”  
**Sub:** “Routing, qualification, first-line answers. You stay in control.”

**For your business:** Faster answers; Smarter hand-offs; Always on (after-hours bookings with timestamps).  
**For winning clients (dark card):** On-brand assistant; Instant replies; 24/7 coverage (“You keep approvals; automation handles repetition.”).  
Supporting line: “Speed wins. A tight loop from visit to qualified lead beats a dead contact form.”

### Client work / portfolio (`#projects`)

**Headline:** “Websites we’ve put live for our clients”  
**Sub:** “Live sites you can click through, not mockups.”  
Link: “Start your project” → `/start`.

**Showcase sites (name, category, one-line description, live URL):**

1. **F.Morina Bauunternehmen** — Construction — German construction company showcasing Rohbau, concrete, and new-build work. — https://www.fmorina-bau.de/  
2. **Arizona Roof Doctors** — Roofing — Phoenix roofing site with service areas, financing, and strong lead focus. — https://www.arizonaroofdoctors.com/  
3. **Boss Roofing & Siding** — Roofing & exteriors — Roofing, siding, and storm restoration for homeowners across Northern Illinois. — https://www.bossroofingsiding.com/  
4. **The Honest Guys** — Home services — Residential and commercial cleaning with booking and service-area coverage. — https://thehonestguysatl.com/  
5. **Go Prime Electric** — Electrical — Multi-service electrician with residential, commercial, and industrial pages. — https://goprimeelectric.com/  
6. **Pro Lawn & Pest Control** — Lawn & pest — Lawn and pest services with quotes, pricing, and local proof. — https://prolawnlandscape.net/  
7. **Indy Precision Painters** — Painting — Interior and exterior painting with reviews and result galleries. — https://indyprecisionpainters.com/

### Why choose Nexora (`#why-choose-us`)

**Badge:** “Why choose Nexora AGN”  
**Headline:** “We Don't Just Promise Results. We Deliver Them.”  
**Sub:** “We help businesses rank higher, generate more leads, and book more appointments through proven SEO strategies that drive real, measurable growth.”

**Six pillars:**

1. Proven SEO Strategies — Data-driven SEO for rankings and high-intent traffic.  
2. More Leads, More Clients — Qualified leads to paying customers.  
3. More Appointments — Calls, bookings, appointments via organic visibility.  
4. Results You Can Measure — Transparent reporting.  
5. Industry-Specific Expertise — Outrank competitors in your market.  
6. Long-Term Growth — Sustainable SEO and authority.

**Stat strip (marketing benchmarks — not audited guarantees):**

- 150+ Businesses Helped — Across industries aiming for visibility and predictable inbound interest.  
- 3.2× More Leads (avg.) — Typical uplift in inbound inquiries after foundational SEO fixes.  
- 2.7× More Calls & Bookings — From structured pages and clearer CTAs.  
- 200%+ Traffic Lift (benchmark) — Directional uplift in organic sessions within a six-month optimisation window.

**Client reviews carousel:** Titled “Real Results. Real Clients.” Explains cards align to live sites in Work; mentions rankings, enquiries, booked jobs, ongoing SEO hygiene. Each card shows **indicative lift (campaign-dependent)** with Traffic / Leads / Bookings percentages **per project** (see Sales deck section for the same figures — treat as directional, not audited).

**CTA bar:** “Ready to grow your visibility?” — “Book a free strategy call”.

### Pricing (`#pricing`)

**Headline:** “Pick your lane”  
**Sub:** “Starter to get live. Growth when you need depth. Custom for anything else.”  
**Footnote:** “Final numbers after a quick demo, scoped in writing.”

**Plans (full detail in section 5):** Each card links to `/start?plan=starter`, `/start?plan=growth`, or `/start?plan=custom` as applicable.

### Final CTA (`#cta`)

**Headline:** “Live in days, not months”  
**Body:** “15-minute walkthrough. See preview, timeline, and launch. No fluff.”  
**Secondary path:** Link to “Start a project” on `/start`.  
Buttons: “Book a Demo”; “Preview Your Site” (scrolls to `#live-preview`).

### Footer

**Tagline:** “We build business websites. Small team. You’re with the same people from kickoff to launch.”  
**Legal & contact links:** Privacy, Terms, Refund policy, Shipping policy, Contact.  
**Copyright:** © current year Nexora.  
**Payments:** “Payments securely by” Paysera (logo).  
**Legal block repeats:** legal name, legal form, CR number.

---

## 5. Plans and pricing (marketing)

**Growth** is labeled **“Most popular”** on cards.

### Starter — $199/month

- **Tagline:** “A trustworthy company site and lead flow. Up fast, not a year-long build.”  
- **CTA label on card:** “Book a demo” (button still goes to start flow with plan).  
- **Includes:** Web & mobile responsive; Essential structure & key sections; Lead capture & forms; Hosting & SSL; AI Assistant — up to 50 messages/month; Monthly updates (scoped).

### Growth — $399/month

- **Tagline:** “Your services, prices, and office systems stay matched to the website.”  
- **Includes:** Web & mobile responsive; Unlimited pages; Catalog & pricing sync; AI Assistant — 5,000 messages/month; SEO & Google Ads setup; AI Infrastructure.

### Custom — Custom pricing

- **Tagline:** “Site, mobile app, or custom software for your job. We scope it to what you actually run.”  
- **Includes:** Web & mobile responsive; App Store & Google Play when scope needs native apps; Admin dashboard & workflows; Dedicated scoping, integrations & handoff.  
- **CTA:** “Talk to us” / start flow uses “Start a project”.

### AI limits (also in Website Program FAQ)

- Starter: up to **50** assistant messages/month.  
- Growth: up to **5,000** messages/month with infrastructure suited to inbound volume.

---

## 6. Book a Demo modal (homepage / blog)

When users click **Book a Demo**, a form captures business context. **Stated benefits:**

- Custom site + preview before you commit  
- We ship. You don’t manage devs  
- Ongoing support on your plan  

**Industry dropdown options:** E-commerce, SaaS, Agency, Restaurant, Real estate, Construction, Other (plus required “Industry *”).  
Other fields include work email validation, company, phone, whether they have a website, optional marketing opt-in. Submission uses the site’s email pipeline.

---

## 7. Start a project (`/start`)

**Intro (page header):** “Pick a package, upload your logo and brand details, then choose how you’d like to pay. We’ll send a secure payment link right after you submit.”

**Progress labels:** Project type → Package → Brand & content → Payment.

### Step 1 — Project type

**Explainer:** “Tell us if you’re starting fresh or migrating an existing site. You’ll choose your package next, then branding and payment.”

- **Create a new website** — “Launch a tailored site with your brand, content, and the package you choose.”  
- **Migrate an existing website** — “Move from your current site into a fresh Nexora build—we’ll capture what you send in the kickoff.”

### Step 2 — Package

Chooses Starter, Growth, or Custom (prefilled if `?plan=` query matches `starter`, `growth`, `custom`).

### Step 3 — Brand & content (form)

Shows selected type and package summary.

**New website — section title:** “Brand & kickoff assets”  
**Note:** “ERP and AI scope are finalised on your call — nothing to answer about them here. Domain & hosting are handled internally after kickoff.”

**Migrate — section title:** “Migration kickoff”  
**Note:** “Just paste the URL of your existing site — we’ll extract your logo, brand colours, and copy from there. Domain & hosting are already in place, nothing else needed.”

Collects business email, logo upload, brand colors (for new sites), preferred domain / current site URL as applicable, primary content instructions, optional notes. Button: **Continue to payment**.

### Step 4 — Payment

**Copy:** Choose Stripe, PayPal, or Paysera; after submit they receive a **secure payment link**; once paid, **full production** begins.  
Submit: **Submit request & request payment**.

### Step 5 — Confirmation

**Title:** “Request received”  
**Body:** “Check your inbox. You’ll get a secure payment link for the method you picked—once that’s settled, production continues.”  
Optional: **Start another request**.

---

## 8. Blog (`/blog` and `/blog/:slug`)

**Index:**

- Eyebrow: “Blog”  
- Title: “Insights”  
- Subtitle: “How we ship sites, and how you can too.”

### Article 1

- **Slug:** `construction-supply-catalog-erp-sync`  
- **Category:** Construction supply  
- **Title:** “Why your B2B catalog should read from the ERP, not a spreadsheet export”  
- **Date:** 2026-03-12  
- **Excerpt:** Wholesale/construction buyers want numbers matching warehouse/credit teams; spreadsheets cause stale stock; integrate ERP as single source; map geography and tiers; orders should hit same pipeline as phone/EDI.

### Article 2

- **Slug:** `real-estate-development-lead-routing`  
- **Category:** Real estate development  
- **Title:** “Long sales cycles need better lead context, not more form fields”  
- **Date:** 2026-03-28  
- **Excerpt:** Development sites get launch spikes; qualify with phase, budget, intent; structured flows and automation; per-project landing pages with consistent components.

### Article 3

- **Slug:** `automotive-services-booking-erp`  
- **Category:** Automotive services  
- **Title:** “Service menus, bays, and parts: what ‘online booking’ should connect to”  
- **Date:** 2026-04-08  
- **Excerpt:** Tie booking to shop management/ERP; align service catalog to billing; capacity rules for bays; parts messaging; create/update work orders on arrival.

*(Full paragraph text for each article is in `src/data/marketingBlog.ts` if you need verbatim sourcing.)*

---

## 9. Contact page (`/contact`)

- **Title:** Contact  
- **Description:** “Questions or demos. We reply within one business day.”  
- **Direct lines:** Email info@nexora-agn.com; Phone +1 (888) 535-9177; Instagram @nexora.agn; Registered office block (legal name + CR).  
- **Form:** Full name (required), work email (required), subject (optional), message (required). Success: “Message received — Thank you for reaching out. A member of our team will follow up shortly.”

---

## 10. Privacy policy (`/privacy`)

**Audience copy:** “How we collect, use, and protect personal information when you use Nexora.”

**Sections (summarized):**

1. **Data controller** — NEXORA SOLUTION L.L.C; CR quoted; registered address when configured.  
2. **Information we collect** — Name, work email, company, phone when requesting consultation or contacting; limited technical/browser data for operation/security.  
3. **How we use information** — Respond, deliver/improve services, project/account comms, optional updates if opted in; no unrelated profiling beyond business need.  
4. **Sharing and processors** — No sale of personal data; subprocessors (hosting, email, analytics) under obligations.  
5. **Payment processing** — Paysera and similar; **payment card details not stored** on Nexora servers.  
6. **Security** — Reasonable safeguards; acknowledges internet transmission risk.  
7. **Your choices** — Rights to access/correct/delete/restrict depending on jurisdiction; contact via Contact page.  
8. **Updates** — Policy may change; continued use may constitute acceptance where law allows.

---

## 11. Terms of service (`/terms`)

**Audience copy:** “The terms that apply when you use our website and engage Nexora for services.”

**Sections (summarized):**

1. **Agreement** — Between user and NEXORA SOLUTION L.L.C (d/b/a “Nexora”); governs site and agreed services; using the site or engaging work = acceptance.  
2. **Services and engagement** — Web design/dev as in proposal/SOW/order; timelines/deliverables/fees incorporated by reference; work starts after scope/deposit satisfied; client delays affect dates.  
3. **Client responsibilities** — Accurate info, timely feedback, lawful content/rights for materials.  
4. **Intellectual property** — On full payment, assign deliverables created for project except pre-existing tools/know-how; third-party licenses may apply.  
5. **Limitation of liability** — Cap: fees paid to Nexora for affected services in **six months** preceding claim; excludes indirect/consequential damages to extent allowed by law.  
6. **Changes** — Terms may update on this page; material changes as law requires.

---

## 12. Refund policy (`/refund-policy`)

- Nexora provides **digital services** and custom-built websites.  
- **General:** Payments generally **non-refundable** once the project **has started**.  
- **Exceptions (may consider refunds):** Project not started; failure to deliver agreed service.  
- **Subscriptions:** Cancel anytime; **no refunds** for already billed periods.  
- **Questions:** info@nexora-agn.com

---

## 13. Shipping policy (`/shipping-policy`)

- **Digital only** — No physical shipment.  
- **Electronic delivery:** Email, online platforms, client dashboards.  
- **Timelines:** Depend on chosen service; communicated during project agreement.  
- **Contact:** info@nexora-agn.com

---

## 14. Sales collateral (`/sales-deck`)

**Indexing:** Page sets **`noindex, nofollow`** — not meant for SEO; still useful internally.

**Purpose:** PDF/print-ready “credibility pack” titled **“Client outcomes & portfolio overview”** — growth framing (visibility, leads, booked work), live portfolio, representative client stories.

**Why Nexora block:** Uses same headline/sub as homepage “Why Nexora”: “We Don't Just Promise Results…” and SEO growth subcopy; pillars from marketing data (proven SEO, leads, appointments, measurable results, industry expertise, long-term growth); stat strip (150+ businesses, 3.2× leads, 2.7× calls/bookings, 200%+ traffic benchmark).

**Portfolio:** Same seven live sites as homepage (URLs repeated).

**Representative outcomes / testimonials:** Narrative quotes + **traffic / leads / bookings** chips; **explicit disclaimer:** percentages are **directional benchmarks for enablement only**, not audited guarantees — verify with Analytics/Search Console before external claims.

**Contact on document:** info@nexora-agn.com; domain nexora-agn.com; confidential sales collateral.

---

## 15. Website program PDF (`/website-program`)

**Indexing:** **`noindex, nofollow`**.

**Cover:**

- Lines: “Thank you for your interest / in our website services.”  
- Lede: “We build high-performing sites you can preview before you commit—paired with structured SEO thinking, integrations when you grow, and care plans that match how you operate.”

**Brand block:** Program name “Nexora website program”; contact email/phone/site as in section 2.

**Why section:** Mirrors WHY_HEADLINE/WHY_SUB and first three stats from `whyStatStrip`.

**Part 1 — Design, creation, and build (features):** Custom website; Design you approve; SEO foundations; Fully responsive; Imagery that fits; Integrations path; Your words, supported; Modern Nexora stack; Analytics-ready. (Each has a short tagline in collateral.)

**Part 2 — Hosting, reliability, updates, guidance:** Hosting & SSL; Scoped upkeep; Backups & hardening; DNS & migrations; Growth rhythm; Direct guidance.

**Process steps:**

1. Kickoff — Structured brief (goals, timelines, approvals, brand, integrations, DNS).  
2. Design — IA, typography, layouts, CTAs → approved experience.  
3. Build & preview — Staged site for real UX review.  
4. Final polish — Content, QA, redirects, instrumentation, a11y, training if needed.  
5. Launch day — Go-live with observability; Growth adds optimisation/integrations.

**Plans table:** Aligns with **Starter ($199/mo)**, **Growth ($399/mo)**, **Custom** — same feature bullets as marketing plans; note custom scopes quoted when exceeding standard packaging.

**Comparison table theme:** Nexora consolidates strategy, engineering, integrations, hosting, SSL, revisions, analytics, clear ownership vs fragmented freelancers/hosts/ad-hoc SEO.

**FAQs:**

- Ownership → Approved creative/content per contract; hosted plans = licensed use while active; details in paperwork.  
- Copy updates → Client with training or Nexora under scoped upkeep; larger structural changes = scope change.  
- Timeline → Depends on approvals, integrations, content; proposal gives deterministic schedule.  
- AI limits → Same 50 vs 5,000 messages note as pricing.

**Closing:** Reply within one business day; walk previews, timelines, proposals, or upgrades.

---

## 16. 404 page

“Page not found” — page may not exist or was moved. Button: **Back to Home** → `/`.

---

## 17. Consistency hints for chatbot answers

1. **Preview-first model:** Emphasize live preview before commitment when users ask “how does Nexora work?”  
2. **Construction emphasis** appears in hero; **portfolio spans** roofing, trades, electrical, lawn, painting, cleaning, etc.—avoid saying “construction only.”  
3. **Prices** on site are marketing anchors; onsite copy says **final numbers after demo / in writing**.  
4. **Performance stats** (traffic/leads multiples) are **directional/indicative** — do not present as guarantees.  
5. **Payments:** Customer-facing checkout mentions **Stripe, PayPal, Paysera**; privacy mentions **Paysera** explicitly for processing.  
6. **Refund default:** Digital services — generally non-refundable after work starts; exceptions listed on refund policy.  
7. **No physical shipping.**  
8. For **technical admin** or **account issues inside `/admin`**, direct users to their internal Nexora operator—those screens are not public.

---

## 18. File reference (for maintainers)

This document was assembled from routes in `src/App.tsx` and content in:

- Landing: `src/components/landing/*.tsx`, `src/pages/Index.tsx`  
- Data: `src/data/marketingBlog.ts`, `src/data/customerProjects.ts`, `src/data/whyChooseNexora.ts`, `src/data/nexoraWebsiteProgram.ts`  
- Legal: `src/lib/companyLegal.ts`, policy pages under `src/pages/`  
- Plans: `src/lib/pricingPlans.ts`  
- Onboarding: `src/components/onboarding/ProjectOnboardingWizard.tsx`  
- Metadata: `index.html`
