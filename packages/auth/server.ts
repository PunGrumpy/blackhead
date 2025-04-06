import { database } from '@repo/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
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
    github: {
      clientId: keys().GITHUB_CLIENT_ID,
      clientSecret: keys().GITHUB_CLIENT_SECRET
    },
    gitlab: {
      clientId: keys().GITLAB_CLIENT_ID,
      clientSecret: keys().GITLAB_CLIENT_SECRET
    },
    google: {
      clientId: keys().GOOGLE_CLIENT_ID,
      clientSecret: keys().GOOGLE_CLIENT_SECRET
    }
  },
  plugins: [nextCookies()]
})
