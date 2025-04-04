import { database } from '@repo/database'
import { page } from '@repo/database/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = async () => {
  await database.insert(page).values({
    name: 'cron-temp'
  })
  await database.delete(page).where(eq(page.name, 'cron-temp'))

  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
