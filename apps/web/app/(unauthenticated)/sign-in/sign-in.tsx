'use client'

import {
  GithubLogo,
  GitlabLogo,
  GoogleLogo,
  Key
} from '@phosphor-icons/react/dist/ssr'
import { Button } from '@repo/ui/components/ui/button'
import { Separator } from '@repo/ui/components/ui/separator'
import Link from 'next/link'

export const SignIn = () => {
  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full shrink grow flex-col content-center items-center justify-center gap-6 p-6">
      <div className="mx-auto mb-4 max-w-md text-center">
        <h1 className="font-semibold text-2xl">Log in to Blackhead</h1>
      </div>
      <div className="mx-auto w-full max-w-80 ">
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="h-12 gap-1.5"
            // onClick={async () => {
            //   await signIn.social({
            //     provider: 'github'
            //   })
            // }}
          >
            <GithubLogo className="size-6" />
            Continue with GitHub
          </Button>

          <Button
            className="h-12 gap-1.5 bg-violet-600 text-primary hover:bg-violet-700"
            // onClick={async () => {
            //   await signIn.social({
            //     provider: 'gitlab'
            //   })
            // }}
          >
            <GitlabLogo className="size-6" />
            Continue with GitLab
          </Button>

          <Button
            className="h-12 gap-1.5 bg-blue-600 text-primary hover:bg-blue-700"
            // onClick={async () => {
            //   await signIn.social({
            //     provider: 'google'
            //   })
            // }}
          >
            <GoogleLogo className="size-6" />
            Continue with Google
          </Button>

          <Separator className="my-3" />

          <Button
            variant="outline"
            className="h-12 gap-1.5 border-border bg-background text-foreground hover:bg-accent"
            // onClick={async () => {
            //   await signIn.passkey()
            // }}
          >
            <Key className="size-6" />
            Login with Passkey
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            asChild
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            <Link href="/sign-in/email">Continue with Email →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
