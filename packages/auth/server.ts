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
  emailAndPassword: {
    enabled: true,
    disableSignUp: true
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
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // 1 day (every day, the session will be updated)
    cookieCache: {
      enabled: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }
  },
  trustedOrigins: [keys().NEXT_PUBLIC_WEB_URL, keys().NEXT_PUBLIC_API_URL],
  advanced: {
    crossSubDomainCookies: {
      enabled: false // Disable this since we'll handle domain explicitly
    },
    defaultCookieAttributes: {
      path: '/',
      sameSite: 'none',
      partitioned: true,
      domain: new URL(keys().NEXT_PUBLIC_WEB_URL).hostname
    }
  },
  plugins: [nextCookies()]
})

export { toNextJsHandler } from 'better-auth/next-js'
