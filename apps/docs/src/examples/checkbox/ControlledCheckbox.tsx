import { useState } from 'react'
import { Checkbox } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const controlledLabels = { option: "Show filenames", value: "Checked" }

export function ControlledCheckbox({ labels = controlledLabels }: { labels?: typeof controlledLabels } = {}) {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div data-theme="tahoe" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--tahoe-gap)' }}>
      <Checkbox label={labels.option} checked={checked} onChange={event => setChecked(event.currentTarget.checked)}/>
      <output>{labels.value + ' = ' + String(checked)}</output>
    </div>
  )
}
