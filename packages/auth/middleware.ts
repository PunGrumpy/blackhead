import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const authMiddleware = (request: NextRequest) => {
  const isProtectedRoute = (request: NextRequest) => {
    return request.url.startsWith('/dashboard')
  }

  const sessionCookie = getSessionCookie(request, {
    cookieName: 'session_token',
    cookiePrefix: 'better-auth',
    useSecureCookies: true
  })

  if (isProtectedRoute(request) && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}
