import { env } from '@/env'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}${request.nextUrl.pathname.replace('/api/auth', '/webhooks/better-auth')}`,
    {
      headers: request.headers,
      credentials: 'include'
    }
  )
  return response
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}${request.nextUrl.pathname.replace('/api/auth', '/webhooks/better-auth')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers)
      },
      body: JSON.stringify(body),
      credentials: 'include'
    }
  )

  return response
}
