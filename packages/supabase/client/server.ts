import { keys } from '@/keys'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import type { Database } from '../types'

const conWarn = console.warn
const conLog = console.log

const IGNORE_WARNINGS = [
  'Using the user object as returned from supabase.auth.getSession()'
]

console.warn = (...args) => {
  const match = args.find(arg =>
    typeof arg === 'string'
      ? IGNORE_WARNINGS.find(warning => arg.includes(warning))
      : false
  )
  if (!match) {
    conWarn(...args)
  }
}

console.log = (...args) => {
  const match = args.find(arg =>
    typeof arg === 'string'
      ? IGNORE_WARNINGS.find(warning => arg.includes(warning))
      : false
  )
  if (!match) {
    conLog(...args)
  }
}

type CreateClientOptions = {
  admin?: boolean
  schema?: 'public' | 'storage'
}

export const createClient = async (options?: CreateClientOptions) => {
  const { admin = false, ...rest } = options ?? {}

  const cookieStore = await cookies()
  const headersList = await headers()

  const key = admin
    ? keys().SUPABASE_SERVICE_KEY
    : keys().NEXT_PUBLIC_SUPABASE_ANON_KEY

  const auth = admin
    ? {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    : {}

  return createServerClient<Database>(keys().NEXT_PUBLIC_SUPABASE_URL, key, {
    ...rest,
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
          // biome-ignore lint/suspicious/noEmptyBlockStatements: For now, we don't care about this error
        } catch (_error) {}
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
          // biome-ignore lint/suspicious/noEmptyBlockStatements: For now, we don't care about this error
        } catch (_error) {}
      }
    },
    auth,
    global: {
      headers: {
        // Pass user agent from browser
        'user-agent': headersList.get('user-agent') as string,
        // https://supabase.com/docs/guides/platform/read-replicas#experimental-routing
        'sb-lb-routing-mode': 'alpha-all-services'
      }
    }
  })
}
