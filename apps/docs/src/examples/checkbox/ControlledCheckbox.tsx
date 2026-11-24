import { useState } from 'react'
import { Checkbox } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const controlledLabels = { option: "Show filenames", value: "Checked" }

export function ControlledCheckbox({ labels = controlledLabels }: { labels?: typeof controlledLabels } = {}) {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div data-theme="desktop" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--desktop-gap)' }}>
      <Checkbox label={labels.option} checked={checked} onChange={event => setChecked(event.currentTarget.checked)}/>
      <output>{labels.value + ' = ' + String(checked)}</output>
    </div>
  )
}
