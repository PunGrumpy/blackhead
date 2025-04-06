'use client'

import { GithubLogo, GitlabLogo, GoogleLogo } from '@phosphor-icons/react'
import { Button } from '@repo/ui/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'

export const LogIn = () => {
  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full shrink grow flex-col content-center items-center justify-center gap-6 p-6">
      <div className="mx-auto mb-4 max-w-md text-center">
        <h1 className="font-semibold text-3xl">Log in to Blackhead</h1>
      </div>
      <div className="mx-auto w-full max-w-80">
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="h-12 gap-1.5"
            onClick={() => toast.error('GitHub login is not implemented yet')}
          >
            <GithubLogo className="size-6" />
            Continue with GitHub
          </Button>

          <Button
            className="h-12 gap-1.5 bg-violet-600 text-primary hover:bg-violet-700"
            onClick={() => toast.error('GitLab login is not implemented yet')}
          >
            <GitlabLogo className="size-6" />
            Continue with GitLab
          </Button>

          <Button
            className="h-12 gap-1.5 bg-blue-600 text-primary hover:bg-blue-700"
            onClick={() => toast.error('Google login is not implemented yet')}
          >
            <GoogleLogo className="size-6" />
            Continue with Google
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            asChild
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            <Link href="/login/email">Continue with Email →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
