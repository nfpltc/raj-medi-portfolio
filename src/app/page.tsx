import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCinematic from "@/components/sections/HeroCinematic";
import IntroStatement from "@/components/sections/IntroStatement";
import SupplyChainChapter from "@/components/sections/SupplyChainChapter";
import AnalyticsChapter from "@/components/sections/AnalyticsChapter";
import PlanningChapter from "@/components/sections/PlanningChapter";
import StrategyChapter from "@/components/sections/StrategyChapter";
import ExperienceJourney from "@/components/sections/ExperienceJourney";
import Credentials from "@/components/sections/Credentials";
import ContactCinematic from "@/components/sections/ContactCinematic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroCinematic />
        <IntroStatement />
        <SupplyChainChapter />
        <AnalyticsChapter />
        <PlanningChapter />
        <StrategyChapter />
        <ExperienceJourney />
        <Credentials />
        <ContactCinematic />
      </main>
      <Footer />
    </>
  );
}
