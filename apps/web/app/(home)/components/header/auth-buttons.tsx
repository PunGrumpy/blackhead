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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const AuthButtons = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

  if (!isLoggedIn) {
    return (
      <>
        <Button variant="outline" asChild>
          <Link href={routes.auth.login.path}>{routes.auth.login.label}</Link>
        </Button>
        <Button asChild>
          <Link href={routes.auth.signup.path}>{routes.auth.signup.label}</Link>
        </Button>
      </>
    )
  }

  return (
    <>
      <Button variant="outline" asChild>
        <Link href={routes.dashboard.index.path}>
          {routes.dashboard.index.label}
        </Link>
      </Button>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={session.user.image || ''}
              alt={session.user.name || 'User Avatar'}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="mt-2 w-64 overflow-visible p-1 py-2"
          align="end"
        >
          <DropdownMenuLabel className="flex flex-col gap-1 px-2 py-2">
            {session.user.name || 'User Name'}
            <p className="text-muted-foreground">
              {session.user.email || 'example@blackhead.com'}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild className="py-2.5 text-muted-foreground">
            <Link href={routes.dashboard.index.path} className="cursor-pointer">
              {routes.dashboard.index.label}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="py-2.5 text-muted-foreground">
            <Link
              href={routes.dashboard.settings.path}
              className="cursor-pointer"
            >
              {routes.dashboard.settings.label}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="group cursor-pointer py-2.5 text-muted-foreground">
            {routes.dashboard.createTeam.label}
            <DropdownMenuShortcut>
              {routes.dashboard.createTeam.icon && (
                <routes.dashboard.createTeam.icon className="h-4 w-4 group-hover:text-accent-foreground" />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="flex items-center justify-between text-muted-foreground">
            Theme
            <ThemeSwitcher />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="group my-1.5 cursor-pointer py-2.5 text-muted-foreground"
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => router.push(routes.auth.login.path)
                }
              })
            }
          >
            {routes.auth.logout.label}
            <DropdownMenuShortcut>
              {routes.auth.logout.icon && (
                <routes.auth.logout.icon className="h-4 w-4 group-hover:text-accent-foreground" />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <div className="p-2">
            <Button className="w-full">{routes.dashboard.upgrade.label}</Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
