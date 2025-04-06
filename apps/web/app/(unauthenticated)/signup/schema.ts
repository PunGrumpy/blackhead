'use client'

import { passwordSchema } from '@repo/ui/lib/password-validation'
import { z } from 'zod'

export const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: passwordSchema
})
