// ---------------------------------------------------------------------------
// Detail page — the deep-dive behind the "Know More" button on the brief deck.
//
// Source of truth: the Jedlik Motors internal knowledge base
// (jedlik-motors-kb skill, v6, 27 Oct 2026). Every figure below was either
// operator-confirmed on 27 Oct 2026 or transcribed from the founder's own
// deck slides. Nothing here is invented.
//
// Two rules the KB enforces, carried into this file:
//   1. Currency — the projection and revenue charts are USD ($M) at ₹83/$1.
//      Everything else is ₹. Each block states its own unit.
//   2. Scope — three BOM figures and two CapEx figures exist. Each is
//      labelled with its scope or production volume so they are never read
//      as the same number.
// ---------------------------------------------------------------------------

// ---------- Section 01 — Snapshot ----------

export const snapshot = [
  { label: "Stage", value: "TRL 5 — prototype stage, field-trialed" },
  { label: "Prototypes built", value: "Two — Alpha and Beta" },
  { label: "Granted IP", value: "1 patent granted, 1 published" },
  { label: "Burn", value: "₹13 L / month" },
  { label: "Runway", value: "1.5 years" },
];

// ---------- Section 02 — The team ----------

// ---------- Section 03 — Prototypes ----------

export const prototypeBuilds = [
  {
    name: "Alpha",
    detail:
      "The frame and geometry precursor. Its suspension work is the basis the Beta prototype was developed from, and the Alpha lineage is still visible in the current CAD set.",
  },
  {
    name: "Beta",
    detail:
      "The full working prototype. It drove under its own power on public roads.",
  },
];

// ---------- Section 04 — Vehicle specifications ----------

export const vehicleSpecs = [
  { spec: "Top speed", value: "120 km/hr" },
  { spec: "Range", value: "200 km" },
  { spec: "Battery", value: "8.5 kWh" },
  { spec: "Pod weight", value: "200 kg" },
  { spec: "Vehicle category", value: "M category or L2+ Amendment category" },
  { spec: "Charging time", value: "15 mins (0%–100% in 1.5 hrs)" },
  { spec: "Steer-by-wire", value: "Yes — granted patent" },
  { spec: "Autonomous standing", value: "Yes — safety redundancy" },
  { spec: "Localisation", value: "90%" },
  { spec: "Subsidy scheme", value: "PM E-DRIVE" },
  { spec: "IP", value: "2 patents" },
];

export const valueProposition = [
  "Accessible premium commute",
  "Ultra-low cost of ownership",
  "Zero-straight ergonomics",
  "All-weather comfort and UV shielding",
  "Helmet-free commuting",
  "Automotive-grade safety",
];

// ---------- Topic validation — unsolicited inbound proof ----------
//
// Real reactions to the public launch, captured as screenshots. The two
// inbound-email screenshots are published with the sender's address blurred;
// the recipient line and message body are left intact so the message reads
// as a genuine enquiry. Nothing here is written copy — each tile is a
// screenshot of a real post or a real email.

export interface ValidationTile {
  src: string;
  alt: string;
  /** Which of the two collage groups this tile belongs to. */
  group: "social" | "email";
  /**
   * Intrinsic width / height of the source screenshot. The collage uses this
   * to reserve the exact space each tile will occupy before the image
   * loads, so the layout never jumps and the masonry can be balanced
   * without measuring anything on screen.
   */
  ratio: number;
  /**
   * When true the tile is laid out on its own full-width row instead of
   * inside a masonry column.
   *
   * A very wide screenshot (a long LinkedIn comment) cannot be read inside
   * a narrow masonry column: the box height works out to a few dozen pixels
   * and the text shrinks to an illegible strip. Giving those tiles the full
   * width of the collage lets the image render at close to its natural size.
   */
  wide?: boolean;
}

