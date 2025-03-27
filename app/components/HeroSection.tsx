"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { RetroGrid } from "@/components/retro-grid";
import DecisionDemo from "@/components/decision-demo";

export function HeroSection() {
  // Zustand, um zu verfolgen, ob die Demo-Komponente die Schwellenhöhe erreicht hat
  const [isDemoTallEnough, setIsDemoTallEnough] = useState(false);

  // Ref, um auf das Container-Div der DecisionDemo-Komponente zuzugreifen
  const demoContainerRef = useRef<HTMLDivElement>(null);

  // Definiert die Schwellenhöhe in Pixeln
  const THRESHOLD_HEIGHT = 400; // Anpassen nach Bedarf

  // Effekt zum Einrichten des ResizeObserver
  useEffect(() => {
    // Speichert den aktuellen Ref-Wert in einer Variablen
    const currentRef = demoContainerRef.current;

    // Erstellt einen ResizeObserver, der auf Größenänderungen des beobachteten Elements reagiert
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Holt die aktuelle Höhe des Elements
        const currentHeight = entry.contentRect.height;
        // Aktualisiert den Zustand basierend darauf, ob die Höhe den Schwellenwert erreicht
        setIsDemoTallEnough(currentHeight >= THRESHOLD_HEIGHT);
      }
    });

    // Wenn das Ref-Element vorhanden ist, beginnt die Beobachtung
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Aufräumfunktion: Stoppt die Beobachtung, wenn die Komponente unmounted wird
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal beim Mounten ausgeführt wird

  return (
    <section
      // Verwendet min-height von 75vh und wächst bei Bedarf, mit angemessenem Padding
      className={`w-full bg-[#0f1521] relative overflow-hidden transition-all duration-300 ease-in-out
        min-h-[75vh] py-8 flex flex-col justify-center ${
          isDemoTallEnough ? "h-auto" : "h-[75vh]"
        }`}
    >
      {/* RetroGrid background mit angepasstem Winkel für bessere Sichtbarkeit */}
      <RetroGrid angle={55} />

      <div className="container px-4 md:px-6 relative z-1 flex-grow flex flex-col justify-center">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-8xl/[5rem] text-[#e6a54c] relative scanline-text shadow-glow animation-flicker">
                Build and play captivating stories
              </h1>
              <p className="max-w-[700px] text-white py-4 md:text-xl">
                StoryCrafter is coming - an intuitive platform with an intuitive
                drag-and-drop builder that lets you create interactive stories
                effortlessly. Create your world and characters, share your
                creations or explore stories from our growing community of
                storytellers. All of this and more with a pleasing 90s retro
                aesthetic.
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
          {/* Fügt das Ref zum Container der DecisionDemo-Komponente hinzu */}
          <div
            ref={demoContainerRef}
            className="flex items-center justify-center"
          >
            <DecisionDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
