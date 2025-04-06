import { auth } from '@repo/auth/server'
import { headers } from 'next/headers'
import { unauthorized } from 'next/navigation'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!session) {
    unauthorized()
  }

  return <>{children}</>
}
