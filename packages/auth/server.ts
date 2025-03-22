import { database } from '@repo/database'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { keys } from './keys'

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql'
  }),
  baseURL: keys().NEXT_PUBLIC_API_URL,
  basePath: '/webhooks/better-auth',
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

export { toNextJsHandler } from 'better-auth/next-js'
