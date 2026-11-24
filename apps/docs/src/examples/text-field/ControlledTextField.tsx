import { useState } from 'react'
import { Button, TextField } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const controlledLabels = {
  field: "Folder name",
  initial: "Photos",
  value: "Current value",
  characters: "Character count",
  reset: "Reset",
}

export function ControlledTextField({ labels = controlledLabels }: { labels?: typeof controlledLabels } = {}) {
  const [name, setName] = useState(labels.initial)
  return (
    <div data-theme="desktop" style={{ display: 'grid', gap: 'var(--desktop-gap)', justifyItems: 'start', overflowWrap: 'anywhere', minWidth: 0 }}>
      <TextField label={labels.field} value={name} onChange={event => setName(event.currentTarget.value)}/>
      <output>{labels.value}: {name}<br/>{labels.characters}: {Array.from(name).length}</output>
      <Button onClick={() => setName(labels.initial)}>{labels.reset}</Button>
    </div>
  )
}
