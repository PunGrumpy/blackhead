import { NextResponse } from 'next/server'

export const GET = (): NextResponse => {
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
