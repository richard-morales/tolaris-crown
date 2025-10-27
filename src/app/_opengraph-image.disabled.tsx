// src/app/opengraph-image.tsx
/**
 * Production notes
 * - Edge runtime for low latency.
 * - Full-bleed hero photo as background.
 * - Subtle overlay to ensure legible title/strapline.
 * - 1200x630 PNG to satisfy OG validators (WhatsApp/Facebook).
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tolaris Crown — Madrid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Absolute URL so the OG renderer can fetch the image reliably.
const siteUrl =
  process.env.APP_BASE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://tolaris-crown.vercel.app";

const heroUrl = new URL("/images/hero/rooftop-hero.png", siteUrl).toString();

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundImage: `url(${heroUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily:
            "Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* darken image for contrast */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.45))",
          }}
        />
        {/* lockup */}
        <div
          style={{
            position: "absolute",
            left: 48,
            bottom: 48,
            right: 48,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>
            Tolaris Crown
          </div>
          <div style={{ fontSize: 32, opacity: 0.95 }}>
            Crowning Stays in the Heart of Madrid
          </div>
        </div>
      </div>
    ),
    size
  );
}
