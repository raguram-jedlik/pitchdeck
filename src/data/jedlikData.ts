import {
  Gauge,
  Wind,
  Smartphone,
  Package,
  CloudRain,
  Fuel,
  Zap,
  ShieldOff,
  Move,
  ParkingSquare,
  type LucideIcon,
} from "lucide-react";

// ---------- Section 2: Commuter Needs ----------
export interface CommuterNeed {
  title: string;
  icon: LucideIcon;
}

export const commuterNeeds: CommuterNeed[] = [
  { title: "Higher Speed & Status", icon: Gauge },
  { title: "Comfort & Air Conditioning", icon: Wind },
  { title: "Android Dashboard", icon: Smartphone },
  { title: "Boot Storage", icon: Package },
  { title: "Weather Protection", icon: CloudRain },
  { title: "Fuel Efficiency", icon: Fuel },
  { title: "Quick Pickup", icon: Zap },
  { title: "Helmet-Free Driving", icon: ShieldOff },
  { title: "Highly Maneuverable", icon: Move },
  { title: "Easy Parking", icon: ParkingSquare },
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
}

export const founders: TeamMember[] = [
  { name: "Raguram SK", role: "Founder & CEO" },
  { name: "Muthuram B", role: "Co-Founder & CTO" },
  { name: "Nishanthraj GV", role: "Co-Founder & COO" },
];

export const teamHighlight =
  "Combined 15+ years experience in automotive design across TVS, Samsung, Daimler Trucks, and Serte.";

export const mentors: TeamMember[] = [
  {
    name: "Srikanthan Sridharan",
    role: "Electrical Mentor (Assistant Professor, Dept. of Engineering Design, IIT-M)",
  },
  {
    name: "Swathi Thombarappu",
    role: "Mechanical Mentor (EE-Chassis Electronics & ADAS Expert, VinFast)",
  },
  {
    name: "Shankar Subramanian",
    role: "Business Mentor (Strategic Advisor & Independent Director – Governance, Growth & Business Advisory)",
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
    label: "Angel Round – In Progress",
    points: ["Investment Ask: ₹47L INR", "Valuation: ₹4.67 Cr", "MVP in Progress"],
    isNow: true,
  },
  {
    year: "FY2026",
    label: "Pre-Seed",
    points: [
      "Investment Ask: ₹7 Cr",
      "Valuation: ₹75 Cr",
      "Goals: MVP Completion, Testing & ARAI Approval",
    ],
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
  name: "JEDLIK E-POD",
  topSpeed: "120 km/hr",
  range: "200 km",
  safetyComfort: [
    "Fully Enclosed Body",
    "Airbags",
    "Air Conditioning",
    "Pushback Seats",
  ],
};

// ---------- Section 7: Steer by Wire ----------
export const steerByWire = {
  mechanical: {
    title: "Mechanical (Old)",
    description: "Rigid steel steering rod linkage",
  },
  steerByWireCard: {
    title: "Steer-by-Wire (E-POD)",
    description: "Computer ECU commands via electric wire signal",
  },
  benefits: [
    "Lighter weight",
    "Zero rigid column",
    "Ultra-precise digital response",
  ],
};

export const crabWalk = {
  modes: ["Front Wheel Drive", "Circle Mode", "Glide Mode"],
  benefits: [
    "Simultaneous front & rear wheel angle adjustment",
    "Glides sideways into ultra-tight parking spaces",
  ],
};

// ---------- Section 8: Market Size ----------
export interface MarketMetric {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
}

export const marketMetrics: MarketMetric[] = [
  {
    label: "TAM",
    value: "$7.0B/yr",
    numericValue: 7.0,
    suffix: "B/yr",
    description: "Every 2-wheeler sold worldwide per year (60M units)",
  },
  {
    label: "SAM",
    value: "$1.6B/yr",
    numericValue: 1.6,
    suffix: "B/yr",
    description: "Enclosed, weatherproof segment (3.5M units globally)",
  },
  {
    label: "SOM",
    value: "$70M ARR",
    numericValue: 70,
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
    title: "Weather-Exposed Commuters",
    tam: "60% of TAM",
    age: "28-45",
    income: "Salaried ($600-$2K/mo)",
    location: "Tier-1 Metros",
    trigger: "Monsoon commute",
    ltv: "$3.5K-$4.5K",
  },
  {
    title: "Family Buyer",
    tam: "25% of TAM",
    age: "30-45",
    income: "$800-$2.5K/mo household",
    location: "India + Indonesia + Vietnam",
    trigger: "Growing kids",
    ltv: "$3.5K-$4.5K",
  },
  {
    title: "Premium Aspirant",
    tam: "15% of TAM",
    age: "30-50",
    income: "Tech-savvy ($2K-$5K/mo)",
    location: "Premium Metros",
    trigger: "Wow launch",
    ltv: "$5K-$7K",
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

export const contactInfo = {
  website: "www.jedlik.in",
  websiteUrl: "https://www.jedlik.in",
  email: "info@jedlik.in",
  domain: "jedlik.in",
  phone: "+91 90940 36915",
};
