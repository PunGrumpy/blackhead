import { config } from '@repo/next-config'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  ...config,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      }
    ]
  }
}

export default nextConfig
