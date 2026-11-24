import type { ComponentProps } from 'react'

export function Checkbox({ label, ...props }: Omit<ComponentProps<'input'>, 'type'> & { label: string }) {
  return <label className="desktop-choice desktop-checkbox" data-size="medium"><span className="desktop-checkbox-control">
    <input {...props} type="checkbox"/>
    <span className="desktop-checkbox-box" aria-hidden="true">
      <svg viewBox="0 0 10 9" fill="none"><path d="M1 4.5l2.4 2.4L9 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  </span>{label}</label>
}
