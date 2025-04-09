import { auth } from '@repo/auth/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { Naviation } from './components/navigation'

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
    redirect('/login') // Redirect to login if not logged in
  }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Naviation />
        {children}
      </main>
      <Footer />
    </>
  )
}
