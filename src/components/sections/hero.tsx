// src/components/sections/hero.tsx
"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  function onSubmit(e: FormEvent) {
    e.preventDefault(); // placeholder: we’ll wire this later
  }

  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-none">
      {/* Background image (falls back to a gradient if the file is missing) */}
      <div className="absolute inset-0">
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(74,28,28,0.25),_transparent_35%,_rgba(0,0,0,0.35)_100%)]" />
        {/* Image */}
        <Image
          src="/images/hero-madrid.png"
          alt="Rooftop view of Madrid at Tolaris Crown"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full grid place-items-center px-4">
        <div className="text-center max-w-3xl space-y-5">
          <h1 className="font-serif text-4xl md:text-6xl text-ivory leading-tight">
            Tolaris Crown
          </h1>
          <p className="text-ivory/90 md:text-lg">
            Crowning Stays in the Heart of Madrid
          </p>

          {/* Booking bar (non-functional for now) */}
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-6 w-full max-w-3xl bg-ivory/90 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <label className="block text-left">
                <span className="text-xs text-taupe/80">Check-in</span>
                <input
                  type="date"
                  className="mt-1 w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
                  aria-label="Check-in date"
                />
              </label>

              <label className="block text-left">
                <span className="text-xs text-taupe/80">Check-out</span>
                <input
                  type="date"
                  className="mt-1 w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
                  aria-label="Check-out date"
                />
              </label>

              <label className="block text-left">
                <span className="text-xs text-taupe/80">Guests</span>
                <input
                  type="number"
                  min={1}
                  defaultValue={2}
                  className="mt-1 w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
                  aria-label="Number of guests"
                />
              </label>

              <div className="flex items-end">
                <Button
                  type="submit"
                  className="w-full h-11 bg-champagne text-burgundy hover:bg-champagne/90"
                >
                  Check Availability
                </Button>
              </div>
            </div>
          </form>

          <p className="text-ivory/80 text-xs">
            Rooftop bar • Spanish-fusion dining • Luxury spa
          </p>
        </div>
      </div>
    </section>
  );
}
