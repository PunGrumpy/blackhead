import { Apps } from './components/app'
import { Hero } from './components/hero'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-4 h-8 border-x" />
      <Apps />
    </>
  )
}
