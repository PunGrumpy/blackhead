import { cn } from '@repo/ui/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section {...props}>
      <div className="container relative mx-auto">
        <div className={cn('sm:border-x', className)}>{children}</div>
        {/* <div className="-bottom-3 -left-3 absolute z-10 hidden h-6 sm:block">
          <Cross />
        </div>
        <div className="-bottom-3 -right-3 -translate-x-px absolute z-10 hidden h-6 sm:block">
          <Cross />
        </div> */}
      </div>
    </section>
  )
}
