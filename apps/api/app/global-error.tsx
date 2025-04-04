'use client'

import { env } from '@/lib/env'
import { DesignSystemProvider } from '@repo/ui'
import { Button } from '@repo/ui/components/ui/button'
import { cn } from '@repo/ui/lib/utils'
import type NextError from 'next/error'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

const geistSans = Geist({
  adjustFontFallback: true,
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui'],
  preload: true,
  subsets: ['latin'],
  variable: '--font-sans'
})

const geistMono = Geist_Mono({
  adjustFontFallback: true,
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
  preload: true,
  subsets: ['latin'],
  variable: '--font-mono'
})

interface GlobalErrorProps {
  readonly error: NextError & { digest?: string }
  readonly reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans antialiased',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <DesignSystemProvider>
          <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
              <h1 className="font-semibold text-4xl">Whoops!</h1>
              <div className="border-l pl-4">
                <p className="mb-4 ">
                  {error instanceof Error
                    ? error.message
                    : 'Could not find error'}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => reset()}>
                    Try again
                  </Button>
                  <Button size="sm" variant="outline">
                    <Link href={env.NEXT_PUBLIC_WEB_URL}>Go to home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  )
}
