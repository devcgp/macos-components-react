import type { ComponentProps } from 'react'

export function Slider(props: Omit<ComponentProps<'input'>, 'type'>) {
  return <input {...props} type="range" className={`tahoe-slider ${props.className ?? ''}`}/>
}
