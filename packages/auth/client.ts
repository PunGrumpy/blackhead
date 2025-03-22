import {
  inferAdditionalFields,
  passkeyClient
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { keys } from './keys'
import type { auth } from './server'

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: keys().NEXT_PUBLIC_API_URL,
  basePath: '/webhooks/better-auth',
  plugins: [inferAdditionalFields<typeof auth>(), passkeyClient()]
})
