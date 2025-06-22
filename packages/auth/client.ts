import {
  inferAdditionalFields,
  organizationClient
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from './server'

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  forgetPassword,
  resetPassword
} = createAuthClient({
  plugins: [organizationClient(), inferAdditionalFields<typeof auth>()]
})
