import { keys as observability } from '@repo/observability/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  extends: [observability()],
  server: {},
  client: {},
  runtimeEnv: {}
})
