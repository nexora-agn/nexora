/**
 * NEXORA — Premium Restaurant content registry.
 * Editorial fine-dining palette: warm whites, charcoal, champagne gold.
 * Images sourced from Unsplash (restaurant, cuisine & interiors).
 */

const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const RESTAURANT_IMAGES = {
  hero: u("1414235077428-338989a2e8c0", 1920, 1080),
  interior: u("1517248135467-4c7edcad34c4", 1200, 900),
  exterior: u("1555396273-367ea4eb4db5", 1200, 900),
  terrace: u("1559339352-11d035aa65de", 1200, 900),
  bar: u("1600891964092-4316c288032e", 1200, 900),
  wineCellar: u("1600566753086-00f18fb6b3ea", 1200, 900),
  chef: u("1551218808-94e220e084d2", 1200, 900),
  kitchen: u("1556910103-1c02745aae4d", 1200, 900),
  steak: u("1546833999-b9f581a1996d", 1200, 900),
  sushi: u("1563379926898-05f4575a45d8", 1200, 900),
  pasta: u("1621996346565-e3dbc646d9a9", 1200, 900),
  seafood: u("1555939594-58d7cb561ad1", 1200, 900),
  dessert: u("1551024506-0bccd828d307", 1200, 900),
  cocktail: u("1565299624946-b28f40a0ae38", 1200, 900),
  wine: u("1504674900247-0877df9cc836", 1200, 900),
  coffee: u("1540189549336-e6e99c3679fe", 1200, 900),
  gallery1: u("1414235077428-338989a2e8c0", 800, 600),
  gallery2: u("1517248135467-4c7edcad34c4", 800, 600),
  gallery3: u("1559339352-11d035aa65de", 800, 600),
  gallery4: u("1600891964092-4316c288032e", 800, 600),
  gallery5: u("1551218808-94e220e084d2", 800, 600),
  gallery6: u("1546833999-b9f581a1996d", 800, 600),
  gallery7: u("1621996346565-e3dbc646d9a9", 800, 600),
  gallery8: u("1563379091339-03b21ab4a4f8", 800, 600),
  contactHero: u("1555396273-367ea4eb4db5", 1400, 900),
  aboutHero: u("1551218808-94e220e084d2", 1400, 900),
  menuHero: u("1546833999-b9f581a1996d", 1400, 900),
  eventsHero: u("1600891964092-4316c288032e", 1400, 900),
  giftHero: u("1504674900247-0877df9cc836", 1400, 900),
  blogHero: u("1556910103-1c02745aae4d", 1400, 900),
  reviewsHero: u("1559339352-11d035aa65de", 1400, 900),
  guestA: u("1544005313-94ddf0286df2", 120, 120),
  guestB: u("1519345182560-3f2917c472ef", 120, 120),
  guestC: u("1612349317150-e413f6a5b16d", 120, 120),
  sommelier: u("1472099645785-5658abf4ff4e", 600, 800),
  avatarG: u("1560250097-0b93528c311a", 300, 300),
} as const;

/** Backward-compatible alias used by About and legacy components */
export const LUXURY_IMAGES = {
  ...RESTAURANT_IMAGES,
  about: RESTAURANT_IMAGES.aboutHero,
  heroAlt: RESTAURANT_IMAGES.interior,
  villa: RESTAURANT_IMAGES.exterior,
  penthouse: RESTAURANT_IMAGES.terrace,
  apartment: RESTAURANT_IMAGES.interior,
  waterfront: RESTAURANT_IMAGES.terrace,
  pool: RESTAURANT_IMAGES.bar,
  skyline: RESTAURANT_IMAGES.exterior,
  neighborhood: RESTAURANT_IMAGES.interior,
  development: RESTAURANT_IMAGES.kitchen,
  office: RESTAURANT_IMAGES.bar,
  contact: RESTAURANT_IMAGES.contactHero,
  blog: RESTAURANT_IMAGES.blogHero,
  agentA: RESTAURANT_IMAGES.chef,
  agentB: RESTAURANT_IMAGES.sommelier,
  agentC: RESTAURANT_IMAGES.guestB,
  agentD: RESTAURANT_IMAGES.guestC,
  clientA: RESTAURANT_IMAGES.guestA,
  clientB: RESTAURANT_IMAGES.guestB,
  clientC: RESTAURANT_IMAGES.guestC,
  floorPlan: RESTAURANT_IMAGES.menuHero,
  heroHome: RESTAURANT_IMAGES.hero,
  heroPortfolio: RESTAURANT_IMAGES.interior,
  processHero: RESTAURANT_IMAGES.kitchen,
  crewWorking: RESTAURANT_IMAGES.chef,
  financing: RESTAURANT_IMAGES.wine,
  architecturalPlans: RESTAURANT_IMAGES.menuHero,
  leadMagnet: RESTAURANT_IMAGES.wineCellar,
} as const;

export const HOME_BUILDER_IMAGES = {
  ...RESTAURANT_IMAGES,
  heroHome: RESTAURANT_IMAGES.hero,
  heroPortfolio: RESTAURANT_IMAGES.interior,
  heroProcess: RESTAURANT_IMAGES.kitchen,
  crewWorking: RESTAURANT_IMAGES.chef,
  luxuryExterior: RESTAURANT_IMAGES.exterior,
  architecturalPlans: RESTAURANT_IMAGES.menuHero,
  customHome: RESTAURANT_IMAGES.exterior,
  homeAddition: RESTAURANT_IMAGES.terrace,
  wholeHomeRemodel: RESTAURANT_IMAGES.interior,
  interiorLiving: RESTAURANT_IMAGES.interior,
  contactHero: RESTAURANT_IMAGES.contactHero,
  aboutHero: RESTAURANT_IMAGES.aboutHero,
  reviewsHero: RESTAURANT_IMAGES.reviewsHero,
  processHero: RESTAURANT_IMAGES.kitchen,
  blogHero: RESTAURANT_IMAGES.blogHero,
  financing: RESTAURANT_IMAGES.wine,
  leadMagnet: RESTAURANT_IMAGES.wineCellar,
  gardenDesign: RESTAURANT_IMAGES.interior,
  residentialYard: RESTAURANT_IMAGES.terrace,
  residentialSplit: RESTAURANT_IMAGES.interior,
  commercialSplit: RESTAURANT_IMAGES.bar,
  lawnGreen: RESTAURANT_IMAGES.terrace,
  treeRemoval: RESTAURANT_IMAGES.steak,
  treeTrimming: RESTAURANT_IMAGES.seafood,
  stumpGrinding: RESTAURANT_IMAGES.pasta,
  emergencyTree: RESTAURANT_IMAGES.cocktail,
  luxuryBackyard: RESTAURANT_IMAGES.terrace,
  hardscapePatio: RESTAURANT_IMAGES.bar,
  outdoorLighting: RESTAURANT_IMAGES.wineCellar,
  beforeYard: RESTAURANT_IMAGES.kitchen,
  afterYard: RESTAURANT_IMAGES.interior,
} as const;