export const validationTiles: ValidationTile[] = [
  {
    src: "/assets/validation/linkedin-1.png",
    alt: "LinkedIn comment describing the enclosed electric two-wheeler as a game-changer for city commuting",
    group: "social",
    ratio: 647 / 143,
  },
  {
    src: "/assets/validation/linkedin-2.png",
    alt: "LinkedIn comment congratulating the team",
    group: "social",
    ratio: 675 / 135,
  },
  {
    src: "/assets/validation/linkedin-3.png",
    alt: "LinkedIn comment encouraging the team to take the vehicle to the MVP and production, and asking for a roof for heat, sun and dust protection",
    group: "social",
    ratio: 647 / 262,
  },
  {
    src: "/assets/validation/linkedin-4.png",
    alt: "LinkedIn comment on the e-POD challenging the assumption that urban mobility must choose between two-wheeler agility and four-wheeler protection",
    group: "social",
    ratio: 670 / 312,
  },
  {
    src: "/assets/validation/linkedin-5.png",
    alt: "LinkedIn comment saying the product is great",
    group: "social",
    ratio: 646 / 117,
  },
  {
    src: "/assets/validation/linkedin-6.png",
    alt: "LinkedIn comment noting price is key and that Europe and cold-winter countries need the product",
    group: "social",
    ratio: 693 / 183,
  },
  {
    src: "/assets/validation/linkedin-7.png",
    alt: "LinkedIn comment saying the next generation will love this product",
    group: "social",
    ratio: 697 / 152,
  },
  {
    src: "/assets/validation/linkedin-8.png",
    alt: "LinkedIn comment saying the vehicle helps with traffic congestion and pollution, and calling it a great innovation",
    group: "social",
    ratio: 696 / 477,
  },
  {
    src: "/assets/validation/linkedin-10.png",
    alt: "LinkedIn comments with a mix of reactions, one calling the product much needed and a Gr8 news, one calling it a nice concept, and one calling it amazing for police patrol, delivery professionals and micro ambulance use cases",
    group: "social",
    ratio: 550 / 442,
  },
  {
    src: "/assets/validation/linkedin-12.png",
    alt: "LinkedIn comments reacting to the launch with hearts and the word amazing",
    group: "social",
    ratio: 618 / 167,
  },
  {
    src: "/assets/validation/linkedin-13.png",
    alt: "LinkedIn comment saying offering the battery as a service instead of bundling it into the sticker price is what actually gets the on-road cost down to something a daily commuter will consider",
    group: "social",
    ratio: 972 / 204,
  },
  {
    src: "/assets/validation/linkedin-14.png",
    alt: "LinkedIn comment saying the team was expected to build something like this ten years back and is finally doing it, and that if it works well the markets of Bangalore, Mumbai, Delhi and Chennai are wide open",
    group: "social",
    ratio: 660 / 74,
    wide: true,
  },
  {
    src: "/assets/validation/linkedin-15.png",
    alt: "LinkedIn comment saying they would really like to buy the vehicle",
    group: "social",
    ratio: 300 / 180,
  },
  {
    src: "/assets/validation/linkedin-16.png",
    alt: "LinkedIn comment saying it is great to see someone attempting to solve this problem in India",
    group: "social",
    ratio: 660 / 122,
    wide: true,
  },
  {
    src: "/assets/validation/mail-10.png",
    alt: "Inbound email congratulating the team on the product and looking forward to the launch, with the sender's address blurred",
    group: "email",
    ratio: 935 / 473,
  },
  {
    src: "/assets/validation/mail-9.png",
    alt: "Inbound email from an industry reader who saw the vision and wants to be on the line for a collaboration, with the sender's address blurred",
    group: "email",
    ratio: 933 / 400,
  },
];

// ---------- Section 05 — Business model canvas ----------

export const canvasBlocks = [
  {
    title: "Key partners",
    items: [
      "Battery cell suppliers",
      "Hub motor manufacturers",
      "Delivery and fleet service partners",
      "Manufacturing and fabrication partners",
      "Component manufacturers",
      "ARAI",
      "GARC",
      "Design and FEA consultants",
    ],
  },
  {
    title: "Key activities",
    items: [
      "Vehicle R&D",
      "Supply chain and production",
      "Testing and homologation",
      "Business and finance",
      "Marketing and sales",
    ],
  },
  {
    title: "Key resources",
    items: [
      "Engineering and R&D team",
      "Manufacturing equipment and tools",
      "Technology and product design",
      "Investment capital and financial support",
    ],
  },
  {
    title: "Value proposition",
    items: valueProposition,
  },
  {
    title: "Customer relationships",
    items: [
      "Community building",
      "Brand ambassador",
      "3-month free beta trial",
      "Dedicated service centers",
      "Social media and user surveys",
    ],
  },
  {
    title: "Channels",
    items: [
      "Website",
      "Pre-launch teasers",
      "Offline showrooms and dealerships",
      "Flash sales",
      "Fleet and delivery partnerships",
      "Social and digital marketing",
      "TV and movie placements",
      "Public displays",
    ],
  },
  {
    title: "Customer segments",
    items: [
      "Two-wheeler users",
      "Car users",
      "Two-wheeler-to-car upgraders",
      "0–20 km short-trip riders",
      "Premium commuters",
      "Delivery and logistics fleets",
      "Tech-forward early adopters",
    ],
  },
  {
    title: "Cost structure",
    items: [
      "Product development",
      "Manufacturing and tooling",
      "Core talent payroll",
      "Homologation and testing",
      "Customer acquisition",
      "Legal and CA/CS expenses",
    ],
  },
  {
    title: "Revenue sources",
    items: [
      "Vehicle sales",
      "Delivery partnerships",
      "Service subscriptions",
      "Autonomous mobility subscription",
      "Accessories and upgrades",
      "Merchandise",
    ],
  },
];

