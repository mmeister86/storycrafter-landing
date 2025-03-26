import Link from "next/link";
import Image from "next/image";
import { SignUpForm } from "@/components/sign-up-form";
import { RetroGrid } from "@/components/retro-grid";
import DecisionDemo from "@/components/decision-demo";
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
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#2a3042] bg-[#0f1521] z-10 relative">
        <div className="container mx-auto flex items-center justify-between w-full">
          <Link href="/" className="flex items-center justify-center">
            <BookOpen className="h-6 w-6 mr-2 text-[#e6a54c]" />
            <span className="font-bold text-xl text-[#e6a54c]">
              StoryCrafter
            </span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
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
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {/* Update the hero section to better showcase the grid */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#0f1521] relative overflow-hidden">
          {/* RetroGrid background with adjusted angle for better visibility */}
          <RetroGrid angle={55} />

          <div className="container px-4 md:px-6 relative z-1">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#e6a54c]">
                    Craft Your Stories with <br />
                    AI-Powered Precision
                  </h1>
                  <p className="max-w-[600px] text-[#a7a7a7] md:text-xl">
                    StoryCrafter is coming soon — an innovative platform that
                    helps writers, game developers, and content creators build
                    rich, immersive narratives with AI assistance.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#signup"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#c48b3c] px-8 text-sm font-medium text-[#0f1521] shadow transition-colors hover:bg-[#e6a54c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e6a54c]"
                  >
                    Get Early Access
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#2a3042] bg-[#131b2a]/80 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#1a2436] hover:border-[#c48b3c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e6a54c]"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <DecisionDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Prominently featured waitlist form */}
        <section
          id="signup"
          className="w-full py-12 md:py-16 bg-[#131b2a] border-y border-[#2a3042]"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-block rounded-full bg-[#c48b3c]/10 px-3 py-1 text-sm text-[#e6a54c] mb-2">
                  Limited Spots Available
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join the StoryCrafter Waitlist
                </h2>
                <p className="text-[#a7a7a7] md:text-xl/relaxed">
                  Be among the first to experience the future of storytelling.
                  Early access members receive exclusive benefits and lifetime
                  discounts.
                </p>
              </div>
              <div className="w-full max-w-md mt-6">
                <SignUpForm />
              </div>
            </div>
          </div>
        </section>

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
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#e6a54c]" />
          <p className="text-sm text-[#a7a7a7]">
            &copy; {new Date().getFullYear()} StoryCrafter. All rights reserved.
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
      </footer>
    </div>
  );
}
