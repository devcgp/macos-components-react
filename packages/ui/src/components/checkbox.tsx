import type { ComponentProps } from 'react'

export function Checkbox({ label, ...props }: Omit<ComponentProps<'input'>, 'type'> & { label: string }) {
  return <label className="tahoe-choice tahoe-checkbox" data-size="medium"><span className="tahoe-checkbox-control">
    <input {...props} type="checkbox"/>
    <span className="tahoe-checkbox-box" aria-hidden="true">
      <svg viewBox="0 0 10 9" fill="none"><path d="M1 4.5l2.4 2.4L9 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  </span>{label}</label>
}
