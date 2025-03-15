import { Status } from '@repo/observability/status'
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
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <div className="relative h-6 w-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Blackhead Logo"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-sm">
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
              <DropdownMenuTrigger>
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
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Status />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-6xl">
        <div className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Blackhead. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
