import {} from '@phosphor-icons/react/dist/ssr'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@repo/ui/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const SignUp = () => {
  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full shrink grow flex-col content-center items-center justify-center gap-6 p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-6 w-6" />
        <AlertTitle>Work in progress</AlertTitle>
        <AlertDescription>
          This feature is not yet available. Please check back later.
        </AlertDescription>
      </Alert>
    </div>
  )
}
