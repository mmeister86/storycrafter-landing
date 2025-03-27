import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { HeroSection } from "./components/HeroSection";
import { SignupSection } from "./components/SignupSection";
import {
  BookOpen,
  Sparkles,
  Users,
  Layers,
  Palette,
  Share2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f1521] text-[#e9e9e9]">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#2a3042] bg-[#0f1521] z-50 sticky top-0">
        <div className="container mx-auto flex items-center justify-between w-full">
          <Link href="/" className="flex items-center justify-center">
            <BookOpen className="h-6 w-6 mr-2 text-[#e6a54c]" />
            <span className="font-bold text-xl text-[#e6a54c]">
              StoryCrafter
            </span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-[#e6a54c] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#signup"
              className="text-sm font-medium hover:text-[#e6a54c] transition-colors"
            >
              Sign Up
            </Link>
            <AudioPlayer />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {/* Neue HeroSection-Komponente verwenden */}
        <HeroSection />

        {/* Use the SignupSection component */}
        <SignupSection />

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#0f1521]"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-[#c48b3c]/10 px-3 py-1 text-sm text-[#e6a54c]">
                  Coming Soon
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Features for Storytellers
                </h2>
                <p className="max-w-[900px] text-[#a7a7a7] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  StoryCrafter combines AI-powered tools with intuitive
                  interfaces to help you create compelling narratives.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
                <div className="rounded-full bg-[#c48b3c]/10 p-3">
                  <Sparkles className="h-6 w-6 text-[#e6a54c]" />
                </div>
                <h3 className="text-xl font-bold">AI-Assisted Writing</h3>
                <p className="text-center text-[#a7a7a7]">
                  Generate ideas, overcome writer&apos;s block, and enhance your
                  prose with our advanced AI writing assistant.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
                <div className="rounded-full bg-[#c48b3c]/10 p-3">
                  <Layers className="h-6 w-6 text-[#e6a54c]" />
                </div>
                <h3 className="text-xl font-bold">Story Structure Tools</h3>
                <p className="text-center text-[#a7a7a7]">
                  Organize your narrative with powerful tools for plot
                  development, character arcs, and world-building.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
                <div className="rounded-full bg-[#c48b3c]/10 p-3">
                  <Users className="h-6 w-6 text-[#e6a54c]" />
                </div>
                <h3 className="text-xl font-bold">Character Development</h3>
                <p className="text-center text-[#a7a7a7]">
                  Create deep, consistent characters with detailed profiles,
                  relationship maps, and dialogue generation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
                <div className="rounded-full bg-[#c48b3c]/10 p-3">
                  <Palette className="h-6 w-6 text-[#e6a54c]" />
                </div>
                <h3 className="text-xl font-bold">Visual Inspiration</h3>
                <p className="text-center text-[#a7a7a7]">
                  Generate mood boards, character sketches, and scene
                  visualizations to inspire your creative process.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
                <div className="rounded-full bg-[#c48b3c]/10 p-3">
                  <Share2 className="h-6 w-6 text-[#e6a54c]" />
                </div>
                <h3 className="text-xl font-bold">Collaboration</h3>
                <p className="text-center text-[#a7a7a7]">
                  Work seamlessly with co-authors, editors, and team members
                  with real-time collaboration features.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#2a3042] bg-[#131b2a]/50 p-6 backdrop-blur-sm transition-all hover:border-[#c48b3c]/30 hover:bg-[#131b2a]">
                <div className="rounded-full bg-[#c48b3c]/10 p-3">
                  <BookOpen className="h-6 w-6 text-[#e6a54c]" />
                </div>
                <h3 className="text-xl font-bold">Export & Publishing</h3>
                <p className="text-center text-[#a7a7a7]">
                  Export your stories in multiple formats ready for publishing,
                  game development, or content platforms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#2a3042] bg-[#131b2a]">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#e6a54c]" />
            <p className="text-sm text-[#a7a7a7]">
              &copy; {new Date().getFullYear()} StoryCrafter. All rights
              reserved.
            </p>
          </div>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs text-[#a7a7a7] hover:text-[#e6a54c] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-[#a7a7a7] hover:text-[#e6a54c] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-[#a7a7a7] hover:text-[#e6a54c] transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
