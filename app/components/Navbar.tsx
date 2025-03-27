import Link from "next/link";
import { BookOpen } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";

// Navbar Komponente für die Navigation auf der Seite
export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#2a3042] bg-[#1b263b] z-50 sticky top-0">
      <div className="container mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center justify-center">
          <BookOpen className="h-6 w-6 mr-2 text-[#e6a54c]" />
          <span className="font-bold text-xl text-[#e6a54c]">StoryCrafter</span>
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
  );
}
