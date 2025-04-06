import { authMiddleware } from '@repo/auth/middleware'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return authMiddleware(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Protected routes
    '/dashboard'
  ]
}
