/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Use static export for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure trailing slashes for consistent routing
  trailingSlash: true,
  // Add this to handle unexpected errors more gracefully
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  eslint: {
    // This will ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig