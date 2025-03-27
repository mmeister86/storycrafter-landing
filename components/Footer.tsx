"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

// Footer Komponente für den Seitenabschluss mit Copyright-Informationen und Links
export function Footer() {
  return (
    <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-6 md:px-8 border-t border-[#2a3042] bg-[#131b2a]">
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row items-center">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-[#e6a54c]" />
          <p className="text-sm text-[#a7a7a7]">
            &copy; {new Date().getFullYear()} StoryCrafter. All rights reserved.
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-6 sm:gap-8">
          <Link
            href="#"
            className="text-sm text-[#a7a7a7] hover:text-[#e6a54c] transition-colors py-1"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
