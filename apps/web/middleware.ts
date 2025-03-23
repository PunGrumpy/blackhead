import { auth } from '@repo/auth/server'
import { noseconeMiddleware, noseconeOptions } from '@repo/security/middleware'
import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const securityHeaders = noseconeMiddleware(noseconeOptions)

const isProtectedRoute = (request: NextRequest) => {
  return request.url.includes('/dashboard')
}

export async function middleware(request: NextRequest) {
  await securityHeaders()

  const session = await auth.api.getSession({
    headers: await headers()
  })

  // warn: for testing session
  console.log('session', session)

  if (!session && isProtectedRoute(request)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Protect routes that require authentication
    '/dashboard(.*)'
  ]
}
