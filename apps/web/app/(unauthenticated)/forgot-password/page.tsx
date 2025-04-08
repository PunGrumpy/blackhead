import dynamic from 'next/dynamic'

const ForgotPassword = dynamic(() =>
  import('./forgot-password').then(mod => mod.ForgotPassword)
)

export default function ForgotPasswordPage() {
  return <ForgotPassword />
}
