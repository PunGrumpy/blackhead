import { vercel } from '@t3-oss/env-core/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
  createEnv({
    extends: [vercel()],
    server: {
      // Added by Vercel
      NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional()
    },
    client: {
      NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
      NEXT_PUBLIC_API_URL: z.string().min(1).url()
    },
    runtimeEnv: {
      NEXT_RUNTIME: process.env.NEXT_RUNTIME,
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    }
  })
