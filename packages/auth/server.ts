import { database } from '@repo/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { keys } from './keys'

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: 'pg'
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true // Disable sign up for now
  },
  socialProviders: {
    google: {
      clientId: keys().GOOGLE_CLIENT_ID,
      clientSecret: keys().GOOGLE_CLIENT_SECRET
    }
  },
  advanced: {
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      httpOnly: true
    }
  },
  plugins: []
})
