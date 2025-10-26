// src/app/manifest.ts
// Production note:
// - Keep icons in /public. If you replace images, preserve sizes to avoid iOS/Android quirks.

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tolaris Crown",
    short_name: "Tolaris",
    description:
      "Crowning stays in the heart of Madrid. Executive, Junior, and Royal Suites—crafted for unhurried stays.",
    theme_color: "#F6F1E7",
    background_color: "#F6F1E7",
    display: "standalone",
    start_url: "/",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
