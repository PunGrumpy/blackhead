import { FooterNavigationItems } from '@/lib/navigation'
import { Status } from '@repo/ui/components/status'
import { ThemeSwitcher } from '@repo/ui/components/theme-toggle'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="mx-4 bg-background py-8 sm:py-24">
      <nav
        aria-label="Blackhead Directory"
        className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-16"
      >
        <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-[repeat(4,_1fr)_80px] md:gap-0">
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

          <div className="col-span-full row-span-full flex justify-start md:col-span-1 md:row-span-1 md:justify-end">
            <Link href="/home" className="block">
              <div className="relative h-7 w-7 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="Blackhead Logo"
                    width={28}
                    height={28}
                    className="invert dark:invert-0"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <Status />
          <div className="flex items-center justify-end">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </footer>
  )
}
