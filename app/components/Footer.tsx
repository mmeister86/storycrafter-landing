import Link from "next/link";
import { BookOpen } from "lucide-react";

// Footer Komponente für den Seitenabschluss mit Copyright-Informationen und Links
export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#2a3042] bg-[#131b2a]">
      <div className="container mx-auto flex flex-col gap-2 sm:flex-row items-center">
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
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
