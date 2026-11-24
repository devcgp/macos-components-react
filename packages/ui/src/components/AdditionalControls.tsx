import { useId, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export function TextField({ label, className = '', ...props }: Omit<ComponentProps<'input'>, 'type'> & { label: string }) {
  return <label className="tahoe-field-label">{label}<input {...props} type="text" className={`tahoe-text-input tahoe-field-control ${className}`}/></label>
}

export function Stepper({ label, value, min, max, variant = 'inside', onChange, incrementLabel, decrementLabel }: {
  incrementLabel?: string
  decrementLabel?: string
  label: string
  value: number
  min: number
  max: number
  variant?: 'none' | 'inside' | 'outside'
  onChange: (value: number) => void
}) {
  return <div className="tahoe-stepper" data-variant={variant} role="group" aria-label={label}>
    {variant !== 'none' && <output aria-label={label}>{value}</output>}
    <div className="tahoe-stepper-arrows">
      <button type="button" aria-label={incrementLabel ?? label + '：增加'} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}><FontAwesomeIcon icon={faChevronUp} aria-hidden="true"/></button>
      <button type="button" aria-label={decrementLabel ?? label + '：减少'} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}><FontAwesomeIcon icon={faChevronDown} aria-hidden="true"/></button>
    </div>
  </div>
}

export function ProgressIndicator({ label, value }: { label: string; value?: number }) {
  return <progress className="tahoe-progress" aria-label={label} max={100} value={value}/>
}

export function DisclosureControl({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return <div className="tahoe-disclosure">
    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(previous => !previous)}>
      <FontAwesomeIcon icon={faChevronRight} aria-hidden="true"/>{label}
    </button>
    <div id={id} hidden={!open}>{children}</div>
  </div>
}
