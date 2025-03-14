import { database } from '@repo/database'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
  const newPage = await database.page.create({
    data: {
      name: 'cron-keep-alive-temp'
    }
  })

  await database.page.delete({
    where: {
      id: newPage.id
    }
  })

  return NextResponse.json('OK', {
    status: 200
  })
}
