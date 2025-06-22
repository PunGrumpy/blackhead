'use client'

import { AuthButtons } from '@/app/(home)/components/header/auth-buttons'
import { useSession } from '@repo/auth/client'
import {} from '@repo/ui/components/ui/avatar'
import { Button } from '@repo/ui/components/ui/button'
import {} from '@repo/ui/components/ui/dropdown-menu'
import { useIsScroll } from '@repo/ui/hooks/use-scroll'
import { cn } from '@repo/ui/lib/utils'
import { ChevronsUpDown, SlashIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const { data: session } = useSession()
  const isScroll = useIsScroll()

  return (
    <header className="flex h-16 min-h-16 items-center px-4 md:px-6">
      <Link href="/dashboard" className="pr-12 outline-none md:inline">
        <Image
          src="/logo.svg"
          alt="Blackhead Logo"
          width={32}
          height={32}
          className={cn(
            'top-6 left-6 z-10 inline-flex invert dark:invert-0',
            'transition-all duration-200 ease-initial',
            isScroll ? '-translate-y-2 -scale-[0.8] fixed' : 'absolute'
          )}
        />
      </Link>
      <nav className="flex w-full items-center justify-between gap-3">
        <ul className="flex items-center justify-start overflow-auto">
          <li className="flex min-w-12 max-w-96 items-center justify-center gap-3">
            <SlashIcon className="h-5 w-5 text-accent" />
            <div className="flex items-center justify-start gap-3">
              <Link
                href="/dashboard"
                className="flex min-w-0 items-center justify-start gap-3 no-underline"
              >
                <Image
                  src={`https://avatar.vercel.sh/${session?.user.name || 'User Avatar'}.png`}
                  alt={session?.user.name || 'User Avatar'}
                  width={20}
                  height={20}
                  className="relative h-5 w-5 rounded-full"
                />
                <p id="project" className="text-sm">
                  {session?.user.name}
                </p>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-6 rounded-full"
              >
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </li>
        </ul>
        <div className="flex items-center justify-start gap-7 p-0">
          <ul className="flex items-center justify-start gap-4">
            <Button asChild variant="outline">
              <Link href="/feedback">Feedback</Link>
            </Button>
            <li>
              <Link
                href="/changelog"
                className="text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground"
              >
                Changelog
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground"
              >
                Docs
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-start gap-3">
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  )
}
