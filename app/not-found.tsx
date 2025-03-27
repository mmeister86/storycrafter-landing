import Link from "next/link";
import { BookX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f1521] text-[#e9e9e9] items-center justify-center">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full">
        <div className="container max-w-3xl mx-auto text-center space-y-8">
          {/* Symbol und Überschrift */}
          <div className="space-y-4">
            <BookX className="h-24 w-24 mx-auto text-[#e6a54c] opacity-80" />
            <h1 className="text-4xl md:text-8xl font-bold text-[#e6a54c] shadow-glow animation-flicker scanline-text">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold pt-4">
              Page Not Found. Really. I&apos;ve looked everywhere. How
              embarrassing for both of us.
            </h2>
          </div>

          {/* Beschreibung */}
          <p className="text-lg text-[#a7a7a7] max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to another realm.
          </p>

          {/* Zurück zur Startseite Button */}
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1b263b] hover:bg-[#263550] px-6 py-3 rounded-lg text-[#e6a54c] transition-colors border border-[#2a3042] shadow-glow"
            >
              <Home className="h-5 w-5" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
