import path from 'node:path'
import type { NextConfig } from 'next'

export const config: NextConfig = {
  transpilePackages: ['@repo/ui'],
  output:
    process.env.NEXT_OUTPUT_MODE === 'standalone' ? 'standalone' : undefined,
  // Include files from the root of the monorepo
  outputFileTracingRoot: path.join(__dirname, '../../'),
  images: {
    formats: ['image/avif', 'image/webp']
  }
}
