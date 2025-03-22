import '@repo/ui/globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Blackhead - API',
  description: 'An API for managing blackhead treatments'
}

interface RootLayoutProps {
  readonly children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
