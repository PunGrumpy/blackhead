import type { ReactNode } from 'react'
import { PostHogProvider } from './posthog/client'
import { VercelAnalytics } from './vercel'

interface AnalyticsProviderProps {
  readonly children: ReactNode
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <PostHogProvider>
    {children}
    <VercelAnalytics />
  </PostHogProvider>
)
