"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmail("");
    alert("Thanks! We’ll be in touch soon.");
  }

  return (
    <section className="relative isolate">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/rooftop-hero.png"
          alt="Breakfast with a skyline view over Madrid from Tolaris Crown rooftop"
          fill
          priority
          className="object-cover"
        />
        {/* soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-36">
        <div className="max-w-2xl text-ivory">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            New: Rooftop Sunrise Breakfast
          </span>

          <h1 className="mt-4 font-serif text-4xl leading-tight drop-shadow md:text-6xl">
            Crowning Stays in the Heart of Madrid
          </h1>

          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/85">
            Wake to skyline views, golden interiors, and warm Spanish service.
            Executive, Junior, and Royal Suites—each crafted for unhurried
            stays.
          </p>

          {/* CTA strip */}
          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex w-full max-w-lg items-center gap-3 rounded-2xl bg-white/90 p-2 backdrop-blur"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for offers & news"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-burgundy placeholder:text-taupe/70 focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-burgundy px-4 py-3 text-sm font-medium text-ivory hover:bg-burgundy/90"
            >
              Keep me posted
            </button>
          </form>
        </div>
      </div>

      {/* (Optional) seam guard: a 1px bar to hide any hairline gap */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-ivory" />
    </section>
  );
}
