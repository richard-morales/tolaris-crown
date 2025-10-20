// src/app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <main className="bg-ivory text-burgundy">
        {/* HERO SECTION */}
        <section className="relative isolate h-[70vh] min-h-[500px] overflow-hidden">
          <Image
            src="/images/lobby/luxury-hotel-lobby-chandelier.png"
            alt="Luxurious hotel lobby with chandelier and elegant seating"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-16 text-center text-ivory">
            <h1 className="font-serif text-5xl md:text-6xl drop-shadow-sm">
              About Tolaris Crown
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              A crown jewel in the heart of Madrid — where timeless
              architecture, Spanish warmth, and modern refinement meet in
              perfect harmony.
            </p>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">
            A Heritage Reimagined
          </h2>
          <p className="mt-6 text-lg text-taupe leading-relaxed">
            In a century-old landmark on Gran Vía, Tolaris Crown was born from a
            love for art, architecture, and human connection. Our spaces were
            carefully restored to preserve their character — vaulted ceilings,
            marble columns, and hand-blown chandeliers — while embracing today’s
            comfort and elegance.
          </p>
        </section>

        {/* IMMERSIVE IMAGE STRIP (polished w/ controls) */}
        <section className="relative isolate">
          {(() => {
            // Local state/logic just for this section
            // (AboutPage is already a client component, so hooks are fine here.)
            const images = [
              "/images/lobby/reception-1.png",
              "/images/lobby/luxury-hotel-lobby-chandelier.png",
              "/images/rooftop/rooftop-night.png",
              "/images/restaurant/restaurant-interior.png",
              "/images/spa/spa-pool.png",
            ];

            // Lazy-init hooks to avoid redeclarations in JSX
            // (put these at the top of your component if you prefer)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { useEffect, useRef, useState } = require("react");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scrollerRef = useRef<HTMLDivElement>(null);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [canLeft, setCanLeft] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [canRight, setCanRight] = useState(true);

            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              const el = scrollerRef.current;
              if (!el) return;

              const update = () => {
                const { scrollLeft, scrollWidth, clientWidth } = el;
                setCanLeft(scrollLeft > 0);
                setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
              };

              update();
              el.addEventListener("scroll", update, { passive: true });
              window.addEventListener("resize", update);
              return () => {
                el.removeEventListener("scroll", update as any);
                window.removeEventListener("resize", update);
              };
            }, []);

            const scrollByAmount = (delta: number) => {
              const el = scrollerRef.current;
              if (!el) return;
              // Try to scroll roughly one card at a time
              const card = el.querySelector<HTMLElement>("[data-card]");
              const step = card ? card.offsetWidth + 24 /* mx */ : 400;
              el.scrollBy({ left: delta * step, behavior: "smooth" });
            };

            return (
              <div className="relative">
                {/* Horizontal cards */}
                <div
                  ref={scrollerRef}
                  className="
            flex gap-6 overflow-x-auto pb-2
            snap-x snap-mandatory scroll-smooth
          "
                  aria-label="Hotel highlights gallery"
                >
                  {images.map((src, i) => (
                    <div
                      key={i}
                      data-card
                      className="
                relative h-[60vh] w-[85vw] max-w-[900px]
                shrink-0 snap-start overflow-hidden rounded-3xl
              "
                    >
                      <Image
                        src={src}
                        alt={`Hotel photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 85vw, 900px"
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        priority={i === 0}
                      />
                      {/* Subtle edge vignette for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Left / Right arrow controls */}
                {/* Left */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="button"
                    onClick={() => scrollByAmount(-1)}
                    disabled={!canLeft}
                    className={`
              pointer-events-auto hidden md:inline-flex items-center justify-center
              rounded-full p-2 shadow
              transition opacity-90 hover:opacity-100
              ${
                canLeft
                  ? "bg-black/70 text-white"
                  : "bg-black/20 text-white/50 cursor-not-allowed"
              }
            `}
                    aria-label="Scroll gallery left"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 6l-6 6 6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Right */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <button
                    type="button"
                    onClick={() => scrollByAmount(1)}
                    disabled={!canRight}
                    className={`
              pointer-events-auto hidden md:inline-flex items-center justify-center
              rounded-full p-2 shadow
              transition opacity-90 hover:opacity-100
              ${
                canRight
                  ? "bg-black/70 text-white"
                  : "bg-black/20 text-white/50 cursor-not-allowed"
              }
            `}
                    aria-label="Scroll gallery right"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })()}
        </section>

        {/* OUR STORY (text + image grid) */}
        <section className="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 items-center">
          <div className="min-w-0">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Our Story</h2>
            <p className="text-taupe leading-relaxed">
              The story of Tolaris Crown is one of passion and craft. Every
              space was curated with intention — from the lobby’s soft amber
              light to the scent of fresh lilies that welcomes you each morning.
              Our team believes luxury is not excess; it’s attention, empathy,
              and quiet excellence.
            </p>
          </div>

          {/* IMPORTANT: min-w-0/min-h-0 so the image wrapper can shrink in grid */}
          <div className="min-w-0 min-h-0">
            <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/2] rounded-3xl overflow-hidden shadow">
              <Image
                src="/images/lobby/reception-1.png"
                alt="Reception"
                fill
                className="object-cover object-center"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>

        {/* CUISINE SECTION */}
        <section className="relative isolate py-24">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/restaurant/buffet-overview.png"
              alt="Buffet with Spanish cuisine"
              fill
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 to-ivory/60" />
          </div>

          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Craft & Cuisine
              </h2>
              <p className="text-taupe leading-relaxed">
                Our chefs celebrate Spanish heritage through seasonal
                ingredients and creative mastery. From rooftop breakfasts kissed
                by morning light to candlelit dinners beneath chandeliers,
                dining at Tolaris Crown is an invitation to slow down and savor.
              </p>
            </div>

            {/* Image block with min-w-0/min-h-0 + aspect ratio */}
            <div className="min-w-0 min-h-0">
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/2] rounded-3xl overflow-hidden shadow">
                <Image
                  src="/images/restaurant/team-of-chefs-fine-dining-kitchen.png"
                  alt="Chef team preparing dishes"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WELLNESS */}
        <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Image first on small screens */}
          <div className="min-w-0 min-h-0">
            <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/2] rounded-3xl overflow-hidden shadow">
              <Image
                src="/images/spa/relax-lounge.png"
                alt="Spa relaxation lounge"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Wellness & Balance
            </h2>
            <p className="text-taupe leading-relaxed">
              The Tolaris Crown Spa and Fitness center provide a sanctuary of
              calm in the heart of the city. Step into warm serenity, let time
              stretch, and find peace beneath the soft glow of marble arches.
            </p>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="relative bg-burgundy text-ivory py-28">
          <div className="absolute inset-0">
            <Image
              src="/images/staff/doorman.png"
              alt="Doorman greeting guests"
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Our Philosophy
            </h2>
            <p className="text-lg text-ivory/90 leading-relaxed">
              Good service is human. It’s remembering your favorite tea, helping
              plan a morning run through Retiro, or greeting you by name after a
              long day. At Tolaris Crown, we believe that true luxury is warmth,
              sincerity, and grace.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/rooms"
                className="rounded-xl bg-champagne px-6 py-3 font-medium text-burgundy hover:bg-champagne/90 transition"
              >
                See our suites
              </Link>
              <Link
                href="/book"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`rounded-xl px-6 py-3 font-medium transition ${
                  hovered
                    ? "bg-ivory text-burgundy"
                    : "bg-transparent border border-ivory text-ivory"
                }`}
              >
                Book your stay
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
