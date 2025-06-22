import { database } from '@repo/database'
import { resend } from '@repo/email'
import { PasswordResetEmail } from '@repo/email/templates/password-reset'
import { VerificationEmail } from '@repo/email/templates/verification'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { openAPI, organization } from 'better-auth/plugins'
import { keys } from './keys'

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: drizzleAdapter(database, {
    provider: 'pg'
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true, // Disable sign up for now
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: keys().RESEND_FROM,
        to: user.email,
        tags: [
          {
            name: 'password',
            value: 'reset'
          }
        ],
        subject: 'Reset your password',
        react: PasswordResetEmail({
          email: user.email,
          url: url
        })
      })
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    requireEmailVerification: true,
    expiresIn: 60 * 60 * 24, // 1 day
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: keys().RESEND_FROM,
        to: user.email,
        tags: [
          {
            name: 'verification',
            value: 'email'
          }
        ],
        subject: 'Verify your email',
        react: VerificationEmail({
          email: user.email,
          url: url
        })
      })
    }
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
  plugins: [organization(), openAPI(), nextCookies()]
})
