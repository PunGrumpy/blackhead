import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
  createEnv({
    server: {
      SUPABASE_SERVICE_KEY: z.string().min(1),
      SUPABASE_URL: z.string().min(1).url()
    },
    client: {
      NEXT_PUBLIC_SUPABASE_URL: z.string().min(1).url(),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1)
    },
    runtimeEnv: {
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  })
