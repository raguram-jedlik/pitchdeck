// ---------- Brand ----------
export const brand = {
  name: "Jedlik Motors",
  tagline: "Redefine the class.",
  year: "2026",
  note: "Jedlik is named after Ányos Jedlik, who built the world's first electric motor in 1828. We are continuing that legacy on Indian roads.",
  sectionTitle: "We are redefining the way the world commutes in cities.",
};

// ---------- Section 1: Hero ----------
export interface CommuterNeed {
  id: number;
  title: string;
}

export const commuterNeeds: CommuterNeed[] = [
  { id: 1, title: "Higher Speed & Status" },
  { id: 2, title: "Comfort & Air Conditioning" },
  { id: 3, title: "Android Dashboard" },
  { id: 4, title: "Boot Storage" },
  { id: 5, title: "Weather Protection" },
  { id: 6, title: "Fuel Efficiency" },
  { id: 7, title: "Quick Pickup" },
  { id: 8, title: "Helmet-Free Driving" },
  { id: 9, title: "Highly Maneuverable" },
  { id: 10, title: "Easy Parking" },
];

// ---------- Section 3: Quadrant Chart ----------
export interface QuadrantPoint {
  name: string;
  comfort: number; // 0-100 (x axis)
  maneuverability: number; // 0-100 (y axis)
  isJedlik?: boolean;
}

export const quadrantPoints: QuadrantPoint[] = [
  { name: "MG Comet", comfort: 22, maneuverability: 78 },
  { name: "PMV Eas-E", comfort: 28, maneuverability: 82 },
  { name: "Gensol EV/Ezio*", comfort: 45, maneuverability: 42 },
  { name: "Wings Robin", comfort: 50, maneuverability: 38 },
  { name: "Sina Version-E", comfort: 40, maneuverability: 48 },
  { name: "T-Shell Bad Boy", comfort: 55, maneuverability: 45 },
  { name: "Lit Motors C-1", comfort: 48, maneuverability: 40 },
  { name: "Jedlik", comfort: 85, maneuverability: 88, isJedlik: true },
];

// ---------- Section 4: Team & Advisors ----------
export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  detail?: string;
}

export const founders: TeamMember[] = [
  { name: "Raguram SK", role: "Founder & CEO", image: "/assets/team-raguram.jpg" },
  { name: "Muthuram B", role: "Co-Founder & CTO", image: "/assets/team-muthuram.jpg" },
  { name: "Nishanthraj GV", role: "Co-Founder & COO", image: "/assets/team-nishanthraj.jpg" },
];

export const teamHighlight =
  "Combined 15+ years experience in automotive design across TVS, Samsung, Daimler Trucks, and Serte.";

export const mentors: TeamMember[] = [
  {
    name: "Srikanthan Sridharan",
    role: "Electrical Mentor",
    detail: "Assistant Professor, Dept. of Engineering Design, IIT-M",
  },
  {
    name: "Swathi Thombarappu",
    role: "Mechanical Mentor",
    detail: "EE-Chassis Electronics & ADAS Expert, VinFast",
  },
  {
    name: "Shankar Subramanian",
    role: "Business Mentor",
    detail: "Strategic Advisor & Independent Director — Governance, Growth & Business Advisory",
  },
];

// ---------- Section 5: Roadmap ----------
export interface Milestone {
  year: string;
  label: string;
  points: string[];
  isNow?: boolean;
}

export const roadmap: Milestone[] = [
  {
    year: "FY2025",
    label: "Completed",
    points: ["Grants ₹26L INR", "Prototype Completed"],
  },
  {
    year: "FY2026",
    label: "Angel Round",
    points: ["Investment Ask: ₹47L INR", "Valuation: ₹4.67 Cr", "MVP in Progress"],
  },
  {
    year: "FY2026",
    label: "Pre-Seed",
    points: [
      "Investment Ask: ₹7 Cr",
      "Valuation: ₹75 Cr",
      "Goals: MVP Completion, Testing & ARAI Approval",
    ],
    isNow: true,
  },
  {
    year: "FY2027",
    label: "Seed Launch",
    points: [
      "Valuation: ₹114.6 Cr (24.5x Return)",
      "Goals: Own Dark Factory, Single City Launch, Pilot Production Ready, In-House Battery Assembly",
    ],
  },
  {
    year: "FY2028",
    label: "Series-A",
    points: [
      "Valuation: ₹286.5 Cr (61.4x Return)",
      "Goals: 3x Plant Capacity, Full Automation, 3 Metro Expansion, OTA, Stack + Subsidy",
    ],
  },
  {
    year: "FY2029",
    label: "Series-A2",
    points: [
      "Valuation: ₹716.3 Cr (153.4x Return)",
      "Goals: 8 City Expansion, BLDC Motor Line, Own Battery Cell Sourcing",
    ],
  },
  {
    year: "FY2030",
    label: "Series-B",
    points: [
      "Valuation: ₹1671.3 Cr (357.9x Return)",
      "Goals: 16 City Hub, Long Range Variant, Road-Legal Homologation",
    ],
  },
];

