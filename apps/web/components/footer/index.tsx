import { FooterNavigationItems } from '@/lib/navigation'
import { Status } from '@repo/observability/status'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full bg-background">
      <nav aria-label="Blackhead Directory">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-4 py-8 sm:gap-16 sm:py-16">
          <div className="grid w-full grid-cols-[repeat(4,_1fr)_80px]">
            {FooterNavigationItems.map(section => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-sm tracking-wider">{section.title}</h2>
                <ul className="space-y-2">
                  {section.items?.map(item => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        passHref
                        className="text-muted-foreground text-sm hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex justify-end">
              <Link href="/home" className="block">
                <div className="relative h-7 w-7 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt="Blackhead Logo"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Status />

            <div className="flex items-center justify-center">
              <p className="whitespace-nowrap text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} Blackhead. All rights
                reserved.
              </p>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="text-muted-foreground text-sm hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground text-sm hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  )
}
