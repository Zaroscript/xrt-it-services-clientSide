import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    // Image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self' data:; img-src 'self' data: https:;",
  },
  
  // Build optimizations
  output: 'standalone',
  
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
    },
  },
  
  // External packages for server components
  serverExternalPackages: ['bcryptjs'],
  
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

export default nextConfig;
