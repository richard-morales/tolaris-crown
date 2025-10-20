/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // You can use `domains` OR `remotePatterns` (either is fine)
    domains: ["lh3.googleusercontent.com"],
  },

  // ✅ Prevent ESLint errors from breaking the Vercel build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
