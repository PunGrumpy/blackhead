import dynamic from 'next/dynamic'

const LogIn = dynamic(() => import('./login').then(mod => mod.LogIn))

export default function LogInPage() {
  return <LogIn />
}
