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
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    // !! WARN !! - Only enable in development or if you understand the risks
    ignoreBuildErrors: true,
  },
  
  // Configure Turbopack
  experimental: {
    turbo: process.env.TURBO ? {
      // Add any Turbopack specific configurations here
      // For now, we'll use an empty config object
    } : undefined,
  },
  
  // Custom webpack config
  webpack: (config) => {
    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
