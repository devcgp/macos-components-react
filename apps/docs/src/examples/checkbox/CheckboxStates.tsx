import { Checkbox } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const checkboxStateLabels = {
  initial: "Default",
  checked: "Checked",
  disabledUnchecked: "Disabled unchecked",
  disabledChecked: "Disabled checked",
}

export function CheckboxStates({ labels = checkboxStateLabels }: { labels?: typeof checkboxStateLabels } = {}) {
  return (
    <div data-theme="desktop" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--desktop-gap)' }}>
      <Checkbox label={labels.initial}/>
      <Checkbox label={labels.checked} defaultChecked/>
      <Checkbox label={labels.disabledUnchecked} disabled/>
      <Checkbox label={labels.disabledChecked} defaultChecked disabled/>
    </div>
  )
}
