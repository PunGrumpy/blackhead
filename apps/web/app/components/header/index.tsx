'use client'

import { NavigationItems } from '@/lib/navigation'
import { ThemeToggle } from '@repo/ui/components/theme-toggle'
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
import { ViewAnimation } from '@repo/ui/providers/view-animation'
import { Menu, MoveRight, X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Logo from './logo.svg'
import { MobileMenu } from './mobile-menu'

export const Header = () => {
  const isScrolled = useIsScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-primary-foreground">
                <Image
                  src={Logo}
                  alt="Blackhead Logo"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
            </div>
            <span className="font-medium text-xl uppercase">Blackhead</span>
          </Link>
        </ViewAnimation>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NavigationItems.map((item, index) => (
              <ViewAnimation
                key={item.title}
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                delay={0.4 + index * 0.1}
                className="hidden md:block"
              >
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
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p>{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex h-full flex-col justify-end text-sm">
                            {item.items?.map((subItem, index) => (
                              <NavigationMenuLink
                                key={index}
                                href={subItem.href}
                                className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="h-4 w-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              </ViewAnimation>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <div className="hidden w-32 justify-end space-x-2 md:flex">
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={0.8}
            >
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            </ViewAnimation>
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={0.9}
            >
              <Button size="sm">Start Free Trial</Button>
            </ViewAnimation>
          </div>
          <ThemeToggle />
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={0.8}
          >
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </ViewAnimation>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <ViewAnimation
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:hidden"
          >
            <div className="space-y-1 px-4 pt-2 pb-3 shadow-lg">
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
          </ViewAnimation>
        )}
      </AnimatePresence>
    </header>
  )
}
