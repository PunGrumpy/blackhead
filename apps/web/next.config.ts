import { config } from '@repo/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = config

nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
}

export default nextConfig
