import { keys as database } from '@repo/database/keys'
import { keys as core } from '@repo/next-config/keys'
import { keys as observability } from '@repo/observability/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  extends: [core(), database(), observability()],
  server: {},
  client: {},
  runtimeEnv: {}
})
