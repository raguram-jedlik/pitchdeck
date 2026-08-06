/**
 * Every word and figure on this site, transcribed from the 2026 Jedlik Motors
 * investor deck. Sections render this; they don't hold copy of their own.
 *
 * If a number here disagrees with the deck, the deck wins — fix it here.
 */

export const brand = {
  name: 'Jedlik Motors',
  tagline: 'Redefine the class.',
  year: '2026',
} as const

export const title = {
  heading: 'Jedlik Motors',
  subheading: 'We are redefining the way the world commutes in cities',
  note: "Jedlik is named after Ányos Jedlik, who built the world's first electric motor in 1828. We're continuing that legacy on Indian roads.",
} as const

export const needs = {
  heading: 'What does an urban commuter really need?',
  subheading: 'Not just a vehicle. A better way to move.',
  items: [
    { label: 'Higher Speed', icon: 'speed' },
    { label: 'Status', icon: 'status' },
    { label: 'Comfort', icon: 'comfort' },
    { label: 'Android Dashboard', icon: 'dashboard' },
    { label: 'Boot Storage', icon: 'storage' },
    { label: 'Weather Protection', icon: 'weather' },
    { label: 'Fuel Efficiency', icon: 'efficiency' },
    { label: 'Quick Pickup', icon: 'pickup' },
    { label: 'Helmet Free Driving', icon: 'helmet' },
    { label: 'Maneuverable', icon: 'maneuver' },
    { label: 'Easy Parking', icon: 'parking' },
  ],
} as const

/**
 * Positions are percentages of the plot area, origin at bottom-left.
 * x = comfort, y = maneuverability. Transcribed from the deck's scatter.
 */
export const positioning = {
  heading: "What's on the road today?",
  axes: { x: 'Comfort', y: 'Maneuverability' },
  quadrants: {
    topLeft: 'Lower Comfort',
    topRight: 'Higher Comfort',
    bottomLeft: 'Lower Maneuverability',
    bottomRight: 'Higher Maneuverability',
  },
  rivals: [
    { name: 'MG Comet', x: 28, y: 78, dot: '#9A9A9A', image: '/assets/rival-mg-comet.png' },
    { name: 'PMV Eas-E', x: 38, y: 66, dot: '#B5B5B5', image: '/assets/rival-pmv-ease.png' },
    { name: 'Lit Motors C-1', x: 62, y: 62, dot: '#6B6B6B', image: '/assets/rival-lit-motors-c1.png' },
    { name: 'Gensol EV/Ezio*', x: 46, y: 50, dot: '#CFCFCF', image: '/assets/rival-gensol-ezio.png' },
    { name: 'Wings Robin', x: 57, y: 40, dot: '#8A8A8A', image: '/assets/rival-wings-robin.png' },
    { name: 'Sina Version-E', x: 69, y: 38, dot: '#4D4D4D', image: '/assets/rival-sina-version-e.png' },
    { name: 'T-Shell Bad Boy', x: 61, y: 26, dot: '#3A3A3A', image: '/assets/rival-tshell-badboy.png' },
  ],
  jedlik: { name: 'Jedlik', x: 79, y: 86, dot: '#E5091E' },
} as const

export const team = {
  heading: 'The forces that will bring',
  headingTail: 'alive',
  band: 'Combined 15+ years experience in automotive design across TVS, Samsung, Daimler Trucks and Sertel',
  founders: [
    { name: 'Raguram SK', role: 'Founder & CEO', image: '/assets/team-raguram.jpg' },
    { name: 'Muthuram B', role: 'Co-Founder & CTO', image: '/assets/team-muthuram.jpg' },
    { name: 'Nishanthraj GV', role: 'Co-Founder & COO', image: '/assets/team-nishanthraj.jpg' },
  ],
  mentors: [
    {
      name: 'Srikanthan Sridharan',
      role: 'Electrical Mentor',
      detail: 'Assistant Professor, Dept of Engineering Design, IIT-M',
      image: '/assets/team-srikanthan.jpg',
    },
    {
      name: 'Swathi Thombarappu',
      role: 'Mechanical Mentor',
      detail: 'EE-Chassis Electronics & ADAS Expert, VinFast',
      image: '/assets/team-swathi.jpg',
    },
    {
      name: 'Shankar Subramanian',
      role: 'Business Mentor',
      detail: 'Strategic Advisor & Independent Director — Governance, Growth & Business Advisory',
      image: '/assets/team-shankar.jpg',
    },
  ],
} as const

export type FundingStage = {
  fy: string
  stage: string
  now?: boolean
  past?: boolean
  ask?: string
  valuation?: string
  returnMultiple?: string
  milestones: readonly string[]
  dot: string
}

