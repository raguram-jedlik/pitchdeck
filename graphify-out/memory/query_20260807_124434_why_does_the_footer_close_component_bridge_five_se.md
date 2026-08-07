---
type: "query"
date: "2026-08-07T12:44:34.274142+00:00"
question: "Why does the Footer close component bridge five separate communities - product, brand, hero, institutional backing and supporters - more than any other node except the page root?"
contributor: "graphify"
source_nodes: ["Footer (close) component", "Home()", "QuadrantChart component", "Brand Identity (Jedlik Motors)", "Build Photo Gallery", "Supporters / Incubators", "Close Section", "Institutional Credibility Proof", "Jedlik Wordmark (Light)", "SteerByWire section component with CrabDiagram subcomponent"]
---

# Q: Why does the Footer close component bridge five separate communities - product, brand, hero, institutional backing and supporters - more than any other node except the page root?

## Answer

The Footer is a recapitulation node, not a utility footer. It touches 5 foreign communities on only 11 edges - the highest community-diversity in the graph. Home() has 19 edges but reaches only 3 foreign communities because its edges land on sibling sections; it is a sequencer, not a synthesizer. The mechanism is data consumption: Footer pulls five topically HETEROGENEOUS exports from jedlikData.ts (Brand Identity, Build Photo Gallery, Closing Copy, Contact Info, Supporters/Incubators), while every other section is topically monogamous - TeamForces consumes 3 team exports, MarketSize consumes 3 market exports, ProductReveal and Personas consume 1 each. A closing argument re-touches every thread the deck opened, so the component rendering it inherits edges into every community. Its five bridges: Jedlik Wordmark (Brand Identity & Navigation), Brand Identity data EXTRACTED (Hero/Layout & Brand Story), Institutional Credibility Proof (Institutional Backing & Grants), Close Section spec lines 224-235 (Supporters in Closing Section), and SteerByWire component INFERRED (E-Pod Product). Build Photo Gallery chains to a sixth community, Prototype Build & Fabrication, at depth 2 via the marquee. Caveat: the Footer-to-SteerByWire bridge is conceptually_related_to INFERRED, not EXTRACTED; discounting it leaves 4 hard communities, tied with QuadrantChart. Finding: the design spec Close Section is only 12 lines while the implementation carries the deck's heaviest synthesis load, and the rationale 'Footer auto-marquee of build photos shows manufacturing progress without interaction' exists only in Footer.tsx, never recorded in the spec.

## Source Nodes

- Footer (close) component
- Home()
- QuadrantChart component
- Brand Identity (Jedlik Motors)
- Build Photo Gallery
- Supporters / Incubators
- Close Section
- Institutional Credibility Proof
- Jedlik Wordmark (Light)
- SteerByWire section component with CrabDiagram subcomponent