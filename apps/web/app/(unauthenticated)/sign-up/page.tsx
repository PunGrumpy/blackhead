import dynamic from 'next/dynamic'

const SignUp = dynamic(() => import('./sign-up').then(mod => mod.SignUp))

export default function SignUpPage() {
  return <SignUp />
}
