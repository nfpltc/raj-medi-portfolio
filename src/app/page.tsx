import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonalHero from "@/components/cinematic/PersonalHero";
import StoryHero from "@/components/cinematic/StoryHero";
import SupplyChainCinematic from "@/components/cinematic/SupplyChainCinematic";
import ExperienceJourney from "@/components/sections/ExperienceJourney";
import Credentials from "@/components/sections/Credentials";
import ContactCinematic from "@/components/sections/ContactCinematic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PersonalHero />
        <StoryHero />
        <SupplyChainCinematic />
        <ExperienceJourney />
        <Credentials />
        <ContactCinematic />
      </main>
      <Footer />
    </>
  );
}
