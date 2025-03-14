'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface ViewAnimationProps {
  initial?: Record<string, string | number>
  whileInView?: Record<string, string | number>
  animate?: Record<string, string | number>
  exit?: Record<string, string | number>
  delay?: number
  // className?: ComponentProps<typeof motion.div>['className'];
  className?: string
  children: ReactNode
}

export const ViewAnimation = ({
  initial,
  whileInView,
  animate,
  exit,
  delay = 0,
  className,
  children
}: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: 'opacity(0)', ...initial }}
      whileInView={{ filter: 'opacity(1)', ...whileInView }}
      animate={animate}
      exit={exit}
      className={className}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}
