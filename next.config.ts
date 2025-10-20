/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // you can use `domains` OR `remotePatterns` (either is fine)
    domains: ["lh3.googleusercontent.com"],

    // or, if you prefer remotePatterns:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    // ],
  },
};

module.exports = nextConfig;
