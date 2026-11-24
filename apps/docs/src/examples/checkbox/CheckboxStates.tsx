import { Checkbox } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const checkboxStateLabels = {
  initial: "Default",
  checked: "Checked",
  disabledUnchecked: "Disabled unchecked",
  disabledChecked: "Disabled checked",
}

export function CheckboxStates({ labels = checkboxStateLabels }: { labels?: typeof checkboxStateLabels } = {}) {
  return (
    <div data-theme="tahoe" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tahoe-gap)' }}>
      <Checkbox label={labels.initial}/>
      <Checkbox label={labels.checked} defaultChecked/>
      <Checkbox label={labels.disabledUnchecked} disabled/>
      <Checkbox label={labels.disabledChecked} defaultChecked disabled/>
    </div>
  )
}
