import { keys as database } from '@repo/database/keys'
import { keys as observability } from '@repo/observability/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  extends: [database(), observability()],
  server: {},
  client: {},
  runtimeEnv: {}
})
