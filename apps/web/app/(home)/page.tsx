import { ChevronLeft } from 'lucide-react'

import { LoginForm } from './components/login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2">
        <div className="relative hidden bg-[#0000ff] bg-gradient-to-br from-[#0000ff] to-[#4d4dff] p-12 lg:block">
          <div className="flex h-full flex-col justify-between">
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground/15 px-4 py-2 text-foreground/90 text-sm"
            >
              <ChevronLeft className="size-5" />
              Back
            </button>
            <div className="space-y-4">
              <div className="mb-4 text-foreground/80 lowercase">Blackhead</div>
              <h1 className="max-w-md font-medium text-4xl text-foreground leading-tight">
                Security audit and Penetration testing
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-card p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
