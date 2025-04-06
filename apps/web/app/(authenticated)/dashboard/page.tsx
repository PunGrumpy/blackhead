import { auth } from '@repo/auth/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!session) {
    redirect('/login') // Redirect to login if not logged in
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="font-bold text-3xl">Dashboard</h1>
    </div>
  )
}
