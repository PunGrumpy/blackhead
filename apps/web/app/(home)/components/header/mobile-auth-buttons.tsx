'use client'

import { routes } from '@/lib/routes'
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
          <Link href={routes.auth.login.path}>{routes.auth.login.label}</Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href={routes.auth.signup.path}>{routes.auth.signup.label}</Link>
        </Button>
      </>
    )
  }

  return (
    <>
      <Button size="lg" className="w-full" asChild>
        <Link href={routes.dashboard.upgrade.path}>
          {routes.dashboard.upgrade.label}
        </Link>
      </Button>
      <Button variant="outline" size="lg" className="w-full" asChild>
        <Link href={routes.contact.path}>{routes.contact.label}</Link>
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
            <Link href={routes.dashboard.index.path}>
              {routes.dashboard.index.label}
            </Link>
            {routes.dashboard.index.icon && (
              <routes.dashboard.index.icon className="h-5 w-5" />
            )}
          </div>

          <div className="flex items-center justify-between p-3">
            <Link href={routes.dashboard.settings.path}>
              {routes.dashboard.settings.label}
            </Link>
            {routes.dashboard.settings.icon && (
              <routes.dashboard.settings.icon className="h-5 w-5" />
            )}
          </div>

          <div className="flex items-center justify-between p-3">
            {routes.dashboard.createTeam.label}
            {routes.dashboard.createTeam.icon && (
              <routes.dashboard.createTeam.icon className="h-5 w-5" />
            )}
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
                      router.push(routes.auth.login.path)
                    }
                  }
                })
              }}
            >
              {routes.auth.logout.label}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
