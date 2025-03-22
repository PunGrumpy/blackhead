'use server'

import { auth } from '@repo/auth/server'
import type { z } from 'zod'
import type { formSchema } from './schema'

export const signIn = async (data: z.infer<typeof formSchema>) => {
  const response = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password
    }
  })
  return response
}
