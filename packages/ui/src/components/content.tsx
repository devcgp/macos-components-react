import { useId, type ComponentProps, type ReactNode } from 'react'
import { TextField } from './AdditionalControls'

export function ImageView({ fit = 'contain', className = '', ...props }: Omit<ComponentProps<'img'>, 'alt'> & { alt: string; fit?: 'contain' | 'cover' }) {
  return <img {...props} className={`tahoe-image-view ${className}`} data-fit={fit}/>
}

export function TextView({ tone = 'body', className = '', ...props }: ComponentProps<'div'> & { tone?: 'body' | 'secondary' }) {
  return <div {...props} className={`tahoe-text-view ${className}`} data-tone={tone}/>
}

type OutlineItem = { id: string; label: string; children?: OutlineItem[] }

export function OutlineView({ items }: { items: OutlineItem[] }) {
  return <ul className="tahoe-outline">{items.map(item => <li key={item.id}>
    {item.children?.length ? <details><summary>{item.label}</summary><OutlineView items={item.children}/></details> : item.label}
  </li>)}</ul>
}

export function ScrollView({ label, maxHeight = 160, children }: { label: string; maxHeight?: number; children: ReactNode }) {
  return <div className="tahoe-scroll-view" role="region" aria-label={label} tabIndex={0} style={{ maxBlockSize: maxHeight }}>{children}</div>
}

export function ComboBox({ label, options, ...props }: Omit<ComponentProps<'input'>, 'type' | 'list'> & { label: string; options: string[] }) {
  const id = useId()
  return <><TextField {...props} label={label} list={id}/><datalist id={id}>{options.map(option => <option key={option} value={option}/>)}</datalist></>
}
