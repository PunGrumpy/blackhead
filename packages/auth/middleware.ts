import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = (request: NextRequest) => {
  return request.url.includes('/dashboard')
}

export const authMiddleware = (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request)

  if (isProtectedRoute(request) && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}
