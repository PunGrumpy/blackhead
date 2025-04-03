import { createBrowserClient } from '@supabase/ssr'
import { keys } from '../keys'
import type { Database } from '../types'

export const createClient = () => {
  return createBrowserClient<Database>(
    keys().NEXT_PUBLIC_SUPABASE_URL,
    keys().NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          // https://supabase.com/docs/guides/platform/read-replicas#experimental-routing
          'sb-lb-routing-mode': 'alpha-all-services'
        }
      }
    }
  )
}
