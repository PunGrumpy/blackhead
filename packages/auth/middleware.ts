import { type NextRequest, NextResponse } from 'next/server'
import { keys } from './keys'

const isProtectedRoute = (request: NextRequest) => {
  return request.url.includes('/dashboard')
}

export const authMiddleware = async (request: NextRequest) => {
  const url = new URL(
    `${keys().NEXT_PUBLIC_API_URL}/webhooks/better-auth/get-session`
  )
  const response = await fetch(url, {
    headers: {
      cookie: request.headers.get('cookie') || ''
    }
  })

  const session = await response.json()

  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}
