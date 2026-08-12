// ---------- Brand ----------
export const brand = {
  name: "Jedlik Motors",
  year: "2026",
  note: "Jedlik is named after Ányos Jedlik, who built the world's first electric motor in 1828. We are continuing that legacy on Indian roads.",
  sectionTitle: "We are redefining the way the world commutes in cities.",
  logo: "/assets/logo-uploaded.png",
  silhouette: "/assets/epod-silhouette.png",
};

// ---------- Section 2: Commuter Needs ----------
export interface CommuterNeed {
  id: number;
  title: string;
  icon: string;
}

export const commuterNeeds: CommuterNeed[] = [
  { id: 1, title: "Higher Speed & Status", icon: "/assets/needs/speed.svg" },
  { id: 2, title: "Comfort & Air Conditioning", icon: "/assets/needs/comfort.svg" },
  { id: 3, title: "Android Dashboard", icon: "/assets/needs/dashboard.svg" },
  { id: 4, title: "Boot Storage", icon: "/assets/needs/storage.svg" },
  { id: 5, title: "Weather Protection", icon: "/assets/needs/weather.svg" },
  { id: 6, title: "Fuel Efficiency", icon: "/assets/needs/efficiency.svg" },
  { id: 7, title: "Quick Pickup", icon: "/assets/needs/pickup.svg" },
  { id: 8, title: "Helmet-Free Driving", icon: "/assets/needs/helmet.svg" },
  { id: 9, title: "Highly Maneuverable", icon: "/assets/needs/maneuver.svg" },
  { id: 10, title: "Easy Parking", icon: "/assets/needs/parking.svg" },
];

// ---------- Section 3: Quadrant Chart ----------
export interface QuadrantPoint {
  name: string;
  comfort: number; // 0-100 (x axis)
  maneuverability: number; // 0-100 (y axis)
  isJedlik?: boolean;
  image?: string;
  color: string;
}

export const quadrantPoints: QuadrantPoint[] = [
  { name: "MG Comet",         comfort: 22, maneuverability: 78, image: "/assets/rival-mg-comet.webp",        color: "#7C3AED" },
  { name: "PMV Eas-E",        comfort: 30, maneuverability: 70, image: "/assets/rival-pmv-ease.webp",        color: "#D946EF" },
  { name: "Gensol EV/Ezio*",  comfort: 45, maneuverability: 50, image: "/assets/rival-gensol-ezio.webp",     color: "#93C5FD" },
  { name: "Wings Robin",      comfort: 35, maneuverability: 38, image: "/assets/rival-wings-robin.webp",     color: "#B45309" },
  { name: "Sina Version-E",   comfort: 58, maneuverability: 44, image: "/assets/rival-sina-version-e.webp",  color: "#60A5FA" },
  { name: "T-Shell Bad Boy",  comfort: 52, maneuverability: 14, image: "/assets/rival-tshell-badboy.webp",   color: "#7F1D1D" },
  { name: "Lit Motors C-1",   comfort: 80, maneuverability: 42, image: "/assets/rival-lit-motors-c1.webp",   color: "#1E3A8A" },
  { name: "Jedlik",           comfort: 88, maneuverability: 88, isJedlik: true,                              color: "#059669" },
];

// ---------- Section 4: Team & Advisors ----------
export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  detail?: string;
  /** True when the source photo is a circular avatar crop with a solid
   * background fill outside the circle — the image needs to be zoomed
   * in so that fill never shows inside the rectangular crop frame. */
  imageZoom?: boolean;
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
    image: "/assets/team-srikanthan.jpg",
  },
  {
    name: "Swathi Thombarappu",
    role: "Mechanical Mentor",
    detail: "EE-Chassis Electronics & ADAS Expert, VinFast",
    image: "/assets/team-swathi.jpg",
  },
  {
    name: "Shankar Subramanian",
    role: "Business Mentor",
    detail: "Strategic Advisor & Independent Director — Governance, Growth & Business Advisory",
    image: "/assets/team-shankar.jpg",
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
  // Uploaded PNG with transparent background, sized to fit on mobile + desktop
  image: "/assets/epod-reveal-uploaded.jpg",
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
  /** Position on the world map (percentage of 950x620 viewBox). */
  mapX: number;
  mapY: number;
}

