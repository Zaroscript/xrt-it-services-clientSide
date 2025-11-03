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
