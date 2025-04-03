import type { ReactNode } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'

interface HomeLayoutProps {
  readonly children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <div className="h-32" />
      <main className="relative mx-auto max-w-6xl divide-y">{children}</main>
      <Footer />
    </>
  )
}
