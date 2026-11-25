import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'gold' | 'ghost' | 'ink' | 'line'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  to?: string
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  size?: 'md' | 'sm'
}

export function Button({
  children,
  variant = 'gold',
  to,
  href,
  type = 'button',
  onClick,
  className = '',
  size = 'md',
}: ButtonProps) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
