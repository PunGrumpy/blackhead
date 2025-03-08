import { ThemeToggle } from '@repo/ui/components/theme-toggle'

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-2xl">Welcome to BlackHead!</h1>
        <ThemeToggle />
      </div>
    </div>
  )
}
