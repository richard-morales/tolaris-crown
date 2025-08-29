/**
 * Next.js App Router layout
 * - Loads global styles once.
 * - Uses next/font for performance & consistent typography.
 * - Keeps body classes minimal; the brand tokens are used directly in pages/components.
 */
import "./globals.css";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* 
        Typography + brand base:
        - font-sans for UI, Playfair for headings (see page.tsx).
        - bg-ivory token proves Tailwind v4 tokens are active.
      */}
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-ivory`}>
        {children}
      </body>
    </html>
  );
}

/**
 * (Optional) You can export metadata for SEO like this:
 * export const metadata = { title: "Tolaris Crown", description: "..." };
 */
