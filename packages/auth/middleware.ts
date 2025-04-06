import { betterFetch } from '@better-fetch/fetch'
import { type NextRequest, NextResponse } from 'next/server'
import type { auth } from './server'

const isProtectedRoute = (request: NextRequest) => {
  const url = new URL(request.url)
  const pathname = url.pathname

  return pathname.includes('/dashboard')
}

type Session = typeof auth.$Infer.Session

export const authMiddleware = async (request: NextRequest) => {
  try {
    const { data: session } = await betterFetch<Session>(
      '/api/auth/get-session',
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get('cookie') || '' // Forward the cookies from the request
        }
      }
    )

    if (isProtectedRoute(request) && !session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (_error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
