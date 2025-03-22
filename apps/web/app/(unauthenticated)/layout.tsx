import type { ReactNode } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