export const COMPANY = {
  name: "NEXORA",
  legalName: "Nexora Fine Dining",
  tagline:
    "An extraordinary dining experience celebrating seasonality, craftsmanship, and the art of fine cuisine in the heart of Manhattan.",
  phone: "(212) 555-0147",
  email: "reservations@nexorafinedining.com",
  address: "88 Madison Avenue, New York, NY 10016",
  hours: "Tue–Sun 5pm–10:30pm · Monday closed",
  license: "NYC DOHMH #102847 · NYS Liquor Authority #1234567",
  fax: "",
};

export const SITE_TOP = {
  line: "Reserve Your Table — Seasonal Tasting Menu Now Available",
  badges: ["Michelin Recommended", "Farm-to-Table", "Award-Winning Wine Program"],
  ratingValue: "4.9",
  ratingCount: "480+",
  ratingLabel: "Guest Reviews",
  locations: "Madison Avenue · Private Dining · Chef's Table · Terrace",
};

export const OFFICE_HOURS = [
  { days: "Tuesday – Thursday", hours: "5:00 PM – 10:00 PM" },
  { days: "Friday – Saturday", hours: "5:00 PM – 11:00 PM" },
  { days: "Sunday", hours: "5:00 PM – 9:30 PM" },
  { days: "Monday", hours: "Closed" },
];

export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-73.995%2C40.742%2C-73.975%2C40.752&layer=mapnik&marker=40.747,-73.985";

export const HOME_HERO = {
  eyebrow: "FINE DINING",
  headlineBefore: "An Extraordinary",
  headlineHighlight: "Dining Experience",
  headlineAfter: "",
  body:
    "Exceptional cuisine, handcrafted cocktails, and unforgettable moments in an elegant atmosphere.",
  primaryCta: { label: "Reserve a Table", to: "/reservations" },
  secondaryCta: { label: "View Menu", to: "/menu" },
  image: RESTAURANT_IMAGES.hero,
  trustPills: [
    { label: "Seasonal Menus", sub: "Farm-sourced ingredients", icon: "Leaf" as const },
    { label: "Award-Winning Chef", sub: "Two Michelin stars", icon: "Award" as const },
    { label: "Curated Wine Cellar", sub: "800+ selections", icon: "Wine" as const },
  ],
  ratingQuote: "Celebrated by critics and guests alike for impeccable service and unforgettable cuisine.",
  ratingCard: {
    score: "4.9",
    countLabel: "480+ verified guest reviews",
    avatars: [
      RESTAURANT_IMAGES.guestA,
      RESTAURANT_IMAGES.guestB,
      RESTAURANT_IMAGES.guestC,
      RESTAURANT_IMAGES.avatarG,
    ],
  },
  featuredEyebrow: "SIGNATURE",
  featuredTitle: "Chef's Tasting Menu",
  featuredMeta: "Seven courses · Wine pairing available",
};

export const MENU_CATEGORIES = [
  { id: "starters", title: "Starters", description: "Delicate beginnings to awaken the palate.", icon: "Salad" as const, image: RESTAURANT_IMAGES.seafood, to: "/menu?category=starters" },
  { id: "main-courses", title: "Main Courses", description: "Refined plates crafted with precision and passion.", icon: "UtensilsCrossed" as const, image: RESTAURANT_IMAGES.steak, to: "/menu?category=main-courses" },
  { id: "signature-dishes", title: "Signature Dishes", description: "The dishes that define Nexora.", icon: "Star" as const, image: RESTAURANT_IMAGES.steak, to: "/menu?category=signature-dishes" },
  { id: "seafood", title: "Seafood", description: "Ocean-fresh selections from sustainable sources.", icon: "Fish" as const, image: RESTAURANT_IMAGES.seafood, to: "/menu?category=seafood" },
  { id: "steaks", title: "Steaks", description: "Prime cuts, dry-aged and fire-grilled to perfection.", icon: "Beef" as const, image: RESTAURANT_IMAGES.steak, to: "/menu?category=steaks" },
  { id: "pasta", title: "Pasta", description: "Hand-rolled pasta with seasonal sauces.", icon: "Wheat" as const, image: RESTAURANT_IMAGES.pasta, to: "/menu?category=pasta" },
  { id: "sushi", title: "Sushi", description: "Omakase-inspired nigiri and sashimi.", icon: "Fish" as const, image: RESTAURANT_IMAGES.sushi, to: "/menu?category=sushi" },
  { id: "vegetarian", title: "Vegetarian", description: "Garden-inspired plates of remarkable depth.", icon: "Leaf" as const, image: RESTAURANT_IMAGES.coffee, to: "/menu?category=vegetarian" },
  { id: "vegan", title: "Vegan", description: "Plant-forward cuisine without compromise.", icon: "Sprout" as const, image: RESTAURANT_IMAGES.gallery8, to: "/menu?category=vegan" },
  { id: "desserts", title: "Desserts", description: "Sweet finales from our pastry kitchen.", icon: "Cake" as const, image: RESTAURANT_IMAGES.dessert, to: "/menu?category=desserts" },
  { id: "cocktails", title: "Cocktails", description: "Artisan cocktails and classic revivals.", icon: "Martini" as const, image: RESTAURANT_IMAGES.cocktail, to: "/menu?category=cocktails" },
  { id: "wines", title: "Wines", description: "Old and new world selections by the glass or bottle.", icon: "Wine" as const, image: RESTAURANT_IMAGES.wine, to: "/menu?category=wines" },
  { id: "champagne", title: "Champagne", description: "Celebratory pours from premier houses.", icon: "Sparkles" as const, image: RESTAURANT_IMAGES.wineCellar, to: "/menu?category=champagne" },
  { id: "coffee", title: "Coffee", description: "Single-origin espresso and after-dinner brews.", icon: "Coffee" as const, image: RESTAURANT_IMAGES.coffee, to: "/menu?category=coffee" },
  { id: "drinks", title: "Drinks", description: "Non-alcoholic pairings and artisan sodas.", icon: "GlassWater" as const, image: RESTAURANT_IMAGES.bar, to: "/menu?category=drinks" },
] as const;

