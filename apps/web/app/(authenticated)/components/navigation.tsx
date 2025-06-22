'use client'

import { useIsScroll } from '@repo/ui/hooks/use-scroll'
import { cn } from '@repo/ui/lib/utils'

export const Naviation = () => {
  const isScroll = useIsScroll()

  return (
    <div className="-mt-2.5 no-scrollbar sticky top-0 z-10 flex items-center justify-start shadow-2xs">
      <div
        className={cn(
          'flex items-center px-3 transition-all duration-200 ease-initial md:px-4',
          isScroll ? 'translate-x-9' : 'translate-none'
        )}
      >
        test
      </div>
    </div>
  )
}
