import { keys as email } from '@repo/email/keys'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
  createEnv({
    extends: [email()],
    server: {
      BETTER_AUTH_SECRET: z.string().min(1),
      DATABASE_URL: z.string().url().min(1),
      GOOGLE_CLIENT_ID: z.string().min(1),
      GOOGLE_CLIENT_SECRET: z.string().min(1),
      GITHUB_CLIENT_ID: z.string().min(1),
      GITHUB_CLIENT_SECRET: z.string().min(1),
      GITLAB_CLIENT_ID: z.string().min(1),
      GITLAB_CLIENT_SECRET: z.string().min(1)
    },
    client: {},
    runtimeEnv: {
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      GITLAB_CLIENT_ID: process.env.GITLAB_CLIENT_ID,
      GITLAB_CLIENT_SECRET: process.env.GITLAB_CLIENT_SECRET
    }
  })
