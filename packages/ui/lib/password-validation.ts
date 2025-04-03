import { z } from 'zod'

export const passwordValidation = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'At least 1 special character' }
]

// Check if a string contains non-ASCII characters
export const containsNonAscii = (text: string) => /[^\u0000-\u007F]/.test(text)

export const passwordSchema = z
  .string()
  .min(8)
  .refine(
    value => passwordValidation.every(req => req.regex.test(value)),
    {
      message: 'Password does not meet requirements'
    }
  )