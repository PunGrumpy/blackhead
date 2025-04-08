'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword } from '@repo/auth/client'
import { PasswordInput } from '@repo/ui/components/password-input'
import { Alert } from '@repo/ui/components/ui/alert'
import { Button } from '@repo/ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/ui/form'
import { AlertCircle, PartyPopper } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchema } from './schema'

export const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<boolean>(false)

  const [generalError, setGeneralError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  // Redirect if no token is present
  if (!token) {
    router.push('/login')
    return null
  }

  const onSubmit = async ({ password }: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await resetPassword({
        token: token,
        newPassword: password
      })

      if (error) {
        setGeneralError(
          error.message || 'Failed to reset password. Please try again.'
        )
      }

      if (data && !error) {
        setStatus(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch {
      setGeneralError(
        'Apologies, but we could not connect to the authentication service. Please try again later or contact support if the issue persists.'
      )
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="mx-auto mb-4 max-w-md text-center">
        <h1 className="font-semibold text-3xl">Reset Password</h1>
      </div>
      <div className="mx-auto w-full max-w-80 space-y-4">
        {generalError && (
          <Alert variant="destructive" className="flex bg-destructive/15">
            <AlertCircle className="inline-block size-4" />
            {generalError}
          </Alert>
        )}
        {status && (
          <Alert className="flex bg-success/15 text-success">
            <PartyPopper className="inline-block size-4" />
            Password reset successful! Redirecting to login page...
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={status}
                      showStrengthIndicator
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={status} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={form.formState.isValid ? 'default' : 'outline'}
              size="lg"
              className="mt-4 w-full"
              disabled={
                form.formState.isSubmitting || !form.formState.isValid || status
              }
            >
              {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
