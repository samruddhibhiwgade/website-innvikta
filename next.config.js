/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["swiper"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'innvikta.co.in',
      },
      {
        protocol: 'http',
        hostname: '103.86.177.53', // the live server IP
      },
      {
        protocol: 'http',
        hostname: 'localhost', // for local testing
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
