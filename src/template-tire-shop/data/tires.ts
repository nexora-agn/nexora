/**
 * Demo tire catalog — maps to SiteContent `projects` for CMS compatibility.
 * Field mapping (tire → PhoneProduct slots):
 *   storage → size (e.g. "225/45R17")
 *   trim → season
 *   fuelType → speed rating
 *   transmission → load index
 *   drivetrain → wet grip
 *   engine → dry grip
 *   mileage → treadwear / warranty miles
 *   vin → SKU
 *   colors → performance rating labels
 */

const u = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export type ProductCondition = "new" | "refurbished" | "used";

export type TireCategory =
  | "all-season"
  | "winter"
  | "summer"
  | "performance"
  | "all-terrain"
  | "mud-terrain"
  | "run-flat"
  | "ev"
  | "truck"
  | "commercial";

export type TireProduct = {
  id: string;
  title: string;
  category: TireCategory;
  propertyType: string;
  listingType: ProductCondition;
  status: "available" | "sold" | "pending" | "reserved";
  featured?: boolean;
  badges?: ("featured" | "new" | "bestseller" | "sale")[];
  brand: string;
  model: string;
  year: string;
  trim: string;
  storage: string;
  ram: string;
  color: string;
  colors: string[];
  screen: string;
  camera: string;
  battery: string;
  processor: string;
  os: string;
  connectivity: string;
  waterResistance: string;
  rating: number;
  reviewCount: number;
  mileage: number;
  vin: string;
  stockNumber: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  interiorColor: string;
  engine: string;
  serviceId: string;
  location: string;
  address: string;
  city: string;
  price: number;
  msrp: number;
  priceLabel: string;
  monthlyEstimate: number;
  client: string;
  value: string;
  description: string;
  image: string;
  gallery: string[];
  agentId: string;
  amenities: string[];
  features: string[];
  options: string[];
  videoUrl: string;
  virtualTourUrl: string;
  warranty: string;
  number: number;
  lat: number;
  lng: number;
};

const img = {
  t1: u("1558618666-fcd25c85cd64", 1200, 1200),
  t2: u("1605559424843-9e4c228bf1c2", 1200, 1200),
  t3: u("1492144534655-ae79c964c9d7", 1200, 1200),
  t4: u("1606664515524-ed2f786a0bd6", 1200, 1200),
  t5: u("1617814076367-b759c7d7e738", 1200, 1200),
  t6: u("1486496572940-2bb2341fdbdf", 1200, 1200),
  t7: u("1517524008697-84bbe3c3fd98", 1200, 1200),
  t8: u("1549924231-f129b911e442", 1200, 1200),
  t9: u("1563720223185-11003d516935", 1200, 1200),
  t10: u("1617469767053-d3b523a0b982", 1200, 1200),
  t11: u("1503376780353-7e6692767b70", 1200, 1200),
  t12: u("1583121274602-3e2820c69888", 1200, 1200),
  shop: u("1494976388531-d1058494cdd8", 1400, 900),
  install: u("1574023240744-64c47c8c0676", 1400, 900),
};

function tire(
  p: Omit<
    TireProduct,
    "title" | "value" | "priceLabel" | "client" | "exteriorColor" | "interiorColor" | "ram" | "screen" | "camera" | "battery" | "processor" | "os" | "connectivity" | "waterResistance"
  > & {
    title?: string;
    wetGrip: string;
    dryGrip: string;
    speedRating: string;
    loadIndex: string;
    size: string;
    season: string;
    sku: string;
    treadwear: number;
  },
): TireProduct {
  const title = p.title ?? `${p.brand} ${p.model} ${p.size}`;
  return {
    ...p,
    title,
    storage: p.size,
    trim: p.season,
    year: p.year || "2025",
    mileage: p.treadwear,
    vin: p.sku,
    fuelType: p.speedRating,
    transmission: p.loadIndex,
    drivetrain: p.wetGrip,
    engine: p.dryGrip,
    exteriorColor: p.color,
    interiorColor: p.color,
    ram: p.loadIndex,
    screen: p.size,
    camera: p.wetGrip,
    battery: `${p.treadwear.toLocaleString()} mi`,
    processor: p.dryGrip,
    os: p.season,
    connectivity: p.speedRating,
    waterResistance: p.wetGrip,
    client: p.brand,
    value: `$${p.price.toLocaleString()}`,
    priceLabel: `$${p.price.toLocaleString()}`,
  };
}

