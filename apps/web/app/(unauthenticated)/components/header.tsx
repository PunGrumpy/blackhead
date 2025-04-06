'use client'

import { Button } from '@repo/ui/components/ui/button'
import { useIsScroll } from '@repo/ui/hooks/use-scroll'
import { cn } from '@repo/ui/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()
  const isScroll = useIsScroll()

  return (
    <header className="container mx-auto flex h-full min-h-16 px-6">
      <Link
        href="/"
        className={cn(
          'flex items-center space-x-2',
          isScroll && 'fixed top-4 z-10'
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-in-out',
            isScroll ? 'h-7 w-7' : 'h-8 w-8'
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Blackhead Logo"
              width={32}
              height={32}
              className="invert dark:invert-0"
            />
          </div>
        </div>
      </Link>
      <nav className="flex flex-1 flex-row items-center justify-end">
        <div className="flex flex-initial flex-row items-center justify-end gap-2">
          <Button
            size="sm"
            asChild
            className="bg-transparent text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            {pathname.includes('login') ? (
              <Link href="/signup">Sign Up</Link>
            ) : (
              <Link href="/login">Log In</Link>
            )}
          </Button>
        </div>
      </nav>
    </header>
  )
}
