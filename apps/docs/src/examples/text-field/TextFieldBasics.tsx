import { TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const basicsLabels = {
  empty: "Empty",
  placeholder: "Placeholder",
  hint: "Enter a name",
  filled: "Default value",
  initial: "Photos",
}

export function TextFieldBasics({ labels = basicsLabels }: { labels?: typeof basicsLabels } = {}) {
  return (
    <div data-theme="tahoe" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--tahoe-gap)' }}>
      <TextField label={labels.empty}/>
      <TextField label={labels.placeholder} placeholder={labels.hint}/>
      <TextField label={labels.filled} defaultValue={labels.initial}/>
    </div>
  )
}