export const funding = {
  heading: 'The fuel needed to bring',
  headingTail: 'alive',
  stages: [
    {
      fy: 'FY2025',
      stage: 'Grants',
      past: true,
      ask: '₹26L',
      milestones: ['Grants ₹26L INR', 'Prototype completed'],
      dot: '#B5B5B5',
    },
    {
      fy: 'FY2026',
      stage: 'Angel Round',
      past: true,
      ask: '₹47L',
      valuation: '₹4.67 Cr',
      milestones: ['Angel round — ₹47L INR', 'Valuation: ₹4.67 Cr', 'MVP in progress'],
      dot: '#6B6B6B',
    },
    {
      fy: 'FY2026',
      stage: 'Pre-Seed',
      now: true,
      ask: '₹7 Cr',
      valuation: '₹75 Cr',
      milestones: [
        'MVP completion',
        'Testing & ARAI approval',
        'Pilot production ready',
        'Road-legal homologation',
      ],
      dot: '#000000',
    },
    {
      fy: 'FY2027',
      stage: 'Seed Launch',
      valuation: '₹114.6 Cr',
      returnMultiple: '24.5×',
      milestones: ['Own dark factory', 'Single city launch', 'OTA, stack + subsidy'],
      dot: '#9C0614',
    },
    {
      fy: 'FY2028',
      stage: 'Series-A',
      valuation: '₹286.5 Cr',
      returnMultiple: '61.4×',
      milestones: ['3× plant capacity', '3 metro expansion', 'In-house battery assembly'],
      dot: '#C40817',
    },
    {
      fy: 'FY2029',
      stage: 'Series-A2',
      valuation: '₹716.3 Cr',
      returnMultiple: '153.4×',
      milestones: ['Full automation', 'BLDC motor line', '8 city expansion'],
      dot: '#E5091E',
    },
    {
      fy: 'FY2030',
      stage: 'Series-B',
      valuation: '₹1671.3 Cr',
      returnMultiple: '357.9×',
      milestones: ['Own battery cell sourcing', '16 city hub', 'Long range variant'],
      dot: '#F23346',
    },
  ] satisfies readonly FundingStage[],
} as const

export const tease = {
  line1: 'Once in every generation,',
  line2Lead: 'a new class of vehicle',
  line2Tail: 'is born.',
  line3: 'Now, we unveil ours…',
} as const

export const reveal = {
  eyebrow: 'Introducing',
  wordmark: 'e-POD',
  image: '/assets/epod-reveal.jpg',
  /** Anchors are percentages of the image box — where each leader line points. */
  callouts: [
    { label: 'Fully enclosed', side: 'right', x: 68, y: 22 },
    { label: '200 km range', side: 'right', x: 76, y: 46 },
    { label: 'Pushback seats', side: 'right', x: 64, y: 44 },
    { label: 'Airbags', side: 'left', x: 32, y: 33 },
    { label: 'Air conditioning', side: 'left', x: 27, y: 42 },
    { label: 'Top speed 120 km/hr', side: 'left', x: 24, y: 58 },
  ],
} as const

export const tech = {
  heading: 'The trick with two wheels',
  steerByWire: {
    label: 'Steer-by-wire',
    points: [
      'No rigid steel column — a computer sends the turn command through a wire, like a game controller.',
      'Lighter, faster, more precise steering than any mechanical linkage.',
    ],
  },
  crabWalk: {
    label: 'Crab-walk steering',
    points: [
      'Front and rear wheels turn the same way at once — not just the front wheel.',
      'The e-POD glides sideways for effortless, wiggle-free tight parking.',
    ],
    /** Steering angles in degrees for [front, rear] wheels in each mode. */
    modes: [
      { name: 'Front Wheel Drive', front: 24, rear: 0 },
      { name: 'Circle', front: 24, rear: -24 },
      { name: 'Glide', front: 24, rear: 24 },
    ],
  },
} as const

