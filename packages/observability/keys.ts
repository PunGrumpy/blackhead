import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
  createEnv({
    server: {
      BETTERSTACK_API_KEY: z.string().min(1).optional(),
      BETTERSTACK_URL: z.string().min(1).url().optional()
    },
    client: {},
    runtimeEnv: {
      BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
      BETTERSTACK_URL: process.env.BETTERSTACK_URL
    }
  })
