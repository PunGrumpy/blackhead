import '@repo/ui/globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Blackhead - API',
  description:
    'A monorepo template designed to have everything you need to build your new SaaS app as thoroughly as possible. Free and open source, forever'
}

interface RootLayoutProps {
  readonly children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
