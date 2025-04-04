import { getSessionCookie } from '@repo/auth/middleware'
import { type NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = (request: NextRequest) => {
  return request.url.includes('/dashboard')
}

const authMiddleware = (request: NextRequest) => {
  const session = getSessionCookie(request)

  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export function middleware(request: NextRequest) {
  return authMiddleware(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
