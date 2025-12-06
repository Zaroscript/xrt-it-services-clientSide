const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core features
  reactStrictMode: true,

  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header

  // SWC minification (faster than Terser)
  swcMinify: true,

  // Image optimization
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 3600, // 1 hour cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self' data:; img-src 'self' data: https:;",
  },

  // Development tools
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // Configure experimental features
  experimental: {
    turbo: process.env.TURBO ? {} : undefined,
    serverActions: {
      allowedOrigins: ["localhost:5000"],
    },
  },

  // Custom webpack config
  webpack: (config, { isServer }) => {
    // Add polyfills for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);