export const market = {
  heading: 'Market potential',
  subheading: 'India: $517M SAM · World: $1.6B SAM · 2030 forecast',
  funnel: [
    {
      key: 'TAM',
      value: '$7.0B/yr',
      detail: 'Every 2-wheeler sold worldwide, per year (60M units)',
    },
    {
      key: 'SAM',
      value: '$1.6B/yr',
      detail: 'Just the enclosed, weatherproof segment (3.5M units globally)',
    },
    {
      key: 'SOM',
      value: '$70M ARR',
      detail: 'What Jedlik targets by 2030 — 0.8M units across 15 countries',
    },
  ],
  india: [
    { value: 230, suffix: 'M', detail: '2-wheelers on Indian roads — the largest fleet in the world', fill: '#F4F4F4' },
    { value: 18, suffix: 'M', detail: 'new 2-wheelers sold every year (SIAM 2024)', fill: '#F4F4F4' },
    { value: 1.08, suffix: 'M', detail: 'of those were electric in 2024 — a 6% and rising share', fill: '#F4F4F4' },
    { value: 517, prefix: '$', suffix: 'M', detail: "is India's enclosed e-2W opportunity by 2030 (17.8K units)", fill: '#FBD9DC' },
  ],
  nextHeading: 'Where we go next?',
  next: [
    { country: 'India', value: 517, label: '$517M', fill: '#E5091E' },
    { country: 'Vietnam + Thailand', value: 86, label: '$86M', fill: '#000000' },
    { country: 'Indonesia', value: 63, label: '$63M', fill: '#3A3A3A' },
    { country: 'EU-5 + USA', value: 40, label: '$40M+', fill: '#6B6B6B' },
    { country: 'Brazil', value: 8, label: '$8M', fill: '#B5B5B5' },
  ],
} as const

export const personas = {
  heading: 'Target customers',
  items: [
    {
      name: 'Weather Exposed Commuters',
      share: 60,
      accent: '#000000',
      fill: '#F4F4F4',
      profile: 'Age 28–45 · Salaried · $600–2K/mo',
      rows: [
        { k: 'Geography', v: 'Tier-1 metros' },
        { k: 'Current vehicle', v: 'Any open 2W' },
        { k: 'Trigger event', v: 'Bad monsoon commute' },
        { k: 'Decision criteria', v: 'Enclosed cabin · Range · EMI fit · Service network' },
        { k: 'Channel', v: 'YouTube + dealer + influencer + IT-CSR' },
      ],
      ltv: 'LTV $3.5–4.5K',
    },
    {
      name: 'Family Buyer',
      share: 25,
      accent: '#6B6B6B',
      fill: '#F4F4F4',
      profile: 'Age 30–45 (wife) · Family decision · $800–2.5K/mo household',
      rows: [
        { k: 'Geography', v: 'India + Indonesia + Vietnam' },
        { k: 'Current vehicle', v: 'Often no 2W currently · Auto-rickshaw' },
        { k: 'Trigger event', v: 'Daughter/son turns 12–14 · Second child' },
        { k: 'Decision criteria', v: 'Step-in access · Storage · Brand trust' },
        { k: 'Channel', v: "Women's 2W FB groups + mom-influencers" },
      ],
      ltv: 'LTV $3.5–4.5K',
    },
    {
      name: 'Premium Aspirant',
      share: 15,
      accent: '#E5091E',
      fill: '#FBD9DC',
      profile: 'Age 30–50 · Tech-savvy · $2–5K/mo',
      rows: [
        { k: 'Geography', v: 'Premium metros' },
        { k: 'Current vehicle', v: 'Considering small car or any premium 2W' },
        { k: 'Trigger event', v: 'Grand launch · Wow test ride' },
        { k: 'Decision criteria', v: 'Tech stack · Design language · Premium service' },
        { k: 'Channel', v: 'Auto-journalist reviews + reservation queue' },
      ],
      ltv: 'LTV $5–7K',
    },
  ],
} as const

export const close = {
  thanks: 'Thank you.',
  lineLead: 'The city will',
  lineAccent: 'move differently',
  lineTail: 'from here.',
  contact: [
    { icon: 'globe', label: 'www.jedlik.in', href: 'https://www.jedlik.in' },
    { icon: 'mail', label: 'info@jedlik.in', href: 'mailto:info@jedlik.in' },
    { icon: 'instagram', label: 'jedlik.in', href: 'https://instagram.com/jedlik.in' },
    { icon: 'phone', label: '+91 90940 36915', href: 'tel:+919094036915' },
  ],
  buildPhotos: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/build-${n}.jpg`),
  supporters: '/assets/supporters.png',
} as const

/** Beat labels for the progress rail, in scroll order. */
export const beats = [
  { id: 'title', label: 'Jedlik Motors' },
  { id: 'needs', label: 'The need' },
  { id: 'positioning', label: "What's on the road" },
  { id: 'team', label: 'The forces' },
  { id: 'funding', label: 'The fuel' },
  { id: 'tease', label: 'The unveil' },
  { id: 'reveal', label: 'e-POD' },
  { id: 'tech', label: 'The trick' },
  { id: 'market', label: 'Market' },
  { id: 'personas', label: 'Customers' },
  { id: 'close', label: 'Thank you' },
] as const
