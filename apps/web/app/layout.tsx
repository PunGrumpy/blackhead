import '@workspace/ui/globals.css'

import { cn } from '@workspace/ui/lib/utils'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/providers/theme'
import type { ReactNode } from 'react'

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

interface RootLayoutProps {
  readonly children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased md:subpixel-antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
