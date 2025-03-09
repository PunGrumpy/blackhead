import { FooterNavigationItems } from '@/lib/navigation'
import { cn } from '@repo/ui/lib/utils'
import { ViewAnimation } from '@repo/ui/providers/view-animation'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div
        className={cn(
          'container mx-auto flex flex-col gap-4 px-4 py-8',
          'sm:gap-16 sm:px-8 sm:py-16'
        )}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Blackhead</h3>
              <p className="text-muted-foreground text-sm">
                Blackhead is a template for Turborepo monorepo projects. It
                includes a Next.js web app, shadcn/ui design system, and a
                TypeScript library
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
            {FooterNavigationItems.map((section, index) => (
              <ViewAnimation
                key={section.title}
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                delay={0.1 * index}
                className="space-y-4"
              >
                <h3 className="font-medium text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items?.map(item => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        passHref
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ViewAnimation>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={0.4}
          >
            Status
          </ViewAnimation>

          <div className="flex items-center justify-center">
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={0.5}
            >
              <p className="whitespace-nowrap text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} Blackhead. All rights
                reserved.
              </p>
            </ViewAnimation>
          </div>

          <div className="flex items-center sm:justify-end">
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={0.6}
              className="flex space-x-4"
            >
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
            </ViewAnimation>
          </div>
        </div>
      </div>
    </footer>
  )
}
