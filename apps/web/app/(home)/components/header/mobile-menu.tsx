'use client'

import type { NavigationItemsProps } from '@/lib/navigation'
import { NavigationItems } from '@/lib/navigation'
import { useSession } from '@repo/auth/client'
import { ThemeSwitcher } from '@repo/ui/components/theme-toggle'
import { Button } from '@repo/ui/components/ui/button'
import { cn } from '@repo/ui/lib/utils'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { MobileAuthButtons } from './mobile-auth-buttons'

interface MobileMenuItemProps {
  item: NavigationItemsProps
  setIsMobileMenuOpen: (value: boolean) => void
}

const MobileMenuItem = ({ item, setIsMobileMenuOpen }: MobileMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 font-medium text-base hover:bg-muted"
      >
        {item.title}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 space-y-1 border-muted border-l pl-2">
              {item.description && (
                <p className="px-3 py-2 text-muted-foreground text-sm">
                  {item.description}
                </p>
              )}
              {item.items?.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.href}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

  if (!isOpen) {
    return null
  }

  return (
    <div className="z-50 h-dvh bg-background px-6 pt-4 md:hidden">
      <div className="flex w-full flex-col space-y-4">
        <MobileAuthButtons />
      </div>

      <div className="space-y-1 border-b py-3">
        {NavigationItems.map((item, index) => (
          <div key={index} className="py-1">
            {item.href ? (
              <Link
                href={item.href}
                className="block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ) : (
              <MobileMenuItem item={item} setIsMobileMenuOpen={setIsOpen} />
            )}
          </div>
        ))}
      </div>

      {!isLoggedIn && (
        <div className="flex items-center justify-between border-b px-3 py-4">
          <p className="text-muted-foreground">Theme</p>
          <ThemeSwitcher />
        </div>
      )}
    </div>
  )
}
