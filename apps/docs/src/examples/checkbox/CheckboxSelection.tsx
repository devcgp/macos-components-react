import { Checkbox } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const selectionLabels = { unchecked: "Unchecked", checked: "Checked" }

export function CheckboxSelection({ labels = selectionLabels }: { labels?: typeof selectionLabels } = {}) {
  return (
    <div data-theme="tahoe" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tahoe-gap)' }}>
      <Checkbox label={labels.unchecked} defaultChecked={false}/>
      <Checkbox label={labels.checked} defaultChecked/>
    </div>
  )
}
