"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate text-ivory">
      {/* Curved top divider (always shows, no matter the section above) */}
      <div className="absolute -top-px inset-x-0 text-ivory" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full"
        >
          <path
            d="M0,64 C360,0 1080,0 1440,64 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Rich, distinctive background */}
      <div className="relative bg-gradient-to-b from-burgundy to-[#21090b]">
        {/* Champagne glints / soft texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(1200px_500px_at_20%_0%,#F3E0C7,transparent),radial-gradient(800px_400px_at_80%_30%,#F3E0C7,transparent)]"
        />

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-18 md:py-20 flex flex-col items-center text-center gap-8 md:gap-10">
          {/* Logo */}
          <div className="relative h-[78px] w-[360px] md:h-[90px] md:w-[420px]">
            <Image
              src="/images/branding/logo-richard-morales-full-stack-developer.png"
              alt="Richard Morales — Full-Stack Developer"
              fill
              className="object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
              priority
            />
          </div>

          {/* Slogan */}
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-ivory/95 max-w-3xl">
            <span className="font-semibold text-champagne">
              Richard Morales
            </span>{" "}
            — full-stack solutions for real businesses.
          </p>

          {/* Divider */}
          <div className="h-px w-24 md:w-28 bg-champagne/70 rounded-full" />

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <Link
              href="https://richard-morales.github.io/#about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] md:text-base tracking-wide text-ivory/85 hover:text-champagne transition-colors"
            >
              About
            </Link>
            <Link
              href="https://richard-morales.github.io/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] md:text-base tracking-wide text-ivory/85 hover:text-champagne transition-colors"
            >
              Contact
            </Link>
            <Link
              href="https://github.com/richard-morales"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] md:text-base tracking-wide text-ivory/85 hover:text-champagne transition-colors"
            >
              GitHub
            </Link>
          </nav>

          {/* Copyright */}
          <p className="mt-4 text-sm md:text-[15px] text-ivory/70">
            © {year} Richard Morales. All rights reserved.
          </p>
        </div>

        {/* Bottom subtle glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent"
        />
      </div>
    </footer>
  );
}
