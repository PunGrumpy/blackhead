import { authMiddleware } from '@repo/auth/middleware'
import { noseconeMiddleware, noseconeOptions } from '@repo/security/middleware'
import type { NextRequest } from 'next/server'

const securityHeaders = noseconeMiddleware(noseconeOptions)

export default async function middleware(request: NextRequest) {
  await securityHeaders()
  return authMiddleware(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Protect routes that require authentication
    '/dashboard(.*)'
  ]
}