export const geoExpansion: GeoExpansion[] = [
  { region: "India",            value: 517, display: "$517M",  mapX: 71.46, mapY: 43.56 },
  { region: "Vietnam + Thailand", value: 86,  display: "$86M",   mapX: 78.5,  mapY: 53.0 },
  { region: "Indonesia",        value: 63,  display: "$63M",   mapX: 81.0,  mapY: 64.0 },
  { region: "EU-5 + USA",       value: 40,  display: "$40M+",  mapX: 49.5,  mapY: 30.5 },
  { region: "USA",              value: 20,  display: "$20M",   mapX: 21.71, mapY: 33.57 },
  { region: "Brazil",           value: 8,   display: "$8M",    mapX: 33.0,  mapY: 64.0 },
];

// ---------- Section 9: Personas ----------
export interface Persona {
  number: string;
  title: string;
  profile: string;
  share: number; // % of TAM
  accent: string; // hex for donut stroke
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
    profile: "Age 28–45 · Salaried",
    share: 60,
    accent: "#000000",
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
    profile: "Age 30–45 · Family decision",
    share: 25,
    accent: "#6B6B6B",
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
    profile: "Age 30–50 · Tech-savvy",
    share: 15,
    accent: "#C8023B",
    tam: "15% of TAM",
    age: "30–50",
    income: "Tech-savvy ($2K–$5K/mo)",
    location: "Premium Metros",
    trigger: "Wow launch",
    ltv: "$5K–$7K",
  },
];

// ---------- Footer ----------
export const supporters: { name: string; src: string; alt: string }[] = [
  {
    name: "Anna Incubator",
    src: "/assets/supporters/anna-incubator.jpg",
    alt: "Anna Incubator",
  },
  {
    name: "Startup India (DPIIT)",
    src: "/assets/supporters/startup-india-dpiit.jpg",
    alt: "Startup India — DPIIT",
  },
  {
    name: "Startup TN",
    src: "/assets/supporters/startup-tn.png",
    alt: "Startup Tamil Nadu",
  },
  {
    name: "MAARG",
    src: "/assets/supporters/maarg.webp",
    alt: "MAARG — Mentorship, Advisory, Assistance, Resilience, Growth",
  },
  {
    name: "NIDHI PRAYAS",
    src: "/assets/supporters/nidhi-prayas.png",
    alt: "NIDHI PRAYAS — DST India",
  },
];

export const buildPhotos = [
  "/assets/build-1.jpg",
  "/assets/build-2.jpg",
  "/assets/build-3.jpg",
  "/assets/build-4.jpg",
  "/assets/build-5.jpg",
  "/assets/build-6.jpg",
  "/assets/build-7.jpg",
  "/assets/build-8.jpg",
  "/assets/build-9.jpg",
  "/assets/build-10.jpg",
  "/assets/build-11.jpg",
  "/assets/build-12.jpg",
  "/assets/build-13.jpg",
];



export const contactInfo = {
  website: "www.jedlik.in",
  websiteUrl: "https://www.jedlik.in",
  email: "info@jedlik.in",
  domain: "jedlik.in",
  phone: "+91 90940 36915",
  instagram: "instagram.com/jedlik.in",
  linkedin: "linkedin.com/company/jedlik",
  linkedinUrl: "https://www.linkedin.com/company/jedlik/about/?viewAsMember=true",
};

export const close = {
  thanks: "Thank you.",
  lead: "The city will",
  accent: "move differently",
  tail: "from here.",
};

// ---------- Section 09: Feedback ----------
export const feedbackCopy = {
  eyebrow: "Section 09 — Your Verdict",
  heading: "Did this land for you?",
  sub: "One click. We read every response.",
  voteUp: "Yes, I'm interested",
  voteDown: "Not for me",
  // Shown only after a positive vote — the ask is earned, not upfront.
  emailPrompt: "Shall we keep you posted?",
  emailSub: "Leave an address and we'll send progress on the e-POD. Optional.",
  emailPlaceholder: "you@firm.com",
  emailSubmit: "Send",
  emailSkip: "No thanks",
  thanksUp: "Thank you — we'll be in touch.",
  thanksDown: "Thank you for the honest answer.",
  thanksEmail: "Noted. You'll hear from us.",
  invalidEmail: "That address doesn't look right.",
  privacy:
    "We record your response and, if you give it, your email. Nothing else.",
};

// ---------- Header: Invest CTA ----------
export const investCopy = {
  button: "Invest in Us",
  heading: "Invest in Jedlik.",
  sub: "Leave your email and we'll send the full investor pack and set up a call.",
  placeholder: "you@firm.com",
  submit: "Submit",
  cancel: "Cancel",
  thanks: "Thank you — we'll be in touch shortly.",
  invalidEmail: "That address doesn't look right.",
  privacy: "We record your email so we can reply. Nothing else.",
  close: "Close",
};

