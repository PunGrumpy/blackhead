import { drizzle } from 'drizzle-orm/neon-http'
import { keys } from '../keys'

export const db = drizzle(keys().DATABASE_URL, {})