export const MENU_ITEMS = [
  { id: "oysters-half-dozen", categoryId: "starters", name: "Oysters — Half Dozen", description: "East Coast oysters with mignonette and horseradish.", price: 28, priceLabel: "$28", image: RESTAURANT_IMAGES.seafood, allergens: ["shellfish"], badges: ["seasonal"] as const, available: true, hidden: false },
  { id: "burrata-heirloom", categoryId: "starters", name: "Burrata & Heirloom Tomatoes", description: "Creamy burrata, basil oil, aged balsamic, sourdough crostini.", price: 24, priceLabel: "$24", image: RESTAURANT_IMAGES.gallery8, allergens: ["dairy", "gluten"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "tuna-tartare", categoryId: "starters", name: "Yellowfin Tuna Tartare", description: "Avocado, sesame, yuzu, crispy rice.", price: 26, priceLabel: "$26", image: RESTAURANT_IMAGES.sushi, allergens: ["fish", "sesame"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "lobster-bisque", categoryId: "starters", name: "Lobster Bisque", description: "Velvety bisque with cognac cream and chive oil.", price: 22, priceLabel: "$22", image: RESTAURANT_IMAGES.seafood, allergens: ["shellfish", "dairy"], badges: [] as const, available: true, hidden: false },
  { id: "wagyu-carpaccio", categoryId: "starters", name: "Wagyu Carpaccio", description: "Shaved wagyu, truffle aioli, arugula, parmesan.", price: 32, priceLabel: "$32", image: RESTAURANT_IMAGES.steak, allergens: ["dairy", "eggs"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "dry-aged-ribeye", categoryId: "steaks", name: "Dry-Aged Ribeye", description: "45-day dry-aged prime ribeye, bone marrow butter, pommes purée.", price: 78, priceLabel: "$78", image: RESTAURANT_IMAGES.steak, allergens: ["dairy"], badges: ["popular", "chef-recommendation"] as const, available: true, hidden: false },
  { id: "filet-mignon", categoryId: "steaks", name: "Filet Mignon", description: "8oz center-cut filet, red wine reduction, seasonal vegetables.", price: 68, priceLabel: "$68", image: RESTAURANT_IMAGES.steak, allergens: [], badges: ["popular"] as const, available: true, hidden: false },
  { id: "porterhouse-two", categoryId: "steaks", name: "Porterhouse for Two", description: "32oz dry-aged porterhouse, béarnaise, roasted garlic.", price: 145, priceLabel: "$145", image: RESTAURANT_IMAGES.steak, allergens: ["dairy", "eggs"], badges: [] as const, available: true, hidden: false },
  { id: "grilled-branzino", categoryId: "seafood", name: "Grilled Branzino", description: "Whole branzino, lemon caper butter, fennel salad.", price: 48, priceLabel: "$48", image: RESTAURANT_IMAGES.seafood, allergens: ["fish", "dairy"], badges: ["seasonal"] as const, available: true, hidden: false },
  { id: "lobster-thermidor", categoryId: "seafood", name: "Lobster Thermidor", description: "Maine lobster, gruyère, mustard cream, herb crumbs.", price: 72, priceLabel: "$72", image: RESTAURANT_IMAGES.seafood, allergens: ["shellfish", "dairy", "gluten"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "scallops-cauliflower", categoryId: "seafood", name: "Seared Scallops", description: "Day-boat scallops, cauliflower purée, brown butter, sage.", price: 52, priceLabel: "$52", image: RESTAURANT_IMAGES.seafood, allergens: ["shellfish", "dairy"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "truffle-pappardelle", categoryId: "pasta", name: "Truffle Pappardelle", description: "Hand-cut pappardelle, black truffle, parmesan, butter.", price: 42, priceLabel: "$42", image: RESTAURANT_IMAGES.pasta, allergens: ["gluten", "dairy"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "lobster-ravioli", categoryId: "pasta", name: "Lobster Ravioli", description: "House-made ravioli, lobster cream, tarragon, chive.", price: 46, priceLabel: "$46", image: RESTAURANT_IMAGES.pasta, allergens: ["shellfish", "gluten", "dairy", "eggs"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "cacio-e-pepe", categoryId: "pasta", name: "Cacio e Pepe", description: "Tonarelli, pecorino romano, cracked pepper.", price: 32, priceLabel: "$32", image: RESTAURANT_IMAGES.pasta, allergens: ["gluten", "dairy"], badges: [] as const, available: true, hidden: false },
  { id: "omakase-nigiri", categoryId: "sushi", name: "Omakase Nigiri — 8 Pieces", description: "Chef's selection of seasonal nigiri.", price: 58, priceLabel: "$58", image: RESTAURANT_IMAGES.sushi, allergens: ["fish", "soy"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "sashimi-platter", categoryId: "sushi", name: "Chef's Sashimi Platter", description: "12 pieces of premium sashimi with wasabi and pickled ginger.", price: 64, priceLabel: "$64", image: RESTAURANT_IMAGES.sushi, allergens: ["fish", "soy"], badges: ["seasonal"] as const, available: true, hidden: false },
  { id: "mushroom-risotto", categoryId: "vegetarian", name: "Wild Mushroom Risotto", description: "Arborio rice, porcini, truffle oil, aged parmesan.", price: 36, priceLabel: "$36", image: RESTAURANT_IMAGES.pasta, allergens: ["dairy"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "roasted-beet-salad", categoryId: "vegetarian", name: "Roasted Beet Salad", description: "Golden and red beets, goat cheese, candied walnuts, citrus vinaigrette.", price: 22, priceLabel: "$22", image: RESTAURANT_IMAGES.coffee, allergens: ["dairy", "tree nuts"], badges: [] as const, available: true, hidden: false },
  { id: "cauliflower-steak", categoryId: "vegan", name: "Cauliflower Steak", description: "Charred cauliflower, romesco, herb gremolata, microgreens.", price: 28, priceLabel: "$28", image: RESTAURANT_IMAGES.gallery8, allergens: ["tree nuts"], badges: ["seasonal"] as const, available: true, hidden: false },
  { id: "chocolate-souffle", categoryId: "desserts", name: "Dark Chocolate Soufflé", description: "Valrhona chocolate, vanilla bean ice cream — allow 20 minutes.", price: 18, priceLabel: "$18", image: RESTAURANT_IMAGES.dessert, allergens: ["dairy", "eggs", "gluten"], badges: ["popular", "chef-recommendation"] as const, available: true, hidden: false },
  { id: "creme-brulee", categoryId: "desserts", name: "Vanilla Crème Brûlée", description: "Madagascar vanilla custard, caramelized sugar, berries.", price: 14, priceLabel: "$14", image: RESTAURANT_IMAGES.dessert, allergens: ["dairy", "eggs"], badges: [] as const, available: true, hidden: false },
  { id: "tiramisu", categoryId: "desserts", name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone, cocoa.", price: 16, priceLabel: "$16", image: RESTAURANT_IMAGES.dessert, allergens: ["dairy", "eggs", "gluten"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "old-fashioned", categoryId: "cocktails", name: "Nexora Old Fashioned", description: "Barrel-aged bourbon, demerara, angostura, orange peel.", price: 18, priceLabel: "$18", image: RESTAURANT_IMAGES.cocktail, allergens: [], badges: ["popular"] as const, available: true, hidden: false },
  { id: "espresso-martini", categoryId: "cocktails", name: "Espresso Martini", description: "Vodka, fresh espresso, coffee liqueur, vanilla.", price: 17, priceLabel: "$17", image: RESTAURANT_IMAGES.cocktail, allergens: [], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "negroni-sbagliato", categoryId: "cocktails", name: "Negroni Sbagliato", description: "Campari, sweet vermouth, prosecco, orange twist.", price: 16, priceLabel: "$16", image: RESTAURANT_IMAGES.cocktail, allergens: [], badges: [] as const, available: true, hidden: false },
  { id: "chardonnay-glass", categoryId: "wines", name: "Chardonnay — Sonoma Coast", description: "2022, Kistler Vineyards. Notes of citrus, oak, minerality.", price: 22, priceLabel: "$22/glass", image: RESTAURANT_IMAGES.wine, allergens: ["sulfites"], badges: [] as const, available: true, hidden: false },
  { id: "pinot-noir-bottle", categoryId: "wines", name: "Pinot Noir — Willamette Valley", description: "2021, Domaine Serene. Elegant cherry, earth, silky tannins.", price: 95, priceLabel: "$95/bottle", image: RESTAURANT_IMAGES.wineCellar, allergens: ["sulfites"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "cabernet-bottle", categoryId: "wines", name: "Cabernet Sauvignon — Napa Valley", description: "2019, Opus One. Bold, structured, dark fruit.", price: 285, priceLabel: "$285/bottle", image: RESTAURANT_IMAGES.giftHero, allergens: ["sulfites"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "dom-perignon", categoryId: "champagne", name: "Dom Pérignon 2013", description: "Vintage brut champagne. Toasty, complex, celebratory.", price: 395, priceLabel: "$395/bottle", image: RESTAURANT_IMAGES.wineCellar, allergens: ["sulfites"], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "veuve-clicquot", categoryId: "champagne", name: "Veuve Clicquot Yellow Label", description: "Non-vintage brut. Bright, crisp, versatile.", price: 165, priceLabel: "$165/bottle", image: RESTAURANT_IMAGES.bar, allergens: ["sulfites"], badges: ["popular"] as const, available: true, hidden: false },
  { id: "espresso", categoryId: "coffee", name: "Single-Origin Espresso", description: "Ethiopian Yirgacheffe, pulled to order.", price: 6, priceLabel: "$6", image: RESTAURANT_IMAGES.coffee, allergens: [], badges: [] as const, available: true, hidden: false },
  { id: "cappuccino", categoryId: "coffee", name: "Cappuccino", description: "Double shot espresso, steamed milk, cocoa dust.", price: 7, priceLabel: "$7", image: RESTAURANT_IMAGES.gallery8, allergens: ["dairy"], badges: [] as const, available: true, hidden: false },
  { id: "sparkling-water", categoryId: "drinks", name: "San Pellegrino", description: "750ml sparkling mineral water.", price: 9, priceLabel: "$9", image: RESTAURANT_IMAGES.cocktail, allergens: [], badges: [] as const, available: true, hidden: false },
  { id: "house-soda", categoryId: "drinks", name: "House-Made Ginger Soda", description: "Fresh ginger, lime, sparkling water.", price: 8, priceLabel: "$8", image: RESTAURANT_IMAGES.bar, allergens: [], badges: ["seasonal"] as const, available: true, hidden: false },
  { id: "duck-breast", categoryId: "main-courses", name: "Pan-Roasted Duck Breast", description: "Cherry gastrique, roasted root vegetables, potato fondant.", price: 54, priceLabel: "$54", image: RESTAURANT_IMAGES.steak, allergens: [], badges: ["chef-recommendation"] as const, available: true, hidden: false },
  { id: "rack-of-lamb", categoryId: "main-courses", name: "Herb-Crusted Rack of Lamb", description: "Dijon crust, ratatouille, rosemary jus.", price: 58, priceLabel: "$58", image: RESTAURANT_IMAGES.steak, allergens: ["gluten", "dairy"], badges: ["seasonal"] as const, available: true, hidden: false },
  { id: "chicken-ballotine", categoryId: "main-courses", name: "Chicken Ballotine", description: "Truffle-stuffed chicken, morel sauce, spring vegetables.", price: 44, priceLabel: "$44", image: RESTAURANT_IMAGES.kitchen, allergens: ["dairy"], badges: [] as const, available: true, hidden: false },
  { id: "tasting-menu", categoryId: "signature-dishes", name: "Chef's Seven-Course Tasting", description: "A journey through the season's finest ingredients. Wine pairing available.", price: 165, priceLabel: "$165", image: RESTAURANT_IMAGES.chef, allergens: ["varies"], badges: ["popular", "chef-recommendation"] as const, available: true, hidden: false },
];

export const SIGNATURE_DISHES = [
  { id: "sig-wagyu", title: "Dry-Aged Wagyu Ribeye", description: "Our signature 45-day dry-aged ribeye, fire-grilled and finished with bone marrow butter. Served with pommes purée and seasonal vegetables.", image: RESTAURANT_IMAGES.steak, align: "left" as const, priceLabel: "$78" },
  { id: "sig-lobster", title: "Lobster Thermidor", description: "A timeless classic reimagined — Maine lobster in a rich gruyère and mustard cream, gratinated with herb crumbs.", image: RESTAURANT_IMAGES.seafood, align: "right" as const, priceLabel: "$72" },
  { id: "sig-truffle-pasta", title: "Black Truffle Pappardelle", description: "Hand-cut pasta tossed with shaved black truffle, aged parmesan, and cultured butter — simplicity elevated.", image: RESTAURANT_IMAGES.pasta, align: "left" as const, priceLabel: "$42" },
  { id: "sig-souffle", title: "Dark Chocolate Soufflé", description: "Baked to order with Valrhona chocolate, served with vanilla bean ice cream. A theatrical finale to any evening.", image: RESTAURANT_IMAGES.dessert, align: "right" as const, priceLabel: "$18" },
];

export const CHEF = {
  id: "chef-marcus-ellis",
  name: "Marcus Ellis",
  role: "Executive Chef & Owner",
  bio: "Chef Marcus Ellis brings two decades of Michelin-starred experience to Nexora. Trained in Lyon and Tokyo, he crafts menus that honor classical technique while celebrating New York's vibrant culinary landscape.",
  image: RESTAURANT_IMAGES.chef,
  experience: "20+ years",
  awards: ["Two Michelin Stars", "James Beard Award Semifinalist", "Wine Spectator Grand Award"],
  philosophy: "Seasonality is not a trend — it is the foundation of every plate we serve.",
};

export const EXPERIENCE_HIGHLIGHTS = [
  { id: "atmosphere", title: "Elegant Atmosphere", description: "Intimate lighting, live piano, and refined interiors designed for memorable evenings.", icon: "Sparkles" as const, to: "/gallery" },
  { id: "ingredients", title: "Fresh Ingredients", description: "Farm partnerships and daily market selections ensure peak flavor on every plate.", icon: "Leaf" as const, to: "/menu" },
  { id: "chefs", title: "Expert Chefs", description: "A brigade trained in classical and contemporary techniques under Chef Ellis.", icon: "ChefHat" as const, to: "/about" },
  { id: "wine-cellar", title: "Curated Wine Cellar", description: "800+ labels stewarded by our award-winning sommelier team.", icon: "Wine" as const, to: "/menu?category=wines" },
  { id: "private-dining", title: "Private Dining", description: "Exclusive salons for celebrations, corporate dinners, and intimate gatherings.", icon: "Users" as const, to: "/private-events" },
  { id: "seasonal-menus", title: "Seasonal Menus", description: "Menus that evolve with the harvest — never static, always inspired.", icon: "Calendar" as const, to: "/menu" },
  { id: "service", title: "Impeccable Service", description: "Attentive, knowledgeable staff who anticipate every need without intrusion.", icon: "Heart" as const, to: "/reviews" },
  { id: "celebrations", title: "Memorable Celebrations", description: "From anniversaries to proposals — we craft moments that linger.", icon: "Gift" as const, to: "/private-events" },
];

export const PRIVATE_EVENT_TYPES = [
  { id: "corporate", title: "Corporate Dinners", description: "Impress clients and colleagues with tailored menus and private salon service.", image: RESTAURANT_IMAGES.interior, capacity: "Up to 40 guests" },
  { id: "wedding", title: "Wedding Receptions", description: "Celebrate your union with bespoke menus, champagne toasts, and floral styling.", image: RESTAURANT_IMAGES.terrace, capacity: "Up to 80 guests" },
  { id: "birthday", title: "Birthday Celebrations", description: "Custom cakes, curated menus, and dedicated service for milestone birthdays.", image: RESTAURANT_IMAGES.bar, capacity: "Up to 30 guests" },
  { id: "wine-tasting", title: "Wine Tastings", description: "Guided tastings in our cellar with rare vintages and expert pairings.", image: RESTAURANT_IMAGES.wineCellar, capacity: "Up to 16 guests" },
  { id: "chefs-table", title: "Chef's Table", description: "An immersive counter experience with the kitchen brigade — seven courses, front-row seats.", image: RESTAURANT_IMAGES.kitchen, capacity: "8 guests" },
  { id: "holiday", title: "Holiday Parties", description: "Seasonal menus, festive décor, and full-service event coordination.", image: RESTAURANT_IMAGES.eventsHero, capacity: "Up to 60 guests" },
];

export const GALLERY_IMAGES = [
  { id: "gal-1", src: RESTAURANT_IMAGES.hero, alt: "Elegant main dining room", category: "interior" as const },
  { id: "gal-2", src: RESTAURANT_IMAGES.interior, alt: "Intimate booth seating", category: "interior" as const },
  { id: "gal-3", src: RESTAURANT_IMAGES.exterior, alt: "Madison Avenue entrance", category: "exterior" as const },
  { id: "gal-4", src: RESTAURANT_IMAGES.steak, alt: "Dry-aged ribeye", category: "food" as const },
  { id: "gal-5", src: RESTAURANT_IMAGES.sushi, alt: "Omakase nigiri selection", category: "food" as const },
  { id: "gal-6", src: RESTAURANT_IMAGES.cocktail, alt: "Craft cocktails at the bar", category: "drinks" as const },
  { id: "gal-7", src: RESTAURANT_IMAGES.chef, alt: "Chef Marcus Ellis plating", category: "chef" as const },
  { id: "gal-8", src: RESTAURANT_IMAGES.terrace, alt: "Guests on the terrace", category: "terrace" as const },
  { id: "gal-9", src: RESTAURANT_IMAGES.wineCellar, alt: "Wine cellar collection", category: "wine-cellar" as const },
  { id: "gal-10", src: RESTAURANT_IMAGES.dessert, alt: "Chocolate soufflé dessert", category: "food" as const },
  { id: "gal-11", src: RESTAURANT_IMAGES.bar, alt: "Guests enjoying the bar lounge", category: "guests" as const },
  { id: "gal-12", src: RESTAURANT_IMAGES.kitchen, alt: "Private event dinner service", category: "events" as const },
];

export const EVENTS = [
  { id: "wine-tasting-mar", title: "Spring Wine Tasting Evening", description: "Explore Burgundy and Oregon Pinot Noir with our sommelier. Five wines, small bites, cellar tour.", date: "March 15, 2026", time: "7:00 PM", image: RESTAURANT_IMAGES.wineCellar, priceLabel: "$95 per guest" },
  { id: "live-jazz-fridays", title: "Live Jazz Fridays", description: "Every Friday evening — live jazz trio, cocktail specials, and a curated small-plates menu.", date: "Every Friday", time: "8:00 PM – 11:00 PM", image: RESTAURANT_IMAGES.bar, priceLabel: "No cover" },
  { id: "holiday-tasting", title: "Holiday Tasting Menu", description: "A festive seven-course journey featuring winter truffles, game, and classic holiday desserts.", date: "Dec 1 – Dec 31, 2026", time: "Dinner service", image: RESTAURANT_IMAGES.interior, priceLabel: "$185 per guest" },
  { id: "chefs-table-apr", title: "Chef's Table Experience", description: "An intimate counter-side dinner with Chef Ellis. Seven courses, wine pairings, kitchen stories.", date: "April 5, 2026", time: "6:30 PM", image: RESTAURANT_IMAGES.kitchen, priceLabel: "$225 per guest" },
];

export const GIFT_CARD_TIERS = [
  { id: "gc-100", amount: 100, label: "$100", description: "Perfect for cocktails, appetizers, or a sweet finish." },
  { id: "gc-250", amount: 250, label: "$250", description: "Ideal for a dinner for two with wine." },
  { id: "gc-500", amount: 500, label: "$500", description: "A memorable evening with tasting menu and pairings." },
  { id: "gc-1000", amount: 1000, label: "$1,000", description: "The ultimate gift — private dining or chef's table experience." },
];

export const RESERVATION_SETTINGS = {
  maxGuests: 12,
  slotInterval: 30,
  openTime: "17:00",
  closeTime: "22:30",
  closedDays: [1] as number[],
  tablesPerSlot: 4,
  waitlistEnabled: true,
  requireApproval: false,
};

/* ── CMS-compatible exports (luxury-real-estate structure) ── */

export const PROPERTY_CATEGORIES = MENU_CATEGORIES.slice(0, 8).map(c => ({
  id: c.id,
  title: c.title,
  description: c.description,
  icon: c.icon,
  image: c.image,
  to: c.to,
}));

export const NEIGHBORHOODS = [
  { id: "main-dining", name: "Main Dining Room", image: RESTAURANT_IMAGES.interior, propertyCount: 48, avgPrice: "$85–$165", description: "Our flagship dining room with live piano and candlelit tables." },
  { id: "private-salon", name: "Private Salon", image: RESTAURANT_IMAGES.interior, propertyCount: 1, avgPrice: "From $3,500", description: "An enclosed room for up to 20 guests with dedicated service." },
  { id: "chefs-table", name: "Chef's Table", image: RESTAURANT_IMAGES.kitchen, propertyCount: 1, avgPrice: "$225/guest", description: "Eight seats at the kitchen counter with a bespoke tasting menu." },
  { id: "terrace", name: "Garden Terrace", image: RESTAURANT_IMAGES.terrace, propertyCount: 16, avgPrice: "$75–$120", description: "Al fresco dining surrounded by greenery, seasonal April–October." },
  { id: "wine-cellar", name: "Wine Cellar", image: RESTAURANT_IMAGES.wineCellar, propertyCount: 1, avgPrice: "From $95/guest", description: "Intimate tastings among 800+ curated labels." },
  { id: "bar-lounge", name: "Bar Lounge", image: RESTAURANT_IMAGES.bar, propertyCount: 24, avgPrice: "$16–$28", description: "Craft cocktails, small plates, and live jazz on Fridays." },
];

export const NEW_DEVELOPMENTS = EVENTS.map(e => ({
  id: e.id,
  title: e.title,
  location: "Nexora Fine Dining",
  image: e.image,
  status: e.date,
  progress: 100,
  unitsTotal: 0,
  unitsAvailable: 0,
  priceFrom: e.priceLabel,
  completion: e.time,
}));

export const SHOWCASE_ITEMS = [
  { id: "showcase-1", title: SIGNATURE_DISHES[0].title, subtitle: "Signature Dish", description: SIGNATURE_DISHES[0].description, image: SIGNATURE_DISHES[0].image, align: "left" as const },
  { id: "showcase-2", title: SIGNATURE_DISHES[1].title, subtitle: "Signature Dish", description: SIGNATURE_DISHES[1].description, image: SIGNATURE_DISHES[1].image, align: "right" as const },
  { id: "showcase-3", title: "The Nexora Experience", subtitle: "Beyond the plate", description: "From our open kitchen to our award-winning wine cellar, every visit is designed to delight all the senses.", image: RESTAURANT_IMAGES.interior, align: "left" as const },
];

export const SERVICES_RIBBON = MENU_CATEGORIES.slice(0, 5).map(c => ({
  id: c.id,
  label: c.title.toUpperCase(),
  icon: c.icon,
  description: c.description,
  to: c.to,
}));

export const CAPABILITIES = EXPERIENCE_HIGHLIGHTS;

export const PROCESS_STEPS = [
  { id: "reserve", label: "Reserve", description: "Book your table online or call our reservations team." },
  { id: "arrive", label: "Arrive", description: "Check in with our host and enjoy a welcome aperitif at the bar." },
  { id: "dine", label: "Dine", description: "Savor seasonal dishes crafted by Chef Ellis and his brigade." },
  { id: "pair", label: "Pair", description: "Let our sommelier guide you through wine and cocktail pairings." },
  { id: "savor", label: "Savor", description: "Linger over dessert, espresso, and the warmth of exceptional service." },
];

export const HOME_STATS = [
  { value: "2", label: "Michelin Stars", icon: "Award" as const },
  { value: "800+", label: "Wine Labels", icon: "Wine" as const },
  { value: "15+", label: "Years Open", icon: "Calendar" as const },
  { value: "4.9", label: "Guest Rating", icon: "Star" as const },
];

export const WHY_BENEFITS = EXPERIENCE_HIGHLIGHTS.map(h => ({
  title: h.title,
  description: h.description,
  icon: h.icon,
}));

const SERVICE_LIST = MENU_CATEGORIES.map(c => ({
  id: c.id,
  title: c.title,
  icon: c.icon,
  description: c.description,
  image: c.image,
}));

export const SERVICES = [...SERVICE_LIST];

export const LISTINGS = SIGNATURE_DISHES.map((d, i) => ({
  id: d.id,
  title: d.title,
  category: "Signature Dish",
  propertyType: "signature",
  listingType: "buy" as const,
  status: "for-sale" as const,
  featured: true,
  badges: ["featured", "chef-recommendation"] as const,
  serviceId: "signature-dishes",
  location: "Main Dining",
  address: COMPANY.address,
  city: "New York, NY",
  price: parseInt(d.priceLabel.replace(/[^0-9]/g, ""), 10) || 0,
  priceLabel: d.priceLabel,
  bedrooms: 0,
  bathrooms: 0,
  garage: 0,
  sqft: 0,
  year: "2026",
  client: "Nexora Kitchen",
  value: d.priceLabel,
  description: d.description,
  image: d.image,
  gallery: [d.image, RESTAURANT_IMAGES.kitchen, RESTAURANT_IMAGES.interior],
  agentId: CHEF.id,
  amenities: ["Chef's Selection", "Seasonal"],
  features: ["House-made", "Locally sourced"],
  energyRating: "",
  lat: 40.747,
  lng: -73.985,
  number: i + 1,
}));

export const PROJECTS = LISTINGS;

export const SIGNATURE_PROJECT_COUNT = 4;
export const PROJECTS_LATEST_PAGE_SIZE = 6;
export const LISTINGS_PAGE_SIZE = 6;

export const TEAM = [
  {
    id: CHEF.id,
    name: CHEF.name,
    role: CHEF.role,
    bio: CHEF.bio,
    image: CHEF.image,
    languages: ["English", "French"],
    experience: CHEF.experience,
    specialties: ["French Technique", "Seasonal Tasting Menus", "Open-Fire Cooking"],
    social: { linkedin: "#", instagram: "#", email: "chef@nexorafinedining.com" },
  },
  {
    id: "sommelier-elena-rossi",
    name: "Elena Rossi",
    role: "Head Sommelier",
    bio: "Elena curates Nexora's 800-label cellar and leads our wine education program. Certified Advanced Sommelier with a passion for biodynamic producers.",
    image: RESTAURANT_IMAGES.sommelier,
    languages: ["English", "Italian"],
    experience: "14 years",
    specialties: ["Burgundy", "Natural Wine", "Food Pairing"],
    social: { linkedin: "#", instagram: "#", email: "elena@nexorafinedining.com" },
  },
];

export const TESTIMONIALS = [
  { name: "Sarah & James W.", role: "Anniversary Dinner", quote: "The tasting menu was extraordinary — every course a revelation. The sommelier's pairings elevated each dish to something transcendent.", avatar: RESTAURANT_IMAGES.guestA, rating: 5 },
  { name: "Michael T.", role: "Business Dinner", quote: "Impeccable service without being stiff. Our clients were thoroughly impressed — Nexora is now our go-to for entertaining.", avatar: RESTAURANT_IMAGES.guestB, rating: 5 },
  { name: "Priya K.", role: "Chef's Table Guest", quote: "Sitting at the kitchen counter watching Chef Ellis work was the highlight of our trip to New York. Unforgettable.", avatar: RESTAURANT_IMAGES.guestC, rating: 5 },
  { name: "David L.", role: "Regular Guest", quote: "The seasonal menu keeps me coming back. The truffle pappardelle alone is worth the reservation.", avatar: RESTAURANT_IMAGES.avatarG, rating: 5 },
  { name: "Emma & Robert H.", role: "Wedding Reception", quote: "They made our reception flawless — from the custom menu to the terrace setup. Pure magic.", avatar: RESTAURANT_IMAGES.guestB, rating: 5 },
  { name: "Antonio M.", role: "Wine Enthusiast", quote: "One of the finest cellars in Manhattan. The Burgundy tasting evening was world-class.", avatar: RESTAURANT_IMAGES.guestC, rating: 5 },
];

export const BLOG_POSTS = [
  { id: "seasonal-spring-menu", title: "Behind Our Spring Tasting Menu", excerpt: "Chef Ellis shares the inspiration behind this season's seven-course journey.", date: "March 1, 2026", author: CHEF.name, category: "Chef's Kitchen", image: RESTAURANT_IMAGES.kitchen, content: "Spring brings ramps, morels, and the first peas — ingredients that define our March menu.", readTime: "5 min" },
  { id: "wine-pairing-guide", title: "The Art of Wine Pairing", excerpt: "Sommelier Elena Rossi on matching wine to complex flavors.", date: "February 14, 2026", author: "Elena Rossi", category: "Wine & Spirits", image: RESTAURANT_IMAGES.wine, content: "Balance acidity, weight, and flavor intensity for pairings that sing.", readTime: "6 min" },
  { id: "dry-aging-explained", title: "Why We Dry-Age for 45 Days", excerpt: "The science and craft behind our signature ribeye.", date: "January 20, 2026", author: CHEF.name, category: "Ingredients", image: RESTAURANT_IMAGES.steak, content: "Dry-aging concentrates flavor and tenderizes — patience is the secret ingredient.", readTime: "4 min" },
  { id: "private-events-guide", title: "Planning Your Private Event", excerpt: "Everything you need to know about hosting at Nexora.", date: "December 5, 2025", author: "Events Team", category: "Events", image: RESTAURANT_IMAGES.interior, content: "From salon dinners to full buyouts — our events team handles every detail.", readTime: "7 min" },
  { id: "sustainable-sourcing", title: "Our Commitment to Sustainable Sourcing", excerpt: "Farm partnerships and ocean-friendly seafood choices.", date: "November 18, 2025", author: CHEF.name, category: "Sustainability", image: RESTAURANT_IMAGES.seafood, content: "We work directly with Hudson Valley farms and MSC-certified fisheries.", readTime: "5 min" },
  { id: "cocktail-culture", title: "Cocktail Culture at Nexora", excerpt: "Meet our head bartender and explore signature creations.", date: "October 30, 2025", author: "Bar Team", category: "Cocktails", image: RESTAURANT_IMAGES.cocktail, content: "Classic techniques, house-made bitters, and seasonal ingredients define our bar program.", readTime: "4 min" },
];

export const STATS = [
  { value: 480, label: "Guest Reviews", suffix: "+" },
  { value: 800, label: "Wine Labels", suffix: "+" },
  { value: 2, label: "Michelin Stars", suffix: "" },
  { value: 15, label: "Years of Excellence", suffix: "+" },
];

export const FAQ_ITEMS = [
  { question: "How do I make a reservation?", answer: "Reserve online through our reservations page, call (212) 555-0147, or email reservations@nexorafinedining.com. We recommend booking at least one week in advance for weekends." },
  { question: "What is the dress code?", answer: "Smart casual to formal attire. We ask that guests avoid athletic wear, flip-flops, and baseball caps." },
  { question: "Do you accommodate dietary restrictions?", answer: "Absolutely. Please note allergies and dietary preferences when booking. Our kitchen can prepare vegetarian, vegan, and gluten-free options." },
  { question: "Is there a corkage fee?", answer: "Yes — $75 per 750ml bottle, limited to two bottles per table. We waive corkage for wines not on our list." },
  { question: "Can I host a private event?", answer: "We offer private salons, full buyouts, and chef's table experiences. Contact our events team for custom menus and pricing." },
  { question: "Do you offer gift cards?", answer: "Digital and physical gift cards are available in denominations from $100 to $1,000 through our gift cards page." },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Private Events", path: "/private-events" },
  { label: "Reservations", path: "/reservations" },
  { label: "Gift Cards", path: "/gift-cards" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_SERVICE_LINKS: { label: string; to: string }[] = MENU_CATEGORIES.slice(0, 5).map(c => ({
  label: c.title,
  to: c.to,
}));

export const FOOTER_COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Private Events", to: "/private-events" },
  { label: "Reservations", to: "/reservations" },
  { label: "Gift Cards", to: "/gift-cards" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Reserve a Table", to: "/reservations" },
  { label: "View Menu", to: "/menu" },
  { label: "Gift Cards", to: "/gift-cards" },
  { label: "Private Events", to: "/private-events" },
];

export const SERVICE_AREAS = NEIGHBORHOODS.map(n => n.name);

export const PROJECTS_PAGE_STATS = [
  { value: "4", label: "Signature Dishes" },
  { value: "36+", label: "Menu Items" },
  { value: "800+", label: "Wine Labels" },
  { value: "4.9", label: "Guest Rating" },
];

export const ABOUT_STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "2", label: "Michelin Stars" },
  { value: "800+", label: "Wine Labels" },
  { value: "4.9", label: "Guest Rating" },
  { value: "6", label: "Private Spaces" },
];

export const CORE_VALUES = WHY_BENEFITS.slice(0, 6).map((b, i) => ({
  id: `v${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

export const CERTIFICATIONS = [
  { id: "michelin", label: "Michelin Recommended", sub: "Two-star recognition" },
  { id: "wine-spectator", label: "Wine Spectator Grand Award", sub: "Exceptional wine program" },
  { id: "sustainable", label: "Sustainable Seafood", sub: "MSC-certified sourcing" },
  { id: "reviews", label: "4.9 Guest Rating", sub: "480+ verified reviews" },
  { id: "james-beard", label: "James Beard Semifinalist", sub: "Chef Marcus Ellis" },
];

export const PROCESS_STEPS_ABOUT = PROCESS_STEPS.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));

export const FAQ_TABS = [
  { id: "general", label: "GENERAL" },
  { id: "reservations", label: "RESERVATIONS" },
  { id: "menu", label: "MENU" },
  { id: "events", label: "EVENTS" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_BY_CATEGORY: Record<FaqTabId, { question: string; answer: string }[]> = {
  general: FAQ_ITEMS.slice(0, 3).map(({ question, answer }) => ({ question, answer })),
  reservations: [
    { question: "How far in advance should I book?", answer: "We recommend one week for weeknights and two to three weeks for weekends. Holiday periods fill quickly." },
    { question: "What is your cancellation policy?", answer: "Cancellations within 24 hours may incur a $50 per person fee. No-shows are charged the full tasting menu price." },
    { question: "Can I request a specific table?", answer: "Yes — note your preference when booking. We'll do our best to accommodate window, terrace, or bar seating." },
  ],
  menu: [
    { question: "Do you offer a tasting menu?", answer: "Yes — our seven-course Chef's Tasting Menu is $165, with optional wine pairing for $95." },
    { question: "Are vegetarian options available?", answer: "We offer dedicated vegetarian and vegan menus with advance notice. Several à la carte options are always available." },
    { question: "What are your most popular dishes?", answer: "The dry-aged ribeye, lobster thermidor, truffle pappardelle, and chocolate soufflé are guest favorites." },
  ],
  events: [
    { question: "What private event spaces are available?", answer: "Private salon (20 guests), wine cellar (16 guests), chef's table (8 guests), terrace (seasonal), and full buyouts." },
    { question: "Can you customize menus for events?", answer: "Our events team creates bespoke menus for every occasion — from corporate dinners to wedding receptions." },
    { question: "Is there a minimum spend for private events?", answer: "Private salon events start at $3,500. Contact us for a custom quote based on your guest count and menu." },
  ],
};

export const SERVICES_PAGE_INTRO =
  "Explore our seasonal menu — from delicate starters and fire-grilled steaks to artisan cocktails and curated wines from our award-winning cellar.";

export const COMMERCIAL_FITOUT_CARDS = WHY_BENEFITS.slice(0, 4).map((b, i) => ({
  id: `why-${i}`,
  title: b.title,
  description: b.description,
  icon: b.icon,
}));

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
  category: "FINE DINING",
  title: s.title,
  subtitle: s.description,
  body: [s.description, `Our ${s.title.toLowerCase()} selection showcases the finest seasonal ingredients, prepared with classical technique and contemporary flair.`] as [string, string],
  image: s.image,
  inclusions: ["Seasonal ingredients", "Chef-crafted preparation", "Wine pairing suggestions", "Dietary accommodations", "Impeccable presentation"],
}));

export const LEAD_FORM = {
  title: "Reserve Your Table",
  description: "Tell us your preferred date, time, and party size — our reservations team will confirm within the hour.",
  subtitle: "Tell us your preferred date, time, and party size — our reservations team will confirm within the hour.",
  submitLabel: "Request Reservation",
  successMessage: "Thank you. Our reservations team will confirm your booking shortly.",
  bullets: [
    "Priority seating for special occasions",
    "Custom menus for dietary needs",
    "Private dining and event coordination",
    "Wine pairing recommendations",
  ],
};

export const BLOG_TAGS = ["Chef's Kitchen", "Wine & Spirits", "Ingredients", "Events", "Sustainability", "Cocktails"];

export const BLOG_LIST_PAGE_SIZE = 6;

export function getBlogCategoryCounts(): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of BLOG_POSTS) m.set(p.category, (m.get(p.category) || 0) + 1);
  return [...m.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label));
}

export const META_DEFAULT =
  "Nexora Fine Dining — an extraordinary dining experience in Manhattan. Seasonal tasting menus, award-winning wine cellar, and impeccable service.";

export const CTA_SECTION = {
  headline: "Reserve Your Table Tonight",
  primaryCta: { label: "Make a Reservation", to: "/reservations" },
  secondaryCta: { label: "View the Menu", to: "/menu" },
};

export const ABOUT_TIMELINE = [
  { year: "2010", title: "Nexora Opens", description: "Chef Marcus Ellis opens Nexora on Madison Avenue with a 40-seat dining room." },
  { year: "2014", title: "First Michelin Star", description: "Recognized for exceptional cuisine and service in the MICHELIN Guide." },
  { year: "2018", title: "Wine Spectator Grand Award", description: "Our cellar earns the prestigious Grand Award for its 500+ label collection." },
  { year: "2022", title: "Second Michelin Star", description: "Elevated to two-star status — a rare achievement for independent restaurants." },
  { year: "2025", title: "Terrace & Chef's Table", description: "Garden terrace and eight-seat chef's table debut, expanding the Nexora experience." },
];

export const AWARDS = [
  { year: "2025", title: "Two Michelin Stars", org: "MICHELIN Guide" },
  { year: "2024", title: "Wine Spectator Grand Award", org: "Wine Spectator" },
  { year: "2023", title: "James Beard Semifinalist", org: "James Beard Foundation" },
];

export const ABOUT_HERO_BADGES = [
  { label: "2 Michelin Stars", icon: "Award" as const },
  { label: "Grand Award Cellar", icon: "Wine" as const },
  { label: "15+ Years", icon: "Calendar" as const },
  { label: "4.9 Rating", icon: "ShieldCheck" as const },
];

export const LEAD_MAGNET = {
  title: "Seasonal Tasting Menu",
  subtitle: "Seven courses celebrating the best of the season — reserve your experience today.",
  cta: { label: "RESERVE NOW", to: "/reservations" },
  image: RESTAURANT_IMAGES.wineCellar,
};

export const SERVICE_AREA_COUNTIES = NEIGHBORHOODS.map(n => ({
  county: n.name,
  towns: [n.description],
}));

export const CONTACT_TRUST_STRIP = [
  { id: "licensed", title: "Licensed & Inspected", description: "NYC DOHMH certified.", icon: "ShieldCheck" as const },
  { id: "michelin", title: "Michelin Recognized", description: "Two-star excellence.", icon: "Award" as const },
  { id: "wine", title: "Grand Award Cellar", description: "800+ curated labels.", icon: "Wine" as const },
  { id: "service", title: "Impeccable Service", description: "White-glove hospitality.", icon: "Heart" as const },
];

export const FINANCING_CONTENT = {
  eyebrow: "GIFT CARDS",
  title: "Give the Gift of Nexora",
  subtitle: "Digital and physical gift cards for every occasion.",
  body: "From intimate dinners to grand celebrations — a Nexora gift card is the perfect way to share an extraordinary dining experience.",
  image: RESTAURANT_IMAGES.giftHero,
  benefits: ["Instant digital delivery", "Custom denominations", "No expiration date", "Redeemable for dining and events"],
  cta: { label: "PURCHASE GIFT CARD", to: "/gift-cards" },
};

export const SERVICE_CATEGORY_TABS = MENU_CATEGORIES.slice(0, 4).map(c => ({
  id: c.id,
  label: c.title,
  to: c.to,
}));

export const STORM_CHECKLIST = PROCESS_STEPS.map(s => ({
  id: s.id,
  title: s.label,
  description: s.description,
}));

export const INSPECTION_BENEFITS = WHY_BENEFITS.slice(0, 4);

export const INSPECTION_TYPES = SERVICES.slice(0, 4).map(s => ({
  id: s.id,
  title: s.title,
  description: s.description,
  image: s.image,
}));

export const INSPECTION_CHECKLIST = [
  "Seasonal menu review",
  "Wine pairing consultation",
  "Dietary accommodation",
  "Private event planning",
  "Reservation confirmation",
  "Special occasion coordination",
];

export const HERO_PROMO_BANNERS = [
  {
    id: "tasting",
    title: LEAD_MAGNET.title,
    subtitle: LEAD_MAGNET.subtitle,
    cta: LEAD_MAGNET.cta,
    image: LEAD_MAGNET.image,
  },
  {
    id: "events",
    title: "Private Events & Celebrations",
    subtitle: "Salons, terrace dinners, and full buyouts tailored to your occasion.",
    cta: { label: "PLAN YOUR EVENT", to: "/private-events" },
    image: RESTAURANT_IMAGES.eventsHero,
  },
];
