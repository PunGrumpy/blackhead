import { ThemeSwitcher } from '@repo/ui/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-t bg-card/40 p-6 pt-5">
      <nav
        aria-label="Blackhead Directory"
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center justify-between gap-x-2 gap-y-6 md:flex md:grid-cols-none"
      >
        <div className="flex flex-col items-start gap-4 text-sm md:flex-row md:items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-6 w-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Blackhead Logo"
                  width={24}
                  height={24}
                  className="invert dark:invert-0"
                />
              </div>
            </div>
          </Link>

          <ul className="m-0 grid w-full list-none grid-cols-2 items-start gap-4 p-0 md:flex md:items-center">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/docs"
              className="text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/guides"
              className="text-muted-foreground hover:text-foreground"
            >
              Guides
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit">
                <Link
                  href="/legal"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Legal <ChevronDown className="inline h-4 w-4" />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href="/legal/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/legal/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>status of project</div>
          <ThemeSwitcher />
        </div>
      </nav>

      <div className="mx-auto mt-4 max-w-6xl">
        <div className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Blackhead. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
