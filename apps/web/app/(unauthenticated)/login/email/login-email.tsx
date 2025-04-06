'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@repo/auth/client'
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
import { Input } from '@repo/ui/components/ui/input'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchema } from './schema'

export const LogInEmail = () => {
  const router = useRouter()
  const [generalError, setGeneralError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setGeneralError(null)
    try {
      const { data: session, error } = await signIn.email({
        ...data
      })

      if (error) {
        setGeneralError(error.message || 'Failed to sign in. Please try again.')
      }

      if (session) {
        router.replace('/dashboard')
      }
    } catch {
      setGeneralError(
        'Unable to connect to the authentication service. Please try again later or contact support if the issue persists.'
      )
    }
  }

  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full shrink grow flex-col content-center items-center justify-center gap-6 p-6">
      <div className="mx-auto mb-4 max-w-md text-center">
        <h1 className="font-semibold text-3xl">Log In to Blackhead</h1>
      </div>
      <div className="mx-auto w-full max-w-80 space-y-4">
        {generalError && (
          <Alert variant="destructive" className="flex bg-destructive/15">
            <AlertCircle className="inline-block size-4" />
            {generalError}
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
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
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? 'Signing up...' : 'Continue'}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="link"
          asChild
          className="text-blue-500 text-sm hover:text-blue-600"
        >
          <Link href="/login">← Other Login Options</Link>
        </Button>
      </div>
    </div>
  )
}
