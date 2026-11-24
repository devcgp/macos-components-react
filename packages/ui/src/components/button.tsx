import { Button as HeadlessButton } from '@headlessui/react'
import type { ComponentProps } from 'react'

export function Button({ className = '', variant = 'neutral', size = 'regular', loading = false, disabled, children, 'aria-busy': busy, ...props }: ComponentProps<'button'> & { variant?: 'neutral' | 'accent' | 'destructive'; size?: 'mini' | 'small' | 'regular' | 'large' | 'xl'; loading?: boolean }) {
  return <HeadlessButton type="button" className={`tahoe-button ${className}`} data-variant={variant} data-size={size} disabled={disabled || loading} aria-busy={loading || busy} {...props}>{children}</HeadlessButton>
}

export function IconButton({ label, ...props }: ComponentProps<typeof Button> & { label: string }) {
  return <Button {...props} className={`tahoe-icon-button ${props.className ?? ''}`} aria-label={label} title={label}/>
}
