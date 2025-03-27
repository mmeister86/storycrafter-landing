"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";

// Navbar Komponente für die Navigation auf der Seite
export function Navbar() {
  // State für die Mobile-Navigation (geöffnet/geschlossen)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Funktion zum Umschalten des Mobile-Menüs
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#2a3042] bg-[#1b263b] z-50 sticky top-0">
      <div className="container mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center justify-center">
          <BookOpen className="h-6 w-6 mr-2 text-[#e6a54c]" />
          <span className="font-bold text-xl text-[#e6a54c]">StoryCrafter</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          {/* Desktop Navigation - ausgeblendet auf kleinen Bildschirmen */}
          <div className="hidden sm:flex gap-6 items-center">
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
          </div>

          <AudioPlayer />

          {/* Hamburger-Menü Button - nur auf kleinen Bildschirmen sichtbar */}
          <button
            className="sm:hidden ml-4 text-white hover:text-[#e6a54c]"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile-Menü - nur sichtbar, wenn geöffnet */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-[#1b263b] border-b border-[#2a3042] z-50">
          <div className="flex flex-col p-6 space-y-6">
            <Link
              href="#features"
              className="text-base font-medium hover:text-[#e6a54c] transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Features
            </Link>
            <Link
              href="#signup"
              className="text-base font-medium hover:text-[#e6a54c] transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
