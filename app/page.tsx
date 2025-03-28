import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SignupSection } from "@/components/SignupSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f1521] text-[#e9e9e9]">
      {/* Use the Navbar component */}
      <Navbar />

      <main className="flex-1">
        {/* Neue HeroSection-Komponente verwenden */}
        <HeroSection />

        <SignupSection />

        {/* Use the new FeaturesSection component */}
        <FeaturesSection />
      </main>

      {/* Use the Footer component */}
      <Footer />
    </div>
  );
}
