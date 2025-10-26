// src/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tolaris Crown",
    short_name: "Tolaris",
    description:
      "Crowning stays in the heart of Madrid — suites, dining, and skyline views.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6E0D25", // burgundy
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
