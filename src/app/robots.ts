// src/app/robots.ts
// Production note:
// - Update the sitemap URL once you connect a custom domain.

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.APP_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "https://tolaris-crown.vercel.app";

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
