import { NextResponse } from 'next/server'

export const runtime = 'edge'

export const GET = (): NextResponse => new NextResponse('OK', { status: 200 })
