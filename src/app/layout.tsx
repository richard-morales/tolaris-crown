// src/app/layout.tsx
/**
 * Next.js App Router layout
 * ----------------------------------------------------------------------
 * - Exports full Metadata (SEO + social cards + app icons + manifest).
 * - Uses APP_BASE_URL (or NEXTAUTH_URL) to produce absolute URLs in OG/Twitter.
 * - Keeps your existing providers/components unchanged.
 * - Add /icon.png (512x512), /apple-icon.png (180x180) under /app.
 * - Add /opengraph-image.tsx, /twitter-image.tsx, /manifest.ts as provided.
 * ----------------------------------------------------------------------
 */

import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SessionProviderRoot from "@/components/providers/session-provider";
import Header from "@/components/layout/header";

/** --- Fonts (unchanged) --- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/** --- Site URL for absolute metadata links (OG/Twitter) --- */
const siteUrl =
  process.env.APP_BASE_URL ||
  process.env.NEXTAUTH_URL ||
  "http://localhost:3000";

/** --- Metadata: title/description, icons, OG/Twitter, manifest --- */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tolaris Crown — Madrid",
    template: "%s · Tolaris Crown",
  },
  description:
    "Crowning stays in the heart of Madrid — suites, dining, skyline views, and warm Spanish service.",
  applicationName: "Tolaris Crown",
  themeColor: "#6E0D25", // burgundy
  icons: {
    icon: "/icon.png", // /app/icon.png (512x512)
    apple: "/apple-icon.png", // /app/apple-icon.png (180x180)
  },
  // Next will serve this from /app/manifest.ts
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Tolaris Crown — Madrid",
    description:
      "Crowning stays in the heart of Madrid — suites, dining, and skyline views.",
    siteName: "Tolaris Crown",
    images: [
      {
        url: "/opengraph-image", // /app/opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: "Tolaris Crown — Madrid luxury suites",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tolaris Crown — Madrid",
    description:
      "Crowning stays in the heart of Madrid — suites, dining, and skyline views.",
    images: ["/twitter-image"], // /app/twitter-image.tsx
    // creator: "@tolaris_crown", // Optional: set when you have a handle
  },
};

/** --- Viewport (nice-to-have for theming on mobile) --- */
export const viewport: Viewport = {
  themeColor: "#6E0D25",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-ivory`}
      >
        <SessionProviderRoot>
          <Header />
          {children}
        </SessionProviderRoot>
      </body>
    </html>
  );
}
