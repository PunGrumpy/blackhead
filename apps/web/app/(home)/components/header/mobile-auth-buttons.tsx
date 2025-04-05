'use client'

import { Gear, Layout, PlusCircle } from '@phosphor-icons/react'
import { signOut, useSession } from '@repo/auth/client'
import { ThemeSwitcher } from '@repo/ui/components/theme-toggle'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@repo/ui/components/ui/avatar'
import { Button } from '@repo/ui/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const MobileAuthButtons = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

  if (!isLoggedIn) {
    return (
      <>
        <Button size="lg" className="w-full" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </>
    )
  }

  return (
    <>
      <Button size="lg" className="w-full" asChild>
        <Link href="/dashboard">Upgrade to Pro</Link>
      </Button>
      <Button variant="outline" size="lg" className="w-full" asChild>
        <Link href="/settings">Contact</Link>
      </Button>

      <div className="space-y-1">
        <div className="border-b py-1 pb-4">
          <div className="flex items-center justify-between p-3">
            {session?.user?.email}
            <Avatar className="h-5 w-5 cursor-pointer">
              <AvatarImage
                src={session.user.image || ''}
                alt={session.user.name || 'User Avatar'}
              />
              <AvatarFallback>
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center justify-between p-3">
            <Link href="/dashboard">Dashboard</Link>
            <Layout className="h-5 w-5" />
          </div>

          <div className="flex items-center justify-between p-3">
            <Link href="/settings">Settings</Link>
            <Gear className="h-5 w-5" />
          </div>

          <div className="flex items-center justify-between p-3">
            Create Team
            <PlusCircle className="h-5 w-5" />
          </div>

          <div className="flex items-center justify-between px-3 py-2 text-muted-foreground">
            Theme
            <ThemeSwitcher />
          </div>

          <div className="flex items-center justify-between p-3 text-muted-foreground">
            <button
              type="button"
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push('/login')
                    }
                  }
                })
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
