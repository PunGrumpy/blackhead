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
  },
  // biome-ignore lint/suspicious/useAwait: headers want to use async functions
  headers: async () => {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          }
        ]
      }
    ]
  }
}

export default nextConfig
