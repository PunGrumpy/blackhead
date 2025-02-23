import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Separator } from '@workspace/ui/components/separator'
import { Dot, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function LoginForm() {
  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <Image src="/icon.png" alt="Blackhead Logo" width={50} height={50} />
        </div>
        <div className="space-y-2">
          <h2 className="font-medium text-3xl tracking-tight">
            Sign in with your account
          </h2>
          <p className="text-muted-foreground text-sm">
            New here?{' '}
            <Link href="#" className="hover:text-foreground">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-center gap-2">
          GitHub
        </Button>
        <Button variant="outline" className="w-full justify-center gap-2">
          Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-muted-foreground text-xs uppercase">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Input type="email" placeholder="Email" className="bg-muted" />
        </div>
        <div className="relative">
          <Input type="password" placeholder="Password" className="bg-muted" />
          <button
            type="button"
            className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground"
          >
            <Eye className="size-5" />
          </button>
        </div>
        <Button className="w-full">Log in</Button>
      </div>

      <div className="text-center text-muted-foreground text-sm">
        <Link href="#" className="hover:text-muted-foreground/80">
          Privacy policy
        </Link>
        <Dot className="mx-1 inline-block size-4" />
        <Link href="#" className="hover:text-muted-foreground/80">
          Terms of use
        </Link>
      </div>
    </div>
  )
}