// ---------- Section 06 — Revenue mix ----------

export interface RevenueStream {
  label: string;
  share: number;
}

export const revenueStreams: RevenueStream[] = [
  { label: "Vehicle purchase", share: 60 },
  { label: "Delivery-service partnerships", share: 13 },
  { label: "Service subscription", share: 10 },
  { label: "Autonomous mobility subscription", share: 8 },
  { label: "Accessories and upgrades", share: 6 },
  { label: "Toys and apparel for kids", share: 3 },
];

// ---------- Section 07 — Unit economics ----------

export interface BomRow {
  element: string;
  percent: number;
  rupees: string;
  contents: string;
}

export const bomRows: BomRow[] = [
  {
    element: "Mechanical components",
    percent: 36,
    rupees: "₹2.09 L",
    contents: "Tyres, rims, suspension, steering, seats, brakes, HVAC, glass",
  },
  {
    element: "Outsourced fabrication",
    percent: 26,
    rupees: "₹1.50 L",
    contents: "Chassis frame, body panels and enclosure — Chennai fabricator",
  },
  {
    element: "Electrical components",
    percent: 33,
    rupees: "₹1.93 L",
    contents: "Battery ₹63K, hub motors ₹22K, controller ₹16K, BMS, harness",
  },
  {
    element: "Freight and logistics",
    percent: 5,
    rupees: "₹0.28 L",
    contents: "Vendor-to-factory transport on the Chennai–Itsoor corridor",
  },
];

export const unitEconomics = {
  bomTotal: "₹5.79 L",
  prototype: "₹6.41 L",
  volume: "₹2.54 L",
  sellPrice: "₹3.00 L",
  grossProfit: "₹46 K",
  grossMargin: "15.3%",
  /* Numeric forms for the cost-curve chart (rupees). */
  prototypeValue: 641000,
  volumeValue: 254000,
  sellPriceValue: 300000,
  headline:
    "Cost drops 60% at scale: ₹6.41 L prototype → ₹2.54 L volume. Gross margin 15.3% at a ₹3 L sell price.",
};

export const productionPlan = [
  { label: "Output", value: "80 vehicles per month — 4 per day" },
  { label: "Team", value: "60 staff" },
  { label: "Cities", value: "Chennai, Bengaluru, Mumbai" },
  { label: "Capacity", value: "Factory garage holds 900 vehicles" },
  { label: "Fabrication", value: "Outsourced to Sriperumbudur, Hosur and Oragadam" },
];

// ---------- Section 08 — Manufacturing ----------

export const darkFactory = {
  headline: "Dark factory — 1,000 units a year",
  sub: "Right-sized cobot automation, a 202-minute takt and CKD assembly.",
  capex: "₹5–9 Cr",
  capexManual: "₹15–25 Cr",
  staff: "7",
  staffManual: "65–80",
  labourSaving: "₹6–9 Cr/yr",
  payback: "4–6 years",
  takt: "202 min",
  output: "3.3 vehicles/day",
  days: "300 days/year",
  oee: "70% OEE",
  roi: "22 systems including 6 cobots replace 65–80 workers. Dark-factory CapEx is ₹10–16 Cr less than a manual CKD line.",
};

export const equipmentAllocation = [
  { item: "AMRs and conveyor", share: 21 },
  { item: "Cobot cells", share: 27 },
  { item: "Machine vision", share: 13 },
  { item: "End-of-line testing", share: 27 },
  { item: "MES and SCADA", share: 12 },
];

// ---------- Section 09 — Go to market ----------

export const goToMarket = [
  {
    stage: "Pilot",
    scale: "200 units / year",
    detail: "3-month free beta trial on early vehicles.",
  },
  {
    stage: "Scaling up",
    scale: "10,000 units / year",
    detail: "More free-trial units in market.",
  },
  {
    stage: "Partnership",
    scale: "Delivery-service partnerships",
    detail: "Fleet and delivery channel opens up alongside direct sales.",
  },
  {
    stage: "Break-even",
    scale: "500,000 units / year",
    detail: "Affordable version at ₹2.5 to 3.5 lakh.",
  },
];

