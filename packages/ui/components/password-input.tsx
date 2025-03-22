'use client'

import { Check, Eye, EyeOff, X } from 'lucide-react'
import { type ComponentProps, useMemo, useState } from 'react'
import { passwordValidation } from '../lib/password-validation'
import { Input } from './ui/input'

interface PasswordInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  showStrengthIndicator?: boolean
}

export function PasswordInput({
  showStrengthIndicator = false,
  ...props
}: PasswordInputProps) {
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => setIsVisible(prevState => !prevState)

  const checkStrength = (pass: string) => {
    return passwordValidation.map(req => ({
      met: req.regex.test(pass),
      text: req.text
    }))
  }

  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter(req => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) {
      return 'bg-border'
    }
    if (score <= 1) {
      return 'bg-red-500'
    }
    if (score <= 2) {
      return 'bg-orange-500'
    }
    if (score === 3) {
      return 'bg-amber-500'
    }
    if (score === 4) {
      return 'bg-yellow-500'
    }
    return 'bg-emerald-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) {
      return 'Enter a password'
    }
    if (score <= 2) {
      return 'Weak password'
    }
    if (score <= 3) {
      return 'Medium password'
    }
    if (score === 4) {
      return 'Strong password'
    }
    return 'Very strong password'
  }

  return (
    <div {...props}>
      <div className="w-full space-y-2">
        <div className="relative">
          <Input
            className="pe-9"
            placeholder="Password"
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-describedby={
              showStrengthIndicator ? 'password-strength' : undefined
            }
          />
          <button
            className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {showStrengthIndicator && (
        <>
          {/* Password strength indicator */}
          <div
            className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
            aria-valuenow={strengthScore}
            aria-valuetext={getStrengthText(strengthScore)}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 5) * 100}%` }}
            />
          </div>

          {/* Password strength description */}
          <p
            id="password-strength"
            className="mb-2 font-medium text-foreground text-sm"
          >
            {getStrengthText(strengthScore)}.
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <Check
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <X
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${
                    req.met ? 'text-emerald-600' : 'text-muted-foreground'
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? ' - Requirement met' : ' - Requirement not met'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
