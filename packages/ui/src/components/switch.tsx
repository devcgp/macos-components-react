import type { ComponentProps } from 'react'

export function Switch({ label, ...props }: Omit<ComponentProps<'input'>, 'type' | 'role'> & { label: string }) {
  return <label className="tahoe-switch">{label}<span className="tahoe-switch-control">
    <input {...props} type="checkbox" role="switch"/>
    <span className="tahoe-switch-track" aria-hidden="true"><span className="tahoe-switch-thumb"/></span>
  </span></label>
}
