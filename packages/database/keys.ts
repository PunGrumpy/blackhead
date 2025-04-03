import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().url().min(1)
    },
    client: {},
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL
    }
  })
