import { HeroSection } from "./components/HeroSection";
import { SignupSection } from "./components/SignupSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f1521] text-[#e9e9e9]">
      {/* Use the Navbar component */}
      <Navbar />

      <main className="flex-1">
        {/* Neue HeroSection-Komponente verwenden */}
        <HeroSection />

        {/* Use the SignupSection component */}
        <SignupSection />

        {/* Use the new FeaturesSection component */}
        <FeaturesSection />
      </main>

      {/* Use the Footer component */}
      <Footer />
    </div>
  );
}
