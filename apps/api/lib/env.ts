import { keys as analytics } from '@repo/analytics/keys'
import { keys as database } from '@repo/database/keys'

import { keys as core } from '@repo/next-config/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  extends: [core(), analytics(), database()],
  server: {},
  client: {},
  runtimeEnv: {}
})
