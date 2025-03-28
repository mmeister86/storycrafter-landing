"use client";

import { Waitlist } from "@clerk/nextjs";

export function SignupSection() {
  return (
    <section
      id="signup"
      data-test="signup-section"
      className="w-full py-12 md:py-16 lg:py-20 bg-[#131b2a] border-y border-[#2a3042]"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3 max-w-[900px]">
            <div className="inline-block rounded-full bg-[#c48b3c]/10 px-4 py-1.5 text-base text-[#e6a54c] mb-3 shadow-glow">
              Limited Spots Available
            </div>
            <h2 className="text-6xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Join the StoryCrafter Waitlist
            </h2>
            <p className="text-[#a7a7a7] text-lg md:text-2xl/relaxed">
              Be among the first to experience a new accessible and fun way of
              creating your own story driven games. Early access members receive
              exclusive benefits and regular updates from the development team
              (a.k.a. me).
            </p>
          </div>

          <Waitlist />
        </div>
      </div>
    </section>
  );
}
