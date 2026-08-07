# Graph Report - .  (2026-08-07)

## Corpus Check
- 81 files · ~173,436 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 288 nodes · 377 edges · 34 communities detected
- Extraction: 55% EXTRACTED · 44% INFERRED · 1% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.84)
- Token cost: 332,541 input · 46,122 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Market Sizing & Funding Roadmap|Market Sizing & Funding Roadmap]]
- [[_COMMUNITY_E-Pod Product & Steer-by-Wire|E-Pod Product & Steer-by-Wire]]
- [[_COMMUNITY_Site Architecture & Design Principles|Site Architecture & Design Principles]]
- [[_COMMUNITY_Competitor Set & Positioning|Competitor Set & Positioning]]
- [[_COMMUNITY_Page Composition & Content Data|Page Composition & Content Data]]
- [[_COMMUNITY_Commuter Needs Taxonomy|Commuter Needs Taxonomy]]
- [[_COMMUNITY_Prototype Build & Fabrication|Prototype Build & Fabrication]]
- [[_COMMUNITY_Brand Identity & Navigation|Brand Identity & Navigation]]
- [[_COMMUNITY_Hero, Layout & Brand Story|Hero, Layout & Brand Story]]
- [[_COMMUNITY_Institutional Backing & Grants|Institutional Backing & Grants]]
- [[_COMMUNITY_Positioning Section Rivals|Positioning Section Rivals]]
- [[_COMMUNITY_Team Members & Experience|Team Members & Experience]]
- [[_COMMUNITY_Market Claims & Sources|Market Claims & Sources]]
- [[_COMMUNITY_Supporters in Closing Section|Supporters in Closing Section]]
- [[_COMMUNITY_Team Portrait Assets|Team Portrait Assets]]
- [[_COMMUNITY_Steering Modes & Technology|Steering Modes & Technology]]
- [[_COMMUNITY_Product Reveal Narrative|Product Reveal Narrative]]
- [[_COMMUNITY_Styling Build Config|Styling Build Config]]
- [[_COMMUNITY_Startup TN State Programme|Startup TN State Programme]]
- [[_COMMUNITY_React Strict Mode Setting|React Strict Mode Setting]]
- [[_COMMUNITY_Next.js Type References|Next.js Type References]]
- [[_COMMUNITY_Marquee Keyframe Animation|Marquee Keyframe Animation]]
- [[_COMMUNITY_Legacy Crimson Accent|Legacy Crimson Accent]]
- [[_COMMUNITY_Legacy Deep Crimson|Legacy Deep Crimson]]
- [[_COMMUNITY_Legacy Navy Colour|Legacy Navy Colour]]
- [[_COMMUNITY_Legacy Mist Gradient|Legacy Mist Gradient]]
- [[_COMMUNITY_Paper White Base|Paper White Base]]
- [[_COMMUNITY_Legacy Lime Accent|Legacy Lime Accent]]
- [[_COMMUNITY_Ink Black Base|Ink Black Base]]
- [[_COMMUNITY_Poppins Legacy Typeface|Poppins Legacy Typeface]]
- [[_COMMUNITY_DM Sans Legacy Typeface|DM Sans Legacy Typeface]]
- [[_COMMUNITY_E-Pod Wordmark|E-Pod Wordmark]]
- [[_COMMUNITY_Logo Lockup Tagline|Logo Lockup Tagline]]
- [[_COMMUNITY_2026 Year Marker|2026 Year Marker]]

