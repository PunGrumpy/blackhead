import { cn } from '@repo/ui/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

const Cross = () => {
  return (
    <div className="relative grid h-6 w-6 self-center">
      <div className="absolute h-6 w-3 border-muted-foreground border-r" />
      <div className="absolute h-3 w-6 border-muted-foreground border-b" />
    </div>
  )
}

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section {...props} className="mx-4">
      <div className="relative mx-auto max-w-[1080px]">
        <div className={cn('border-x', className)}>{children}</div>
        <div className="-top-3 -left-3 absolute z-10 hidden h-6 sm:block">
          <Cross />
        </div>
      </div>
    </section>
  )
}