// ---------- Section 6: Product Reveal ----------
export const productSpecs = {
  name: "E-POD",
  fullName: "Jedlik E-POD",
  topSpeed: "120 km/hr",
  range: "200 km",
  tease: {
    line1: "Once in every generation,",
    line2: "a new class of vehicle is born.",
    line3: "Now, we unveil ours…",
  },
  callouts: [
    "Fully Enclosed Body",
    "Airbags",
    "Air Conditioning",
    "Top Speed 120 km/hr",
    "Range 200 km",
    "Pushback Seats",
  ],
  image: "/assets/epod-reveal.jpg",
  blurImage: "/assets/epod-blur.jpg",
};

// ---------- Section 7: Steer by Wire ----------
export const steerByWire = {
  heading: "Steer-by-wire",
  description:
    "No rigid steel column. A computer sends the turn command through a wire, like a game controller. Lighter, faster, more precise steering than any mechanical linkage.",
  image: "/assets/steer-by-wire.png",
  benefits: [
    "Lighter weight",
    "Zero rigid column",
    "Ultra-precise digital response",
  ],
};

export interface CrabMode {
  name: string;
  front: number; // degrees
  rear: number;  // degrees
}

export const crabWalk = {
  heading: "Crab-walk steering",
  description:
    "Front and rear wheels turn the same way at once, not just the front wheel. The e-POD glides sideways for effortless, wiggle-free tight parking.",
  modes: [
    { name: "Front Wheel Drive", front: 24, rear: 0 },
    { name: "Circle", front: 24, rear: -24 },
    { name: "Glide", front: 24, rear: 24 },
  ] satisfies CrabMode[],
  benefits: [
    "Front and rear wheels steer together",
    "Glides sideways into ultra-tight parking",
  ],
};

// ---------- Section 8: Market Size ----------
export interface MarketMetric {
  label: string;
  value: string;
  numericValue: number;
  prefix?: string;
  suffix: string;
  description: string;
}

export const marketMetrics: MarketMetric[] = [
  {
    label: "TAM",
    value: "$7.0B/yr",
    numericValue: 7.0,
    prefix: "$",
    suffix: "B/yr",
    description: "Every 2-wheeler sold worldwide per year (60M units)",
  },
  {
    label: "SAM",
    value: "$1.6B/yr",
    numericValue: 1.6,
    prefix: "$",
    suffix: "B/yr",
    description: "Enclosed, weatherproof segment (3.5M units globally)",
  },
  {
    label: "SOM",
    value: "$70M ARR",
    numericValue: 70,
    prefix: "$",
    suffix: "M ARR",
    description: "Target by 2030 (0.8M units across 15 countries)",
  },
];

export interface IndiaStat {
  value: string;
  label: string;
}

export const indiaStats: IndiaStat[] = [
  { value: "230M", label: "2-wheelers on Indian roads" },
  { value: "18M", label: "New 2-wheelers sold annually (SIAM 2024)" },
  { value: "1.08M", label: "Electric 2-wheelers sold in 2024 (6% share)" },
  { value: "$517M", label: "India's enclosed e-2W opportunity by 2030 (17.8K units)" },
];

export interface GeoExpansion {
  region: string;
  value: number; // for bar width scaling in $M
  display: string;
}

export const geoExpansion: GeoExpansion[] = [
  { region: "India", value: 517, display: "$517M" },
  { region: "EU-5 + USA", value: 40, display: "$40M+" },
  { region: "Indonesia", value: 63, display: "$63M" },
  { region: "Brazil", value: 8, display: "$8M" },
  { region: "Vietnam + Thailand", value: 86, display: "$86M" },
];

// ---------- Section 9: Personas ----------
export interface Persona {
  number: string;
  title: string;
  tam: string;
  age: string;
  income: string;
  location: string;
  trigger: string;
  ltv: string;
}

export const personas: Persona[] = [
  {
    number: "01",
    title: "Weather-Exposed Commuters",
    tam: "60% of TAM",
    age: "28–45",
    income: "Salaried ($600–$2K/mo)",
    location: "Tier-1 Metros",
    trigger: "Monsoon commute",
    ltv: "$3.5K–$4.5K",
  },
  {
    number: "02",
    title: "Family Buyer",
    tam: "25% of TAM",
    age: "30–45",
    income: "$800–$2.5K/mo household",
    location: "India + Indonesia + Vietnam",
    trigger: "Growing kids",
    ltv: "$3.5K–$4.5K",
  },
  {
    number: "03",
    title: "Premium Aspirant",
    tam: "15% of TAM",
    age: "30–50",
    income: "Tech-savvy ($2K–$5K/mo)",
    location: "Premium Metros",
    trigger: "Wow launch",
    ltv: "$5K–$7K",
  },
];

// ---------- Footer ----------
export const supportedBy = [
  "Anna Incubator",
  "Startup India (DPIIT)",
  "Startup TN",
  "MAARG",
  "NIDHI PRAYAS",
];

export const buildPhotos = [
  "/assets/build-1.jpg",
  "/assets/build-2.jpg",
  "/assets/build-3.jpg",
  "/assets/build-4.jpg",
  "/assets/build-5.jpg",
  "/assets/build-6.jpg",
  "/assets/build-7.jpg",
];

export const supportersImage = "/assets/supporters.png";

export const contactInfo = {
  website: "www.jedlik.in",
  websiteUrl: "https://www.jedlik.in",
  email: "info@jedlik.in",
  domain: "jedlik.in",
  phone: "+91 90940 36915",
  instagram: "instagram.com/jedlik.in",
};

export const close = {
  thanks: "Thank you.",
  lead: "The city will",
  accent: "move differently",
  tail: "from here.",
};
