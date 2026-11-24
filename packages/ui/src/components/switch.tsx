import type { ComponentProps } from 'react'

export function Switch({ label, ...props }: Omit<ComponentProps<'input'>, 'type' | 'role'> & { label: string }) {
  return <label className="desktop-switch">{label}<span className="desktop-switch-control">
    <input {...props} type="checkbox" role="switch"/>
    <span className="desktop-switch-track" aria-hidden="true"><span className="desktop-switch-thumb"/></span>
  </span></label>
}
