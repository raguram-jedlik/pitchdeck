import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import DeckShell from "@/components/DeckShell";
import Hero from "@/components/Hero";
import CommuterNeeds from "@/components/CommuterNeeds";
import QuadrantChart from "@/components/QuadrantChart";
import TeamForces from "@/components/TeamForces";
import RoadmapScrolly from "@/components/RoadmapScrolly";
import ProductReveal from "@/components/ProductReveal";
import BuildingEPod from "@/components/BuildingEPod";
import SteerByWire from "@/components/SteerByWire";
import MarketSize from "@/components/MarketSize";
import Personas from "@/components/Personas";
import Feedback from "@/components/Feedback";
import KnowMoreCta from "@/components/KnowMoreCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollReveal />
      <Nav />
      {/* DeckShell enforces one-section-at-a-time scrolling and provides
          the "View in present mode" button at the bottom of the deck. */}
      <DeckShell title="Jedlik Motors — Brief" sectionSelector=".deck-shell > section">
        <Hero />
        <CommuterNeeds />
        <QuadrantChart />
        <TeamForces />
        <RoadmapScrolly />
        <ProductReveal />
        <SteerByWire />
        <BuildingEPod />
        <MarketSize />
        <Personas />
        <Feedback />
        <KnowMoreCta />
      </DeckShell>
      <Footer />
    </main>
  );
}
