import dynamic from 'next/dynamic'

const LogInEmail = dynamic(() =>
  import('./login-email').then(mod => mod.LogInEmail)
)

export default function LogInEmailPage() {
  return <LogInEmail />
}
