import { type NextRequest, NextResponse } from 'next/server'
import { keys } from './keys'

const isProtectedRoute = (request: NextRequest) => {
  return request.url.includes('/dashboard')
}

export const authMiddleware = async (request: NextRequest) => {
  try {
    const url = new URL(
      `${keys().NEXT_PUBLIC_API_URL}/webhooks/better-auth/get-session`,
      request.nextUrl.origin
    )
    const response = await fetch(url, {
      headers: {
        cookie: request.headers.get('cookie') || ''
      }
    })

    if (!response.ok) {
      return isProtectedRoute(request)
        ? NextResponse.redirect(new URL('/sign-in', request.url))
        : NextResponse.next()
    }

    const text = await response.text()
    const session = text ? JSON.parse(text) : null

    if (isProtectedRoute(request) && !session) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
  } catch {
    return isProtectedRoute(request)
      ? NextResponse.redirect(new URL('/sign-in', request.url))
      : NextResponse.next()
  }
}
