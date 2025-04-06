import { auth } from '@repo/auth/server'
import { headers } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList
  })

  if (session) {
    redirect('/dashboard', RedirectType.replace) // Redirect to dashboard if already logged in
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
