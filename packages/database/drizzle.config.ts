import type { Config } from 'drizzle-kit'
import { keys } from './keys'

export default {
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: keys().DATABASE_URL
  },
  out: './migrations',
  tablesFilter: ['blackhead_*']
} satisfies Config
