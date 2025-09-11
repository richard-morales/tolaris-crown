// src/components/rooms/gallery.tsx
// Click-to-open lightbox gallery with keyboard navigation.
// - Click a thumbnail to open
// - Esc closes, ←/→ navigate
// - Click backdrop or Close button to dismiss

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryProps = {
  images: string[];
  name: string;
};

export default function Gallery({ images, name }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  if (!images?.length) return null;

  return (
    <>
      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-black/15"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            aria-label={`Open ${name} photo ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${name} photo ${i + 1}`}
              fill
              sizes="(min-width:1024px) 320px, 50vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} gallery`}
          onClick={close}
        >
          {/* Prevent backdrop click from closing when clicking inside the content */}
  <div
  className="relative w-full max-w-[min(90vw,1200px)] h-[80vh] rounded-2xl bg-black/20 outline-none"
  onClick={(e) => e.stopPropagation()}
>
  <Image
    src={images[index]}
    alt={`${name} photo large`}
    fill
    sizes="(min-width:1024px) 1200px, 90vw"
    className="object-contain"
    priority
  />
            {/* Controls */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black/70 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-white/40"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/70 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-white/40"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/70 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-white/40"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Counter */}
                <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {index + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
