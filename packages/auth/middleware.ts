import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const authMiddleware = async (request: NextRequest) => {
  const isProtectedRoute = (request: NextRequest) => {
    return request.url.includes('/dashboard')
  }

  const sessionCookie = getSessionCookie(request)

  if (isProtectedRoute(request) && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}
