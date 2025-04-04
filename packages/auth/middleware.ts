import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = (request: NextRequest) => {
  return request.url.includes('/dashboard')
}

export const authMiddleware = (request: NextRequest) => {
  const session = getSessionCookie(request)

  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
