/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core features
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self' data:; img-src 'self' data: https:;",
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
      allowedOrigins: ['localhost:3000']
    }
    // Removed serverExternalPackages as it's not supported in this version
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

    // Add support for ES modules
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;