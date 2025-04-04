import { AnalyticsProvider } from '@repo/analytics'
import type { ThemeProviderProps } from 'next-themes'
import type { ReactNode } from 'react'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { ThemeProvider } from './providers/theme'

interface DesignSystemProviderProps extends ThemeProviderProps {
  children: ReactNode
}

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProps) => (
  <ThemeProvider {...properties}>
    <AnalyticsProvider>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </AnalyticsProvider>
  </ThemeProvider>
)
