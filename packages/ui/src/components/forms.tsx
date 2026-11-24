import { useId, type ComponentProps } from 'react'
import { Radio } from './controls'

export function TextArea({ label, className = '', ...props }: ComponentProps<'textarea'> & { label: string }) {
  return <label className="desktop-field-label">{label}<textarea {...props} className={`desktop-text-input desktop-textarea ${className}`}/></label>
}

export function Select({ label, className = '', ...props }: ComponentProps<'select'> & { label: string }) {
  return <label className="desktop-field-label">{label}<select {...props} className={`desktop-text-input ${className}`}/></label>
}

export function RadioGroup({ label, options, value, defaultValue, onValueChange, disabled, name, className }: {
  label: string
  options: { value: string; label: string }[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  className?: string
}) {
  const groupId = useId()
  return <fieldset disabled={disabled} className={className}>
    <legend>{label}</legend>
    <div className="desktop-inline">{options.map(option =>
      <Radio key={option.value} name={name ?? groupId} label={option.label} value={option.value}
        checked={value === undefined ? undefined : value === option.value}
        defaultChecked={value === undefined ? defaultValue === option.value : undefined}
        onChange={() => onValueChange?.(option.value)}/>
    )}</div>
  </fieldset>
}
