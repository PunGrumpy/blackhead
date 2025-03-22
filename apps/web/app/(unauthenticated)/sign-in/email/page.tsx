import dynamic from 'next/dynamic'

const SignInEmail = dynamic(() =>
  import('./sign-in-email').then(mod => mod.SignInEmail)
)

export default function SignInEmailPage() {
  return <SignInEmail />
}
