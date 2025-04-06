import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = (request: NextRequest) => {
  const url = new URL(request.url)
  const pathname = url.pathname

  return pathname.startsWith('/dashboard')
}

export const authMiddleware = (request: NextRequest) => {
  const session = getSessionCookie(request)

  // DEBUG: Why after logged in, the session is null?
  console.log('URL:', request.url)
  console.log('Is protected route:', isProtectedRoute(request))
  console.log('Session exists:', !!session)
  console.log('Session:', session ? session : 'No session')
  console.log(
    'Session cookie:',
    request.cookies.get('better-auth.session')?.value
  )

  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
