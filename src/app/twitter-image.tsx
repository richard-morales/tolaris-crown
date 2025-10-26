// src/app/twitter-image.tsx
// Production note:
// - Twitter/X will use this endpoint for large summary cards.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background:
            "linear-gradient(135deg, #2B0D0F 0%, #5A1F26 35%, #B48A76 100%)",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            color: "white",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Tolaris Crown
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Golden interiors. Skyline views. Warm Spanish service.
        </div>
      </div>
    ),
    size
  );
}
