// src/app/layout.tsx
/**
 * Next.js App Router layout
 * - Loads global styles once.
 * - Uses next/font for performance & consistent typography.
 * - Keeps body classes minimal; the brand tokens are used directly in pages/components.
 */
import "./globals.css";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-ivory`}>
        <Header /> {/* Mount the sticky header */}
        {children}
      </body>
    </html>
  );
}

// (Optional) export const metadata = { title: "Tolaris Crown", description: "..." };
