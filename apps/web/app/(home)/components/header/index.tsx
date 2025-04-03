'use client'

import { NavigationItems } from '@/lib/navigation'
import { ThemeSwitcher } from '@repo/ui/components/theme-toggle'
import { Button } from '@repo/ui/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@repo/ui/components/ui/navigation-menu'
import { useIsScroll } from '@repo/ui/hooks/use-scroll'
import { cn } from '@repo/ui/lib/utils'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MobileMenu } from './mobile-menu'

export const Header = () => {
  const isScrolled = useIsScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full bg-background transition-all duration-300',
        isScrolled && 'border-border border-b'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                <Image
                  src="/logo.svg"
                  alt="Blackhead Logo"
                  width={32}
                  height={32}
                  className="invert dark:invert-0"
                />
              </div>
            </div>
            <span className="font-medium text-xl uppercase">Blackhead</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {NavigationItems.map(item => (
                <div key={item.title} className="hidden md:block">
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <>
                        <NavigationMenuLink asChild>
                          <Button variant="ghost" asChild>
                            <Link href={item.href}>{item.title}</Link>
                          </Button>
                        </NavigationMenuLink>
                      </>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="font-medium text-sm">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[600px] p-0">
                          <div className="grid grid-cols-2 gap-0">
                            <div className="p-4">
                              <h3 className="mb-2 font-medium text-sm">
                                {item.categories?.primary || 'Use Cases'}
                              </h3>
                              <div className="grid gap-2">
                                {item.items
                                  ?.filter(i => i.category === 'use-cases')
                                  .map((subItem, index) => (
                                    <NavigationMenuLink
                                      key={index}
                                      href={subItem.href}
                                      className="flex flex-row items-center gap-3 rounded-md p-2"
                                    >
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-card">
                                        {subItem.icon || (
                                          <MoveRight className="h-4 w-4" />
                                        )}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="font-medium">
                                          {subItem.title}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                          {subItem.description}
                                        </span>
                                      </div>
                                    </NavigationMenuLink>
                                  ))}
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="mb-2 font-medium text-sm">
                                {item.categories?.secondary || 'Users'}
                              </h3>
                              <div className="grid gap-2">
                                {item.items
                                  ?.filter(i => i.category === 'users')
                                  .map((subItem, index) => (
                                    <NavigationMenuLink
                                      key={index}
                                      href={subItem.href}
                                      className="flex flex-row items-center gap-3 rounded-md p-2"
                                    >
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-card">
                                        {subItem.icon || (
                                          <MoveRight className="h-4 w-4" />
                                        )}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="font-medium">
                                          {subItem.title}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                          {subItem.description}
                                        </span>
                                      </div>
                                    </NavigationMenuLink>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden w-32 justify-end space-x-2 md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open main menu"
            data-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  'absolute h-px w-3 bg-foreground transition-all duration-300',
                  isMobileMenuOpen ? 'rotate-45' : '-translate-y-[3px]'
                )}
                data-position="top"
              />
              <div
                className={cn(
                  'absolute h-px w-3 bg-foreground transition-all duration-300',
                  isMobileMenuOpen ? '-rotate-45' : 'translate-y-[3px]'
                )}
                data-position="bottom"
              />
            </div>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="z-50 h-dvh bg-background px-6 pt-4 md:hidden">
          <div className="flex w-full flex-col space-y-4">
            <Button size="lg" className="w-full" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          <div className="space-y-1 pt-6 pb-3">
            {NavigationItems.map((item, index) => (
              <div key={index} className="py-1">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 font-medium hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <MobileMenu
                    item={item}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-y px-3 py-4">
            <p className="text-muted-foreground">Theme</p>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