export const DEMO_TIRES: TireProduct[] = [
  tire({
    id: "michelin-pilot-sport-4s-225",
    brand: "Michelin",
    model: "Pilot Sport 4S",
    size: "225/45R17",
    season: "Summer",
    wetGrip: "A",
    dryGrip: "A+",
    speedRating: "Y",
    loadIndex: "94",
    sku: "NT-PS4S-22545R17",
    treadwear: 30000,
    color: "Black",
    colors: ["Dry A+", "Wet A", "Noise B", "Fuel C"],
    category: "performance",
    propertyType: "performance",
    listingType: "new",
    status: "available",
    featured: true,
    badges: ["featured", "bestseller"],
    rating: 4.9,
    reviewCount: 1284,
    stockNumber: "NT-001",
    serviceId: "installation",
    location: "Congress Ave",
    address: "900 Congress Ave",
    city: "Austin, TX",
    price: 289,
    msrp: 319,
    monthlyEstimate: 24,
    description:
      "Ultra-high-performance summer tire with asymmetric tread for razor-sharp dry response and class-leading wet grip. Ideal for sport sedans and track-day weekends.",
    image: img.t1,
    gallery: [img.t1, img.t3, img.shop],
    agentId: "alex-martinez",
    amenities: ["Install available", "Road-hazard eligible", "TPMS compatible"],
    features: ["Asymmetric tread", "Variable Contact Patch", "Silica compound"],
    options: ["Set of 4", "Mount & balance", "Road hazard"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "30,000-mile treadwear warranty",
    number: 1,
    lat: 30.27,
    lng: -97.74,
    year: "2025",
  }),
  tire({
    id: "continental-procontact-tx-215",
    brand: "Continental",
    model: "ProContact TX",
    size: "215/55R17",
    season: "All-Season",
    wetGrip: "A",
    dryGrip: "A",
    speedRating: "V",
    loadIndex: "94",
    sku: "NT-PCTX-21555R17",
    treadwear: 70000,
    color: "Black",
    colors: ["Dry A", "Wet A", "Noise A", "Fuel B"],
    category: "all-season",
    propertyType: "all-season",
    listingType: "new",
    status: "available",
    featured: true,
    badges: ["featured", "bestseller"],
    rating: 4.8,
    reviewCount: 962,
    stockNumber: "NT-002",
    serviceId: "installation",
    location: "The Domain",
    address: "11410 Century Oaks Ter",
    city: "Austin, TX",
    price: 168,
    msrp: 189,
    monthlyEstimate: 14,
    description:
      "Everyday all-season comfort with confident wet braking and quiet ride. A go-to fitment for Austin commuters and family crossovers.",
    image: img.t2,
    gallery: [img.t2, img.t4],
    agentId: "priya-shah",
    amenities: ["Install available", "Rotation package", "TPMS reset"],
    features: ["EcoPlus+ compound", "Noise-reducing tread", "All-season siping"],
    options: ["Set of 4", "Mount & balance"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "70,000-mile treadwear warranty",
    number: 2,
    lat: 30.4,
    lng: -97.72,
    year: "2025",
  }),
  tire({
    id: "bridgestone-blizzak-ws90-205",
    brand: "Bridgestone",
    model: "Blizzak WS90",
    size: "205/55R16",
    season: "Winter",
    wetGrip: "A",
    dryGrip: "B",
    speedRating: "H",
    loadIndex: "91",
    sku: "NT-BZ90-20555R16",
    treadwear: 40000,
    color: "Black",
    colors: ["Snow A+", "Ice A", "Wet A", "Noise B"],
    category: "winter",
    propertyType: "winter",
    listingType: "new",
    status: "available",
    featured: true,
    badges: ["featured", "new"],
    rating: 4.9,
    reviewCount: 741,
    stockNumber: "NT-003",
    serviceId: "storage",
    location: "South Lamar",
    address: "2300 S Lamar Blvd",
    city: "Austin, TX",
    price: 156,
    msrp: 175,
    monthlyEstimate: 13,
    description:
      "Studless winter tire engineered for ice and packed snow. Multicell compound bites into cold pavement when temperatures drop.",
    image: img.t5,
    gallery: [img.t5, img.t6],
    agentId: "marcus-williams",
    amenities: ["Seasonal storage", "Install available", "Studless"],
    features: ["Multicell compound", "3PMSF rated", "Zigzag sipes"],
    options: ["Set of 4", "Storage swap"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "4-year limited warranty",
    number: 3,
    lat: 30.25,
    lng: -97.77,
    year: "2025",
  }),
  tire({
    id: "goodyear-wrangler-at-265",
    brand: "Goodyear",
    model: "Wrangler All-Terrain Adventure",
    size: "265/70R17",
    season: "All-Terrain",
    wetGrip: "B",
    dryGrip: "A",
    speedRating: "T",
    loadIndex: "115",
    sku: "NT-WATA-26570R17",
    treadwear: 60000,
    color: "Black",
    colors: ["Off-Road A", "On-Road B", "Wet B", "Noise C"],
    category: "all-terrain",
    propertyType: "all-terrain",
    listingType: "new",
    status: "available",
    featured: true,
    badges: ["featured"],
    rating: 4.7,
    reviewCount: 588,
    stockNumber: "NT-004",
    serviceId: "installation",
    location: "Round Rock",
    address: "1100 E Palm Valley Blvd",
    city: "Round Rock, TX",
    price: 242,
    msrp: 269,
    monthlyEstimate: 20,
    description:
      "Rugged all-terrain rubber for trucks and SUVs — gravel roads, light mud, and highway miles without giving up weekday manners.",
    image: img.t7,
    gallery: [img.t7, img.t8],
    agentId: "sophia-chen",
    amenities: ["LT load ready", "Install available", "Alignment check"],
    features: ["Kevlar-reinforced", "Rim protector", "Aggressive shoulder blocks"],
    options: ["Set of 4", "Mount & balance", "Alignment"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "60,000-mile treadwear warranty",
    number: 4,
    lat: 30.51,
    lng: -97.68,
    year: "2025",
  }),
  tire({
    id: "pirelli-pzero-245",
    brand: "Pirelli",
    model: "P Zero",
    size: "245/40R18",
    season: "Summer",
    wetGrip: "A",
    dryGrip: "A+",
    speedRating: "Y",
    loadIndex: "97",
    sku: "NT-PZ-24540R18",
    treadwear: 28000,
    color: "Black",
    colors: ["Dry A+", "Wet A", "Noise B", "Fuel C"],
    category: "performance",
    propertyType: "performance",
    listingType: "new",
    status: "available",
    badges: ["new"],
    rating: 4.8,
    reviewCount: 433,
    stockNumber: "NT-005",
    serviceId: "installation",
    location: "Congress Ave",
    address: "900 Congress Ave",
    city: "Austin, TX",
    price: 312,
    msrp: 349,
    monthlyEstimate: 26,
    description:
      "OEM-fitment performance summer tire tuned for precision steering and high-speed stability on European and domestic sport cars.",
    image: img.t3,
    gallery: [img.t3, img.t1],
    agentId: "alex-martinez",
    amenities: ["Install available", "Road-hazard eligible"],
    features: ["F1-derived compound", "Outer shoulder blocks", "Aqua channels"],
    options: ["Set of 4", "Mount & balance"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "Limited manufacturer warranty",
    number: 5,
    lat: 30.27,
    lng: -97.74,
    year: "2025",
  }),
  tire({
    id: "michelin-crossclimate2-235",
    brand: "Michelin",
    model: "CrossClimate 2",
    size: "235/45R18",
    season: "All-Season",
    wetGrip: "A",
    dryGrip: "A",
    speedRating: "W",
    loadIndex: "98",
    sku: "NT-CC2-23545R18",
    treadwear: 60000,
    color: "Black",
    colors: ["Snow A", "Wet A", "Dry A", "Noise B"],
    category: "all-season",
    propertyType: "all-season",
    listingType: "new",
    status: "available",
    featured: true,
    badges: ["featured", "bestseller"],
    rating: 4.9,
    reviewCount: 1102,
    stockNumber: "NT-006",
    serviceId: "installation",
    location: "The Domain",
    address: "11410 Century Oaks Ter",
    city: "Austin, TX",
    price: 224,
    msrp: 249,
    monthlyEstimate: 19,
    description:
      "V-shaped all-weather tire with 3PMSF winter certification — one set for Texas heat and rare ice events.",
    image: img.t4,
    gallery: [img.t4, img.t2],
    agentId: "priya-shah",
    amenities: ["3PMSF", "Install available", "TPMS compatible"],
    features: ["V-shaped tread", "Thermal adaptive compound", "EverGrip"],
    options: ["Set of 4", "Mount & balance"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "60,000-mile treadwear warranty",
    number: 6,
    lat: 30.4,
    lng: -97.72,
    year: "2025",
  }),
  tire({
    id: "bfgoodrich-km3-285",
    brand: "BFGoodrich",
    model: "Mud-Terrain T/A KM3",
    size: "285/70R17",
    season: "Mud-Terrain",
    wetGrip: "C",
    dryGrip: "B",
    speedRating: "Q",
    loadIndex: "121",
    sku: "NT-KM3-28570R17",
    treadwear: 40000,
    color: "Black",
    colors: ["Mud A+", "Rock A", "On-Road C", "Noise D"],
    category: "mud-terrain",
    propertyType: "mud-terrain",
    listingType: "new",
    status: "available",
    badges: ["new"],
    rating: 4.6,
    reviewCount: 312,
    stockNumber: "NT-007",
    serviceId: "installation",
    location: "Round Rock",
    address: "1100 E Palm Valley Blvd",
    city: "Round Rock, TX",
    price: 298,
    msrp: 329,
    monthlyEstimate: 25,
    description:
      "Max-traction mud-terrain with CoreGard technology. Built for rock gardens, clay pits, and trail-rigged trucks.",
    image: img.t9,
    gallery: [img.t9, img.t7],
    agentId: "marcus-williams",
    amenities: ["LT/E load", "Install available", "Alignment"],
    features: ["CoreGard sidewalls", "Mud-Phobic bars", "Linear siping"],
    options: ["Set of 4", "Mount & balance", "Alignment"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "6-year limited warranty",
    number: 7,
    lat: 30.51,
    lng: -97.68,
    year: "2025",
  }),
  tire({
    id: "hankook-ion-evo-as-225",
    brand: "Hankook",
    model: "iON evo AS",
    size: "225/55R19",
    season: "All-Season",
    wetGrip: "A",
    dryGrip: "A",
    speedRating: "V",
    loadIndex: "99",
    sku: "NT-ION-22555R19",
    treadwear: 65000,
    color: "Black",
    colors: ["EV A+", "Noise A", "Wet A", "Fuel A"],
    category: "ev",
    propertyType: "ev",
    listingType: "new",
    status: "available",
    featured: true,
    badges: ["featured", "new"],
    rating: 4.8,
    reviewCount: 267,
    stockNumber: "NT-008",
    serviceId: "installation",
    location: "Congress Ave",
    address: "900 Congress Ave",
    city: "Austin, TX",
    price: 268,
    msrp: 295,
    monthlyEstimate: 22,
    description:
      "EV-optimized all-season with low rolling resistance, high load capacity, and quiet cabin acoustics for electric crossovers and sedans.",
    image: img.t10,
    gallery: [img.t10, img.t11],
    agentId: "sophia-chen",
    amenities: ["EV load rated", "Install available", "Noise optimized"],
    features: ["ProGrip EV compound", "Sound Absorber", "OptiCure"],
    options: ["Set of 4", "Mount & balance"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "65,000-mile treadwear warranty",
    number: 8,
    lat: 30.27,
    lng: -97.74,
    year: "2025",
  }),
  tire({
    id: "runflat-conti-cssr-225",
    brand: "Continental",
    model: "ContiSportContact 5 SSR",
    size: "225/45R18",
    season: "Summer",
    wetGrip: "A",
    dryGrip: "A",
    speedRating: "Y",
    loadIndex: "91",
    sku: "NT-CSSR-22545R18",
    treadwear: 35000,
    color: "Black",
    colors: ["Run-Flat", "Dry A", "Wet A", "Noise B"],
    category: "run-flat",
    propertyType: "run-flat",
    listingType: "new",
    status: "available",
    badges: ["sale"],
    rating: 4.5,
    reviewCount: 198,
    stockNumber: "NT-009",
    serviceId: "roadside",
    location: "South Lamar",
    address: "2300 S Lamar Blvd",
    city: "Austin, TX",
    price: 254,
    msrp: 289,
    monthlyEstimate: 21,
    description:
      "Self-Supporting Runflat technology lets you drive up to 50 miles after a puncture — no spare required on many BMW and Mercedes fitments.",
    image: img.t6,
    gallery: [img.t6, img.t2],
    agentId: "priya-shah",
    amenities: ["SSR run-flat", "Install available", "TPMS required"],
    features: ["SSR sidewall", "Sport contact compound", "Short braking"],
    options: ["Set of 4", "Mount & balance"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "Limited manufacturer warranty",
    number: 9,
    lat: 30.25,
    lng: -97.77,
    year: "2025",
  }),
  tire({
    id: "cooper-discoverer-ht3-245",
    brand: "Cooper",
    model: "Discoverer HT3",
    size: "245/75R16",
    season: "All-Season",
    wetGrip: "B",
    dryGrip: "A",
    speedRating: "R",
    loadIndex: "120",
    sku: "NT-HT3-24575R16",
    treadwear: 60000,
    color: "Black",
    colors: ["Highway A", "Load A", "Wet B", "Noise B"],
    category: "truck",
    propertyType: "truck",
    listingType: "new",
    status: "available",
    badges: ["bestseller"],
    rating: 4.6,
    reviewCount: 445,
    stockNumber: "NT-010",
    serviceId: "installation",
    location: "Round Rock",
    address: "1100 E Palm Valley Blvd",
    city: "Round Rock, TX",
    price: 198,
    msrp: 219,
    monthlyEstimate: 16,
    description:
      "Highway-terrain truck tire for work vans, pickups, and light commercial fleets. Even wear and strong wet traction under load.",
    image: img.t8,
    gallery: [img.t8, img.t12],
    agentId: "marcus-williams",
    amenities: ["Fleet pricing", "Install available", "Alignment"],
    features: ["Even Wear Armour", "Wide circumferential grooves", "Sturdy carcass"],
    options: ["Set of 4", "Fleet install"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "60,000-mile treadwear warranty",
    number: 10,
    lat: 30.51,
    lng: -97.68,
    year: "2025",
  }),
  tire({
    id: "michelin-x-multi-d-215",
    brand: "Michelin",
    model: "X Multi D",
    size: "215/75R17.5",
    season: "Commercial",
    wetGrip: "B",
    dryGrip: "A",
    speedRating: "L",
    loadIndex: "126",
    sku: "NT-XMD-21575R175",
    treadwear: 120000,
    color: "Black",
    colors: ["Fleet A", "Mileage A+", "Wet B", "Fuel B"],
    category: "commercial",
    propertyType: "commercial",
    listingType: "new",
    status: "available",
    badges: [],
    rating: 4.7,
    reviewCount: 156,
    stockNumber: "NT-011",
    serviceId: "installation",
    location: "Congress Ave",
    address: "900 Congress Ave",
    city: "Austin, TX",
    price: 349,
    msrp: 389,
    monthlyEstimate: 0,
    description:
      "Commercial drive-axle tire for box trucks and regional fleets. Long casing life and retreadable construction for lower cost-per-mile.",
    image: img.t12,
    gallery: [img.t12, img.install],
    agentId: "sophia-chen",
    amenities: ["Fleet account", "On-site install", "Retreadable"],
    features: ["Durable casing", "Even wear", "Regroovable"],
    options: ["Fleet contract", "Mobile install"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "Casing warranty · retread eligible",
    number: 11,
    lat: 30.27,
    lng: -97.74,
    year: "2025",
  }),
  tire({
    id: "falken-azenegis-fk520-255",
    brand: "Falken",
    model: "Azenis FK520",
    size: "255/35R19",
    season: "Summer",
    wetGrip: "A",
    dryGrip: "A",
    speedRating: "Y",
    loadIndex: "96",
    sku: "NT-FK520-25535R19",
    treadwear: 30000,
    color: "Black",
    colors: ["Dry A", "Wet A", "Noise B", "Fuel C"],
    category: "summer",
    propertyType: "summer",
    listingType: "new",
    status: "available",
    badges: ["sale"],
    rating: 4.7,
    reviewCount: 389,
    stockNumber: "NT-012",
    serviceId: "installation",
    location: "The Domain",
    address: "11410 Century Oaks Ter",
    city: "Austin, TX",
    price: 219,
    msrp: 259,
    monthlyEstimate: 18,
    description:
      "Ultra-high-performance summer tire with Adaptive Constant Pressure pattern for balanced wet and dry grip at an accessible price.",
    image: img.t11,
    gallery: [img.t11, img.t1],
    agentId: "alex-martinez",
    amenities: ["Install available", "Road-hazard eligible"],
    features: ["ACP tread design", "4D Nano Design", "Hybrid undertread"],
    options: ["Set of 4", "Mount & balance"],
    videoUrl: "",
    virtualTourUrl: "",
    warranty: "Limited manufacturer warranty",
    number: 12,
    lat: 30.4,
    lng: -97.72,
    year: "2025",
  }),
];

/** @deprecated alias — CMS / legacy imports */
export const DEMO_PRODUCTS = DEMO_TIRES;
export type PhoneProduct = TireProduct;
export type ProductCategory = TireCategory;
