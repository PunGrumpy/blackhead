import { config } from '@repo/next-config'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  ...config,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com'
      }
    ]
  }
}

export default nextConfig
