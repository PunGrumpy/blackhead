'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@repo/auth/client'
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

export const SignUp = () => {
  const router = useRouter()
  const [generalError, setGeneralError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setGeneralError(null)
    try {
      const { data: session, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`
      })

      if (error) {
        setGeneralError(error.message || 'Failed to sign up. Please try again.')
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
      <div className="mx-auto flex min-w-xl max-w-xl flex-col rounded-xl border bg-card/10 shadow">
        <div className="space-y-8 p-16 pb-12">
          <h1 className="text-center font-semibold text-3xl">
            Join with Blackhead
          </h1>
          {generalError && (
            <Alert variant="destructive" className="flex bg-destructive/15">
              <AlertCircle className="inline-block size-4" />
              {generalError}
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                      <PasswordInput showStrengthIndicator {...field} />
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
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {form.formState.isSubmitting ? 'Signing up...' : 'Continue'}
              </Button>
            </form>
          </Form>
        </div>
        <div className="m-3 flex items-center justify-center gap-2 text-balance px-2 py-4">
          <p className="text-muted-foreground text-sm">
            By joining, you agree to our{' '}
            <Link href="/legal/terms" className="text-foreground">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
