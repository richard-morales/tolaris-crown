// src/app/opengraph-image.tsx
// Generates a rich OG image at /opengraph-image (1200x630)
// You can later switch the background to a brand photo.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1b1b1b 0%, #3a0d17 45%, #6E0D25 100%)",
          color: "white",
          padding: 64,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI",
        }}
      >
        <div style={{ fontSize: 54, lineHeight: 1.1 }}>
          <span style={{ opacity: 0.9 }}>Tolaris Crown</span>
          <div style={{ fontSize: 28, opacity: 0.85, marginTop: 12 }}>
            Crowning stays in the heart of Madrid
          </div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.9 }}>
          Executive · Junior · Royal Suites
        </div>
      </div>
    ),
    { ...size }
  );
}
