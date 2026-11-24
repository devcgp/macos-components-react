import { useState } from 'react'
import { IconButton } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const iconLabels = { refresh: "Refresh", done: "Refreshed" }

export function IconButtonExample({ labels = iconLabels }: { labels?: typeof iconLabels } = {}) {
  const [message, setMessage] = useState('')

  return (
    <div data-theme="desktop" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton label={labels.refresh} onClick={() => setMessage(labels.done)}>
        <span aria-hidden="true">↻</span>
      </IconButton>
      <output>{message}</output>
    </div>
  )
}