// ---------- Section 10 — The round ----------

export interface FundUse {
  bucket: string;
  amount: string;
  percent: number;
}

export const fundUse: FundUse[] = [
  {
    bucket: "Product R&D",
    amount: "₹2.8 Cr",
    percent: 40,
  },
  {
    bucket: "Manufacturing",
    amount: "₹1.75 Cr",
    percent: 25,
  },
  {
    bucket: "Regulatory and IP",
    amount: "₹1.4 Cr",
    percent: 20,
  },
  {
    bucket: "Team and operations",
    amount: "₹1.05 Cr",
    percent: 15,
  },
];

export const burn = {
  monthly: "₹13 L",
  runway: "1.5 years",
  implied: "₹2.34 Cr",
  note: "The round funds roughly 54 months of gross burn. The 1.5-year runway is the company's current position from existing capital, not a claim that the round equals 1.5 years of runway — read it together with the allocation above.",
};

// ---------- Section 11 — Cap table ----------

export interface Holder {
  name: string;
  percent: number;
  kind: string;
}

export const capTable: Holder[] = [
  { name: "Raguram S K", percent: 39, kind: "Founder and CEO" },
  { name: "Muthuram B", percent: 24, kind: "Co-founder and CTO" },
  { name: "Nishanthraj G V", percent: 24, kind: "Co-founder and COO" },
  { name: "AIC — Anna Incubator", percent: 3, kind: "Incubator" },
  { name: "Arihant", percent: 6, kind: "Angel investor" },
  { name: "Ambili Arun Kumar", percent: 1, kind: "Angel investor" },
  { name: "Poornima", percent: 3, kind: "Angel investor" },
];

// ---------- Section 12 — Operations and supply chain ----------

export const operations = [
  {
    title: "Regulatory pathway",
    body: "CMVR homologation testing runs through GARC, with ARAI engaged as the vehicle manufacturer for formal consultation. Status: not yet certified — no ARAI or ICAT approval and no IP rating to date.",
  },
  {
    title: "Tyres — BKT",
    body: "Tyre supply is through BKT, which now manufactures tyres itself rather than reselling them, giving direct control over quality, specification and supply continuity for a high-wear consumable.",
  },
  {
    title: "Service and charging",
    body: "Service centres and charging infrastructure are delivered through third-party partners rather than built in-house. The company does not carry a service network on its own balance sheet.",
  },
  {
    title: "Redundancy prevention",
    body: "An additional motor is fitted in the steering system, so a single motor failure does not lose steering control.",
  },
];

// ---------- Section 13 — IP ----------

export const patents = [
  {
    title: "Crab-walk steering",
    status: "Granted",
    detail:
      "Centre-hub steering for an enclosed two-wheeler electric pod, with 9 granted claims.",
  },
  {
    title: "Modular electro-mechanical docking",
    status: "Published, under examination",
    detail:
      "Deterministic docking state machine with a fused distance-sensor and camera sensing stack.",
  },
];

// ---------- Section 14 — Projection ----------

export interface Milestone {
  year: string;
  label: string;
  units: string;
  revenue: string;
  valuation: string;
  /* Numeric forms (USD millions) for the projection chart. */
  revenueValue: number;
  valuationValue: number;
}

export const milestones: Milestone[] = [
  { year: "FY2028", label: "Seed Launch", units: "900 units", revenue: "$2.7M", valuation: "$12M", revenueValue: 2.7, valuationValue: 12 },
  { year: "FY2029", label: "Series A", units: "1K units", revenue: "$3M", valuation: "$30M", revenueValue: 3, valuationValue: 30 },
  { year: "FY2032", label: "10K Milestone", units: "10K units", revenue: "$30M", valuation: "$350M", revenueValue: 30, valuationValue: 350 },
  { year: "FY2035", label: "First Profit", units: "65K units", revenue: "$176M", valuation: "$3B", revenueValue: 176, valuationValue: 3000 },
  { year: "FY2041", label: "1M Units", units: "1M units", revenue: "$3B", valuation: "$30B", revenueValue: 3000, valuationValue: 30000 },
];

export const projectionHeadline = [
  { label: "ASP", value: "$3.0K (₹2.5 L)" },
  { label: "Gross margin", value: "10% → 30%" },
  { label: "Breakeven", value: "FY2035 (Year 8)" },
  { label: "Total funding", value: "$720M" },
  { label: "Peak revenue", value: "$3.0B (FY2041)" },
  { label: "Peak valuation", value: "$30B" },
];

// ---------- Section 15 removed (Notes on the numbers) ----------
