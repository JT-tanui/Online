/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Use static export for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure trailing slashes for consistent routing
  trailingSlash: true,
}

module.exports = nextConfig