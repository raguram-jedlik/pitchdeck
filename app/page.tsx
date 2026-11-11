import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import DeckShell from "@/components/DeckShell";
import Hero from "@/components/Hero";
import CommuterNeeds from "@/components/CommuterNeeds";
import QuadrantChart from "@/components/QuadrantChart";
import TeamForces from "@/components/TeamForces";
import RoadmapScrolly from "@/components/RoadmapScrolly";
import ProductReveal from "@/components/ProductReveal";
import B2BFleet from "@/components/B2BFleet";
import BuildingEPod from "@/components/BuildingEPod";
import SteerByWire from "@/components/SteerByWire";
import MarketSize from "@/components/MarketSize";
import Personas from "@/components/Personas";
import MediaCoverage from "@/components/MediaCoverage";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollReveal />
      <Nav />
      {/* DeckShell enforces one-section-at-a-time scrolling: every section
          is exactly one screen tall and its content is scaled to fit, so
          the whole deck is read one page at a time. */}
      <DeckShell
        title="Jedlik Motors — Brief"
        sectionSelector=".deck-shell > section"
        fitToViewport
        extraFitSelector="#site-footer"
      >
        <Hero />
        <CommuterNeeds />
        <QuadrantChart />
        <TeamForces />
        <RoadmapScrolly />
        <ProductReveal />
        <B2BFleet />
        <SteerByWire />
        <BuildingEPod />
        <MarketSize />
        <Personas />
        <MediaCoverage />
        <Feedback />
      </DeckShell>
      <Footer />
    </main>
  );
}
