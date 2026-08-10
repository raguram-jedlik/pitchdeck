import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/Hero";
import CommuterNeeds from "@/components/CommuterNeeds";
import QuadrantChart from "@/components/QuadrantChart";
import TeamForces from "@/components/TeamForces";
import RoadmapScrolly from "@/components/RoadmapScrolly";
import ProductReveal from "@/components/ProductReveal";
import SteerByWire from "@/components/SteerByWire";
import MarketSize from "@/components/MarketSize";
import Personas from "@/components/Personas";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollReveal />
      <Nav />
      <Hero />
      <CommuterNeeds />
      <QuadrantChart />
      <TeamForces />
      <RoadmapScrolly />
      <ProductReveal />
      <SteerByWire />
      <MarketSize />
      <Personas />
      <Footer />
    </main>
  );
}
