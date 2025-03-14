import { Button } from '@repo/ui/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="container mx-auto flex min-h-16 items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative h-8 w-8 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Blackhead Logo"
              width={32}
              height={32}
            />
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <div className="hidden w-32 justify-end space-x-2 md:flex">
          <Button
            size="sm"
            asChild
            className="bg-transparent text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
