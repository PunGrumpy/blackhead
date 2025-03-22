import { auth } from '@repo/auth/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user) {
    return redirect('/dashboard')
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
