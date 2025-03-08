'use client'

import { DesignSystemProvider } from '@repo/ui'
import { Button } from '@repo/ui/components/ui/button'
import { cn } from '@repo/ui/lib/utils'
import type NextError from 'next/error'
import { Geist, Geist_Mono } from 'next/font/google'

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string }
  readonly reset: () => void
}

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

export default function GlobalError({ reset }: GlobalErrorProperties) {
  return (
    <html
      lang="en"
      className={cn(
        'font-sans antialiased',
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="flex min-h-screen flex-col items-center justify-center">
        <DesignSystemProvider>
          <div className="mx-auto text-center">
            <h1 className="mt-4 font-bold text-6xl text-foreground tracking-tight sm:text-7xl">
              500
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Oops, it looks like the page you're looking for doesn't exist.
            </p>
            <div className="mt-6 space-x-4">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline">Go to the home page</Button>
            </div>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  )
}
