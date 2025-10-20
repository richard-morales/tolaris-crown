// src/components/Gallery.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt?: string };

export default function Gallery({
  images,
  className = "",
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, images.length]);

  function openAt(i: number) {
    setIndex(i);
    setIsLightboxOpen(true);
  }

  function scrollBy(delta: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className={className}>
      {/* Slider */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openAt(i)}
              className="relative h-64 w-[85vw] max-w-[520px] shrink-0 snap-start overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-champagne md:h-72"
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt ?? `Photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 85vw, 520px"
                className="object-cover"
                priority={i < 2}
              />
              {/* subtle gradient at bottom for polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </button>
          ))}
        </div>

        {/* Scroll arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
          <button
            onClick={() => scrollBy(-400)}
            className="pointer-events-auto hidden rounded-full bg-white/90 p-2 shadow backdrop-blur transition hover:bg-white md:inline-flex"
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
          <button
            onClick={() => scrollBy(400)}
            className="pointer-events-auto hidden rounded-full bg-white/90 p-2 shadow backdrop-blur transition hover:bg-white md:inline-flex"
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
        >
          {/* Image layer (slightly lower) */}
          <div className="relative z-[100] flex h-full items-center justify-center p-4">
            <div className="relative aspect-[16/10] w-full max-w-6xl">
              <Image
                src={images[index].src}
                alt={images[index].alt ?? `Lightbox ${index + 1}`}
                fill
                sizes="100vw"
                className="rounded-xl object-contain"
                priority
              />
            </div>
          </div>

          {/* Controls layer (always above the image) */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 z-[110] rounded-full bg-black/70 p-2 text-white shadow-lg transition hover:bg-black/80"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/70 p-3 text-white shadow-lg transition hover:bg-black/80"
            aria-label="Previous image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/70 p-3 text-white shadow-lg transition hover:bg-black/80"
            aria-label="Next image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
