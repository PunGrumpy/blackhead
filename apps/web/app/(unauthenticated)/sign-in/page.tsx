import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import('./sign-in').then(mod => mod.SignIn))

export default function SignInPage() {
  return <SignIn />
}
