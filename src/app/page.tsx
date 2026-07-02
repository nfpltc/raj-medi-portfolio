import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCinematic from "@/components/sections/HeroCinematic";
import IntroStatement from "@/components/sections/IntroStatement";
import NetworkFlow from "@/components/sections/NetworkFlow";
import AnalyticsDashboard from "@/components/sections/AnalyticsDashboard";
import ForecastAlignment from "@/components/sections/ForecastAlignment";
import StrategyArchitecture from "@/components/sections/StrategyArchitecture";
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
        <NetworkFlow />
        <AnalyticsDashboard />
        <ForecastAlignment />
        <StrategyArchitecture />
        <ExperienceJourney />
        <Credentials />
        <ContactCinematic />
      </main>
      <Footer />
    </>
  );
}
