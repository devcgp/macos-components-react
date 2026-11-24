import { Checkbox } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const selectionLabels = { unchecked: "Unchecked", checked: "Checked" }

export function CheckboxSelection({ labels = selectionLabels }: { labels?: typeof selectionLabels } = {}) {
  return (
    <div data-theme="desktop" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--desktop-gap)' }}>
      <Checkbox label={labels.unchecked} defaultChecked={false}/>
      <Checkbox label={labels.checked} defaultChecked/>
    </div>
  )
}
