import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard']

function isProtectedRoute(request: NextRequest): boolean {
  const path = new URL(request.url).pathname
  return PROTECTED_ROUTES.some(route => path.startsWith(route))
}

export const authMiddleware = (request: NextRequest) => {
  try {
    const session = getSessionCookie(request)
    const isProtected = isProtectedRoute(request)

    if (isProtected && !session) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  } catch (_error) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}
