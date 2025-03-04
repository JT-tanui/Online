/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Use this instead of next export
  images: {
    unoptimized: true, // Required for static export
  },
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  // Ensure trailing slashes for consistent routing
  trailingSlash: true,
  // Add this to handle unexpected errors more gracefully
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;