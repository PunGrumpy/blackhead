import { keys as auth } from '@repo/auth/keys'
import { keys as core } from '@repo/next-config/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  extends: [core(), auth()],
  server: {},
  client: {},
  runtimeEnv: {}
})
