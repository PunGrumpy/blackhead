'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { forgetPassword } from '@repo/auth/client'
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
import { Input } from '@repo/ui/components/ui/input'
import { AlertCircle, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchema } from './schema'

export const ForgotPassword = () => {
  const [status, setStatus] = useState<boolean>(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await forgetPassword({
        email,
        redirectTo: '/reset-password'
      })

      if (error) {
        setGeneralError(error.message || 'Failed to send reset password email.')
      }

      if (data && !error) {
        setStatus(true)
      }
    } catch {
      setGeneralError(
        'Could not connect to the authentication service. Please try again later or contact support if the issue persists.'
      )
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="mx-auto mb-4 max-w-md text-center">
        <h1 className="font-semibold text-3xl">Forgot Password?</h1>
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
            Check your email for a link to reset your password.
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={status} placeholder="Email" {...field} />
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
              {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
