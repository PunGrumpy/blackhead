import { config } from '@repo/next-config'
import type { NextConfig } from 'next'
import { env } from './env'

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
  experimental: {
    nodeMiddleware: true
  },
  // biome-ignore lint/suspicious/useAwait: headers want to use async functions
  headers: async () => {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: env.NEXT_PUBLIC_API_URL
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          },
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
