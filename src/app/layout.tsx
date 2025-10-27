// src/app/layout.tsx
/**
 * Next.js App Router layout
 * ----------------------------------------------------------------------
 * PRODUCTION NOTES
 * - We point Open Graph & Twitter images to a STATIC file under /public
 *   (public/images/hero/rooftop-hero-og.jpg). Static assets are served by
 *   the CDN and are far more reliable for Meta/WhatsApp cards than dynamic
 *   /opengraph-image routes.
 * - `metadataBase` + absolute image URLs ensure correct canonical sharing.
 * - If you later add a Facebook App, you can set fb:app_id in `other`.
 * - Keep /opengraph-image.tsx and /twitter-image.tsx if you want dynamic
 *   images for other platforms; they won’t affect Meta when we provide
 *   an explicit static image here.
 * ----------------------------------------------------------------------
 */

import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SessionProviderRoot from "@/components/providers/session-provider";
import Header from "@/components/layout/header";

/** Fonts */
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

/** Site URL for absolute metadata links (OG/Twitter) */
const siteUrl =
  process.env.APP_BASE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://tolaris-crown.vercel.app";

/** Centralized OG image (STATIC file under /public) */
const OG_IMAGE_PATH = "/images/hero/rooftop-hero-og-v2.jpg";
const OG_IMAGE_URL = `${siteUrl}${OG_IMAGE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Tolaris Crown — Madrid",
    template: "%s · Tolaris Crown",
  },

  description:
    "Crowning stays in the heart of Madrid — suites, dining, skyline views, and warm Spanish service.",

  applicationName: "Tolaris Crown",

  // Theme color must live in viewport (kept below); leaving here can warn.
  // themeColor: "#6E0D25",

  icons: {
    icon: "/icon.png", // app/icon.png (512x512)
    apple: "/apple-icon.png", // app/apple-icon.png (180x180)
  },

  manifest: "/manifest.webmanifest",

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Tolaris Crown — Madrid",
    description:
      "Crowning stays in the heart of Madrid — suites, dining, and skyline views.",
    siteName: "Tolaris Crown",
    locale: "en_US",
    images: [
      {
        /** Static JPG served from the CDN — most reliable for Meta/WhatsApp */
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Tolaris Crown rooftop view over Madrid",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tolaris Crown — Madrid",
    description:
      "Crowning stays in the heart of Madrid — suites, dining, and skyline views.",
    images: [OG_IMAGE_URL], // explicit absolute URL
  },

  // OPTIONAL: uncomment when you have a Facebook App ID
  // other: {
  //   "fb:app_id": "YOUR_FB_APP_ID_HERE",
  // },
};

/** Viewport theme color lives here */
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
