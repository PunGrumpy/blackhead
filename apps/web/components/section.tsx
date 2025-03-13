import { cn } from '@repo/ui/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

const Cross = () => {
  return (
    <div className="relative grid h-4 w-4 self-center md:h-5 md:w-5">
      <div className="absolute h-4 w-2 border-muted-foreground border-r md:h-5 md:w-2.5" />
      <div className="absolute h-2 w-4 border-muted-foreground border-b md:h-2.5 md:w-5" />
    </div>
  )
}

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showCross?: boolean
  className?: string
}

export const Section = ({
  children,
  showCross,
  className,
  ...props
}: SectionProps) => {
  return (
    <section {...props} className="mx-4">
      <div className="relative mx-auto max-w-6xl">
        <div className={cn('border-x', className)}>{children}</div>
        {showCross && (
          <div className="-top-2 -left-2 md:-top-2.5 md:-left-2.5 absolute z-10 block">
            <Cross />
          </div>
        )}
      </div>
    </section>
  )
}
