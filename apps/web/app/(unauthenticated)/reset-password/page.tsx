import dynamic from 'next/dynamic'

const ResetPassword = dynamic(() =>
  import('./reset-password').then(mod => mod.ResetPassword)
)

export default function ResetPasswordPage() {
  return <ResetPassword />
}
