import { Button } from '@repo/ui/components/ui/button'
import { ArrowRight, Calendar, CreditCard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex-1 pt-16">
      <section className="w-full overflow-hidden py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm">
                  <span className="font-medium text-sm">
                    New Features Available
                  </span>
                  <div className="ml-1 h-1 w-1 rounded-full bg-accent-foreground" />
                  <span className="ml-1 text-muted-foreground text-sm">
                    See what&apos;s new
                  </span>
                </div>
                <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Blackhead
                </h1>
                <p className="max-w-xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Blackhead is a template for Turborepo monorepo projects. It
                  includes a Next.js web app, shadcn/ui design system, and a
                  TypeScript library
                </p>
              </div>
              <div className="flex flex-col gap-2 min-md:flex-row">
                <Button className="group">
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/demo">Watch Demo</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1.5">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl shadow-2xl lg:ml-auto">
              <div className="relative h-full w-full">
                <Image
                  src="https://placehold.co/800x600/png?text=Dashboard+Preview"
                  width={800}
                  height={600}
                  alt="Dashboard Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
