import { passwordSchema } from '@repo/ui/lib/password-validation'
import { z } from 'zod'

export const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, {
      message: 'Please confirm your password'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })
