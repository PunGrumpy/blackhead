import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = (request: NextRequest) => {
  const url = new URL(request.url)
  const pathname = url.pathname

  return pathname.startsWith('/dashboard')
}

export const authMiddleware = (request: NextRequest) => {
  const session = getSessionCookie(request)

  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