## God Nodes (most connected - your core abstractions)
1. `Home()` - 19 edges
2. `CommuterNeeds section component (numbered grid)` - 15 edges
3. `QuadrantChart component` - 13 edges
4. `SteerByWire section component with CrabDiagram subcomponent` - 12 edges
5. `Footer (close) component` - 11 edges
6. `MarketSize component` - 10 edges
7. `Jedlik Motors Interactive Pitchdeck Website` - 10 edges
8. `ProductReveal (tease + reveal + callouts) component` - 9 edges
9. `Positioning Section` - 9 edges
10. `Team Section` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Tubular Chassis Frame Welding (two engineers fitting bare tube skeleton)` --references--> `RoadmapScrolly component`  [AMBIGUOUS]
  public/assets/build-5.jpg → src/components/RoadmapScrolly.tsx
- `Title Section` --implements--> `Hero section component`  [INFERRED]
  docs/superpowers/specs/2026-08-05-jedlik-pitchdeck-design.md → src/components/Hero.tsx
- `Urban Street Pencil Sketch (SE Asian city)` --references--> `Hero section component`  [INFERRED]
  public/assets/street-sketch.png → src/components/Hero.tsx
- `Drivetrain Road Test (driver in bare chassis on public road)` --references--> `Hero section component`  [INFERRED]
  public/assets/build-1.jpg → src/components/Hero.tsx
- `Question-Mark Vehicle Silhouette` --implements--> `Nav component (fixed header + scroll progress bar)`  [INFERRED]
  docs/superpowers/specs/2026-08-05-jedlik-pitchdeck-design.md → src/components/Nav.tsx

## Hyperedges (group relationships)
- **Competitive Positioning Quadrant (comfort vs maneuverability)** — jedlikdata_quadrantpoints, jedlik_concept_competitor_set, jedlik_concept_epod [INFERRED 0.85]
- **Phased Funding Roadmap with Valuation Trajectory** — jedlikdata_roadmap, jedlik_concept_roadmap_phases, jedlik_concept_market_sizing [INFERRED 0.85]
- **Three-Persona Market Segmentation** — jedlikdata_personas, jedlik_concept_commuter_needs, jedlik_concept_india_market, jedlik_concept_market_sizing [INFERRED 0.85]
- **Deck narrative flow: need -> product -> trick -> close** — commuterneeds_commuterneeds, productreveal_productreveal, steerbywire_steerbywire, footer_footer [INFERRED 0.85]
- **Scroll-triggered reveal via framer-motion whileInView + viewport once** — commuterneeds_commuterneeds, footer_footer, productreveal_productreveal, steerbywire_steerbywire [EXTRACTED 1.00]
- **brand export reused across hero, nav, footer for wordmark/year** — hero_hero, nav_nav, footer_footer, jedlikdata_brand [EXTRACTED 1.00]
- **whileInView staggered fade-up reveal (delay = i * 0.04-0.08) shared across all five sections** — teamforces_teamforces, personas_personas, quadrantchart_quadrantchart, marketsize_marketsize, roadmapscrolly_roadmapscrolly [EXTRACTED 0.95]
- **Isolated mobile horizontal-scroll container using overflow-x:auto + overflow-y:hidden + [touch-action:pan-y_pan-x]** — teamforces_teamforces, roadmapscrolly_roadmapscrolly [EXTRACTED 0.95]
- **Strict red (#E5091E) / black / paper palette consistently applied across all analytical sections** — marketsize_marketsize, quadrantchart_quadrantchart, personas_personas, roadmapscrolly_roadmapscrolly, teamforces_teamforces [INFERRED 0.85]
- **Eleven-Beat Continuous Investor Narrative** — spec_title_section, spec_needs_section, spec_positioning_section, spec_team_section, spec_funding_section, spec_tease_section, spec_reveal_section, spec_technology_section, spec_market_section, spec_customers_section, spec_close_section [EXTRACTED 1.00]
- **Pitchdeck Visual Token System** — spec_crimson, spec_crimson_deep, spec_navy, spec_mist_gradient, spec_paper, spec_lime, spec_ink, spec_poppins, spec_dm_sans, spec_logo_lockup, spec_year_marker_2026, spec_question_mark_silhouette [EXTRACTED 1.00]
- **Steering Technology Demonstration** — spec_technology_section, spec_steer_by_wire, spec_crab_walk_steering, spec_front_wheel_drive_mode, spec_circle_mode, spec_glide_mode [EXTRACTED 1.00]
- **Jedlik Wordmark Family (Light + Dark)** — logo, logo_dark, logo_mark, logo_mark_dark [EXTRACTED 1.00]
- **Jedlik Full Lockup Variants (with Tagline)** — logo_lockup, logo_png, apple_touch_icon [INFERRED 0.85]
- **Light / Dark Asset Pairings** — logo, logo_dark, logo_mark, logo_mark_dark, light_dark_theming [INFERRED 0.95]
- **Staged Product Reveal Sequence** — epod_blur, epod_silhouette, epod_reveal_uploaded, reveal_mechanic [INFERRED 0.85]
- **Urban Mobility Visual Stage** — street_sketch, ground, ground_plate_composition, urban_commuter_context [INFERRED 0.75]
- **Market Geography Argument Stack** — world_map, market_geography, marketsize_marketsize [INFERRED 0.85]
- **Sequential Jedlik Fabrication Sequence (frame -> suspension/drivetrain -> body -> road test)** — build_5, build_3, build_1, build_4, build_6 [INFERRED 0.85]
- **Evidence Bundle for Working Prototype Validation** — build_1, build_6, jedlik_concept_road_testing, jedlik_concept_prototype_validation [INFERRED 0.85]
- **Engineering Milestones Demonstrated Across Build Photo Set** — jedlik_concept_chassis_fabrication, jedlik_concept_drivetrain_integration, jedlik_concept_body_panel_fabrication, jedlik_concept_prototype_validation, jedlik_concept_team_assembly [INFERRED 0.85]
- **Self-balancing enclosed two-wheeler competitive category** — rival_lit_motors_c1, rival_sina_version_e [INFERRED 0.90]
- **Micro 3-wheel city-pod competitive category** — rival_pmv_ease, rival_wings_robin, rival_tshell_badboy [INFERRED 0.75]
- **Conventional micro-EV / L7e 4-wheel quadricycle category** — rival_gensol_ezio, rival_mg_comet [INFERRED 0.85]
- **Jedlik Founding Team** — team_muthuram, team_nishanthraj, team_raguram, team_shankar, team_srikanthan, team_swathi [INFERRED 0.75]
- **Anna Incubator Logo (3 format duplicates)** — anna_incubator, anna_incubator_svg, anna_incubator_uploaded [EXTRACTED 1.00]
- **Government / Institutional Backing Cluster** — startup_india_dpiit, maarg, nidhi_prayas, startup_tn, anna_incubator, national_startup_recognition, startup_mentorship, government_grant_funding, state_startup_programme, university_incubation [INFERRED 0.85]
- **Urban Congestion Frustrations** — needs_parking, needs_maneuver, needs_speed [INFERRED 0.75]
- **Two-Wheeler Pain Points Jedlik Solves** — needs_weather, needs_helmet, needs_storage, needs_parking [INFERRED 0.85]
- **Dynamic Ride Performance** — needs_comfort, needs_speed, needs_pickup, needs_efficiency [INFERRED 0.85]

## Communities (51 total, 17 thin omitted)

### Community 0 - "Market Sizing & Funding Roadmap"
Cohesion: 0.09
Nodes (30): Geo Expansion Strategy (5 regions), India Two-Wheeler Market Context, TAM/SAM/SOM Market Sizing Framework, Phased Funding Roadmap (Angel→Series-B), Geographic Expansion Map Data, India Market Stats, Market Size Metrics (TAM/SAM/SOM), Customer Personas (3 segments) (+22 more)

### Community 1 - "E-Pod Product & Steer-by-Wire"
Cohesion: 0.13
Nodes (24): e-Pod Blurred Pre-Reveal Frame, e-Pod Reveal Frame (dark/blank), e-Pod Product Hero Render (clean, transparent bg), e-Pod Silhouette (transparent PNG), Desert Sand Ground Plate, Ground-Plate Compositional Device, Crab-Walk Steering Mechanism, E-POD Product Concept (+16 more)

### Community 2 - "Site Architecture & Design Principles"
Cohesion: 0.09
Nodes (23): Strict Black White Red Palette, Centralized Jedlik Content Data, Framer Motion Scroll Entrances, Jedlik Motors Interactive Pitchdeck, Next.js Pitchdeck Site, Reduced Motion Final-State Rule, One Component Per Section, Breakthrough Energy (+15 more)

### Community 3 - "Competitor Set & Positioning"
Cohesion: 0.14
Nodes (22): Enclosed electric scooter / covered 3-wheeler, Micro 3-wheel quadricycle / city pod, Conventional micro-EV / L7e quadricycle (4-wheel), Self-balancing enclosed two-wheeler (gyro-stabilized EV category), Premium / high-tech positioning axis (Jedlik competitor quadrant), Urban last-mile / city pod positioning, QuadrantChart component, Inverse-Y coordinate transform for quadrant scatter plot (+14 more)

### Community 4 - "Page Composition & Content Data"
Cohesion: 0.15
Nodes (18): Home(), Footer (close) component, Commuter Pain Point Taxonomy, Enclosed 2-Wheeler Competitor Set, Founders + IIT-M/VinFast Mentor Strategy, Build Photo Gallery, Closing Copy, Commuter Needs List (10 items) (+10 more)

### Community 5 - "Commuter Needs Taxonomy"
Cohesion: 0.25
Nodes (18): CommuterNeeds section component (numbered grid), Everyday Practicality, Protection from the Elements, Ride Quality & Performance, Urban Space Efficiency, Ride Comfort, Smart Dashboard, Commuter-Needs Icon Design System (+10 more)

### Community 6 - "Prototype Build & Fabrication"
Cohesion: 0.25
Nodes (16): Drivetrain Road Test (driver in bare chassis on public road), Small-Scale Drivetrain Component Test Rig (blue chassis, two motors, electronics), Front Suspension Sub-Assembly with Seat (workshop, chain hoist), Aluminum Body Panel Fabrication (sheet-metal shell formed over frame), Tubular Chassis Frame Welding (two engineers fitting bare tube skeleton), Completed Prototype Road Validation (black enclosed body, windshield, road wheels), Team Assembly Workshop Session (three engineers on yellow/red chassis), Aluminum Body Panel Fabrication (+8 more)

### Community 7 - "Brand Identity & Navigation"
Cohesion: 0.31
Nodes (15): Jedlik Apple Touch Icon, Brand Palette — Black / White / Jedlik Red (#E5091E), Light / Dark Theming System, Jedlik Wordmark (Light), Jedlik Wordmark (Dark), Jedlik Logo Lockup with Tagline, Jedlik Wordmark Compact (Light), Jedlik Wordmark Compact (Dark) (+7 more)

### Community 8 - "Hero, Layout & Brand Story"
Cohesion: 0.16
Nodes (14): Font Setup (Space Grotesk + Inter), Document Metadata (title, OG), Root Layout Component, Hero section component, Printed Prospectus Design Ethos, Ányos Jedlik 1828 Legacy Rationale, Brand Identity (Jedlik Motors), Hero carries the brand statement; product is withheld until later (+6 more)

### Community 9 - "Institutional Backing & Grants"
Cohesion: 0.24
Nodes (12): Anna University Incubator (PNG mark), Anna Incubator (SVG wordmark), Anna Incubator (uploaded PNG duplicate), Government Grant Funding (DST NIDHI-PRAYAS, Seed Fund), Institutional Credibility Proof, MAARG (Startup India Mentorship Programme), National Government Startup Recognition (DPIIT / Startup India), NIDHI-PRAYAS (DST pre-incubation grant) (+4 more)

### Community 10 - "Positioning Section Rivals"
Cohesion: 0.22
Nodes (9): Gensol EV/Ezio, Jedlik Positioning, Lit Motors C-1, MG Comet, PMV Eas-E, Positioning Section, Sina Version-E, T-Shell Bad Boy (+1 more)

### Community 11 - "Team Members & Experience"
Cohesion: 0.22
Nodes (9): 15+ Years Automotive Design Experience, Muthuram B, Nishanthraj GV, Raguram SK, Sertel Naming Correction, Shankar Subramanian, Srikanthan Sridharan, Swathi Thombarappu (+1 more)

### Community 12 - "Market Claims & Sources"
Cohesion: 0.22
Nodes (9): India Enclosed e-2W Opportunity, Market Expansion Regions, Market Section, Enclosed Weatherproof SAM, SIAM 2024, Market Citation Gap, Jedlik 2030 SOM, Sources Footer Note (+1 more)

### Community 13 - "Supporters in Closing Section"
Cohesion: 0.29
Nodes (7): Anna Incubator, Close Section, DPIIT Startup India, DST NIDHI PRAYAS, EDII-TN, MAARG, Startup India Seed Fund Scheme

### Community 14 - "Team Portrait Assets"
Cohesion: 0.29
Nodes (7): Jedlik Founding Team (credibility section), Muthuram (Team Member Portrait), Nishanthraj (Team Member Portrait), Raguram (Team Member Portrait), Shankar (Team Member Portrait), Srikanthan (Team Member Portrait), Swathi (Team Member Portrait)

### Community 15 - "Steering Modes & Technology"
Cohesion: 0.33
Nodes (6): Circle Mode, Crab-Walk Steering, Front Wheel Drive Mode, Glide Mode, Steer-by-Wire, Technology Section

### Community 16 - "Product Reveal Narrative"
Cohesion: 0.4
Nodes (6): e-POD, Product Withholding Spine, Progress Rail, Question-Mark Vehicle Silhouette, Reveal Section, Tease Section

## Ambiguous Edges - Review These
- `Hero section component` → `Sections reveal via framer-motion whileInView with viewport={ once: true } — fade + slide on first appearance`  [AMBIGUOUS]
  src/components/Hero.tsx · relation: semantically_similar_to
- `RoadmapScrolly component` → `Tubular Chassis Frame Welding (two engineers fitting bare tube skeleton)`  [AMBIGUOUS]
  public/assets/build-5.jpg · relation: references
- `Jedlik Wordmark (Light)` → `Jedlik Uploaded Logo (Legacy)`  [AMBIGUOUS]
  public/assets/logo-uploaded.png · relation: references
- `e-Pod Reveal Frame (dark/blank)` → `e-Pod Product Hero Render (clean, transparent bg)`  [AMBIGUOUS]
  public/assets/epod-reveal.jpg · relation: conceptually_related_to
- `Lit Motors C-1 (self-balancing enclosed 2-wheeler)` → `PMV EaS-E (micro 3-wheel quadricycle)`  [AMBIGUOUS]
  public/assets/rival-lit-motors-c1.png · relation: semantically_similar_to

## Knowledge Gaps
- **104 isolated node(s):** `Next.js Config (reactStrictMode)`, `Next.js Type References`, `Tailwind Config (strict B/W/R theme)`, `Marquee Keyframe Animation`, `PostCSS Config (tailwindcss + autoprefixer)` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Hero section component` and `Sections reveal via framer-motion whileInView with viewport={ once: true } — fade + slide on first appearance`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `RoadmapScrolly component` and `Tubular Chassis Frame Welding (two engineers fitting bare tube skeleton)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Jedlik Wordmark (Light)` and `Jedlik Uploaded Logo (Legacy)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `e-Pod Reveal Frame (dark/blank)` and `e-Pod Product Hero Render (clean, transparent bg)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Lit Motors C-1 (self-balancing enclosed 2-wheeler)` and `PMV EaS-E (micro 3-wheel quadricycle)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `Home()` connect `Page Composition & Content Data` to `Hero, Layout & Brand Story`, `Market Sizing & Funding Roadmap`, `E-Pod Product & Steer-by-Wire`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Why does `Footer (close) component` connect `Page Composition & Content Data` to `E-Pod Product & Steer-by-Wire`, `Brand Identity & Navigation`, `Hero, Layout & Brand Story`, `Institutional Backing & Grants`, `Supporters in Closing Section`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._