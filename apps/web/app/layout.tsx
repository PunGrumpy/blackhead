import '@repo/ui/globals.css'

import { DesignSystemProvider } from '@repo/ui'
import { cn } from '@repo/ui/lib/utils'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

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

export const metadata: Metadata = {
  title: 'Blackhead',
  description:
    'A monorepo template designed to have everything you need to build your new SaaS app as thoroughly as possible. Free and open source, forever'
}

interface RootLayoutProps {
  readonly children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  )
}
