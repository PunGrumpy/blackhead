'use client'

import { ClipboardIcon } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { cn } from '../lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showCopyButton?: boolean
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showCopyButton = true
}: CodeBlockProps) {
  const copyCode = useCallback(() => {
    if (!code) {
      return
    }
    navigator.clipboard.writeText(code)
    toast.success('Copied to clipboard')
  }, [code])

  return (
    <div
      className={cn(
        'flex h-auto w-full items-center justify-between gap-2 whitespace-pre-wrap rounded-md border bg-background px-3 py-2 text-foreground text-sm shadow-sm',
        className
      )}
    >
      <div className="flex w-full items-center gap-2 overflow-x-auto">
        <p className="pointer-events-none shrink-0 select-none text-muted-foreground">
          $
        </p>
        <div className="flex-1 text-left font-mono" data-language={language}>
          {code}
        </div>
      </div>
      {showCopyButton && (
        <div className="flex shrink-0 items-center">
          <button type="button" aria-label="Copy" onClick={copyCode}>
            <ClipboardIcon
              size={14}
              className="text-muted-foreground hover:text-foreground"
            />
          </button>
        </div>
      )}
    </div>
  )
}
