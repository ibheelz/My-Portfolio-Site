'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function FadeIn({ children, delay = 0, className, style, onClick }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
