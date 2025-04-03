import dynamic from 'next/dynamic'

const SignUp = dynamic(() => import('./signup').then(mod => mod.SignUp))

export default function SignUpPage() {
  return <SignUp />
}
