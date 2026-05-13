/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/My-Portfolio-Site',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
